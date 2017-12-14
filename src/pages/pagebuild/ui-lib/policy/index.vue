<template>
    <div>
        <ul>
            <el-button @click="signPolicyHandler">创建合同</el-button>
            <li v-for="segment in data.segments" class="segment-row">
                <span class="segment-detail">合同ID {{segment.detail.segmentId}}</span>
                <el-radio class="select-btn" v-model="data.selectedSegmentId"
                          :label="segment.detail.segmentId">选择
                </el-radio>
            </li>
        </ul>
    </div>
</template>

<script>
    import Policy from './index.js'
    export default Policy
</script>