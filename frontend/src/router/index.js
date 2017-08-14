
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Hello from '../components/Hello.vue';
// import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
  ],
});
