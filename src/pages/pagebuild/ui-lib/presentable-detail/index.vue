<template>
    <div class="presentable-detail">
        <ul class="presentable-info">
            <li>
                <label class="info-title">presentable名：</label>
                <span class="info-content">{{data.name}}</span>
            </li>
            <li>
                <label class="info-title">资源名：</label>
                <span class="info-content">{{data.resourceDetail.resourceName}}</span>
            </li>
            <li>
                <label class="info-title">资源类型：</label>
                <span class="info-content">{{data.resourceDetail.resourceType}}</span>
            </li>
            <template v-if="data.contractDetail">
                <li>
                    <label class="info-title">合同状态：</label>
                    <span class="info-content">{{CONTRACT_STATUS_TIPS[data.contractDetail.status]}}</span>
                </li>
                <li>
                    <label class="info-title">合同用户：</label>
                    <span class="info-content">{{data.contractDetail._userGroup}}</span>
                </li>
                <li>
                    <label class="info-title">合同甲方：</label>
                    <span class="info-content">{{data.contractDetail.partyOne}}</span>
                </li>
                <li>
                    <label class="info-title">合同乙方：</label>
                    <span class="info-content">{{data.contractDetail.partyTwo}}</span>
                </li>
                <li>
                    <label class="info-title">合同创建时间：</label>
                    <span class="info-content">{{data.contractDetail.createDate|fmtDate}}</span>
                </li>
                <li>
                    <label class="info-title">合同当前状态：</label>
                    <!--创建合同后，后端存在异步初始化的过程，这时合同状态为none-->
                    <span class="info-content">
                        {{data.contractDetail.fsmState==='none'?'正在初始化合同中':data.contractDetail.fsmState}}
                    </span>
                </li>
            </template>
        </ul>
        <div v-if="data.contractDetail">
            <el-collapse :value="collapseName">
                <el-collapse-item title="合同内容" name="policy">
                    <pre>{{data.policyText}}</pre>
                </el-collapse-item>
                <el-collapse-item title="合同流程" name="process">
                    <contract-state class="contract-state-chart" :data="data.contractDetail"></contract-state>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    import PresentableDetail from './index.js'

    export default PresentableDetail
</script>

<style scoped lang="less">
    @import "index.less";
</style>
