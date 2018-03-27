import {storage, axios} from '@/lib/index'

const types = {
  LOAD_PRESENTABLE: 'loadPresentableInfo'
}

const pagebuild = {
  state: {
  },

  mutations: {
    [types.LOAD_PRESENTABLE](state, data) {
      state.session = data
      storage.set('user_session', state.session);
    }
  },

  actions: {
    [types.LOAD_PRESENTABLE]({commit}, userId) {
      var promise
      if (userId) {
        promise = axios.get(`/v1/userinfos/${userId}`)
      } else {
        promise = axios.get('/v1/userinfos/current')
      }
      return promise.then(res => {
        if (res.data.errcode === 0) {
          commit(types.LOAD_PRESENTABLE, res.data.data);
        }
        return res.data.data
      })
    }
  }
}

export default pagebuild;
