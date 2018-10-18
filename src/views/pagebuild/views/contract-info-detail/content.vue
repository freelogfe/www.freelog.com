<template>
  <div class="contract-detail-content-wrapper">
    <div v-html="segmentDetail" @click="cmdHandler"></div>
  </div>
</template>

<script>
import compiler from '@freelog/presentable-policy-compiler'

const contractEventsMap = {
  transaction() {
    return '支付事件'
  },
  signing() {
    return '进入协议签署页面'
  },
  contractGuaranty() {
    return '进入支付保证金'
  },
  period() {
    return '周期性支付'
  },
  arrivalDate(params) {
    if (params[0] === 1) {
      return `到达日期${params[1]}进入下一个状态`
    } else if (params[0] === 0) {
      return `${params[1]}天后进入下一个状态`
    }
    return ''
  }
}

export default {
  name: 'contract-content',

  data() {
    return {
      segmentDetail: ''
    }
  },

  props: {
    data: {
      type: Object
    }
  },
  watch: {
    data: 'render'
  },
  mounted() {
    this.render()
  },
  methods: {
    render() {
      try {
        this.currentEvents = this.resolveContractEvents(this.data)
        this.segmentDetail = this.parseContract(this.data)
      } catch (e) {
        console.log('e ----', e)
      }
    },
    cmdHandler(event) {
      const action = event.target.dataset.action
      if (this[action]) {
        this[action](event.target.dataset)
      }
    },
    execEvent(params) {
      this.$emit('execute', this.currentEvents[params.index])
    },
    resolveContractEvents(detail) {
      const events = []
      const fsmState = detail.fsmState
      const stateTransitionMap = detail.policySegment.fsmDescription
      const corresponseEvents = []

      stateTransitionMap.forEach((transition) => {
        if (transition.currentState === fsmState) {
          corresponseEvents.push(transition)
        }
      })

      const pushEvent = (event) => {
        const eventFn = contractEventsMap[event.type] // 好像没什么用？
        if (eventFn) {
          events.push({
            desc: eventFn(event.type),
            eventId: event.eventId, // 用于test，实际要删除
            type: event.type,
            params: event.params
          })
        }
      }

      corresponseEvents.forEach((transition) => {
        if (transition.event.type === 'compoundEvents') {
          transition.event.params.forEach(pushEvent)
        } else {
          pushEvent(transition.event)
        }
      })

      return events
    },
    fillSpace(line) {
      return line.replace(/^(\s+)/g, ($) => {
        const spaceArr = new Array($.length)
        spaceArr.fill('&nbsp;&nbsp;')
        return spaceArr.join('')
      })
    },
    getState(state) {
      const contract = this.data
      const cls = []

      if (state === contract.fsmState) {
        cls.push('cur-state')
      }

      if (contract.policySegment.activatedStates.includes(state)) {
        cls.push('active-state')
      }

      return cls.join(' ')
    },
    tagState(html) {
      const reg = /in (\S+)\s*:/
      html = html.replace(reg, ($, $1) => {
        const $$ = this.escapeOutputState($1)

        const cls = this.getState($1)
        const htmlstr = `<span class="from-state ${cls}" data-action="info" data-state="${$1}">${$$}<i class="el-icon-fa-stop-circle-o cur-step-icon"></i><span class="state-tip">当前合同状态</span></span>`
        return $.replace($1, htmlstr)
      })

      return html
    },
    getEvent(eventDesc) {
      const events = this.currentEvents
      let result

      events.forEach((event, i) => {
        const flag = event.params.every(p => (eventDesc.includes(p)))
        if (flag) {
          result = event
          result.index = i
        }
      })
      return result
    },
    escapeOutputState(state) {
      state = state.replace('<', '&lt;').replace('>', '&gt;')
      return state
    },
    tagOperation(html) {
      const reg = /proceed\s+to\s+(\S+)\s+on\s+(.+)$/
      html = html.replace(reg, ($, $1, $2) => {
        const event = this.getEvent($2)
        let index = -1
        const toState = this.escapeOutputState($1)
        const snippet1 = `<span class="to-state">${toState}</span>`
        let snippet2 = ''

        // 正在进行中的事件
        if (event) {
          index = event.index
          snippet2 = `<span class="operation-tag" data-action="execEvent" data-index="${index}">${$2}<i class="el-icon-fa-hand-o-left cur-step-icon"></i></span>`
        } else {
          snippet2 = `<span class="operation-tag">${$2}</span>`
        }

        $ = $.replace($1, snippet1)
        $ = $.replace($2, snippet2)
        return $
      })

      return html
    },
    parseContract(detail) {
      const lines = compiler.beautify(detail.policySegment.policyText).split(/\n/)
      let text = ''
      lines.forEach((line) => {
        let html = this.fillSpace(line)
        html = this.tagState(html)
        html = this.tagOperation(html)
        text += `<p>${html}</p>`
      })
      detail._segmentDetail = text
      return text
    },
  }
}
</script>

<style lang="less">
  @import "content.less";
</style>
