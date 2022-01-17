<template>
   <van-swipe :autoplay="3000" indicator-color="white" :stop-propagation="false">
        <van-swipe-item v-for="item in bannerList">
            <img v-lazy="item.picUrl" alt="">
        </van-swipe-item>
        
   </van-swipe>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:['bannerList'],
}
</script>