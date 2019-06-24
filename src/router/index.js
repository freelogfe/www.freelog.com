import Vue from 'vue'
import Router from 'vue-router'


import UserLayout from '@/views/layout/user.vue'
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
import AccountListManagerView from '@/views/user/accounts/list.vue'
import AddPayAccountView from '@/views/user/accounts/add-pay-account.vue'
import ResourceContractDetailView from '@/views/user/resources/detail.vue'
import LoginView from '@/views/user/login/index.vue'
import AuthView from '@/views/user/auth/index.vue'
import SignupView from '@/views/user/signup/index.vue'
import RsetPasswordView from '@/views/user/reset-password/index.vue'
import ErrorView from '@/views/error/index.vue'

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
  base: '/',
  routes: [
    {
      path: '/',
      redirect: '/user/accounts'
    },
    {
      path: '/login',
      meta: {
        title: '登录',
        theme: 'transparent'
      },
      component: LoginView
    },
      {
      path: '/auth',
      meta: {
        title: '登录',
        theme: 'transparent'
      },
      component: AuthView
    },
    {
      path: '/signup',
      meta: {
        title: '注册',
        theme: 'transparent'
      },
      component: SignupView
    },
    {
      path: '/reset_pw',
      meta: {
        title: '重置密码',
        theme: 'transparent'
      },
      component: RsetPasswordView
    },
    {
      path: '/user',
      meta: {
        title: '我的账户'
      },
      component: UserLayout,
      children: [{
        path: 'accounts',
        meta: {
          title: '我的账户',
          theme: 'transparent'
        },
        component: MyAccountsView
      }, {
        path: 'create',
        name: 'accountCreate',
        meta: {
          title: '创建账户'
        },
        component: AccountCreateView
      }, {
        path: 'recharge',
        name: 'accountRecharge',
        meta: {
          title: '账户充值'
        },
        component: AccountRechargeView
      }, {
        path: 'records',
        name: 'accountRecords',
        meta: {
          title: '账户交易记录'
        },
        component: AccountTransactionRecordsView
      }, {
        path: 'accounts-manager',
        name: 'accountsManager',
        meta: {
          title: '账号管理'
        },
        component: AccountListManagerView
        // AddPayAccountView
      }, {
        path: 'accounts/add',
        name: 'addPayAccount',
        meta: {
          title: '添加支付账号'
        },
        component: AddPayAccountView
        // AddPayAccountView
      }, {
        path: 'reset',
        name: 'accountReset',
        meta: {
          title: '账户充值密码'
        },
        component: AccountResetPayPasswordView
      }, {
        path: 'withdraw',
        name: 'accountWithdraw',
        meta: {
          title: '账户提现'
        },
        component: AccountWithdrawView
      },
      {
        path: 'transfer',
        name: 'accountTransfer',
        meta: {
          title: '账户转账'
        },
        component: AccountTransferView
      },
      {
        path: 'profile',
        meta: { title: '我的账号' },
        component: MyProfileView
      }, {
        path: 'collections',
        meta: { title: '我的关注' },
        component: MyCollectionsView
      }, {
        path: 'resources',
        meta: { title: '我的资源' },
        component: MyResourcesView
      },
      {
        path: 'resources/detail',
        meta: { title: '资源详情' },
        component: ResourceContractDetailView
      }]
    },
    {
      path: '/*',
      meta: {
        requiresAuth: false,
        title: 'not found',
        error: true
      },
      component: ErrorView,
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
