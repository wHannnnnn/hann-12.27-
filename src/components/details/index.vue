<template>
    <div class="details_top">
        <div class="leftIcon">
            <van-icon name="arrow-left"  @click="goBack"/>
        </div>
        <van-tabs v-model="active" scrollspy sticky>

        <van-skeleton
            class="shopske"
            :row="6"
            row-width = []
            :loading="loading"
            >
            <van-tab title="商品">
                <!-- 骨架 -->
                    <!-- 顶部轮播 价格 标题 -->
                    <div class="bgc-radius-shadow top">
                        <!-- 顶部轮播 -->
                        <div class="topImg">
                            <van-swipe :autoplay="3000">
                                <van-swipe-item v-for="(item, index) in detailsList.pics" :key="index">
                                    <img v-lazy="item.pic" />
                                </van-swipe-item>
                            </van-swipe>
                        </div>
                        <!-- 价格 -->
                        <div class="shopPrice">
                            <div class="newPrice">
                                ￥{{detailsList.basicInfo.minPrice}}
                                <van-tag plain>新品</van-tag>
                            </div>
                            <div class="oldPrice">￥{{detailsList.basicInfo.originalPrice}}</div>
                        </div>
                        <!-- 标题 -->
                        <div class="shopTitle">
                            <span>
                                {{detailsList.basicInfo.name}}
                            </span>
                        </div>
                    </div>
                    <!-- 优惠券 -->
                    <div class="details_con discounts bgc-radius-shadow">
                        <div class="left">优惠</div>
                        <div class="center">
                            <div class="discounts_list" v-for="item in discountsList" :key="item.id" @click="discountsShow = true">
                                <span class="center_title">满减</span>
                                <span class="center_con van-ellipsis">{{item.name}}</span>
                            </div>
                        </div>
                        <div class="right">
                            <van-icon name="ellipsis" />
                        </div>
                    </div>
                    <!-- 领取优惠券 -->
                    <van-popup
                        class="allDiscounts"
                        v-model="discountsShow"
                        closeable
                        position="bottom"
                    >
                        <div class="discounts_title">可领取的优惠券</div>
                        <div class="discounts_con" v-for="(item,index) in discountsList" :key="item.id">
                            <div class="discounts_con_left">
                                <div class="left_top"><span>￥</span>{{item.moneyMax}}</div>
                                <div class="left_bottom">满{{item.moneyHreshold}}可用</div>
                            </div>
                            <div class="discounts_con_right">
                                <div class="right_top">{{item.name}}</div>
                                <div class="right_bottom">
                                    <div class="left">{{item.dateAdd}}-{{item.dateEnd}}</div>
                                    <div class="right"><van-button type="default" @click="getDiscount(item.id,index)">点击获取</van-button></div>
                                </div>
                            </div>
                        </div>
                    </van-popup>
                    <!-- 商品规格 -->
                    <div class="details_con category bgc-radius-shadow" @click="categoriesClick">
                        <div class="left">已选</div>
                        <div class="center">{{propertyName}}</div>
                        <div class="right">
                            <van-icon name="ellipsis" />
                        </div>
                    </div>
                    <van-sku
                        v-model="showBase"
                        :sku="skuData.sku"
                        :goods="skuData.goods_info"
                        :goods-id="skuData.goods_id"
                        :hide-stock="skuData.sku.hide_stock"
                        :quota="skuData.quota"
                        :quota-used="skuData.quota_used"
                        :initial-sku="initialSku"
                        reset-stepper-on-hide
                        reset-selected-sku-on-hide
                        disable-stepper-input
                        :close-on-click-overlay="closeOnClickOverlay"
                        :custom-sku-validator="customSkuValidator"
                        @stepper-change="stepperChange"
                        @buy-clicked="onBuyClicked"
                        @add-cart="addcart"
                        @sku-selected="changeselect"
                        ref="getSku"
                    >
                    <template slot="sku-header-price" slot-scope="props">
                        <div class="price">
                            ￥{{headerPrice}}
                        </div>
                    </template>
                    </van-sku>
                    <!-- 运费 -->
                    <div class="details_con discounts bgc-radius-shadow">
                        <div class="left">运费</div>
                        <div class="center">
                            <span v-if="isLogistics">在线支付免运费</span>
                            <span v-else>{{logisticsTitle}}</span>
                        </div>
                        <div class="right">
                        </div>
                    </div>
                    <!-- 底部提交 -->
                    <van-goods-action>
                    <van-goods-action-icon icon="chat-o" text="收藏" @click="collect" />
                    <van-goods-action-icon icon="cart-o" text="购物车" @click="goShopCar" info="12"/>
                    <van-goods-action-button type="warning" text="加入购物车" @click="addButton" />
                    <van-goods-action-button type="danger" text="立即购买" @click="buyButton" />
                    </van-goods-action>
            </van-tab>

            <van-tab title="评价">
                <van-cell title="商品评价" @click="goReputation" is-link value="查看全部" />
                <van-panel v-for="(item,index) in reputation" :key="index" class="reputation_con">
                    <div slot="header" class="reputation">
                        <div class="header_avatar"><img :src="item.user.avatarUrl?item.user.avatarUrl:avatar" alt=""></div>
                        <div class="header_goods">
                            <div class="header_mobile">{{item.user.nick?item.user.nick:phoneReplace(item.user.mobile)}}</div>
                            <van-rate v-model="item.goods.goodReputation" readonly :count="3"/>
                        </div>
                    </div>
                    <div class="repu_value van-multi-ellipsis--l2">{{item.goods.goodReputationRemark}}</div>
                    <div class="picsList">
                        <div class="pics" v-for="img in item.reputationPics" :key="img.id">
                            <img v-lazy="img.pic" alt="">
                        </div>
                    </div>
                    <div class="repu_property">{{item.goods.property}}</div>
                </van-panel>
            </van-tab>

            <van-tab title="详情">
                <van-divider>商品详情</van-divider>
                <div class="detail_content" v-html="detailsList.content"></div>
            </van-tab>

            <van-tab title="推荐">
            </van-tab>
        </van-skeleton>
        </van-tabs>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'detailsIndex',
    data() {
        return {
            avatar: require('../../assets/images/avatar.png'),
            active: 0,
            detailsList: [],
            discountsList: [],
            reputation: [], //评论数据
            loading: true,
            // 详情页显示规格名称
            propertyName: '',
            // 商品规格
            skuData: {
                sku: {
                    tree: [
                        // {
                        //     name: '颜色',
                        //     id: '1',
                        //     v: [
                        //     {
                        //         id: '30349',
                        //         name: '天蓝色',
                        //     },
                        //     {
                        //         id: '1215',
                        //         name: '白色'
                        //     }
                        //     ],
                        //     k_s: 's1',
                        //     // count: 2
                        // },
                        // {
                        //     name: '尺寸',
                        //     id: '2',
                        //     v: [
                        //     {
                        //         id: '1193',
                        //         name: 'M'
                        //     },
                        //     {
                        //         id: '1194',
                        //         name: 'L'
                        //     }
                        //     ],
                        //     k_s: 's2',
                        //     // count: 2
                        // }
                    ],
                    // 所有 sku 的组合列表，如下是：白色1、白色2、天蓝色1、天蓝色2
                    list: [
                        // {
                        //     price: 120, //价格
                        //     s1: '1215',
                        //     s2: '1193',
                        //     stock_num: 20, //库存 
                        // },
                        // {
                        //     price: 110,
                        //     s1: '1215',
                        //     s2: '1194',
                        //     stock_num: 2, //库存 
                        // },
                        // {
                        //     price: 130,
                        //     s1: '30349',
                        //     s2: '1193',
                        //     stock_num: 40, //库存 
                        // },
                        // {
                        //     price: 100,
                        //     s1: '30349',
                        //     s2: '1194',
                        //     stock_num: 50, //库存 
                        // }
                    ],
                    price: null,
                    stock_num: null, // 商品总库存
                    none_sku: false,  // 是否无规格商品 
                    hide_stock: false  // 是否隐藏剩余库存
                },
                goods_id: null, 
                quota: 0, //限购数量 
                quota_used: 0,  //已经购买过的数量
                goods_info: {
                    title: '',
                    picture: '' 
                },
            },
            showBase: false,
            discountsShow: false,
            closeOnClickOverlay: true,
            initialSku: {
                s1: null,
                s2: null,
                selectedNum: 1
            },
            categoryIndex: 0,
            customSkuValidator: () => '请选择商品规格!',
            headerPrice: null,
            isLogistics: null,
            logisticsTitle: null,
            isRouterAlive: false
        }
    },
    watch: {
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        goBack(){
            this.$router.go(-1)
        },
        phoneReplace(tel){
            return this.$tools.phoneReplace(tel)
        },
        getDetails(){
            this.$http.shopDetail({id: this.$route.query.id}).then((res)=>{
                if(res.status == 200) {
                    this.detailsList = res.data.data //详情
                    this.getlogistics(this.detailsList)
                    this.getReputation(this.detailsList)
                    this.getDiscountsList()
                    this.loading = false;
                    this.$toast.clear()
                }
            })
        },
        // 获取运费模板
        getlogistics(data){
            if(data.logistics.isFree == false) {
                // 不包邮
                this.isLogistics = false
                this.logisticsTitle = data.logistics.details[0].firstAmount.toFixed(2)
            } else {
                // 包邮
                this.isLogistics = true
            }
        },
        //获取优惠券列表
        getDiscountsList(){
            this.$http.discountsList().then((res)=>{
                this.discountsList = res.data.data
            })
        },
        getDiscount(id,index){
            this.$http.discountsFetch({id: id}).then((res)=>{
                res.data.code == 0?this.$toast('领取成功'):this.$toast(res.data.msg)
            })  
        },
        // 点击商品规格按钮
        categoriesClick(){
            this.skuData.goods_id = this.detailsList.basicInfo.id //商品id
            // 总库存 全部价格
            this.skuData.sku.stock_num = this.detailsList.basicInfo.stores
            this.headerPrice = `${this.detailsList.basicInfo.minPrice}~${this.detailsList.basicInfo.originalPrice}`
            // 标题图片
            this.skuData.goods_info.title = this.detailsList.basicInfo.name
            this.skuData.goods_info.picture = this.detailsList.basicInfo.pic
            // 规格列表
            this.detailsList.properties.forEach((ele,i) => {
                ele.v = ele.childsCurGoods
                ele.k = ele.name
                ele.k_s = "s" + (i+1)
            });
            // 规格组合
            let arr = []
            let [firstObj,secondObj] = this.detailsList.properties
            firstObj.childsCurGoods.forEach(firstele => {
                secondObj.childsCurGoods.forEach(secondele => {
                    let obj = {}
                    obj.s1 = firstele.id
                    obj.s2 = secondele.id
                    obj.stock_num =  this.skuData.sku.stock_num
                    // obj.price =  this.detailsList.basicInfo.originalPrice * 100
                    arr.push(obj)
                })
            })
            this.skuData.sku.list = arr
            this.skuData.sku.tree = this.detailsList.properties //规格
            this.showBase = true
        },
        // 选择
        changeselect(skuValue){
            if(skuValue.selectedSku.s1 !== '' && skuValue.selectedSku.s2 !== '') {
                this.initialSku.s1 = skuValue.selectedSku.s1
                this.initialSku.s2 = skuValue.selectedSku.s2
                var str = ''
                this.detailsList.properties.forEach(ele => {
                    ele.k_s == 's1'? str += `${ele.id}:${skuValue.selectedSku.s1},` : str += `${ele.id}:${skuValue.selectedSku.s2},`
                })
                this.propertyChildIds = str
                //获取价格库存接口
                this.getPrice(str)
            } else {
                this.headerPrice = `${this.detailsList.basicInfo.minPrice}~${this.detailsList.basicInfo.originalPrice}`
            }
        },
        // 获取价格库存
        getPrice(str){
            // 12860:49837,13099:49841,
            var params = {
                goodsId: this.detailsList.basicInfo.id,
                propertyChildIds: str
            }
            this.$http.getPrice(params).then((res)=>{
                // 详情页显示规格名称
                this.propertyName = res.data.data.propertyChildNames
                this.headerPrice = res.data.data.price
                this.skuData.sku.list.price
                this.skuData.sku.list.find((ele,index) => {
                    if(ele.s1 == this.$refs.getSku.getSkuData().selectedSkuComb.s1 && ele.s2 == this.$refs.getSku.getSkuData().selectedSkuComb.s2) {
                        this.categoryIndex = index
                        Vue.set(this.skuData.sku.list[index],'stock_num',res.data.data.stores)
                        return
                    }
                })
            })
        },
        // 添加购物车  加标识判断是否添加了商品 购物车是否刷新
        addcart(skuValue) {
            var sku = [] //规格数据
            this.detailsList.properties.forEach(ele => {
                const obj = {
                    optionId: ele.id, 
                    optionValueId: ele.k_s == 's1'? skuValue.selectedSkuComb.s1 : skuValue.selectedSkuComb.s2
                }
                sku.push(obj)
            })
            // this.$http.getCartInfo().then((res)=>{
            //   if(res.data.code == 0) {
            //     console.log(res.data.data.items)
            //     res.data.data.items.find(ele => {
            //         return ele.goodsId == skuValue.goodsId 
            //     })
            //   }
            // })
            var params = {
                goodsId: skuValue.goodsId,
                number: skuValue.selectedNum,
                sku: JSON.stringify(sku)
            }
            this.$http.addCart(params).then((res)=>{
                if(res.data.code == 0){
                    this.showBase = false
                    this.$toast.success('添加成功，在购物城等亲~')
                    sessionStorage.setItem('cartRefresh',true)
                }
            })
        },
        // 获取购物车数据
        getCartInfo(){
            this.$http.getCartInfo().then((res)=>{
              if(res.data.code == 0) {
                console.log(res.data.data.items)
              }
            })
        },
        // 获取两条评论
        getReputation(data){
            var params = {
                goodsId: data.basicInfo.id,
                page: 1,
                pageSize: 2
            }
            this.$http.getReputation(params).then((res)=>{
                if(res.data.code == 0) {
                    res.data.data.forEach(element => {
                        element.goods.goodReputation += 1
                    })
                    this.reputation = res.data.data
                }
            })
        },
        // 去评论页面
        goReputation(){
            this.$router.push({path: 'reputation',query:{id: this.$route.query.id}})
        },
        // 收藏
        collect(){

        },
        //加入购物车
        goShopCar(){
            this.$router.push({path: 'shopIndex'})
        },
        // 底部加入购物车按钮
        addButton(){
            this.categoriesClick()
        },
        // 规格数字发生变化
        stepperChange(val){
            this.initialSku.selectedNum = val
        },
        // 购买
        onBuyClicked(data) {
            const setData = {
                propertyChildIds: this.propertyChildIds, //分类id
                propertyName: this.propertyName, //分类名称
                price: this.headerPrice, //价格
            }
            sessionStorage.setItem('orderData',JSON.stringify([Object.assign(data,setData)]))
            this.$router.push({path: '/placeOrder'})
        },
        // 底部购买
        buyButton(){
            this.categoriesClick()
        },

    },
    beforeCreate() {
    }, 
    created() {
        this.loading = true
        this.$toast.loading({ duration: 0,forbidClick: true });
        this.getDetails()  
    },
    mounted() {
    },
    beforeRouteLeave(to, from, next) {
        const status = to.path == '/reputation';
        this.$store.commit('updateAliveList', { name: 'detailsIndex', status: status });
        setTimeout(() => {
            next();
        }, 0)
    },
}
</script>