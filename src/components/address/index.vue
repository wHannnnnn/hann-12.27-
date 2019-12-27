<template>
    <div class="address">
        <van-nav-bar title="我的地址" fixed>
            <van-icon name="arrow-left" slot="left" />
        </van-nav-bar>
        <div class="content">
            <van-cell>
                <template slot="title">
                    <div class="addressList">
                        <div class="top">
                            <van-row>
                                <van-col span="6" class="userName van-ellipsis">wanghan</van-col>
                                <van-col span="6" offset="2" class="phone">13621087975</van-col>
                                <van-tag type="danger">默认</van-tag>
                            </van-row>
                        </div>
                        <div class="bottom">
                            <van-row>
                                <van-col span="21" class="van-multi-ellipsis--l2 addressDetail">加上大家暗红色的氨基酸电话卡技术的话爱看书记得哈科技时代开始</van-col>
                                <van-col offset="1" span="2" class="edit"><van-icon name="edit" /></van-col>
                            </van-row>
                        </div>
                    </div>
                </template>
            </van-cell>
        </div>
        <div class="addAdress">
            <van-button type="default" @click='addAdress'>添加地址</van-button>
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
        onAdd() {
            console.log('新增地址');
        },
        onEdit(item, index) {
            console.log('编辑地址:' + index);
        },
        addAdress(){
            this.$router.push({path: '/editAddress'})
        }
    },
}
</script>