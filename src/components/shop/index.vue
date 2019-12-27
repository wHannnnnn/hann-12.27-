<template>
    <div class="shopCar">
      <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">购物车</h1>
        <span id="delShoppingcart" class="mui-icon mui-icon-trash" style="color: #fff;"></span>
      </header>

      <div class="carList">
        <div class="mui-input-row mui-checkbox mui-bar-nav">
          <input name="checkbox" value="Item 1" type="checkbox">
          <router-link class="carList_con" to="">
            <img v-lazy="hot3">
            <div class="mui-media-body">
              <span class="mui-ellipsis-2 name">youcci悠瓷创意鼓型陶瓷杯带盖带勺牛奶杯咖啡杯家用马克杯子水杯子</span>
              <p class="mui-ellipsis">商品简介</p>
              <span class="money">￥9.9</span>
              <div class="mui-numbox" data-numbox-min="1" >
                  <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                  <input id="test" class="mui-input-numbox" type="number" value="1">
                  <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="mui-input-row mui-checkbox mui-bar-nav">
          <input name="checkbox" value="Item 1" type="checkbox">
          <router-link class="carList_con" to="">
            <img v-lazy="hot3">
            <div class="mui-media-body">
              <span class="mui-ellipsis-2 name">youcci悠瓷创意鼓型陶瓷杯带盖带勺牛奶杯咖啡杯家用马克杯子水杯子</span>
              <p class="mui-ellipsis">商品简介</p>
              <span class="money">￥9.9</span>
              <div class="mui-numbox" data-numbox-min="1" >
                  <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                  <input id="test" class="mui-input-numbox" type="number" value="1">
                  <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>
          </router-link>
        </div>
                <div class="mui-input-row mui-checkbox mui-bar-nav">
          <input name="checkbox" value="Item 1" type="checkbox">
          <router-link class="carList_con" to="">
            <img v-lazy="hot3">
            <div class="mui-media-body">
              <span class="mui-ellipsis-2 name">youcci悠瓷创意鼓型陶瓷杯带盖带勺牛奶杯咖啡杯家用马克杯子水杯子</span>
              <p class="mui-ellipsis">商品简介</p>
              <span class="money">￥9.9</span>
              <div class="mui-numbox" data-numbox-min="1" >
                  <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                  <input id="test" class="mui-input-numbox" type="number" value="1">
                  <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      
			<div class="shopCart">
        <div class="left">
          <div class="price">
            <div class="mui-input-row mui-checkbox">
              <label>全选</label>
              <input id="checkAll" type="checkbox" style="top: 10px;">
            </div>
            <span>合计:￥</span>
            <span id="total">0</span>
          </div>
        </div>
			  <div class="right" id="pay">去结算</div>
		  </div>
    </div>
</template>
<script>
import contop from '@/components/home/contop.vue'
export default {
    data() {
      return {
            hot1: require('../../assets/images/hot1.png'),
            hot2: require('../../assets/images/hot2.png'),
            hot3: require('../../assets/images/hot3.png'),
      }
    },
    components: {
        contop
    },
}
</script>
<style lang="scss" scoped>  
   
</style>