<template>
  <div>
    <div class="app_top">
      <van-nav-bar fixed>
          <div class="search" slot="left">
              <div class="search_con">请输入内容</div>
          </div>
          <van-icon name="search" slot="right"/>
      </van-nav-bar>
    </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="this.$store.state.finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad"
            >
              <div class="app_banner">
                <banner/>
              </div>
              <div class="app_nav">
                <navList/>
              </div>
              <div class="app_con">
                  <contop/>
              </div>
              <div class="app_shopList">
                  <hotlist/>
              </div>
            </van-list>
        </van-pull-refresh>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import banner from '@/components/home/banner.vue'
import navList from '@/components/home/nav.vue'
import contop from '@/components/home/contop.vue'
import hotlist from '@/components/home/hotList.vue'
export default {
  name: 'homeIndex',
  components: {
    banner,navList,contop,hotlist
  },
  data() {
    return {
      isLoading: false,
      loading: false,
      error: false,
      pageSize: 5,
      dataList: []
    }
  },
  computed: {
      ...mapState(['homePageNum']) 
  },
  methods: {
    // 获取mutations中的方法操作数据
    ...mapMutations(['getShopList','removeShopList']),
    // 下拉刷新
    onRefresh(){
      this.loadfirst()
    },
    loadfirst(){
      // this.$store.state.homePageNum = 1
      this.$store.state.finished = false;
      this.isLoading = false;
      this.removeShopList()
      this.loadmore()
    },
    // 上啦加载
    onLoad(){
      this.loadmore()
    },
    async loadmore(){
        var params = {
          page: this.homePageNum,
          pageSize: this.pageSize
        }
        this.$http.shopList(params).then((res)=>{
            if(res.data.code == 0){
              // this.$store.state.homePageNum ++
              this.getShopList(res.data.data)
              this.loading = false
              if(res.data.data.length < this.pageSize){
                this.$store.state.finished = true
              }
          }else{
            this.$store.state.finished = true
          }
        }).catch(() => {
          this.error = true;
      })
    },
  },
  created() {
  },
  mounted() {
      console.log('asd')
      this.mui(".mui-scroll-wrapper").scroll({
          deceleration: 0.0005,
          indicators: false,
      })
  },
	activated(){
  },
  deactivated(){
	},
};
</script>
