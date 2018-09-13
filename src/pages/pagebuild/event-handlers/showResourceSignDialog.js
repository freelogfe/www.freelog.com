export default function showResourceSignDialog({ appUiVm }, options, callback){
    const { presentableList = [], contractIDs = [] } = options
    if(presentableList.length == 0) return 

    getContractsByPresentableList(presentableList)
        .then(res => {
            var contractIDs = []
            if(res.errcode == 0){
                contractIDs = res.data.map(i => i.contractId)
            }
            if(presentableList.length > 1){
                appUiVm.showMultiAuthDialog(presentableList, contractIDs)
            }else{
                appUiVm.showSingleAuthDialog(presentableList[0], contractIDs)
            }
        })

    appUiVm.$once('close', callback)
}

// 获取c端与节点presentable签订的合同
function getContractsByPresentableList (presentableList){
    const resourceIds = presentableList.map(presentable => presentable.resourceId).join(',')
    const userId = window.__auth_info__.__auth_user_id__
    return FreelogApp.QI.fetch(`/v1/contracts/contractRecords?resourceIds=${resourceIds}&partyTwo=${userId}`)
        .then(resp => resp.json())
}