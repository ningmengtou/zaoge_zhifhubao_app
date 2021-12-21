<template>
  <view class="tabListBox">
    <view class="tabItem" :class="tabIndex === index ? 'on' : 'off'" v-for="(item, index) in tabSwitchArr" :key="index" @click="tabChange(index)">
      <text>{{ item }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'tabswitch',
  data() {
    return {
      tabIndex: 0,
      tabSwitchArr: ['商标注册', '信息变更', '商标异议', '初审维权', '侵权检测', '法律服务']
    };
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index;
      this.$emit('changeTab', index);
    }
  }
};
</script>

<style lang="scss">
.tabListBox {
  width: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  text-align: justify;
  display: flex;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
  .tabItem {
    display: inline-block;
    border: 0px solid orange;
    padding-left: 20rpx;
    &:first-child {
      padding-left: 0;
    }
    text {
      background: #f5f5f5;
      font-size: 26rpx;
      color: #666;
      position: relative;
      padding: 0 20rpx;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 60rpx;
    }
  }
  .tabItem.on {
    text {
      background: #0763e1;
      color: #fff;
    }
  }
}
</style>
