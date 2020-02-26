<template>
    <div class="allDiscounts">
        <van-nav-bar title="我的优惠券" fixed>
            <van-icon name="arrow-left  " slot="left" @click.native="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-tabs v-model="active">
            <van-tab title="可用">
                <div class="discounts_con" v-for="(item,index) in normalList" :key="item.id">
                    <div class="discounts_con_top">
                        <div class="discounts_con_left">
                            <div class="left_top"><span>￥</span>{{item.money}}</div>
                            <div class="left_bottom">满{{item.moneyHreshold}}可用</div>
                        </div>
                        <div class="discounts_con_right">
                            <div class="right_top">{{item.name}}</div>
                            <div class="right_bottom">
                                <div class="left">{{item.dateAdd}}-{{item.dateEnd}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="不可用">
                <div class="discounts_con" v-for="(item,index) in effectList" :key="item.id">
                    <div class="discounts_con_top">
                        <div class="discounts_con_left effect">
                            <div class="left_top"><span>￥</span>{{item.money}}</div>
                            <div class="left_bottom">满{{item.moneyHreshold}}可用</div>
                        </div>
                        <div class="discounts_con_right">
                            <div class="right_top">{{item.name}}</div>
                            <div class="right_bottom">
                                <div class="left">{{item.dateAdd}}-{{item.dateEnd}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="discounts_con_bottom">
                        <span>此优惠券{{item.statusStr}}</span>
                    </div>
                </div>
            </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '1',
            discountsList: []
        }
    },
    computed: {
        normalList(){
            var newarr = this.discountsList.filter(item => {
                return item.status == 0
            })
            return newarr
        },
        effectList(){
            var newarr = this.discountsList.filter(item => {
                return item.status !== 0
            })
            return newarr
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        getdiscount(){
            this.$http.myDiscounts().then((res)=>{
                this.discountsList = res.data.data
            })
        }
    },
    created() {
        this.$route.params.data? this.discountsList = this.$route.params.data : this.getdiscount()
    },
}
</script>