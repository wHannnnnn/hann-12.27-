// import Vue from "vue";
// import Router from "vue-router";
import store from "./store";
// Vue.use(Router);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import('@/views/index'),
      redirect:'homeIndex',
      meta: { keepAlive: true },
      children:[
        {
          path: "homeIndex",
          name: "首页",
          component: () => import('@/components/home/index'),
          meta: { keepAlive: true },
        },
        {
          path: "navIndex",
          name: "分类",
          component: () => import('@/components/navList/index'),
          meta: { keepAlive: true },
        },
        {
          path: "shopIndex",
          name: "购物车",
          component: () => import('@/components/shop/index'),
          meta: { keepAlive: true }
        }, 
        {
          path: "mineIndex",
          name: "个人",
          component: () => import('@/components/mine/index'),
        }, 
      ]
    },
    {      
      path: "/detailsIndex",
      name: "详情",
      component: () => import('@/components/details/index'),
    },
    {
      path: "/login",
      name: "登录",
      component: () => import('@/views/login'),
    },
    {
      path: "/regis",
      name: "注册",
      component: () => import('@/views/regis'),
    },
    {
      path: "/setting",
      name: "账户设置",
      component: () => import('@/components/setting/index'),
    },
    {
      path: "/address",
      name: "我的地址",
      component: () => import('@/components/address/index'),
    },
    {
      path: "/editAddress",
      name: "修改地址",
      component: () => import('@/components/editAddress/index'),
    },
    {
      path: "/placeOrder",
      name: "填写订单",
      component: () => import('@/components/placeOrder/index'),
      meta: { name: 'placeOrder' },
    },
    {
      path: "/orderList",
      name: "我的订单",
      component: () => import('@/components/orderList/index'),
    },
    {
      path: "/orderDetails",
      name: "订单详情",
      component: () => import('@/components/orderDetails/index'),
    },
    {
      path: "/refundApply",
      name: "申请退换",
      component: () => import('@/components/refundApply/index'),
    },
    {
      path: "/orderReputation",
      name: "发表评价",
      component: () => import('@/components/orderReputation/index'),
    },
    {
      path: "/reputation",
      name: "评价列表",
      component: () => import('@/components/reputation/index'),
    },
    {
      path: "/userModify",
      name: "编辑资料",
      component: () => import('@/components/userModify/index'),
    },
    {
      path: "/resetPwd",
      name: "修改密码",
      component: () => import('@/components/resetPwd/index'),
    },
    {
      path: "/discountDetails",
      name: "优惠券",
      component: () => import('@/components/discountDetails/index'),
    },
    {
      path: "/productList",
      name: "列表",
      component: () => import('@/components/productList/index'),
      meta: { name: 'productList' },
    },
    {
      path: "/categoryList",
      name: "分类列表",
      component: () => import('@/components/categoryList/index'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.keepAlive == true || store.state.keepAliveList.indexOf(to.meta.name) !== -1) {
      return { x: 0, y: to.meta.scrollTop ? to.meta.scrollTop : 0 }
    } else {
      return { x: 0, y: 0 }
    }
  }

});
