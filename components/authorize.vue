<template>
  <view class="markBox" v-if="isAuthorize">
    <view class="authorizeBox">
      <view class="authorizeTop">
        <view class="title">服务授权</view>
        <image src="xxx.png" class="logo"></image>
      </view>
      <view class="authorizeBottom">
        <view class="title">
          授权
          <text>鱼爪商标注册查询</text>
          获取以下信息为您服务
        </view>
        <view class="tips">
          <view class="tipItem">
            <view class="cur"></view>
            <view class="text">获取身份信息(手机号码)方便用户沟通需求；</view>
          </view>
        </view>
        <view class="userOperate">
          <button class="refuse" @click="refuseClick">拒绝</button>
          <button class="agree" open-type="getAuthorize" @getAuthorize="getAuthorize" scope="phoneNumber">同意</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isAuthorize: false
    };
  },
  methods: {
    refuseClick() {
      this.isAuthorize = false;
      uni.showTabBar();
    },
    getAuthorize() {
      console.log(111);
      my.getPhoneNumber({
        success: res => {
          let encryptedData = res.response;
          my.httpRequest({
            url: '你的后端服务端',
            data: encryptedData
          });
        },
        fail: res => {
          console.log(res);
          console.log('getPhoneNumber_fail');
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.markBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99999999;
  .authorizeBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 540rpx;
    border-radius: 15rpx;
    overflow: hidden;
    .authorizeTop {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 190rpx;
      background: linear-gradient(90deg, #21ade7 0%, #0f6cbe 100%);
      .title {
        font-size: 30rpx;
        font-weight: 500;
        color: #ffffff;
        margin: 25rpx 0 15rpx 0;
      }
      image {
        width: 72rpx;
        height: 78rpx;
      }
    }
    .authorizeBottom {
      width: 100%;
      padding: 25rpx;
      background-color: #fff;
      .title {
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        margin-bottom: 30rpx;
      }
      text {
        font-weight: 600;
      }
      .tips {
        display: flex;
        flex-direction: column;
        .tipItem {
          display: flex;
          align-items: center;
          margin: 10rpx 0;
          .cur {
            width: 8px;
            height: 8px;
            background: #a1a1a1;
            border-radius: 50%;
            margin-right: 5rpx;
          }
          .text {
            font-size: 24rpx;
            font-weight: 400;
            color: #a1a1a1;
          }
        }
      }
      .userOperate {
        display: flex;
        justify-content: space-between;
        margin-top: 40rpx;
        .refuse {
          width: 200rpx;
          height: 70rpx;
          background: #ffffff;
          border: 1px solid #efefef;
          font-size: 28rpx;
          font-weight: 400;
          text-align: center;
          color: #2b2b2b;
          line-height: 70rpx;
          cursor: pointer;
        }
        .agree {
          width: 200rpx;
          height: 70rpx;
          background: #108feb;
          font-size: 28rpx;
          font-weight: 400;
          text-align: center;
          color: #fff;
          line-height: 70rpx;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
