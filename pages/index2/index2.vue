<template>
  <view >
	  <!-- :class="LoginBar == true ? '' : 'hideAuth'"  libraryPageView-->
    <!-- 固定在页面右侧的客服组件 开始 -->
    <kefu></kefu>
    <!-- 固定在页面右侧的客服组件 结束 -->

    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 登录享不限查询次数 开始 -->
    <freelogin :isshowauth="showauth" @loginCodeLayer="loginCodeLayer"></freelogin>
    <!-- 登录享不限查询次数 结束 -->

    <!-- 商标库页面固定在上方的区域 开始 -->
    <view class="libraryPageFixHead headFixed" >
      <!-- 搜索框的组件 开始 -->
      <view class="searchsView"><searchs placeholderText="请输入关键词" @searchFun2="searchBtn" @inputEvent="inputEvent"></searchs></view>
      <!-- 搜索框的组件 结束 -->
      <!-- /三个下拉选择 -->
      <view class="selectView">
        <!-- 类别选择 -->
        <picker mode="selector" class="selectItem" :value="categoryVal" :range="categoryArr" :range-key="'tradeName'" @change="categoryChange">
          <view class="onlyBox">
            <text class="t1 text">{{ categoryArr[categoryVal].tradeName }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
        <!-- 价格选择 -->
        <picker mode="selector" class="selectItem" :value="priceVal" :range="priceArr" :range-key="'label'" @change="priceChange">
          <view class="onlyBox">
            <text class="t1 text">{{ priceArr[priceVal].label }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
        <!-- 排序选择 -->
        <picker mode="selector" class="selectItem" :value="timeVal" :range="timeArr" :range-key="'label'" @change="timeChange">
          <view class="onlyBox">
            <text class="t1 text">{{ timeArr[timeVal].label }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
      </view>
      <!-- 三个下拉选择/ -->
      <!-- 友情提示 开始 -->
      <view class="myTipBar">
        <view class="banxin690 myTipBar2">
          共找到商标
          <text>{{ totalNumber }}</text>
          个（今日新增：
          <text>{{ $randomNum(50, 100) }}</text>
          个）
        </view>
      </view>
      <!-- 友情提示 结束 -->
    </view>
    <!-- 商标库页面固定在上方的区域 结束 -->

    <!-- 商标库页面固定在下方的区域 结束 -->
    <view class="libraryPageFixBody marginTop" >
      <!-- /列表大全 -->
      <view class="trademarkShow">
        <view class="trademarkList">
          <view class="trademarks" v-if="isDataShow">
            <view class="trademarkItem" v-for="(item, index) in trademarkList" :key="index" @click="toDetail(item.solesn)">
              <view class="imageBox"><image :src="item.img" mode="widthFix"></image></view>
              <view class="message">
                <view class="keyword oe">{{ item.accounts }}</view>
                <view class="registeredNum">序列号：{{ item.solesn }}</view>
                <view class="application">适用范围：{{ item.feature }}</view>
                <view class="type">
                  价格：
                  <text class="t1">{{ tenThousand1(item.goods_price) }}</text>
                  <text class="t2">{{ tenThousand2(item.goods_price) }}</text>
                </view>
              </view>
              <view class="status status1">{{ item.term }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 列表大全/ -->
      <!-- /暂无数据 -->
      <view v-if="!isDataShow"><nodata style="padding: 50rpx 0;" @refreshFun2="refreshFun3"></nodata></view>
      <!-- /暂无数据 -->
    </view>
    <!-- 商标库页面固定在下方的区域 结束 -->
  </view>
</template>

<script>
import { yuzhuaRes } from '../../util/request.js';
import { mapState, mapMutations } from 'vuex';
import { jsonCategory } from '../../util/jsonCategory.js'; //商标类别---本地json
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      categoryArr: jsonCategory.data,
      categoryVal: 0,
      isShowMask2: false,
      priceArr: [
        {
          id: 0,
          label: '价格'
        },
        {
          id: 1,
          label: '1万以下'
        },
        {
          id: 2,
          label: '1-2万'
        },
        {
          id: 3,
          label: '2-5万'
        },
        {
          id: 4,
          label: '5万以上'
        }
      ],
      priceVal: 0,
      timeArr: [
        {
          id: 1,
          label: '综合排序'
        },
        {
          id: 3,
          label: '价格从高到低'
        },
        {
          id: 4,
          label: '价格从低到高'
        },
        {
          id: 5,
          label: '最新发布'
        }
      ],
      timeVal: 0,
      trademarkList: [],
      totalNumber: 0,
      // 商标分类参数
      trems: '',
      // 价格区间
      price: '',
      // 关键字
      keyword: '',
      // 排序参数
      sort_type: 1,
      // 当前页数
      currentPage: 1,
      // 页面数据条数
      pageSize: 20,
      // 是否有数据
      isDataShow: true,
      // 是否是下拉刷新
      isReachBottom: false,
      solesn: '',
      // #ifdef APP-PLUS
      jv: jv,
      // #endif
    };
  },
  onLoad() {
    this.getData();
  },
  onShow() {
    let telPhone = uni.getStorageSync('telPhone');
    this.changeshowauth(!Boolean(telPhone));
    this.changeLoginBar(!Boolean(telPhone));
  },
  methods: {
    ...mapMutations(['getkeyWords', 'changeTabIndex', 'changeSearchNumber', 'getPhone', 'changeSearchNumber', 'changeshowauth', 'changeLoginBar']),
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
    searchBtn(keyword) {
      this.changeSearchNumber();
      this.keyword = keyword;
      this.currentPage = 1;
      this.trems = '';
      this.price = '';
      this.sort_type = 1;
      this.categoryVal = 0;
      this.priceVal = 0;
      this.timeVal = 0;

      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(1); // 一键登录
      } else {
        this.getData();
      }
    },
    categoryChange(e) {
      this.currentPage = 1;
      this.trademarkList = [];
      this.categoryVal = e.target.value;
	  if(this.categoryVal === 0) {
		  this.trems = '';
	  }else {
		  this.trems = this.categoryVal >= 10 ? this.categoryVal : '0'+this.categoryVal
	  }
      this.getData();
    },
    priceChange(e) {
      this.currentPage = 1;
      this.trademarkList = [];
      this.priceVal = e.target.value;
      let str = this.priceArr[e.target.value].label;
      if (str != '价格') {
        if (str == '1万以下') {
          this.price = '0-10000';
        } else if (str == '1-2万') {
          this.price = '10000-20000';
        } else if (str == '2-5万') {
          this.price = '20000-50000';
        } else if (str == '5万以上') {
          this.price = '50000-99999999999999999';
        }
      } else {
        this.price = '';
      }
      this.getData();
    },
    timeChange(e) {
      this.currentPage = 1;
      this.trademarkList = [];
      this.timeVal = e.target.value;
      this.sort_type = this.timeArr[e.target.value].id;
      this.getData();
    },
    async getData() {
      // isReachBottom 是 true 是下拉刷新
      uni.showLoading({
        title: '数据加载中'
      });
      let params = {
        page: this.currentPage,
        page_size: this.pageSize,
        keyword: this.keyword,
        trems: this.trems,
        price: this.price,
        sort_type: this.sort_type
      };
      // 请求
      let res = await yuzhuaRes('mark/search', params);
      if (!res) {
        uni.hideLoading();
        this.$layer('网络异常,请稍后重试');
        return false;
      }
      res.lists.forEach(item => {
        if (item.term[0] == '0') {
          item.term = this.categoryArr[Number(item.term.slice(1))].tradeName;
        } else {
          item.term = this.categoryArr[Number(item.term)].tradeName;
        }
      });
      if (this.isReachBottom) {
        this.trademarkList = [...this.trademarkList, ...res.lists];
      } else {
        this.trademarkList = [];
        this.trademarkList = [...this.trademarkList, ...res.lists];
      }

      this.totalNumber = res.total;
      if (this.trademarkList == 0) {
        this.isDataShow = false;
      } else {
        this.isDataShow = true;
      }
      this.isReachBottom = false;
      uni.hideLoading();
    },
    // 跳转到详情页
    toDetail(solesn) {
      // #ifdef H5
      uni.navigateTo({
        url: '../trademarkSource/trademarkSourceDetail?solesn=' + solesn
      });
      // #endif

      // #ifdef APP-PLUS
      this.changeSearchNumber();
      this.solesn = solesn;
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(2); // 一键登录
      } else {
        uni.navigateTo({
          url: '../trademarkSource/trademarkSourceDetail?solesn=' + solesn
        });
      }
      // #endif
    },
    // 上拉刷新
    onReachBottom() {
		console.log('shuaxin')
      let total = this.currentPage * this.pageSize;
      if (this.totalNumber > total) {
        this.isReachBottom = true;
        this.currentPage = this.currentPage + 1;
        this.getData();
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        });
      }
    },
    // 点击查看
    seeMore() {
      this.changeTabIndex(2);
      this.getkeyWords(this.keyword || '无');
      uni.switchTab({
        url: '../index/index'
      });
    },
    // 监听头部搜索框的实时输入
    inputEvent(key) {
      this.keyword = key;
    },
    // 暂无数据的刷新按钮
    refreshFun3() {
      this.keyword = '';
      this.inputEvent('');
      this.getData();
    },
    getAuthor(number) {
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
          this.jgLogin(this.jv, function(uncrypted) {
            that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
            // ------------此页面单独写的东东
            if (uncrypted.length == 11) {
              if (number == 1) {
                that.getData();
              } else {
                uni.navigateTo({
                  url: '../trademarkSource/trademarkSourceDetail?solesn=' + that.solesn
                });
              }
            } else {
              uni.showToast({
                title: '请登录后查看',
                icon: 'none',
                duration: 800
              });
            }
          });
        }
      });
      // #endif
    }
  },
  computed: {
    ...mapState(['index2keyWords', 'phone', 'tabIndex', 'searchTraNumber', 'showauth', 'LoginBar'])
  }
};
</script>

<style lang="scss">
.selectView {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 30rpx;
  background-color: #fff;
  .selectItem {
    position: relative;
    width: 30%;
    background: #ddd;
    border-radius: 24rpx;
    text-align: center;
    font-size: 20rpx;
    font-weight: 400;
    color: #292929;
    line-height: 48rpx;
    .onlyBox {
      height: 48rpx;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f5f5;
      border-radius: 25rpx;
    }
  }
}
.trademarkShow {
  padding: 20rpx 30rpx;
  background: #f2f4f5;
  .trademarkList {
    .showTitle {
      font-size: 22rpx;
      font-weight: 400;
      color: #484848;
      line-height: 32rpx;
      margin-bottom: 48rpx;
      text {
        color: #1247fc;
        padding: 0 10rpx;
      }
    }
  }
  .guanggao {
    padding-top: 50rpx;
    background: #ffffff;
    border-radius: 12px;
    padding-bottom: 50rpx;
    .title {
      text-align: center;
      font-size: 28rpx;
      font-weight: 400;
      color: #969696;
      line-height: 30rpx;
      text {
        color: #f68b4c;
        font-size: 48rpx;
        padding: 0 10rpx;
      }
    }

    .more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 150rpx;
      height: 40rpx;
      font-size: 24rpx;
      font-weight: 400;
      color: #134bfc !important;
      line-height: 30rpx;
      margin: 50rpx auto;
      margin-bottom: 0;

      image {
        width: 28rpx;
        height: 28rpx;
      }
    }
  }

  .trademarks {
    margin-top: 20rpx;

    .trademarkItem {
      display: flex;
      align-items: center;
      padding-left: 30rpx;
      background-color: #fff;
      border-radius: 12px;
      margin-bottom: 20rpx;
      .imageBox {
        width: 150rpx;
        height: 150rpx;
        border: 1px solid #eee;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        image {
          width: 100%;
          max-width: 100%;
        }
      }
      .message {
        width: calc(100% - 350rpx);
        padding-left: 30rpx;
        .keyword {
          font-size: 32rpx;
          font-weight: 600;
          color: #292929;
          line-height: 32rpx;
          margin: 25rpx 0;
        }
        .registeredNum,
        .date,
        .type,
        .application {
          font-size: 24rpx;
          font-weight: 400;
          color: #969696;
          line-height: 30rpx;
          margin-bottom: 16rpx;
          width: 360rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .type .t1 {
          font-weight: 700;
          font-size: 32rpx;
          color: #e73c15;
        }
        .type .t2 {
          padding-left: 10rpx;
          font-size: 22rpx;
          color: #e73c15;
        }
      }
      .status {
        align-self: flex-start;
        width: 160rpx;
        height: 36rpx;
        line-height: 36rpx;
        text-align: center;
        color: #fff;
        font-size: 20rpx;
        border-radius: 15rpx;
        margin-top: 20rpx;
      }

      .status1 {
        background: linear-gradient(to right, #ffaa64 0%, #ff714b 100%);
      }

      .status2 {
        background: linear-gradient(to right, #93b7fd 0%, #5b84d6 100%);
      }

      .status3 {
        background: linear-gradient(to right, #ff6e56 0%, #f54a2e 100%);
      }

      .status4 {
        background: linear-gradient(to right, #ffde72 0%, #f9aa56 100%);
      }

      .status5 {
        background: linear-gradient(to right, #5beea7 0%, #48d491 100%);
      }
    }
  }
}
.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  image {
    width: 328rpx;
    height: 125rpx;
  }
}
// 黄老师把“商标库”页面分为了上下两个部分
.libraryPageView {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 90rpx;
  .loginCountBox {
    display: block;
  }
  .libraryPageFixHead {
    // overflow-x: hidden;
    // overflow-y: auto;
	overflow: hidden;

  }
  .libraryPageFixBody {
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
  }
}
.libraryPageView.hideAuth {
  padding-bottom: 0;
  .loginCountBox {
    display: none;
  }
}

.headFixed {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 1000;
}
.marginTop {
	margin-top: 278rpx;
}
</style>
