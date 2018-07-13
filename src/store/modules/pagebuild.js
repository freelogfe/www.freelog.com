import {storage, axios} from '@/lib/index'
import {CONTRACT_STATUS, CONTRACT_STATUS_COLORS} from '@/config/contract'
import compiler from '@freelog/presentable-policy-compiler'

const types = {
  LOAD_PRESENTABLE: 'loadPresentableDetail',
  LOAD_CONTRACT: 'loadContractDetail',
  LOAD_RESOURCE: 'loadResourceDetail',
  LOAD_NODE_INFO: 'loadNodeDetail',
  LOAD_PRESENTABLE_AUTH: 'loadPresentableAuth',

  UPDATE_PRESENTABLE: 'updatePresentableDetail',
  UPDATE_PRESENTABLE_MAP: 'updatePresentableMap',
  UPDATE_CONTRACT: 'updateContractDetail',
  SET_PARTY_ONE_INFO: 'setPartyOneInfo',
  SET_PARTY_TWO_INFO: 'setPartyTwoInfo',

  UPDATE_PRESENTABLE_STATUS: 'updatePresentableStatus'
};


function loader(url) {
  return axios.get(url).then((res) => {
    return (res.status === 200) ? Promise.resolve(res.data) : Promise.reject(res)
  }).then((res) => {
    if (res.ret === 0 && res.errcode === 0) {
      return res.data
    } else {
      return Promise.reject(res)
    }
  })
}

function parsePolicy(data) {
  var segments = []
  data.policy.forEach(function (block) {
    block._formatPolicyText = compiler.beautify(block.segmentText)
    var segment = {
      detail: block,
      states: block.fsmDescription,
      selected: false
    }

    block._userGroup = block.users.reduce((userGroup, item) => {
      userGroup = userGroup.concat(item.users)
      return userGroup
    }, []).join('/')

    segments.push(segment)
  })

  return segments
}

const pagebuild = {
  state: {
    resourceMap: {},
    presentableMap: {},
    contractMap: {},
    nodesInfo: storage.get('nodesInfo') || {}
  },

  mutations: {
    [types.LOAD_PRESENTABLE](state, data) {
      if (!data.resourceDetail) {
        data.resourceDetail = data.resourceInfo
      }
      data._formatPolicyText = compiler.beautify(data.policyText)
      if (data.segments) {
        data.segments.forEach((segment) => {
          segment.detail._formatPolicyText = compiler.beautify(segment.detail.segmentText)
        })
      }

      data.segments = parsePolicy(data)
      state.presentableMap[data.presentableId] = data
    },
    [types.LOAD_CONTRACT](state, data) {
      state.contractMap[data.contractId] = data
    },
    [types.LOAD_RESOURCE](state, data) {
      state.resourceMap[data.resourceId] = data
    },
    [types.LOAD_NODE_INFO](state, nodeInfo) {
      state.nodesInfo[nodeInfo.nodeId] = nodeInfo
      storage.set('nodesInfo', state.nodesInfo)
    },
    [types.SET_PARTY_ONE_INFO](state, data) {
      this._vm.$set(data.contract, 'partyOneInfo', data.nodeInfo)
    },
    [types.SET_PARTY_TWO_INFO](state, data) {
      this._vm.$set(data.contract, 'partyTwoInfo', data.userInfo)
    },
    [types.UPDATE_PRESENTABLE_MAP](state, data) {
      var presentable = state.presentableMap[data.presentableId]

      data.segments = parsePolicy(data)
      if (presentable) {
        Object.assign(presentable, data)
      } else {
        this._vm.$set(state.presentableMap, data.presentableId, data)
      }
    },
    [types.UPDATE_PRESENTABLE_STATUS](state, data) {
      var contractStatus
      var presentable;

      if (data.targetId) {
        presentable = state.presentableMap[data.targetId]
      } else if (data.presentableId) {
        presentable = state.presentableMap[data.presentableId]
      }

      if (presentable.contractDetail) {
        contractStatus = presentable.contractDetail.status
      } else if (presentable.nodeContractDetail) {
        presentable.name = presentable.presentableInfo.presentableName
        contractStatus = CONTRACT_STATUS.invalid
      } else {
        contractStatus = CONTRACT_STATUS.uncreated
      }

      this._vm.$set(presentable, '_contractStatus', contractStatus)
      this._vm.$set(presentable, '_statusInfo', CONTRACT_STATUS_COLORS[contractStatus])
    },
    [types.UPDATE_CONTRACT](state, data) {
      var presentableId = data.targetId
      var presentable = state.presentableMap[presentableId]

      if (!data._userGroup) {
        data._userGroup = data.policySegment.users.reduce((users, item) => {
          users = users.concat(item.users)
          return users
        }, []).join('/')
      }

      this._vm.$set(data, '_statusInfo', CONTRACT_STATUS_COLORS[data.status])
      state.contractMap[data.contractId] = {...data}

      if (!presentable.contractDetail) {
        this._vm.$set(state.presentableMap[presentableId], 'contractDetail', data)
      } else {
        Object.assign(presentable.contractDetail, data)
      }
    }
  },
  actions: {
    [types.LOAD_PRESENTABLE]({commit, getters}, presentableId) {
      return new Promise((resolve) => {
        var data = getters.pagebuild.presentableMap[presentableId]
        if (data) {
          resolve(data)
        } else {
          loader(`/v1/presentables/${presentableId}`)
            .then((data) => {
              commit(types.UPDATE_PRESENTABLE_MAP, data)
              commit(types.UPDATE_PRESENTABLE_STATUS, data)
              resolve(data)
            })
        }
      })
    },
    [types.LOAD_PRESENTABLE_AUTH]({commit, getters}, presentableId) {
      return new Promise((resolve) => {
        var data = getters.pagebuild.presentableMap[presentableId]
        if (data) {
          resolve(data)
        } else {
          axios.get(`/v1/auths/presentableIdentityAuth`)
            .then((data) => {
              commit(types.UPDATE_PRESENTABLE_MAP, data)
              commit(types.UPDATE_PRESENTABLE_STATUS, data)
              resolve(data)
            })
        }
      })
    },
    [types.UPDATE_PRESENTABLE]({commit}, presentable) {
      commit(types.UPDATE_PRESENTABLE_MAP, presentable)
      commit(types.UPDATE_PRESENTABLE_STATUS, presentable)
    },
    [types.LOAD_CONTRACT]({commit}, contractId) {
      return loader(`/v1/contracts/${contractId}`)
        .then((data) => {
          commit(types.LOAD_CONTRACT, data)
          commit(types.UPDATE_CONTRACT, data)
          return data
        })
    },
    [types.LOAD_RESOURCE]({commit}, resourceId) {
      return loader(`/v1/resources/${resourceId}`)
        .then((data) => {
          commit(types.LOAD_RESOURCE, data)
          return data
        })
    },
    [types.LOAD_NODE_INFO]({commit, getters}) {
      var nodeId = window.__auth_info__.__auth_node_id__
      return new Promise((resolve) => {
        var node = getters.pagebuild.nodesInfo[nodeId]
        if (node) {
          resolve(node)
        } else {
          loader(`/v1/nodes/${nodeId}`).then((data) => {
            commit(types.LOAD_NODE_INFO, data)
            resolve(data.data)
          })
        }
      });
    },
    [types.UPDATE_PRESENTABLE_STATUS]({commit}, presentable) {
      commit(types.UPDATE_PRESENTABLE_STATUS, presentable)
    },
    [types.SET_PARTY_ONE_INFO]({commit, dispatch}, contract) {
      dispatch('loadNodeDetail').then((nodeInfo) => {
        commit(types.SET_PARTY_ONE_INFO, {
          contract,
          nodeInfo
        })
      });
    },
    [types.SET_PARTY_TWO_INFO]({commit, dispatch}, contract) {
      dispatch('getCurrentUserInfo')
        .then((userInfo) => {
          commit(types.SET_PARTY_TWO_INFO, {
            contract,
            userInfo
          })
        })
    },
    [types.UPDATE_CONTRACT]({commit, dispatch}, contract) {
      if (!contract.partyTwoInfo) {
        dispatch(types.SET_PARTY_TWO_INFO, contract)
      }

      if (!contract.partyOneInfo) {
        dispatch(types.SET_PARTY_ONE_INFO, contract)
      }

      commit(types.UPDATE_CONTRACT, contract)
      commit(types.UPDATE_PRESENTABLE_STATUS, contract)
    },
  }
}

export default pagebuild;
