<template>
    <div class="placeOrder">
        <van-nav-bar title="确认订单" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <van-skeleton title :row="3" :loading="loading">
            <div class="content">
                <!-- 地址 -->
                <div class="address" v-if="defaultAddress.address">
                    <van-cell>
                        <template slot="title">
                            <div class="addressList" @click="goAddress">
                                <div class="top">
                                    <van-row>
                                        <van-col span="6" class="userName van-ellipsis">{{defaultAddress.linkMan}}</van-col>
                                        <van-col span="6" offset="2" class="phone">{{defaultAddress.mobile}}</van-col>
                                        <van-col span="6"><van-tag type="danger" v-if="defaultAddress.isDefault">默认</van-tag></van-col>
                                    </van-row>
                                </div>
                                <div class="bottom">
                                    <van-row>
                                        <van-col span="21" class="van-multi-ellipsis--l2 addressDetail">{{defaultAddress.provinceStr + defaultAddress.cityStr + defaultAddress.areaStr}} {{defaultAddress.address}}</van-col>
                                        <van-col offset="1" span="2" class="edit"><van-icon name="arrow" /></van-col>
                                    </van-row>
                                </div>
                            </div>
                        </template>
                    </van-cell>
                </div>
                <!-- 详情 -->
                <div class="details">
                    <van-cell v-for="(item,index) in allOrderData" :key="index">
                        <template slot="title">
                            <div class="addressList">
                                <div class="con_top">
                                    <div class="left">
                                        <img v-lazy="item.pic" alt="">
                                    </div>
                                    <div class="center">
                                        <div class="title van-multi-ellipsis--l2">
                                            {{item.name}}
                                        </div>
                                        <div class="property">
                                            <span>{{item.propertyName}}</span>
                                        </div>
                                        <div class="time">
                                            发货时间:{{item.time}}
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="top">￥{{item.price.toFixed(2)}}</div>
                                        <div class="bottom">x{{item.number}}</div>
                                    </div>
                                </div>
                                <div class="con_center">
                                    <div class="logistics">
                                         <span>配送方式</span>
                                         <span v-if="item.logistics.isFree">快递 免邮</span>
                                         <span v-else @click="changeLogistics(item.logistics.details,index)">
                                            <span>{{findName(item.logistics.details,item.logisticsType)}}</span>
                                         </span>
                                    </div>
                                </div>
                                <div class="con_bottom">
                                    <span class="allNumber">共{{item.number}}件</span>
                                    小计:<span class="allPrice">￥{{(item.number*item.price).toFixed(2)}}</span>
                                </div>
                            </div>
                        </template>
                    </van-cell>
                </div>
            </div>
        </van-skeleton>
        <van-submit-bar
            :disabled='disabled'
            :price="3050"
            button-text="提交订单"
            tip-icon="info-o"
            @submit="onSubmit"
        />
        <van-action-sheet v-model="logisticsShow" title="配送方式">
            <p v-for="logItem in logisticsData" :key="logItem.type" @click="changeLogisticsOne(logItem)">
                <span v-if="logItem.type==0">快递 ￥{{logItem.firstAmount.toFixed(2)}}</span>
                <span v-if="logItem.type==1">EMS ￥{{logItem.firstAmount.toFixed(2)}}</span>
            </p>
        </van-action-sheet>
    </div>
</template>
<script>
import Vue from 'vue'
import { stringify } from 'querystring'
export default {
    data() {
        return {
            loading: true,
            logisticsShow: false,
            defaultAddress: {},
            infoData: [], //发送过来的数据
            allOrderData: [], //全部数据
            goodsData: [], //提交的商品信息数组
            pushData:{}, //提交的全部数据
            payData: [], //订单数据
            logisticsData: [], //地址列表
            logisticsIndex: null, //选中的索引
        }
    },
    computed: {
        disabled(){
            return Object.keys(this.defaultAddress).length == 0 ? true:false
        },
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        goAddress(){
            this.$router.push({path: '/address'})
        },
        // 默认地址
        getDefaultAddress(){
            if(localStorage.getItem('addressId')) {
                this.$http.addressDetail({id: localStorage.getItem('addressId')}).then((res)=>{
                    this.defaultAddress = res.data.data.info
                })
            } else {
                this.$http.defaultAddress().then((res)=>{
                    this.defaultAddress = res.data.data.info
                })
            }
        },
        //商品详情
        getDetail(data){
            var params = {
                id: data.goodsId,
            }
            //接口获取商品详情
            this.$http.shopDetail(params).then((res)=>{
                // 显示的数据
                const setData = {
                    number: data.selectedNum,
                    propertyChildIds: data.propertyChildIds,
                    propertyName: data.propertyName,
                    price: data.price,
                    time: res.data.data.extJson.time,
                    logistics: res.data.data.logistics,
                    logisticsType: 0
                }
                this.allOrderData.push(Object.assign(res.data.data.basicInfo,setData))
            })
        },
        //选择快递
        changeLogistics(data,index){
            this.logisticsShow = true
            this.logisticsData = data
            this.logisticsIndex = index
        },
        // 查找显示快递名称
        findName(item,type){
            const obj = item.find(ele => {
                return ele.type == type
            })
            return obj.type == 0? `快递:￥${obj.firstAmount.toFixed(2)}` : `EMS:￥${obj.firstAmount.toFixed(2)}`
        },
        //选中快递
        changeLogisticsOne(item){
            Vue.set(this.allOrderData[this.logisticsIndex],'logisticsType',item.type)
            this.logisticsShow = false
        },
        // 提交订单
        onSubmit(){
            this.allOrderData.forEach(ele => {
                const obj = {
                    goodsId: ele.id,
                    number: ele.number,
                    propertyChildIds: ele.propertyChildIds,
                    logisticsType: ele.logisticsType
                }
                this.goodsData.push(obj)
            });
            const ortherData = {
                peisongType: 'kd',
                expireMinutes: '30',
                payOnDelivery: 0,
                code: 111
            }
            this.pushData['goodsJsonStr'] = JSON.stringify(this.goodsData)
            Object.assign(this.pushData,this.defaultAddress,ortherData)
            // 下单接口
            this.$http.creatOrder(this.pushData).then((res)=>{
                console.log(res)
                // 支付接口再说
            })
        }
    },
    created() {
        this.$toast.loading({ forbidClick: true });
        this.infoData = JSON.parse(localStorage.getItem('orderData'))
        var counter = 0;
        this.getDefaultAddress() //获取默认地址还是重新选择
        this.infoData.forEach((ele,i) => {
            this.getDetail(ele)
              setTimeout(() => {
                counter++;
                if(counter === this.infoData.length){
                    this.loading = false
                    this.$toast.clear()
                }
            }, i * 1000) 
        })
    },
    mounted() {
    },
    beforeRouteLeave(to, from, next) {
        if(to.path == '/address') {
            next();
        } else {
            localStorage.removeItem('orderData')
            next();
        }
    }
}
</script>