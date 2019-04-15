<template>
  <div id="app" :class="{'isPadTop': isPadTop,'isPadBottom': isX}">
    <!-- <index v-if="showIndex()"/>
    <router-view v-if="!showIndex()"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Index from '@/views/Index/Index'
export default {
  name: 'App',
  data () {
    return {
      isX: false
    }
  },
  created () {
    this.isX = this.isIphoneX()
  },
  computed: {
    isPadTop () {
      if (this.$route.name === 'Treasure' || this.$route.name === 'Login') {
        return false
      } else {
        return true
      }
    }
  },
  components: {
    Index
  },
  methods: {
    // showIndex () {
    //   return this.$route.name !== 'Login' && this.$route.name !== 'FirstChangePwd'
    // }
  }
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
#app {
  color: #333;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fafafa;
}
/* .isPadTop{
  padding-top: 50px;
}
.isPadBottom{
  padding-bottom: 50px;
} */
.van-notify {
  font-size: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
}
</style>
