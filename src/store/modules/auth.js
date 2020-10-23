export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: {}
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user
  },
  actions: {
  },
  mutations: {
    setIsLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setUser (state, payload) {
      state.user = payload
    }
  }
}
