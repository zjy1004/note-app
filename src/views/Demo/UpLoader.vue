<template>
   <div class="upLoader">
    <van-uploader :after-read="onRead">
      <img src="../../image/photograph.png" ref="upImg" alt="">
    </van-uploader>
   </div>
</template>

<script type="text/ecmascript-6">
import { PullRefresh, Uploader, Icon } from 'vant'
export default {
  name: 'UpLoader',
  components: {
    [PullRefresh.name]: PullRefresh,
    [Uploader.name]: Uploader,
    [Icon.name]: Icon
  },
  data () {
    return {
      avatar: ''
    }
  },
  methods: {
    onRead (file) {
      this.$refs.upImg.src = file.content
      console.log(file)
      this.avatar = file.content
    }
  }
}
</script>

<style scoped lang="less">
.upLoader {
  .van-uploader {
    width: 100px;
    height: 100px;
    img {
      width: 100px;
      height: 100px;
    }
    .van-uploader__input {
      width: 100%;
      height: 100%;
    }
    .van-icon {
      font-size: 50px;
    }
  }
  .border {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: red;
  }
}
</style>
