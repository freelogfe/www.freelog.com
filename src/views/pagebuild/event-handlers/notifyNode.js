export default function notifyNode({ appUiVm }, options) {
  let msg = options.msg
  msg = typeof msg === 'string' ? msg : '节点资源合同未生效，已通知节点'
  appUiVm.$message({
    type: 'error',
    message: msg
  })
}
