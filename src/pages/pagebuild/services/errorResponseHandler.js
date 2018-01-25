// import {Message} from 'element-ui';

var dataloaderHelpers = {
  loadResourceDetail(resourceId) {
    return window.QI.fetch(`/v1/resources/${resourceId}`).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    }).then((res) => {
      if (res.ret === 0 && res.errcode === 0) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    })
  },
  loadPresentableDetail(presentableId) {
    return window.QI.fetch(`/v1/presentables/${presentableId}`).then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    }).then((res) => {
      if (res.ret === 0 && res.errcode === 0) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    })
  },

  loadContractDetail(data) {
    var contractData = data.contract
    return this.loadPresentableDetail(contractData.targetId)
      .then((data) => {
        contractData.resourceDetail = data.tagInfo.resourceInfo
        data.contractDetail = contractData
        data.resourceDetail = data.tagInfo.resourceInfo
        return data
      })
  },
  loadPolicyDetail(authData) {
    var presentableId = authData.presentableId;
    return this.loadPresentableDetail(presentableId)
      .then((data) => {
        data.resourceDetail = data.tagInfo.resourceInfo
        return data
      })
  }
}

export default {
  name: 'errorResponseHandler',
  _unactivatedHandler(data) {
    dataloaderHelpers.loadContractDetail(data)
      .then(this.appendDataToUI.bind(this));
  },
  _unauthHandler(data) {
    dataloaderHelpers.loadPolicyDetail(data)
      .then(this.appendDataToUI.bind(this));
  },
  _invalidHandler(data) {
    dataloaderHelpers.loadResourceDetail(data.contract.resourceId)
      .then((resourcee) => {
        var result = {
          resourceDetail: resourcee,
          nodeContractDetail: data.contract
        }
        return result
      })
      .then(this.appendDataToUI.bind(this));
  },
  _gotoLoginHandler() {
    location.href = `//www.freelog.com/pages/user/login.html?redirect=` + encodeURIComponent(location.href)
  },
  handle(data, appUI, callback) {
    this.appUI = appUI
    if (data && data.errcode) {
      var errorMsg = data.msg;
      var resData = data.data && data.data.data
      
      switch (data.errcode) {
        //未激活状态
        case 70080104:
          this._unactivatedHandler(resData)
          break;
        //未签约状态
        case 70080101:
          this._unauthHandler(resData)
          break;
        //节点与资源之间的合约授权失败
        case 70080202:
          this._invalidHandler(resData)
          break;
        case 28:
        case 30:
          this._gotoLoginHandler()
          break;
        default:
          throw new Error(errorMsg)
          break;
      }

      if (typeof callback === 'function') {
        appUI.$on('close', function () {
          //todo
          console.log('error response close', resData)
        })
      }
    }
  },
  appendDataToUI(data) {
    this.appUI.appendData(data)
    this.appUI.showAuthDialog()
  }
}