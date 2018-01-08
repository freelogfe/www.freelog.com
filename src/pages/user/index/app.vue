<template>
  <div id="app">
    <div class="main-content">
      <el-main>
        <account-list></account-list>
        <div class="main-content">
          <el-menu default-active="1" mode="horizontal">
            <el-menu-item index="1">已购买资源</el-menu-item>
          </el-menu>
          <div class="contentBody">
            <contract-list></contract-list>
          </div>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
  import UserNavBar from '@/pages/userCenterNavBar/index.vue';
  import NavTopBar from '@/components/nav-top/index.vue'
  import AccountList from './accounts/index.vue'
  import ContractList from './contracts/index.vue'

  export default {
    data() {
      return {
      }
    },
    mounted() {

    },
    components: {
      UserNavBar,
      NavTopBar,
      AccountList,
      ContractList
    },
    methods: {
      loadUserInfo() {
        var self = this;
        window.fetch('//api.freelog.com/v1/userinfos/10024', {
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
