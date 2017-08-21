
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Portal from '../components/portal/Home.vue';
import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue';
import InvoicesManager from '../components/portal/InvoicesManager.vue';
import CreateInvoice  from '../components/portal/CreateInvoice.vue';
import ViewInvoice from '../components/portal/ViewInvoice.vue'
import RedeemInvoice from '../components/portal/RedeemInvoice.vue'

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
        }, {
          path: '/portal/invoices/:id',
          name: 'ViewInvoice',
          component: ViewInvoice,
          props: (route) => ({ invoiceId: route.params.id })
        }, {
          path: '/portal/invoices/:id/redeem',
          name: 'RedeemInvoice',
          component: RedeemInvoice,
          props: (route) => ({ invoiceId: route.params.id })
        }
      ]
    },
    {
      path: '/invoices/:id',
      name: 'InvoiceSummary',
      component: InvoiceSummary,
      props: (route) => ({ linkId: route.params.id })
    }
  ]
});
