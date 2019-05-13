<template>
   <div class="noteIndex">
     <div class="c-header">
         首页
      </div>
     <div class="content">
       <div class="c-swiper">
         <van-swipe :autoplay="3000">
          <van-swipe-item><div class="swiper1"></div></van-swipe-item>
          <van-swipe-item><div class="swiper2"></div></van-swipe-item>
          <van-swipe-item><div class="swiper3"></div></van-swipe-item>
          <div class="custom-indicator" slot="indicator">
            <!-- {{ current + 1 }}/4 -->
          </div>
        </van-swipe>
       </div>
       <div class="c-title">
         <!-- 欢迎使用云笔记 -->
         {{time}}
       </div>
       <div class="c-text">
         记录生活!记录学习!!记录心情!!!
       </div>
       <div class="c-text">
         欢迎使用云笔记
       </div>
       <div class="c-button">
         <div class="submit-con" @click="toWriteNote()">写笔记</div>
       </div>
     </div>
    <footer-bar
      />
   </div>
</template>

<script type="text/ecmascript-6">
import FooterBar from '@/components/FooterBar/FooterBar'
import { Swipe, SwipeItem } from 'vant'
import { clearInterval } from 'timers'

export default {
  name: 'NoteIndex',
  data () {
    return {
      time: ''
    }
  },
  components: {
    FooterBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  created () {
    this.nowTime()
  },
  methods: {
    toWriteNote () {
      this.$router.push({name: 'WriteNote', query: {from: 'new'}})
    },
    getDate (date) {
      let currentDate = new Date(date)
      var y = currentDate.getFullYear()
      var m = currentDate.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = currentDate.getDate()
      d = d < 10 ? '0' + d : d
      var h = currentDate.getHours()
      h = h < 10 ? '0' + h : h
      var mm = currentDate.getMinutes()
      mm = mm < 10 ? '0' + mm : mm
      var ss = currentDate.getSeconds()
      ss = ss < 10 ? '0' + ss : ss
      var day = currentDate.getDay()
      switch (day) {
        case 1:
          day = '一'
          break
        case 2:
          day = '二'
          break
        case 3:
          day = '三'
          break
        case 4:
          day = '四'
          break
        case 5:
          day = '五'
          break
        case 6:
          day = '六'
          break
        case 7:
          day = '日'
          break
        default:
          break
      }
      this.time = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss + ' ' + '星期' + day
    },
    nowTime () {
      setInterval(() => {
        this.getDate(new Date())
        // console.log(new Date())
      }, 1000)
      clearInterval()
    }
  }
}
</script>

<style scoped lang="less">
.noteIndex {
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  .c-header {
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 36px;
      color: #24282E;
      font-weight: 500;
      background:rgba(255,255,255,1);
    }
  .content {
    height: 1124px;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .c-swiper {
      width: 100%;
      height: 450px;
      .van-swipe__indicator {
        width: 10px;
        height: 10px;
      }
      .swiper1 {
        width: 100%;
        height: 100%;
        background: url('../../../static/image/swiper1.jpg') no-repeat;
        background-size:  100% 100%;
      }
      .swiper2 {
        width: 100%;
        height: 100%;
        background: url('../../../static/image/swiper2.jpg') no-repeat;
        background-size:  100% 100%;
      }
      .swiper3 {
        width: 100%;
        height: 100%;
        background: url('../../../static/image/swiper4.jpg') no-repeat;
        background-size:  100% 100%;
      }
    }
    .c-title {
      width: 100%;
      height: 150px;
      line-height: 150px;
      text-align: center;
      font-size: 40px;
      color: #409eff;
    }
    .c-text {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 30px;
      color: red;
    }
    .c-button {
      width: 100%;
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .submit-con{
        width: 600px;
        height: 100px;
        background: #4d64fd;
        color: #fff;
        border-radius: 50px;
        line-height: 100px;
        text-align: center;
        font-size: 34px;
      }
    }
  }
  .footer {
    height: 120px;
    width: 100%
  }
}
</style>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.noteIndex {
  .van-swipe {
    width: 100%;
    height: 100%;
    .van-swipe__indicators {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
