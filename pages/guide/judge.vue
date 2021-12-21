<template>
  <view></view>
</template>

<script>
export default {
  onLoad() {
    this.checkGuide();
  },
  methods: {
    checkGuide() {
      var storageTime = uni.getStorageSync('launchFlag');

	  if(storageTime) {
		  uni.switchTab({
		    url: '../index/index'
		  });
	  }else {
		  uni.setStorageSync('launchFlag','time')
		  uni.redirectTo({
		    url: './guide'
		  });
	  }
	  
   
    }
  }
};
</script>
