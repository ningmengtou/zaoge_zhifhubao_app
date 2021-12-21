<template>
  <view class="uniBigBox">
    <!-- 搜索盒子的组件 开始 -->
    <view style="padding: 30rpx 0;width: 100%;display: flex;justify-content: center;align-items: center;font-size: 26rpx;color: #666;font-weight: 700;">
      友情提示：点击每个分类，可查看详情哦！
    </view>
    <!-- 搜索盒子的组件 结束 -->

    <!-- 商标分类45个 开始 -->
    <view class="trademarkClassify">
      <view class="banxin670 trademarkClassify2">
        <!-- /单条 -->
        <view class="itembox" v-for="(item, index) in classifyList" :key="index" @click="goToList(index)" v-if="index > 0">
          <image :src="baseimg + item.img"></image>
          <text class="oe">{{ item.tradeName }}</text>
        </view>
        <!-- 单条/ -->
      </view>
    </view>
    <!-- 商标分类45个 结束 -->
  </view>
</template>

<script>
import { jsonCategory } from '../../util/jsonCategory.js';
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      classifyList: jsonCategory.data
    };
  },
  onReady() {},
  onLoad() {},
  methods: {
    // 跳转到搜索列表页面
    goToQuery(obj) {
      uni.navigateTo({
        url: './trademarkClassifyQuery?idx=' + obj,
        animationType: 'pop-in',
        animationDuration: 300
      });
    },
    // 跳转到每个商标对应的列表页面
    goToList(idx) {
      uni.navigateTo({
        url: './trademarkList?idx=' + idx,
        animationType: 'pop-in',
        animationDuration: 300
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkClassify.scss';
// 黄老师把页面拆分成上下两部分
.uniBigBox {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .trademarkClassify {
    border-top: 1px solid #f5f5f5;
    padding-top: 30rpx;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
