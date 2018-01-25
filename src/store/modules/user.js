import {storage, axios} from '@/lib/index'

const types = {
  GET_CURRENT_USER: 'getCurrentUser',
  CHANGE_SESSION: 'changeSession',
  USER_LOGIN: 'userLogin',
  CHECK_USER_SESSION: 'checkUserSession',
  DELETE_USER_SESSION: 'deleteUserSession',
  LOGOUT: 'logout'
}


const user = {
  state: {
    session: storage.get('user_session') || null,
  },

  mutations: {
    [types.CHANGE_SESSION](state, data) {
      state.session = data
      storage.set('user_session', state.session);
    },
    [types.LOGOUT](state) {
      state.session = null
      storage.remove('user_session');
      setTimeout(() => {
        location.replace('/pages/user/login.html')
      }, 10)
    }
  },

  actions: {
    [types.GET_CURRENT_USER]({commit}, userId) {
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
    [types.CHANGE_SESSION]({commit}, data) {
      commit(types.CHANGE_SESSION, data);
    },
    [types.DELETE_USER_SESSION]({commit}) {
      commit(types.CHANGE_SESSION, null);
    },
    [types.LOGOUT]({commit}) {
      commit(types.LOGOUT)
    },
    [types.CHECK_USER_SESSION]({commit}) {
      return new Promise((resolve, reject) => {
        var loginPath = '/pages/user/login.html'
        var userInfo = this.state.user.session
        if (userInfo) {
          resolve(userInfo)
        } else {
          this.dispatch(types.GET_CURRENT_USER).then((userInfo) => {
            if (!userInfo) {
              this.dispatch(types.DELETE_USER_SESSION)
              if (location.pathname !== loginPath) {
                location.href = `${loginPath}?redirect=` + encodeURIComponent(location.href)
              }
            }
            resolve(userInfo)
          })
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
