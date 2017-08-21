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
      <h4>View Invoice</h4>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  name: 'ViewInvoice',
  props: ['invoiceId'],
  data: function () {
    return {
      contractId: null,
      externalReferenceId: null
    };
  },
  methods: {

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
