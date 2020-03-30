<template>
    <div class='orderList'>
        <van-nav-bar title="订单详情" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多订单了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="getOrderList(active)"
            >
                <van-tabs v-model="active" :animated='true' @click="tabChange" sticky>
                    <van-tab title="全部" name="4">
                        <alldata :alldata="allData"/>
                    </van-tab>
                    <van-tab title="待付款" name="0">
                        <alldata :alldata="allData"/>
                    </van-tab>
                    <van-tab title="待发货" name="1">
                        <alldata :alldata="allData"/>
                    </van-tab>
                    <van-tab title="待收货" name="2">
                        <alldata :alldata="allData"/>
                    </van-tab>
                    <van-tab title="待评价" name="3">
                        <alldata :alldata="allData"/>
                    </van-tab>
                    <van-tab title="已取消" name="-1">
                        <alldata :alldata="allData"/>
                    </van-tab>
                </van-tabs>
            </van-list>
        </div>
    </div>
</template>
<script>
import alldata from './alldata.vue'
export default {
    name: 'orderList',
    data() {
        return {
            active: '4',
            page: 1,
            pageSize: 10,
            goodsMap:{},
            logisticsMap: {},
            allData: {
                orderList: [],
                goodsMap: {},
                logisticsMap: {}
            },
            obj: {
                orderList: [],
                goodsMap: {},
                logisticsMap: {}
            },
            loading: false,
            finished: false,
            error: false
        }
    },
    components:{
        alldata 
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        // tab切换
        tabChange(name){
            this.$router.replace({path: '/orderList',query:{status:name}})
            this.allData.orderList = []
            this.allData.goodsMap = {}
            this.allData.logisticsMap = {}
            this.page = 1
            this.loading = true
            this.finished = false
            this.error = false
            this.active = name
            this.getOrderList(name)
        },
        getOrderList(status){
            this.$toast.loading({ duration: 0,forbidClick: true });
            var params = {
                status: status=='4'?'':status,
                page: this.page,
                pageSize: this.pageSize
            }
            this.$http.orderList(params).then((res)=>{
                this.finished = false
                if(res.data.code == 0) {
                    this.allData.orderList = this.allData.orderList.concat(res.data.data.orderList)
                    this.allData.goodsMap = Object.assign(this.allData.goodsMap,res.data.data.goodsMap)
                    this.allData.logisticsMap = Object.assign(this.allData.logisticsMap,res.data.data.logisticsMap)
                    this.page ++
                    this.loading = false
                    if(res.data.data.orderList.length < this.pageSize){
                        this.finished = true
                    }
                    this.$toast.clear()
                } else {
                    this.$toast.clear()
                    this.finished = true
                }
            }).catch(()=>{
                this.$toast.clear()
                this.finished = true
                this.error = true
            })
        },
        refreshList(){
            this.$toast.loading({ duration: 0,forbidClick: true });
            var num = 0
            this.fun(num)
        },
        fun(num){
            if(num +1 >= this.page) return
            var params = {
                status: this.avtive,
                page: num + 1,
                pageSize: this.pageSize
            }
            this.$http.orderList(params).then((res)=>{
                if(res.data.code == 0) {
                    num += 1
                    this.obj.orderList = this.obj.orderList.concat(res.data.data.orderList)
                    this.obj.goodsMap = Object.assign(this.obj.goodsMap,res.data.data.goodsMap)
                    this.obj.logisticsMap = Object.assign(this.obj.logisticsMap,res.data.data.logisticsMap)
                    if(num+1 == this.page) {
                        this.allData = JSON.parse(JSON.stringify(this.obj))
                        this.$toast.clear()
                        this.obj = {orderList: [],goodsMap:{},logisticsMap:{}}
                    }
                    this.fun(num)
                }
            })
        },
    },
    created() {
        this.$route.query.status? this.active = this.$route.query.status : this.active = '4'
        // this.getOrderList(this.$route.query.status)
    },
    activated() {
        this.refreshList()
    },
    beforeRouteLeave(to, from, next) {
        const status = to.path == '/orderDetails' || to.path == '/orderReputation'
        this.$store.commit('updateAliveList', { name: 'orderList', status: status });
        setTimeout(() => {
            next();
        }, 0)
    },
}
</script>