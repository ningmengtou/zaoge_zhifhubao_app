<template>
  <view class="uniBigBox">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->
	
	
	<!-- 固定在页面右侧的客服组件 开始 -->
	<kefu></kefu>
	<!-- 固定在页面右侧的客服组件 结束 -->

    <!-- 登录 -->
    <view class="loginBox bgcov" :style="{ background: `url(${baseimg + 'mineMengban.png'}) #333`}">
      <view class="header"><image :src="baseimg1 + 'defaultHeader.png'"></image></view>
      <view class="noLogin" v-show="!isLogin" @click="loginBtn">
        <text class="noLoginText">未登录</text>
        <image :src="baseimg1 + 'mineLogin.png'" class="loginBtn"></image>
      </view>
      <view class="Login" v-show="isLogin">
        <view class="topTitle">{{ $hidePhone(myPhone) }}</view>
        <view class="bottomTitle">
          <view class="vip">早鸽会员</view>
          <image :src="baseimg1 + 'mineVIP.png'"></image>
        </view>
      </view>
    </view>

    <!-- tab选择 -->
    <view class="tabBox" style="display: none;">
      <view class="tabItem">
        <image :src="baseimg1 + 'mineTab1.png'"></image>
        <view class="text">浏览足迹</view>
      </view>
      <view class="tabItem">
        <image :src="baseimg1 + 'mineTab2.png'"></image>
        <view class="text">收藏</view>
      </view>
      <view class="tabItem">
        <image :src="baseimg1 + 'mineTab3.png'"></image>
        <view class="text">消息中心</view>
      </view>
    </view>

    <!-- 图片 -->
    <view class="guanggao"><image :src="baseimg1 + 'mineGG.png'"></image></view>

    <!-- 常用功能 -->
    <view class="funcs">
      <view class="topTitle">常用功能</view>
      <view class="funcList">
        <view class="funcItem" @click="gopage('./userAgreement')">
          <view class="left">
            <image :src="baseimg1 + 'func1.png'"></image>
            <text>用户协议</text>
          </view>
          <view class="right"><image :src="baseimg1 + 'mineRight.png'"></image></view>
        </view>
        <view class="funcItem" @click="gopage('./privacyClause')">
          <view class="left">
            <image :src="baseimg1 + 'func2.png'"></image>
            <text>隐私政策</text>
          </view>
          <view class="right"><image :src="baseimg1 + 'mineRight.png'"></image></view>
        </view>
        <view class="funcItem" @click="gopage('./feedBack')">
          <view class="left">
            <image :src="baseimg1 + 'func3.png'"></image>
            <text>产品反馈</text>
          </view>
          <view class="right"><image :src="baseimg1 + 'mineRight.png'"></image></view>
        </view>
        <view class="funcItem" @click="gopage('./logoutService')">
          <view class="left">
            <image :src="baseimg1 + 'func4.png'"></image>
            <text>注销服务</text>
          </view>
          <view class="right"><image :src="baseimg1 + 'mineRight.png'"></image></view>
        </view>
      </view>
    </view>

    <view class="loginOut" @click="signOut" v-show="isLogin">退出登录</view>
	
	

  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request,requestZhiqi } from '../../util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径

      myPhone: '', //登录成功后存储的手机号码
      isLogin: false, //判断是否登录
      vuexTel: '', //存储在vuex中的客服电话
      isShowMask2: false, //打开验证码弹窗组件
      version: '1.0.0',
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad() {
    this.vuexTel = this.hotLine;
    // #ifdef APP-PLUS
    plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
      this.version = wgtinfo.version;
    });
    // #endif
	
	
  },
  onReady() {},
  onShow() {
    // #ifdef APP-PLUS
    if (this.phone) {
      this.myPhone = this.phone; //把用户的手机号显示在页面上
      this.isLogin = true; //隐藏未登录框，显示已经登录框
    } else {
      // 从注销服务页面调过来要清空所有数据
      this.clearPhone();
      this.myPhone = '';
      uni.removeStorageSync('telPhone');
      this.isLogin = false;
    }
    // #endif
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'tabIndex'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone', 'changeTabIndex']),
    // 打开验证码弹窗组件
    openMask3() {
      this.isShowMask2 = true;
      uni.hideTabBar();
    },
    // 关闭验证码弹窗组件
    closeMask3() {
      this.isShowMask2 = false;
      uni.showTabBar();
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
      // 本页面单独搞的
      this.isLogin = true; //显示页面登录框
      this.myPhone = option; //显示页面手机号
    },

    // 商标搜索
    toIndex() {
      this.changeTabIndex(0);
      uni.switchTab({
        url: '../index/index'
      });
    },
    // 标源搜素
    toIndex2() {
      uni.switchTab({
        url: '../index2/index2'
      });
    },
    // 退出登录
    signOut() {
      if (this.myPhone) {
        uni.showModal({
          content: '确定要退出吗？',
          success: res => {
            if (res.confirm) {
              this.clearPhone();
              this.myPhone = '';
              uni.removeStorageSync('telPhone');
              this.isLogin = false;
            } else if (res.cancel) {
              return false;
            }
          }
        });
      }
    },
    // 在线客服
    onlineKefu() {
      // #ifdef APP-PLUS
      // 如果已经登录了那么就直接跳转客服不用极光授权了
      if (this.phone) {
        uni.navigateTo({
          url: '../index3/onlineService'
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
                url: '../index3/onlineService'
              });
            } else {
              this.$layer('请登录后查看');
            }
          });
        }
      });
      // #endif
    },
    // 一键登录
    loginBtn() {
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
            if (uncrypted == 6002) {
              // 取消登录
              return false;
            }
            that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
            that.myPhone = uncrypted; // ------------此页面单独写的东东
            that.isLogin = true; // ------------此页面单独写的东东
          });
        }
      });
      // #endif
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/static/css/index4.scss';
.uniBigBox {
  background-color: #f5f5f5;
  padding-bottom: 0;
  .loginBox {
    box-sizing: border-box;
    padding: 140rpx 0 60rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    .header {
      width: 160rpx;
      height: 160rpx;
      margin-right: 30rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .noLogin {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 480rpx;
      height: 160rpx;
      .loginBtn {
        width: 168rpx;
        height: 56rpx;
      }
      .noLoginText {
        font-size: 48rpx;
        font-weight: bold;
        line-height: 66rpx;
        color: #ffffff;
        opacity: 1;
      }
    }
    .Login {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 480rpx;
      height: 160rpx;
      .topTitle {
        font-size: 48rpx;
        font-weight: bold;
        line-height: 66rpx;
        color: #ffffff;
        opacity: 1;
      }
      .bottomTitle {
        display: flex;
        align-items: center;
        .vip {
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: #ffd698;
          opacity: 1;
          margin-right: 20rpx;
        }
        image {
          width: 64rpx;
          height: 32rpx;
        }
      }
    }
  }

  .tabBox {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 690rpx;
    height: 150rpx;
    background: linear-gradient(180deg, #363a5d 0%, #555882 100%);
    border-radius: 20rpx;
    margin: auto;
    margin-top: -90rpx;
    .tabItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 25rpx;
      image {
        width: 72rpx;
        height: 72rpx;
        margin-bottom: 10rpx;
      }
      .text {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #ffffff;
        opacity: 1;
      }
    }
  }

  .guanggao {
    width: 690rpx;
    height: 160rpx;
    margin: 30rpx auto;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .funcs {
    width: 690rpx;
    margin: auto;
    background-color: #fff;
    border-radius: 20rpx;
    .topTitle {
      padding: 25rpx;
      border-bottom: 1px solid #f5f5f5;
      font-size: 32rpx;
      font-weight: 600;
      line-height: 44rpx;
      color: #2a2c43;
      opacity: 1;
    }
    .funcList {
      .funcItem {
        width: 100%;
        padding: 0 20rpx;
        height: 90rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f5f5f5;
        .left {
          display: flex;
          align-items: center;
          margin-right: 15rpx;
          text {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: #2a2c43;
            opacity: 1;
          }
          image {
            width: 68rpx;
            height: 68rpx;
          }
        }
        .right {
          width: 44rpx;
          height: 44rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .loginOut {
    width: 690rpx;
    height: 88rpx;
    background: $thecol;
    border-radius: 8rpx;
    margin: 40rpx auto;
    font-size: 28rpx;
    font-weight: 400;
    line-height: 88rpx;
    color: #ffffff;
    text-align: center;
  }
}
</style>
