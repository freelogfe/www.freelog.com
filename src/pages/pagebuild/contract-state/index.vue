<template>
    <div class="contract-state-wrap" ref="wrapper" @click="hidePopover">
        <el-popover
                ref="popover"
                popper-class="tip js-svg-tip"
                placement="top"
                trigger="click"
                width="250">
            <div>
                <div v-show="popData.type == 'node'">
                    <h3>state:{{popData.state}}</h3>
                    <ul>
                        <li>isActiveState: {{popData.isActive}}</li>
                        <li>isProcess: {{popData.isProcess}}</li>
                        <li>isFinish: {{(popData.isFinish === undefined)? 'false': popData.isFinish}}</li>
                    </ul>
                </div>
                <div v-if="popData.type == 'path'&& popData.source">
                    <p>event name: {{popData.event.eventName}}</p>
                    <p>from {{popData.source.data.state}} to {{popData.target.data.state}}</p>
                    <el-button size="mini" @click="activateContractHandler(popData)">trigger</el-button>
                </div>
            </div>
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