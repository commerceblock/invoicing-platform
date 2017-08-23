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
    <div>
      <div class="invoice-wrapper">
        <form-wizard title="" subtitle="" class="invoice" color="#538C46">
          <tab-content title="Upload Contract" icon="fa fa-cloud-upload">
            <div class="invoice-box">
              <invoice-header></invoice-header>
              <upload-contract></upload-contract>
            </div>
          </tab-content>
          <tab-content title="Complete Transaction" icon="fa fa-qrcode">
            <div class="invoice-box">
              <invoice-header></invoice-header>
              <complete-transaction></complete-transaction>
            </div>
          </tab-content>
        </form-wizard>
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import { isEmpty } from 'lodash'
import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import InvoiceHeader from './InvoiceHeader.vue'
import CompleteTransaction from './CompleteTransaction.vue'
import UploadContract from './UploadContract.vue'


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
  },
  computed: {
    traderId: function () {
      return this.$parent.traderId
    },
    contractId: function () {
      return this.invoice && this.invoice.contractId
    },
    externalReferenceId: function () {
      return this.invoice && this.invoice.externalReferenceId;
    },
    btcAmount: function () {
      return this.invoice && this.invoice.btcAmount;
    },
  },
  apollo: {
    invoice: {
      query: function () {
        return gql`query ListInvoice($traderId: String!, $invoiceId: String!) {
          invoice(traderId: $traderId, invoiceId: $invoiceId) {
              invoiceId
              date
              contractId
              externalReferenceId
              btcAmount
              status
              fileIds
          }}`;
      },
      variables() {
        return {
          traderId: this.traderId,
          invoiceId: this.invoiceId,
        };
      },
      skip() {
        return isEmpty(this.traderId) || isEmpty(this.invoiceId);
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
