<template>
  <div class="register">
    <!-- 写笔记页 -->
    <x-header
      title="写笔记"
      :left-options="{backText: ''}"
    />
    <!-- 内容 -->
    <div class="companyInfo">
      <div class="content">
        <!-- 标题 -->
        <div class="c-label">
          <span class="warn">*</span>标题
        </div>
        <div class="c-inputWarp">
          <van-field @keyup.native="inputName()" v-model="form.title" placeholder="请输入标题" />
        </div>
        <!-- 分类 -->
        <div class="c-label">
          <span class="warn">*</span>选择分类
        </div>
        <div class="c-idType">
          <select name="" id="selector" v-model="form.category">
            <option value='' disabled selected>请选择分类</option>
            <option :key="index" v-for="(item, index) in categories" :value="item._id">{{item.name}}</option>
          </select>
        </div>
        <!-- 内容 -->
        <div class="c-label">
          <span class="warn">*</span>内容
        </div>
          <div class="c-detailAddress">
          <group>
            <x-textarea placeholder="请输入内容" v-model="form.contentText"></x-textarea>
          </group>
        </div>
         <!-- 分类 -->
        <div class="c-label">
          <span class="warn"></span>添加图片
        </div>
        <div class="upLoader">
          <van-uploader :after-read="onRead">
            <img src="../../../static/image/addImg.png" ref="upImg" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="footer">
        <button class="f-button" :class="{'disabled-class': !componyButtonDisabed}" :disabled="!componyButtonDisabed" @click="save()">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XProgress, XInput, XAddress, Group, XTextarea, Confirm, Selector } from 'vux'
import { Checkbox, CheckboxGroup, Field, Uploader } from 'vant'
export default {
  name: 'CardBag',
  components: {
    XHeader,
    XProgress,
    XInput,
    XAddress,
    Group,
    XTextarea,
    Confirm,
    Selector,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Field.name]: Field,
    [Uploader.name]: Uploader
  },
  data () {
    return {
      form: {
        content: '',
        contentText: '',
        title: '',
        category: '',
        img: ''
      },
      categories: []
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    getCategory () {
      this.$axios.get('/category').then(res => {
        this.categories = res.data
      })
    },
    onRead (file) {
      this.$refs.upImg.src = file.content
      this.form.img = file.content
    },
    save () {
      this.$axios.post('/article', this.form).then(res => {
        if (res.code === 200) {
          this.$vux.toast.show({
            type: 'success',
            text: '发表成功'
          })
          this.$router.push({name: 'SelfNote'})
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: res.msg
          })
        }
      })
    },
    inputIdNumber () {
      this.registerParam.idNumber = this.replaceIdNum(this.registerParam.idNumber)
    },
    inputName () {
      this.form.title = this.replaceNbsp(this.form.title)
    },
    // inputPhone () {
    //   this.registerParam.phone = this.validateNum(this.registerParam.phone)
    // },
    isPoneAvailable (tel) { // 手机号校验
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(tel)) {
        return false
      } else {
        return true
      }
    },
    isIdNumberAvailable (idNo) { // 身份证号码校验
      let res = this.validateIdentityCardNum(idNo)
      if (!res.result) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    isCheck (newVal, oldVal) {
    }
  },
  computed: {
    componyButtonDisabed () { // 保存禁用
      return this.form.title !== '' &&
      this.form.contentText !== '' &&
      this.form.category !== ''
    }
  }
}
</script>

<style scope lang="less">
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.register{
  display: flex;
  flex: 1;
  background: #fff!important;
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
      }
    }
  .companyInfo {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      flex: 1;
    .content {
      width: 100%;
      height: 100%;
      padding: 55px 40px;
      // margin-top: 55px;
      overflow: auto;
      .warn {
        color: red;
        font-size: 26px;
      }
      .c-title {
        color: #24282E;
        font-size: 50px;
        font-weight: 500;
        margin-bottom: 80px;
      }
      .c-label {
        width: 100%;
        height: auto;
        font-size: 28px;
        color: #24282E;
        margin-bottom: 25px;
      }
      .c-idType {
        width: 100%;
        height: 80px;
        margin-bottom: 45px;
        select {
          width: 100%;
          height: 100%;
          border: none;
          border: solid 1px #DDDDDD;
          outline: none;
          background-color: #fff;
          color: #24282E;
          font-size: 26px;
          padding-left: 20px;
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          background: url("../../image/full-arrowdown.png") no-repeat scroll center transparent;
          background-position-x: 600px;
          padding-right: 30px;
        }
      }
      .c-inputWarp {
        height: 80px;
        width: 100%;
        margin-bottom: 20px;
      }
      .c-address {
        height: 80px;
        width: 100%;
        margin-bottom: 30px;
      }
      .c-detailAddress {
        height: 160px;
        width: 100%;
        margin-bottom: 30px;
      }
      .upLoader {
        width: 300px;
        height: 300px;
        .van-uploader {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
          .van-uploader__input {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .footer {
      height: 170px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      button {
        height: 100px;
        width: 670px;
        outline: none;
        border: none;
        line-height: 100px;
        text-align: center;
        background-color: #4A7FE8;
        color: #FFFFFF;
        font-size: 30px;
        border-radius:10px;
      }
      .disabled-class{
        background: #ccc;
      }
    }
  }
}
</style>
<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../../style/base.less';
.register{
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
  .progress {
    .weui-progress {
      height: 100%;
      .weui-progress__bar {
        height: 100%;
        .weui-progress__inner-bar {
          background-color: #4A7FE8;
        }
      }
    }
  }
  .weui-cell {
    width: 100%;
    height: 100%;
    border: solid 1px #DDDDDD;
    padding-right: 30px;
    .weui-input {
      color: #24282E;
      font-size: 26px;
    }
    /* WebKit browsers */
    input::-webkit-input-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Mozilla Firefox 4 to 18 */
    input:-moz-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Mozilla Firefox 19+ */
    input::-moz-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Internet Explorer 10+ */
    input:-ms-input-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    .weui-icon-clear {
      font-size: 26px;
    }
  }
  .weui-cells {
    margin-top: 0;
  }
  .vux-cell-box {
    height: 80px;
    width: 100%;
    .weui-label {
      color: #AFB4BB;
      font-size: 26px;
    }
    .vux-popup-picker-select-box {
      margin-right: 20px;
      span {
        color: #AFB4BB;
        font-size: 26px;
      }
    }
    .weui-cell__ft:after{
      border-color: #AFB4BB !important;
      margin-top: -8px !important;
   }
  }
  .c-detailAddress .weui-cells {
    margin-top: 0;
    height: 160px;
    width: 100%;
    .weui-textarea {
      color: #AFB4BB;
      font-size: 26px;
      height: 100%;
      width: 100%;
    }
  }
  .van-checkbox {
    // width: 50px;
    // height: 50px;
    .van-checkbox__icon {
      width: 30px;
      height: 30px;
      .van-icon {
        width: 30px;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .van-cell {
    height: 100%;
    border: 1px solid #DDDDDD;
    .van-field__body {
      height: 100%;
      color: #24282E;
      font-size: 26px;
      /* WebKit browsers */
    input::-webkit-input-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Mozilla Firefox 4 to 18 */
    input:-moz-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Mozilla Firefox 19+ */
    input::-moz-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    /* Internet Explorer 10+ */
    input:-ms-input-placeholder {
    color: #AFB4BB;
    font-size: 26px;
    }
    }
  }
}
</style>
