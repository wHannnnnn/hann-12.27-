<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <div class="app_bottom">
            <bottom/>
        </div>
    </div>
</template>
<script>
import bottom from '@/components/layout/bottom.vue'
export default {
    name: 'index',
    components: {
        bottom
    },
    methods: {
        handleScroll(e){ 
            this.$route.meta.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        },
    },
    mounted() {
        if(this.$route.meta.keepAlive == true){
            window.addEventListener('scroll',this.handleScroll,true)
        } 
    },
}
</script>