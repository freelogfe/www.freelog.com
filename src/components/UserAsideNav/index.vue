<template>
  <el-aside width="260px" class="user-aside-nav-wrap" v-if="user">
    <div class="user-portrait">
      <div class="center">
        <a href="javascript:;" @click="gotoMyProfile">
          <img v-if="user.avatarUrl" class="portrait-img"
               :src="user.avatarUrl"
               alt="">
          <span v-else>去上传头像</span>
        </a>
        <p class="user-name">{{user.nickname}}</p>
      </div>
    </div>

    <ul class="user-nav-tabs">
      <li class="user-nav-item"
          @click="switchNavHandler(navItem)"
          :class="{active: navItem.name=== activeNavName}"
          :nav-name="navItem.name"
          :key="navItem.name"
          v-for="navItem in navs">
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
