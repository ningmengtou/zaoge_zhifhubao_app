<template>
  <view class="uniBigBox" v-if="vIfRes">
    <!-- 没有数据 开始 -->
    <view v-show="isNoData1"><nodata @refreshFun2="gopage('../index/index', 'tabbar')"></nodata></view>
    <!-- 没有数据 结束-->

    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 头部的大蓝色区域背景 开始 -->
    <view v-show="isNoData2" class="topBlueBg">
      <view class="banxin700 topBlueBg2">
        <!-- /公共类头部 -->
        <headers>
          <block slot="t2">{{ detailInfo.title }}</block>
        </headers>
        <!-- 公共类头部/ -->
        <view class="textbox">
          <view class="v1">{{ detailInfo.title }}</view>
          <view class="v2">{{ detailInfo.des }}</view>
          <view class="v3">
            <text class="t1">{{ parseInt(Number(detailInfo.real_price) * 0.8) }}</text>
            <text class="t2">元起</text>
            <!-- <text class="t3">¥{{ parseInt(detailInfo.real_price) / 0.8 }}</text> -->
          </view>
        </view>
      </view>
    </view>
    <!-- 头部的大蓝色区域背景 结束 -->

    <!-- 紧贴者上面蓝色背景的咨询盒子 开始 -->
    <view v-show="isNoData2" class="consultBox">
      <view class="banxin700 consultBox2">
        <view class="topbox">
          <view class="fls">
            <image :src="baseimg + 'iconcoutry.png'"></image>
            <text>国家商标局备案机构，安全保障</text>
          </view>
          <view class="frs"><text>1324</text></view>
        </view>
        <view class="botbox">
          <view class="fls">
            <view class="imgbox"><image :src="$getImg(detailInfo.avatar)"></image></view>
            <view class="txtbox">
              <view class="v1">
                <text class="t1">{{ detailInfo.name }}</text>
                <text class="t2">金牌顾问</text>
              </view>
              <view class="v2 dot2">{{ detailInfo.intro }}</view>
            </view>
          </view>
          <view class="frs">
            <image :src="baseimg + 'iconkefu.png'"></image>
            <text @click="loginBtn">咨询TA</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 紧贴者上面蓝色背景的咨询盒子 结束 -->

    <!-- 服务介绍 开始 -->
    <view v-show="isNoData2" class="serviceTab" id="tab1" ref="tab1">
      <view class="banxin700 serviceTab2">
        <view class="comTitleLine"><text>服务详情</text></view>
        <view class="listbox">
          <view v-for="(item, index) in detailInfo.process" :key="item">{{ index + 1 }}.{{ item }}</view>
        </view>
      </view>
    </view>
    <!-- 服务介绍 结束 -->

    <!-- 服务保障 开始 -->
    <view v-show="isNoData2" class="serviceGuarantee" id="tab2" ref="tab2">
      <view class="banxin700 serviceGuarantee2">
        <view class="comTitleLine"><text>服务保障</text></view>
        <view class="listbox">
          <view class="itembox" v-for="(item, index) in guaranteeList" :key="index">
            <view class="fls"><image :src="baseimg + item.img"></image></view>
            <view class="frs">
              <text class="oe t1">{{ item.txt1 }}</text>
              <text class="oe t2">{{ item.txt2 }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 服务保障 结束 -->

    <!-- 所需资料 开始 -->
    <view v-show="isNoData2" class="dataRequired" id="tab3" ref="tab3">
      <view class="banxin700 dataRequired2">
        <view class="comTitleLine"><text>所需资料</text></view>
        <view class="titlebox">
          <text class="t1">个人申请</text>
          <text class="t2">01</text>
        </view>
        <view class="listbox listbox1">
          <view class="itembox" v-for="(item, index) in detailInfo.person" :key="index">
            <view class="fls"><image :src="baseimg + 'iconok.png'"></image></view>
            <view class="frs">{{ item.name + item.remarks }}</view>
          </view>
        </view>
        <view class="titlebox">
          <text class="t1">企业申请</text>
          <text class="t2">02</text>
        </view>
        <view class="listbox listbox2">
          <view class="itembox" v-for="(item, index) in detailInfo.company" :key="index">
            <view class="fls"><image :src="baseimg + 'iconok.png'"></image></view>
            <view class="frs">{{ item.name + item.remarks }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 所需资料 结束 -->

    <!-- 交易流程 开始 -->
    <view v-show="isNoData2" class="transactionProcess" id="tab4" ref="tab4">
      <view class="banxin700 transactionProcess2">
        <view class="comTitleLine"><text>荣誉证书</text></view>
        <view class="listbox">
          <view class="itembox">
            <view class="itembox1"><image :src="item.url" class="certificate" v-for="(item, index) in detailInfo.certificateList" :key="index"></image></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 交易流程 结束 -->

    <!-- 定位在最下面的按钮 开始 -->
    <view v-show="isNoData2" class="fixBotBtn">
      <view class="comBtnBox"><view style="background: linear-gradient(230deg, #E73C15 0%, #E76315 100%)" @click="loginBtn">立即申请</view></view>
    </view>
    <!-- 定位在最下面的按钮 结束 -->
  </view>
</template>

<script>
import { yuzhuaRes, request } from '../../util/request.js';
import { mapState, mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      vIfRes: null,
      isNoData1: false, //没有数据
      isNoData2: true, //没有数据
      guaranteeList: [
        {
          img: 'fuwu1.png',
          txt1: '签署交易合同',
          txt2: 'sign the deal'
        },
        {
          img: 'fuwu2.png',
          txt1: '三方担保交易',
          txt2: 'secured transaction'
        },
        {
          img: 'fuwu3.png',
          txt1: '提供资质证件',
          txt2: 'quakification'
        },
        {
          img: 'fuwu4.png',
          txt1: '急速退款服务',
          txt2: 'quick refund'
        },
        {
          img: 'fuwu5.png',
          txt1: '支持线下交易',
          txt2: 'off-line transaction'
        },
        {
          img: 'fuwu6.png',
          txt1: '先确认后放款',
          txt2: 'lending money'
        }
      ],
      liuchenList: [
        {
          img: 'liuchen1.png',
          txt1: '准备申请书件',
          txt2: ''
        },
        {
          img: 'liuchen2.png',
          txt1: '向商标局国际注册处提交申请书件',
          txt2: ''
        },
        {
          img: 'liuchen3.png',
          txt1: '根据《收费通知书》的规定缴纳注册费用',
          txt2: ''
        },
        {
          img: 'liuchen3.png',
          txt1: '领取国际注册证',
          txt2: ''
        }
      ],
      // 详情信息
      detailInfo: {
        name: '',
        avatar: '',
        real_price: '',
        intro: '',
        process: '',
        person: [],
        company: [],
        certificateList: []
      },
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onReady() {
    // #ifdef APP-PLUS
    plus.navigator.setStatusBarStyle('white'); //状态栏文字颜色
    // #endif
  },
  onShow() {},
  onLoad(parmas) {
    if (JSON.stringify(parmas) == '{}') {
      this.gopage('../trademarkService/trademarkServiceMore', 'tabbar');
    }
    this.getData(parmas.ids);
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2', 'tabIndex'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone', 'changeTabIndex']),
    // 验证码弹窗三部曲 1/3
    openMask3() {
      this.isShowMask2 = true;
    },
    // 验证码弹窗三部曲 2/3
    closeMask3() {
      this.isShowMask2 = false;
    },
    // 验证码弹窗三部曲 3/3
    loginSuccess(option) {
      this.isShowMask2 = false;
      // this.gopage('../index3/onlineService');
      this.$layer(this.loginOKTips); //联系客服
    },
    // 一键登录
    loginBtn() {
      // #ifdef H5
      this.gopage('../index3/onlineService');
      // #endif

      // #ifdef APP-PLUS
      // 如果已经登录了那么就直接跳转客服不用极光授权了
      if (this.phone) {
        // this.gopage('../index3/onlineService');
        this.$layer(this.loginOKTips); //联系客服
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
          that.jgLogin(that.jv, function(uncrypted) {
            that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
            if (uncrypted == 6002) {
              // 取消登录
              return false;
            }
            // that.gopage('../index3/onlineService');
            this.$layer(this.loginOKTips); //联系客服
          });
        }
      });
      // #endif
    },
    // 获取本页面的Ajax请求
    async getData(ids) {
      uni.showLoading({
        title: '数据加载中...'
      });
      let result = await yuzhuaRes('case/detail', {
        id: ids
      });
      // 没有数据就调出为空的组件
      if (result.code == 4004) {
        this.vIfRes = result.code;
        console.log(111);
        this.isNoData1 = true;
        this.isNoData2 = false;
        uni.hideLoading();
        return false;
      }
      // 有数据就开始渲染数据吧
      console.log(222);
      this.isNoData1 = false;
      this.isNoData2 = true;
      this.detailInfo.name = result.staff.name;
      this.detailInfo.avatar = result.staff.avatar;
      this.detailInfo.real_price = result.detail.real_price;
      this.detailInfo.intro = result.header_list.intro;
      this.detailInfo.title = result.detail.title;
      this.detailInfo.des = result.detail.concept + result.detail.detail + result.detail.intro;
      this.detailInfo.process = result.procedure_list.content_list;
      this.detailInfo.person = result.material_list.content_list[0].step_list;
      this.detailInfo.company = result.material_list.content_list[1] ? result.material_list.content_list[1].step_list : [{ remarks: '', name: '第1步：无' }];
      this.detailInfo.certificateList = result.certificate_list.content_list;
      this.detailInfo.certificateList.forEach(item => {
        item.url = 'https://style.yuzhua.com' + item.url;
      });
      console.log(this.detailInfo.certificateList);
      this.vIfRes = result.staff.name;
      uni.hideLoading();
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkService2.scss';
</style>
