<template>
    <div class="regis">
        <van-nav-bar title="手机快速注册" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-cell-group>
                    <van-field
                        v-if="step == 1"
                        :value="phone"
                        readonly
                        clickable
                        type="tel"
                        placeholder="请输入手机号"
                        :error='error'
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
                        v-if="step == 1"
                        type="password"
                        v-model="password"
                        placeholder="请输入密码"
                        error-message=""
                    />
                    <van-field
                        v-if="step == 1"
                        v-model="yzm"
                        center
                        clearable
                        placeholder="请输入验证码"
                        error-message=""
                    >   
                        <img :src="pic" slot="button" alt="" @click="changeYzm">
                    </van-field>
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
            phone: '',
            password: null,
            pic: null,
            key: '',
            yzm: '',
            step: 1,
            sms: null,
            time: null,
            smsDisabled: true,
            error: false,
            show: false
        }
    },
    computed: {
        disabled(){
            if(this.phone!==null &&　this.phone.length > 0 && this.password!==null &&　this.password.length > 0){
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
                var reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
                if (!reg.test(this.phone)) {
                    this.$toast("手机号格式不正确");
                } else if(this.key == ''){
                    this.$toast("请输入验证码");
                } else {
                    this.chenckYzm()
                }
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
            this.$http.getSms(params).then((res)=>{})
        },
        // 获取图形验证码
        sendYzm(){
            this.key = ('000000000' + Math.floor(Math.random() * 999999999)).slice(-9)
            this.$http.getPic({key: this.key}).then((res)=>{
                this.pic = window.URL.createObjectURL(res.data)
            })
        },
        // 切换验证码
        changeYzm(){
            this.sendYzm()
        },
        // 校验验证码
        chenckYzm(){
            var params = {
                key: this.key,
                code: this.yzm
            }
            this.$http.checkPic(params).then((res)=>{
                if(res.data.code == 0) {
                    this.step = 2
                    // 获取验证码
                    this.sendSms()
                } else {
                    this.$toast(res.data.msg)
                    this.changeYzm()
                }
            })
        },
        // 用户注册
        userRegis(){
            var params = {
                code: this.sms,
                mobile: this.phone,
                pwd: this.password
            }
            this.$http.userRegister(params).then((res)=>{
                if(res.data.code == 0){
                    this.$notify({ type: 'success', message: '注册成功' });
                    this.$router.go(-1)
                } else {
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
                if(res.data.code == 10000){
                    this.step = 1
                }
                
            }) 
        },
        // 倒计时结束
        finish(){
            this.smsDisabled = false
        }
    },
    created() {
        this.sendYzm()
    },
}
</script>