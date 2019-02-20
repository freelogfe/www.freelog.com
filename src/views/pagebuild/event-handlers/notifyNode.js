export default function notifyNode({ appUiVm, $i18n }, options) {
  let msg = options.msg

  msg = typeof msg === 'string' ? msg : $i18n.t('pagebuild.notifyNode.msg')
  appUiVm.$message({
    type: 'error',
    message: msg
  })
}
