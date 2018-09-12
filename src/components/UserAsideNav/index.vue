<template>
  <el-aside width="260px" class="user-aside-nav-wrap" v-if="user">
    <div class="user-portrait">
      <div class="center">
        <a href="/pages/user/index.html">
          <img class="portrait-img"
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII"
               alt="">
        </a>
        <p class="user-name">{{user.nickname}}</p>
      </div>
    </div>

    <ul class="user-nav-tabs">
      <li class="user-nav-item"
          @click="switchNavHandler(navItem)"
          :class="{active: navItem.name=== activeNavName}"
          :nav-name="navItem.name"
          v-for="(navItem,index) in navs">
        {{navItem.title}}
      </li>
    </ul>
  </el-aside>
</template>

<script>
  import UserAsideNav from './index'

  export default UserAsideNav
</script>

<style lang="less" scoped>
  @import "index.less";
</style>