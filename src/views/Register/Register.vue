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
      <div class="item">
        <div class="item-label">
          手机号:
        </div>
        <div class="item-input">
          <input type="text" v-model="form.tel" placeholder="请输入手机号">
        </div>
      </div>
      <div class="item2">
        <div class="get" v-show="timeShow" @click="getCode()">获取验证码</div>
        <div class="done" v-show="!timeShow">{{timeNum}}s后重新获取</div>
      </div>
      <div class="item">
        <div class="item-label">
          验证码:
        </div>
        <div class="item-input">
          <input type="" v-model="codeNum" placeholder="请输入验证码">
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
import { Field, CellGroup, Uploader } from 'vant'
export default {
  name: 'Register',
  data () {
    return {
      timeShow: true,
      timeNum: '',
      code: 104059,
      codeNum: '',
      form: {
        avatar: '',
        username: '',
        email: '',
        password: '',
        tel: '',
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
      this.form.avatar = file.content
    },
    getCode () {
      this.getCountDown()
      const text = '验证码：' + this.code + ',您正在使用注册功能,该验证码仅用于身份验证,在1分钟之内有效，请勿泄露给其他人使用。' // 短信内容模板，已经在sms平台绑定此内容，所以会比普通的更快到达用户手机。
      let param = new URLSearchParams()
      param.append('Uid', 'Zjy1004')
      param.append('Key', 'd41d8cd98f00b204e980')
      param.append('smsMob', this.form.tel)
      param.append('smsText', text)
      this.$axios.post('http://utf8.api.smschinese.cn', param, {// post请求，在请求时会自动把param拼接再Param后面
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'// 必须要加头
        }
      }).then(function (response) {
        console.log(response)
      })
    },
    getCountDown () { // 倒计时
      const TIME_COUNT = 60
      if (!window.timer) {
        this.timeNum = TIME_COUNT
        this.timeShow = false
        window.timer = setInterval(() => {
          if (this.timeNum > 0 && this.timeNum <= TIME_COUNT) {
            this.timeNum--
          } else {
            this.timeShow = true
            clearInterval(window.timer)
            window.timer = null
          }
        }, 1000)
      }
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
          text: '密码长度在6到16个字符'
        })
      } else if (this.form.password !== this.form.passagain) {
        this.$vux.toast.show({
          type: 'warn',
          text: '密码不一致，请重新输入'
        })
      } else {
        if (this.codeNum !== '104059') {
          this.$vux.toast.show({
            type: 'warn',
            text: '验证码错误'
          })
        } else {
          this.$axios.post('/user', this.form).then(res => {
            if (res.code === 200) {
              this.$vux.toast.show({
                type: 'success',
                text: '注册成功'
              })
              setTimeout(() => {
                this.$router.push({name: 'Login'})
              }, 1000)
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
  display: flex;
  flex-direction: column;
  .form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
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
  .item2 {
    height: 50px;
    width: 100%;
    display: flex;
    text-align: right;
    margin-top: 10px;
    .get {
      width: 100%;
      height: 100%;
      text-align: right;
      color: #409eff;
    }
    .done {
      width: 100%;
      height: 100%;
      text-align: right;
      color: #aaa;
    }
    // margin-top: 20px;
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
        line-height: 80px;
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
    // background: #fff;
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
