<template>
  <view class="uniBigBox"><web-view :src="webUrl"></web-view></view>
</template>

<script>
export default {
  data() {
    return {
      webUrl: 'https://www.zaoge.com/sbc.esp?kefu'
    };
  },
  onReady() {},
  onLoad() {},
  methods: {}
};
</script>

<style lang="scss"></style>
