<template>
    <van-tabbar route>
            <van-tabbar-item
                replace
                to="/homeIndex"
                icon="home-o"
            >首页
            </van-tabbar-item>
            <van-tabbar-item
                replace
                to="/navIndex"
                icon="coupon-o"
            >分类
            </van-tabbar-item>
            <van-tabbar-item
                replace
                to="/shopIndex"
                icon="cart-o"
            >购物车
            </van-tabbar-item>
            <van-tabbar-item
                replace
                to="/mineIndex"
                icon="manager-o"
            >个人
            </van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
    data() {
        return {
            selected: sessionStorage.getItem('selected')? JSON.parse(sessionStorage.getItem('selected')):'home',
        }
    },
    watch: {
        selected(val, oldVal){
            sessionStorage.setItem('selected', JSON.stringify(val))
            if(val === 'home'){
                this.$router.push('/homeIndex')          
            }else if(val === 'navIndex'){
                this.$router.push('/navIndex')            
            }else if(val === 'shopIndex'){
                this.$router.push('/shopIndex')            
            }else if(val === 'mineIndex'){
                this.$router.push('/mineIndex')           
            }
        }
    },
    methods: {
        bottomClick(val){
        }
    },
}
</script>