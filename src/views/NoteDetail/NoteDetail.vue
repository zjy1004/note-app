<template>
   <div class="noteDetail">
     <x-header
      title="笔记详情"
      :left-options="{backText: ''}"
      >
      <div v-if="this.$route.query.from === 'self'" @click="editArticle()" class="choose-btn" slot="right">修改</div>
     </x-header>
    <div class="d-wrap">
      <div class="wrap">
        <div class="w-header">
          <div class="top">
            <div class="t-left">
              <img :src="author.avatar === '' ? '' : author.avatar" alt="">
            </div>
            <div class="t-right">
              <div class="t-r-top">{{author.username}}</div>
              <div class="t-r-middle">{{content.updateTime}}</div>
              <div class="t-r-bottom"><span>浏览: {{content.readnumber}} 次</span> <span>获赞: {{content.commonnum}} 次</span></div>
            </div>
          </div>
          <div class="title">
            <div class="t-text">标题:</div>
            <div class="t-title">{{content.title}}</div>
          </div>
          <div class="title">
            <div class="t-text">分类:</div>
            <div class="t-title" :class="{'study': category.name === '学习', 'life': category.name === '生活', 'mood': category.name === '心情'}">{{category.name}}</div>
          </div>
          <!-- <div class="t-r-bottom">{{content.updateTime}}</div> -->
        </div>
        <div class="w-content">内容:</div>
        <div class="w-c-wrap">{{content.contentText}}</div>
        <div class="w-img">图片:</div>
        <div class="w-i-wrap">
          <img :src="content.img" alt="">
        </div>
      </div>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Confirm, TransferDom } from 'vux'
export default {
  name: '',
  data () {
    return {
      author: {},
      category: {},
      content: {}
    }
  },
  components: {
    XHeader,
    Confirm,
    TransferDom
  },
  directives: {
    TransferDom
  },
  created () {
    this.getData()
  },
  methods: {
    editArticle () {
      let id = this.$route.query.id
      this.$router.push({name: 'WriteNote', query: {id: id, from: 'edit'}})
    },
    renderTime (date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    getData () {
      let id = this.$route.query.id
      this.$axios.get(`/articleById/${id}`).then(res => {
        console.log(res)
        this.content = res.data
        this.content.updateTime = this.renderTime(this.content.updateTime).substring(0, 19)
        this.author = res.data.author
        this.category = res.data.category
        console.log(this.content)
      })
    }
  }
}
</script>

<style scoped lang="less">
.noteDetail {
  display: flex;
  flex: 1;
  flex-direction: column;
  .d-wrap {
    width: 100%;
    height: 100%;
    padding: 30px;
    overflow-y: scroll;
  }
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    // flex: 1;
    flex-direction: column;
    background: #fff;
    overflow: auto;
    .w-header {
      height: 240px;
      width: 100%;
      margin-bottom: 20px;
      // border: 2px solid #ddd;
    }
    .top {
      width: 100%;
      height: 100px;
      display: flex;
      border-bottom: 1px solid #fafafa;
      // border-bottom: 1px solid #eee;
      .t-left {
        width: 100px;
        height: 100px;
        padding: 5px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .t-right {
        width: 580px;
        height: 100px;
        display: flex;
        flex-direction: column;
        .t-r-top {
          width: 100%;
          height: 40px;
          line-height: 40px;
          font-size: 30px;
          font-weight: 500;
          color: #24282E;
        }
        .t-r-middle {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 20px;
          color: #5C6066;
          margin-top: 5px;
        }
        .t-r-bottom {
          width: 100%;
          height: 20px;
          line-height: 20px;
          margin-top: 10px;
          span {
            font-size: 12px;
            color: #5C6066;
          }
        }
      }
    }
    .title {
      height: 40px;
      width: 100%;
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      .t-title {
        height: 40px;
        width: 100%;
        font-size: 30px;
        color: #24282E;
        line-height: 40px;
      }
      .t-text {
        height: 40px;
        width: 100px;
        font-size: 30px;
        color: #5C6066;
        line-height: 40px;
        // text-indent: 2em;
      }
      .life {
        color: #F57017;
      }
      .study {
        color: #409eff;
      }
      .mood {
        color: #02D48A;
      }
      .t-category {
        height: 40px;
        width: 100px;
        font-size: 32px;
        line-height: 40px;
        text-align: right;
      }
    }
    .w-content {
      height: 40px;
      width: 100%;
      font-size: 30px;
      color: #5C6066;
      line-height: 40px;
    }
    .w-c-wrap {
      width: 100%;
      min-height: 200px;
      text-indent: 2em;
      line-height: 2;
      margin-top: 10px;
      font-size: 26px;
      color: #24282E;
    }
    .w-img {
      height: 40px;
      width: 100%;
      font-size: 30px;
      color: #5C6066;
      line-height: 40px;
      margin-top: 20px;
    }
    .w-i-wrap {
      margin-top: 20px;
      margin-left: 20px;
      width: 400px;
      height: 400px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
<style lang="less" scope>
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.noteDetail{
  .vux-x-dialog{
    .weui-dialog{
      .weui-dialog__bd{
        padding: 0px 20px!important;
      }
    }
  }
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
        .mixin-sc(30px;@color-extrude);
      }
    }
  }
  .line {
    width: 100%;
    background-color: rgba(229,229,229,1);
    height: 2px;
  }
}
</style>
