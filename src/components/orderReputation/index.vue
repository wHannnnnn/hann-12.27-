<template>
    <div class="reputation">
        <van-nav-bar title="发布评价" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
            <div slot="right" @click="submit">提交</div>
        </van-nav-bar>
        <div class="content">
            <div class="shopList" v-for="item in orderDetail.goods" :key="item.id">
                <div class="repu_top">
                    <div class="shop_pic">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="right_star">
                        <!-- 组件 -->
                        <div class="shop_name van-ellipsis">{{item.goodsName}}</div>
                        <div class="star_level">
                            <van-rate
                                count="3"
                                v-model="item.reputation"
                                void-icon="star"
                                void-color="#eee"
                            />
                        </div>
                    </div>
                </div>
                <div class="repu_con">
                    <div class="repu_con_title">
                        <van-field
                            v-model="item.remark"
                            rows="4"
                            autosize
                            label="评论"
                            type="textarea"
                            placeholder="请输入评论内容"
                            maxlength="200"
                            show-word-limit
                        />
                    </div>
                </div>
                <div class="repu_upload">
                    <van-uploader v-model="item.pics" multiple />
                    <div>添加图片/视频</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderDetail: {},
            message: '',
            fileList: [],
            counter: 0
        }
    },
    watch: {
        counter(val,oldval){
            var number = 0
            this.orderDetail.goods.forEach((e,i) => {
                number += e.pics.length
            })
            if(val == number) {
                this.submitNext(this.arr)
            }
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        // 订单信息
        getOrderDetails(){
            this.$http.orderDetail({id: this.$route.query.id}).then((res)=>{
                console.log(res)
                if(res.data.code == 0){
                    res.data.data.goods.forEach(ele => {
                        ele.pics = []
                        ele.remark = ''
                        ele.reputation = 1
                    })
                    this.orderDetail = res.data.data
                }
            })
        },
        submit(){
            this.$toast.loading({ duration: 0,forbidClick: true });
            this.arr = []
            this.counter = 0
            this.orderDetail.goods.forEach((e,i) => {
                e.picArr = []
                e.pics.forEach(ele => {
                    let formData = new FormData()
                    formData.append('upfile',ele.file);
                    this.$http.uploadFile(formData).then((res)=>{
                        this.counter += 1 
                        e.picArr.push(res.data.data.url)
                    })
                })
                var obj = {
                    id: e.id,
                    reputation: e.reputation - 1,
                    remark: e.remark,
                    pics: e.picArr
                }
                this.arr.push(obj)
            })
        },
        submitNext(arr){
            var params = {
                token: localStorage.getItem('token'),
                orderId: this.orderDetail.orderInfo.id,
                reputations: arr
            }
            this.$http.orderReputation({postJsonString: JSON.stringify(params)}).then((res)=>{
                if(res.data.code == 0){
                    this.$toast.clear()
                    this.$toast.success('评论成功')
                    this.$router.go(-1)
                } else {
                    this.$toast(res.data.msg)
                }
            })

        }
    },
    created() {
        this.getOrderDetails()
    },
}
</script>