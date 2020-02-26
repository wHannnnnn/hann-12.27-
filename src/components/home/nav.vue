<template>
    <van-grid :border="false" :column-num="5">
        <van-grid-item v-for="item in firstList">
            <van-image :src="item.icon" />
            <div class="value">{{item.name}}</div>
        </van-grid-item>
    </van-grid>
</template>
<script>
export default {
    data() {
        return {
            img1: require('../../assets/images/nav1.png'),
            img2: require('../../assets/images/nav2.png'),
            img3: require('../../assets/images/nav3.png'),
        }
    },
    props:['navList'],
    computed: {
        firstList(){
            return this.navList.filter((ele,index) =>{
                return ele.level == 1
            })
        }
    },
    mounted() {
    },
}
</script>
<style lang="scss">

</style>