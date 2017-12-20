<template>
    <div>
        <contract-steps :step="1" v-show="data._showContractSteps"></contract-steps>

        <presentable-detail class="contract-detail" :data="data"></presentable-detail>

        <div>
            <h3 class="contract-title">合同流程</h3>
            <contract-state class="contract-state-chart" :data="data.contractDetail"></contract-state>
        </div>
    </div>
</template>

<script>
    import Contract from './index.js'

    export default Contract
</script>

<style scoped lang="less">
    .contract-detail {
        margin-top: 15px;
    }

    .contract-title {
        margin-bottom: 6px;
        text-align: center;
    }
</style>