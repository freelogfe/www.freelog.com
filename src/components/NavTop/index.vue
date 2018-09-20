<template>
  <div class="nav-top-wrapper">
    <div class="nav-top-container" v-if="userInfo">
      <ul class="nav-top-right">
        <li class="nav-top-item">
          <el-dropdown @command="handleNavTopCommand">
                      <span class="el-dropdown-link">
                        {{userInfo.nickname}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="gotoAccountSetting">账户设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="nav-top-item" @click="logoutHandler">退出</li>
        <li class="nav-top-item"><a href="/">我的feth</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import NavTopBar from './index'

export default NavTopBar
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
