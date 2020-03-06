<template>
    <div class="login">
        <van-nav-bar fixed>
            <van-icon name="cross" slot="left" @click.native="goBack"/>
            <div slot="right">帮助</div>
        </van-nav-bar>
        <div class="content">
            <div class="logo">
                <img v-lazy="hot1" alt="">
            </div>
            <van-cell-group>
                <van-field
                    :value="phone"
                    readonly
                    clickable
                    placeholder="请输入手机号"
                    error-message=""
                    @touchstart.native.stop="show = true"
                />
                <van-number-keyboard
                v-model="phone"
                :show="show"
                :maxlength="11"
                @blur="show = false"
                />
                <van-field
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                />
                <div class="login_button login_all_button">
                    <van-button type="primary" size="normal" @click='login'>登录</van-button>
                </div>
            </van-cell-group>
            <div class="regis bgc-radius-shadow">
                <span>其他登录方式</span>
                <span @click="goRegis">新用户注册</span>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            hot1: require('../assets/images/logo.png'), 
            phone: '',
            password: null,
            show: false
        }
    },
    methods: {
        ...mapMutations(['handleToken','handleLoginUser']),
        goBack(){
            this.$router.go(-1)
        },
        sendSms(){
            var params = {
                mobile: this.phone,
            }
             this.$http.getSms(params).then((res)=>{
                 console.log(res)
             })
        },
        goRegis(){
            this.$router.push({path: '/regis'})
        },
        login(){
            var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
            if (!this.phone) {
                this.$toast("请输入手机号")
                return
            }
            if (!this.password) {
                this.$toast("请输入密码")
                return
            }
            if (!reg.test(this.phone)) {
                this.$toast("手机号格式不正确")
                return
            }
            var params = {
                deviceId: '001',
                deviceName: 'onPlus',
                mobile: this.phone,
                pwd: this.password
            }
            this.$http.login(params).then((res)=>{
                if(res.data.code == 0){
                    this.$notify({ type: 'success', message: '登录成功' });
                    this.$store.commit('resetChildrenAlive');
                    this.handleToken(res.data.data) //存储token
                    // 获取用户详情
                    this.getUserDetail(res.data.data.token) 
                } else {
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
            })
        },
        getUserDetail(token){
            this.$http.userDetail({token:token}).then((res)=>{
                this.handleLoginUser(res.data.data.base)
                this.$router.go(-1)
            })
        }
    },
}
</script>