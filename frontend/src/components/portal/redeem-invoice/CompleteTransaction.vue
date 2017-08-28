<template>
  <div class="content">
    <div class="pay">Account balance</div>
    <div class="btc-amount">
      <i class="fa fa-btc"></i> 0.0000435153 BTC</div>
    <!-- <div class="usd-amount">10.00 USD</div> -->
    <div class="scan">Scan QR and import account with your Bitcoin wallet</div>
    <img class="qr" src="/static/assets/qr-temp.jpg" />
    <div class="pay">OR Import using BIP32 path</div>
    <div class="row">
      <div class="col-xs-9">
        <input class="form-control" readonly="readonly" type="text" v-model="accountBIP32Path" />
      </div>
      <div class="col-xs-3">
        <a v-clipboard:copy="accountBIP32Path" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-files-o"></i> Copy Link</a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ContractVerifiedModal',
  props: ['accountBIP32Path'],
  methods: {
    close: function (event) {
      this.$emit('close');
    },
    onCopy: function(e) {
      // TODO complete
    },
    onError: function(e) {
      // TODO complete
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
  padding: 20px 10px;

  .btc-amount {
    margin-top: 10px;
    font-size: 24px;
    font-weight: bold;
    line-height: 33px;
  }

  .usd-amount {
    color: #757575;
    font-size: 14px;
    line-height: 19px;
  }

  .scan {
    font-size: 18px;
    line-height: 24px;
    margin: 10px 0;
  }

  .qr {
    width: 150px;
  }

  .pay {
    font-size: 18px;
    line-height: 24px;
  }

  .btc-address {
    font-size: 14px;
    line-height: 19px;
    a:link, a:visited, a:hover, a:active {
      color: #258C42;
    }
  }
}
</style>
