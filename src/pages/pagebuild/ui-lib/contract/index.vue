<template>
    <div>
        <ul>
            <li>
                资源名称: {{data.resourceDetail.resourceName}}
            </li>
            <li>
                资源类型: {{data.resourceDetail.resourceType}}
            </li>
            <li>
                <el-button
                        size="mini"
                        @click="showContractDetailHandler">
                    查看合同流程
                </el-button>
            </li>
            <li>
                <h3 class="contract-title">合同流程</h3>
                <contract-state class="contract-state-chart" :data="data.contractDetail"></contract-state>
            </li>


        </ul>
    </div>
</template>

<script>
    import Contract from './index.js'

    export default Contract
</script>

<style scoped lang="less">
    .contract-title {
        margin-bottom: 6px;
        text-align: center;
    }
</style>