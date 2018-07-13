//异常码对应的解释和event
const ExceptionCode = {
  401: {
    desc: '节点的合同未激活',
    tip: '去通知节点',
    action: 'notifyNodeHandler'
  },
  402: {
    desc: '节点合同中的策略身份认证失败',
    tip: '查看策略'
  },
  403: {
    desc: '未找到有效的节点合同',
    tip: '去通知节点',
    action: 'notifyNodeHandler'
  },
  404: {
    desc: '未找到节点信息',
    action: 'reportHandler',
    tip: '我要上报'
  },
  501: {
    desc: '用户的合同未激活',
    tip: '去激活合同'
  },
  502: {
    desc: '资源策略拒绝',
    tip: '查看策略'
  },
  503: {
    desc: '未创建资源合同',
    tip: '去创建合同'
  },
  505: {
    desc: '未登录用户',
    action: 'loginHandler',
    tip: '去登录'
  },
  506: {
    desc: '选择需要执行的合同.一般有两个或两个以上的时候需要用户选择具体执行哪个',
    tip: '去选择合同'
  },
  601: {
    desc: '身份认证失败',
    action: 'loginHandler',
    tip: '去登录'
  },
  900: {
    desc: '未知异常',
    action: 'reportHandler',
    tip: '我要上报'
  }
}

export default ExceptionCode