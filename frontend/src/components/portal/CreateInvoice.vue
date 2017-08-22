<template>
  <section class="content">
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">
          <router-link to="/">Invoices</router-link> / <span class="text-muted">Contract ID {{contractId}}</span>
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
      <div class='btn-toolbar'>
        <div class="btn-group" role="group">
          <button class='btn btn-primary btn-lg forms-buttons' v-on:click='reset'>Reset</button>
        </div>
        <div class="btn-group" role="group">
          <button class='btn btn-primary btn-lg forms-buttons' v-on:click='sumbit'>Continue</button>
        </div>

      </div>
    </div>
  </div>
  </section>
</template>

<script>
import { random } from 'lodash';

export default {
  name: 'InvoicesManager',
  data: function () {
    return {
      contractId: null,
      externalReferenceId: null,
      btcAmount: null,

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
    sumbit() {


      console.log(this.$apollo)
      // upload files

      // create event

      // update popup
    }
  },
  mounted() {
    this.generateContractId();
  },
  computed: {

  },
  apollo: {

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
</style>
