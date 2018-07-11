import {gotoLogin} from "../../../lib/utils";

export default {
  name: 'errorResponseHandler',
  _unactivatedHandler(data) {
    var contractData = data.contract
    this.app.model.dispatch('loadPresentableDetail', data.presentableId)
      .then((presentable) => {
        this.app.model.dispatch('updateContractDetail', contractData)
        this.app.ui.showAuthDialog()
        this.app.ui.gotoExecuteContract(presentable)
      })
  },
  _unauthHandler(authData) {
    var presentable = authData.presentableInfo
    this.app.model.dispatch('updatePresentableDetail', presentable)
    this.app.ui.showAuthDialog()
    this.app.ui.gotoCreateContract(presentable)
  },
  _invalidHandler(data) {
    this.app.model.dispatch('loadResourceDetail', data.contract.resourceId)
      .then(() => {
        this.app.ui.showAuthDialog()
      })
  },
  _gotoLoginHandler() {
    gotoLogin(location.href)
  },
  _connectCustomerService(){
    this.app.vm.notify({
      message: '已通知',
      type: 'warning'
    })
  },
  handle(data, app, callback) {
    this.app = app

    if (data && data.errcode) {
      var errorMsg = data.msg;
      var resData = data.data && data.data.data
      switch (data.errcode) {
        //未激活状态
        case 501:
          this._unactivatedHandler(resData)
          break;
        //未签约状态
        case 502:
        case 503:
        case 504:
          this._unauthHandler(resData)
          break;
        //节点与资源之间的合约未生效
        case 401:
          this._invalidHandler(resData)
          break;
        //未登录
        case 505:
        case 28:
        case 30:
          this._gotoLoginHandler()
          break;
        default:
          this._connectCustomerService(resData)
          // throw new Error(errorMsg)
          break;
      }

      if (typeof callback === 'function') {
        app.ui.$on('close', function (presentableMap) {
          var presentable = presentableMap[resData.presentableId] || null
          presentable && callback(presentable)
        })
      }
    }
  }
}