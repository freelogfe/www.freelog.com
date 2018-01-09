<template>
  <div id="main-app">
    <ul class="account-detail">
      <li>
        <label>accountId</label> <span>{{accountDetail.accountId}}</span>
      </li>
      <li>
        <label>accountType</label> <span>{{accountDetail.accountType}}</span>
      </li>
      <li>
        <label>balance</label> <span>{{accountDetail.balance}}</span>
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

  export default {
    data() {
      return {
        accountDetail: {
          "_id": "5a38cb5b60d3701f5d1939c4",
          "updateDate": "2017-12-19T08:18:35.709Z",
          "createDate": "2017-12-19T08:18:35.709Z",
          "accountId": "feth2338e756ac7",
          "accountType": 1,
          "userId": 10022,
          "balance": 0,
          "cardNo": "0x553C9A133e59791F5BF8aF50B6d9eB3A25b00A7b",
          "status": 1
        }
      }
    },
    mounted() {
      var qs = querystring.parse(location.search.slice(1))
      this.loadAccountDetail(qs.accountId)
    },
    methods: {
      loadAccountDetail(accountId) {
//        return this.$axios.get('//api.freelog.com/v1/pay/accounts').then((res) => {
//          var data = res.data
//          if (data.errcode === 0) {
//            return data.data
//          } else {
//            this.$message.error(data.msg)
//          }
//        })
      }
    }
  }
</script>
<style lang="less">
  @import "app.less";
</style>
