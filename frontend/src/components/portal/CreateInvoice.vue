<template>
  <div>
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills pull-right">
          <li role="presentation">
            <a href="#" @click="createInvoice">Go Back</a>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">Invoices / ... </h3>
    </div>
    <div class="row">
      Foo Fighter
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoicesManager',
  data: function () {
    return {
    };
  },
  methods: {
    createInvoice: function () {
      this.$parent.currentView = 'InvoicesManager';
    }
  },
  computed: {

  },
  apollo: {

  },
}
</script>

<style scoped>

</style>
