<template>
  <section class="content">
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">
          <router-link to="/">Invoices</router-link> /
          <span class="text-muted">Contract ID {{contractId}}</span>
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
      <label>Contract Id</label>
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
      <div>
        <input class="form-control contract-id-input" type="file" multiple="multiple" ref="contractFiles" />
      </div>
    </div>
    <div class="ui form">
      <div class="btn-toolbar">
        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-lg forms-buttons" v-on:click="reset">Reset</button>
        </div>
        <div class="btn-group" role="group">
          <button class="btn btn-primary btn-lg forms-buttons" v-on:click="submit" v-bind:disabled="disableSubmit">Continue</button>
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
import gql from 'graphql-tag'
import $ from 'jquery'
import {
  getCreds
} from '../../lib/vault'

export default {
  name: 'InvoicesManager',
  data: function () {
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

      // upload files
      const tasks = this.uploadFiles();
      const allTasks = Promise.all(tasks);

      // create event
      const invoiceCreated = allTasks.then(results => {
        // collect fileIds
        const traderId = getCreds().traderId;
        const contractNumber = this.contractId;
        const fileIds = map(results, res => res.data.saveFile.fileId);
        const btcAmount = this.btcAmount;
        const externalReferenceId = this.externalReferenceId;
        return apolloClient
          .mutate({
            mutation: gql`mutation {
            createInvoice(invoice: {
              traderId: "${traderId}",
              contractNumber: ${contractNumber},
              fileIds: ${JSON.stringify(fileIds)},
              btcAmount: "${btcAmount}",
              externalReferenceId: "${externalReferenceId}"
            }) {
              invoiceId
            }
          }`})
      })

      // redirect to view
      invoiceCreated.then(result => {
        const invoiceId = result.data.createInvoice.invoiceId;
        const location = `/portal/invoices/${invoiceId}?show-message`;
        console.log(`URL: ${location}`);
        router.push(location);
      });
    },
    uploadFiles() {
      const apolloClient = this.apolloClient;
      return map(this.$refs.contractFiles.files, file => {
        return apolloClient
          .mutate({
            mutation: gql`mutation {
            saveFile(file: {
              fileName: "${file.name}",
              fileType: "${file.type}"
            }) {
              fileId
              fileName
              fileS3Url
            }
          }`})
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
          })
      });
    }
  },
  mounted() {
    this.generateContractId();
  },
  computed: {
    apolloClient: function () {
      return this.$apollo.provider.defaultClient;
    }
  }
}
</script>

<style scoped>
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
</style>
