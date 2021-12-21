<template>
  <view>
    <!-- 第一层 -->
    <view class="mask" v-show="maskShow" @touchmove.prevent="stopScroll" @click="closeMask"></view>
    <!-- 第二层 -->
    <view class="contactBox" v-show="maskShow">
      <view class="title">请选择您要联系的客服</view>
      <view class="text">我们根据选择为您提供服务</view>
	  <!-- #ifdef APP-PLUS || H5 -->
      <view class="official kefuBox" :class="currentBox == 1 ? 'active' : ''" @click="activeClick(1)">
        <image :src="baseimg + 'erji.png'" class="icon"></image>
        <view class="selectText">
          <view class="topText">在线客服</view>
          <view class="bottomText">竭诚为您服务～！</view>
        </view>
      </view>
	  <!-- #endif -->
      <view class="phone kefuBox" :class="currentBox == 2 ? 'active' : ''" @click="activeClick(2)">
        <image :src="baseimg + 'laugh.png'" class="icon"></image>
        <view class="selectText">
          <view class="topText">电话客服</view>
          <view class="bottomText">400-902-9915</view>
        </view>
      </view>
      <view class="btn" @click="sureBtn">确定</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'contact',
  props: {
    maskShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentBox: 1,
	  baseimg: this.baseimg, //全局定义图片路径
    };
  },
  methods: {
    closeMask() {
      this.$emit('closeMask');
      this.currentBox = 1;
    },
    activeClick(index) {
      this.currentBox = index;
    },
    sureBtn() {
      this.$emit('changeMaskShow', this.currentBox);
      this.currentBox = 1;
    }
  }
};
</script>

<style lang="scss">
.mask {
  height: 100vh;
  width: 100%;
  background: #616263;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.contactBox {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600rpx;
  padding: 0 22rpx;
  background: #fff;
  border-radius: 10rpx;
  z-index: 1000;
  .title {
    font-size: 40rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #3f3f3f;
    line-height: 56rpx;
    margin-top: 72rpx;
  }
  .text {
    font-size: 24rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #656565;
    line-height: 34rpx;
    margin: 10rpx 0 45rpx 0;
  }
  .kefuBox {
    display: flex;
    align-items: center;
    width: 500rpx;
    height: 150rpx;
    background: #ffffff;
    box-shadow: 0rpx 10rpx 26rpx 0rpx rgba(234, 234, 234, 1);
    border-radius: 8rpx;
    margin-bottom: 22rpx;
    .icon {
      width: 92rpx;
      height: 92rpx;
      margin: 0 25rpx 0 45rpx;
    }
    .selectText {
      height: 92rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .topText {
        font-size: 32rpx;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #3f3f3f;
        line-height: 44rpx;
      }
      .bottomText {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #979797;
        line-height: 40rpx;
      }
    }
  }
  .active {
    background: url(https://public.yuzhua.com/zaoge/xcx_tmimg/bind.png) no-repeat center center;
    background-size: 100% 100%;
    border: none;
  }
  .btn {
    width: 420rpx;
    height: 80rpx;
    background: linear-gradient(230deg, #297dfe 0%, #1247fc 100%);
    border-radius: 39rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 80rpx;
    margin: 50rpx 0;
  }
}
</style>
