<template>
  <view class="uniBigBox" v-if="vIfRes">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 定位在底部的区域 开始 -->
    <view class="bottomBuy">
      <!-- <button class="buyItem resetBtn" hover-class="none" @click="loginBtn">
        <text class="iconfont icon-zixun"></text>
        <text class="text">咨询</text>
      </button> -->
      <!-- <view class="buyItem" style="display: none;">
        <text class="iconfont icon-shoucangxiao"></text>
        <text class="text">收藏</text>
      </view> -->
      <button class="resetBtn buyBtn" hover-class="none" @click="loginBtn">咨询报价</button>
    </view>
    <!-- 定位在底部的区域 结束 -->

    <view class="topTrademark bgcov" :style="{ background: `url(${baseimg2 + 'bgQueryDetail.png'}) #333` }">
      <image :src="getJson.goods_images[0]"></image>
      <view class="rightBox">
        <view class="trademarkName">{{ getJson.accounts }}</view>
        <view class="otherMes">商标类别：{{ getJson.term }}类-{{ getJson.term_str }}</view>
        <view class="otherMes">
          价格：
          <text>{{ getPrice(getJson.goods_price) }}</text>
        </view>
        <view class="sell">{{ getJson.state }}</view>
      </view>
    </view>

    <!-- 基本信息 -->
    <view class="infoMes">
      <view class="mainTopTitle">
        <view class="line"></view>
        <view class="title">基本信息</view>
      </view>
      <view class="topType">
        <view class="leftText">商品类型</view>
        <view class="type">普通商标</view>
      </view>
      <view class="moreServe">
        <view class="serveTitle">商标范围</view>
        <view class="servesList">
          <view class="serveItem orange" v-for="(item, index) in features" :key="index">{{ item }}</view>
        </view>
      </view>
      <view class="imgShow">
        <view class="serveTitle">图片详情</view>
        <view class="preViewBox">
          <view class="itembox" v-for="(item, index) in getJson.goods_images" :key="index">
            <image class="imgcov" :src="item" @click="preImg(getJson.goods_images, index)"></image>
          </view>
        </view>
      </view>
      <button class="resetBtn consult" hover-class="none" @click="loginBtn">免费咨询商标未注册群组</button>
    </view>

    <!-- 法律信息 开始 -->
    <view class="lawInfo showFilterClass">
      <view class="mainTopTitle">
        <view class="line"></view>
        <view class="title">法律信息</view>
      </view>
      <view class="lawList">
        <view v-if="isShowBtnOrTip">
          <button class="resetBtn kefuBtn kefuBtn1" hover-class="none" @click="loginBtn">{{ loginKeFuText }}</button>
        </view>
        <view v-else class="hasloginbtns hasloginbtn1" @click="gopage('../index3/onlineService')">{{ loginKeFuTip }}</view>
        <view class="lawItem">
          <view class="left">申请人类型</view>
          <view class="right filterBox">企业</view>
        </view>
        <view class="lawItem">
          <view class="left">申请人名称</view>
          <view class="right filterBox">四川安必达科技有限公司</view>
        </view>
        <view class="lawItem">
          <view class="left">申请人地址</view>
          <view class="right filterBox">四川省成都市高新区</view>
        </view>
        <view class="lawItem">
          <view class="left">代理机构名称</view>
          <view class="right filterBox">成都鱼爪科技</view>
        </view>
      </view>
    </view>
    <!-- 法律信息 结束 -->

    <!-- 日期节点 开始 -->
    <view class="process showFilterClass">
      <view class="mainTopTitle">
        <view class="line"></view>
        <view class="title">日期节点</view>
      </view>
      <view class="processList">
        <view class="proItem">
          <view class="itemLeft">
            <text class="iconfont icon-shizhong"></text>
            <text class="text">申请日期</text>
          </view>
          <view class="time">{{ getJson.reg_time }}</view>
        </view>
        <view class="proItem filterBox" v-for="(item, index) in processList" :key="index">
          <view class="itemLeft">
            <text class="iconfont icon-shizhong"></text>
            <text class="text">{{ item.title }}</text>
          </view>
          <view class="time ">{{ item.time }}</view>
        </view>
        <view class="proItem">
          <view class="itemLeft">
            <text class="iconfont icon-shizhong"></text>
            <text class="text">有效截止日期</text>
          </view>
          <view class="time">{{ getJson.overdue_time }}</view>
        </view>
        <view v-if="isShowBtnOrTip">
          <button class="resetBtn kefuBtn kefuBtn2" hover-class="none" @click="loginBtn">{{ loginKeFuText }}</button>
        </view>
        <view v-else class="hasloginbtns hasloginbtn2" @click="gopage('../index3/onlineService')">{{ loginKeFuTip }}</view>
      </view>
    </view>
    <!-- 日期节点 结束 -->

    <!-- 经纪人 开始-->
    <view class="broker">
      <view class="mainTopTitle">
        <view class="line"></view>
        <view class="title">经纪人</view>
      </view>
      <view class="brokerList">
        <view class="brokerItem" style="position: relative;" v-for="item in brokerList" :key="item.name">
          <view class="avatar"><image :src="baseimg + item.avatar"></image></view>
          <view class="brokerMore">
            <view class="moreTop">
              <view class="name">{{ item.name }}</view>
              <view class="pai">金牌顾问</view>
            </view>
            <view class="moreBottom">{{ item.other }}</view>
          </view>
          <view class="comBtnBox ziXunBtns"><view @click="loginBtn">在线咨询</view></view>
        </view>
      </view>
    </view>
    <!-- 经纪人 结束-->

    <!-- 现成好标，即买即用 开始 -->
    <view class="trademarkBroker">
      <view class="banxin690 aOrangeBox2">
        <view class="mainTopTitle">
          <view class="line"></view>
          <view class="title">现成好标，即买即用</view>
        </view>
        <view class="listbox">
          <view class="itembox" v-for="(item, index) in tuijianArr" :key="item.solesn" @click="toDetail(item.solesn)">
            <view class="fl1"><image :src="item.img"></image></view>
            <view class="fl2">
              <view class="fl2a">
                <text class="t1">{{ item.accounts }}</text>
                <!-- <text class="t2">{{ item.term }}</text> -->
              </view>
              <view class="oe fanwei">类别:{{ item.term }}</view>
              <view class="oe fanwei">序列号:{{ item.solesn }}</view>
              <!--  <view class="fl2b">
                <text class="t1">{{ tenThousand1(item.goods_price) }}</text>
                <text class="t2">{{ tenThousand2(item.goods_price) }}</text>
              </view> -->
              <view class="buy">查看购买</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 现成好标，即买即用 结束 -->
  </view>
</template>

<script>
import { jsonCategory } from '../../util/jsonCategory.js';
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      // #ifdef APP-PLUS
      jv: jv,
      // #endif
      isShowBtnOrTip: true, //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
      loginKeFuText: '登录联系客服查看', //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
      loginKeFuTip: '信息保密，请联系客服询问', //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      baseimg1: this.baseimg1,
      isColl: false, //是否收藏
      collText: '收藏', //是否收藏
      theSolesn: '', //获取上一个页面传递过来的值
      getJson: {}, //方便绑数据的临时json
      staffJson: {}, //方便绑数据的临时json
      tuijianArr: [], //方便绑数据的临时array
      featureArr: [],
      termAmallArr: [],
      features: [],
      vIfRes: null,
      // 本地商标类别
      trademarkType: jsonCategory.data,
      // 商标经纪人
      brokerList: [
        {
          avatar: 'co1.png',
          name: '王文娢',
          other: '3624件成交标源'
        },
        {
          avatar: 'co2.png',
          name: '杨敏昕',
          other: '4557件成交标源'
        },
        {
          avatar: 'co3.png',
          name: '李佳念',
          other: '4162件成交标源'
        },
        {
          avatar: 'co4.png',
          name: '赵奕玥',
          other: '3663件成交标源'
        },
        {
          avatar: 'co5.png',
          name: '范姝歆',
          other: '3990件成交标源'
        },
        {
          avatar: 'co6.png',
          name: '张昱雅',
          other: '4021件成交标源'
        },
        {
          avatar: 'co7.png',
          name: '黄歆冉',
          other: '4850件成交标源'
        },
        {
          avatar: 'co8.png',
          name: '皱熙悦',
          other: '3551件成交标源'
        },
        {
          avatar: 'co9.png',
          name: '李刚',
          other: '4120件成交标源'
        },
        {
          avatar: 'co10.png',
          name: '王强',
          other: '3050件成交标源'
        }
      ],
      isShowMask2: false, //打开验证码弹窗组件
      processList: [
        {
          title: '初审公告日期',
          time: '2021-02-04'
        },
        {
          title: '注册公告日期',
          time: '2021-03-01'
        },
        {
          title: '注册日期',
          time: '2021-03-22'
        }
      ]
    };
  },
  onLoad(options) {
    // 如果不存在参数返回首页
    if (JSON.stringify(options) == '{}') {
      this.gopage('../index/index', 'tabbar');
      return false;
    }
    // 如果有参数
    this.theSolesn = options.solesn;
    this.initAjax(); //公共类的请求方法
  },
  onShow() {
    // 如果已经登录
    let telPhone = uni.getStorageSync('telPhone');
    if (telPhone) {
      this.isShowBtnOrTip = false; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
    } else {
      this.isShowBtnOrTip = true; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
    }
    // 商标经纪人列表
    this.brokerList = this.getRandomArr(this.brokerList, 3);
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone']),
    // 验证码组件三部曲 1/3
    openMask3() {
      this.isShowMask2 = true;
    },
    // 验证码组件三部曲 2/3
    closeMask3() {
      this.isShowMask2 = false;
    },
    // 验证码组件三部曲 3/3
    loginSuccess(option) {
      this.isShowMask2 = false;
      this.isShowBtnOrTip = false; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
      // this.gopage('../index3/onlineService');
    },
    // 授权登录
    async loginBtn(number) {
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone) {
        this.gopage('../index3/onlineService');
        this.isShowBtnOrTip = false; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
      } else {
        // #ifdef H5
        this.gopage('../index3/onlineService');
        this.isShowBtnOrTip = false; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
        // #endif

        // #ifdef APP-PLUS
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
              that.isShowBtnOrTip = false; //是显示按钮还是显示提示，为true显示登录按钮，为false显示提示文字
            });
          }
        });
        // #endif
      }
    },
    // 公共类的请求方法
    initAjax() {
      uni.showLoading({
        title: '加载中....'
      });
      uni.request({
        url: this.baseapi3 + 'mark/detail',
        method: 'POST',
        data: {
          solesn: this.theSolesn
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (res.data.success == false) {
            // 暂无数据
            uni.hideLoading();
            return false;
          } else {
            // 查询成功
            this.getJson = res.data.detail; //方便绑数据的临时json
            this.features = res.data.detail.feature.split(',');
            res.data.recommend.forEach(item => {
              if (item.term[0] == '0') {
                item.term = this.trademarkType[Number(item.term.slice(1))].tradeName;
              } else {
                item.term = this.trademarkType[Number(item.term)].tradeName;
              }
            });
            this.tuijianArr = res.data.recommend.slice(4); //方便绑数据的临时array
            this.staffJson = res.data.staff; //方便绑数据的临时json
            // 此处处理了数组去重和数组排序
            this.featureArr = this.arrDelRepeat(this.getJson.feature.split(',')).sort();
            // 此处处理了数组去重和数组排序
            this.termAmallArr = this.arrDelRepeat(this.getJson.term_small.split(',')).sort();
            this.vIfRes = res.data.detail;
            uni.hideLoading();
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    // 是否收藏
    colloectFun() {
      if (this.isColl == false) {
        this.isColl = true;
        this.collText = '取消';
      } else {
        this.isColl = false;
        this.collText = '收藏';
      }
    },
    toDetail(solesn) {
      uni.redirectTo({
        url: './trademarkSourceDetail?solesn=' + solesn
      });
    },
    // 修改价格
    getPrice(str) {
      let newPrice = Number(str.split('.')[0]);
      if (newPrice >= 10000) {
        return newPrice / 10000 + '万元';
      } else {
        return newPrice + '元';
      }
    },
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
    },
    // 查看跟多详情
    toMoreDetail(str, term) {
      uni.navigateTo({
        url: `../trademarkQuery/trademarkQuery?keyword=${str}&option=0`,
        animationType: 'pop-in',
        animationDuration: 300
      });
    },
    // 预览图片
    preImg(url, index) {
      uni.previewImage({
        current: index,
        urls: url
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/static/css/trademarkSourceDetail.scss';
.uniBigBox {
  background-color: #f5f5f5;
}
.topTrademark {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 240rpx;
  background-size: 100%;
  padding: 0 30rpx;
  background: $thecol;
  image {
    width: 152rpx;
    height: 152rpx;
    background-color: #fff;
    border-radius: 8rpx;
  }
  .rightBox {
    position: relative;
    width: 500rpx;
    .trademarkName {
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
      color: #ffd698;
      margin-bottom: 15rpx;
    }
    .otherMes {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 34rpx;
      color: #b7bbd5;
      margin-bottom: 15rpx;
      text {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        color: #ffa51d;
      }
    }
    .sell {
      position: absolute;
      top: 0;
      right: 0;
      width: 72rpx;
      height: 44rpx;
      line-height: 44rpx;
      background: #2884ff;
      border-radius: 4rpx;
      text-align: center;
      color: #fff;
    }
  }
}

.infoMes {
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 15rpx;
  .topType {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;
    margin-top: 30rpx;
    .leftText {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #2a2c43;
    }
    .type {
      width: 152rpx;
      height: 50rpx;
      background: #f2f2f4;
      border-radius: 5rpx;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 50rpx;
      text-align: center;
      color: #2a2c43;
    }
  }
  .moreServe {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #2a2c43;
    margin-bottom: 40rpx;
    .serveTitle {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #2a2c43;
      margin-bottom: 15rpx;
    }
    .servesList {
      display: flex;
      flex-wrap: wrap;
      .serveItem {
        padding: 8rpx 15rpx;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 34rpx;
        margin-right: 15rpx;
        margin-bottom: 15rpx;
      }
      .orange {
        color: #ff5700;
        background: #ffeee5;
      }
      .green {
        color: #1db951;
        background: #e8f8ed;
      }
      .grey {
        color: #7f8494;
        background-color: #f2f2f4;
      }
    }
  }

  .imgShow {
    .serveTitle {
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      color: #2a2c43;
      margin-bottom: 15rpx;
    }
    .imgList {
      display: flex;
      flex-wrap: wrap;
      .imgItem {
        width: 160rpx;
        height: 160rpx;
        border: 1px solid #eee;
        border-radius: 15rpx;
        overflow: hidden;
        margin-right: 18rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .consult {
    width: 570rpx;
    height: 80rpx;
    border: 2rpx solid #2884ff;
    background: #fff;
    text-align: center;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 80rpx;
    color: #2884ff;
    border-radius: 80rpx;
    margin: auto;
    margin-top: 40rpx;
  }
}

.lawInfo {
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 15rpx;
  .lawList {
    position: relative;
    margin-top: 40rpx;
    .lawItem {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30rpx;
      .left {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #2a2c43;
      }
      .right {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #7f8494;
      }
    }
  }
}

.process {
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
  margin-bottom: 15rpx;
  .processList {
    position: relative;
    margin-top: 40rpx;
    .proItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40rpx;
      .itemLeft {
        .text {
          font-size: 32rpx;
          font-weight: 600;
          line-height: 44rpx;
          color: #2a2c43;
          margin-left: 30rpx;
        }
      }
      .time {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #7f8494;
      }
    }
  }
}

.mainTopTitle {
  display: flex;
  align-items: center;
  .line {
    width: 8rpx;
    height: 30rpx;
    background: #ff5700;
    margin-right: 20rpx;
  }
  .title {
    font-size: 36rpx;
    font-weight: 600;
    line-height: 50rpx;
    color: #2a2c43;
  }
}
.trademarkBroker {
  background-color: #fff;
  padding-top: 30rpx;
  .fl2 {
    position: relative;
    .fl2a {
      .t1 {
        font-size: 36rpx;
        font-weight: 600;
        line-height: 50rpx;
        color: #2a2c43;
      }
    }
    .buy {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 160rpx;
      height: 60rpx;
      background: #2884ff;
      text-align: center;
      border-radius: 34rpx;
      font-size: 24rpx;
      font-weight: 400;
      line-height: 60rpx;
      color: #ffffff;
    }
  }

  .fanwei {
    font-size: 24rpx;
    font-weight: 400;
    line-height: 34rpx;
    color: #7f8494;
  }
}

.bottomBuy {
  position: fixed;
  height: 100rpx;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  z-index: 100;
  border-top: 1px solid #eee;
  .buyItem {
    width: 298rpx;
    height: 68rpx;
    border-radius: 68rpx;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(93deg, #ff5940 0%, #ff874c 100%);
    align-items: center;
    .iconfont {
      font-size: 28rpx;
      color: #fff;
    }
    .text {
      padding-left: 10rpx;
      font-size: 26rpx;
      color: #fff;
    }
  }
  .buyBtn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 68rpx;
    border-radius: 68rpx;
    background: linear-gradient(93deg, #ff5940 0%, #ff874c 100%);
    text-align: center;
    font-size: 24rpx;
    color: #ffffff;
  }
}

// 默认带有模糊效果，没有登录就需要模糊
.showFilterClass {
  .filterBox {
    filter: blur(3px);
  }
}
// 如果登录了，就去掉模糊效果
.hideFilterClass {
  .filterBox {
    filter: blur(0);
  }
}
// 本页面的登录按钮统一调整
.resetBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    border: none !important;
  }
}

.swiper {
  display: flex;
  justify-content: center;

  width: 690rpx;
  height: 150rpx !important;
  swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 150rpx;
    .swiperImg {
      width: 150rpx;
      height: 100%;
      border: 1px solid #eee;
    }
  }
}
// 把之前的轮播图片改为排列图片
.preViewBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .itembox {
    width: 25%;
    border: 1px solid #f5f5f5;
    height: 160rpx;
  }
}
// 咨询按钮
.ziXunBtns {
  position: absolute;
  right: 0;
  top: 0%;
  width: 160rpx;
  view {
    width: 160rpx;
    height: 60rpx;
    background: #1e9fff;
  }
}
// 登录按钮 1/3
.kefuBtn {
  z-index: 10;
  position: absolute;
  width: 300rpx;
  height: 80rpx;
  border-radius: 80rpx;
  line-height: 80rpx;
  background: #2884ff;
  font-size: 24rpx;
  color: #fff;
  text-align: center;
}
// 登录按钮 2/3
.kefuBtn1 {
  top: 50%;
  right: 0;
}
// 登录按钮 3/3
.kefuBtn2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
// 提示文字 1/3
.hasloginbtns {
  z-index: 10;
  position: absolute;
  width: 400rpx;
  height: 80rpx;
  border-radius: 80rpx;
  line-height: 80rpx;
  font-size: 24rpx;
  border: 1px solid #ff5700;
  color: #ff5700;
  background: #fff;
  text-align: center;
}
// 提示文字 2/3
.hasloginbtn1 {
  top: 50%;
  right: 0;
}
// 提示文字 3/3
.hasloginbtn2 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
