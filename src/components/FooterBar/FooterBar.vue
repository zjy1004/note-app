<template>
  <div class="footer">
      <!-- <div class="footer-item" @click="gotoTreasure" :class="{active: $route.name === 'NoteIndex'}">
          <i class="iconfont icon-wodecaifu"></i>
        <div class="footer-title">财富</div>
      </div> -->
      <router-link to="/noteIndex" class="footer-item" :class="{active: $route.name === 'NoteIndex'}">
        <i class="iconfont icon-dingdan2"></i>
        <div class="footer-title">首页</div>
      </router-link>
      <router-link to="/selfNote" class="footer-item" :class="{active: $route.name === 'SelfNote'}">
        <i class="iconfont icon-dingdan2"></i>
        <div class="footer-title">笔记</div>
      </router-link>
      <router-link to="/mine" class="footer-item" :class="{active: $route.name === 'Mine'}">
        <i class="iconfont icon-wode1"></i>
        <div class="footer-title">我的</div>
      </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
// import LoginAjax from '@/api/Login/Login'

export default {
  name: '',
  data () {
    return {}
  },
  components: {},
  methods: {
    // gotoTreasure () {
    //   // LoginAjax.QueryUserState().then((res) => {
    //   //   if (res.code === 200) {
    //   //     if (res.data === 1) { // 未注册
    //   //       this.$router.push({name: 'ClauseDetail', query: {protocolName: '物流云 “驮付宝”货款收取见证系统使用规则', protocolType: '2', from: 'register'}})
    //   //     } else {
    //   //       LoginAjax.QueryUserState().then((res) => {
    //   //         if (res.code === 200) {
    //   //           if (res.data.firstLogin === 0) { // 已注册但第一次登陆
    //   //             this.$router.push({name: 'ClauseDetail', query: {protocolName: '物流云 “驮付宝”货款收取见证系统使用规则', protocolType: '2', from: 'register', firstLogin: '1'}})
    //   //           } else {
    //   //             this.$router.push({name: 'Treasure'})
    //   //           }
    //   //         }
    //   //       })
    //   //     }
    //   //   }
    //   // })
    // }
  }
}
</script>

<style scoped lang="less">
 .footer{
    background-color: #fafbfe;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    a {
      text-decoration: none;
      // height: 100%;
     }
    .footer-item{
      padding-top: 10px;
      height: 100%;
      flex: 1;
      line-height: 1;
      text-align: center;
      color: #CCCCCC;
      .iconfont{
        font-size: 50px;
      }
      .footer-title {
        margin-top: 10px;
        font-size: 26px;
      }
    }
    .active{
      color: #4A7FE8;
    }
  }
</style>
