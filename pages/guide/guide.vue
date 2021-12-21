<template>
  <view class="guideBigBox">
    <!-- 在每个页面都显示“跳过启动”的按钮 开始 -->
    <view class="skipStartup" @click="launchApp">
      <text class="text1">跳过</text>
      <text class="text2">0{{ msgNumber }}</text>
    </view>
    <!-- 在每个页面都显示“跳过启动”的按钮 结束 -->

    <!-- 在第3屏显示“立即体验”的按钮 开始 -->
    <block v-if="nowIndex == 2"><view class="nowExperience" @click="launchApp"></view></block>
    <!-- 在第3屏显示“立即体验”的按钮 结束 -->

    <view class="guideBigBox2">
      <swiper class="swiper" :autoplay="false" :interval="1000" :duration="800" @change="swiperChange">
        <swiper-item class="swiper-item" v-for="(item, index) in imageList" :key="index"><image :src="item" /></swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      imageList: ['https://public.yuzhua.com/zaoge/xcx_tmimg/bg1.png', 'https://public.yuzhua.com/zaoge/xcx_tmimg/bg2.png', 'https://public.yuzhua.com/zaoge/xcx_tmimg/bg3.png'],
      nowIndex: 0,
      isAutoplay: true,
      msgNumber: 5,
      setTime: null
    };
  },
  onInit() {},
  onReady() {
    let cTime = 5;
    this.setTime = setInterval(() => {
      if (cTime == 1) {
        clearInterval(this.setTime);
        uni.switchTab({
          url: '../index/index'
        });
        return false;
      } else {
        cTime--;
        this.msgNumber = cTime;
      }
    }, 1000);
  },
  methods: {
    //跳过引导页,储存本地值,下次进入直接跳过
    launchApp() {
      clearInterval(this.setTime); //清除定时器
      uni.switchTab({
        url: '../index/index'
      });
    },
    // 图片轮播的切换事件
    swiperChange(event) {
      this.nowIndex = event.detail.current;
      if (this.nowIndex == 0) {
        console.log('第1屏');
      }
      if (this.nowIndex == 1) {
        console.log('第2屏');
      }
      if (this.nowIndex == 2) {
        console.log('第3屏');
      }
    }
  }
};
</script>

<style lang="scss">
.guideBigBox {
  position: relative;
  .guideBigBox2 {
    .swiper {
      height: 100vh;
      .swiper-item {
        height: 100vh;
        image {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
// 立即体验
.nowExperience {
  position: absolute;
  width: 100rpx;
  height: 200rpx;
  z-index: 10;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  bottom: 120rpx;
  background: none;
}
// 跳过按钮
.skipStartup {
  position: fixed;
  justify-content: space-evenly;
  align-items: center;
  display: inline-flex;
  height: 60rpx;
  border-radius: 60rpx;
  box-sizing: border-box;
  z-index: 10;
  padding: 0 30rpx;
  top: 60rpx;
  right: 30rpx;
  overflow: hidden;
  border: 1px solid #fff;
  text {
    color: #fff;
    font-size: 26rpx;
    padding-left: 10rpx;

    &:first-child {
      padding-left: 0;
    }
  }
}
</style>
