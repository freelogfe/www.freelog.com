<template id="userNavBar">
  <el-menu :default-active="index" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">我的钱包</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
    <el-menu-item index="3">收藏夹</el-menu-item>
    <el-menu-item index="4"><a href="/pages/userResource.html">已购买资源</a></el-menu-item>
    <el-menu-item index="5">账户管理</el-menu-item>
  </el-menu>
</template>

<script>
    import UserNavBar from './index.js'
    export default UserNavBar
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
