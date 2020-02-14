<template>
    <div>
        <div class="orderData" v-for="(item,index) in orderData" :key="item.id">
            <div class="data_top">
                <div class="order_delete">
                    <span class="status">{{item.statusStr}}</span>
                    <!-- <van-icon v-if="item.status !== 1 && item.status !== 2" name="delete" @click="goBack"/> -->
                </div>
            </div>
            <div class="data_center" @click="goOrderDetail(item.id)">
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
                <van-button type="default" v-if="item.status == 3" @click.stop='goReputation(item.id)'>评价服务</van-button>
                <van-button type="default" v-if="item.status==0">取消订单</van-button>
                <van-button type="default" class="buyagain" v-if="item.status!==1&& item.status!==2" @click='deleteOrder(item.id,index)'>删除订单</van-button>
                <van-button type="default" @click="goOrderDetail(item.id)">查看订单</van-button>
                <van-button type="default" class="buyagain" v-if="item.status == 2" @click.stop='orderDelivery(item.id,index)'>确认收货</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    props: ['alldata'],
    computed: {
        goodsMap(){
            return this.alldata.goodsMap
        },
        logisticsMap(){
            return this.alldata.logisticsMap
        },
        orderData(){
            return this.alldata.orderList
        },
    },
    methods: {
        goOrderDetail(id){
            this.$router.push({path: '/orderDetails',query:{id: id}})
        },
        // 删除订单
        deleteOrder(orderId,index){
            console.log(this.orderData)
            this.$dialog.confirm({
                message: `确定要删除订单吗?`,
                cancelButtonText: '我再想想'
            }).then(() => {
                this.$http.deleteOrder({orderId: orderId}).then((res)=>{
                    if(res.data.code == 0){
                        this.orderData.splice(index,1)
                        this.$toast.success('删除成功');
                    }
                })
            })
        },
    },
}
</script>