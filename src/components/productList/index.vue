<template>
    <div class="productList">
        <van-nav-bar  fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
                <van-search
                    slot="right"
                    v-model="productName"
                    placeholder="请输入搜索关键词"
                >
                <span slot="left-icon"></span>
                </van-search>
        </van-nav-bar>
        <div class="content">
            <div class="shop_con">
                <div class="shopTop">
                    <van-dropdown-menu active-color="#ee0a24" class="recommend">
                        <van-dropdown-item v-model="recommendStatus" @change="changeStatus" :options="option" />
                    </van-dropdown-menu>
                    <div class="orderBy" @click="ordersUp">
                        <span class="leftTitle" :class="orderBy=='ordersUp'?'isActive':''">销量</span>
                    </div>
                    <div class="orderBy" @click="priceUp">
                        <span class="leftTitle" :class="orderBy=='priceUp'||orderBy=='priceDown'?'isActive':''">价格</span>
                        <div class="rightIcon">
                            <van-icon v-show="orderBy!=='priceUp'" name="play" />
                            <van-icon v-show="orderBy!=='priceDown'" name="play" />
                        </div>
                    </div>
                    <div class="orderBy" @click="addedUp">
                        <span class="leftTitle" :class="orderBy=='addedUp'||orderBy=='addedDown'?'isActive':''">时间</span>
                        <div class="rightIcon">
                            <van-icon v-show="orderBy!=='addedUp'" name="play" />
                            <van-icon v-show="orderBy!=='addedDown'" name="play" />
                        </div>
                    </div>
                </div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多商品了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="getOrderList(active)"
                >
                    <div class="shopBottom">
                        <div class="shop_lr">            
                            <div class="shop_list mui-bar-nav" v-for="item in searchList" :key='item.id'>
                                <router-link :to="{path:'/detailsIndex',query:{id:item.id}}">                        
                                    <div class="shop_img">
                                        <img v-lazy="item.pic" alt="">
                                    </div>
                                    <div class="shop_title">
                                        {{item.name}}
                                    </div>
                                    <div class="pintuan" v-if="item.pintuan || item.kanjia">
                                        <van-tag class="rightTitle" plain v-if="item.pintuan">拼团</van-tag>
                                        <van-tag class="rightTitle" plain v-if="item.kanjia">砍价</van-tag>
                                    </div>
                                    <div class="price">
                                        <span class="newprice">￥{{item.minPrice}}</span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            productName: null,
            searchList: [],
            option: [
                { text: '全部商品', value: null },
                { text: '推荐商品', value: 1 },
            ],
            recommendStatus: null,
            orderBy: null,
            page: 1,
            pageSize: 10,
            loading: false,
            finished: false,
            error: false
        }
    },
    computed: {
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        goShop(){
            this.$router.push({path: '/shopIndex'})
        },
        reset(){
            this.searchList = []
            this.page = 1
            this.search()
        },
        ordersUp(){
            this.orderBy = 'ordersUp'
            this.reset()
        },
        changeStatus(value){
            this.orderBy = null
            this.recommendStatus = value
            this.reset()
        },
        priceUp(){
            this.orderBy=='priceUp'? this.orderBy='priceDown' : this.orderBy='priceUp'
            this.reset()
        },
        addedUp(){
            this.orderBy=='addedUp'? this.orderBy='addedDown' : this.orderBy='addedUp'
            this.reset()
        },
        search(){
            this.$toast.loading({ duration: 0,forbidClick: true });
            var params = {
                page: this.page,
                pageSize: this.pageSize,
                orderBy: this.orderBy,
                recommendStatus: this.recommendStatus,
                nameLike: this.productName
            }
            this.$http.shopList (params).then((res)=>{
                this.finished = false
                if(res.data.code == 0) {
                    this.searchList = this.searchList.concat(res.data.data)
                    this.page ++
                    this.loading = false
                    if(res.data.data.length < this.pageSize){
                        this.finished = true
                    }
                    this.$toast.clear()
                } else {
                    this.finished = true
                    this.$toast.clear()
                }
            }).catch(()=>{
                this.error = true
            })
        },
        
    },
    created() {
        this.productName = sessionStorage.getItem('productName')
        this.search()
    },
}
</script>