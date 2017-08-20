
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Portal from '../components/portal/Home.vue';
import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Portal',
      component: Portal,
    },
    {
      path: '/invoices/:id',
      name: 'invoice-summary',
      component: InvoiceSummary,
      props: (route) => ({ linkId: route.params.id })
    }
  ],
});
