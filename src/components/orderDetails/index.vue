<template>
    <div class="orderDetail">
        <van-nav-bar title="订单详情" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <div class="detail_address">
                <van-cell icon="location-o">
                    <template slot="title">
                        <div class="addressList">
                            <div class="top">
                                <van-row>
                                    <van-col span="6" class="userName van-ellipsis">{{orderDetail.logistics.linkMan}}</van-col>
                                    <van-col span="6" offset="2" class="phone">{{orderDetail.logistics.mobile}}</van-col>
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
                    <div class="data_center">
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
                        <van-button type="default">申请售后</van-button>
                        <van-button type="default">加购物车</van-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderDetail: {}  
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        getOrderDetails(){
            this.$http.orderDetail({id: this.$route.query.id}).then((res)=>{
                console.log(res)
                if(res.data.code == 0){
                    this.orderDetail = res.data.data
                }
            })
        }
    },
    created() {
        this.getOrderDetails()
    },
}
</script>