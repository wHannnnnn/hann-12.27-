<template>
    <div class="top_search" @click="goProduct">
        <span><van-icon name="search" />搜索商品，共2323件好物</span>
    </div>
</template>
<script>
export default {
    methods: {
        goProduct(){
            this.$router.push({path: '/productList'})
        }
    },
}
</script>