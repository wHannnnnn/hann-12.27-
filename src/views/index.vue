<template>
    <div>
        <keep-alive :include="childrenAlive">
            <router-view></router-view>
        </keep-alive>
        <div class="app_bottom">
            <bottom/>
        </div>
    </div>
</template>
<script>
import bottom from '@/components/layout/bottom.vue'
import { mapState } from 'vuex'
export default {
    name: 'index',
    components: {
        bottom
    },
    computed: {
      ...mapState(['childrenAlive'])
    },
    methods: {
        // handleScroll(e){ 
        //     this.$route.meta.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // },
    },
    mounted() {
        // if(this.$route.meta.keepAlive == true){
        //     window.addEventListener('scroll',this.handleScroll,true)
        // } 
    },
}
</script>