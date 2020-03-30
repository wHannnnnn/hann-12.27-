<template>
    <div class="placeOrder">
        <van-nav-bar title="确认订单" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <van-skeleton title :row="3" :loading="loading">
            <div class="content">
                <!-- 地址 -->
                <div class="address" v-if="addAddressShow">
                    <van-cell>
                        <template slot="title">
                            <div class="addressList" @click="goAddress">
                                选择收货地址
                            </div>
                        </template>
                    </van-cell>
                </div>
                <div class="address" v-if="!addAddressShow">
                    <van-cell>
                        <template slot="title">
                            <div class="addressList" @click="goAddress">
                                <div class="top">
                                    <van-row>
                                        <van-col span="6" class="userName van-ellipsis">{{defaultAddress.linkMan}}</van-col>
                                        <van-col span="6" offset="2" class="phone">{{phoneReplace(defaultAddress.mobile)}}</van-col>
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
                    <van-cell v-for="(items,indexs) in allData" :key="items.id">
                        <template slot="title">
                            <div class="details_con" v-for="(item,index) in items.origin" :key="index">                              
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
                                </div>
                            </div>
                            <div class="addressList">
                                <div class="con_center">
                                    <div class="logistics">
                                        <span>配送方式</span>
                                        <span v-if="items.logistics.isFree">快递 免邮</span>
                                        <span class="logisticsTitle" v-else @click="changeLogistics(items.logistics.details,indexs)">
                                            <span>{{findPrice(items.logistics.details,items.logisticsType,true)}}</span>
                                            <van-icon name="arrow" />
                                        </span>
                                    </div>
                                </div>
                                <div class="con_bottom">
                                    <span class="allNumber">共{{allNumber}}件</span>
                                    小计:<span class="allPrice">￥{{(priceCal(items.origin) + findPrice(items.logistics.details,items.logisticsType,false)).toFixed(2)}}</span>
                                </div>
                            </div>
                            <van-action-sheet v-model="logisticsShow" title="配送方式">
                                <van-radio-group v-model="items.logisticsType">
                                    <van-cell-group>
                                        <van-cell v-for="logItem in logisticsData" :key="logItem.type" :title="logItem.firstAmount.toFixed(2)" clickable @click="changRadio(indexs,logItem.type)">
                                            <van-radio slot="right-icon" :name="logItem.type" />
                                        </van-cell>
                                    </van-cell-group>
                                </van-radio-group>
                            </van-action-sheet>
                        </template>
                    </van-cell>
                </div>
                <van-cell v-if="discountData&&discountData.length>0">
                    <template slot="title">
                        <div class="discounts">
                            <div class="top">
                                <van-row>
                                    <van-col span="6" offset="4" class="userName van-ellipsis">商品优惠</van-col>
                                    <van-col span="9" class="phone">{{discountName}}</van-col>
                                    <van-col span="4" offset="1" class="dis_right" @click='discountClick'>
                                        <span>￥{{discountPrice}}</span>
                                        <van-icon name="arrow" />
                                    </van-col>
                                </van-row>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
            <van-action-sheet v-model="discountsShow" title="选择优惠">
                <van-radio-group v-model="discountId">
                    <van-cell-group>
                        <van-cell v-for="item in discountData" :key="item.id" :title="item.name" clickable @click="changLog(item)">
                            <van-radio slot="right-icon" :name="item.id" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </van-action-sheet>
            <van-submit-bar
                :disabled='disabled'
                :price="allPrice"
                button-text="提交订单"
                tip-icon="info-o"
                @submit="onSubmit"
            />
        </van-skeleton>
    </div>
</template>
<script>
import Vue from 'vue'
import { stringify } from 'querystring'
export default {
    name: 'placeOrder',
    data() {
        return {
            loading: true,
            logisticsShow: false,
            discountsShow:false,
            discountId: null,
            discountName: null,
            discountPrice: null,
            defaultAddress: {},
            addAddressShow: false,
            infoData: [], //发送过来的数据
            allOrderData: [], //全部数据
            goodsData: [], //提交的商品信息数组
            pushData:{}, //提交的全部数据
            payData: [], //订单数据
            logisticsData: [], //地址列表
            logisticsIndex: null, //选中的索引
            discountData: [],
            counter: 0,
            newData: [],
        }
    },
    computed: {
        disabled(){
            return Object.keys(this.defaultAddress).length == 0 ? true:false
        },
        allPrice:{
            get: function (params) {                
                var price = 0
                this.newData.forEach((item) => {
                    const arr = item.origin.map(v => {
                        return v.price * v.number
                    })
                    const obj = item.logistics.details.find(v=> {
                        return v.type == item.logisticsType
                    })
                    price +=  (eval(arr.join("+")) + obj.firstAmount)
                })
                price -= this.discountPrice
                return price * 100
            }
        },
        allData: {
            get: function () {                
                let tempArr = [];
                let afterData = [];
                let num = 0
                for (let i = 0; i < this.allOrderData.length; i++) {
                    if (tempArr.indexOf(this.allOrderData[i].shopId) === -1) {
                        afterData.push({
                            shopId: this.allOrderData[i].shopId,
                            logisticsType: this.allOrderData[i].logisticsType,
                            origin: [this.allOrderData[i]]
                        });
                        tempArr.push(this.allOrderData[i].shopId);
                    } else {
                        for (let j = 0; j < afterData.length; j++) {
                            if (afterData[j].shopId == this.allOrderData[i].shopId) {
                                afterData[j].origin.push(this.allOrderData[i]);
                                break;
                            }
                        }
                    }
                }
                afterData.forEach(ele => {
                    ele.origin.forEach((v,i) => {
                        if(v.logistics.isFree == false) {
                            num = i
                        }
                    })
                    ele.logistics = ele.origin[num].logistics
                });
                this.newData = afterData
                return afterData
            },
        },
        allNumber() {
            var number = 0
            this.allOrderData.forEach(val => {
                number += val.number
            })
            return number
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        phoneReplace(tel){
            return this.$tools.phoneReplace(tel)
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
                    if(res.data.code == 700){
                        this.addAddressShow = true
                    } else {
                        this.addAddressShow = false
                        this.defaultAddress = res.data.data.info
                    }
                })
            }
        },
        // 优惠券
        myDiscounts(){
            var price = 0
            const arr = this.allOrderData.map(v => {
                return v.price * v.number
            })
            price +=  eval(arr.join("+"))
            var params = {
                consumAmount: price,
                status: 0
            }
            this.$http.myDiscounts(params).then((res)=>{
                if(res.data.code == 0) {
                    this.discountData = res.data.data
                    let data = res.data.data.reduce((p,v) => p.money < v.money ? v : p)
                    this.discountId = data.id
                    this.discountName = data.name
                    this.discountPrice = data.money
                }
            })
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
                    shopId: res.data.data.basicInfo.shopId,
                    number: data.selectedNum,
                    propertyChildIds: data.propertyChildIds,
                    propertyName: data.propertyName,
                    price: data.price,
                    time: res.data.data.extJson.time,
                    logistics: res.data.data.logistics,
                    logisticsType: 0
                }
                this.allOrderData.push(Object.assign(res.data.data.basicInfo,setData))
                this.counter += 1 
            })
        },
        //选择快递
        changeLogistics(data,index){
            this.logisticsShow = true
            this.logisticsData = data
            this.logisticsIndex = index
        },
        // 价格计算
        priceCal(item){
            const arr = item.map((v)=>{
                return v.price*v.number
            })
            return eval(arr.join("+"))
        },
        // 查找显示快递名称
        findPrice(item,type,priceOrName){
            const obj = item.find(ele => {
                return ele.type == type
            })
            if(priceOrName == true) {
                return obj.type == 0? `快递:￥${obj.firstAmount.toFixed(2)}` : `EMS:￥${obj.firstAmount.toFixed(2)}`
            } else {
                return obj.firstAmount
            }
        },
        //选中快递
        changRadio(index,type){
            Vue.set(this.allData[index],'logisticsType',type)
            this.logisticsShow = false
        },
        discountClick(){
            this.discountsShow = true
        },
        changLog(item){
            this.discountId = item.id
            this.discountName = item.name
            this.discountPrice = item.money
            this.discountsShow = false
        },
        // 提交订单
        onSubmit(){
            this.allData.forEach(ele => {
                ele.origin.forEach(v => {
                    const obj = {
                        goodsId: v.id,
                        number: v.number,
                        propertyChildIds: v.propertyChildIds,
                        logisticsType: ele.logisticsType
                    }
                    this.goodsData.push(obj)
                })
            });
            const ortherData = {
                couponId: this.discountId,
                peisongType: 'kd',
                expireMinutes: '30',
                payOnDelivery: 0,
                code: 111
            }
            this.pushData['goodsJsonStr'] = JSON.stringify(this.goodsData)
            Object.assign(this.pushData,this.defaultAddress,ortherData)
            // 下单接口
            this.$http.creatOrder(this.pushData).then((res)=>{
                if(res.data.code == 0) {
                    this.pushData['goodsJsonStr'] = []
                    this.$toast.success('添加成功，暂不支持支付，请联系管理员')
                } else {
                    this.$toast(res.data.msg)
                }
                // 支付接口再说
            })
        },
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
    },
    beforeCreate() {
    },
    watch: {
        counter(val,oldval){
            var number = 0
            this.infoData.forEach((e,i) => {
                number += 1
            })
            if(val == number) {
                this.myDiscounts()
                this.loading = false
                this.$toast.clear()
            }
        },
    },
    created() {
        this.$toast.loading({ duration: 0,forbidClick: true });
        this.counter = 0
        if(!JSON.parse(sessionStorage.getItem('orderData'))) {
            this.$router.go(-1)
            this.$toast.clear()
        }  else {
            this.infoData = JSON.parse(sessionStorage.getItem('orderData'))
            this.getDefaultAddress() //获取默认地址还是重新选择
            this.infoData.forEach((ele,i) => {
                this.getDetail(ele)
            })
        }
    },
    mounted() {
    },
    activated() {
        this.getDefaultAddress() //获取默认地址还是重新选择
    },
    beforeRouteLeave(to, from, next) {
        const status = to.path == '/address';
        if(!status) {
            sessionStorage.removeItem('orderData')
        }
        if(!status && to.path !== '/detailsIndex') {
            sessionStorage.removeItem('orderData')
            this.$store.commit('resetAlive');
        }
        this.$store.commit('updateAliveList', { name: 'placeOrder', status: status });
        setTimeout(() => {
            next();
        }, 0)
    }
}
</script>