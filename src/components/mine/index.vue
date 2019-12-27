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
          <van-grid-item icon="credit-pay" text="待付款" info="9"/>
          <van-grid-item icon="send-gift-o" text="待收货" info="2"/>
          <van-grid-item icon="comment-o" text="待评价" info="99+"/>
          <van-grid-item icon="cash-on-deliver" text="退换/售后" />
          <van-grid-item icon="label-o" text="我的订单" />
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
    }
  },
  mounted() {
    console.log(this.userDetail)
  },
}
</script>