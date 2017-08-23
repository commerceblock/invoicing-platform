<template>
  <div class="content">
    <div class="title"></div>
    <div class="description">In order to complete the transaction please upload the signed contract</div>
    <div class="upload-files">
        <div><i class="fa fa-file-text-o"></i></div>
        <input class="form-control contract-id-input" type="file" multiple="multiple" ref="contractFiles" />
        <button class="pure-button" @click="upload">Upload signed contract</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'InvoiceHeader',
  methods: {
  },
  computed: {
    grandParent: function () {
      // TODO: find a better way to do this.
      return this.$parent.$parent.$parent;
    },
    traderId: function () {
      return this.$parent.traderId
    },
    invoice: function () {
      return this.$parent.invoice;
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
  .content {
    color: #141414;
    font-family: "Open Sans";
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    padding: 50px 10px;

    .title {
      color: #141414;
      font-family: "Open Sans";
      font-size: 16px;
      font-weight: 600;
    }

    .description {
      color: #141414;
      font-family: "Open Sans";
      font-size: 14px;
    }

    .upload-files {
      padding: 40px;
      border: 2px dotted #979797;

      .fa-file-text-o {
        font-size: 90px;
        color: #BFBFBF;
      }

      button {
        margin: 15px 0
      }
    }
  }

</style>
