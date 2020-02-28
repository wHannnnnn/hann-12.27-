<template>
    <div class="productList">
        <van-nav-bar :title="categoryName" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
            <van-search
                class="right_search"
                v-if="!categoryId"
                slot="right"
                v-model="productName"
                v-focus="searchCon"
                placeholder="请输入搜索关键词"
                @search="goSearch"
                @focus="searchFocus"
            >
                <span slot="left-icon"></span>
            </van-search>
            <van-icon name="shopping-cart-o" v-if="categoryId" slot="right" @click="goShop"/>
        </van-nav-bar>
        <div class="content">
            <div class="search_con" v-show="searchCon">
                <div class="searchCon_top">
                    <span>历史搜索</span>
                    <van-icon @click.native="deleteHistory" name="delete" />
                </div>
                <div class="searchCon_bottom">
                    <van-tag plain v-for="item in historyList" :key="item" @click.native="historyClick(item)">{{item}}</van-tag>
                </div>
            </div>
            <div class="shop_con" v-show="!searchCon">
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
                            <van-icon v-show="orderBy!=='priceDown'" name="play" />
                            <van-icon v-show="orderBy!=='priceUp'" name="play" />
                        </div>
                    </div>
                    <div class="orderBy" @click="addedUp">
                        <span class="leftTitle" :class="orderBy=='addedUp'||orderBy=='addedDown'?'isActive':''">时间</span>
                        <div class="rightIcon">
                            <van-icon v-show="orderBy!=='addedDown'" name="play" />
                            <van-icon v-show="orderBy!=='addedUp'" name="play" />
                        </div>
                    </div>
                </div>
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多商品了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="search"
                >
                    <div class="shopBottom">
                        <div class="shop_lr">            
                            <div class="shop_list mui-bar-nav" v-for="item in searchList" :key='item.id'>
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
                                        <span class="newprice">￥{{item.minPrice.toFixed(2)}}</span>
                                    </div>
                                    <div class="goodReputation">
                                        <span v-if="item.numberGoodReputation > 0">{{item.numberGoodReputation}}
                                            <span v-if="item.numberGoodReputation > 10">条评价 </span>
                                        </span>
                                        <span v-if="item.numberGoodReputation > 0">{{zhuan(item.numberGoodReputation,item.numberOrders).toFixed(0)}}好评</span>
                                        <span v-if="item.numberGoodReputation == 0">暂无评价</span>
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
    name: 'productList',
    data() {
        return {
            productName: null,
            categoryId: null,
            categoryName: null,
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
            error: false,
            searchCon: false, //搜索显示
            historyList: []
        }
    },
    directives: {
        focus: {
            update: function (el, value) {   //第二个参数传进来的是个json
                if (value) {
                    el.focus()
                }
            }
        }
    },
    methods: {
        goBack(){
            if(this.productName){
                this.searchCon?this.searchCon=false:this.$router.go(-1)
            } else {
                this.$router.go(-1)
            }
        },
        goShop(){
            this.$router.push({path: '/shopIndex'})
        },
        zhuan(val1,val2){
            return (val1/val2) * 100
        },
        // 已经搜索缓存搜索结果 10条
        goSearch(value){
            if(value){
                if(localStorage.getItem('searchValue')) {
                    var arr = JSON.parse(localStorage.getItem('searchValue'))
                    if(arr.indexOf(value) !== -1){
                        arr.splice(arr.indexOf(value),1)
                    } else {
                        arr.length>=10 && arr.pop()
                    }
                    arr.unshift(value)
                } else {
                    var arr = []
                    arr.push(value)
                }
                localStorage.setItem('searchValue',JSON.stringify(arr))
                this.historyList = arr
                this.searchCon = false
                this.reset()
            }
        },
        getHistory(){
            this.historyList = JSON.parse(localStorage.getItem('searchValue'))
        },
        historyClick(value){
            this.productName = value
            this.searchCon = false
            this.reset()
            var arr = JSON.parse(localStorage.getItem('searchValue'))
            if(arr.indexOf(value) !== -1) {
                arr.splice(arr.indexOf(value),1)
                arr.unshift(value)
                localStorage.setItem('searchValue',JSON.stringify(arr))
                this.historyList = arr
            }
        },
        deleteHistory(){
            this.$dialog.confirm({
                message: `确定要清空全部历史记录?`,
            }).then(() => {
                localStorage.removeItem('searchValue')
                this.historyList = []
            }).then(()=>{
                this.$toast.success('删除成功');
            })
        },
        searchFocus(e){
            this.searchCon = true
        },
        reset(){
            this.searchList = []
            this.page = 1
            this.search()
        },
        ordersUp(){
            this.orderBy = 'ordersDown'
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
                categoryId: this.categoryId,
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
                this.$toast.clear()
                this.error = true
                this.finished = true
            })
        },
    },
    created() {
        this.getHistory()
        if(sessionStorage.getItem('productObj')) {
            this.categoryId = JSON.parse(sessionStorage.getItem('productObj')).id
            this.categoryName = JSON.parse(sessionStorage.getItem('productObj')).name
            console.log(sessionStorage.getItem('productObj'))
        } else if(sessionStorage.getItem('productName')){
            this.searchCon = false
            this.productName = sessionStorage.getItem('productName')
        } else {
            this.searchCon = true
        }
    },
    beforeRouteLeave(to, from, next) {
        const status = to.path == '/detailsIndex'
        status == false && sessionStorage.removeItem('productName')
        status == false && sessionStorage.removeItem('productObj')
        this.$store.commit('updateAliveList', { name: 'productList', status: status });
        setTimeout(() => {
            next();
        }, 0)
    },
}
</script>