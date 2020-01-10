<template>
  <div class="mine">
      <van-nav-bar title="我的" fixed>
          <van-icon name="setting-o" slot="right" @click='goSet'/>
      </van-nav-bar>
      <div class="mine_top bgc-radius-shadow">
          <div class="avatar">
            <img v-lazy='hot1' alt=""> 
          </div>
          <div class="right">
            <div class="login" @click='login' v-if="!userDetail">登录/注册></div>
            <div class="userDetail" v-else>
              <div class="userName">{{userDetail.mobile}}</div>
              <div class="level">普通用户</div>
            </div>
          </div>
      </div>
      <div class="money margin-bottom">
        <div class="money_top top_title">
          <span class="top_left">我的资产</span>
        </div>
        <van-grid :column-num="3">
          <van-grid-item  info="9">
            <div class="number">6</div>
            <div class="name">红包</div>
          </van-grid-item>
          <van-grid-item  info="2">
            <div class="number">6</div>
            <div class="name">优惠券</div>
          </van-grid-item>
          <van-grid-item  info="99+">
            <div class="number">6</div>
            <div class="name">积分</div>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="order margin-bottom">
        <div class="order_top top_title">
          <span class="top_left">我的订单</span>
          <span class="top_right">查看全部订单<van-icon name="arrow" /></span>
        </div>
        <van-grid :column-num="5">
          <van-grid-item v-for="item in orderList" @click="goOrderList(item.status)" :icon="item.icon" :text="item.title" :key="item.id" info="9"/>
        </van-grid>
      </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
        hot1: require('../../assets/images/hot1.png'),
        orderList: [
          {
            status: '0',
            title: '待付款',
            icon: 'credit-pay'
          },
          {
            status: '1',
            title: '待发货',
            icon: 'logistics'
          },
          {
            status: '2',
            title: '待收货',
            icon: 'send-gift-o'
          },
          {
            status: '3',
            title: '待评价',
            icon: 'comment-o'
          },
          {
            status: '4',
            title: '全部订单',
            icon: 'label-o'
          },
        ]
    }
  },
  computed: {
    ...mapState(['loginUser']),
    userDetail(){
      return JSON.parse(this.loginUser)
    }
  },
  methods: {
    login(){
      this.$router.push({path: '/login'})
    },
    goSet(){
      this.$router.push({path: '/setting'})
    },
    goOrderList(status){
      this.$router.push({path: '/orderList',query:{status:status}})
    }
  },
  mounted() {
    console.log(this.userDetail)
  },
}
</script>