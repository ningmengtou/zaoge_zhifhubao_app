<template>
  <view class="uniBigBox">
    <view class="banxin690 uniBigBox2">
      <!-- 1 -->
      <view class="topbox">很遗憾，早鸽商标查询无法继续为您提供服务，感谢你一直以来的陪伴。注销账号前，早鸽商标查询团队将进行以下验证，以保证您的账号、财产安全：</view>
      <!-- 2 -->
      <view class="listbox">
        <view class="itembox">
          <text class="t1">账号当前为有效状态</text>
          <text class="t2">当前账户可以正常使用，近两周内没有进行改密、改绑等敏感操作。</text>
        </view>
        <view class="itembox">
          <text class="t1">账号无任何纠纷</text>
          <text class="t2">当前账户必须无任何纠纷。</text>
        </view>
      </view>
      <!-- 3 -->
      <view class="checkbox">
        <view class="fls" @click="checkFun"><checkbox value="cb" :checked="isChecked" style="transform:scale(0.5)" /></view>
        <view class="frs" @click="gopage('./logoutHtml')">
          <text class="t1">申请注销即表示您自愿放弃早鸽商标查询内所有虚拟资产并同意</text>
          <text class="t2">《早鸽商标查询账号注销须知》</text>
        </view>
      </view>
      <!-- 4 -->
      <view class="applybox">
        <view class="comBtnBox"><view :class="checkBolen == true ? 'on' : 'off'" @click="applyFun">申请注销</view></view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isChecked: false,
      checkBolen: false
    };
  },
  computed: {
    ...mapState(['phone', 'logoutCount'])
  },
  onShow() {},
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone', 'logoutClick']),
    // 校验是否选中了复选框
    checkFun() {
      this.isChecked = !this.isChecked;
      this.checkBolen = !this.checkBolen;
    },
    // 申请注销的提交按钮
    applyFun() {
      // 1.点击了一次就提示已经点击过了
      if (this.logoutCount > 1) {
        uni.showToast({
          title: '您已经提交过申请了,请耐心等待哦~',
          duration: 800,
          icon: 'none'
        });
        return false;
      }
      // 2.请先同意须知
      if (this.checkBolen == false) {
        uni.showToast({
          title: '请先同意须知',
          duration: 800,
          icon: 'none'
        });
        return false;
      }
      // 3.注销服务次数，点击了一次就提示已经点击过了
      this.logoutClick();
      console.log('注销服务点击次数', this.logoutCount);
      // 4.所有验证通过
      // 4-1.提示弹窗
      uni.showToast({
        title: '请等待人工审核',
        duration: 1500,
        icon: 'success' //显示成功图标，此时title文本最多显示7个汉字长度
      });
      // 4-2.页面跳转
      setTimeout(() => {
        uni.switchTab({
          url: './index4'
        });
      }, 1500);
    }
  }
};
</script>

<style lang="scss">
.uniBigBox {
  background: #f5f5f5;
  .uniBigBox2 {
    padding: 50rpx 0;
    // 1
    .topbox {
      text-indent: 2em;
      font-size: 26rpx;
      color: #999;
      text-align: justify;
      line-height: 40rpx;
    }
    // 2
    .listbox {
      padding-top: 50rpx;
      .itembox {
        background: #fff;
        border-radius: 8rpx;
        overflow: hidden;
        margin-top: 30rpx;
        padding: 30rpx;
        box-shadow: 0 0 10rpx rgba(100, 100, 100, 0.1);
        &:first-child {
          margin-top: 0;
        }
        text {
          display: block;
          width: 100%;
        }
        .t1 {
          font-size: 28rpx;
          font-weight: 700;
          color: #333;
          padding-bottom: 10rpx;
        }
        .t2 {
          text-align: justify;
          line-height: 40rpx;
          font-size: 24rpx;
          color: #999;
        }
      }
    }
    // 3
    .checkbox {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 80rpx 10% 30rpx;
      .fls {
        width: 10%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
      }
      .frs {
        width: 90%;
        text {
          display: inline;
          text-align: justify;
          line-height: 40rpx;
          font-size: 24rpx;
        }
        .t1 {
          color: #999;
        }
        .t2 {
          color: $thecol;
        }
      }
    }
    // 4
    .applybox {
      .comBtnBox {
        .off {
          background: #ddd;
        }
      }
    }
  }
}
</style>
