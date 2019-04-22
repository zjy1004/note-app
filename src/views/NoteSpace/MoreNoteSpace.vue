<template>
   <div class="moreWaybill">
      <!-- 头部 -->
      <div class="c-header">
        <div @click="routerGo()" class="c-h-left"><x-icon type="ios-arrow-left"></x-icon></div>
        <div class="c-h-title"  @click="handleSelect()">{{headerTitle}}
          <div>
            <x-icon v-if="!selectShow" type="ios-arrow-down"></x-icon>
            <x-icon v-if="selectShow" type="ios-arrow-up"></x-icon>
          </div>
        </div>
        <div class="c-h-right" @click="choose()"><i class="iconfont icon-shaixuan1"></i></div>
      </div>
       <!-- 单选框盒子 -->
       <transition
        :duration="{ enter: 900, leave: 300 }"
        name="custom-classes-transition"
        enter-active-class="animated fadeInDown"
        leave-active-class="animated fadeOutUp">
        <div v-if="selectShow" class="c-select">
          <checker @on-change="handleToStatus" radio-required v-model="param.categoryId" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
            <div class="checkLine">
              <checker-item :value="''">{{ '全部笔记'}}</checker-item>
            </div>
            <div class="checkLine">
              <checker-item :value="studyId">{{ '学习笔记'}}</checker-item>
              <checker-item :value="moodId">{{ '心情笔记'}}</checker-item>
              <checker-item :value="lifeId">{{ '生活笔记'}}</checker-item>
            </div>
          </checker>
        </div>
      </transition>
     <div class="content">
       <!-- 有运单 -->
       <div v-if="articleData.length > 0 && !showLoading"  class="c-waybill">
        <van-pull-refresh v-model="isLoading" @refresh="waybillRefresh">
          <ul class="c-w-wrap">
            <li class="c-w-item" v-for="(item, index) in articleData" :key="index">
              <div class="top" @click="handleDetail(item._id)" >
                <div class="t-left">
                  <img :src="item.author.avatar" alt="">
                </div>
                <div class="t-right">
                  <!-- <div class="t-r-top">{{item.author.username}}</div> -->
                  <!-- <div class="t-r-bottom">{{item.updateTime}}</div> -->
                  <div class="title">
                    <div class="t-title">{{item.author.username}}</div>
                    <div class="t-category" :class="{'study': item.category.name === '学习', 'life': item.category.name === '生活', 'mood': item.category.name === '心情'}">{{item.category.name}}</div>
                  </div>
                  <div class="t-r-bottom">{{item.createTime}}</div>
                </div>
              </div>
              <div class="content hidden" @click="handleDetail(item._id)" >{{item.contentText}}</div>
              <div class="bottom">
                <div class="b-look">&nbsp;浏览 {{item.readnumber}} 次</div>
                <div class="no_praise" :class="{'praise': item.praise === 1}" @click="item.praise === 0 ? praise(item._id) : cancelPraise(item._id)"><div class="img"></div>&nbsp;{{item.commonnum}}</div>
              </div>
            </li>
          </ul>
        </van-pull-refresh>
       </div>
      <!-- 无运单 -->
      <van-pull-refresh v-model="isLoading" @refresh="waybillRefresh" v-if="articleData.length === 0 && !showLoading" class="noBill">
        <div class="imgWrap">
          <img src="../../image/noInfo.png" alt="">
        </div>
      </van-pull-refresh>
     </div>
     <!-- 点击后的阴影 Start -->
      <div class="c-shadow" @click="handleSelect()" v-if="selectShow">
      </div>
      <!-- 点击后的阴影 End -->
      <!--右侧弹框-->
    <div v-transfer-dom class="popupRight">
      <popup v-model="showPop" position="right" class="withdraw-deposit-pop">
        <div class="searchBar">
          <h3>日期</h3>
          <div class="dateWrap">
            <div class="dateLi">
              <datetime
                v-model="param.createTime"
                placeholder="选择日期"
                @on-change="changeDate"
                @on-cancel="log('cancel')"
                @on-confirm="onConfirm"
                @on-hide="log('hide', $event)">
              </datetime>
            </div>
          </div>
        </div>
        <div class="btn_footer">
          <span @click="reset">重置</span>
          <span @click="sure">确定</span>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <loading :show="showLoading" text="Loading..."></loading>
    </div>
   </div>
</template>

<script type="text/ecmascript-6">
import { Checker, CheckerItem, Popup, Flexbox, FlexboxItem, TransferDom, Loading, Datetime, XInput } from 'vux'
import { PullRefresh } from 'vant'
export default {
  name: 'MoreNote',
  components: {
    Checker,
    CheckerItem,
    [PullRefresh.name]: PullRefresh,
    Popup,
    Flexbox,
    FlexboxItem,
    TransferDom,
    Loading,
    Datetime,
    XInput
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      showLoading: false,
      articleData: [],
      param: {
        categoryId: '',
        createTime: ''
      },
      userId: '',
      userInfo: {},
      categories: [],
      lifeId: '',
      studyId: '',
      moodId: '',
      headerTitle: '全部笔记',
      showPop: false,
      isLoading: false,
      selectShow: false
    }
  },
  created () {
    this.showLoading = true
    this.getCategory()
    this.getData()
    this.queryUserInfo()
  },
  methods: {
    // 删除文章
    del (id) {
      this.$axios.delete(`/article/${id}`).then(res => {
        if (res.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: '刷新成功！'
          })
          this.getData()
        }
      })
    },
    queryUserInfo () { // 获取用户信息
      let userInfoObj = JSON.parse(sessionStorage.getItem('userInfo'))
      this.userInfo = {...userInfoObj}
      this.userId = this.userInfo.userId
      console.log(this.userId)
    },
    praise (id) { // 赞
      this.$axios.patch(`/addCommonnum/${id}`).then(res => {
        if (res.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: res.msg
          })
          this.getData()
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: res.msg
          })
        }
      })
    },
    cancelPraise (id) { // 取消赞
      this.$axios.patch(`/reduceCommonnum/${id}`).then(res => {
        if (res.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: res.msg
          })
          this.getData()
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: res.msg
          })
        }
      })
    },
    // 获取分类
    getCategory () {
      this.$axios.get('/category').then(res => {
        this.categories = res.data
        res.data.forEach(item => {
          switch (item.name) {
            case '生活':
              this.lifeId = item._id
              break
            case '学习':
              this.studyId = item._id
              break
            case '心情':
              this.moodId = item._id
              break
            default:
              break
          }
        })
        console.log(this.studyId)
      })
    },
    renderTime (date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    // 获取文章
    getData () {
      this.$axios.post('/allArticleContent', this.param).then(res => {
        if (res.code === 200) {
          this.showLoading = false
          this.articleData = res.data.map(item => {
            item.createTime = this.renderTime(item.createTime).substring(0, 16)
            if (item.praiseList.length > 0) {
              if (item.praiseList.includes(this.userId)) {
                item.praise = 1
              } else {
                item.praise = 0
              }
            } else {
              item.praise = 0
            }
            return item
          })
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
    },
    routerGo () {
      this.$router.back(-1)
    },
    // 下拉刷新
    waybillRefresh () {
      setTimeout(() => {
        this.$vux.toast.show({
          type: 'success',
          text: '刷新成功！'
        })
        this.getData()
        this.isLoading = false
      }, 500)
    },
    // 右侧筛选框显示
    choose () {
      this.showPop = true
      this.$nextTick(() => {
        setTimeout(() => {
          let modal = document.getElementsByClassName('vux-popup-mask')[0]
          modal.style.zIndex = 999
        }, 400)
      })
      this.selectShow = false
    },
    // 修改时间
    changeDate () {
    },
    onConfirm () {},
    log () {},
    // 重置筛选
    reset () {
      this.param.createTime = ''
      // this.waybillQueryParam.createTimeStart = ''
    },
    // 确定筛选
    sure () {
      this.showPop = false
      this.showLoading = true
      this.getData()
    },
    // 文章详情
    handleDetail (id) {
      this.$router.push({name: 'NoteDetail', query: {id: id, from: 'space'}})
    },
    // 点击显示单选框
    handleSelect () {
      this.selectShow = !this.selectShow
      this.reset()
    },
    // 分类下的文章
    handleToStatus () {
      this.selectShow = false
      setTimeout(() => {
        this.showLoading = true
        this.getData(this.param)
      }, 200)
    }
  },
  computed: {
    categoryStatus () {
      return this.param.categoryId
    }
  },
  watch: {
    categoryStatus (newVal, oldVal) {
      switch (newVal) {
        case '':
          this.headerTitle = '全部笔记'
          break
        case this.studyId:
          this.headerTitle = '学习笔记'
          break
        case this.lifeId:
          this.headerTitle = '生活笔记'
          break
        case this.moodId:
          this.headerTitle = '心情笔记'
          break
        default:
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
.vux-popup-dialog.vux-popup-right { // 右侧折叠查询
  width: 80% !important;
  background: #FFF;
  overflow: inherit;
  z-index: 1000
}
.moreWaybill {
  height: 100%;
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  .c-header {
    height: 90px;
    width: 100%;
    display: flex;
    background-color: #fff;
    position: relative;
    .c-h-left {
      width: 100px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .c-h-title {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      color: #24282E;
      font-weight: 500;
    }
    .c-h-right {
      width: 100px;
      height: 90px;
      line-height: 88px;
      text-align: center;
      .iconfont {
        font-size: 40px;
      }
    }
  }
  .c-select {
    width: 100%;
    height: 300px;
    background-color: #fff;
    position: absolute;
    top: 90px;
    left: 0;
    right: 0;
    z-index: 999;
    .checkLine {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .c-shadow {
    position: fixed;
    top: 140px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.6;
    height: 100%;
    z-index: 998;
  }
  .vux-x-icon {
    fill: #24282E;
    font-weight: 600;
  }
  .content {
    height:100%;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    .van-pull-refresh {
      height: 100%;
      overflow: auto;
     /deep/ .van-pull-refresh__track {
        height: 100%;
        // width: 100%;
      }
    }
    /deep/ .van-pull-refresh__text {
        font-size: 28px;
      }
    /deep/ .van-pull-refresh__loading span{
        font-size: 28px;
      }
    .c-waybill {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-top: 20px;
      padding: 20px 30px;
      .c-w-wrap {
        height: 100%;
        width: 100%;
        // overflow: auto;
        .c-w-item {
          height: 240px;
          width: 100%;
          background: #fff;
          border-radius: 15px;
          margin-bottom: 30px;
          // border: 2px solid #ddd;
        }
        .top {
          width: 100%;
          height: 80px;
          display: flex;
          border-bottom: 2px solid #fafafa;
          // border-bottom: 1px solid #eee;
          .t-left {
            width: 80px;
            height: 80px;
            padding: 7px;
            margin-right: 20px;
            // border-radius: 50px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .t-right {
            width: 580px;
            height: 80px;
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
            .t-r-bottom {
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 20px;
              color: #5C6066;
              margin-top: 15px;
            }
            .title {
              height: 40px;
              width: 100%;
              display: flex;
              justify-content: space-between;
              .t-title {
                height: 40px;
                width: 450px;
                font-size: 30px;
                color: #24282E;
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
          }
        }
        .content {
          height: 110px;
          width: 100%;
          text-indent: 2em;
          line-height: 2;
          margin-top: 10px;
          font-size: 28px;
          color: #5C6066;
          border-bottom: 2px solid #fafafa;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;  // 控制多行的行数
          -webkit-box-orient: vertical;
        }
        .bottom {
          height: 30px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .b-look {
            width: 500px;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #5C6066;
          }
          .no_praise {
            width: 60px;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            display: flex;
            .img {
              width: 25px;
              height: 25px;
              background: url('../../../static/image/no-praise.png') no-repeat;
              background-size:  100% 100%;
            }
          }
          .praise {
            width: 60px;
            height: 30px;
            line-height: 30px;
            font-size: 18px;
            display: flex;
            .img {
              width: 25px;
              height: 25px;
              background: url('../../../static/image/praise.png') no-repeat;
              background-size:  100% 100%;
            }
          }
        }
      }
    }
    .noBill {
        width: 100%;
        height: 100%;
        background: #FFF;
        overflow: hidden;
      .imgWrap {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        img {
          width: 290px;
          height: 220px;
        }
        .msg {
          margin-top: 35px;
          font-size: 24px;
          width: auto;
          text-align: center;
          color: #D4D6DE;
        }
      }
    }
  }
}
// 查询条件选择框样式
.demo1-item {
}
.demo1-item-selected {
  border: 2px solid rgba(53,115,238,1);
  color: #3573EE !important;
  border-radius: 32px;
}
//
.vux-checker-item {
  font-size: 24px;
  color: #1E2228;
  width: 210px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background:rgba(242,243,245,1);
}
</style>

<style lang="less">
.popupRight {
    .searchBar {
      height: 300px;
      margin-top: 85px;
      h3 {
        width: 100%;
        height: 30px;
        margin-left: 30px;
        font-size: 30px;
        font-weight: bold;
        margin-bottom: 20px;
        margin-top: 30px;
      }
      .waybillInput {
        height: 60px;
        width: 100%;
        margin-left: 30px;
        input{
          width: 80%;
          height: 60px;
          outline: none;
          border: none;
          font-size: 28px;
          margin: 0;
          padding: 0;
          font-size: 28px;
          border-bottom: 1px solid rgba(229,229,229,1);
        }
      }
      .dateWrap {
        width: 100%;
        height: 100px;
        display: flex;
        // justify-content: center;
        margin-top: 40px;
        .dateLi {
          width: 40%;
          height: 100px;
          span {
            font-size: 28px;
            color: #676767;
            text-decoration: underline;
          }
          .weui-cell_access .weui-cell__ft:after { // 隐藏时间选择的箭头
            display: none;
          }
          .vux-datetime {
            height: 80px;
            width: 100%;
            .vux-cell-placeholder {
              font-size: 26px;
            }
          }
        }
      }
    }
    .btn_footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 85px;
      span {
        font-size: 30px;
        color: #202023;
        width: 50%;
        float: left;
        height: 85px;
        line-height: 85px;
        text-align: center;
        border: 1px solid #EDEEF1;
      }
      span:last-child {
        color: #FFFFFF;
        background:linear-gradient(90deg,rgba(77,100,252,1),rgba(63,144,255,1));
      }
    }
}
.dp-container {
  .dp-header {
    border-bottom: 1px solid #F3F3F3;
  }
  .dp-content {
    padding: 60px 0;
  }
    .dp-header .dp-item {
      font-size: 32px;
      height: 70px;
      line-height: 70px;
    }
    .vux-datetime-cancel {
      padding-left: 60px;
    }
    .vux-datetime-confirm {
      padding-right: 60px;
    }
  .scroller-component {
    .scroller-indicator {
      height: 50px !important;
      border-top: 1px solid #E8E8E8;
      border-bottom: 1px solid #E8E8E8;
    }
    .scroller-item {
      font-size: 28px !important;
      height: 50px !important;
      line-height: 50px !important;
    }
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
