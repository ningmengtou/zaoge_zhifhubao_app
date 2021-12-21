<template>
  <!-- 没有数据的盒子 开始 -->
  <view class="errContainer">
    <view class="imgbox"><image :src="baseimg + 'nodata.png'"></image></view>
    <view class="textbox">
      <view class="v1 oe">{{ tit1 }}</view>
      <view class="v2 dot2">{{ tit2 }}</view>
    </view>
    <view class="comBtnBox">
      <view @click="refreshFun">{{ btntxt }}</view>
    </view>
    <!-- <view class="backbox"><text @click="gopage('../index/index', 'tabbar')">回到主页?</text></view> -->
  </view>
  <!-- 没有数据的盒子 结束 -->
</template>

<script>
export default {
  props: {
    tit1: {
      type: String,
      default: '暂无数据'
    },
    tit2: {
      type: String,
      default: '请重新搜索关键字或重新选择搜索'
    },
    btntxt: {
      type: String,
      default: '刷新'
    }
  },
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi //全局定义接口路径
    };
  },
  onReady() {},
  onLoad() {},
  methods: {
    refreshFun() {
      this.$emit('refreshFun2');
    }
  }
};
</script>

<style lang="scss">
.errContainer {
  padding-top: 200rpx;
  width: 100%;
  border: 0px solid red;
  text-align: center;
  .imgbox {
    image {
      width: 360rpx;
      height: 206rpx;
    }
  }
  .textbox {
    padding: 20rpx 0;
    text-align: center;
    width: 80%;
    margin: 0 auto;
    .v1 {
      text-align: center;
      font-size: 32rpx;
      color: #333;
      padding-bottom: 20rpx;
    }
    .v2 {
      text-align: center;
      font-size: 24rpx;
      color: #999;
      padding-bottom: 20rpx;
    }
  }
  .comBtnBox {
    view {
      width: 240rpx;
      height: 72rpx;
      border-radius: 72rpx;
    }
  }
  .backbox {
    padding-top: 25rpx;
    width: 100%;
    text-align: center;
    text {
      padding: 25rpx 50rpx 50rpx 50rpx;
      border: 0px solid red;
      font-size: 28rpx;
      color: #1247fc;
    }
  }
}
</style>
