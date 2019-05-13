<template>
   <div class="noteStatistics">
     <x-header
      title="笔记统计"
      :left-options="{backText: ''}"
      >
      <div v-if="this.$route.query.from === 'self'" @click="editArticle()" class="choose-btn" slot="right">修改</div>
     </x-header>
    <div class="d-wrap">
      <div class="title">
        个人笔记数量统计
      </div>
      <div class="bar-view">
        <bar-echarts
          :id="'note-statistics'"
          :dataArr="noteData"
        />
      </div>
    </div>
    <!-- <div v-transfer-dom>
      <loading :show="showLoading" text="Loading..."></loading>
    </div> -->
   </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Confirm, TransferDom, Loading } from 'vux'
import PieEcharts from '@/components/Echarts/PieEcharts'
import BarEcharts from '@/components/Echarts/BarEcharts'
export default {
  name: 'NoteStatistics',
  data () {
    return {
      noteData: [
        // {name: '全部', value: 5},
        // {name: '今天', value: 1}
      ],
      totalNote: 0,
      todayNote: 0,
      param: {
        categoryId: '',
        createTime: ''
      },
      showLoading: false,
      author: {},
      category: {},
      content: {}
    }
  },
  components: {
    XHeader,
    Confirm,
    TransferDom,
    Loading,
    PieEcharts,
    BarEcharts
  },
  directives: {
    TransferDom
  },
  created () {
    this.showLoading = true
    // this.getData()
    this.getData()
    console.log(this.renderTime(new Date()).substring(0, 10))
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
      this.$axios.post('/articleContent', this.param).then(res => {
        if (res.code === 200) {
          this.showLoading = false
          this.articleData = res.data.map(item => {
            item.createTime = this.renderTime(item.createTime).substring(0, 16)
            return item
          })
          this.totalNote = res.data.length
          let nowDate = this.renderTime(new Date()).substring(0, 10)
          this.articleData.forEach(item => {
            let createDate = item.createTime.substring(0, 10)
            if (createDate === nowDate) {
              this.todayNote++
            }
          })
          let obj1 = {
            name: '全部',
            value: this.totalNote
          }
          // this.noteData.push(obj1)
          let obj2 = {
            name: '今天',
            value: this.todayNote
          }
          this.noteData.push(obj1, obj2)
          console.log(this.noteData)
          console.log(this.articleData)
        }
        if (res.code === 403) {
          this.$vux.toast.show({
            type: 'warn',
            text: res.msg
          })
          setTimeout(() => {
            this.$router.push({name: 'Login'})
          }, 500)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.noteStatistics {
  display: flex;
  flex: 1;
  flex-direction: column;
  .d-wrap {
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    .title {
      width: 100%;
      height: 100px;
      line-height: 100px;
      font-size: 32px;
      // border-left: 5px solid #409eff;
    }
    .bar-view{
      height: 700px;
      width: 700px;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
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
            font-size: 16px;
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
      margin-right: 20px;
      width: auto;
      height: auto;
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
.noteStatistics{
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
<style lang="less">
.weui-mask_transparent {
  background: rgba(100, 100, 100, 0.5);
}
.weui-toast {
  top: 500px;
}
</style>
