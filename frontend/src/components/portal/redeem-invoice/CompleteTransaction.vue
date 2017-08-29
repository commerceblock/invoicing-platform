<template>
  <div class="content">
    <div class="acount-title">Account balance</div>
    <div class="btc-amount">
      <i class="fa fa-btc"></i> {{ btcAmount }}
    </div>
    <!-- <div class="usd-amount">10.00 USD</div> -->
    <!-- <div class="scan">Scan QR to import account with your Bitcoin wallet</div>
    <img class="qr" src="/static/assets/qr-temp.jpg" /> -->
    <div class="import-title">Import using BIP32 path</div>
    <div class="row account-path">
      <div class="col-xs-10 col-xs-offset-1">
        <input class="form-control" readonly="readonly" type="text" v-model="accountBIP32Path" />
      </div>
    </div>
    <div class="row copy-button">
      <div class="col-xs-4 col-xs-offset-4">
        <!-- <label class="pure-button btn-file">
          <i class="fa fa-files-o"></i> Copy Link
        </label> -->

        <a href="javascript:;"
          v-clipboard:copy="accountBIP32Path"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">
          <i class="fa fa-files-o"></i> Copy Link
        </a>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'CompleteTransaction',
  props: ['accountBIP32Path', 'btcAmount'],
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

  .import-title .account-path {
    font-size: 18px;
    line-height: 24px;
  }

  .import-title {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .account-path {
    margin-bottom: 30px;
  }

  .account-path {
    margin-bottom: 30px;
  }

  .copy-button {
    margin-bottom: 80px;
  }

  .btc-amount {
    margin-bottom: 10px;
  }
}
</style>
