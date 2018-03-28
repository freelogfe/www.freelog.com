import {storage, axios} from '@/lib/index'

const types = {
  LOAD_PRESENTABLE: 'loadPresentableDetail',
  LOAD_CONTRACT: 'loadContractDetail',
  LOAD_RESOURCE: 'loadResourceDetail'
};


function loader(url) {
  return window.QI.fetch(url).then((res) => {
    return (res.status === 200) ? res.json() : Promise.reject(res)
  }).then((res) => {
    if (res.ret === 0 && res.errcode === 0) {
      return res.data
    } else {
      return Promise.reject(res)
    }
  })
}

const pagebuild = {
  state: {
    resourceMap: {},
    presentableMap: {},
    contractMap: {}
  },

  mutations: {
    [types.LOAD_PRESENTABLE](state, data) {
      state.presentableMap[data.presentableId] = data
    },
    [types.LOAD_CONTRACT](state, data) {
      state.contractMap[data.contractId] = data
    },
    [types.LOAD_RESOURCE](state, data) {
      state.resourceMap[data.resourceId] = data
    }
  },
  actions: {
    [types.LOAD_PRESENTABLE]({commit}, presentableId) {
      return loader(`/v1/presentables/${presentableId}`)
        .then((data) => {
          commit(types.LOAD_PRESENTABLE, data)
          return data
        })
    },
    [types.LOAD_CONTRACT]({commit}, contractId) {
      return loader(`/v1/contracts/${contractId}`)
        .then((data) => {
          commit(types.LOAD_CONTRACT, data)
          return data
        })
    },
    [types.LOAD_RESOURCE]({commit}, resourceId) {
      return loader(`/v1/resources/${resourceId}`)
        .then((data) => {
          commit(types.LOAD_RESOURCE, data)
          return data
        })
    }
  }
}

export default pagebuild;
