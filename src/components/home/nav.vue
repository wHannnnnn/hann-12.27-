<template>
<!-- <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
	<div class="mui-scroll">
        <ul class="navUl">
            <li>
                <img :src="img1" alt="">
                <div>推荐</div>
            </li>
            <li>
                <img :src="img2" alt="">
                <div>居家生活</div>
            </li>
            <li>
                <img :src="img3" alt="">
                <div>服饰鞋包</div>
            </li>
            <li>
                <img :src="img1" alt="">
                <div>推荐</div>
            </li>
            <li>
                <img :src="img2" alt="">
                <div>居家生活</div>
            </li>
            <li>
                <img :src="img3" alt="">
                <div>服饰鞋包</div>
            </li>
        </ul>
    </div>
</div> -->
<van-swipe :loop='false' indicator-color="white">
  <van-swipe-item>
        <van-grid :border="false" :column-num="5">
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img3" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img3" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
        </van-grid>
  </van-swipe-item>
  <van-swipe-item>
        <van-grid :border="false" :column-num="5">
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img3" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img3" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img1" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
            <van-grid-item>
                <van-image :src="img2" />
                <div class="value">文字</div>
            </van-grid-item>
        </van-grid>
  </van-swipe-item>
</van-swipe>
</template>
<script>
export default {
    data() {
        return {
            img1: require('../../assets/images/nav1.png'),
            img2: require('../../assets/images/nav2.png'),
            img3: require('../../assets/images/nav3.png'),
        }
    },
    mounted() {
    },
}
</script>
<style lang="scss">

</style>