<template>
    <div>
        <contract-steps :step="1" v-show="data._showContractSteps"></contract-steps>

        <presentable-detail class="contract-detail" :data="data" collapseName="process"></presentable-detail>
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

</style>