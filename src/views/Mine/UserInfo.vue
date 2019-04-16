
<template>
  <div class="user-info">
    <x-header
      title="个人信息"
      :left-options="{backText: ''}"
    />
    <group>
      <cell title="用户名" :value="userInfo.email"></cell>
      <cell title="昵称" :value="userInfo.username"></cell>
      <cell title="性别" :value="userInfo.sex === '' ? '无' : userInfo.sex "></cell>
    </group>
    <group label-width="112px">
      <cell title="个行签名" :value="userInfo.desc === '' ? '无' : userInfo.desc "></cell>
      <!-- <cell title="经营地址" :value="userInfo.address"></cell> -->
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell } from 'vux'
export default {
  name: 'UserInfo',
  data () {
    return {
      userInfo: {
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
    Group
  },
  created () {
    this.queryDetail()
  },
  methods: {
    queryDetail () {
      let userInfoObj = JSON.parse(sessionStorage.getItem('userInfo'))
      this.userInfo.username = userInfoObj.username
      this.userInfo.desc = userInfoObj.desc
      this.userInfo.sex = userInfoObj.sex
      this.userInfo.email = userInfoObj.email
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
