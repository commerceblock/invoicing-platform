import Vue from 'vue';
import VueApollo from 'vue-apollo'
import {
  ApolloClient,
  createBatchingNetworkInterface
} from 'apollo-client'
import App from './App.vue';
import router from './router';

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  }),
  connectToDevTools: true
})

Vue.use(VueApollo)

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
