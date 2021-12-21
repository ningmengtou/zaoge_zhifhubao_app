<template>
  <view v-if="vIfRes">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <view class="topDetail">
      <view class="image"><image :src="'https://image.qmxip.com/' + details.trademarkPic"></image></view>
      <view class="message">
        <view class="time">公告日期：{{ details.preliminaryNoticeDate }}</view>
        <view class="number">申请号：{{ details.applicationNumber }}</view>
        <view class="type">商标分类：{{ details.typeOfTrademarkCode }}类 {{ details.typeOfTrademarkName }}</view>
      </view>
    </view>
    <view class="subTitle">公告信息</view>
    <view class="announDetail">
      <view>第{{ details.noticeNumber }}期初审公告:{{ details.preliminaryNoticeDate }}</view>
      <view>根据《商标法》第二十八条之规定：</view>
      <view>
        {{ details.applicationNameCn }}申请的{{ details.typeOfTrademarkCode }}类{{ details.typeOfTrademarkName }}的{{ details.trademarkName }}商标{{
          details.noticeType
        }}，予以公告如。
      </view>
      <view>异议期限自{{ details.preliminaryNoticeDate }}至{{ details.objectionClosingDate }}。</view>
      <view>第[{{ details.applicationNumber }}]号</view>
      <view>申请日期： {{ details.ext4 }}</view>
      <view>商标名称： {{ details.trademarkName }}</view>
      <view>申请人： {{ details.applicationNameCn }}</view>
      <view>申请地址： {{ details.applicationDddrCn }}</view>
      <view>代理机构： {{ details.agency }}</view>
      <view>核定使用商品/服务项目：请以商标公告图为准。</view>
    </view>
    <view class="subTitle">公告图样</view>
    <view class="announImage"><image :src="details.noticeImgs[0]"></image></view>
    <view class="botton">
      <view class="more" @click="goback(1)">再看看其他</view>
      <view class="consult" @click="submit">立即咨询</view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
import { consultant } from '../../util/consultant.js';
// #ifdef MP-ALIPAY
import { evaluate } from '../../util/eval5.min.js'; //支付宝小程序不兼容eval
// #endif
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      id: '',
      details: {},
      vIfRes: null,
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  onLoad(params) {
    this.id = params.id;
    this.getData();
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
            if (uncrypted === 6002) {
              // 取消登录
              return false;
            }
            // ------------此页面单独写的东东
            uni.navigateTo({
              url: '../index3/onlineService'
            });
          });
        }
      });
      // #endif
    },
    // 本页面的接口请求Ajax
    getData() {
      uni.showLoading({
        title: '数据加载中...'
      });
      uni.request({
        url: this.baseapi + '/sbc/get_tm_qmx_notice_detail',
        method: 'GET',
        dataType: 'text',
        data: {
          id: this.id
        },
        success: res => {
          // #ifdef MP-ALIPAY
          let result = evaluate(res.data);
          // console.log('支付宝平台res', result);
          // #endif

          // #ifdef APP-PLUS || H5
          let result = eval(res.data);
          // console.log('APP+H5平台res', result);
          // #endif

          let noticeTypeCode = result.data[0].json.noticeTypeCode;
          this.details = result.data[0].newJsonObj[noticeTypeCode];
          // console.log(this.details);
          this.vIfRes = noticeTypeCode;
          uni.hideLoading();
        }
      });
    }
  }
};
</script>

<style lang="scss">
.topDetail {
  display: flex;
  align-items: center;
  width: 690rpx;
  margin: auto;
  margin-top: 30rpx;
  padding: 30rpx;
  background: linear-gradient(187deg, #4b5269 0%, #2d3246 100%);
  border-radius: 12px;
  .image {
    width: 124rpx;
    height: 124rpx;
    margin-right: 25rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .message {
    display: flex;
    flex-direction: column;

    .time,
    .number,
    .type {
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 24rpx;
    }
    .number {
      margin: 20rpx 0;
    }
  }
}
.subTitle {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #292929;
  line-height: 32rpx;
  padding-left: 40rpx;
  margin: 40rpx 0;
}
.announDetail {
  width: 100%;
  padding: 0 40rpx;
  view {
    font-size: 26rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #969696;
    line-height: 52rpx;
  }
}
.announImage {
  width: 668rpx;
  height: 858rpx;
  margin: auto;
  image {
    width: 100%;
    height: 100%;
  }
}
.botton {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30rpx 40rpx;
  .more {
    width: 300rpx;
    height: 76rpx;
    background: linear-gradient(230deg, #64a1ff 0%, #809dff 100%);
    border-radius: 40rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 76rpx;
  }
  .consult {
    width: 300rpx;
    height: 76rpx;
    background: linear-gradient(230deg, #297dfe 0%, #1247fc 100%);
    border-radius: 40rpx;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 76rpx;
    margin-left: 20rpx;
  }
}
</style>
