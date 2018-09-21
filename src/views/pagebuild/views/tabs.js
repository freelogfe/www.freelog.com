let _uid = 0

export const tabs = {
  contractCreator: {
    content: 'contract-creator',
    title: '创建合同'
  },
  contractDetail: {
    content: 'contract-detail',
    title: '合同详情'
  }
}

export default {
  tabs,
  getTabConfig(name, data) {
    if (!tabs[name]) {
      throw new Error('不存在对应的tab窗口')
    } else {
      let uid
      if (data.presentableId) {
        uid = data.presentableId
      } else {
        uid = _uid
        _uid += 2
      }
      return Object.assign({
        name: [name, uid].join('_'),
        data
      }, tabs[name])
    }
  }
}
