<template>
    <div class="editAddress">
        <van-nav-bar title="添加地址" fixed>
            <van-icon name="arrow-left" slot="left" @click="goBack"/>
            <div slot="right" @click='delAddress' v-if="this.$route.query.id">删除</div>
        </van-nav-bar>
        <div class="content">
            <van-address-edit
                :address-info="addressInfo"
                :area-list="areaList"
                show-set-default
                show-search-result
                :search-result="searchResult"
                :detail-maxlength=50
                :area-columns-placeholder="['请选择', '请选择', '请选择']"
                @save="onSave"
                @change-area="changeArea"
                ref="address"
            />
        </div>
    </div>
</template>
<script>
import areaList from '@/assets/js/area.js'
export default {
    data() {
        return {
            addressInfo: {},//默认数据
            areaList: {},
            searchResult: [], //详细地址
            provinceId: null,
            cityId: null,
            districtId: null,
            checked: true
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        onSave(val) {
            var params = {
                linkMan: val.name,
                mobile: val.tel,
                provinceId: this.provinceId,
                cityId: this.cityId,
                districtId: this.districtId,
                address: val.addressDetail,
                isDefault: val.isDefault
            }
            if(this.$route.query.id) {  
                // 修改
                this.$http.updateAddress(Object.assign(params,{id: this.$route.query.id})).then((res)=>{
                    if(res.data.code == 0){
                        this.$notify({ type: 'success', message: '添加成功' });
                        this.$router.go(-1)
                    } else {
                         this.$notify({ type: 'danger', message: res.data.msg });
                    }
                })
            } else {
                // 添加
                this.$http.addAddress(params).then((res)=>{
                    if(res.data.code == 0){
                        this.$notify({ type: 'success', message: '添加成功' });
                        this.$router.go(-1)
                    } else {
                         this.$notify({ type: 'danger', message: res.data.msg });
                    }
                })
            }
        },
        delAddress() {
            this.$dialog.confirm({
                message: '是否删除改地址'
            }).then(() => {
                this.$http.delAddress({id: this.$route.query.id}).then((res)=>{
                    if(res.data.code == 0){
                        this.$notify({ type: 'success', message: '删除成功' });
                        this.$router.go(-1)
                    } else {
                        this.$notify({ type: 'danger', message: res.data.msg });
                    }
                })
            }).catch(() => {
                console.log('不删除')
            });
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
            this.provinceId = val[0].code
            this.cityId = val[1].code
            this.districtId = val[2].code
        },
        // 地址详情
        getAddressDetail(){
            this.$http.addressDetail({id: this.$route.query.id}).then((res)=>{
                if(res.data.code == 0) {
                    this.addressInfo = {
                        name: res.data.data.info.linkMan,
                        tel: res.data.data.info.mobile,
                        province: res.data.data.info.provinceStr,
                        city: res.data.data.info.cityStr,
                        county: res.data.data.info.areaStr,
                        addressDetail: res.data.data.info.address,
                        areaCode: res.data.data.info.districtId,
                        isDefault: res.data.data.info.isDefault,
                    }
                    this.provinceId = res.data.data.info.provinceId
                    this.cityId = res.data.data.info.cityId
                    this.districtId = res.data.data.info.districtId       
                }
            })
        }
    },
    created(){
        if(this.$route.query.id) {
            this.getAddressDetail()
        }
    },
    mounted() {
        this.areaList = areaList
    },
}
</script>