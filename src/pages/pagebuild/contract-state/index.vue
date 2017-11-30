<template>
    <div class="contract-state-wrap" ref="wrapper">
        <el-popover
                ref="popover"
                popper-class="tip js-svg-tip"
                placement="top"
                width="250">
        </el-popover>

        <svg ref="stateTree"></svg>
    </div>
</template>

<script>
    import ContractState from './index'

    export default ContractState
</script>

<style lang="less">
    @import "index.less";
</style>