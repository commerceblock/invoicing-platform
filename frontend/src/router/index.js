
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Portal from '../components/portal/Home.vue';
import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue';
import InvoicesManager from '../components/portal/InvoicesManager.vue';
import CreateInvoice  from '../components/portal/CreateInvoice.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Portal,
      children: [
        {
          path: '/',
          component: InvoicesManager,
          name: 'InvoicesManager'
        }, {
          path: '/portal/invoices/',
          component: CreateInvoice,
          name: 'CreateInvoice'
        }
      ]
    },
    {
      path: '/invoices/:id',
      name: 'invoice-summary',
      component: InvoiceSummary,
      props: (route) => ({ linkId: route.params.id })
    }
  ]
});
