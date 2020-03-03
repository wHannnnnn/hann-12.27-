import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    uid: localStorage.getItem('uid'),
    loginUser: localStorage.getItem('loginUser'),
    keepAliveList: ['index']
  },
  mutations: {
    updateAliveList(state, { name, status }) {
      const index = state.keepAliveList.indexOf(name);
      if (status) {
        index < 0 && state.keepAliveList.push(name);
      } else {
        index >= 0 && state.keepAliveList.splice(index, 1);
      }
    },
    resetAlive(state){
      state.keepAliveList = ['index']
    },
    //token uid存储
    handleToken: (state, data) => {
      state.token = data.token
      state.uid = data.uid
      localStorage.setItem('token',data.token)
      localStorage.setItem('uid', data.uid)
    },
    // 存储用户信息
    handleLoginUser: (state, data) => {
      state.loginUser = JSON.stringify(data)
      localStorage.setItem('loginUser', JSON.stringify(data))
    },
    // 退出登录
    loginOut: (state) => {
      localStorage.clear();
      state.token = null;
      state.uid = null;
      state.loginUser = null;
    },
  },
  actions: {}
});
