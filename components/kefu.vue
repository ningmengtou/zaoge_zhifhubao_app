<template>
 
  <!-- 固定在页面右侧的客服组件 开始 -->
  <view class="fixKeFu" @click="gopage('/pages/index3/index3','tabbar')"><image class="image" :src="baseimg1 + 'fixkefu.png'"></image></view>
  <!-- 固定在页面右侧的客服组件 结束 -->
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss">
.fixKeFu {
  position: fixed;
  right: 0;
  bottom: 15%;
  z-index: 100000;
  .image {
    width: 59rpx;
    height: 231rpx;
  }
}
</style>
