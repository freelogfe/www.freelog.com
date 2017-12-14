var dataloaderHelpers = {
    loadResourceDetail(resourceId) {
        return window.QI.fetch(`//api.freelog.com/v1/resources/${resourceId}`).then((res) => {
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
        return window.QI.fetch(`//api.freelog.com/v1/presentables/${presentableId}`).then((res) => {
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

function appendDataToUI(data) {
    window.FreeLogUI.$emit('freelogUIService', {
        action: 'appendData',
        detail: data
    })
    window.FreeLogUI.showAuthDialog()
}

function errorResponseHandler(data) {
    if (data && data.errcode) {
        var errorMsg = data.msg;
        var resData = data.data && data.data.data
        switch (data.errcode) {
            //未激活状态
            case 70080104:
                dataloaderHelpers.loadContractDetail(resData).then(appendDataToUI);
                break;
            //未签约状态
            case 70080101:
                dataloaderHelpers.loadPolicyDetail(resData).then(appendDataToUI);
                break;
            //节点与资源之间的合约授权失败
            case 70080202:
                console.log(errorMsg, resData)
                break;
            default:
                break;
        }
    }
}

export default errorResponseHandler