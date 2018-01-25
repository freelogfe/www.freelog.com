<template>
  <div id="main-app">
    <div style="margin-bottom: 10px">
      <el-button type="primary" @click="initAccountAmount">初始化账户金额</el-button>
    </div>
    <ul class="account-detail" v-if="accountDetail">
      <li>
        <label>accountId</label> <span>{{accountDetail.accountId}}</span>
      </li>
      <li>
        <label>accountType</label> <span>{{accountDetail._accountTypeInfo.name}}</span>
      </li>
      <li>
        <label>balance</label>
        <span>{{accountDetail.balance|humanizeCurrency}} {{accountDetail._accountTypeInfo.abbr}}</span>
      </li>
      <li>
        <label>cardNo</label> <span>{{accountDetail.cardNo}}</span>
      </li>
      <li>
        <label>status</label> <span>{{accountDetail.status}}</span>
      </li>
      <li>
        <label>createDate</label> <span>{{accountDetail.createDate|fmtDate}}</span>
      </li>
      <li>
        <label>updateDate</label> <span>{{accountDetail.updateDate|fmtDate}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
  import querystring from 'querystring'
  import AccountTypes from '@/config/account-types'

  export default {
    data() {
      return {
        accountDetail: null
      }
    },
    mounted() {
      var qs = querystring.parse(location.search.slice(1))
      this.loadAccountDetail(qs.accountId)
        .then(this.format.bind(this))
        .then((account) => {
          this.accountDetail = account
          return account.accountId
        })
        .then(this.loadBalance.bind(this))
    },
    methods: {
      //for test
      initAccountAmount() {
        var accountId = this.accountDetail.accountId
        return this.$axios.get(`/v1/pay/accounts/officaialTap?accountId=${accountId}`).then((res) => {
          var data = res.data
          if (data.errcode === 0) {
            this.accountDetail.balance = data.balance
            this.$message.success('执行成功')
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      format(accountDetail) {
        accountDetail._accountTypeInfo = AccountTypes[accountDetail.accountType]
        return accountDetail
      },
      loadBalance(accountId) {
        return this.$axios.get(`/v1/pay/accounts/balance/${accountId}`).then((res) => {
          var data = res.data
          if (data.errcode === 0) {
            this.accountDetail.balance = data.data.balance
          } else {
            this.$message.error(data.msg)
          }
        })
      },
      loadAccountDetail(accountId) {
        return this.$axios.get(`/v1/pay/accounts/${accountId}`).then((res) => {
          var data = res.data
          if (data.errcode === 0) {
            return data.data
          } else {
            this.$message.error(data.msg)
          }
        })
      }
    }
  }
</script>
<style lang="less">
  @import "app.less";
</style>
