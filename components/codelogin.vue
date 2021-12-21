<template>
  <view>
    <!-- 短信验证的遮罩层 开始 -->
    <view class="codeMask" v-show="isShowMask" @touchmove.prevent="stopScroll"></view>
    <!-- 短信验证的遮罩层 结束 -->
    <!-- 短信验证的表单层 开始 -->
    <view class="codeForm" v-show="isShowMask" @touchmove.prevent="stopScroll">
      <view class="codeForm2">
        <!-- 关闭按钮 -->
        <view class="iconfont icon-guanbi1 closeBtn" @click="closeMask"></view>
        <!-- logo -->
        <view class="logbox"><image :src="baseimg + 'logonew.png'"></image></view>
        <!-- 单条 -->
        <view class="inpbox inpbox1">
          <view class="fls">手机号</view>
          <view class="frs"><input type="text" placeholder-class="place" class="input" placeholder="请输入手机号" v-model="telmod" :focus="firstFocus1" /></view>
        </view>
        <!-- 单条 -->
        <view class="inpbox inpbox2">
          <view class="left">
            <view class="fls">验证码</view>
            <view class="frs"><input type="tel" placeholder-class="place" class="input" placeholder="验证码" v-model="codemod" :focus="firstFocus2" /></view>
          </view>
          <view class="right" :class="isShowCount === false ? '' : 'ifCountDown'">
            <text class="t1" @click="getCodeFun">获取验证码</text>
            <text class="t2">{{ setTime }} S后获取</text>
          </view>
        </view>
        <!-- 提交 -->
        <view class="subbox">
          <view class="comBtnBox"><view @click="loginFun">登录</view></view>
        </view>
      </view>
    </view>
    <!-- 短信验证的表单层 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '../util/request.js';
export default {
  props: {
    isShowMask: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      telmod: '', //手机号的值
      codemod: '', //验证码的值
      isShowCount: false, //true显示倒计时,false显示获取验证码
      setTime: 60, //倒计时数字效果
      clearTime: null, //清空定时器
      firstFocus1: false, //文本框聚焦
      firstFocus2: false //文本框聚焦
    };
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2', 'showauth', 'LoginBar'])
  },
  mounted() {},
  onReady() {},
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone', 'changeshowauth', 'changeLoginBar']),
    // 获取验证码事件
    async getCodeFun() {
      // 如果没有输入手机号不能获取验证码
      if (this.telmod.length != 11) {
        uni.showToast({
          title: '请正确填写手机号',
          duration: 500,
          icon: 'none',
          position: 'top' //position仅仅App生效
        });
        // 文本框聚焦
        this.firstFocus1 = false;
        setTimeout(() => {
          this.firstFocus1 = true;
        }, 0);
        return false;
      }
      let result = await request('/api.php?add_phone', {
        phone: this.telmod,
        type: this.msgCode1()
      });
      this.codeAjax(); //获取验证码请求
      this.codeCount(); //倒计时数字效果
    },
    // 登录表单事件
    loginFun() {
      this.loginCheck(); //登录校验
    },
    // 倒计时数字效果
    codeCount() {
      this.setTime = 60;
      this.isShowCount = true; //true显示倒计时,false显示获取验证码
      let tempTime = 60;
      this.clearTime = setInterval(() => {
        tempTime--;
        this.setTime = tempTime;
        if (tempTime < 10) {
          this.setTime = '0' + tempTime;
        }
        if (tempTime < 1) {
          this.isShowCount = false; //true显示倒计时,false显示获取验证码
          clearInterval(this.clearTime); //清空定时器
          return false;
        }
      }, 1000);
    },
    // 获取验证码请求
    codeAjax() {
      uni.request({
        url: this.baseapi + '/miniapi.esp?code',
        method: 'POST',
        data: {
          phone: this.telmod
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: res => {
          console.log('验证码res', res);
          if (res.data.success == true) {
            uni.showToast({
              title: '发送成功,请注意查收',
              duration: 800,
              icon: 'none',
              position: 'top' //position仅仅App生效
            });
          } else {
            uni.showToast({
              title: '发送失败,请稍后重试',
              duration: 800,
              icon: 'none',
              position: 'top' //position仅仅App生效
            });
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    // 登录校验
    loginCheck() {
      // 请正确填写手机号
      if (this.telmod.length != 11) {
        uni.showToast({
          title: '请正确填写手机号',
          duration: 500,
          icon: 'none',
          position: 'top' //position仅仅App生效
        });
        // 文本框聚焦
        this.firstFocus1 = false;
        setTimeout(() => {
          this.firstFocus1 = true;
        }, 0);
        return false;
      }
      // 请输入验证码
      if (this.isblank(this.codemod)) {
        uni.showToast({
          title: '请输入验证码',
          duration: 500,
          icon: 'none',
          position: 'top' //position仅仅App生效
        });
        // 文本框聚焦
        this.firstFocus2 = false;
        setTimeout(() => {
          this.firstFocus2 = true;
        }, 0);
        return false;
      }
      this.loginAjax();
    },
    // 登录请求
    loginAjax() {
      uni.request({
        url: this.baseapi + '/miniapi.esp?code_query',
        method: 'POST',
        data: {
          phone: this.telmod,
          code: this.codemod
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: async res => {
          console.log('登录res', res);
          if (res.data.success == false) {
            uni.showToast({
              title: '验证码不正确',
              duration: 500,
              icon: 'none',
              position: 'top' //position仅仅App生效
            });
            return false;
          } else {
            uni.showToast({
              title: '登录成功',
              duration: 800,
              icon: 'none',
              position: 'top' //position仅仅App生效
            });
            this.getPhone(this.telmod); //把手机号存入到vuex中
            uni.setStorageSync('telPhone', this.telmod); //把手机号存入到缓存中
            this.changeshowauth(false); // 去掉登录享受不限次数提示
            this.changeLoginBar(false); // 去掉登录享受不限次数提示
            let result = await request('/api.php?add_phone', {
              phone: this.telmod,
              type: this.msgCode2()
            });
            this.$emit('loginSuccess', this.telmod); //登录成功后传一个方法出去
            uni.showTabBar(); //登录成功后显示Tabbar
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    // 关闭遮罩清除文本框的值和定时器
    clearAll() {
      this.telmod = '';
      this.codemod = '';
      clearInterval(this.clearTime); //清空定时器
      this.isShowCount = false; //true显示倒计时,false显示获取验证码
    },
    // 打开遮罩
    openMask() {
      this.$emit('openMask2');
    },
    // 关闭遮罩
    closeMask() {
      this.$emit('closeMask2');
    }
  }
};
</script>

<style lang="scss">
// 定义单条文本框的高度
$inphei: 70rpx;
// 遮罩层和表单层是分开的
.codeMask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000001;
}
// 短信验证的表单
.codeForm {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  bottom: 0;
  z-index: 1000002;
  .codeForm2 {
    position: relative;
    width: 100%;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
    padding: 30rpx;
    border-radius: 10rpx;
    // 关闭按钮
    .closeBtn {
      position: absolute;
      right: 0;
      top: 0;
      width: 100rpx;
      height: 100rpx;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      font-size: 30rpx;
      color: #aaa;
    }
    // logo图片
    .logbox {
      width: 100%;
      display: flex;
      justify-content: center;
      image {
        border-radius: 20rpx;
        width: 180rpx;
        height: 50rpx;
      }
    }
    // 公共类
    .inpbox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 30rpx;
      &:first-child {
        margin-top: 0;
      }
      .fls {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 26rpx;
        color: #333;
        height: $inphei;
      }
      .frs {
        height: $inphei;
        .input {
          height: $inphei;
          line-height: $inphei;
          padding: 0 20rpx;
          font-size: 26rpx;
          color: #333;
        }
        .place {
          height: $inphei;
          line-height: $inphei;
        }
      }
    }
    // 1
    .inpbox1 {
      height: $inphei;
      border: 1px solid #eee;
      .fls {
        width: 150rpx;
        border-right: 1px solid #eee;
      }
      .frs {
        width: calc(100% - 150rpx);
      }
    }
    // 2
    .inpbox2 {
      .left {
        height: $inphei;
        border: 1px solid #eee;
        display: flex;
        width: 65%;
        .fls {
          width: 150rpx;
          border-right: 1px solid #eee;
        }
        .frs {
          width: calc(100% - 150rpx);
        }
      }
      .right {
        width: 30%;
        text {
          height: $inphei;
          line-height: $inphei;
          font-size: 26rpx;
          color: #007aff;
          border-radius: 10rpx;
          text-align: center;
          border: 1px solid #007aff;
          height: $inphei;
          line-height: $inphei;
        }
        .t1 {
          display: block;
        }
        .t2 {
          display: none;
        }
      }
      // 如果是倒计时
      .ifCountDown {
        .t1 {
          display: none;
        }
        .t2 {
          display: block;
          color: #bbb;
          border: 1px solid #bbb;
        }
      }
    }
    // 提交
    .subbox {
      padding-top: 50rpx;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .comBtnBox {
        view {
          height: $inphei;
          border-radius: $inphei;
          width: 70%;
        }
      }
    }
  }
}
</style>
