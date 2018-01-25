<template>
  <div class="contract-state-wrap" ref="wrapper" @click="hidePopover">
    <el-dialog
            :title="eventComponentOpt.title"
            append-to-body
            ref="eventDialog"
            :visible.sync="showEventDialog"
            :before-close="hideDialogHandler"
            width="40%">
      <component :is="eventComponentOpt.name" :data="eventComponentOpt.data" @close="closeDialogHandler"></component>
      </span>
    </el-dialog>

    <el-popover
            ref="popover"
            popper-class="contract-step-tip js-svg-tip"
            width="250">
      <div>
        <div v-show="popData.type == 'node'">
          <h3>合同状态:{{popData.state}}</h3>
          <ul>
            <li v-show="popData.isActive">当合同状态处于此状态时，合同则有效</li>
            <li v-show="popData.isProcess">合同处于当前状态</li>
            <li v-show="popData.isFinish">当前状态已执行过</li>
          </ul>
        </div>
        <div v-if="popData.type == 'path'&& popData.source">
          <p>event name: {{popData.event.eventName}}</p>
          <p>from {{popData.source.data.state}} to {{popData.target.data.state}}</p>
          <el-button size="mini" @click="activateContractHandler(popData)" :disabled="popData.disabled">去执行</el-button>
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
