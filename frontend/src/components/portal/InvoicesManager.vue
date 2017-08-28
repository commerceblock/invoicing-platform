<template>
  <section class="contect">
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">Invoices</div>
        <div class="pull-right new-invoice-btn">
          <router-link to="/portal/invoices">
            <button type="button" class="btn btn-success">
              <span class="fa fa-plus"></span> New Invoice
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12 empty-table" v-if="isInvoicesEmpty()">
        <!-- <clip-loader
          :color="'#258C42'"
          :size="'100px'"
          :radius="'100px'"
          ></clip-loader> -->
        <div>
          <div class="new-invoice">
            <img src="/static/assets/emptystate-invoice.svg" />
            <div class="create-title">Commerce Without Blocks</div>
            <div class="create-subtitle">Create your first encrypted and decentralized <br/>invoice with CommerceBlock</div>
            <router-link to="/portal/invoices">
              <button type="button" class="btn btn-success">
                <span class="fa fa-plus"></span> Create New Invoice
              </button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-12" v-else>
        <table class="table" id="table">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Date</th>
              <th>Your Refrence</th>
              <th>BTC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody v-for="invoice in invoices" :key="invoice.invoiceId">
            <tr>
              <td>
                <i class="fa fa-circle" v-bind:class="{ 'text-warning': invoice.status === 'pending', 'text-success': invoice.status === 'redeemed' }"></i>
              </td>
              <td>{{ invoice.invoiceId }}</td>
              <td>{{ invoice.date }}</td>
              <td>{{ invoice.externalReferenceId }}</td>
              <td>{{ invoice.btcAmount }}</td>
              <td>
                <span v-bind:class="{ 'text-warning': invoice.status === 'pending', 'text-success': invoice.status === 'redeemed' }">{{ invoice.status }}</span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Actions
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                      <router-link :to="viewLink(invoice.invoiceId)">View</router-link>
                    </li>
                    <li>
                      <router-link :to="redeemLink(invoice.invoiceId)">Redeem</router-link>
                    </li>
                    <li>
                      <a href="javascript:;" @click="archiveInvoice(invoice.invoiceId)">Archive</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <hr>
      </div>
      <div class="bottom-logo">
        <img src="/static/assets/commcerblock-big-gray.png" />
      </div>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import {
  isEmpty
} from 'lodash'
import {
  getAccessToken,
} from '../../lib/vault'

export default {
  name: 'InvoicesManager',
  components: {
    ClipLoader
  },
  methods: {
    isInvoicesEmpty: function () {
      return isEmpty(this.invoices);
    },
    viewLink: function (invoiceId) {
      return `/portal/invoices/${invoiceId}`;
    },
    redeemLink: function (invoiceId) {
      return `/portal/invoices/${invoiceId}/redeem`;
    },
    archiveInvoice: function (invoiceId) {
      const apolloClient = this.apolloClient;
      return apolloClient
        .mutate({
          mutation: gql`mutation {
          archiveInvoice(invoiceId: "${invoiceId}") {
            invoiceId
            status
          }
        }`})
        .then(result => {
          this.$apollo.queries.invoices.refetch();
        })
    },
    reset: function () {
      this.invoices = null;
    },
  },
  computed: {
    apolloClient: function () {
      return this.$apollo.provider.defaultClient;
    },
  },
  apollo: {
    invoices: {
      query: function () {
        return gql`query {
          invoices {
              invoiceId
              date
              externalReferenceId
              btcAmount
              status
          }}`;
      },
      skip() {
        return isEmpty(getAccessToken());
      },
      pollInterval: 5000,
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  border-collapse: separate;
  border-spacing: 0 1em;

  thead th {
    border: none;
  }

  tbody {
    tr {
      background-color: #FFFFFF;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
    }

    td {
      padding: 20px 0;
    }
  }
}

.empty-table {
  margin-top: 100px;
}

.fa-circle {
  font-size: 12px;
  margin-left: 10px;
}

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

.bottom-logo {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
}

.new-invoice {
  text-align: center;
}

.create-title {
	color: #141414;
	font-family: "Open Sans";
	font-size: 22px;
	font-weight: 600;
  margin: 15px 0;
}

.create-subtitle {
	opacity: 0.5;
	color: #141414;
	font-family: "Open Sans";
	font-size: 18px;
	line-height: 24px;
	text-align: center;
  margin: 15px 0;
}
</style>
