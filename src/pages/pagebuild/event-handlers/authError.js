export default function handleAuthError(response, callback){
    if (response && response.errcode) {
        var errorMsg = response.msg;
        var authData = response.data && response.data.data
        switch (response.errcode) {
          //未激活状态
          case 501: 
            _unactivatedHandler(authData)
            break
          //未签约状态
          case 502:
          case 503:
          case 504:
            _unSignHandler(authData)
            break
          // 节点与资源之间的合约未生效
          case 401:
            EC.trigger('NOTIFY_NODE')
            break
          default:
            // _connectCustomerService(authData)
            break
        }
  
        if (typeof callback === 'function') {
          EC.appUiVm.$once('close', function (data) {
            callback(data)
          })
        }
    }

    function _unactivatedHandler(data) {
      const contracts = authData.contracts || (authData.contract && [authData.contract]) || []
      EC.appUiVm.showSingleAuthDialog(authData.presentableInfo, contracts)
    }

    function _unSignHandler(authData) {
      EC.appUiVm.showSingleAuthDialog(authData.presentableInfo, [])
    }

}