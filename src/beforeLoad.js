import Vue from 'vue'
import VueCookies from 'vue-cookies'
import store from './store/index'
window.axios = require('axios')

Vue.use(VueCookies)
Vue.$cookies.config('1d')
// check user sessions
if (Vue.$cookies.get('user_session')) {
  store.commit('auth/setIsLoggedIn', true)
  const userSession = Vue.$cookies.get('user_session')
  window.axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
  window.axios.defaults.headers.common.Authorization = `${userSession.token_type} ${userSession.access_token}`
  // set the user data
  store.commit('auth/setUser', userSession.data.user)
} else {
  // if no user sessions 
  store.commit('auth/setIsLoggedIn', false)
}
