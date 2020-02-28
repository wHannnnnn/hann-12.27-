<template>
    <div class="shop_con">
        <div class="shopTop">
            <span class="topTitle">热门商品</span>
        </div>
        <div class="shopBottom">
            <!-- 左侧 -->
            <div class="shop_lr">            
                <div class="shop_list mui-bar-nav" v-for="item in leftShopList" :key='item.id'>
                    <router-link :to="{path:'/detailsIndex',query:{id:item.id}}">                        
                        <div class="shop_img">
                            <img v-lazy="item.pic" alt="">
                        </div>
                        <div class="shop_title van-multi-ellipsis--l2">
                            {{item.name}}
                        </div>
                        <div class="pintuan" v-if="item.pintuan || item.kanjia">
                            <van-tag class="rightTitle" plain v-if="item.pintuan">拼团</van-tag>
                            <van-tag class="rightTitle" plain v-if="item.kanjia">砍价</van-tag>
                        </div>
                        <div class="price">
                            <span class="newprice">￥{{item.minPrice}}</span>
                        </div>
                        <div class="numberSells">
                            <span>{{item.numberSells}}人付款</span>
                        </div>
                    </router-link>
                </div>
            </div>
            <!-- 右侧 -->
            <div class="shop_lr">
                <div class="shop_list mui-bar-nav" v-for="item in rightShopList" :key='item.id'>
                    <router-link :to="{path:'/detailsIndex',query:{id:item.id}}">
                        <div class="shop_img">
                            <img v-lazy="item.pic" alt="">
                        </div>
                        <div class="shop_title van-multi-ellipsis--l2">
                            {{item.name}}
                        </div>
                        <div class="pintuan" v-if="item.pintuan || item.kanjia">
                            <van-tag class="rightTitle" plain v-if="item.pintuan">拼团</van-tag>
                            <van-tag class="rightTitle" plain v-if="item.kanjia">砍价</van-tag>
                        </div>
                        <div class="price">
                            <span class="newprice">￥{{item.minPrice}}</span>
                        </div>
                        <div class="numberSells">
                            <span>{{item.numberSells}}人付款</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    data() {
        return {
        }
    },
    props:['shopList'],
    computed: {
        leftShopList(){
             return this.shopList.filter((ele,index) =>{
                return index%2 == 0
            })
        },
        rightShopList(){
             return this.shopList.filter((ele,index) =>{
                return index%2 !== 0
            })
        },
    },
    mounted() {
    },
}
</script>