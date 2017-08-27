<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          
          <div class="modal-header center">
            <slot name="header">
              <span class="tab-title">Contract Verified</span>
              <button type="button" class="close" data-dismiss="modal" @click="close">&times;</button>
            </slot>
          </div>
          
          <div class="modal-body">
            <slot name="body">
              <img src="/static/assets/file-commerceblock.svg" />
              <div class="contract-verified-description">Now that the contract has been verified and encrypted all you need to do is send the invoice link to the other party.</div>
              <div class="row">
                <div class="col-xs-9">
                  <input class="form-control" readonly="readonly" type="text" v-model="invoiceLink" />
                </div>
                <div class="col-xs-3">
                  <a v-clipboard:copy="invoiceLink" v-clipboard:success="onCopy" v-clipboard:error="onError"><i class="fa fa-files-o"></i> Copy Link</a>
                </div>
              </div>
              <div class="done-btn">
                <button class="btn btn-success btn-lg" type="submit" @click="close">Done</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ContractVerifiedModal',
  props: ['linkId'],
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
  computed: {
    invoiceLink: function() {
      return `https://trade.commerceblock.com/invoices/${this.linkId}`
    }
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  text-align: center;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  height: 440px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.tab-title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.contract-verified-description {
	color: #141414;
	font-family: "Open Sans";
	font-size: 18px;
	line-height: 24px;
	text-align: center;
  margin: 15px;
}

a, a:link, a:visited, a:hover, a:active {
  padding-top: 5px;
  color: #258C42;
}

.done-btn {
  margin: 20px;
}
</style>
