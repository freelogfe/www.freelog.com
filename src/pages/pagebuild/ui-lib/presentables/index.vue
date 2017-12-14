<template>
    <div>
        <el-table
                :data="data"
                ref="tableRef"
                stripe
                style="width: 100%">
            <el-table-column
                    label="资源名称"
                    prop="tagInfo.resourceInfo.resourceName">
            </el-table-column>
            <el-table-column
                    label="合同名称"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="资源类型"
                    prop="tagInfo.resourceInfo.resourceType"
                    width="120px">
            </el-table-column>
            <el-table-column
                    label="状态"
                    prop="statusTip">
            </el-table-column>
            <el-table-column label="操作" align="center" width="120px">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="tabActionHandler(scope.row, scope.$index)">
                        {{CONTRACT_STATUS_ACTION_TIPS[scope.row.contractStatus]}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import Presentables from './index.js'
    export default Presentables
</script>