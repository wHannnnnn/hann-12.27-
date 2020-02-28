<template>
    <div class="categoryList productList">
        <van-nav-bar title="新品首发" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
        </van-nav-bar>
        <div class="content">
            <van-tabs v-model="active" swipeable>
                <van-tab v-for="index in 4" :title="'选项 ' + index">
                    内容 {{ index }}
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        goBack(){
            
        }
    },
}
</script>