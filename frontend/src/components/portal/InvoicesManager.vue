<template>
  <div>
    <div class="subnav">
      <div class="container">
        <div class="pull-left title">Invoices</div>
        <div class="pull-right new-invoice-btn">
          <button type="button" class="btn btn-success">
            <span class="fa fa-plus"></span> New Invoice
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
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
          <tbody>
            <tr>
              <td>
                <i class="fa fa-circle text-warning"></i>
              </td>
              <td>123414124</td>
              <td>30-07-17</td>
              <td>ID-0000003</td>
              <td>0.0048812</td>
              <td>
                <span class="text-warning">Fulfill</span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Actions
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                      <a href="#">View</a>
                    </li>
                    <li>
                      <a href="#">Redeem</a>
                    </li>
                    <li>
                      <a href="#">Archive</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <i class="fa fa-circle text-success"></i>
              </td>
              <td>123414124</td>
              <td>30-07-17</td>
              <td>ID-0000003</td>
              <td>0.0048812</td>
              <td>
                <span class="text-success">Fulfill</span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Actions
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                      <a href="#">View</a>
                    </li>
                    <li>
                      <a href="#">Redeem</a>
                    </li>
                    <li>
                      <a href="#">Archive</a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <i class="fa fa-circle text-danger"></i>
              </td>
              <td>123414124</td>
              <td>30-07-17</td>
              <td>ID-0000003</td>
              <td>0.0048812</td>
              <td>
                <span class="text-danger">Fulfill</span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Actions
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li>
                      <a href="#">View</a>
                    </li>
                    <li>
                      <a href="#">Redeem</a>
                    </li>
                    <li>
                      <a href="#">Archive</a>
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
