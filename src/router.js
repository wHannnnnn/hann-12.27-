import Vue from "vue";
import Router from "vue-router";
const index = resolve => require(['@/views/index'], resolve)
const login = resolve => require(['@/views/login'], resolve)
const regis = resolve => require(['@/views/regis'], resolve)
const homeIndex = resolve => require(['@/components/home/index'],resolve)
const navIndex = resolve => require(['@/components/navList/index'], resolve)
const shopIndex = resolve => require(['@/components/shop/index'], resolve)
const mineIndex = resolve => require(['@/components/mine/index'], resolve)
const setting = resolve => require(['@/components/setting/index'], resolve)
const detailsIndex = resolve => require(['@/components/details/index'], resolve)
const address = resolve => require(['@/components/address/index'], resolve)
const editAddress = resolve => require(['@/components/editAddress/index'], resolve)
const placeOrder = resolve => require(['@/components/placeOrder/index'], resolve)
const orderList = resolve => require(['@/components/orderList/index'], resolve)
const orderDetails = resolve => require(['@/components/orderDetails/index'], resolve)

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: index,
      redirect:'homeIndex',
      meta: { keepAlive: true },
      children:[
        {
          path: "homeIndex",
          name: "首页",
          component: homeIndex,
          meta: { keepAlive: true },
        },
        {
          path: "navIndex",
          name: "分类",
          component: navIndex,
          meta: { keepAlive: true },
        },
        {
          path: "shopIndex",
          name: "购物车",
          component: shopIndex,
          meta: { keepAlive: true }
        }, 
        {
          path: "mineIndex",
          name: "个人",
          component: mineIndex,
          meta: { keepAlive: true }
        }, 
      ]
    },
    {      
      path: "/detailsIndex",
      name: "详情",
      component: detailsIndex,
    },
    {
      path: "/login",
      name: "登录",
      component: login,
    },
    {
      path: "/regis",
      name: "注册",
      component: regis,
    },
    {
      path: "/setting",
      name: "账户设置",
      component: setting,
    },
    {
      path: "/address",
      name: "我的地址",
      component: address,
    },
    {
      path: "/editAddress",
      name: "修改地址",
      component: editAddress,
    },
    {
      path: "/placeOrder",
      name: "填写订单",
      component: placeOrder,
    },
    {
      path: "/orderList",
      name: "我的订单",
      component: orderList,
    },
    {
      path: "/orderDetails",
      name: "订单详情",
      component: orderDetails,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if(to.meta.keepAlive == true){
      return { x: 0, y: to.meta.scrollTop ? to.meta.scrollTop : 0}
    } else {
      return { x: 0, y: 0 }
    }
  }

});
