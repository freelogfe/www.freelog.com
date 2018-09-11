const getters = {
  session: state => state.user.session,
  pagebuild: state => state.pagebuild,
  personal:  state => state.personal
}

export default getters;
