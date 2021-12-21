<template>
  <view class="feedBackBox">
    <input type="text" class="inpClass" placeholder-class="placeClass" placeholder="请用一句话描述你的问题" v-model="iptVal" />
    <textarea class="areaClass" placeholder="请对你的问题做出阐述" v-model="textareaVal" />
    <view class="comBtnBox"><view @click="feedBack">提交反馈</view></view>
  </view>
</template>

<script>
import { request } from '../../util/request.js';
export default {
  data() {
    return {
      iptVal: '',
      textareaVal: ''
    };
  },
  methods: {
    feedBack() {
      if (!this.iptVal) {
        uni.showToast({
          title: '请填写问题',
          duration: 800,
          icon: 'none',
          position: 'top'
        });
        return false;
      }
      if (!this.textareaVal) {
        uni.showToast({
          title: '请填写阐述',
          duration: 800,
          icon: 'none',
          position: 'top'
        });
        return false;
      }
      uni.showToast({
        title: '感谢您的反馈',
        success: () => {
          this.iptVal = '';
          this.textareaVal = '';
        }
      });
    }
  }
};
</script>

<style lang="scss">
.feedBackBox {
  width: 100%;
  padding: 40rpx;
  .inpClass,
  .placeClass {
    height: 90rpx;
    line-height: 90rpx;
  }
  .inpClass {
    display: block;
    width: 100%;
    padding: 0 40rpx;
    border: 1px solid #eee;
    border-radius: 15rpx;
    margin-bottom: 40rpx;
    font-size: 26rpx;
    color: #333;
  }
  .areaClass {
    line-height: 40rpx;
    font-size: 26rpx;
    color: #333;
    display: block;
    width: 100%;
    padding: 20rpx;
    min-height: 400rpx;
    border: 1px solid #eee;
    border-radius: 15rpx;
    margin-bottom: 50rpx;
  }
}
</style>
