<template>
    <div>
        <el-steps :active="step" class="contract-steps" finish-status="success" simple>
            <el-step title="1、创建合同"></el-step>
            <el-step title="2、执行合同"></el-step>
            <el-step title="3、有效合同"></el-step>
        </el-steps>
    </div>
</template>

<script>
    import ContractStep from './index.js'

    export default ContractStep
</script>

<style scoped lang="less">
.contract-steps {
    line-height: 1;
}
</style>