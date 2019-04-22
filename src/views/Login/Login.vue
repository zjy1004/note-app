
<template>
  <div class="login">
    <div class="bg-con"></div>
    <div class="form-con">
      <div class="account-con">
        <input type="text" @input="inputUserName" v-model="form.email" placeholder="请输入用户名">
        <div class="account-icon"></div>
      </div>
      <div class="pass-con">
        <input type="password" v-model="form.password" placeholder="请输入密码">
        <div class="password-icon"></div>
      </div>
    </div>
    <div class="submit-con1">
      <div class="submit-con" @click="handleLogin()">登录</div>
      <div class="agreeTerms" @click="register">未注册&nbsp;<span>去注册</span></div>
    </div>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import {mapState} from 'vuex'
// import LoginAjax from '@/api/Login/Login'
// import MyCenterAjax from '@/api/MyCenter/MyCenter'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      showPositionValue: false
    }
  },
  components: {
    Group,
    XInput,
    XButton
  },
  created () {
    if (this.getCookie('user') && this.getCookie('pswd')) {
      this.form.account = this.getCookie('user')
      this.form.password = this.base64decode(this.getCookie('pswd'))
      this.form.remeberPass = true
    }
    this.getPhoneInfo()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    handleLogin () {
      this.$axios.post('/login', this.form).then(res => {
        if (res.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: '登录成功'
          })
          this.$store.commit('CHANGE_userInfo', res.userData)
          sessionStorage.setItem('userInfo', JSON.stringify(res.userData))
          this.$router.push({name: 'Index'})
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: res.msg
          })
        }
      })
    },
    inputUserName () {
      this.form.password = ''
    },
    remeberChange (val) {
      if (!val) {
        this.delCookie('user')
        this.delCookie('pswd')
      }
    },
    register () {
      this.$router.push({name: 'Register'})
    },
    isCompatibilityPhone (navigator) {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getPhoneInfo () {
      let app = navigator.appVersion
      // 根据括号进行分割
      let left = app.indexOf('(')
      let right = app.indexOf(')')
      let str = app.substring(left + 1, right)
      // console.log(str+'裁剪过后的')
      let Str = str.split(';')
      // 手机型号--苹果 iPhone
      let mobileIphone = Str[0]
      // 手机型号--安卓
      let mobileAndroid = Str[2]
      // 红米手机等特殊型号处理 匹配字符
      let res = /Android/
      let reslut = res.test(mobileAndroid)
      // 根据设备型号判断设备系统
      if (mobileIphone === 'iPhone') {
        let isX = this.isCompatibilityPhone(navigator)
        console.log(isX)
        console.log('访问设备型号' + mobileIphone + '系统版本' + Str[1].substring(4, 19))
      } else if (mobileAndroid === 'Linux') {
        if (reslut) {
          console.log('访问设备型号' + Str[4].substring(0, 9) + '系统版本' + Str[2])
        } else {
          console.log('访问设备型号' + mobileAndroid.substring(0, 9) + '系统版本' + Str[1])
        }
      } else if (mobileIphone === 'iPad') {
        console.log('访问设备' + Str[0] + '系统版本' + Str[1].substring(4, 12))
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.login{
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  background: #fff;
  .bg-con{
    width: 750px;
    height: 470px;
    background: url('../../../static/image/login6.jpg') no-repeat;
    background-size:  100% 100%;
  }
  .form-con{
    margin-top: 30px;
    width: 720px;
    height: 360px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    .account-con,.pass-con{
      position: relative;
      height: 80px;
      width: 600px;
    }
    .account-con{
      margin-bottom: 30px;
    }
    .account-icon,.password-icon{
      width: 32px;
      height: 40px;
      position: absolute;
      left: 0px;
      top: 20px;
    }
    .account-icon{
      background: url('../../image/account-icon.png') no-repeat;
      background-size:  100% 100%;
    }
    .password-icon{
      background: url('../../image/password-icon.png') no-repeat;
      background-size:  100% 100%;
    }
    input{
      width: 600px;
      height: 80px;
      line-height: 80px;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      text-indent: 60px;
      font-size: 28px;
      border-bottom: 1px solid rgba(229,229,229,1);
    }
  }
  .submit-con1{
    flex: 1;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .submit-con{
      width: 668px;
      height: 80px;
      background: #fff;
      margin: 70px auto 50px;
      background: #4d64fd;
      color: #fff;
      border-radius: 44px;
      line-height: 88px;
      text-align: center;
      font-size: 32px;
    }
    .agreeTerms{
      width: 668px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      .mixin-sc(26px;#606266);
      span{
        .mixin-sc(28px;#4d64fd);
      }
    }
  }
}
</style>
