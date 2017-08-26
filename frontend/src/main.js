import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  ApolloClient,
  createNetworkInterface,
} from 'apollo-client';
import App from './App.vue';
import router from './router';
import endpoints from './lib/endpoints';
import { getAccessToken } from './lib/vault';

// Create the apollo client
if (!process.env.BASE_URL) {
  throw new Error('BASE_URL is not defined');
}

// init endpoints
endpoints.initBaseUrl(process.env.BASE_URL);

Vue.use(VueApollo);
Vue.config.productionTip = false;

// portal gql
const portalNetworkInterface = createNetworkInterface({ uri: endpoints.portalGQL() })
  .use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      // get the authentication token from store if it exists
      const accessToken = getAccessToken();
      req.options.headers.authorization = accessToken ? `Bearer ${accessToken}` : null;
      next();
    }
  }]);

const portalApolloClient = new ApolloClient({
  networkInterface: portalNetworkInterface
});

// invoices gql
const invoicesApolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: endpoints.invoicesGQL(),
  }),
});

const apolloProvider = new VueApollo({
  clients: {
    portal: portalApolloClient,
    invoices: invoicesApolloClient,
  },
  defaultClient: portalApolloClient,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App },
});
