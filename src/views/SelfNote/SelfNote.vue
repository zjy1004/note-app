<template>
   <div class="waybill">
      <div class="c-header">个人笔记</div>
      <!-- 有运单 -->
      <van-pull-refresh v-model="isLoading" @refresh="waybillRefresh" v-if="articleData.length > 0" class="content">
        <div class="c-waybill">
          <ul class="c-w-wrap">
            <li class="c-w-item" v-for="(item, index) in articleData.slice(0, 3)" :key="index">
              <div class="top"  @click="handleDetail(item._id)" >
                <div class="t-left">
                  <img :src="item.author.avatar" alt="">
                </div>
                <div class="t-right">
                  <!-- <div class="t-r-top">{{item.author.username}}</div> -->
                  <!-- <div class="t-r-bottom">{{item.updateTime}}</div> -->
                  <div class="title">
                    <div class="t-title">{{item.title}}</div>
                    <div class="t-category" :class="{'study': item.category.name === '学习', 'life': item.category.name === '生活', 'mood': item.category.name === '心情'}">{{item.category.name}}</div>
                  </div>
                  <div class="t-r-bottom">{{item.updateTime}}</div>
                </div>
              </div>
              <div class="content hidden" @click="handleDetail(item._id)" >{{item.contentText}}</div>
              <div class="bottom">
                <div class="b-look" style="font-size: 12px;">&nbsp;浏览 {{item.readnumber}} 次</div>
                <div class="b-del" @click="del(item._id)"><div class="img"></div>&nbsp;</div>
              </div>
            </li>
          </ul>
          <div v-if="articleData.length > 3" class="c-w-more">
            <span class="a" @click="handleMore()">查看更多笔记 ></span>
          </div>
        </div>
      </van-pull-refresh>
      <!-- 无运单 -->
      <van-pull-refresh v-model="isLoading" @refresh="waybillRefresh" v-if="articleData.length === 0" class="noBill">
        <div class="imgWrap">
          <img src="../../image/noInfo.png" alt="">
        </div>
      </van-pull-refresh>
    <footer-bar />
   </div>
</template>

<script type="text/ecmascript-6">
import FooterBar from '@/components/FooterBar/FooterBar'
// import WaybillAjax from '@/api/WayBill/WayBill'
import { PullRefresh } from 'vant'
export default {
  name: 'SelfNote',
  components: { FooterBar, [PullRefresh.name]: PullRefresh },
  data () {
    return {
      isLoading: false,
      param: {
        categoryId: '',
        updateTime: ''
      },
      articleData: []
    }
  },
  created () {
    this.getData()
    console.log(this.renderTime('2019-04-15T02:32:46.941Z'))
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
    renderTime (date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    // 获取文章
    getData () {
      this.$axios.post('/articleContent', this.param).then(res => {
        if (res.code === 200) {
          this.articleData = res.data.map(item => {
            item.updateTime = this.renderTime(item.updateTime).substring(0, 16)
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
    // 更多笔记
    handleMore () {
      this.$router.push({name: 'MoreNote'})
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
    // 文章详情
    handleDetail (id) {
      this.$router.push({name: 'NoteDetail', query: {id: id}})
    }
  }
}
</script>

<style scoped lang="less">
.waybill {
  height: 100%;
  width: 100%;
  display: flex;
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
    .van-pull-refresh {
      height: 100%;
      overflow: auto;
     /deep/ .van-pull-refresh__track {
        height: 100%;
      }
    }
    /deep/ .van-pull-refresh__text {
        font-size: 28px;
      }
    /deep/ .van-pull-refresh__loading span{
        font-size: 28px;
      }
  .content {
    height:100%;
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    .c-waybill {
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 20px 30px;
      .c-w-wrap {
        height: 990px;
        width: 100%;
        overflow: hidden;
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
            font-size: 12px;
            color: #5C6066;
          }
          .b-del {
            width: 40px;
            height: 30px;
            line-height: 30px;
            text-align: right;
            font-size: 28px;
            .img {
              width: 25px;
              height: 25px;
              background: url('../../../static/image/del.png') no-repeat;
              background-size:  100% 100%;
            }
          }
        }
      }
      .c-w-more {
        height: 75px;
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .a {
          color: #3573EE;
          font-size: 28px;
        }
      }
    }
  }
  .noBill {
    width: 100%;
    height: 100%;
    background: #FFF;
    overflow: hidden;
    display: flex;
    flex: 1;
    flex-direction: column;
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
  .footer {
    height: 120px;
    width: 100%
  }
}
</style>
