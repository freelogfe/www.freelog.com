import {storage, axios} from '@/lib/index'
import {cookieStore} from '@/lib/storage'

const types = {
  LOAD_CURRENT_USER: 'loadCurrentUserInfo',
  GET_CURRENT_USER_INFO: 'getCurrentUserInfo',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin',
  CHECK_USER_SESSION: 'checkUserSession',
  DELETE_USER_SESSION: 'deleteUserSession',
  LOGOUT: 'userLogout'
}


const user = {
  state: {
    session: null,  //storage.get('user_session')
  },

  mutations: {
    [types.CHANGE_SESSION](state, data) {
      state.session = data
      storage.set('user_session', state.session);
    },
    [types.LOGOUT](state) {
      state.session = null
      storage.remove('user_session');
    }
  },

  actions: {
    [types.LOAD_CURRENT_USER]({commit}, userId) {
      var promise
      if (userId) {
        promise = axios.get(`/v1/userinfos/${userId}`)
      } else {
        promise = axios.get('/v1/userinfos/current')
      }
      return promise.then(res => {
        if (res.data.errcode === 0) {
          commit(types.CHANGE_SESSION, res.data.data);
        }
        return res.data.data
      })
    },
    [types.GET_CURRENT_USER_INFO]({commit, getters}) {
      return new Promise((resolve) => {
        if (getters.session) {
          resolve(getters.session)
        } else {
          return this.dispatch(types.LOAD_CURRENT_USER).then((userInfo) => {
            resolve(userInfo)
          })
        }
      })
    },
    [types.CHANGE_SESSION]({commit}, data) {
      commit(types.CHANGE_SESSION, data);
    },
    [types.DELETE_USER_SESSION]({commit}) {
      commit(types.CHANGE_SESSION, null);
    },
    [types.LOGOUT]({commit}) {
      commit(types.LOGOUT)
    },
    [types.CHECK_USER_SESSION]({commit, getters}) {
      var authInfo = cookieStore.get('authInfo')
      return new Promise((resolve) => {
        if (!authInfo) {
          resolve(false)
        } else {
          var jwt = authInfo.split('.')
          var userInfo = atob(jwt[1])
          try {
            userInfo = JSON.parse(userInfo)
          } catch (err) {
            console.error(err)
            userInfo = {}
          }

          //没有登录态的，新登录的 或者已有登录态且跟当前登录态一致的，表示登录中
          resolve((!getters.session && userInfo.userId) || (getters.session && getters.session.userId === userInfo.userId))
        }
      })
    },
    [types.USER_LOGIN]({commit}, data) {
      return axios.post('/v1/passport/login', data).then(res => {
        if (res.data.ret === 0 && res.data.errcode === 0) {
          commit(types.CHANGE_SESSION, res.data.data);
          return res.data.data
        } else {
          return Promise.reject(res.data.msg);
        }
      });
    }
  }
}

export default user;
export const mutationTypes = types;
