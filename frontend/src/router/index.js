
// imports
import Vue from 'vue';
import Router from 'vue-router';

// local imports
import Portal from '../components/portal/Home.vue';
import InvoiceSummary from '../components/invoice-summary/InvoiceSummary.vue';
import InvoicesManager from '../components/portal/InvoicesManager.vue';
import CreateInvoice  from '../components/portal/CreateInvoice.vue';
import ViewInvoice from '../components/portal/ViewInvoice.vue';
import RedeemInvoice from '../components/portal/redeem-invoice/RedeemInvoice.vue';
import Login from '../components/portal/Login.vue';
import { requireAuth } from './auth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      component: Portal,
      beforeEnter: requireAuth,
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
          props: (route) => ({
            invoiceId: route.params.id,
            linkId: route.query.link_id
          })
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
