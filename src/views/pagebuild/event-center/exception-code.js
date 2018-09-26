
// 异常码对应的解释和eventName
import { HANDLE_INVALID_AUTH, GO_TO_LOGIN, REPORT_ERROR, NOTIFY_NODE } from './event-name'

const noLogin = {
  desc: '未登录用户',
  tip: '去登录',
  eventName: GO_TO_LOGIN
}
const exceptionCodes = {
  301: {
    desc: '资源合同未激活',
    tip: '去通知节点',
    eventName: NOTIFY_NODE
  },
  401: {
    desc: '节点的合同未激活',
    tip: '去通知节点',
    eventName: NOTIFY_NODE
  },
  402: {
    desc: '节点合同中的策略身份认证失败',
    tip: '查看策略',
    eventName: HANDLE_INVALID_AUTH
  },
  403: {
    desc: '未找到有效的节点合同',
    tip: '去通知节点',
    eventName: NOTIFY_NODE
  },
  404: {
    desc: '未找到节点信息',
    tip: '我要上报',
    eventName: REPORT_ERROR
  },
  501: {
    desc: '用户的合同未激活',
    tip: '去激活合同',
    eventName: HANDLE_INVALID_AUTH
  },
  502: {
    desc: '资源策略拒绝',
    tip: '查看策略',
    eventName: HANDLE_INVALID_AUTH
  },
  503: {
    desc: '未创建资源合同',
    tip: '去创建合同',
    eventName: HANDLE_INVALID_AUTH
  },
  505: noLogin,
  28: noLogin,
  30: noLogin,
  506: {
    desc: '选择需要执行的合同.一般有两个或两个以上的时候需要用户选择具体执行哪个',
    tip: '去选择合同',
    eventName: HANDLE_INVALID_AUTH
  },
  601: {
    desc: '身份认证失败',
    tip: '去登录',
    eventName: GO_TO_LOGIN
  },
  900: {
    desc: '未知异常',
    tip: '我要上报',
    eventName: REPORT_ERROR
  }
}


export default exceptionCodes
