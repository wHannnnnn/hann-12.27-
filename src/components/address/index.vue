<template>
    <div class="address">
        <van-nav-bar title="我的地址" fixed>
            <van-icon name="arrow-left" slot="left" @click='goBack'/>
        </van-nav-bar>
        <div class="content">
            <van-cell>
                <template slot="title">
                    <div class="addressList" v-for="item in addressList" :key="item.id">
                        <div class="top" @click='editAddress(item)'>
                            <van-row>
                                <van-col span="6" class="userName van-ellipsis">{{item.linkMan}}</van-col>
                                <van-col span="6" offset="2" class="phone">{{phoneReplace(item.mobile)}}</van-col>
                                <van-tag type="danger" v-if="item.isDefault">默认</van-tag>
                            </van-row>
                        </div>
                        <div class="bottom">
                            <van-row>
                                <van-col span="21" class="van-multi-ellipsis--l2 addressDetail" @click='editAddress(item)'>{{item.provinceStr + item.cityStr + item.areaStr}} {{item.address}}</van-col>
                                <router-link :to="{path:'/editAddress',query:{id:item.id}}">
                                    <van-col offset="1" span="2" class="edit"><van-icon name="edit" /></van-col>
                                </router-link>
                            </van-row>
                        </div>
                    </div>
                </template>
            </van-cell>
        </div>
        <div class="addAddress">
            <van-button type="default" @click='addAddress'>添加地址</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            addressList: [],
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        phoneReplace(tel){
            return this.$tools.phoneReplace(tel)
        },
        onAdd() {
            console.log('新增地址');
        },
        onEdit(item, index) {
            console.log('编辑地址:' + index);
        },
        getAddress(){
            this.$http.getAddress().then((res)=>{
                if(res.data.code == 0){
                    this.addressList = res.data.data
                } else {
                    this.$notify({ type: 'danger', message: res.data.msg });
                }
                
            })
        },
        editAddress(item){
            if(sessionStorage.getItem('fromOrder')) {
                localStorage.setItem('addressId',item.id)
                this.$router.go(-1)
            } else {
                this.$router.push({path:'/editAddress',query:{id:item.id}})
            }
        },
        addAddress(){
            this.$router.push({path: '/editAddress'})
        }
    },
    created(){
        this.getAddress()
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            //从订单也进入
            if(from.path == '/placeOrder') {
                sessionStorage.setItem('fromOrder',true)
            }
        });
    },
    beforeRouteLeave (to, from, next) {
        const status = to.path == '/placeOrder' || to.path == '/editAddress';
        if(!status) {
            this.$store.commit('resetAlive');
        }
        to.path !== '/editAddress' && sessionStorage.removeItem('fromOrder')
        setTimeout(() => {
            next();
        }, 0)
    }
}
</script>