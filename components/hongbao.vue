<template>
  <view class="hongbaoMask" v-if="isBaoBox" @touchmove.prevent="stopScroll">
    <view class="marks " v-if="baoShow" @touchmove.prevent="stopScroll">
      <view class="baoBox">
        <view class="hongbao" @click="getAuthorize"><image :src="baseimg + 'hongbao1.png'" class="img"></image></view>
        <view class="close" @click="closeClick"><image :src="baseimg + 'baoClose.png'" class="img"></image></view>
      </view>
    </view>
    <view class="small" v-if="smallShow" @click="open"><image :src="baseimg + 'smallBao.png'" class="img"></image></view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      baseimg: this.baseimg,
      src1: 'hongbao1.png',
      smallShow: false
    };
  },
  onLoad() {
    let phone = uni.getStorageSync('telPhone');
    if (baoShow) {
      this.smallShow = false;
    } else {
      this.smallShow = true;
    }

    if (phone) {
      this.isBaoBoxFalse();
    } else {
      this.isBaoBoxTrue();
    }
  },

  methods: {
    ...mapMutations(['baoShowTrue', 'baoShowFalse', 'isBaoBoxTrue', 'isBaoBoxFalse', 'isBaoBoxFalse']),
    closeClick() {
      this.baoShowFalse();

      if (this.baoShow) {
        // this.baoShowFalse()
        this.smallShow = false;
      } else {
        this.smallShow = true;
      }

      uni.showTabBar();
    },
    // 授权
    async getAuthorize() {
      console.log(111);
      this.$emit('clickHongbao');
      // 			let phoneNumber = await this.authorizePhone()

      // 			if(phoneNumber.length === 11) {
      // 				this.src1 = 'https://public.yuzhua.com/zaoge/xcx_tmimg/hongbao2.png'

      // 				uni.showToast({
      // 					title:'恭喜你获取红包'
      // 				})

      // 				setTimeout(()=>{
      // 					this.baoShowFalse()
      // 					this.smallShow = false
      // 					uni.showTabBar()
      // 				},2000)
      // 				this.isBaoBoxFalse()
      // 			}
    },
    // 点击小红包
    open() {
      this.baoShowTrue();
      this.smallShow = false;
      uni.hideTabBar();
    }
  },
  computed: {
    ...mapState(['baoShow', 'isBaoBox'])
  }
};
</script>

<style scoped lang="scss">
.marks {
  position: fixed;
  width: 100%;
  z-index: 16;
  overflow: hidden;
  height: 100vh;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000001;
  .baoBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .hongbao {
      background-color: transparent !important;
      width: 606rpx;
      height: 720rpx;
      .img {
        display: inline-block;
        width: 606rpx;
        height: 720rpx;
      }
    }
    .btncss {
      display: block;
      padding: 0;
      margin: 0;
      border: none;
    }
    .close {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -30rpx;
      .img {
        width: 64rpx;
        height: 128rpx;
      }
    }
  }
}
.small {
  position: fixed;
  width: 120rpx;
  height: 120rpx;
  right: 20rpx;
  bottom: 150rpx;
  overflow: hidden;
  z-index: 16;
  animation: myfirst 2s infinite linear alternate;
  transform-origin: center 50%;
  .img {
    width: 100%;
    height: 100%;
  }
}

@keyframes myfirst {
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(-7deg);
  }
  66% {
    transform: rotate(7deg);
  }
}
</style>
