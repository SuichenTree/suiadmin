import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus:0, //登录状态
     //用户信息
    userInfo:{
      headUrl:"",
      userName:"",  
      userId:"",      
      passWord:"",
      isAdmin:"",
      gender:"",
      age:"",
      phone:"",
      email:"",
      address:""
    } 
  },
  mutations: {
    //修改登录状态
    modifyLoginStatus(state,param){
      state.loginStatus = param;  
    },
     //增加用户对象信息
    addUserInfo(state,param){
      state.userInfo.headUrl = param.headUrl;
      state.userInfo.userName = param.userName;
      state.userInfo.userId = param.userId;
      state.userInfo.passWord = param.passWord;
      state.userInfo.isAdmin = param.isAdmin;
      state.userInfo.gender = param.gender;
      state.userInfo.age = param.age;
      state.userInfo.phone = param.phone;
      state.userInfo.email = param.email;
      state.userInfo.address = param.address;
    }
  },
  actions: {
  },
  modules: {
  }
})
