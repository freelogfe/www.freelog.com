<template>
    <div>
        <contract-steps :step="1" v-show="showContractSteps"></contract-steps>

        <contract-info-detail class="contract-detail" :data="data" collapseName="process"></contract-info-detail>
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