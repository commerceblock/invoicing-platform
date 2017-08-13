import Vue from 'vue'
import Router from 'vue-router'
import Hello from './components/Hello.vue'
// import Hello from '@/components/Hello'
// import InvoiceSummary from '@/components/invoice-summary/InvoiceSummary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/invoice-summary',
      name: 'invoice-summary',
      component: InvoiceSummary
    }
  ]
})
