import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus:0, //登录状态
    userInfo:null  //用户信息
  },
  mutations: {
    modifyLoginStatus(state,param){
      state.loginStatus = param.loginStatus;  //修改登录状态
    },
    addUserInfo(state,param){
      state.userInfo = param.userInfo;   //增加用户对象信息
    }
  },
  actions: {
  },
  modules: {
  }
})
