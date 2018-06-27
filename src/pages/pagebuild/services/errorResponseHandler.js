// import {Message} from 'element-ui';
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
  handle(data, app, callback) {
    this.app = app
    if (data && data.errcode) {
      var errorMsg = data.msg;
      var resData = data.data && data.data.data

      switch (data.errcode) {
        //未激活状态
        case 70080104:
          this._unactivatedHandler(resData)
          break;

        case 70080302: //todo 个人身份授权不通过
        case 70080303: //todo 用户分组策认证不通过
        case 70080305: //todo 资源策略拒绝
        case 70080306: //too presentable策略拒绝
        //未签约状态
        case 70080101:
          this._unauthHandler(resData)
          break;
        //节点与资源之间的合约未生效
        case 70080202:
          this._invalidHandler(resData)
          break;
        //未登录
        case 70080301:
        case 28:
        case 30:
          this._gotoLoginHandler()
          break;
        default:
          throw new Error(errorMsg)
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