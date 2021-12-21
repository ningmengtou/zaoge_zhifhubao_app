<template>
  <view>
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <view class="topBg bgcov" :style="{ background: `url(${baseimg + 'legalServiceBg.png'})` }">
      <view class="title">法律服务</view>
      <view class="des">在商标注册申请和审查过程中以及在商标注册完成后，商标局和商标评审委员会依职权或者依申请就商标的法律状态做出具体行政行为。</view>
    </view>
	

    <view class="form">
      <view class="inputBox">
        <view class="text">联系人</view>
        <input class="input" type="text" placeholder-class="place" placeholder="请输入您的姓名" v-model="userName" />
      </view>
      <view class="tips">
        <text class="iconfont icon-anquanzhuye"></text>
        信息保护中,请放心填写
      </view>
      <view class="consult" @click="submit">免费咨询</view>
    </view>

	
	<view class="block">
      <view class="performance">
        <view class="performanceItem">
          <view class="years">
            40+
            <text>万</text>
          </view>
          <view class="message">累计服务用户</view>
        </view>
        <view class="performanceItem">
          <view class="years">
            3000+
            <text>位</text>
          </view>
          <view class="message">法律专业顾问</view>
        </view>
        <view class="performanceItem">
          <view class="years">
            300+
            <text>座</text>
          </view>
          <view class="message">业务覆盖城市300座</view>
        </view>
        <view class="performanceItem">
          <view class="years">
            2013
            <text>年</text>
          </view>
          <view class="message">涉足法律服务领域</view>
        </view>
      </view>
    </view>

    <view class="comBgLineTit">
      <view class="v1 oe">为什么选择早鸽？</view>
      <view class="v2"><image :src="baseimg + 'bgtitle.png'"></image></view>
    </view>
    <view class="fourImage">
      <view class="imageItem" v-for="(item, index) in 4" :key="index"><image :src="baseimg + 'legal' + (index + 1) + '.png'" mode="widthFix"></image></view>
    </view>

    <view class="team">
      <view class="comBgLineTit">
        <view class="v1 oe">精英团队</view>
        <view class="v2"><image :src="baseimg + 'bgtitle.png'"></image></view>
      </view>
      <view class="teamBox">
        <view class="teamItem" v-for="(item, index) in teamList" :key="index" :style="{ background: 'url( baseimg +   teambg' + (index + 1) + '.png)' }" @click="submit">
          <view class="textShow">
            <view class="name">{{ item.name }}</view>
            <view class="tips">
              <view class="tipsItem">{{ item.tips[0] }}</view>
              <view class="tipsItem">{{ item.tips[1] }}</view>
            </view>
            <view class="other">{{ item.other }}</view>
          </view>
          <view class="person"><image :src="baseimg + 'teamPerson' + (index + 1) + '.png'"></image></view>
        </view>
      </view>
    </view>

    <!-- 你可能还需要以下服务 开始 -->
    <view class="ourAdvantage">
      <view class="ourAdvantage2">
        <!-- 1 -->
        <view class="comBgLineTit">
          <view class="v1 oe">你可能还需要以下服务</view>
          <view class="v2"><image :src="baseimg + 'bgtitle.png'"></image></view>
        </view>
        <!-- 2 -->
        <view class="listbox">
          <view class="itembox bgcov" :style="{ background: 'url(' + baseimg + item.bg + ')' }" v-for="(item, index) in advantageList" :key="index">
            <view class="fls"><image class="imgcov" :src="baseimg + item.img"></image></view>
            <view class="frs">
              <view class="fr1 oe">{{ item.txt1 }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 你可能还需要以下服务 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      teamList: [
        {
          name: '代琦琪',
          tips: ['商标注册', '商标转让'],
          other: '3年从事知识产权领域工作经验，擅长商标、专利侵权判定等，提供法律服务。'
        },
        {
          name: '张晓东',
          tips: ['商标注销', '商标设计'],
          other: '主管知识产权工作，提供技术与法律支持，主要集中于专利，商标，版权等方面。'
        },
        {
          name: '孙巧梅',
          tips: ['商标续展', '商标变更'],
          other: '主要从事专利申请、商标注册、版权登记，专利维权、专利纠纷处理等事宜。'
        },
        {
          name: '张毅',
          tips: ['撤三申请', '驳回复审'],
          other: '全权代理企业商标法律事务，如商标注册申请、其他申请事宜、商标异议、争议、复审、答辩、确权诉讼等。'
        }
      ],
      advantageList: [
        {
          bg: 'regyou1bg.png',
          img: 'regyou1.png',
          txt1: '管家式贴心售后',
          txt2: '专业一对一服务'
        },
        {
          bg: 'regyou2bg.png',
          img: 'regyou2.png',
          txt1: '正规代理资质',
          txt2: '专业一对一服务'
        },
        {
          bg: 'regyou3bg.png',
          img: 'regyou3.png',
          txt1: '百万服务案例',
          txt2: '专业一对一服务'
        },
        {
          bg: 'regyou4bg.png',
          img: 'regyou4.png',
          txt1: '全网多渠道覆盖',
          txt2: '专业一对一服务'
        }
      ],
      userName: '', //用户姓名
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad() {},
  onShow() {},
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone']),
    // 打开验证码弹窗组件
    openMask3() {
      this.isShowMask2 = true;
    },
    // 关闭验证码弹窗组件
    closeMask3() {
      this.isShowMask2 = false;
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
      this.$refs.codelogin.clearAll(); // 登录成功后或者关闭弹窗后清空数据
      // 本页面单独搞的……
      uni.navigateTo({
        url: '../index3/onlineService'
      });
    },
    // 立即咨询的提交表单事件
    submit() {
      // #ifdef H5
      uni.showToast({
        title: 'H5端不支持登录',
        duration: 800,
        icon: 'none'
      });
      // #endif


      // #ifdef APP-PLUS
      // 如果已经登录了那么就直接跳转客服不用极光授权了
      if (this.phone) {
        uni.navigateTo({
          url: '../index3/onlineService'
        });
        return false;
      }
      this.jv.checkVerifyEnable(result => {
        // 如果没有开启数据流量,就弹出验证码弹窗组件
        if (result.enable === false) {
          this.openMask3();
          return false;
        } else {
          // 如果开启了数据流量，就直接极光一键登录授权
          this.jiguangUI();
          let that = this;
          this.jgLogin(this.jv, function(uncrypted) {
            that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
            // ------------此页面单独写的东东
            uni.navigateTo({
              url: '../index3/onlineService'
            });
          });
        }
      });
      // #endif
    }
  }
};
</script>

<style lang="scss">
page {
  background-color: #f2f4f5;
}

.topBg {
  width: 100%;
  height: 658rpx;
  padding: 100rpx 20rpx 0 20rpx;
  .title {
    font-size: 64rpx;
    color: #ffffff;
    padding-bottom: 20rpx;
  }
  .des {
    width: 700rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 40rpx;
    text-align: justify;
  }
}

.form {
  width: 700rpx;
  background-color: #fff;
  padding: 40rpx 25rpx;
  margin: auto;
  border-radius: 10rpx;
  margin-top: -300rpx;

  .inputBox {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90rpx;
    background: #f5f5f5;
    margin-bottom: 30rpx;
    .text {
      width: 150rpx;
      color: black;
      font-size: 28rpx;
      text-align: center;
      border-right: 1px solid #e6e6e6;
    }
    .input {
      width: calc(100% - 150rpx);
      padding-left: 40rpx;
      font-size: 28rpx;
      height: 50rpx;
      line-height: 50rpx;
      background: #f5f5f5;
    }
    .place {
      height: 50rpx;
      line-height: 50rpx;
    }
  }

  .tips {
    color: #ff995a;
    font-size: 27rpx;
    margin: 30rpx 0;

    .iconfont {
      color: #ff995a;
      margin-right: 10rpx;
    }
  }

  .consult {
    width: 100%;
    height: 75rpx;
    line-height: 75rpx;
    color: #fff;
    text-align: center;
    background: linear-gradient(230deg, #f94a36 0%, #f74134 100%);
    border-radius: 50rpx;
  }
}

.block {
  padding-top: 20rpx;
}

.performance {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 692rpx;
  height: 300rpx;
  background: #ffffff;
  border-radius: 10rpx;
  margin: auto;
  .performanceItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 40rpx;
    width: 50%;

    .years {
      font-size: 40rpx;
      font-weight: bold;
      color: #292929;
      line-height: 32rpx;
      margin-bottom: 15rpx;
    }

    .message {
      font-size: 24rpx;
      font-weight: 400;
      color: #969696;
      line-height: 32rpx;
    }
  }
}
.fourImage {
  display: flex;
  flex-wrap: wrap;
  width: 700rpx;
  margin: auto;
  .imageItem {
    width: 50%;
    image {
      width: 100%;
    }
  }
}
.team {
  width: 100%;
  background: #2a3958;
  margin-top: 50rpx;
  padding-bottom: 60rpx;
  .comBgLineTit {
    padding-top: 20rpx !important;
    .v1 {
      color: #fff !important;
    }
  }
  .teamBox {
    width: 100%;
    padding: 0 30rpx;
    .teamItem {
      position: relative;
      padding: 25rpx 20rpx;
      width: 100%;
      height: 270rpx;
      border-radius: 10rpx;
      background: no-repeat center center;
      margin-bottom: 35rpx;
      .textShow {
        width: 420rpx;
        margin-left: 250rpx;
        .name {
          font-size: 28rpx;
          font-weight: 600;
          color: #ffffff;
          line-height: 40rpx;
          margin-bottom: 15rpx;
        }
        .tips {
          display: flex;
          margin-bottom: 20rpx;
          .tipsItem {
            width: 154rpx;
            height: 46rpx;
            border-radius: 25rpx;
            border: 1rpx solid #ffffff;
            font-size: 20rpx;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            line-height: 46rpx;
            margin-right: 20rpx;
          }
        }
        .other {
          font-size: 22rpx;
          font-weight: 400;
          color: #ffffff;
          line-height: 32rpx;
        }
      }
      .person {
        position: absolute;
        width: 250rpx;
        height: 290rpx;
        left: 0;
        bottom: 0;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .teamItem:nth-child(even) {
      .person {
        right: 0;
        left: inherit;
      }
      .textShow {
        margin-left: 0;
      }
    }
  }
}
// 你可能还需要以下服务
.ourAdvantage {
  padding-bottom: 60rpx;
  background-color: #fff;
  .ourAdvantage2 {
    .listbox {
      width: 658rpx;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .itembox {
        display: flex;
        align-items: center;
        padding: 30rpx;
        margin-top: 20rpx;
        width: 318rpx;
        height: 124rpx;
        &:nth-child(1) {
          margin-top: 0;
        }
        &:nth-child(2) {
          margin-top: 0;
        }
        .fls {
          width: 30rpx;
          image {
            width: 30rpx;
            height: 30rpx;
          }
        }
        .frs {
          width: calc(100% - 30rpx);
          padding-left: 20rpx;
          .fr1 {
            font-size: 28rpx;
            color: #292929;
          }
          .fr2 {
            font-size: 22rpx;
            color: #a8a8a8;
          }
        }
      }
    }
  }
}
.comBtnBox {
  background-color: #fff;
  padding-bottom: 50rpx;
  .iconfont {
    color: #fff;
    margin-right: 10rpx;
  }
}
</style>
