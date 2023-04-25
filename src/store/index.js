import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'

const isDev = process.env.NODE_ENV === 'development'
const plugins = isDev ? [createLogger()] : []

Vue.use(Vuex)

// uniapp 中 template 中无法访问 $store.state
const state = {
  token: uni.getStorageSync('token') || '',
  userInfo: uni.getStorageSync('userInfo') || {}
}

const mutations = {
  setToken (state, token) {
    state.token = token
    uni.setStorageSync('token', token)
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    uni.setStorageSync('token', userInfo)
  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins
})

export default store
