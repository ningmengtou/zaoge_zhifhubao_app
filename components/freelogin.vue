<template>
  <!-- 登录享不限查询次数 开始 -->
  <view class="loginCountBox" v-if="isshowauth" @click="loginBtn">
    <view class="banxin690 loginCountBox2">
      <view class="fls">登录享不限查询次数</view>
      <view class="frs">授权登录</view>
    </view>
  </view>
  <!-- 登录享不限查询次数 结束 -->
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '@/util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  props: {
    isshowauth: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  created() {},
  methods: {
    ...mapMutations(['changeshowauth', 'changeLoginBar', 'getPhone']),
    loginBtn() {
      // #ifdef APP-PLUS
      this.jv.checkVerifyEnable(result => {
        // 如果没有开启数据流量,就弹出验证码弹窗组件
        if (result.enable === false) {
          this.$emit('loginCodeLayer');
          return false;
        } else {
          // 如果开启了数据流量，就直接极光一键登录授权
          this.jiguangUI();
          let that = this;
          this.jgLogin(this.jv, function(uncrypted) {
            if (uncrypted == 6002) {
              // 取消登录
              return false;
            }
            that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
            that.$layer('登录成功');
            that.changeshowauth(false);
            that.changeLoginBar(false);
          });
        }
      });
      // #endif
    }
  },
  computed: {}
};
</script>

<style lang="scss">
// 特别注意：高度是90rpx
// 登录享不限查询次数
.loginCountBox {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  width: 100%;
  background: linear-gradient(to right, #f9e7c1, #f1c980);
  z-index: 100;
  .loginCountBox2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rpx;
    .fls {
      font-size: 28rpx;
      color: #2a2c43;
    }
    .frs {
      font-size: 26rpx;
      color: #fff;
      padding: 10rpx 30rpx;
      border-radius: 50rpx;
      background: linear-gradient(to right, #363a5d, #555882);
    }
  }
}
/*#ifdef APP-PLUS*/
.loginCountBox {
  bottom: 0;
}
/*#endif*/
</style>
