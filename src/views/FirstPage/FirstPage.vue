<template>
   <div class="firstPage">
     <div class="top"></div>
     <div class="bottom">
       <div class="submit-con1">
        <div class="submit-con" @click="toRegister()">免费注册</div>
        <div class="agreeTerms" @click="toLogin()">已注册&nbsp;<span>去登录</span></div>
      </div>
     </div>

   </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {}
  },
  components: {},
  methods: {
    toRegister () {
      this.$router.push({name: 'Register'})
    },
    toLogin () {
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.firstPage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: url('../../../static/image/firstPage.jpg') no-repeat;
  background-size:  100% 100%;
  .top {
    width: 100%;
    height: 80%;
  }
  .bottom {
    width: 100%;
    height: 20%;
    .submit-con1{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    .submit-con{
      width: 600px;
      height: 100px;
      margin: 50px auto 20px;
      background: #ceb49b;
      color: #fff;
      border-radius: 44px;
      line-height: 100px;
      text-align: center;
      font-size: 36px;
    }
    .agreeTerms{
      width: 600px;
      height: 60px;
      line-height: 60px;
      text-align: right;
      .mixin-sc(28px;#606266);
      span{
        .mixin-sc(30px;#4d64fd);
      }
    }
  }
  }
}
</style>
