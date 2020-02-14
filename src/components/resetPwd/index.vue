<template>
    <div class="resetPwd">
        <van-nav-bar title="修改密码" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-cell-group>
                <van-field
                    v-if="step == 2"
                    v-model="password"
                    placeholder="请输入新密码"
                    error-message=""
                />
                <van-field
                        v-if="step == 1"
                        v-model="sms"
                        center
                        clearable
                        placeholder="请输入短信验证码"
                    >
                        <van-button slot="button" size="small" type="primary" v-if='smsDisabled == false' @click="sendSms">获取验证码</van-button>
                        <van-button slot="button" size="small" type="default" v-else :disabled='smsDisabled'>
                            <van-count-down :time="time" @finish="finish">
                                  <template v-slot="timeData">
                                    <span class="item">重新发送</span>
                                    <span>({{ timeData.seconds }})</span>
                                </template>
                            </van-count-down>
                        </van-button>
                </van-field>
            </van-cell-group>
            <div class="next login_all_button">
                <van-button type="primary" :disabled='disabled' size="normal" @click="next">下一步</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            step: 1,
            phone: null,
            password: null,
            sms: null,
            time: null,
            smsDisabled: false
        }
    },
    computed: {
        ...mapState(['loginUser']),
        disabled(){
            if(this.sms!==null &&　this.sms.length > 0){
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        ...mapMutations(['loginOut']),
        goBack(){
            if(this.step == 1) {
               this.$router.go(-1) 
            } else {
                this.$dialog.confirm({
                    message: '点击"返回"将取消修改，确定返回？'
                }).then(() => {
                    this.$router.go(-1)
                }).catch(() => {
                // on cancel
                });
            }
        },
        sendSms(){
            this.time = 60 * 1000
            this.smsDisabled = true
            var params = {
                mobile: JSON.parse(this.loginUser).mobile,
            }
            this.$http.getSms(params).then((res)=>{
                if(res.data.code == 0){
                    this.$notify({ type: 'success', message: '验证码已发送' });
                } else {
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
            })
        },
        // 校验验证码
        chengSms(){
            var params = {
                code: this.sms,
                mobile: JSON.parse(this.loginUser).mobile,
            }
            this.$http.checkSms(params).then((res)=>{
                if(res.data.code == 0){
                    this.step = 2
                } else {
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
            }) 
        },
        next(){
            if(this.step == 1){
                this.chengSms()
            } else {
                var params = {
                    code: this.sms,
                    mobile: this.phone,
                    pwd: this.password
                }
                this.$http.resetPwd(params).then((res)=>{
                    if(res.data.code == 0){
                        this.$notify({ type: 'success', message: '修改成功' });
                        this.$router.push({path: '/login'}) // todo login页面清除token
                        this.loginOut()
                    } else {
                        this.$notify({ type: 'danger', message: res.data.msg });
                    }
                }) 
            }
        },
       // 倒计时结束
        finish(){
            this.smsDisabled = false
        }
    },
}
</script>
