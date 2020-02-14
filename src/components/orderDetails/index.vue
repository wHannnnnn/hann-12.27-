<template>
    <div class="orderDetail">
        <van-nav-bar title="订单详情" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content" v-if="orderDetail.orderInfo">
            <div class="detail_type">{{orderDetail.orderInfo.statusStr}}
                <van-count-down v-if="orderDetail.orderInfo.status == 0" :time="time" />
            </div>
            <div class="detail_address">
                <van-cell icon="location-o">
                    <template slot="title">
                        <div class="addressList">
                            <div class="top">
                                <van-row>
                                    <van-col span="6" class="userName van-ellipsis">{{orderDetail.logistics.linkMan}}</van-col>
                                    <van-col span="6" offset="2" class="phone">{{phoneReplace(orderDetail.logistics.mobile)}}</van-col>
                                </van-row>
                            </div>
                            <div class="bottom">
                                <van-row>
                                    <van-col span="21" class="van-multi-ellipsis--l2 addressDetail">{{orderDetail.logistics.provinceStr + orderDetail.logistics.cityStr + orderDetail.logistics.areaStr}} {{orderDetail.logistics.address}}</van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
            <div class="allData">
                <div class="orderData" v-for="(item,index) in orderDetail.goods" :key="item.id">
                    <div class="data_top">
                        <div class="order_delete">
                        </div>
                    </div>
                    <div class="data_center" @click="goDetails(item.goodsId)">
                        <div class="data_img">
                            <div class="data_img_con" >
                                <img v-lazy="item.pic" alt="">
                            </div>
                        </div>
                        <div class="data_info">
                            <div class="info_title van-ellipsis">{{item.goodsName}}</div>
                            <div class="info_property">数量：{{item.number}}， {{item.property}}</div>
                            <div class="info_price">￥{{item.amount}}</div>
                        </div>
                    </div>
                    <div class="data_bottom">
                        <van-button type="default" v-if="orderDetail.orderInfo.status!== -1 && orderDetail.orderInfo.status !== 0" @click='goRefundApply'>申请售后</van-button>
                        <van-button type="default" @click="goDetails(item.goodsId)">再次购买</van-button>
                    </div>
                </div>
            </div>
            <div class="order_info">
                <div class="order_info_con">
                    <span class="order_info_title">订单编号:</span>
                    <span class="order_info_right">{{orderDetail.orderInfo.orderNumber}}</span>
                </div>
                <div class="order_info_con" v-for="item in orderDetail.logs" :key="item.id">
                    <span class="order_info_title">{{item.typeStr}}时间:</span>
                    <span class="order_info_right">{{item.dateAdd}}</span>
                </div>
                <div class="order_info_con" v-if="orderDetail.logistics.shipperName">
                    <span class="order_info_title">配送方式:</span>
                    <span class="order_info_right">{{orderDetail.logistics.shipperName}}</span>
                </div>
            </div>
            <div class="order_price">
                <div class="order_info_con">
                    <span class="order_info_title">商品总额</span>
                    <span class="order_info_right">￥{{orderDetail.orderInfo.amount.toFixed(2)}}</span>
                </div>
                <div class="order_info_con">
                    <span class="order_info_title">运费</span>
                    <span class="order_info_right">+ ￥{{orderDetail.orderInfo.amountLogistics.toFixed(2)}}</span>
                </div>
                <div class="order_info_con">
                    <span class="order_info_title">商品优惠</span>
                    <span class="order_info_right">- ￥{{orderDetail.orderInfo.amountLogistics.toFixed(2)}}</span>
                </div>
                <div class="real">
                    <span class="realName">实付款:</span>
                    <span class="realPrice">
                        <span>￥</span>{{orderDetail.orderInfo.amountReal.toFixed(2)}}
                    </span>
                </div>
            </div>
        </div>
        <div class="order_bottom" v-if="orderDetail.orderInfo">
            <van-button type="default" v-if="orderDetail.orderInfo.status !== 1 && orderDetail.orderInfo.status !==2" @click="deleteOrder(orderDetail.orderInfo.id)">删除订单</van-button>
            <van-button type="default" v-if="orderDetail.orderInfo.status == 0" @click="closeOrder(orderDetail.orderInfo.id)">取消订单</van-button>
            <van-button type="default" v-if="orderDetail.orderInfo.status == 3" @click='goReputation(orderDetail.orderInfo.id)'>追加评价</van-button>
            <van-button type="default" class="buyagain" v-if="orderDetail.orderInfo.status == 2" @click.stop='orderDelivery(orderDetail.orderInfo.id)'>确认收货</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderDetail: {},
        }
    },
    computed: {
        // 倒计时
        time(){
            let newTime = new Date().getTime()
            let closeTime = new Date(this.orderDetail.orderInfo.dateClose).getTime()
            return closeTime - newTime
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        phoneReplace(tel){
            return this.$tools.phoneReplace(tel)
        },
        getOrderDetails(){
            this.$http.orderDetail({id: this.$route.query.id}).then((res)=>{
                console.log(res)
                if(res.data.code == 0){
                    this.orderDetail = res.data.data
                }
            })
        },
        goDetails(id){
            this.$router.push({path: '/detailsIndex',query:{id: id}})
        },
        // 删除订单
        deleteOrder(orderId){
            this.$dialog.confirm({
                message: `确定要删除订单吗?`,
                cancelButtonText: '我再想想'
            }).then(() => {
                this.$http.deleteOrder({orderId: orderId}).then((res)=>{
                    if(res.data.code == 0){
                        this.$toast.success('删除成功');
                        this.$router.go(-1)
                    }
                })
            })
        },
        // 关闭订单
        closeOrder(orderId){
            this.$dialog.confirm({
                message: `确定要取消订单吗?`,
                cancelButtonText: '我再想想'
            }).then(() => {
                this.$http.closeOrder({orderId: orderId}).then((res)=>{
                    if(res.data.code == 0){
                        this.$toast.success('取消成功');
                        this.$router.go(-1)
                    } else {
                        this.$toast(res.data.msg);
                    }
                })
            })
        },
        // 确认收货
        orderDelivery(id){
            this.$dialog.confirm({
                message: `确定商品已收到吗?`,
                cancelButtonText: '我再想想'
            }).then(() => {
                this.$http.orderDelivery({orderId: id}).then((res)=>{
                    if(res.data.code == 0) {
                        this.orderDetail.orderInfo.status = 3
                        this.$toast.success('收货成功')
                    }
                })
            })
        },
        // 去评价
        goReputation(id){
            this.$router.push({path: '/orderReputation',query:{id: id}})
        },
        goRefundApply(){
            this.$toast('当前功能仅针对专业版或者增值版开放');
        }
    },
    created() {
        this.getOrderDetails()
    },
}
</script>