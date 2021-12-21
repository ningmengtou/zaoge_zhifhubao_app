<template>
  <view class="serviceList">
    <view class="serviceItem" v-for="(item, index) in serviceArr" :key="index" @click="goToDetail(item.id, item.img)">
      <view class="imgbox"><image class="imgcov" :src="$baseImg + item.img" mode="widthFix"></image></view>
      <view class="titbox oe">{{ item.title }}</view>
      <view class="descbox oe">{{ item.descipt }}</view>
      <view class="pricebox">{{ item.price }}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'servicelist',
  props: {
    serviceList: {
      type: Array
    }
  },
  data() {
    return {
      serviceArr: []
    };
  },
  methods: {
    goToDetail(id, img) {
      uni.navigateTo({
        url: `./serviceDetail?id=${id}&img=${img}`
      });
    }
  }
};
</script>

<style lang="scss">

</style>