<template>
    <div class="app_top">
        <van-nav-bar>
            <div class="search" slot="right">
                    <div class="search_con">请输入内容</div>
                    <van-icon name="search"/>
            </div>
        </van-nav-bar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            value: ''
        }
    },
}
</script>