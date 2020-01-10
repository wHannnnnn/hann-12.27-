<template>
    <div class='orderList'>
        <van-tabs v-model="active" swipeable>
            <van-tab title="全部" name="4">
                <div class="orderData" v-for="(item,index) in allData" :key="item.id" @click="goOrderDetail(item.id)">
                    <div class="data_top">
                        <div class="order_delete">
                            <van-icon name="delete" @click="goBack"/>
                        </div>
                    </div>
                    <div class="data_center">
                        <div class="data_img">
                            <div class="data_img_con" v-for="(imgItem,imgIndex) in goodsMap[item.id]" :key="imgIndex">
                                <img v-lazy="imgItem.pic" alt="">
                            </div>
                        </div>
                        <div class="data_title" v-if="goodsMap[item.id].length==1">
                            {{goodsMap[item.id][0].goodsName}}
                        </div>
                        <div class="price">
                            <div class="price_top">
                                <span class="first">￥</span>
                                <span class="second">{{item.amount.toFixed(2)}}</span>
                            </div>
                            <div class="price_bottom">共{{item.goodsNumber}}件</div>
                        </div>
                    </div>
                    <div class="data_bottom">
                        <van-button type="default">评价服务</van-button>
                        <van-button type="default" class="buyagain">再次购买</van-button>
                    </div>
                </div>
            </van-tab>
            <van-tab title="待付款" name="0">
                内容2
            </van-tab>
            <van-tab title="待收货" name="1">
                内容3
            </van-tab>
            <van-tab title="待评价" name="2">
                内容4
            </van-tab>
            <van-tab title="已取消" name="3">
                内容5
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '4',
            page: 1,
            pageSize: 5,
            goodsMap:{},
            logisticsMap: {},
            allData: [],

        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        getOrderList(status){
            var params = {
                status: status=='4'?'':status,
                page: this.page,
                pageSize: this.pageSize
            }
            this.$http.orderList(params).then((res)=>{
                this.goodsMap = res.data.data.goodsMap
                this.logisticsMap = res.data.data.logisticsMap
                console.log(this.goodsMap)
                if(status == '4'){
                    this.allData = res.data.data.orderList
                }
            })
        },
        goOrderDetail(id){
            this.$router.push({path: '/orderDetails',query:{id: id}})
        }
    },
    created() {
        this.$route.query.status? this.active = this.$route.query.status : this.active = '4'
        this.getOrderList(this.$route.query.status)
    },
}
</script>