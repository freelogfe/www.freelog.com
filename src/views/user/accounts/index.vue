<template>
  <div class="assets-wrap">
    <div class="account-list-wrap">
      <ul class="account-list">
        <li class="account-item" :key="account.accountId" v-for="account in accounts">
          <div class="account-type-name">{{account.name}}账户</div>
          <div class="account-info-wrap">
            <div class="account-info clearfix" v-if="account.accountId">
              <div class="left-side-content">
                <div class="account-balance">
                  <span>{{account.balance | humanizeCurrency(account.currencyConfig.abbr)}}</span>
                  <i>{{account.showAbbr}}</i>
                </div>
                <div>
                  <div class="acc-digest-info"><label>账户名</label><span class="account-detail-content">{{account.accountName}}</span>
                  </div>
                  <div class="acc-digest-info"><label>账户ID</label><span class="account-detail-content">{{account.accountId}}</span>
                  </div>
                </div>
              </div>
              <div class="rt-side-content">
                <ul class="account-actions clearfix">
                  <li class="account-action-item" @click="accountActionHandler(action.action, account)"
                      :key="action.action"
                      v-for="action in accountActions">
                    <i class="acc-act-icon" :class="[action.icon]"></i>
                    <p>{{action.title}}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div class="no-account-wrap" v-else>
              您还没有{{account.name}}账户，
              <el-button type="text" @click="gotoCreateAccountHandler(account)">去创建+</el-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AccountTypes, { currentTypes } from '@/config/account-types'

export default {
  name: 'my-accounts',

  data() {
    return {
      accounts: [
        {
          name: '人民币',
          currencyType: currentTypes.fcny
        }, {
          name: '美元',
          currencyType: currentTypes.fusd
        }, {
          name: '飞致币',
          currencyType: currentTypes.feth
        }],
      accountActions: [
        {
          title: '充值',
          icon: 'fl-recharge-icon',
          action: 'recharge'
        },
        {
          title: '转账',
          icon: 'fl-transfer-icon',
          action: 'transfer'
        },
        {
          title: '提现',
          icon: 'fl-withdraw-icon',
          action: 'withdraw'
        },
        {
          title: '交易记录',
          icon: 'fl-record-icon',
          action: 'record'
        },
        {
          title: '重置密码',
          icon: 'fl-reset-icon',
          action: 'reset'
        }
      ]
    }
  },
  components: {},
  mounted() {
    this.loadAssets()
      .then(this.formatAssets.bind(this))
      .then((accounts) => {
        const accountsMap = {}
        accounts.forEach((account) => {
          accountsMap[account.currencyType] = account
        })
        this.accounts = this.accounts.map((account) => {
          const accInfo = accountsMap[account.currencyType]
          if (accInfo) {
            Object.assign(account, accInfo)
          }
          return account
        })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    gotoCreateAccountHandler(account) {
      this.gotoAccountActionView({
        route: 'accountCreate',
        query: {
          currencyType: account.currencyType
        }
      })
    },
    accountActionHandler(action, account) {
      const data = {
        route: 'account',
        query: {
          currencyType: account.currencyType,
          accountId: account.accountId
        },
        params: account
      }
      switch (action) {
        case 'recharge':
          data.route += 'Recharge'
          break
        case 'transfer':
          data.route += 'Transfer'
          break
        case 'withdraw':
          data.route += 'Withdraw'
          break
        case 'record':
          data.route += 'Records'
          break
        case 'reset':
          data.route += 'Reset'
          break
        default:
          break
      }

      this.gotoAccountActionView(data)
    },
    gotoAccountActionView(data) {
      this.$router.push({ name: data.route, query: data.query, params: data.params })
    },
    formatAssets(accounts) {
      accounts.forEach((account) => {
        account.currencyConfig = AccountTypes[account.currencyType]
        account.showAbbr = account.currencyConfig.abbr.toUpperCase()
        if (account.showAbbr !== 'FETH') {
          account.showAbbr = account.showAbbr.slice(1)
        }
      })

      return accounts
    },
    loadAssets() {
      return this.$axios.get('/v1/pay/accounts').then(res => res.data.data || [])
    }
  }
}
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
