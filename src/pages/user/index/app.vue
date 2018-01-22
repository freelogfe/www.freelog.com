<template>
  <div id="app">
    <div class="main-content">
      <el-main>
        <account-list></account-list>
        <div class="main-content">
          <el-tabs v-model="activeTabName">
            <el-tab-pane label="已购买资源" name="trade">
              <contract-list></contract-list>
            </el-tab-pane>
            <el-tab-pane label="支付订单" name="orders">
              <user-order-list></user-order-list>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
  import NavTopBar from '@/components/nav-top/index.vue'
  import AccountList from './accounts/index.vue'
  import ContractList from './contracts/index.vue'
  import UserOrderList from './orders/index.vue'

  export default {
    data() {
      return {
        activeTabName: 'trade'
      }
    },
    mounted() {
    },
    components: {
      NavTopBar,
      AccountList,
      ContractList,
      UserOrderList
    },
    methods: {
      loadUserInfo() {
        var self = this;
        window.fetch('/v1/userinfos/current', {
          credentials: 'same-origin'
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.user = data.data;
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "app.less";
</style>
