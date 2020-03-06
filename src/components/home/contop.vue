<template>
    <div class="contop_all">
        <div class="today">
            <div></div>
        </div>
        <!-- 拼团砍价 -->
        <div class="group">
            <div class="group_con">
                <div class="group_con_con" @click="goCategory">
                   <div class="groupTitle">
                       新品首发
                       <span class="groupText">一元起包邮</span>
                    </div>
                   <div class="groupImg">
                       <img v-lazy="groupImg1" alt="">
                   </div>
                </div>
                <div class="group_con_con">
                    <div class="groupTitle">
                        排行榜
                         <span class="groupText">跟榜购好物</span>
                    </div>
                    <div class="groupImg">
                       <img v-lazy="groupImg2" alt="">
                   </div>
                </div>
            </div>
        </div>
        <!-- 热销榜 -->
        <div class="hotNav">
            <div class="hot_con">
                <!-- 顶部 -->
                <div class="hot_con_top">
                    <div class="hot_con_top_con">
                        <div class="hottext">
                            每日秒杀
                        </div>
                        <div class="hotImg">
                            <img v-lazy="hot1" alt="">
                        </div>
                    </div>
                    <div class="hot_con_top_con">
                        <div class="hottext">每日特价</div>
                        <div class="hotImg">
                            <img v-lazy="hot2" alt="">
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- 新品首发 -->
        <!-- <div class="newProducts">
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
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            hot1: require('../../assets/images/hot1.png'),
            hot2: require('../../assets/images/hot2.png'),
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
    methods: {
        goCategory(){
            this.$router.push({path: '/categoryList'})
        }
    },
    created() {
    },
}
</script>