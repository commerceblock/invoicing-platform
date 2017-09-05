<template>
  <section class="content wrapper">
    <modal v-if="showMessageEnabled" @close="showMessageEnabled = false" :linkId="linkId"/>
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">
          <router-link to="/">Invoices</router-link> /
          <span class="text-muted hidden-xs">Contract ID</span>
          <span class="text-muted">{{ contractId }}</span>
        </div>
      </div>
    </div>
    <div class="input-group form-group">
      <h4>View Invoice</h4>
    </div>
    <div class="input-group form-group">
      <label>Invoice ID</label>
      <div>
        <input class="form-control" readonly="readonly" type="text" v-model="invoiceId" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Contract ID</label>
      <div>
        <input class="form-control" readonly="readonly" type="text" v-model="contractId" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Your Reference ID</label>
      <div>
        <input class="form-control" readonly="readonly" type="text" v-model="externalReferenceId" />
      </div>
    </div>
    <div class="input-group form-group">
      <label>Invoice Amount (BTC)</label>
      <div>
        <input class="form-control" readonly="readonly" type="text" v-model="btcAmount" />
      </div>
    </div>
    <!-- <div class="input-group form-group">
      <label>Invoice - Contract Files</label>
      <div>
      </div>
    </div>
    <div class="input-group form-group">
      <label>Receipt - Contract Files</label>
      <div>
      </div>
    </div> -->
  </div>
  </section>
</template>

<script>
import { isEmpty } from 'lodash'
import gql from 'graphql-tag'
import Modal from './ContractVerifiedModal.vue'

export default {
  name: 'ViewInvoice',
  props: ['invoiceId', 'linkId'],
  components: {
    Modal
  },
  data: function () {
    return {
      showMessageEnabled: !!this.linkId
    };
  },
  computed: {
    contractId: function () {
      return this.invoice && this.invoice.contractId
    },
    externalReferenceId: function () {
      return this.invoice && this.invoice.externalReferenceId;
    },
    btcAmount: function  () {
      return this.invoice && this.invoice.btcAmount;
    },
  },
  apollo: {
    invoice: {
      query: function () {
        return gql`query ListInvoice($invoiceId: String!) {
          invoice(invoiceId: $invoiceId) {
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
          invoiceId: this.invoiceId,
        };
      },
      skip() {
        return isEmpty(this.invoiceId);
      }
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
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #36373A;
  font-family: "Open Sans";
  font-size: 20px;
  font-weight: bold;
}

.subnav .new-invoice-btn {
  margin-top: -10px;
}
</style>
