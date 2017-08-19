<template>
  <div class="wrapper">
    <modal v-if="showEntranceModal" @close="showEntranceModal = false" />
    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Message: {{ hello }}</h2>
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
