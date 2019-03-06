export default function handleAuthError({ appUiVm, $i18n }, options, callback) {
  const response = options.response

  let presentableInfo
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
    console.error('[handleAuthError] ' + $i18n.t('pagebuild.authError.msg'))
    window.FreelogApp.trigger('AUTH_ERROR')
    //待完善错误提示
  }

  function _unactivatedHandler(presentableInfoData) {
    appUiVm.showAuthDialog([presentableInfoData])
  }

  function _unSignHandler(presentableInfoData) {
    appUiVm.showAuthDialog([presentableInfoData])
  }
}
