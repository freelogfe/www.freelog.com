<template>
  <div>
    <nav-top-bar></nav-top-bar>
    <el-container class="app-container">
      <el-header class="header" v-if="user">
        <div class="banner-portrait inline">
          <a href="/pages/user/index.html">
            <img class="portrait-img"
                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII"
                 alt="">
          </a>
        </div>
        <div class="banner-main  inline">
          <div class="banner-main-hello">
            <p class="user-name">{{user.nickname}}</p>
          </div>
          <div class="banner-main-detail">
            <div class="user-account inline"><label>账户： </label>{{user.mobile||user.email}}</div>
            <i class="split-line">|</i>
            <div class="update-date inline">{{user.updateDate|fmtDate}}</div>
          </div>
        </div>
      </el-header>
      <el-main style="background: white;">
        <div id="main-app"></div>
      </el-main>
    </el-container>
  </div>
</template>


<script>
  import NavTopBar from '@/components/nav-top/index.vue'
  import store from '@/lib/storage';

  export default {
    data() {
      return {
        user: store.get('userInfo') || {},
      }
    },
    mounted() {
    },
    components: {
      NavTopBar
    },
    methods: {}
  }
</script>
<style lang="less">
  @import "index.less";

  .app-container {
    width: 990px;
    margin: auto;
  }
</style>
