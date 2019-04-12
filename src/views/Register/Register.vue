<template>
   <div class="register">
     <x-header
      title="用户注册"
      :left-options="{backText: ''}"
    />
    <div class="form">
      <div class="avatar">
        <div class="imgWrap">
          <van-uploader :after-read="onRead">
            <img src="../../../static/image/photograph.png" ref="upImg" alt="">
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
          用户名:
        </div>
        <div class="item-input">
          <input type="text" v-model="form.email" placeholder="请输入用户名">
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          密码:
        </div>
        <div class="item-input">
          <input type="password" v-model="form.password" placeholder="请输入密码">
        </div>
      </div>
      <div class="item">
        <div class="item-label">
          确认密码:
        </div>
        <div class="item-input">
          <input type="password" v-model="form.passagain" placeholder="请再次输入密码">
        </div>
      </div>
      <div class="submit-con1">
        <div class="submit-con" @click="confirm()">提交</div>
      </div>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
import ChangePwdAjax from '@/api/changePwd/changePwd'
import { XHeader } from 'vux'
import { Field, CellGroup, Uploader } from 'vant'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        avatar: '',
        username: '',
        email: '',
        password: '',
        passagain: ''
      }
    }
  },
  components: {
    XHeader,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Uploader.name]: Uploader
  },
  methods: {
    onRead (file) {
      this.$refs.upImg.src = file.content
      console.log(file)
      this.avatar = file.content
    },
    confirm () {
      if (this.form.password === '') {
        this.$vux.toast.show({
          type: 'warn',
          text: '密码不能为空'
        })
      } else if (this.form.password.length < 6 || this.form.password.length > 16) {
        this.$vux.toast.show({
          type: 'warn',
          text: '新密码长度在6到16个字符'
        })
      } else if (this.form.newPass === this.form.oldPass) {
        this.$vux.toast.show({
          type: 'warn',
          text: '新密码不能与初始化密码相同'
        })
      } else {
        let userInfoObj = JSON.parse(sessionStorage.getItem('userInfo'))
        this.firstLogin = userInfoObj.firstLogin
        if (this.firstLogin === 0) {
          ChangePwdAjax.ChangePwd(this.form).then(res => {
            if (res.code === 200) {
              this.$vux.toast.show({
                type: 'success',
                text: '修改成功'
              })
              setTimeout(() => {
                this.$router.push({name: 'Index'})
              }, 500)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.register {
  // margin-top: 130px;
  width: 100%;
  height: 100vh;
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
.register{
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
