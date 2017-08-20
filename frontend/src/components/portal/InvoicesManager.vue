<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <table class="table" id="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Your Refrence</th>
              <th>BTC</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Foo</td>
              <td>Bar</td>
              <td>Baz</td>
              <td>Daz</td>
              <td>Faz</td>
              <td>Jaz</td>
            </tr>
            <tr>
              <td>Lorem</td>
              <td>Ipsum</td>
              <td>Dolor</td>
              <td>Lorem</td>
              <td>Ipsum</td>
              <td>Dolor</td>
            </tr>
            <tr>
              <td>Some</td>
              <td>More</td>
              <td>Data</td>
              <td>Lorem</td>
              <td>Ipsum</td>
              <td>Dolor</td>
            </tr>
          </tbody>
        </table>
        <hr>
      </div>
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
      this.$parent.currentView = 'CreateInvoice';
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
