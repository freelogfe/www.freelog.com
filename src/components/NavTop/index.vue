<template>
  <div class="nav-top-wrapper" v-if="userInfo">
    <div class="nav-top-container">
      <ul class="nav-top-right">
        <li class="nav-top-item">
          <!--{{userInfo.nickname}}-->
          <!--<el-dropdown @command="handleNavTopCommand">-->
                      <!--<span class="el-dropdown-link">-->
                        <!--{{userInfo.nickname}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                      <!--</span>-->
            <!--<el-dropdown-menu slot="dropdown">-->
              <!--<el-dropdown-item command="gotoAccountSetting">账户设置</el-dropdown-item>-->
            <!--</el-dropdown-menu>-->
          <!--</el-dropdown>-->
        </li>
        <li class="nav-top-item" @click="logoutHandler">{{$t('navTop.logout')}}</li>
        <li class="nav-top-item"><a href="/">{{$t('navTop.myFreelog')}}</a></li>
        <li class="nav-top-item">
          <el-dropdown @command="handleCommand" trigger="click" style="height: 20px; margin-top: 6px;">
            <span class="el-dropdown-link">
              <img class="language-icon" src="../../assets/img/language.png" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
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
