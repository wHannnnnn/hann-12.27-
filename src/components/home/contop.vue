<template>
    <div class="contop_all">
        <div class="today">
            <div>修改2</div>
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
                       <img v-lazy="partnerList[0].picUrl" alt="">
                   </div>
                </div>
                <div class="group_con_con">
                    <div class="groupTitle">
                        排行榜
                         <span class="groupText">跟榜购好物</span>
                    </div>
                    <div class="groupImg">
                       <img v-lazy="partnerList[1].picUrl" alt="">
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
                            <img v-lazy="partnerList[2].picUrl" alt="">
                        </div>
                    </div>
                    <div class="hot_con_top_con">
                        <div class="hottext">每日特价</div>
                        <div class="hotImg">
                            <img v-lazy="partnerList[3].picUrl" alt="">
                        </div>
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
        }
    },
    props:['partnerList'],
    methods: {
        goCategory(){
            this.$router.push({path: '/categoryList',query:{name: '新品首发',orderBy: 'addedDown'}})
        }
    },
    created() {
    },
}
</script>