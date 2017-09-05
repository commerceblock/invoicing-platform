<template>
  <section class="content">
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">
          <router-link to="/">Invoices</router-link> /
          <span class="hidden-xs text-muted">Contract ID</span>
          <span class="text-muted">{{contractId}}</span>
        </div>
      </div>
    </div>
    <div class="input-group form-group">
      <h4>Create Invoice</h4>
    </div>

    <div class="input-group form-group">
      <div>Invoice contracts are created by uploading files and then generating hashes which are used as part of the addresses.</div>
      <div>Public keys can be used by the payer to validate associated data (uploaded files) with the derived addresses.</div>
      <div>By generating these public keys you are associate the files with the derived addresses.</div>
    </div>
    <div class="input-group form-group">
      <label>Contract ID</label>
      <div>
        <input class="form-control" readonly="readonly" type="text" v-model="contractId" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Your Reference</label>
      <div>
        <input class="form-control" type="text" v-model="externalReferenceId" placeholder="Enter reference id (e.g. ID-000007)" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Invoice Amount (BTC)</label>
      <div>
        <input class="form-control" type="text" v-model="btcAmount" placeholder="Enter bitcoin amount" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Contract Files</label>
      <div class="upload-files">
        <div>
          <i class="fa fa-file-text-o"></i>
        </div>
        <label class="btn btn-success btn-file">
          Upload contract files <input class="form-control contract-files-input" type="file" multiple="multiple" ref="contractFiles" style="display: none;" />
        </label>
        <div>or drag the content here</div>
      </div>
    </div>
    <div class="ui form">
      <div class="btn-toolbar">
        <div class="btn-group pull-right" role="group">
          <button class="btn btn-success btn-lg forms-buttons continue-button" v-on:click="submit" v-bind:disabled="disableSubmit">Continue</button>
        </div>
        <div class="btn-group pull-right" role="group">
          <a href="" v-on:click="reset">Reset</a>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>

<script>
// TODO: revist random function
import {
  random,
  map
} from 'lodash';
import gql from 'graphql-tag';
import $ from 'jquery';
import {
  computeFileHash,
  aggregateFileHashes,
  computeContractBaseHDPublicKey,
  computeCommitmentPK,
} from '../../lib/credentials'
import {
  getRootContractHDPrivateKey
} from '../../lib/vault'

export default {
  name: 'InvoicesManager',
  data: function() {
    return {
      contractId: null,
      externalReferenceId: null,
      btcAmount: null,
      disableSubmit: false
    };
  },
  methods: {
    generateContractId() {
      this.contractId = random(0, 2147483647);
    },
    reset() {
      this.contractId = null;
      this.externalReferenceId = null;
      this.btcAmount = null;
      this.$refs.contractFiles.value = null;
      this.generateContractId();
    },
    submit() {
      // TODO: handle errors, validation
      this.disableSubmit = true;
      const apolloClient = this.apolloClient;
      const router = this.$router;
      const files = this.$refs.contractFiles.files;

      // upload files
      Promise
        .all(this.uploadFiles(files))
        // create event
        .then(result => this.createInvoice(result))
        // redirect to view
        .then(result => this.redirectToView(result));
    },
    redirectToView(result) {
      const invoiceId = result.data.createInvoice.invoiceId;
      const linkId = result.data.createInvoice.linkId;
      const location = `/portal/invoices/${invoiceId}?link_id=${linkId}`;

      const router = this.$router;
      router.push(location);
    },
    createInvoice(results) {
      const apolloClient = this.apolloClient;
      const contractId = this.contractId;
      const btcAmount = this.btcAmount;
      const externalReferenceId = this.externalReferenceId;
      // collect fileIds
      const fileIds = map(results, res => res.data.saveFile.fileId);
      const fileHashes = map(results, res => res.data.saveFile.fileHash);
      const payeeContractHash = aggregateFileHashes(fileHashes);
      const contractBaseHDPublicKey = computeContractBaseHDPublicKey(getRootContractHDPrivateKey(), contractId);
      const contractBasePK = contractBaseHDPublicKey.toString();
      const payeeCommitmentPK = computeCommitmentPK(contractBaseHDPublicKey, payeeContractHash);
      // extract to apollo directive
      return apolloClient
        .mutate({
          mutation: gql`mutation {
            createInvoice(invoice: {
              contractId: ${contractId},
              fileIds: ${JSON.stringify(fileIds)},
              btcAmount: "${btcAmount}",
              externalReferenceId: "${externalReferenceId}",
              payeeContractHash: "${payeeContractHash}",
              contractBasePK: "${contractBasePK}",
              payeeCommitmentPK: "${payeeCommitmentPK}"
            }) {
              invoiceId
              linkId
            }
        }`})
    },
    uploadFiles(files) {
      const apolloClient = this.apolloClient;
      return map(files, file => {
        return computeFileHash(file)
          .then(fileHash => {
            return apolloClient
              .mutate({
                mutation: gql`mutation {
                  saveFile(file: {
                    fileName: "${file.name}",
                    fileType: "${file.type}",
                    fileHash: "${fileHash}"
                  }) {
                    fileId
                    fileName
                    fileHash
                    fileS3Url
                  }
                }`});
          })
          .then(result => {
            return $.ajax({
                type: 'PUT',
                url: result.data.saveFile.fileS3Url,
                contentType: file.type,
                processData: false,
                data: file
              })
              // pass mutation response
              .then(() => result);
          });
      });
    }
  },
  mounted() {
    this.generateContractId();
  },
  computed: {
    apolloClient: function() {
      return this.$apollo.provider.defaultClient;
    }
  }
}
</script>

<style scoped lang="scss">
.subnav {
  margin-top: 50px;
  background-color: #FFFFFF;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.25);
  height: 40px;
}

.subnav .title {
  color: #36373A;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: bold;
}

.subnav .new-invoice-btn {
  margin-top: -10px;
}

.upload-files {
  padding: 40px;
  max-width: 400px;
  width: calc(100vw - 30px);
  text-align: center;
  border: 2px dotted #979797;

  .fa-file-text-o {
    font-size: 90px;
    color: #BFBFBF;
  }

  .btn-file {
    margin: 10px 0;
  }

  button {
    margin: 15px 0
  }
}

.btn-toolbar {
  border-top: 1px solid #000;
  max-width: 400px;
  width: calc(100vw - 30px);
  padding: 30px 0;
}

.continue-button {
  margin-top: -12px;
  margin-left: 15px;
}

.contract-files-input {
    display: none;
  }
</style>
