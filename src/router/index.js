import Vue from 'vue'
import Router from 'vue-router'

import MyResourcesView from '@/views/user/resources/index.vue'
import MyAccountsView from '@/views/user/accounts/index.vue'
import MyProfileView from '@/views/user/profile/index.vue'
import MyCollectionsView from '@/views/user/collections/index.vue'
import AccountCreateView from '@/views/user/accounts/create.vue'
import AccountRechargeView from '@/views/user/accounts/recharge.vue'
import AccountTransactionRecordsView from '@/views/user/accounts/records.vue'
import AccountResetPayPasswordView from '@/views/user/accounts/reset.vue'
import AccountWithdrawView from '@/views/user/accounts/withdraw.vue'
import AccountTransferView from '@/views/user/accounts/transfer.vue'
import ResourceContractDetailView from '@/views/user/resources/detail.vue'

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }
  const position = {}
  if (to.hash) {
    position.selector = to.hash
  }

  if (to.meta.scrollToTop !== false) {
    position.x = 0
    position.y = 0
  }
  return position
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior,
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/accounts'
    },
    {
      path: '/accounts',
      meta: {
        title: '我的账户',
        theme: 'transparent'
      },
      component: MyAccountsView
    },
    {
      path: '/accounts/create',
      name: 'accountCreate',
      meta: {
        title: '创建账户'
      },
      component: AccountCreateView
    },
    {
      path: '/accounts/recharge',
      name: 'accountRecharge',
      meta: {
        title: '账户充值'
      },
      component: AccountRechargeView
    },
    {
      path: '/accounts/records',
      name: 'accountRecords',
      meta: {
        title: '账户交易记录'
      },
      component: AccountTransactionRecordsView
    },
    {
      path: '/accounts/reset',
      name: 'accountReset',
      meta: {
        title: '账户充值密码'
      },
      component: AccountResetPayPasswordView
    },
    {
      path: '/accounts/withdraw',
      name: 'accountWithdraw',
      meta: {
        title: '账户提现'
      },
      component: AccountWithdrawView
    },
    {
      path: '/accounts/transfer',
      name: 'accountTransfer',
      meta: {
        title: '账户转账'
      },
      component: AccountTransferView
    },
    {
      path: '/resources',
      meta: { title: '我的资源' },
      component: MyResourcesView
    },
    {
      path: '/resources/detail',
      meta: { title: '资源详情' },
      component: ResourceContractDetailView
    },
    {
      path: '/profile',
      meta: { title: '我的账号' },
      component: MyProfileView
    },
    {
      path: '/collections',
      meta: { title: '我的关注' },
      component: MyCollectionsView
    },
    {
      path: '*',
      meta: {
        requiresAuth: false,
        title: 'not found'
      },
      redirect: '/',
      // component: Views.layout,
      children: [{
        name: '404',
        path: '',
        meta: {
          requiresAuth: false,
          title: '404'
        }
        // component: Views.error
      }]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ]
})
