<template>
  <view v-if="vIfRes">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <view class="topDetail">
      <view class="left">
        <view class="ground">{{ paramsNo }}{{ paramsName }}</view>
        <view class="type">{{ type }}类-{{ typeStr }}</view>
      </view>
      <view class="right">
        <!-- /定位右侧的进度条 -->
        <view class="progressbox">
          <text class="number">{{ paramsNumber }}%</text>
          <progress class="progress" :percent="paramsNumber" activeColor="#1bae63" backgroundColor="#ddd" stroke-width="9" duration="10" active />
        </view>
        <!-- 定位右侧的进度条/ -->
      </view>
    </view>

    <view class="reg">
      <view class="smiley"><image :src="baseimg + 'smiley.png'"></image></view>
      <view class="text">太棒了！该群组没有同名近似商标 建议立即注册</view>
    </view>
    <view class="recommend">
      <view class="topTitle"><view class="title">其他推荐可注册类型</view></view>
      <view class="des">
        <view class="key">“{{ keyWords }}”</view>
        <text>在{{ type }}类推荐注册商品</text>
      </view>
      <view class="reganalyze">AI推荐成功率高达{{ paramsNumber }}%</view>
      <view class="recommendList">
        <view class="recommendItem" v-for="item in recommendList" :key="item.id">{{ item.group }} {{ item.name }}</view>
      </view>
    </view>

    <!-- 咨询按钮 开始 -->
    <view class="consultBtn" @click="loginBtn">咨询专业顾问</view>
    <!-- 咨询按钮 结束 -->
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
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      baseapi4: this.baseapi4, //全局定义接口路径
      paramsNumber: '',
      paramsNo: '',
      paramsName: '',
      keyWords: '',
      type: '',
      typeStr: '',
      recommendList: [],
      vIfRes: null,
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  onLoad(obj) {
    this.paramsNumber = JSON.parse(obj.params).number;
    this.paramsNo = JSON.parse(obj.params).no;
    this.paramsName = JSON.parse(obj.params).name;
    this.keyWords = JSON.parse(obj.params).keyWords;
    this.type = this.paramsNo.slice(0, 2);
    this.getData();
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
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
      // 本页面单独搞的……
      uni.navigateTo({
        url: '../index3/onlineService'
      });
    },
    getData() {
      uni.showLoading({
        title: '数据加载中...'
      });
      uni.request({
        url: this.baseapi4 + '/api/public/trademark-cate?type=first',
        data: {
          category: this.type
        },
        success: res => {
          this.typeStr = res.data.data[parseInt(this.type) - 1].name;
          console.log(this.typeStr);
          uni.request({
            url: this.baseapi4 + '/api/public/trademark-cate?type=second',
            data: {
              category: this.type
            },
            method: 'POST',
            success: res => {
              this.recommendList = res.data.data;
              this.vIfRes = res.data.data;
              uni.hideLoading();
            }
          });
        }
      });
    },
    // 一键登录
    loginBtn() {
      // #ifdef H5
      uni.showToast({
        title: 'H5端不支持登录',
        duration: 800,
        icon: 'none'
      });
      // #endif

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
            uni.navigateTo({
              url: '../index3/onlineService'
            });
          });
        }
      });
      // #endif

    }
  }
};
</script>

<style lang="scss">
.topDetail {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 40rpx;
  border-bottom: 20rpx solid #f2f4f5;
  border-top: 20rpx solid #f2f4f5;

  .left {
    .ground {
      font-size: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #1c2132;
      line-height: 34rpx;
      margin-bottom: 30rpx;
    }

    .type {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #969696;
      line-height: 30rpx;
    }
  }

  .right {
    width: 230rpx;

    .progressbox {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .number {
        font-size: 56rpx;
        font-family: DINAlternate-Bold, DINAlternate;
        font-weight: bold;
        color: #1bae63;
        line-height: 64rpx;
        margin-bottom: 15rpx;
      }

      .progress {
        width: 100%;
        height: 30rpx;
      }
    }
  }
}

.reg {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .smiley {
    width: 130rpx;
    height: 130rpx;
    margin: 60rpx 0 40rpx 0;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .text {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1c2132;
    line-height: 34rpx;
    margin-bottom: 60rpx;
  }
}

.recommend {
  width: 100%;
  padding: 0 40rpx;

  .topTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 36rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #1c2132;
      line-height: 34rpx;
    }

    .other {
      .icon {
        width: 24rpx;
        height: 22rpx;
      }

      text {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #134bfc;
        line-height: 34rpx;
      }
    }
  }

  .des {
    display: flex;
    align-items: flex-end;
    margin-top: 20rpx;

    .key {
      font-size: 48rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fc9c1f;
    }
  }

  .reganalyze {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1bae63;
    line-height: 34rpx;
    margin-top: 20rpx;
  }

  .recommendList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20rpx;

    .recommendItem {
      width: 50%;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #969696;
      line-height: 52rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.consultBtn {
  width: 670rpx;
  height: 76rpx;
  margin: 30rpx auto;
  background: linear-gradient(230deg, #297dfe 0%, #1247fc 100%);
  border-radius: 40rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 76rpx;
}
</style>
