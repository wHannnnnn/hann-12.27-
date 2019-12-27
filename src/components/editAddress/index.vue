<template>
    <div class="editAddress">
        <van-nav-bar title="添加地址" fixed>
            <van-icon name="arrow-left" slot="left" />
        </van-nav-bar>
        <div class="content">
            <van-address-edit
                :area-list="areaList"
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
                @change-area="changeArea"
            />
        </div>
    </div>
</template>
<script>
import areaList from '@/assets/js/area.js'
export default {
    data() {
        return {
            areaList: {},
            searchResult: [] //详细地址
        }
    },
    methods: {
        onSave(val) {
            console.log(val)
        },
        onDelete() {
            this.$toast('delete');
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [{
                    name: '黄龙万科中心',
                    address: '杭州市西湖区'
                }];
            } else {
                this.searchResult = [];
            }
        },
        changeArea(val){
            console.log(val)
        }
    },
    mounted() {
        this.areaList = areaList
    },
}
</script>