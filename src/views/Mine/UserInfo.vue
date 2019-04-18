
<template>
  <div class="user-info">
    <x-header
      title="个人信息"
      :left-options="{backText: ''}"
    >
    <div @click="editUserInfo(userInfo)" class="choose-btn" slot="right">修改</div>
    </x-header>
    <div class="avatar">
      <div class="imgWrap">
        <div class="van-uploader">
          <img :src="userInfoObj.avatar" ref="upImg" alt="">
        </div>
        <!-- <van-uploader :after-read="onRead">
          <img :src="userInfo.avatar" ref="upImg" alt="">
        </van-uploader> -->
      </div>
    </div>
    <group>
      <cell title="用户名" :value="userInfoObj.email"></cell>
      <cell title="昵称" :value="userInfoObj.username"></cell>
      <cell title="性别" :value="userInfoObj.sex === '' ? '无' : userInfo.sex "></cell>
    </group>
    <group label-width="112px">
      <cell title="个性签名" :value="userInfoObj.desc === '' ? '无' : userInfo.desc "></cell>
      <!-- <cell title="经营地址" :value="userInfo.address"></cell> -->
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from 'vux'
import {mapState} from 'vuex'
import { Field, CellGroup, Uploader } from 'vant'
export default {
  name: 'UserInfo',
  data () {
    return {
      userInfoObj: {
        avatar: '', // 头像
        desc: '', // 个行签名
        email: '', // 账号
        sex: '', // 性别
        username: '' // 昵称
      }
    }
  },
  components: {
    XHeader,
    Cell,
    Group,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader
  },
  created () {
    this.queryDetail()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    onRead (file) {
      this.$refs.upImg.src = file.content
      console.log(file)
      this.userInfo.avatar = file.content
    },
    editUserInfo (val) {
      // this.$router.push({name: 'UpdateUserInfo', data: val})
      this.$router.push({name: 'UpdateUserInfo', query: {data: val}})
    },
    queryDetail () {
      this.userInfoObj.username = this.userInfo.username
      this.userInfoObj.desc = this.userInfo.desc
      this.userInfoObj.sex = this.userInfo.sex
      this.userInfoObj.email = this.userInfo.email
      this.userInfoObj.avatar = this.userInfo.avatar
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.user-info{
  display: flex;
  flex: 1;
  background: #F3F4F5;
  flex-direction: column;
  .vux-header{
    height: 90px;
    display: flex;
    align-items: center;
    .vux-header-left{
      top: 20px;
      .left-arrow{
        margin-left: 20px;
      }
      .left-arrow:before{
        top: 18px;
        width: 20px;
        height: 20px;
        border-color: #1C1C1C;
      }
    }
    .vux-header-title{
      margin: 0 auto;
      span{
        .mixin-sc(36px;#1A1A1A);
      }
    }
    .vux-header-right{
      top: 0px!important;
      .choose-btn{
        width: 90px;
        height: 90px;
        line-height: 90px;
        text-align: center;
        .mixin-sc(30px;@color-extrude);
      }
    }
  }
  .weui-cells {
    margin-top: 0;
    // margin-bottom: 20px;
  }
  .weui-cell{
    height: 108px;
    padding: 0 40px;
    label{
      .mixin-sc(32px;#676767);
    }
    .weui-cell__ft{
      .mixin-sc(30px;#000);
    }
  }
  .avatar {
    width: 100%;
    height: 300px;
    display: flex;
    background: #fff;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .imgWrap {
      width: 200px;
      height: 200px;
      .van-uploader {
        width: 200px;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .van-uploader__input {
          width: 100%;
          height: 100%;
        }
        .van-icon {
          font-size: 50px;
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.user-info{
  height: 100%;
  width: 100%;
}
</style>
