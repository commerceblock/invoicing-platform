<template>
  <section class="content">
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">
          <router-link to="/">Invoices</router-link> /
          <span class="text-muted">Contract ID {{ contractId }}</span>
        </div>
      </div>
    </div>
    <div>
      <div class="invoice-wrapper">
        <form-wizard title="" subtitle="" class="invoice" color="#538C46">
          <tab-content title="Upload Contract" icon="fa fa-cloud-upload" :before-change="processReceipt">
            <div class="invoice-box">
              <invoice-header :invoiceId="invoiceId" :date="date"></invoice-header>
              <upload-contract ref="uploadContract"></upload-contract>
            </div>
          </tab-content>
          <tab-content title="Complete Transaction" icon="fa fa-qrcode">
            <div class="invoice-box">
              <invoice-header :invoiceId="invoiceId" :date="date"></invoice-header>
              <complete-transaction :accountBIP32Path="accountBIP32Path"></complete-transaction>
            </div>
          </tab-content>
        </form-wizard>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import {
  isEmpty,
  map,
} from 'lodash'
import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import InvoiceHeader from './InvoiceHeader.vue'
import CompleteTransaction from './CompleteTransaction.vue'
import UploadContract from './UploadContract.vue'
import {
  computeFileHash,
  computeWalletPath,
  aggregateFileHashes,
} from '../../../lib/credentials'

export default {
  name: 'RedeemInvoice',
  props: ['invoiceId'],
  components: {
    FormWizard,
    TabContent,
    InvoiceHeader,
    CompleteTransaction,
    UploadContract,
  },
  methods: {
    processReceipt () {
      if (!isEmpty(this.contractFiles)) {
        this.accountBIP32Path = this.computeWalletPath();

        Promise
          .all(this.uploadFiles())
          .then(results => this.redeemReceipt(results));

        return true;
      } else {
        // show error
        this.errorResponseParent.errorResponse = "No files provided."
        return 'error!';
      }
    },
    computeWalletPath () {
      const fileHashes = map(this.contractFiles, file => computeFileHash(file));
      const payerContractHash = aggregateFileHashes(fileHashes);
      return computeWalletPath(this.contractId, this.payeeContractHash, payerContractHash);
    },
    redeemReceipt(results) {
      const apolloClient = this.apolloClient;
      // collect fileIds
      const fileIds = map(results, res => res.data.saveFile.fileId);
      // extract to apollo directive
      return apolloClient
        .mutate({
          mutation: gql`mutation {
            redeemReceipt(receipt: {
              invoiceId: "${this.invoiceId}"
              receiptFileIds: "${JSON.stringify(fileIds)}"
            }) {
              invoiceId
            }
        }`});
    },
    uploadFiles() {
      const apolloClient = this.apolloClient;
      return map(this.contractFiles, file => {
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
    },
  },
  computed: {
    contractFiles () {
      return this.$refs.uploadContract.$refs.contractFiles.files;
    },
    errorResponseParent () {
      return this.$refs.uploadContract.$refs;
    },
    contractId () {
      return this.invoice && this.invoice.contractId;
    },
    date () {
      return this.invoice && this.invoice.date;
    },
    payeeContractHash () {
      return this.invoice && this.invoice.payeeContractHash;
    },
    apolloClient () {
      return this.$apollo.provider.defaultClient;
    },
    accountBIP32Path () {
      return !isEmpty(this.contractFiles) && this.computeWalletPath();
    },
  },
  apollo: {
    invoice: {
      query: function() {
        return gql`query ListInvoice($invoiceId: String!) {
          invoice(invoiceId: $invoiceId) {
              invoiceId
              date
              contractId
              btcAmount
              status
              payeeContractHash
          }}`;
      },
      variables() {
        return {
          invoiceId: this.invoiceId,
        };
      },
      skip() {
        return isEmpty(this.invoiceId);
      }
    }
  },
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

.invoice-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.invoice {
  width: 600px;
  margin: -10px;
}

.invoice-box {
  border-radius: 3px;
  background-color: #FFFFFF;
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.25);
}
</style>
