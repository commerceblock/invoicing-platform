<template>
  <div class="wrapper">
    <modal v-if="showEntranceModal" @close="showEntranceModal = false" />

    <div class="navbar-wrapper">
    <div class="container-fluid">
        <nav class="navbar navbar-fixed-top">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/#">
                      <img class="commerce-block-white-bg" src="/static/assets/white-logo.png" />
                      <span class="commerce-block-green"><img src="/static/assets/company-name.svg" /></span>
                    </a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="/#" class="">Invoices</a></li>
                    </ul>
                    <ul class="nav navbar-nav pull-right">
                        <li class=""><a href="#">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</div>
<div class="container">
    <div class="row" style="margin-top:60px">
    </div>
</div>



  </div>
</template>

<script>
import gql from 'graphql-tag'
import Modal from './EntranceModal.vue'

export default {
  name: 'hello',
  components: {
    Modal
  },
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hello: 'foo4life!',
      showEntranceModal: true
    }
  },
  apollo: {
    invoiceByLink: {
      query: gql`query { invoiceByLink(linkId : "dddd") {
          invoiceId
          title
        }}`
    }
  }
}
</script>

<style scoped>
.navbar {
	height: 64px;
	width: 1440px;
	background-color: #36373A;
	box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.25);
}
</style>
