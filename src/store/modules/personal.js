const types = {
  CHANGE_PANEL: 'changePanel'
}

const personal = {
  state: {
    panelName: 'my-resources',  //component name
    data: {}  //component props
  },

  mutations: {
    [types.CHANGE_PANEL](state, data) {
      if (typeof data === 'string') {
        state.panelName = data
      } else if (typeof data === 'object' && data.name) {
        state.panelName = data.name
        state.data = data.data || {}
      }
    }
  },

  actions: {
    [types.CHANGE_PANEL]({commit}, data) {
      commit(types.CHANGE_PANEL, data);
    }
  }
}

export default personal;
