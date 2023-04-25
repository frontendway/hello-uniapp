import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import './uni.promisify.adaptor'
import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
  store,
  ...App
})
app.$mount()
