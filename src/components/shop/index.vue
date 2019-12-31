<template>
    <div class="shopCar">
      <header class="mui-bar mui-bar-nav">
        <h1 class="mui-title">购物车</h1>
        <span id="delShoppingcart" class="mui-icon mui-icon-trash" style="color: #fff;"></span>
      </header>

      <div class="carList">
        <div class="mui-input-row mui-checkbox mui-bar-nav" v-for="(item,index) in shopList">
          <input name="checkbox" value="Item 1" type="checkbox">
          <router-link class="carList_con" to="">
            <img v-lazy="item.pic">
            <div class="mui-media-body">
              <span class="mui-ellipsis-2 name">{{item.name}}</span>
              <span class="mui-ellipsis" v-for="skuItem in item.sku" :key="skuItem.optionId">
                {{skuItem.optionName}}:{{skuItem.optionValueName}},
              </span>
              <br>
              <span class="money">￥{{item.price.toFixed(2)}}</span>
              <div class="mui-numbox" data-numbox-min="1" >
                  <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                  <input id="test" class="mui-input-numbox" type="number" :value="item.number">
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
            shopList: []
      }
    },
    methods: {
      getCartInfo(){
            this.$http.getCartInfo().then((res)=>{
              if(res.data.code == 0) {
                this.shopList = res.data.data.items
              }
            })
      }
    },
    components: {
        contop
    },
    created() {
      this.getCartInfo()
    },
}
</script>
<style lang="scss" scoped>  
   
</style>