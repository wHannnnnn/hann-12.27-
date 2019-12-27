<template>
    <div class="regis">
        <van-nav-bar title="手机快速注册" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-cell-group>
                    <van-field
                        v-if="step == 1"
                        v-model="phone"
                        placeholder="请输入手机号"
                        error-message=""
                    />
                    <van-field
                        v-if="step == 2"
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
                <van-button type="primary" :disabled='disabled' size="normal" @click='next'>下一步</van-button>
            </div>
            <div class="bottom">遇到困难？您可以联系客服</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            phone: null,
            step: 1,
            sms: null,
            time: null,
            smsDisabled: true
        }
    },
    computed: {
        disabled(){
            if(this.phone!==null &&　this.phone.length > 0){
                return false
            } else {
                return true
            }
        }
    },
    methods: {
        goBack(){
            if(this.step == 1) {
               this.$router.go(-1) 
            } else {
                this.$dialog.confirm({
                    message: '点击"返回"将中断注册，确定返回？'
                }).then(() => {
                    this.$router.go(-1)
                }).catch(() => {
                // on cancel
                });
            }
        },
        // 下一步
        next(){
            if(this.step == 1){
                this.step = 2
                // 获取验证码
                this.sendSms()
            } else {
                // 注册接口
                this.userRegis()
            }
        },
        // 获取验证码
        sendSms(){
            this.time = 60 * 1000
            this.smsDisabled = true
            var params = {
                mobile: this.phone,
            }
            this.$http.getSms(params).then((res)=>{
                if(res.data.code !== 0){
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
            })
        },
        // 用户注册
        userRegis(){
            var params = {
                code: this.sms,
                mobile: this.phone,
                pwd: this.phone + ''
            }
            this.$http.userRegister(params).then((res)=>{
                if(res.data.code == 0){
                    this.$notify({ type: 'success', message: '注册成功' });
                    this.$router.go(-1)
                } else {
                     this.$notify({ type: 'danger', message: res.data.msg });
                }
            }) 
        },
        // 倒计时结束
        finish(){
            this.smsDisabled = false
        }
    },
}
</script>