<template>
    <div class="tool-bar-wrap">
        <div class="user-tab"><i class="el-icon-fa-user" aria-hidden="true"></i></div>
    </div>
</template>

<script>
    import ToolBar from './index'
    export default ToolBar
</script>

<style lang="less" scoped>
.tool-bar-wrap {
    background-color: #333333;
    position: fixed;
    width: 35px;
    z-index: 9;
    top: 0;
    right: 0;
    bottom: 0;
    color: white;
}
</style>