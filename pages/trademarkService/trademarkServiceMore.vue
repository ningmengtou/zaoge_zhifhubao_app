<template>
  <view class="uniBigBox" :class="LoginBar == true ? '' : 'hideAuth'">
    <!-- 固定在页面右侧的客服组件 开始 -->
    <kefu></kefu>
    <!-- 固定在页面右侧的客服组件 结束 -->

    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 登录享不限查询次数 开始 -->
    <freelogin :isshowauth="showauth" @loginCodeLayer="loginCodeLayer"></freelogin>
    <!-- 登录享不限查询次数 结束 -->

    <!-- 仅仅突出三个商标 开始 -->
    <view class="onlyStressThree">
      <view class="banxin700 onlyStressThree2">
        <!-- /单条 -->
        <view class="itembox" :style="{ background: `url(${baseimg1 + 'bgtuchu1.png'})` }" @click="gopage('../index3/index3', 'tabbar')">
          <view class="v1">商标购买</view>
          <view class="v2"><text>立即购买</text></view>
        </view>
        <!-- 单条/ -->
        <!-- /单条 -->
        <view class="itembox" :style="{ background: `url(${baseimg1 + 'bgtuchu2.png'})` }" @click="goToDetail(8)">
          <view class="v1">商标注册</view>
          <view class="v2"><text>立即注册</text></view>
        </view>
        <!-- 单条/ -->
        <!-- /单条 -->
        <view class="itembox" :style="{ background: `url(${baseimg1 + 'bgtuchu3.png'})` }" @click="goToDetail(257)">
          <view class="v1">商标设计</view>
          <view class="v2"><text>立即设计</text></view>
        </view>
        <!-- 单条/ -->
      </view>
    </view>
    <!-- 仅仅突出三个商标 结束 -->

    <!-- 商标服务头部 开始 -->
    <view class="tradeServiceHead">
      <view class="banxin700"><tabswitch @changeTab="changeTab"></tabswitch></view>
    </view>
    <!-- 商标服务头部 结束 -->

    <!-- 商标服务身体 开始 -->
    <view class="tradeServiceBody">
      <view class="tradeServiceBody2 banxin700">
        <view class="serviceList">
          <view class="serviceItem" v-for="(item, index) in serviceArr" :key="index" @click="goToDetail(item.id)">
            <view class="imgbox"><image class="imgcov" :src="baseimg1 + item.img" mode="widthFix"></image></view>
            <view class="titbox oe">{{ item.title }}</view>
            <view class="descbox oe">{{ item.descipt }}</view>
            <view class="pricebox">
              <text class="t1">{{ tenThousand1(parseInt(item.price * 0.8)) }}</text>
              <text class="t2">{{ tenThousand2(item.price) }} 起</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 商标服务身体 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseimg1: this.baseimg1, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      serviceArr: [],
      isShowMask2: false,
      // 第1个tab选项卡身体的数组
      oneTabArr: [
        {
          id: '7',
          img: 'taba1.png',
          title: '商标普通注册',
          descipt: '1个工作日内递交商标局，资深顾问全程专业服务',
          price: '998'
        },
        {
          id: '8',
          img: 'taba2.png',
          title: '商标无忧注册',
          descipt: '注册不成功退全款！50分钟内急速申报',
          price: '1550'
        },
        {
          id: '20',
          img: 'taba3.png',
          title: '商标加急注册',
          descipt: '50分钟内递交商标局，商标注册先人一步！',
          price: '1080'
        },
        {
          id: '257',
          img: 'taba4.png',
          title: '商标设计',
          descipt: '商标LOGO设计到客户满意为止',
          price: '1588'
        },
        {
          id: '21',
          img: 'taba5.png',
          title: '商标设计注册套餐',
          descipt: '商标LOGO包含商标LOGO设计、商标加急注册服务，设计到满意',
          price: '2388'
        },
        {
          id: '23',
          img: 'taba6.png',
          title: '营业执照+商标办理',
          descipt: '一站式商标注册服务，代办个体营业执照只需要身份',
          price: '1580'
        },
        {
          id: '24',
          img: 'taba7.png',
          title: '国际商标注册',
          descipt: '让您的品牌走出国门，走向世界！',
          price: '3500'
        },
        {
          id: '25',
          img: 'taba8.png',
          title: '国际商标查询',
          descipt: '注册前查询商标，大幅度提高注册成功率',
          price: '800'
        },
        {
          id: '43',
          img: 'taba9.png',
          title: '商标投资',
          descipt: '小投资！大回报！低风险！',
          price: '22500'
        },
        {
          id: '147',
          img: 'taba10.png',
          title: '商标起名',
          descipt: '为公司和店铺起一个让人过目不忘，助力发展的好名字',
          price: '100'
        },
        {
          id: '167',
          img: 'taba11.png',
          title: '热门行业注册',
          descipt: '行业保护更加全面，未来道路更加安全',
          price: '750'
        },
        {
          id: '190',
          img: 'taba12.png',
          title: '商标双享注册',
          descipt: '注册不成功免费再注册一次！',
          price: '1380'
        },
        {
          id: '214',
          img: 'taba13.png',
          title: '商标设计版权套餐',
          descipt: '包含LOGO设计、版权登记、商标加急注册服务',
          price: '3488'
        }
      ],
      // 第2个tab选项卡身体的数组
      twoTabArr: [
        {
          id: '13',
          img: 'tabb1.png',
          title: '商标续展',
          descipt: '希望继续保有原商标，在商标到期前12个月内提出',
          price: '1800'
        },
        {
          id: '14',
          img: 'tabb2.png',
          title: '商标变更',
          descipt: '如需变更注册人名义、登记地址等注册事项',
          price: '688'
        },
        {
          id: '15',
          img: 'tabb3.png',
          title: '商标更正',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '880'
        },
        {
          id: '16',
          img: 'tabb4.png',
          title: '商标宽展',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '2500'
        },
        {
          id: '17',
          img: 'tabb5.png',
          title: '商标注销',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '688'
        },
        {
          id: '18',
          img: 'tabb6.png',
          title: '商标许可备案',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '600'
        },
        {
          id: '19',
          img: 'tabb7.png',
          title: '商标转让',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '2000'
        },
        {
          id: '44',
          img: 'tabb8.png',
          title: '商标补证',
          descipt: '如注册申报时公司名称或地址填写错误等',
          price: '1500'
        }
      ],
      // 第3个tab选项卡身体的数组
      threeTabArr: [
        {
          id: '6',
          img: 'tabc1.png',
          title: '商标异议申请',
          descipt: '异议公示期近似商标，阻止其注册成功，维护品牌权',
          price: '3000'
        },
        {
          id: '9',
          img: 'tabc2.png',
          title: '商标无效宣告',
          descipt: '宣告他人商标无效，扫清障碍',
          price: '3500'
        },
        {
          id: '265',
          img: 'tabc3.png',
          title: '商标撤三答辩',
          descipt: '商标被他人提出撤三，国家商标总局通知答辩，提交',
          price: '3000'
        },
        {
          id: '11',
          img: 'tabc4.png',
          title: '商标撤三答辩',
          descipt: '商标被他人提出撤三，国家商标总局通知答辩，提交',
          price: '3000'
        }
      ],
      // 第4个tab选项卡身体的数组
      fourTabArr: [
        {
          id: '10',
          img: 'tabd1.png',
          title: '商标驳回复审',
          descipt: '商标注册被驳回后的唯一救济方式',
          price: '3000'
        },
        {
          id: '12',
          img: 'tabd2.png',
          title: '商标异议答辩',
          descipt: '商标在公示期内被他人提出异议，可以申请异议答辩',
          price: '3100'
        },
        {
          id: '215',
          img: 'tabd3.png',
          title: '尊享复审申请',
          descipt: '资深律师为您解决商标复审问题',
          price: '6000'
        }
      ],
      // 第5个tab选项卡身体的数组
      fiveTabArr: [
        {
          id: '22',
          img: 'tabe1.png',
          title: '侵权监测',
          descipt: '拒绝搭便车，蹭热度，多个类别同时查询，数据及时',
          price: '2800'
        },
        {
          id: '143',
          img: 'tabe2.png',
          title: '电商申述',
          descipt: '针对店铺品牌、产品被投诉侵权，提供一站式申诉服',
          price: '1800'
        },
        {
          id: '144',
          img: 'tabe3.png',
          title: '电商投诉',
          descipt: '知识产权侵权投诉，维护品牌，保护知识产权权利人',
          price: '2000'
        },
        {
          id: '148',
          img: 'tabe4.png',
          title: '品牌托管',
          descipt: '商标监测、商标分析报告、商标法律咨询',
          price: '16000'
        }
      ],
      // 第6个tab选项卡身体的数组
      sixTabArr: [
        {
          id: '145',
          img: 'tabf1.png',
          title: '商标行政诉讼',
          descipt: '当事人争取改变商标评审委员会对自身做出不利裁定',
          price: '15000'
        }
      ]
    };
  },
  onShow() {
    let telPhone = uni.getStorageSync('telPhone');
    this.changeshowauth(!Boolean(telPhone));
    this.changeLoginBar(!Boolean(telPhone));
  },
  onLoad() {
    this.serviceArr = this.oneTabArr;
  },
  computed: {
    ...mapState(['showauth', 'LoginBar'])
  },
  methods: {
    ...mapMutations(['changeshowauth', 'changeLoginBar']),
    // 验证码弹窗组件三部曲 1/3
    openMask3() {
      this.isShowMask2 = true;
      uni.hideTabBar();
    },
    // 验证码弹窗组件三部曲 2/3
    closeMask3() {
      uni.showTabBar();
      this.isShowMask2 = false;
    },
    // 验证码弹窗组件三部曲 3/3
    loginSuccess(option) {
      uni.showTabBar();
      this.isShowMask2 = false;
    },
    // 登录享不限查询次数
    loginCodeLayer() {
      this.openMask3(); //打开验证码组件弹窗
    },
    // tab切换的头部
    changeTab(idx) {
      let idxs = idx + 1;
      if (idxs == 1) {
        this.serviceArr = this.oneTabArr;
      } else if (idxs == 2) {
        this.serviceArr = this.twoTabArr;
      } else if (idxs == 3) {
        this.serviceArr = this.threeTabArr;
      } else if (idxs == 4) {
        this.serviceArr = this.fourTabArr;
      } else if (idxs == 5) {
        this.serviceArr = this.fiveTabArr;
      } else if (idxs == 6) {
        this.serviceArr = this.sixTabArr;
      }
    },
    // 跳转到详情页面
    goToDetail(ids) {
      uni.navigateTo({
        url: './service?ids=' + ids
      });
    }
  }
};
</script>

<style lang="scss">
// 仅仅突出三个商标
.onlyStressThree {
  padding: 30rpx 0;
  .onlyStressThree2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .itembox {
      width: 32%;
      background-color: #fff;
      height: 200rpx;
      border-radius: 20rpx;
      overflow: hidden;
      padding-left: 30rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-repeat: no-repeat !important;
      background-position: right center !important;
      background-size: cover !important;
      .v1 {
        font-size: 26rpx;
        color: #3a3f46;
        padding-bottom: 10rpx;
      }
      .v2 {
        display: flex;
        align-items: center;
        text {
          font-size: 20rpx;
          color: #aaa;
        }
        image {
          width: 4rpx;
          height: 5rpx;
        }
      }
    }
  }
}
// 商标服务头部
.tradeServiceHead {
  background: #fff;
  padding: 20rpx 0;
}
// 商标服务身体
.tradeServiceBody {
  padding: 40rpx 0;
  .tradeServiceBody2 {
    .serviceList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .serviceItem {
        width: 48%;
        border: 0px solid red;
        margin-top: 30rpx;
        padding: 20rpx;
        border-radius: 20rpx;
        overflow: hidden;
        background: #fff;
        &:nth-child(1) {
          margin-top: 0;
        }
        &:nth-child(2) {
          margin-top: 0;
        }
        .imgbox {
          width: 100%;
          height: 160rpx;
          border-radius: 15rpx;
          overflow: hidden;
        }
        .titbox {
          font-size: 30rpx;
          color: #333;
          padding-top: 20rpx;
        }
        .descbox {
          padding-top: 10rpx;
          font-size: 24rpx;
          color: #999;
        }
        .pricebox {
          padding-top: 10rpx;
          &::before {
            content: '￥';
            color: #ff7c44;
            font-size: 24rpx;
            font-weight: 700;
            margin-right: 5rpx;
          }
          .t1 {
            font-size: 32rpx;
            color: #ff7c44;
          }
          .t2 {
            font-size: 26rpx;
            color: #ff7c44;
            padding-left: 10rpx;
          }
        }
      }
    }
  }
}
// 当前页面
.uniBigBox {
  background: #f5f5f5;
  padding-bottom: 90rpx;
  .loginCountBox {
    display: block;
  }
}
.uniBigBox.hideAuth {
  padding-bottom: 0;
  background: #f5f5f5;
  .loginCountBox {
    display: none;
  }
}
// 仅仅一张大图
.onlyBanner {
  .onlyBanner2 {
    image {
      width: 100%;
      height: 156rpx;
    }
  }
}
// 商标权益维护 1/2
.quanyiProtecte {
  .quanyiProtecte2 {
    .quanyiList {
      display: flex;
      justify-content: space-between;
      .itembox {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 170rpx;
        image {
          width: 90rpx;
          height: 90rpx;
          display: block;
          margin: 0 auto;
        }
        text {
          color: #3f3f3f;
          font-size: 28rpx;
          padding-top: 30rpx;
        }
      }
    }
  }
}
// 商标权益维护 2/2
.weihuTrademark {
  padding-bottom: 30rpx;
  .weihuTrademark2 {
    .weihuList {
      overflow: hidden;
      .itembox {
        margin-bottom: 20rpx;
        font-size: 24rpx;
        color: #12204f;
        background: #e6ebf9;
        height: 60rpx;
        line-height: 60rpx;
        padding: 0 20rpx;
        border-radius: 60rpx;
        float: left;
        margin-right: 25rpx;
      }
    }
  }
}
</style>
