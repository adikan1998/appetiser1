import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
require('./beforeLoad')
Vue.config.productionTip = false
window.axios = require('axios')
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
