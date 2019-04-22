<template>
   <div class="updateUserInfo">
     <x-header
      title="修改信息"
      :left-options="{backText: ''}"
    >
    <!-- <div @click="choose" class="choose-btn" slot="right">修改</div> -->
    </x-header>
    <div class="form">
      <div class="avatar">
        <div class="imgWrap">
          <van-uploader :after-read="onRead">
            <img :src="form.avatar" ref="upImg" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          昵称:
        </div>
        <div class="item-input">
          <input type="text" v-model="form.username" placeholder="请输入昵称">
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          性别:
        </div>
        <div class="item-input">
          <input type="text" v-model="form.sex" placeholder="请输入性别">
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          个性签名:
        </div>
        <div class="item-input">
          <input type="text" v-model="form.desc" placeholder="请输入个性签名">
        </div>
      </div>
      <div class="submit-con1">
        <div class="submit-con" @click="confirm()">提交</div>
      </div>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import {mapState} from 'vuex'
import { Field, CellGroup, Uploader } from 'vant'
export default {
  name: 'Register',
  data () {
    return {
      // userInfo: {},
      form: {
        avatar: '',
        username: '',
        sex: '',
        desc: '',
        email: ''
      }
    }
  },
  components: {
    XHeader,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader
  },
  created () {
    // let user
    // user = this.$route.query.data
    this.form.username = this.userInfo.username
    this.form.desc = this.userInfo.desc
    this.form.sex = this.userInfo.sex
    this.form.avatar = this.userInfo.avatar
    this.form.email = this.userInfo.email
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    init () {},
    onRead (file) {
      this.$refs.upImg.src = file.content
      console.log(file)
      this.form.avatar = file.content
    },
    getUserInfo () {
    },
    confirm () {
      if (this.form.username === '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '昵称不能为空'
        })
      } else {
        this.$axios.post('/editUser', this.form).then(res => {
          if (res.code === 200) {
            this.$vux.toast.show({
              type: 'success',
              text: res.msg
            })
            this.$store.commit('CHANGE_userInfo', res.userData)
            setTimeout(() => {
              this.$router.push({name: 'UserInfo'})
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.updateUserInfo {
  // margin-top: 130px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex: 1;
  // background: #F3F4F5;
  flex-direction: column;
  .form {
    width: 100%;
    height: 100%;
    padding: 0 40px;
  }
  .avatar {
    width: 100%;
    height: 300px;
    display: flex;
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
  .item {
    height: 100px;
    width: 100%;
    display: flex;
    margin-top: 20px;
    .item-label {
      height: 80px;
      line-height: 80px;
      text-align: right;
      width: 180px;
      font-size: 30px;
      margin-right: 40px;
    }
    .item-input {
      height: 100%;
      width: 100%;
      input{
        // width: 600px;
        width: 100%;
        height: 80px;
        outline: none;
        border: none;
        font-size: 28px;
        margin: 0;
        padding: 0;
        // text-indent: 60px;
        font-size: 28px;
        border-bottom: 1px solid rgba(229,229,229,1);
      }
    }
  }
  .submit-con{
    width: 668px;
    height: 88px;
    background: #fff;
    margin: 200px auto 0px;
    background: #4d64fd;
    color: #fff;
    border-radius: 44px;
    line-height: 88px;
    text-align: center;
    font-size: 32px;
  }
  .submit-con1{
    flex: 1;
    background: #fff;
  }
}
</style>
<style lang="less" scope>
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.updateUserInfo{
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
        // background: url('../../../image/guolv.png') no-repeat center center;
        // background-size: 45% 45%;
        .mixin-sc(30px;@color-extrude);
      }
    }
  }
  .van-cell-group {
    width: 100%;
    height: auto;
    margin-top: 50px;
    .van-cell {
      width: 100%;
      height: 80px;
    }
  }
}
</style>
