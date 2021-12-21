<template>
  <view class="uniBigBox">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 复制的陈同志的代码 开始 -->
    <view class="topBg bgcov" :style="{ background: `url(${baseimg + 'legalServiceBg.png'})` }">
      <view class="title">商标顾问</view>
      <view class="des">解决所有商标问题</view>
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
      <view class="threeBox">
        <view class="items">
          <text class="iconfont icon-gou"></text>
          <text class="text">实名认证</text>
        </view>
        <view class="items">
          <text class="iconfont icon-gou"></text>
          <text class="text">执业认证</text>
        </view>
        <view class="items">
          <text class="iconfont icon-gou"></text>
          <text class="text">平台认证</text>
        </view>
      </view>
    </view>
    <!-- 复制的陈同志的代码 结束 -->


    <!-- 金牌顾问 开始 -->
    <view class="goldConsultant">
      <view class="banxin700 goldConsultant2">
        <!-- 1 -->
        <view class="comBgLineTit">
          <view class="v1 oe">金牌顾问</view>
          <view class="v2"><image :src="baseimg + 'bgtitle.png'"></image></view>
        </view>
        <!-- 2 -->
        <view class="listbox">
          <view class="itembox" v-for="(item, index) in personList" :key="index">
            <view class="v1"><image :src="baseimg + item.img"></image></view>
            <view class="v2 oe">{{ item.name }}</view>
            <view class="v3" style="width: 100%;">
              <text class="oe" style="width: 130rpx;">{{ item.text1 }}</text>
              <text class="oe" style="width: 130rpx;">{{ item.text2 }}</text>
            </view>
            <view class="v4 dot2">个人简介：{{ item.des }}</view>
            <view class="v5">
              <view class="comBtnBox" @click="submit"><view>立即咨询</view></view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 金牌顾问 结束 -->

    <!-- 最新顾问回复 开始 -->
    <view class="consultantResponse">
      <view class="banxin670 consultantResponse2">
        <!-- 1 -->
        <view class="comBgLineTit">
          <view class="v1 oe">最新顾问回复</view>
          <view class="v2"><image :src="baseimg + 'bgtitle.png'"></image></view>
        </view>
        <!-- 2 -->
        <view class="listbox">
          <view class="itembox" v-for="(item, index) in replyList" :key="index">
            <view class="v1">
              <text class="text">{{ Math.floor(Math.random() * (20 - 1 + 1) + 1) }}天前</text>
              <text class="timeyuan iconfont icon-time"></text>
            </view>
            <view class="v2">{{ item.title }}</view>
            <view class="v3">
              <view class="fls"><image :src="baseimg + item.img"></image></view>
              <view class="frs">
                <text class="t1">{{ item.name }}顾问</text>
                <text class="t2">回复：{{ item.answer }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 最新顾问回复 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
import { consultant } from '../../util/consultant.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      personList: consultant,
      replyList: [
        {
          name: '赵兰雅',
          img: 'iconhead1.png',
          title: '提交LOGO是彩色的好，还是黑白的好？',
          answer:
            '个人认证信息在提交后1-3个工作日内进行认证审核。请申请人在审核期间留意保持电话畅通，认证过程中审核人员可能会联系沟通确认认证相关事宜。审核期限为30天，期间有3次补充或重填机会。'
        },
        {
          name: '王德',
          img: 'iconhead2.png',
          title: '商标申请费用是如何计算的？',
          answer:
            '微信认证服务审核费300元/次/年。注：1）个体工商户无对公账户，可提供营业执照上法人的银行卡信息申请认证；2）企业必须要有对公账户，请先办理对公账户再申请公众号或认证；3）事业单位如无对公账户，可以使用结算中心或财政账户支付验证（如国库集中收付结算中心等），也可以使用证书上法人的对私银行卡号及姓名；4）政府类型若没有对公账号，可以在“机构开户银行”、“机构银行账号”栏填写“无”。'
        },
        {
          name: '李亮',
          img: 'iconhead3.png',
          title: '商标组合注册和分开注册，哪一种方式好？',
          answer:
            '现在开通留言只能通过账户迁移了,就是把一个有留言的号迁移过来,具体方法如下。 准备资料:单位证件、法人身份证、管理员信息等; 迁移要求:公众号能正常登录、法人或委托人完成人脸识别; 迁移方法:通过公众号“信息产权”可直接办理迁移,全程所需时间2~3工作日,迁移审核完后将开通留言功能。'
        },
        {
          name: '宋英',
          img: 'iconhead4.png',
          title: '关于邮寄证书问题？',
          answer:
            '除个人订阅号需要满足以下条件可申请开通公众号，目前，其他帐号均支持申请微信认证。2014年8月26号之前注册的个人订阅号需满足以下两个条件，即可申请微信认证：1）没有开通的流量主的个人类型账号；2）未纠错过主体信息的帐号。'
        }
      ],
      userName: '', //用户姓名
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad() {
    this.personList = this.getRandomArr(this.personList, 4);
  },
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
    },
    // 数组随机抽取元素
    getRandomArr(arr, count) {
      //随机抽取
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        //打乱数组
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkAdviser.scss';
</style>
