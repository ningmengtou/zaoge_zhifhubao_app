<template>
  <view class="adviserList">
    <view class="adviserItem" v-for="(item, index) in adviserlist" :key="index" @click="ziXunKeFu">
      <!-- 上 -->
      <view class="topbox">
        <view class="fls"><image class="imgcov" :src="baseimg1 + item.img"></image></view>
        <view class="frs">
          <view class="fr1">
            <view class="">
              <text class="tname">{{ item.name }}</text>
            </view>
            <view class="">
              <text class="iconfont icon-gou1" :class="item.isOnline == true ? 'ifOnline' : ''"></text>
              <text class="online" :class="item.isOnline == true ? 'ifOnline' : ''">{{ item.isOnline ? '在线' : '离线' }}</text>
            </view>
          </view>
          <view class="fr2">
            <text>商标注册</text>
            <text>商标转让</text>
            <text>商标注销</text>
          </view>
          <!-- <view class="fr3 oe">鱼爪网络科技有限公司</view> -->
        </view>
      </view>
      <!-- 下 -->
      <view class="botbox">
        <view class="botfl">
          <view class="numbers">
            <view>
              <text class="big">{{ $randomNum(85, 95) }}</text>
              次
            </view>
            <text>成交量</text>
          </view>
          <view class="numbers">
            <view>
              <text class="big">{{ $randomNum(85, 95) }}</text>
              %
            </view>
            <text>好评率</text>
          </view>
          <view class="numbers">
            <view>
              <text class="big">{{ $randomNum(85, 95) }}</text>
              分
            </view>
            <text>服务分</text>
          </view>
        </view>
        <view class="botfr"><text>免费咨询</text></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'adviserlist',
  data() {
    return {
      baseimg1: this.baseimg1,
      adviserlist: [
        {
          name: '卢怡',
          img: 'person1.png',
          isOnline: true
        },
        {
          name: '程文裔',
          img: 'person2.png',
          isOnline: true
        },
        {
          name: '孙巧梅',
          img: 'person3.png',
          isOnline: true
        },
        {
          name: '孙涧窈',
          img: 'person4.png',
          isOnline: false
        },
        {
          name: '罗刚',
          img: 'person5.png',
          isOnline: true
        },
        {
          name: '田文海',
          img: 'person6.png',
          isOnline: false
        },
        {
          name: '蔡亚宇',
          img: 'person7.png',
          isOnline: true
        },
        {
          name: '张学林',
          img: 'person8.png',
          isOnline: true
        },
        {
          name: '章燕',
          img: 'person9.png',
          isOnline: false
        },
        {
          name: '吴元昊',
          img: 'person10.png',
          isOnline: true
        }
      ]
    };
  },
  created() {},
  methods: {
    ziXunKeFu() {
      this.$emit('ziXunKeFu2');
    }
  }
};
</script>

<style lang="scss">
// 是否在线
.ifOnline {
  color: #45e18d !important;
}
// 列表样式
.adviserList {
  padding: 40rpx 0;

  .adviserItem {
    background: #fff;
    border-radius: 10rpx;
    padding: 30rpx;
    margin-top: 30rpx;
    box-shadow: 0 0 10rpx rgba(100, 100, 100, 0.1);
    &:first-child {
      margin-top: 0;
    }
    // 上
    .topbox {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-bottom: 30rpx;
      .fls {
        width: 160rpx;
        height: 160rpx;
        border-radius: 15rpx;
        overflow: hidden;
      }
      .frs {
        width: calc(100% - 160rpx);
        padding-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .fr1 {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .tname {
            font-size: 28rpx;
            color: #333;
            padding-right: 20rpx;
          }
          .iconfont {
            font-size: 28rpx;
            color: #999;
          }
          .online {
            padding-left: 5rpx;
            font-size: 24rpx;
            color: #999;
          }
        }
        .fr2 {
          display: flex;
          align-items: center;
          text {
            padding: 15rpx 15rpx;
            font-size: 22rpx;
            border-radius: 10rpx;
            overflow: hidden;
            margin-right: 20rpx;
          }
          text:nth-child(1) {
            color: #ff6432;
            background: #fff4f0;
          }
          text:nth-child(2) {
            color: #3299ff;
            background: #f0faff;
          }
          text:nth-child(3) {
            color: #ff5f5f;
            background: #fff0f0;
          }
        }
        .fr3 {
          font-size: 28rpx;
          color: #6b6b6b;
        }
      }
    }
    // 下
    .botbox {
      border-top: 1px dashed rgba(0, 0, 0, 0.1);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 30rpx;
      .botfl {
        display: flex;
        align-items: center;
        .numbers {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 150rpx;
          padding-right: 10rpx;
          .big {
            color: #000;
            font-size: 40rpx;
            font-weight: 600;
          }
        }
        text {
          font-size: 24rpx;
        }
        text:nth-child(1) {
          color: #666;
        }
        text:nth-child(2) {
          color: #7f8494;
          padding-left: 10rpx;
        }
      }
      .botfr {
        text {
          background: #2884ff;
          width: 160rpx;
          height: 60rpx;
          border-radius: 10rpx;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
