<template>
    <div class="user_modify">
      <van-nav-bar title="编辑资料" fixed>
          <van-icon name="arrow-left" slot="left" @click='goBack'/>
      </van-nav-bar>
      <div class="content">
          <div class="avatar">
                <!-- <van-uploader> -->
                    <!-- <span>上传图片</span> -->
                    <img :src="userData.avatarUrl?userData.avatarUrl:noAvaImg" alt="" @click="showPopup">
                    <van-popup position="bottom" v-model="show">
                        <van-uploader :after-read="afterRead">
                            <div class="uploadAva">上传头像</div>
                        </van-uploader>
                    </van-popup>
                <!-- </van-uploader> -->
          </div>
          <div class="name">
              <van-field v-model="userData.nick" label="昵称" />
          </div>
          <div class="name">
              <van-field v-model="myaddress" @click="getAddress" readonly label="所在地址" />
          </div>
          <div class="address">
                <van-action-sheet v-model="addressShow" title="标题">
                    <van-area
                        :columns-num="2"
                        :area-list="areaList"
                        @confirm="confirm"
                        @cancel="cancel"
                        :columns-placeholder="['请选择', '请选择', '请选择']"
                        title="标题"
                    />
                </van-action-sheet>
          </div>
          <van-goods-action>
            <van-goods-action-button @click='goBack' text="取消" />
            <van-goods-action-button type="danger" @click="updateUser" text="保存" />
        </van-goods-action>
      </div>
    </div>
</template>
<script>
import areaList from '@/assets/js/area.js'
import {mapState, mapMutations} from 'vuex'
export default {
    data() {
        return {
            userData: {},
            areaList: {},
            noAvaImg: require('../../assets/images/avatar.png'),
            show: false,
            username: 'asd',
            addressShow: false,
            updateCount:0, //判断用户是否更新当前数据
            clickBut: false
        }
    },
    computed: {
        myaddress(){
            return this.userData.province?this.userData.province + '/' + this.userData.city : '选择地址'
        }
    },
    methods: {
        ...mapMutations(['handleLoginUser']),
        goBack(){
            this.$router.go(-1)
        },
        // 信息
        userDetail(){
            this.$http.userDetail().then((res)=>{
                console.log(res)
                this.userData = res.data.data.base
            })
        },
        showPopup() {
            this.show = true;
        },
        // 上传头像
        afterRead(file){
            let formData = new FormData()
            formData.append('upfile',file.file);
            this.$http.uploadFile(formData).then((res)=>{
                this.userData.avatarUrl = res.data.data.url
                this.show = false
            })
        },
        getAddress(){
            this.addressShow = true
        },
        confirm(arr){
            this.userData.province = arr[0].name
            this.userData.city = arr[1].name
            this.addressShow = false
        },
        cancel(){
            this.addressShow = false
        },
        // 修改信息
        updateUser(){
            this.clickBut = true
            this.$toast.loading({ duration: 0,forbidClick: true });
            var params = {
                avatarUrl: this.userData.avatarUrl,
                nick: this.userData.nick,
                province: this.userData.province,
                city: this.userData.city
            }
            this.$http.userModify(params).then((res)=>{
                if(res.data.code == 0) {
                    this.$toast.clear()
                    this.$notify({ type: 'success', message: '修改成功' });
                } else {
                    this.$toast(res.data.msg)
                }
            }).then(()=>{
                this.$http.userDetail().then((res)=>{
                    this.handleLoginUser(res.data.data.base)
                    this.$router.go(-1)
                    this.clickBut == false
                })
            })
        }
    },
    created() {
        this.userDetail()
        this.areaList = areaList
    },
    mounted() {
    },
    updated:function () {
      this.updateCount = this.updateCount + 1
    },
    beforeRouteLeave (to, from, next) {
        if(this.updateCount > 1 && this.clickBut == false) {
            this.$dialog.confirm({
                message: '即将离开当前页，请确定是否保存当前数据？',
                cancelButtonText: '不保存'
            }).then(() => {
                this.updateUser()
                next()
            }).catch(() => {
                next()
            });
        } else {
            next()
        }
    }
}
</script>