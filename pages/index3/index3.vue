<template>
  <view class="uniBigBox">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 顾问列表 开始-->
    <view class="guwenList">
      <view class="banxin700"><adviserlist @ziXunKeFu2="ziXunKeFu2"></adviserlist></view>
    </view>
    <!-- 顾问列表 结束-->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      webUrl: 'https://www.zaoge.com/sbc.esp?kefu',
      baseimg: this.baseimg, //全局定义图片路径
      baseimg1: this.baseimg1, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad() {},
  onShow() {},
  computed: {
    ...mapState(['phone'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone']),
    // 打开验证码弹窗组件
    openMask3() {
      uni.hideTabBar();
      this.isShowMask2 = true;
    },
    // 关闭验证码弹窗组件
    closeMask3() {
      this.isShowMask2 = false;
      uni.showTabBar();
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
    },
    ziXunKeFu2() {
      // #ifdef H5
      uni.navigateTo({
        url: './onlineService'
      });
      // #endif

      // #ifdef APP-PLUS
      // 如果已经登录了那么就直接跳转客服不用极光授权了
      if (this.phone) {
        uni.navigateTo({
          url: './onlineService'
        });
        return false;
      }
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
            // ------------此页面单独写的东东
            if (uncrypted.length == 11) {
              uni.navigateTo({
                url: './onlineService'
              });
            } else {
              uni.showToast({
                title: '请登录后查看',
                icon: 'none',
                duration: 800
              });
            }
          });
        }
      });
      // #endif
    }
  }
};
</script>

<style lang="scss">
/* #ifdef H5 */
// 减去H5底部的tabbar所占高度(默认H5是50px)
.uniBigBox {
  min-height: calc(100vh - 50px);
  background-color: #f5f5f5;
}
/* #endif */
</style>
