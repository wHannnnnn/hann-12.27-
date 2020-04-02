<template>
  <div class="hot_shop">
    <div class="hotTitle">
      热门商品
    </div>
    <div style="display: flex;overflow: auto">
    <div class="shop_list" v-for="item in hotShop" :key='item.id'>
        <router-link :to="{path:'/detailsIndex',query:{id:item.id}}">
            <div class="shop_img">
                <img v-lazy="item.pic"/>
            </div>
            <div class="shop_title van-multi-ellipsis--l2">
                {{item.name}}
            </div>
            <div class="price">            
                <div class='newPrice'>
                    <span>￥</span>{{item.minPrice}}
                </div>
                <div class="oldPrice">
                    ￥{{item.originalPrice}}
                </div>
            </div>
        </router-link>
    </div>
    <div class="more" v-show="hotShop.length !== 0">
        <span>  
        查看更多
        </span>
        <van-icon name="arrow-down" />
    </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['hotShop']
}
</script>

