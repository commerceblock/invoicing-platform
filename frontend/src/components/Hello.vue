<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Message: {{ hello }}</h2>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      hello: 'foo4life!'
    }
  },
  apollo: {
    invoiceByLink: {
      query: gql`query { invoiceByLink(linkId : "dddd") {
          invoiceId
          title
        }}`,
      pollInterval: 1000 // ms
    }
  }
}
</script>
