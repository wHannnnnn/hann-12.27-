<template>
    <div class="contop_all">
        <div class="today">
            <div></div>
        </div>
        <!-- 拼团砍价 -->
        <div class="group">
            <div class="group_top">
                拼团砍价专区
            </div>
            <div class="group_con">
                <div class="group_con_con">
                   <div class="groupTitle">
                       拼团
                       <span class="groupText">一元起包邮</span>
                    </div>
                   <div class="groupImg">
                       <img v-lazy="groupImg1" alt="">
                   </div>
                </div>
                <div class="group_con_con">
                    <div class="groupTitle">
                        砍价
                         <span class="groupText">一元起包邮</span>
                    </div>
                    <div class="groupImg">
                       <img v-lazy="groupImg2" alt="">
                   </div>
                </div>
            </div>
        </div>
        <!-- 热销榜 -->
        <div class="hotNav">
            <div class="hotTop">
                <span>类目热销榜</span>
            </div>
            <div class="hot_con">
                <!-- 顶部 -->
                <div class="hot_con_top">
                    <div class="hot_con_top_con">
                        <div class="hottext">
                            热销榜
                        </div>
                        <div class="hotImg">
                            <img v-lazy="hot1" alt="">
                        </div>
                    </div>
                    <div class="hot_con_top_con">
                        <div class="hottext">好评榜</div>
                        <div class="hotImg">
                            <img v-lazy="hot2" alt="">
                        </div>
                    </div>
                </div>
                <!-- 底部 -->
                <div class="hot_con_bottom">
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot3" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot4" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot5" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot6" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot7" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot8" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot9" alt="">
                        </div>
                    </div>
                    <div class="bottom_list">
                        <div class="bottom_title">服饰鞋包榜</div>
                        <div class="bottom_img">
                            <img v-lazy="hot10" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 新品首发 -->
        <div class="newProducts">
            <div class="newTop">
                <span class="topTitle">新品首发</span>
                <span class="more">更多></span> 
            </div>
            <div class="newPro_con">
                <div class="newPro_list" v-for="item in newShopList" :key="item.id">
                     <router-link :to="{path:'/detailsIndex',query:{id:item.id}}">
                        <div class="newPro_img">
                            <img v-lazy="item.pic" alt="">
                        </div>
                        <div class="newPro_title">
                            <span class="title_val">{{item.name}}</span>
                        </div>
                        <div class="newPro_price">
                            <span class="newPrice">￥{{item.minPrice}}</span>
                            <span class="priceTitle">特价</span>
                        </div>
                     </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hot1: require('../../assets/images/hot1.png'),
            hot2: require('../../assets/images/hot2.png'),
            hot3: require('../../assets/images/hot3.png'),
            hot4: require('../../assets/images/hot4.png'),
            hot5: require('../../assets/images/hot5.png'),
            hot6: require('../../assets/images/hot6.png'),
            hot7: require('../../assets/images/hot7.png'),
            hot8: require('../../assets/images/hot8.png'),
            hot9: require('../../assets/images/hot9.png'),
            hot10: require('../../assets/images/hot10.png'),
            groupImg1: require('../../assets/images/group1.png'),
            groupImg2: require('../../assets/images/group2.png'),
        }
    },
    props:['newShopList'],
    computed: {
        newList(){
            return this.newShopList
        }
    },
    created() {
        console.log(this.newShopList)
    },
}
</script>