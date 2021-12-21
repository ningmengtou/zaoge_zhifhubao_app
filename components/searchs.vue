<template>
  <!-- 搜索盒子 开始 -->
  <view class="searchBox searchBoxAliPay">
    <view class="banxin670 searchBox2">
      <view class="fls">
        <text class="iconfont icon-sousuo"></text>
        <input
          class="input"
          type="text"
          :focus="searchFocus"
          placeholder-class="place"
          :placeholder="placeholderText"
          :value="searchVal"
          confirm-type="search"
          @input="inputEvent"
          @confirm="searchFun"
        />
      </view>
      <view class="frs" @click="searchFun">搜索</view>
    </view>
  </view>
  <!-- 搜索盒子 结束 -->
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    // keywords: {
    //   type: String,
    //   default: ''
    // },
    placeholderText: {
      type: String,
      default: '请输入商标名'
    }
  },
  data() {
    return {
      searchFocus: false,
      searchVal: '',
      baseimg: this.baseimg //全局定义图片路径
    };
  },
  created() {
    this.searchVal = this.transKey;
  },
  methods: {
    searchFun() {
      if (this.isblank(this.searchVal)) {
        // 1.聚焦
        this.searchFocus = false;
        setTimeout(() => {
          this.searchFocus = true;
        }, 0);
        // 2.弹窗
        uni.showToast({
          title: '请输入关键字',
          duration: 500,
          icon: 'none',
          position: 'top' //position仅仅App生效
        });
        return false;
      }
      // 3.映射
      this.$emit('searchFun2', this.searchVal);
    },
    inputEvent(e) {
      this.searchVal = e.detail.value;
      this.$emit('inputEvent', this.searchVal);
    }
  },
  computed: {
    ...mapState(['transKey'])
  }
};
</script>

<style lang="scss">
// 搜索盒子
.searchBox {
  .searchBox2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fls,
    .frs {
      height: 80rpx;
      display: flex;
      align-items: center;
    }
    .fls {
      position: relative;
      width: 590rpx;
      background: #eff0f2;
      .iconfont {
        width: 30px;
        position: absolute;
        left: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        color: #989898;
        font-size: 14px;
      }
      .input {
        font-size: 24rpx;
        width: 100%;
        height: 100%;
        padding-left: 80rpx;
        padding-right: 50rpx;
        color: #333;
        height: 80rpx;
        line-height: 80rpx;
      }
      .place {
        height: 80rpx;
        line-height: 80rpx;
        color: #989898;
      }
    }
    .frs {
      width: calc(100% - 590rpx);
      font-size: 26rpx;
      color: $thecol;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
// 对支付宝小程序的兼容处理
/*#ifdef MP-ALIPAY*/
.searchBoxAliPay {
  .searchBox2 {
    .fls {
      // background: pink !important;
      .input {
        background: #eff0f2 !important;
      }
    }
  }
}
/*#endif*/
</style>
