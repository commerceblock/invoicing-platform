<template>
  <div class="wrapper">
    <modal v-if="showEntranceModal" @close="showEntranceModal = false" />
    <div>
      <input type="hidden" :value="traderId" ref="traderId">
    </div>
    <div class="navbar-wrapper">
      <div class="container-fluid">
        <nav class="navbar navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="/#">
                <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
                <span class="commerce-block-green"><img src="/static/assets/company-name.svg" /></span>
              </a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              <ul class="nav navbar-nav">
                <li class="active">
                  <a href="/#" class="">Invoices</a>
                </li>
              </ul>
              <ul class="nav navbar-nav pull-right">
                <li class="">
                  <button type="button" class="btn btn-default" v-on:click="logout">
                    <span class="fa fa-sign-out"></span> Log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="container">
      <div class="row" style="margin-top:100px">

        <div class="row">
          <div class="container">
            <component :is="currentView" transition="fade" transition-mode="out-in"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Modal from './EntranceModal.vue'
import InvoicesManager from './InvoicesManager.vue'
import CreateInvoice from './CreateInvoice.vue'
import { reset } from '../../lib/vault'

export default {
  name: 'home',
  components: {
    Modal,
    InvoicesManager,
    CreateInvoice
  },
  data: function () {
    return {
      showEntranceModal: true,
      traderId: null,
      currentView: 'InvoicesManager'
    }
  },
  methods: {
    logout() {
      reset();
      this.traderId = null;
      this.currentView = 'InvoicesManager';
      this.showEntranceModal = true;
    }
  },
  apollo: {
    invoices: {
      query: function () {
        if (this.traderId) {
          return gql`query {
          invoices(traderId : "${this.traderId}") {
              invoiceId
              btcAmount
              externalReferenceId
          }}`;
        }
        return null;

      },
      variables() {
        return {
          traderId: this.traderId
        };
      },
      skip() {
        return this.traderId === null;
      }
    },
  }
}
</script>

<style scoped>
.navbar {
  height: 90px;
  width: 1440px;
  background-color: #36373A;
  box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.25);
}
</style>
