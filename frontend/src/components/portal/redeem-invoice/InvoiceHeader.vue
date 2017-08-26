<template>
  <div class="header">
    <div class="top">
      <div>
        <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
        <span class="commerce-block-green">
          <img src="/static/assets/company-name.svg" />
        </span>
      </div>
      <img class="icon-lock-green" src="/static/assets/icon-lock-green.svg" />
    </div>
    <div class="invoice-data">
      <div class="invoice-id">Invoice #{{ invoiceId }}</div>
      <div class="invoice-date">Date: {{ date }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceHeader',
  computed: {
    grandParent: function () {
      // TODO: find a better way to do this.
      return this.$parent.$parent.$parent;
    },
    traderId: function () {
      return this.grandParent && this.grandParent.traderId
    },
    invoice: function () {
      return this.grandParent && this.grandParent.invoice;
    },
    invoiceId: function () {
      return this.invoice && this.invoice.invoiceId
    },
    date: function () {
      return this.invoice && this.invoice.date;
    },
  },
}
</script>

<style scoped lang="scss">
  .header {
    border-radius: 3px 3px 0 0;
    background-color: #258C42;
    color: #ffffff;
    padding: 5px;

    .top {
      display: flex;
      justify-content: space-between;
    }

    .invoice-data {
      color: #FFFFFF;
      font-family: "Open Sans";
      text-align: center;
      margin: 10px;

      .invoice-id {
        font-size: 16px;
        font-weight: bold;
      }

      .invoice-date {
        color: #C4E0CC;
        font-size: 16px;
        font-weight: 600;
      }
    }

    .icon-lock-green {
      /* height: 2.15%; */
      /* width: 1.6%; */
      /* opacity: 0.25; */
    }

    .commerce-block-green {
      margin-top: -5px;
    }

    .commerce-block-white-bg {
      /* height: 24px; */
      /* width: 32px; */
      /* opacity: 0.25; */
    }
  }

</style>
