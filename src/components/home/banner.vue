<template>
   <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item><img v-lazy="img1" alt=""></van-swipe-item>
        <van-swipe-item><img v-lazy="img2" alt=""></van-swipe-item>
   </van-swipe>
</template>
<script>
export default {
    data() {
        return {
            img1: require('../../assets/images/banner1.webp'),
            img2: require('../../assets/images/banner2.webp'),
        }
    },
}
</script>