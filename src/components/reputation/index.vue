<template>
    <div class="allReputation">
        <van-nav-bar title="商品评价" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <transition name="van-slide-up">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="getReputation"
                >
                    <div class="content">
                        <van-panel v-for="(item,index) in reputation" :key="index" class="reputation_con">
                            <div slot="header" class="reputation">
                                <div class="header_avatar"><img :src="item.user.avatarUrl?item.user.avatarUrl:avatar" alt=""></div>
                                <div class="header_goods">
                                    <div class="header_mobile">{{item.user.nick?item.user.nick:phoneReplace(item.user.mobile)}}</div>
                                    <van-rate v-model="item.goods.goodReputation" readonly :count="3"/>
                                </div>
                            </div>
                            <div class="repu_value">{{item.goods.goodReputationRemark}}</div>
                            <div class="picsList">
                                <div class="pics" v-for="(img,imgIndex) in item.reputationPics" :key="img.id">
                                    <img v-lazy="img.pic" alt="" @click="getImg(item.reputationPics,imgIndex)">
                                </div>
                            </div>
                            <div class="repu_property">{{item.goods.dateReputation}} | {{item.goods.property}}</div>
                        </van-panel>
                    </div>
                </van-list>
            </van-pull-refresh>
        </transition>
    </div>
</template>
<script>
import { ImagePreview } from 'vant'
export default {
    name:'reputation',
    data() {
        return {
            avatar: require('../../assets/images/avatar.png'),
            reputation: [],
            page: 1,
            pageSize: 5,
            loading: false,
            isLoading: false,
            finished: false,
            error: false
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        phoneReplace(tel){
            return this.$tools.phoneReplace(tel)
        },
        getImg(item,index){
            const arr = item.map(ele => {
                return ele.pic
            })
            ImagePreview({
                images:arr,
                showIndex:true,
                loop:false,
                startPosition:index
            })
        },
        onRefresh(){
            this.loadfirst()
        },
        loadfirst(){
            this.isLoading = false;
            this.reputation = []
            this.page = 1
            this.finished = true
            this.getReputation()
        },
        getReputation(){
            var params = {
                goodsId: this.$route.query.id,
                page: this.page,
                pageSize: this.pageSize
            }
            this.$http.getReputation(params).then((res)=>{
                this.finished = false
                this.error = false
                if(res.data.code == 0){
                    res.data.data.forEach(element => {
                        element.goods.goodReputation += 1
                    })
                    this.reputation = this.reputation.concat(res.data.data)
                    this.page ++
                    this.loading = false
                    if(res.data.data.length < this.pageSize){
                        this.finished = true
                    }
                }else{
                    this.finished = true
                }
            }).catch(()=>{
                    this.error = true
            })
        }
    },
    created() {
    },
    beforeRouteLeave (to, from, next) {
        const status = to.path == '/detailsIndex'
        if(!status) {
            this.$store.commit('resetAlive');
        }
        setTimeout(() => {
            next();
        }, 0)
    }
}
</script>