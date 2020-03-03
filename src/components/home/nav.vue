<template>
    <van-swipe :autoplay="0" class="homeNav" :stop-propagation="false">
        <van-swipe-item v-for="(item, index) in firstList" :key="index">
            <van-grid :border="false" :column-num="5">
                <van-grid-item v-for="items in item" :key="items.id" @click.native="goProduct(items)">
                    <img v-lazy="items.icon" />
                    <div class="value">{{items.name}}</div>
                </van-grid-item>
            </van-grid>
        </van-swipe-item>
    </van-swipe>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    props:['navList'],
    computed: {
        firstList(){
            var data = this.navList.filter((ele,index) =>{
                return ele.level == 1
            })
            var result = []
            for(var i=0;i<data.length;i+=10){
                result.push(data.slice(i,i+10));
            }
            return result
        }
    },
    methods: {
        goProduct(items){
            this.$router.push({path: '/productList',query: {id: items.id,name:items.name}})
        }
    },
    mounted() {
    },
}
</script>
<style lang="scss">

</style>