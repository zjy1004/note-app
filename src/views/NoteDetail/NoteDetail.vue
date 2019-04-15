<template>
   <div class="noteDetail">
     <x-header
      title="笔记详情"
      :left-options="{backText: ''}"
    />
   </div>
</template>

<script type="text/ecmascript-6">
import { XHeader, Confirm, TransferDom } from 'vux'
export default {
  name: '',
  data () {
    return {
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
    getData () {
      let id = this.$route.query.id
      this.$axios.get(`/articleById/${id}`).then(res => {
        console.log(res)
        this.content = res.data
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
    display: flex;
    flex: 1;
    flex-direction: column;
    background: #fff;
    padding: 30px;
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
  }
  .line {
    width: 100%;
    background-color: rgba(229,229,229,1);
    height: 2px;
  }
}
</style>
