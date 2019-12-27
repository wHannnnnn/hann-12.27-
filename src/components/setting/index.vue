<template>
    <div class="setting">
        <van-nav-bar title="账户设置" fixed>
            <van-icon name="arrow-left" slot="left" />
        </van-nav-bar>
        <div class="content">
            <van-cell-group>
                <van-cell is-link>
                    <!-- 使用 title 插槽来自定义标题 -->
                    <template slot="title">
                        <div class="user">
                            <div class="avatar">
                                <img :src="hot1" alt="">
                            </div>
                            <div class="right">
                                <div class="login" @click='login' v-if="!userDetail">登录/注册></div>
                                <div class="userDetail" v-else>
                                <div class="userName">{{userDetail.mobile}}</div>
                                <div class="level">普通用户</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </van-cell>
                <van-cell title="地址管理" is-link @click="goAddress" />
                <van-cell title="账户与安全" is-link value="密码/信息管理" />
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            hot1: require('../../assets/images/hot1.png'),             
        }
    },
    computed: {
        ...mapState(['loginUser']),
        userDetail(){
            return JSON.parse(this.loginUser)
        }
    },
    methods: {
        login(){
        this.$router.push({path: '/login'})
        },
        goAddress(){
            this.loginUser? this.$router.push({path: '/address'}) :  this.$router.push({path: '/login'})
            // if(this.loginUser) {
            //     this.$router.push({path: '/address'})
            // } else {

            // }
            //  this.$http.getAdress().then((res)=>{
            //      console.log(res)
            //  })
        }
    },
}
</script>