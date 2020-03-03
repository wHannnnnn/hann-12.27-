<template>
    <div class="productList">
        <van-nav-bar title="新品首发" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-tabs v-model="active" :animated='true'  @click="tabClick">
                <van-tab v-for="(item,index) in navList" :title="item.name" :name="item.id">
                  <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多商品了"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="getList"
                >
                    <div class="shop_con">
                        <div class="shopBottom">
                            <div class="shop_lr">            
                                <div class="shop_list mui-bar-nav" v-for="item in item.children" :key='item.id'>
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
                                            <span v-if="item.numberGoodReputation > 0">{{zhuan(item.numberGoodReputation,item.numberOrders).toFixed(0)}}%好评</span>
                                            <span v-if="item.numberGoodReputation == 0">暂无评价</span>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </van-list>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'categoryList',
    data() {
        return {
            active: null,
            navList: [],
            page: 1,
            pageSize: 10,
            categoryId: null,
            orderBy: 'addedDown',
            navIndex: null,
            loading: false,
            finished: false,
            error: false,
        }
    },
    // computed: {
    //     allData(){
    //         return this.navList.filter((ele,index) =>{
    //             return ele.level == 1
    //         })
    //     }
    // },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        zhuan(val1,val2){
            return (val1/val2) * 100
        },
        categoryList(){
            this.$http.category().then((res)=>{
                this.navList = res.data.data.filter((ele,index) =>{
                    return ele.level == 1
                })
                this.navList.forEach(ele => {
                    ele.children = []
                })
                this.$toast.clear()
            }).then(()=> {
                this.loading = true
            }).catch(()=> {
                 this.$toast.clear()
            })
        },
        getList(){
            this.$toast.loading({ duration: 0,forbidClick: true });
            var params = {
                page: this.page,
                pageSize: this.pageSize,
                categoryId: this.active,
                orderBy: this.orderBy,
            }
            this.$http.shopList (params).then((res)=>{
                this.finished = false
                if(res.data.code == 0){
                    this.navList[this.navIndex].children = this.navList[this.navIndex].children.concat(res.data.data)
                    this.loading = false
                    this.page ++
                    if(res.data.data.length < this.pageSize){
                        this.finished = true
                    }
                    this.loading = false
                    this.$toast.clear()
                } else {
                    this.finished = true
                    this.$toast.clear()
                }
            }).catch(()=> {
                this.$toast.clear()
                this.finished = true
                this.error = true
            })
        },
        tabClick(value){
            this.page = 1
            this.loading = true
            this.finished = false
            this.error = false
            this.categoryId = value
            this.navIndex = this.navList.findIndex((item,i) => item.id === value)
            Vue.set(this.navList[this.navIndex],'children',[])
            this.getList()
        }
    },
    created() {
        this.categoryList()
    },
    beforeRouteLeave(to, from, next) {
        const status = to.path == '/detailsIndex'
        this.$store.commit('updateAliveList', { name: 'categoryList', status: status });
        setTimeout(() => {
            next();
        }, 0)
    },
}
</script>