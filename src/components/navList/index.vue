<template>
    <div class="navIndex">
        <div class="nav_search">
            <navTop/>
        </div>
        <div class="nav_left mui-scroll-wrapper">
            <div class="mui-scroll">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell" v-for="(item,index) in navList" :key="index" @click="navClick(item,index)">
                        <router-link tag="div" :to="'navIndex?id=' + item.id"><div :class="isActive == index?'active' : ''">{{item.value}}</div></router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="nav_right mui-scroll-wrapper">
            <div class="mui-scroll">
                <div class="right_top">
                    <img v-lazy="rightList.listImg" alt="">
                </div>
                <div class="right_con" v-for="item in rightList.listCon">
                    <div class="right_top_title">{{item.value}}</div>
                    <ul>
                        <li v-for="item1 in item.children">
                            <div class="rightImg">
                                <img v-lazy="item1.imgsrc" alt="">
                            </div>
                            <div class="rightTitle">{{item1.value}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import navTop from './navTop'
import Vue from 'vue'
export default {
    components:{
        navTop
    },
    data() {
        return {
            navList:[
                {
                    id:0,
                    value: '全球特色',
                    active: true
                },
                {
                    id:1,
                    value: '推荐专区',
                    active: false
                },
                {
                    id:2,
                    value: '爆品专区'
                },
                {
                    id:3,
                    value: '美食酒水'
                },
                {
                    id:4,
                    value: '个护清洁'
                },
                {
                    id:5,
                    value: '母婴亲子'
                },

                {
                    id:8,
                    value: '美食酒水'
                },
                {
                    id:9,
                    value: '推荐专区'
                },
                {
                    id:10,
                    value: '全球特色'
                },
                {
                    id:11,
                    value: '运动旅行'
                },
                {
                    id:12,
                    value: '全球特色'
                },
                {
                    id:13,
                    value: '数码家电'
                },
            ],
            rightList:
            {
                listCon:[
                    {
                        id: 0,
                        value: '精选美食',
                        children: [
                            {
                                value: '新春好礼',
                                imgsrc: require('../../assets/images/right1.jpg'),
                            },
                            {
                                value: '新品首发',
                                imgsrc: require('../../assets/images/right2.jpg'),
                            },
        
                        ]
                    },
                    {
                        id: 0,
                        value: '休闲零食',
                        children: [
                            {
                                value: '饼干糕点',
                                imgsrc: require('../../assets/images/right3.png'),
                            },
                            {
                                value: '小食糖巧',
                                imgsrc: require('../../assets/images/right4.png'),
                            },
                            {
                                value: '肉类零食',
                                imgsrc: require('../../assets/images/right5.png'),
                            }
                        ]
                    },
                    {
                        id: 0,
                        value: '冲饮茗茶',
                        children: [
                            {
                                value: '冲调饮品',
                                imgsrc: require('../../assets/images/right6.png'),
                            },
                            {
                                value: '传统茗茶',
                                imgsrc: require('../../assets/images/right7.jpg'),
                            },
                            {
                                value: '茗茶礼盒',
                                imgsrc: require('../../assets/images/right8.png'),
                            },
                            {
                                value: '茶包花茶',
                                imgsrc: require('../../assets/images/right9.jpg'),
                            }
                        ]
                    },
                ],
                listImg: require('../../assets/images/rightTop1.jpg'),
            },
            isActive: 0
        }
    },
    methods: {
        navClick(item,index){
            this.isActive = index
        }
    },
    mounted() {
        this.$route.query.id ? this.isActive = this.$route.query.id : 0
        this.mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005,
            indicators: false,
        })
    },
}
</script>