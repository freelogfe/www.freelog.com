export default function handleAuthError(response, callback){
    if (response && response.errcode) {
        var errorMsg = response.msg;
        var authData = response.data && response.data.data
        switch (response.errcode) {
          //未激活状态
          case 501:
            EC.appUiVm.showSingleAuthModal(authData)
            EC.appUiVm.gotoExecuteContract(authData.presentableInfo)
            // _unactivatedHandler(authData)
            break
          //未签约状态
          case 502:
          case 503:
          case 504:
            EC.appUiVm.showSingleAuthModal(authData)
            // _unauthHandler(authData)
            break
          // 节点与资源之间的合约未生效
          case 401:
            EC.trigger('NOTIFY_NODE')
            // _invalidHandler(authData)
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
      EC.appUiVm.showSingleAuthModal(authData)
        // var contractData = data.contract
        // this.app.model.dispatch('loadPresentableDetail', data.presentableId)
        //   .then((presentable) => {
        //     this.app.model.dispatch('updateContractDetail', contractData)
        //     EC.appUiVm.showAuthDialog()
        //     // EC.appUiVm.gotoExecuteContract(presentable)
        //   })
    }

    function _unauthHandler(authData) {
        EC.appUiVm.showSingleAuthModal(authData)
    }

    function  _invalidHandler(data) {
        
    }
}