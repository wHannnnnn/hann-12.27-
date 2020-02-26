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
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="请求失败，点击重新加载"
              @load="onLoad"
            >
              <div class="app_banner">
                <banner/>
              </div>
              <div class="app_nav">
                <navList :navList='navList' />
              </div>
              <div class="app_con">
                  <contop :newShopList="newShopList" />
              </div>
              <div class="app_shopList">
                  <hotlist :shopList='shopList'/>
              </div>
            </van-list>
        </van-pull-refresh>
  </div>
</template>
<script>
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
      pageSize: 2,
      dataList: [],
      navList: [], //导航
      newShopList: [], //新品
      finished: false,
      homePageNum: 1,
      shopList: [],
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
      this.categoryList()
      this.newShop()
      this.shopList = []
      this.homePageNum = 1
    },
    // 上啦加载
    onLoad(){
      this.loadmore()
    },
    async loadmore(){
        var params = {
          page: this.homePageNum,
          pageSize: this.pageSize,
          recommendStatus: 1
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
    // 获取分类
    categoryList(){
      this.$http.category().then((res)=>{
        this.navList = res.data.data
      })
    },
    // 新品首发
    newShop(){
        var params = {
          page: 1,
          pageSize: 6,
          orderBy: 'addedDown',
        }
        this.$http.shopList(params).then((res)=>{
          this.newShopList = res.data.data
        })
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    if (this.first == true) {
      this.categoryList()
      this.newShop()
      this.first = false
    }
  },
};
</script>
