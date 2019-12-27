import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    uid: localStorage.getItem('uid'),
    loginUser: localStorage.getItem('loginUser'),
    finished: false, //首页上拉加载控制
    homePageNum: 1, //首页商品页码
    shopList: [], //商品列表
  },
  mutations: {
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
    getShopList: (state,data)=>{
      state.shopList = state.shopList.concat(data)
      state.homePageNum ++
    },
    removeShopList:(state) => {
      state.shopList = []
      state.homePageNum = 1
    },
  },
  actions: {}
});
