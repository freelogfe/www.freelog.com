export default function handleAuthError({appUiVm}, options, callback) {
  const response = options.response
  var presentableInfo
  if (response.data) {
    presentableInfo = response.data.presentableInfo || (response.data.data && response.data.data.presentableInfo)
  }

  if (response && response.errcode && presentableInfo) {
    switch (response.errcode) {
      // 未激活状态
      case 501:
        _unactivatedHandler(presentableInfo)
        break
      // 未签约状态
      case 502:
      case 503:
      case 504:
        _unSignHandler(presentableInfo)
        break
      // 节点与资源之间的合约未生效
      case 401:
        window.FreelogApp.trigger('NOTIFY_NODE')
        break
      default:
        // _connectCustomerService(presentableInfo)
        break
    }

    if (typeof callback === 'function') {
      appUiVm.$once('close', (data) => {
        callback(data)
      })
    }
  } else {
    console.error(`[${arguments.callee.name}] 参数有误`)
  }

  function _unactivatedHandler(presentableInfo) {
    appUiVm.showAuthDialog([presentableInfo])
  }

  function _unSignHandler(presentableInfo) {
    appUiVm.showAuthDialog([presentableInfo])
  }
}
