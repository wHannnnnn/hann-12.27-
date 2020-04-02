<template>
  <div>
    <div class="app_top">
      <van-nav-bar fixed>
          <div class="search" slot="left">
              <div class="search_con" @click="goProduct">请输入内容</div>
          </div>
          <van-icon name="search" slot="right"/>
      </van-nav-bar>
    </div>
      <van-skeleton
        class="shopske"
        :row="6"
        row-width = []
        :loading="skeLoading"
      >
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad"
            >
              <div class="app_banner">
                <banner :bannerList='bannerList'/>
              </div>
              <div class="app_nav">
                <navList :navList='navList' />
              </div>
              <div class="app_discount">
                <discount :discount='discountsList' />
              </div>
              <div class="app_hotshop">
                <hotShop :hotShop='hotShopList' />
              </div>
              <div class="app_con">
                  <contop :partnerList="partnerList" />
              </div>
              <div class="app_shopList">
                  <hotlist :shopList='shopList'/>
              </div>
            </van-list>
        </van-pull-refresh>
      </van-skeleton>
  </div>
</template>
<script>
import banner from '@/components/home/banner.vue'
import navList from '@/components/home/nav.vue'
import discount from '@/components/home/discount.vue'
import contop from '@/components/home/contop.vue'
import hotlist from '@/components/home/hotList.vue'
import hotShop from '@/components/home/hotShop.vue'
export default {
  name: 'homeIndex',
  components: {
    banner,navList,contop,hotlist,discount,hotShop
  },
  data() {
    return {
      skeLoading: true,
      isLoading: false,
      loading: false,
      error: false,
      pageSize: 10,
      dataList: [],
      bannerList: [],
      navList: [], //导航
      partnerList: [], //新品
      finished: false,
      homePageNum: 1,
      shopList: [],
      discountsList: [],
      hotShopList: [],
      first: true
    }
  },
  computed: {
  },
  methods: {
    // 获取mutations中的方法操作数据
    // 下拉刷新
    onRefresh(){
      this.loadfirst()
    },
    loadfirst(){
      this.finished = false;
      this.isLoading = false;
      this.$toast.loading({ duration: 0,forbidClick: true });
      this.getBanner()
      this.categoryList()
      this.getDiscountsList()
      this.getHotList()
      this.shopList = []
      this.homePageNum = 1
      // this.loadmore()
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
              this.shopList = this.shopList.concat(res.data.data)
              this.homePageNum ++
              this.loading = false
              if(res.data.data.length < this.pageSize){
                this.finished = true
              }
            }else{
              this.finished = true
            }
        }).catch(() => {
          this.error = true;
      })
    },
    getBanner(){
      this.$http.banner().then((res)=>{
        if(res.data.code == 0) {
          this.bannerList = res.data.data
        }
      })
    },
    // 获取分类
    categoryList(){
      this.$http.category().then((res)=>{
        this.navList = res.data.data
        this.skeLoading = false
        this.$toast.clear()
      })
    },
    // 获取优惠券
    getDiscountsList() {
      this.$http.discountsList().then((res) => {
        if(res.data.code == 0){
          this.discountsList = res.data.data
        }
      })
    },
    // 获取首页图片
    getPartner() {
      this.$http.partner().then((res) => {
        if(res.data.code == 0){
          this.partnerList = res.data.data
        }
      })
    },
    // 获取热门商品
    getHotList(){
      var params = {
        page: 1,
        pageSize: 10,
        orderBy: 'ordersDown'
      }
      this.$http.shopList(params).then((res) => {
        if (res.data.code == 0) {
            this.hotShopList = res.data.data
        }
      })
    },
    goProduct(){
        this.$router.push({path: '/productList'})
    }
  },
  created() {
      if (this.first == true) {
        this.$toast.loading({ duration: 0,forbidClick: true });
        this.getBanner()
        this.getPartner()
        this.categoryList()
        this.getDiscountsList()
        this.getHotList()
        this.first = false
      }
    },
  mounted() {
    },
  activated() {
  },
  beforeRouteLeave(to, from, next) {
      this.$store.commit('updateClildrenAliveList', { name: 'homeIndex', status: true });
      setTimeout(() => {
          next();
      }, 0)
  },
};
</script>
