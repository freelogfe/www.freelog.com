export default function handleAuthError({ appUiVm }, options, callback) {
  const response = options.response
  const authData = response.data && response.data.data
  if (response && response.errcode) {
    switch (response.errcode) {
      // 未激活状态
      case 501:
        _unactivatedHandler(authData)
        break
        // 未签约状态
      case 502:
      case 503:
      case 504:
        _unSignHandler(authData)
        break
        // 节点与资源之间的合约未生效
      case 401:
        window.FreelogApp.trigger('NOTIFY_NODE')
        break
      default:
        // _connectCustomerService(authData)
        break
    }

    if (typeof callback === 'function') {
      appUiVm.$once('close', (data) => {
        callback(data)
      })
    }
  }

  function _unactivatedHandler() {
    const contracts = authData.contracts || (authData.contract && [authData.contract]) || []
    const resourceIds = contracts.map(item => item.resourceId)

    const userId = window.__auth_info__.__auth_user_id__
    return window.FreelogApp.QI.fetch(`/v1/contracts/contractRecords?resourceIds=${resourceIds}&partyTwo=${userId}&isDefault=1`)
      .then(resp => resp.json())
      .then(res => {
        if(res.errcode === 0) {
          const contractsIDs = res.data.map(contract => contract.contractId)
          appUiVm.showSingleAuthDialog(authData.presentableInfo, contractsIDs)
        }
      })

  }

  function _unSignHandler() {
    appUiVm.showSingleAuthDialog(authData.presentableInfo, [])
  }
}
