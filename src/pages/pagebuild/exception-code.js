//异常码对应的解释和event
const ExceptionCode = {
  70080101: {
    desc: '未找到用户合同',
    tip: '去创建合同'
  },
  70080102: {
    desc: '选择需要执行的合同.一般有两个或两个以上的时候需要用户选择具体执行哪个',
    tip: '去选择合同'
  },
  70080103: {
    desc: '参数userContractId错误,找不到有效的合同',
    tip: '数据错误'
  },
  70080104: {
    desc: '用户的合同未激活',
    tip: '去激活合同'
  },
  70080105: {
    desc: '用户合同授权异常',
    tip: '去查看合同状态'
  },
  70080201: {
    desc: '未找到节点与资源的合同信息',
    tip: '去通知节点'
  },
  70080202: {
    desc: '节点的合同未激活',
    tip: '去通知节点'
  },
  70080203: {
    desc: '节点合同授权异常',
    tip: '去通知节点'
  },
  70080301: {
    desc: '未登陆用户',
    action: 'loginHandler',
    tip: '去登录'
  },
  70080302: {
    desc: '个人身份授权不通过',
    tip: '去通知节点'
  },
  70080303: {
    desc: '用户分组策认证不通过',
    tip: '去查看用户分组策略'
  },
  70080304: {
    desc: '未找到节点信息',
    tip: ''
  },
  70080305: {
    desc: '资源策略拒绝',
    tip: '查看策略'
  },
  70080306: {
    desc: 'presentable策略拒绝',
    tip: '查看策略'
  },
  70080307: {
    desc: '身份认证失败',
    action: 'loginHandler',
    tip: '去登录'
  },
  70080000: {
    desc: '未知异常',
    action: 'reportHandler',
    tip: '我要上报'
  }
}

export default ExceptionCode