<template>
  <view class="myheaders">
    <view class="vs v1" @click="goback(1)"><text class="iconfont icon-youjiantou"></text></view>
    <view class="vs v2"><slot name="t2"></slot></view>
    <view class="vs v3"><slot name="t3"></slot></view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
// 根据自己的需求设置导航栏的高度和行高即可
.myheaders,
.myheaders.v2 {
  height: 40px;
  line-height: 40px;
}
.myheaders {
  display: flex;
  .vs {
    display: flex;
    align-items: center;
    font-size: 14px;
    overflow: hidden;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .v1 {
    background: -pink;
    width: 25%;
    justify-content: flex-start;
    text {
      color: #fff;
      transform: rotate(180deg);
    }
  }
  .v2 {
    background: -orange;
    flex: 1;
    justify-content: center;
    display: inline-block;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
  }
  .v3 {
    background: -cyan;
    width: 25%;
    text-align: right;
    justify-content: flex-end;
  }
}
</style>
