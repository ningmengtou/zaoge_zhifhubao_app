<template>
  <view class="bigBox" :class="isMask ? 'hiden' : ''">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <view class="searchsBox"><searchs @searchFun2="searchFun3"></searchs></view>
    <view class="btn" @click="toLogin">{{ btnStr }}</view>
    <view class="main">
      <view class="sketchMap">
        <view class="top">
          <view class="title">商标状态查询示意图</view>
          <view class="time">2021-07-16更新</view>
        </view>
        <view class="tName">
          <text>商标名称</text>
          <view class="name">鱼爪</view>
        </view>
        <view class="more">
          <view class="number">
            <text>商标申请/注册号</text>
            <view class="key">鱼爪</view>
          </view>
          <view class="type">
            <text>商标类别</text>
            <view class="key">35类-广告销售</view>
          </view>
        </view>
      </view>
      <view class="process">
        <view class="processList"><unisteps :options="stepsOptions" direction="column" :active="stepsOptions.length - 1" active-color="#FFB32D"></unisteps></view>
      </view>
      <view class="save">查看更多</view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      stepsOptions: [
        {
          title: '商标注册申请',
          desc: '2018-06-30',
          message: '注册发文'
        },
        {
          title: '商标注册申请',
          desc: '2018-06-30',
          message: '注册发文'
        },
        {
          title: '商标注册公告',
          desc: '2018-06-30',
          message: '注册发文'
        },
        {
          title: '商标注册申请',
          desc: '2018-06-30',
          message: '注册发文'
        }
      ],
      // 是否遮罩
      isMask: false,
      btnStr: '请登录后查看',
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onShow() {
    if (this.phone) {
      this.btnStr = '搜索关键字查看';
    } else {
      this.btnStr = '请登录后查看';
    }
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone']),
    // 打开验证码弹窗组件
    openMask3() {
      this.isShowMask2 = true;
    },
    // 关闭验证码弹窗组件
    closeMask3() {
      this.isShowMask2 = false;
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
      this.btnStr = '搜索关键字查看';
    },
    // 点击去登录页面
    toLogin() {
      if (!this.phone) {
        // #ifdef H5
        this.btnStr = '搜索关键字查看';
        this.$layer('请在顶部搜索关键字吧');
        // #endif

        // #ifdef APP-PLUS
        this.jv.checkVerifyEnable(result => {
          // 如果没有开启数据流量,就弹出验证码弹窗组件
          if (result.enable === false) {
            this.openMask3();
            return false;
          } else {
            // 如果开启了数据流量，就直接极光一键登录授权
            this.jiguangUI();
            let that = this;
            this.jgLogin(this.jv, function(uncrypted) {
              that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
              that.btnStr = '搜索关键字查看';
            });
          }
        });
        // #endif
      } else {
        this.$layer('请在顶部搜索关键字吧');
      }
    },
    // 搜索框的提交事件
    searchFun3(keys) {
      if (keys == '' || keys == false) {
        this.$layer('请输入商标名');
        return false;
      }
      // #ifdef H5
      uni.redirectTo({
        url: '../trademarkQuery/trademarkQuery?option=0&keyword=' + keys
      });
      // #endif
      // #ifdef APP-PLUS
      if (this.phone) {
        uni.redirectTo({
          url: '../trademarkQuery/trademarkQuery?option=0&keyword=' + keys
        });
      } else {
        this.toLogin();
      }
      // #endif
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkStatus.scss';
</style>
