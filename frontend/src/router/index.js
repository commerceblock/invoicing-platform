
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Portal from '../components/portal/Home.vue';
import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Portal',
      component: Portal,
    },
    {
      path: '/invoice-summary/:id',
      name: 'invoice-summary',
      component: InvoiceSummary
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
});
