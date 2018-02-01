<template>
    <ul class="tool-bar-wrap" v-show="!hidden" @keyup.ctrl.84="toggleToolBar">
        <li class="user-tab" title="个人中心"><a href="//www.freelog.com/pages/user/index.html" target="_blank"><i class="el-icon-fa-user" aria-hidden="true"></i></a></li>
        <li class="contract-tab" @click="showAuthDialog" title="合同管理"><i class="el-icon-document"></i></li>
    </ul>
</template>

<script>
    import ToolBar from './index'
    export default ToolBar
</script>

<style lang="less" scoped>
@import "index.less";

</style>