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
        <clip-loader
          :color="'#258C42'"
          :size="'100px'"
          :radius="'100px'"
          ></clip-loader>
        <!-- <h4> empty list</h4>
          <router-link to="/portal/invoices">
              <button type="button" class="btn btn-success">
                <span class="fa fa-plus"></span> New Invoice
              </button>
            </router-link> -->
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
                <i class="fa fa-circle text-warning"></i>
              </td>
              <td>{{ invoice.invoiceId }}</td>
              <td>{{ invoice.date }}</td>
              <td>{{ invoice.externalReferenceId }}</td>
              <td>{{ invoice.btcAmount }}</td>
              <td>
                <span class="text-warning" v-if="invoice.status === 'pending'">{{ invoice.status }}</span>
                <span class="text-success" v-if="invoice.status === 'redeemed'">{{ invoice.status }}</span>
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
  getCreds
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
          archiveInvoice(traderId: "${this.traderId}", invoiceId: "${invoiceId}") {
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
    traderId: function () {
      return this.$parent.traderId;
    },
    apolloClient: function () {
      return this.$apollo.provider.defaultClient;
    },
  },
  apollo: {
    invoices: {
      query: function () {
        return gql`query ListInvoices($traderId: String!) {
          invoices(traderId : $traderId) {
              invoiceId
              date
              externalReferenceId
              btcAmount
              status
          }}`;
      },
      variables() {
        return {
          traderId: this.traderId
        };
      },
      skip() {
        return isEmpty(this.traderId);
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
</style>
