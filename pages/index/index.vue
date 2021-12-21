<template>
  <!-- <view class="uniBigBox" :class="isLoginBar == true ? '' : 'hideAuth'"> -->
  <view class="uniBigBox" :class="[{ hideAuth: LoginBar == false }, { ifScrollClass: isShowScroll == true }]">
    <!-- 如果登录了，需要把“isLoginBar”改为true，没有登录，默认就是false -->

    <!-- 黄老师自定义头部导航栏 开始 -->
    <!-- #ifdef APP-PLUS -->
    <view class="customCommHead">首页</view>
    <!-- #endif -->
    <!-- 黄老师自定义头部导航栏 结束 -->

    <!-- 固定在页面右侧的客服组件 开始 -->
    <kefu></kefu>
    <!-- 固定在页面右侧的客服组件 结束 -->

    <!-- 登录享不限查询次数 开始 -->
    <freelogin :isshowauth="showauth" @loginCodeLayer="loginCodeLayer"></freelogin>
    <!-- 登录享不限查询次数 结束 -->

    <!-- 如何调用红包组件呢? -->
    <!-- @click="showHongbao" -->
    <!-- 红包组件 开始 -->
    <view v-if="isBaoBox"><hongbao @clickHongbao="clickHongbao"></hongbao></view>
    <!-- 红包组件 结束-->

    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 首页顶部的盒子 开始 -->
    <view class="indexTopBg" :class="{ isApp: !judgeIsH5(), isH5: judgeIsH5() }">
      <view class="bannerTwo bg100" :style="{ background: `url(${baseimg2 + bannerImgUrl}) #3F425D` }">
        <view class="banxin690 bannerTwo2">
          <view class="peoplebox">
            <view class="fls"><image :src="baseimg1 + item" v-for="(item, index) in showInquirerImages" :key="index"></image></view>
            <view class="frs">
              <text class="t1">{{ randomInt }}</text>
              <text class="t2">人正在查询</text>
            </view>
          </view>
          <view class="logobox"><image :src="baseimg1 + 'logonew.png'"></image></view>
        </view>
      </view>
    </view>
    <!-- 首页顶部的盒子 结束 -->

    <!-- table查询盒子 开始 -->
    <view class="tableSearch banxin690" :class="{ isApp: !judgeIsH5(), isH5: judgeIsH5() }">
      <!-- /tab选项卡头部 -->
      <view class="tableSwitchHead">
        <view class="tableItem" :class="tableItemIndex == index ? 'active' : ''" v-for="(item, index) in tableList" :key="item.text" @click="changeQuery(index)">
          {{ item }}
          <text class="iconfont icon-sanjiaoshang"></text>
        </view>
      </view>
      <!-- tab选项卡头部/ -->
      <!-- /1-查商标的tabBody -->
      <view v-show="tableItemIndex === 0">
        <view class="searchMore searchMore1">
          <view class="tiptext">免费商标查询，提高注册成功率</view>
          <view class="inputBox">
            <input
              class="input"
              placeholder-class="place"
              type="text"
              v-model="keyword"
              placeholder="商标名/申请号/申请人/代理机构"
              confirm-type="search"
              @focus="focusInputFun"
              @blur="blurInputFun"
              @confirm="searTrademark1"
              style="background-color: rgb(231, 232, 240);"
            />
            <view class="imgBox" @click="searTrademark1"><text class="iconfont icon-search"></text></view>
            <!-- /用户的缓存下拉菜单 -->
            <view class="userStorageMenu" v-show="isShowStorageMenu" @click="storageMenuFun">
              <view class="itembox" v-for="(item, index) in storageMenuList" :key="index" @click="storageSearch(item)">{{ item }}</view>
            </view>
            <!-- 用户的缓存下拉菜单/ -->
          </view>
          <view class="queryBox oe" style="display: none;">
            <text>昨日查询人数：</text>
            <text class="numbers">3268</text>
            <text>次</text>
          </view>
        </view>
        <view class="historyBox" style="padding-top: 36rpx;">
          <view class="history1">热门搜索：</view>
          <view class="history2" @click="historyClick1('早鸽')">早鸽</view>
          <view class="history2" @click="historyClick1('鱼爪')">鱼爪</view>
          <view class="history2" @click="historyClick1('初巧')">初巧</view>
          <view class="history2" @click="historyClick1('淘宝')">淘宝</view>
        </view>
      </view>
      <!-- 1-查商标的tabBody/ -->
      <!-- /2-查商标的tabBody -->
      <view style="padding-bottom: 10rpx;" v-show="tableItemIndex === 1">
        <view class="searchMore searchMore2">
          <view class="tiptext">海量标源数据，实时动态更新</view>
          <view class="inputBox1">
            <input type="text" v-model="keyword2" placeholder="请输入商标名" maxlength="10" class="inputClass" placeholder-class="placeClass" style="background-color: #E7E8F0;" />
          </view>
          <view class="inputBox2">
            <view class="fls">
              <picker class="pickItem" mode="selector" @change="pickerChange1" :value="pickerIndex1" :range="pickerArray1" :range-key="'tradeName'">
                <view class="pickOnly">
                  <text class="text">{{ pickerArray1[pickerIndex1].tradeName }}</text>
                  <text class="iconfont icon-youjiantou"></text>
                </view>
              </picker>
            </view>
            <view class="frs" @click="searTrademark2">确定</view>
          </view>
        </view>
        <view class="historyBox" style="display: none;">
          <view class="history1">热门搜索：</view>
          <view class="history2" @click="historyClick2('鱼爪')">鱼爪</view>
          <view class="history2" @click="historyClick2('初巧')">初巧</view>
          <view class="history2" @click="historyClick2('天猫')">天猫</view>
          <view class="history2" @click="historyClick2('淘宝')">淘宝</view>
        </view>
      </view>
      <!-- 2-查商标的tabBody/ -->
    </view>
    <!-- table查询盒子 结束 -->

    <!-- AI智能查询助手 开始 -->
    <view class="aiIntelligent">
      <view class="banxin690 aiIntelligent2">
        <view class="titles">AI智能查询助手</view>
        <view class="lists">
			<view class="itembox" @click="zhuShouDetail4">
			  <image class="iconhotindex" :src="baseimg1 + 'iconhotindex.png'"></image>
			  <view class="v1"><image :src="baseimg1 + 'zhushou4.png'"></image></view>
			  <view class="v2">快速注册</view>
			</view>
			<view class="itembox" @click="zhuShouDetail3">
			  <view class="v1"><image :src="baseimg1 + 'zhushou3.png'"></image></view>
			  <view class="v2">注册成功率</view>
			</view>
		
          <view class="itembox" @click="zhuShouDetail1">
            <view class="v1"><image :src="baseimg1 + 'zhushou1.png'"></image></view>
            <view class="v2">商标分类</view>
          </view>
          <view class="itembox" @click="zhuShouDetail2">
            <view class="v1"><image :src="baseimg1 + 'zhushou2.png'"></image></view>
            <view class="v2">初审公告</view>
          </view>
        
        </view>
      </view>
    </view>
    <!-- AI智能查询助手 结束 -->

    <!-- 仅仅轮播大图 开始 -->
    <view class="mySwiperZuJian1">
      <view class="banxin690 mySwiperZuJian2">
        <swiper
          class="swiperTag"
          :circular="true"
          :indicator-dots="true"
          :autoplay="true"
          :interval="4000"
          :duration="500"
          :indicator-color="`#aaaaaa`"
          :indicator-active-color="`#ffffff`"
        >
          <swiper-item class="swiperItemTag" @click="gopage('/pages/index3/index3', 'tabbar')">
            <view class="itembox"><image :src="baseimg1 + 'adbanner1.png'"></image></view>
          </swiper-item>
          <swiper-item class="swiperItemTag" @click="gopage('/pages/trademarkService/service?ids=257')">
            <view class="itembox"><image :src="baseimg1 + 'adbanner2.png'"></image></view>
          </swiper-item>
          <swiper-item class="swiperItemTag" @click="gopage('/pages/trademarkService/service?ids=8')">
            <view class="itembox"><image :src="baseimg1 + 'adbanner3.png'"></image></view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- 仅仅轮播大图 结束 -->

    <!-- 商标服务 开始 -->
    <view class="trademarkService">
      <view class="banxin690 trademarkService2">
        <!-- /tab切换头部 -->
        <view class="tuiJianTabHead">
          <view class="banxin690 tuiJianTabHead2">
            <view class="itembox" :class="index == tabelIndex ? 'on' : ''" v-for="(item, index) in tabelList" :key="item" @click="tabTuiJianFun(index)">{{ item }}</view>
          </view>
        </view>
        <!-- tab切换头部/ -->
        <!-- /推荐好标的身体 -->
        <view class="trademarkList">
          <view class="trademarkItem" v-for="(item, index) in tabelTrademarkList" :key="index" @click="toDetail(item.solesn)">
            <view class="imageBox"><image :src="item.img" mode="widthFix"></image></view>
            <view class="message">
              <view class="keyword oe">{{ item.accounts }}</view>
              <view class="registeredNum">序列号：{{ item.solesn }}</view>
              <view class="application">适用范围：{{ item.feature }}</view>
              <view class="type" v-if="item.price">
                价格：
                <text class="t1">面议</text>
                <!--        <text class="t2">{{ tenThousand2(item.goods_price) }}</text> -->
              </view>
              <view class="type" v-else>日期：{{ item.date }}</view>
            </view>
            <view class="status status1">{{ item.term }}</view>
          </view>
        </view>
        <!-- 推荐好标的身体/ -->
      </view>
    </view>
    <!-- 商标服务 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
import { yuzhuaRes, request } from '../../util/request.js';
import { jsonCategory } from '../../util/jsonCategory.js'; //商标类别---本地json
export default {
  onTabItemTap: function(e) {
    if (e.index == 0) {
      this.tableItemIndex = 0;
    }
  },
  data() {
    return {
      bannerImgUrl: 'bannernew1.png', //banner图片切换
      isShowScroll: false, //黄老师自定义头部导航栏
      isShowStorageMenu: false, //是否显示用户的缓存下拉菜单
      storageMenuList: [], //用户的缓存下拉菜单的数组
      storageMenuTimeOut: '', //延时用户的缓存下拉菜单消失
      baseimg: this.baseimg, //全局定义图片路径
      baseimg1: this.baseimg1, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      isShowLoginTips: false, //是否显示登录试一试的提示
      categoryArr: jsonCategory.data,
      pickerIndex1: 0, //picker选择器
      pickerArray1: jsonCategory.data, //picker选择器
      ismask1a: false,
      ismask2a: false,
      ismask3a: false,
      // 知产工具
      knowledgeList: [
        {
          imgs: 'icon11.png',
          txt1: '商标分类',
          txt2: '查询商标服务',
          url: '../trademarkClassify/trademarkClassify'
        },
        {
          imgs: 'icon22.png',
          txt1: '商标顾问',
          txt2: '顾问免费解答',
          url: './trademarkAdviser'
        },
        {
          imgs: 'icon33.png',
          txt1: '初审公告',
          txt2: '已更新公告',
          url: './announcement'
        },
        {
          imgs: 'icon44.png',
          txt1: '法律服务',
          txt2: '保障您的权益',
          url: './legalService'
        },
        {
          imgs: 'icon55.png',
          txt1: '商标状态',
          txt2: '实时了解商标',
          url: './trademarkStatus'
        },
        {
          imgs: 'icon66.png',
          txt1: '区域统计',
          txt2: '商标注册统计',
          url: './trademarkArea1'
        }
      ],
      // 商标服务
      trademarkList: [
        {
          imgs: 'navfuwu1.png',
          txts: '商标注册',
          url: '../trademarkService/service?ids=7'
        },
        {
          imgs: 'navfuwu2.png',
          txts: '商标转让',
          url: '../trademarkService/service?ids=19'
        },
        {
          imgs: 'navfuwu3.png',
          txts: '驳回复审',
          url: '../trademarkService/service?ids=10'
        },
        {
          imgs: 'navfuwu4.png',
          txts: '商标注销',
          url: '../trademarkService/service?ids=17'
        },
        {
          imgs: 'navfuwu5.png',
          txts: '异议申请',
          url: '../trademarkService/service?ids=6'
        },
        {
          imgs: 'navfuwu6.png',
          txts: '商标续展',
          url: '../trademarkService/service?ids=13'
        },
        {
          imgs: 'navfuwu7.png',
          txts: '无效宣告',
          url: '../trademarkService/service?ids=9'
        },
        {
          imgs: 'navfuwu8.png',
          txts: '查看更多',
          url: '../trademarkService/trademarkServiceMore'
        }
      ],
      hotsearKey: '',
      navToNumber: '',
      tableList: ['查商标', '买商标'],
      tableItemIndex: 0, // 当前选中的查询列表项
      selectItemList: ['商标名', '申请人'], // 当前选中的查询列表项
      selectItemIndex: 0, // 当前选中的查询列表项
      keyword: '', // 商标搜索关键字
      keyword2: '', // 商标搜索关键字
      regWords: '', // 注册成功率的商标名
      regType: '', // 注册成功率的商标类型
      randomInt: 0, // 随机查看人数
      randImages: [
        'headindex1.jpg',
        'headindex2.jpg',
        'headindex3.jpg',
        'headindex4.jpg',
        'headindex5.jpg',
        'headindex6.jpg',
        'headindex7.jpg',
        'headindex8.jpg',
        'headindex9.jpg',
        'headindex10.jpg'
      ],
      showInquirerImages: [],
      isShowMask2: false,
      // #ifdef APP-PLUS
      jv: jv,
      // #endif
      tabelList: ['推荐好标', '最新注册', '最新申请'],
      tabelIndex: 0,
      tabelTrademarkList: [],
      serviceArr: [
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
        }
      ],
      timer: null
    };
  },
  // 黄老师自定义头部导航栏
  onPageScroll(res) {
    const scrollTopValue = res.scrollTop;
    if (scrollTopValue > 50) {
      this.isShowScroll = true;
    } else {
      this.isShowScroll = false;
    }
  },
  onLoad(params) {
    // 推荐的接口
    this.tranList(3, 5);
    // 随机图片
    this.showInquirerImages = this.randomImages(this.randImages, 4);
    // 首次打开app用户登录
    // if (!this.phone) {
    //   // #ifdef APP-PLUS
    //   this.jv.checkVerifyEnable(result => {
    //     // 如果没有开启数据流量,就弹出验证码弹窗组件
    //     if (result.enable === false) {
    //       uni.hideTabBar();
    //       this.openMask3();
    //       return false;
    //     } else {
    //       // 如果开启了数据流量，就直接极光一键登录授权
    //       this.popupsUI();
    //       let that = this;
    //       this.jgLogin(this.jv, function(uncrypted) {
    //         that.getPhone(uncrypted); // 这是存vuex的电话，每个页面都必须写的
    //         if (uncrypted === 6002) {
    //           that.timer = setTimeout(() => {
    //             uni.hideTabBar();
    //             that.baoShowTrue();
    //           }, 3000);
    //         }
    //       });
    //     }
    //   });
    //   // #endif
    // } else {
    //   this.isBaoBoxFalse();
    // }
  },
  onHide() {
    clearTimeout(this.timer);
  },
  onShow() {
    this.getrandomInt();
    this.hotsearKey = '';
    this.navToNumber = '';
    // this.keyword = '';
    // this.keyword2 = '';
    // this.regWords = '';
    // this.regType = '';
    // this.tableItemIndex = this.tabIndex;

    if (this.index2keyWords != '无') {
      this.regWords = this.index2keyWords;
      this.clearkeyWords();
    }

    let telPhone = uni.getStorageSync('telPhone');
    this.changeshowauth(!Boolean(telPhone));
    this.changeLoginBar(!Boolean(telPhone));
  },
  computed: {
    ...mapState(['index2keyWords', 'phone', 'tabIndex', 'searchTraNumber', 'isBaoBox', 'showauth', 'LoginBar'])
  },
  methods: {
    ...mapMutations([
      'clearkeyWords',
      'getkeyWordsNull',
      'changeTabIndex',
      'changeSearchNumber',
      'getPhone',
      'clearTransKey',
      'baoShowTrue',
      'baoShowFalse',
      'isBaoBoxFalse',
      'isBaoBoxTrue',
      'changeshowauth',
      'changeLoginBar'
    ]),
    // 登录享不限查询次数
    loginCodeLayer() {
      this.openMask3(); //打开验证码组件弹窗
    },
    // 查询助手的四个图标跳转到详情 1/4
    zhuShouDetail1() {
      // #ifdef H5
      this.navToUrl(10);
      // #endif
      // #ifdef APP-PLUS
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone == true || telPhone.length == 11) {
        this.navToUrl(10);
      } else {
        this.getAuthor(10);
      }
      // #endif
    },
    // 查询助手的四个图标跳转到详情 2/4
    zhuShouDetail2() {
      // #ifdef H5
      this.navToUrl(11);
      // #endif
      // #ifdef APP-PLUS
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone == true || telPhone.length == 11) {
        this.navToUrl(11);
      } else {
        this.getAuthor(11);
      }
      // #endif
    },
    // 查询助手的四个图标跳转到详情 3/4
    zhuShouDetail3() {
      // #ifdef H5
      this.navToUrl(3);
      // #endif
      // #ifdef APP-PLUS
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone == true || telPhone.length == 11) {
        this.navToUrl(3);
      } else {
        this.getAuthor(3);
      }
      // #endif
    },
    // 查询助手的四个图标跳转到详情 4/4
    zhuShouDetail4() {
      // #ifdef H5
      this.navToUrl(13);
      // #endif
      // #ifdef APP-PLUS
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone == true || telPhone.length == 11) {
        this.navToUrl(13);
      } else {
        this.getAuthor(13);
      }
      // #endif
    },
    // 请输入商标名的文本框--文本框聚焦
    focusInputFun() {
      if (this.storageMenuList.length == 0) {
        this.isShowStorageMenu = false;
        return false;
      }
      this.isShowStorageMenu = true;
    },
    // 请输入商标名的文本框--文本框失焦
    blurInputFun() {
      this.storageMenuTimeOut = setTimeout(() => {
        this.isShowStorageMenu = false;
      }, 500);
    },
    // 点击用户的缓存下拉菜单自身不消失
    storageMenuFun() {
      clearTimeout(this.storageMenuTimeOut);
    },
    // 点击缓存中的历史记录复制到文本框中
    storageSearch(options) {
      this.keyword2 = options;
      this.isShowStorageMenu = false;
      uni.navigateTo({
        url: `../trademarkQuery/trademarkQuery?keyword=${options}&option=${this.selectItemIndex}`
      });
    },
    // picker选择器
    pickerChange1(e) {
      this.pickerIndex1 = e.target.value;
    },
    // 跳转到详情页面
    goToDetail(ids) {
      uni.navigateTo({
        url: '../trademarkService/service?ids=' + ids
      });
    },
    // table查询盒子
    changeQuery(obj) {
      this.tableItemIndex = obj;
      if (obj == 0) {
        this.bannerImgUrl = 'bannernew1.png';
      } else if (obj == 1) {
        this.bannerImgUrl = 'bannernew2.png';
      }
    },
    // 关键字搜索--查商标-提交事件
    searTrademark1() {
      if (!this.keyword) {
        uni.showToast({
          title: '请填写商标关键字',
          icon: 'none',
          duration: 500
        });
        return false;
      }
      this.changeSearchNumber();
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(1); // 一键登录
      } else {
        this.changeTabIndex(0);
        uni.navigateTo({
          url: `../trademarkQuery/trademarkQuery?keyword=${this.keyword}&option=${this.selectItemIndex}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
      // 下面的操作必须等上面的操作完成后执行
      this.storageMenuList.unshift(this.keyword); //给缓存框加搜索历史关键字
      this.storageMenuList = this.arrDelRepeat(this.storageMenuList); //数组去重
      this.keyword = ''; //清空表单
    },
    // 关键字搜索--查标源-提交事件
    searTrademark2() {
      if (!this.keyword2) {
        uni.showToast({
          title: '请输入商标名',
          icon: 'none',
          duration: 500
        });
        return false;
      }
      if (this.pickerIndex1 == 0) {
        uni.showToast({
          title: '请选择商标类别',
          icon: 'none',
          duration: 500
        });
        return false;
      }

      // #ifdef H5
      uni.navigateTo({
        url: `../trademarkSource/trademarkSource?word=${this.keyword2}&picker=${this.pickerIndex1}`
      });
      // #endif

      // #ifdef APP-PLUS
      this.changeSearchNumber();
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(2); // 一键登录
      } else {
        this.changeTabIndex(1);
        uni.navigateTo({
          url: `../trademarkSource/trademarkSource?word=${this.keyword2}&picker=${this.pickerIndex1}`
        });
      }
      // #endif

      // 下面的操作必须等上面的操作完成后执行
      this.keyword2 = ''; //清空表单
      this.pickerIndex1 = 0; //清空选择器
    },
    // 热门搜索的商标查询
    historyClick1(key) {
      this.changeSearchNumber();
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.hotsearKey = key;
        this.getAuthor(5, key); // 一键登录
      } else {
        this.getkeyWordsNull();
        this.changeTabIndex(0);
        uni.navigateTo({
          url: `../trademarkQuery/trademarkQuery?keyword=${key}&option=${this.selectItemIndex}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    // 热门搜索的商标购买
    historyClick2(key) {
      this.changeSearchNumber();
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.hotsearKey = key;
        this.getAuthor(4, key); // 一键登录
      } else {
        this.getkeyWordsNull();
        this.changeTabIndex(1);
        uni.navigateTo({
          url: `../trademarkSource/trademarkSource?word=${key}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    // 注册成功率
    searchReg() {
      if (!this.regWords) {
        uni.showToast({
          title: '请填写商标名称',
          icon: 'none'
        });
        return false;
      }
      if (!this.regType) {
        uni.showToast({
          title: '请填写商品类型',
          icon: 'none'
        });
        return false;
      }
      this.changeSearchNumber();
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(3); // 一键登录
      } else {
        this.changeTabIndex(2);
        uni.navigateTo({
          url: '../trademarkReg/trademarkReg?regWords=' + this.regWords + '&regType=' + this.regType,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    // 随机图片
    randomImages(arr, count) {
      var shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    // 随机数
    getrandomInt() {
      this.randomInt = parseInt(Math.round((Math.random() * (800 - 300) + 300) * 10) / 10);
    },
    // 验证码弹窗组件三部曲 1/3
    openMask3() {
      this.isShowMask2 = true;
      uni.hideTabBar();
    },
    // 验证码弹窗组件三部曲 2/3
    closeMask3() {
      uni.showTabBar();
      this.navToNumber = '';
      this.isShowMask2 = false;
    },
    // 验证码弹窗组件三部曲 3/3
    loginSuccess(option) {
      uni.showTabBar();
      this.isShowMask2 = false;
      // 本页面单独搞的
      this.navToUrl(this.navToNumber);
    },
    // 极光授权登录
    getAuthor(number) {
      // #ifdef APP-PLUS
      this.jv.checkVerifyEnable(result => {
        // 如果没有开启数据流量,就弹出验证码弹窗组件
        if (result.enable === false) {
          this.navToNumber = number;
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
              that.navToUrl(number);
              that.isShowLoginTips = false; //是否显示登录试一试的提示
            } else {
              that.$layer('请登录后查看');
              that.isShowLoginTips = true; //是否显示登录试一试的提示
            }
          });
        }
      });
      // #endif
    },
    toTool(url, index) {
      if (index == 2) {
        this.changeSearchNumber();
        if (this.searchTraNumber >= 4 && !this.phone) {
          this.getAuthor(6); // 一键登录
        } else {
          this.changeTabIndex(0);
          uni.navigateTo({
            url: url,
            animationType: 'pop-in',
            animationDuration: 300
          });
        }
      } else {
        uni.navigateTo({
          url: url,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    // 跳转页面
    navToUrl(number) {
      if (number == 1) {
        this.changeTabIndex(0);
        uni.navigateTo({
          url: `../trademarkQuery/trademarkQuery?keyword=${this.keyword}&option=${this.selectItemIndex}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 2) {
        this.changeTabIndex(1);
        uni.navigateTo({
          url: `../trademarkSource/trademarkSource?word=${this.keyword2}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 3) {
        this.changeTabIndex(2);
        uni.navigateTo({
          url: '../trademarkReg/trademarkReg?regWords=' + this.regWords + '&regType=' + this.regType,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 4) {
        this.getkeyWordsNull();
        this.changeTabIndex(1);
        uni.navigateTo({
          url: `../trademarkSource/trademarkSource?word=${this.hotsearKey}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 5) {
        this.getkeyWordsNull();
        this.changeTabIndex(0);
        uni.navigateTo({
          url: `../trademarkQuery/trademarkQuery?keyword=${this.hotsearKey}&option=${this.selectItemIndex}`,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 6) {
        uni.navigateTo({
          url: './announcement',
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 7) {
        uni.navigateTo({
          url: '/pages/trademarkService/service?ids=7',
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 8) {
        uni.navigateTo({
          url: '../trademarkSource/trademarkSourceDetail?solesn=' + this.solesn,
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 9) {
        this.baoShowFalse();
        // this.smallShow = false
        uni.showTabBar();
        this.isBaoBoxFalse();
      } else if (number == 10) {
        uni.navigateTo({
          url: '/pages/trademarkClassify/trademarkClassify',
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 11) {
        uni.navigateTo({
          url: '/pages/index/announcement',
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 12) {
        uni.navigateTo({
          url: '/pages/index/trademarkStatus',
          animationType: 'pop-in',
          animationDuration: 300
        });
      } else if (number == 13) {
        uni.navigateTo({
          url: '/pages/index/regFast',
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    regClick() {
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(7); // 一键登录
      } else {
        uni.navigateTo({
          url: '/pages/trademarkService/service?ids=7',
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    // 推荐的tab切换头部
    tabTuiJianFun(option) {
      this.tabelIndex = option;
      if (option == 0) {
        this.tranList(3, 5);
      } else if (option == 1) {
        this.tranList(4, 5);
      } else if (option == 2) {
        this.tranList(5, 5);
      }
    },
    // 推荐的接口
    async tranList(pages, pagesizes) {
      let res = await yuzhuaRes('mark/search', {
        page: pages,
        page_size: pagesizes
      });
      let date = new Date();
      res.lists.forEach(item => {
        if (item.term[0] == '0') {
          item.term = this.categoryArr[Number(item.term.slice(1))].tradeName;
        } else {
          item.term = this.categoryArr[Number(item.term)].tradeName;
        }
        if (pages === 3) {
          item.price = true;
        }
        item.date = this.getDate();
      });
      this.tabelTrademarkList = res.lists;

      uni.hideLoading();
    },
    // 获取日期
    getDate() {
      var date = new Date();
      let e = date.getTime(); //当前时间的秒数
      let f = date.getTime() - 30 * 24 * 60 * 60 * 1000; //30天之前的秒数，

      let now = this.onGetTimeFrameToTime(e, f);

      let year = now.getFullYear(); //获取完整的年份(4位,1970-????)
      let month = now.getMonth() + 1; //获取当前月份(0-11,0代表1月)         // 所以获取当前月份是myDate.getMonth()+1;
      let day = now.getDate();

      return `${year}-${month}-${day}`;
    },
    onGetTimeFrameToTime(starTime, endTime) {
      let m = new Date(starTime);
      let mt = m.getTime();
      let n = new Date(endTime);
      let nt = n.getTime();
      let s = nt - mt;
      let sm = Math.floor(Math.random() * s);
      return new Date(mt + sm);
    },
    toDetail(solesn) {
      this.changeSearchNumber();
      this.solesn = solesn;
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(8); // 一键登录
      } else {
        uni.navigateTo({
          url: '../trademarkSource/trademarkSourceDetail?solesn=' + solesn,
          animationType: 'pop-in',
          animationDuration: 300
        });
      }
    },
    showHongbao() {
      let phone = uni.getStorageSync('telPhone');

      if (phone) {
        uni.showToast({
          title: '你已领取过红包',
          icon: 'none'
        });
      } else {
        uni.hideTabBar();
        this.baoShowTrue();
        this.isBaoBoxTrue();
      }
    },
    clickHongbao() {
      this.getAuthor(9);
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/index.scss';

.inputBox2 {
  height: 90rpx;
  line-height: 90rpx;
}

.regPlace {
  height: 90rpx;
  line-height: 90rpx;
}

.red {
  color: red !important;
}
.regBtn {
  width: 200rpx;
  height: 70rpx;
  text-align: center;
  font-size: 26rpx;
  font-weight: 400;
  color: #fff;
  line-height: 70rpx;
  margin: auto;
  margin-top: 40rpx;
  margin-bottom: 40rpx;
  border-radius: 20rpx;
  background: linear-gradient(230deg, #297dfe 0%, #1247fc 100%);
}
.guanggao {
  display: block;
  width: 700rpx;
  height: 156rpx;
  margin: 20rpx auto;
}
.moreKefu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 700rpx;
  padding: 40rpx;
  margin: auto;
  background-color: #fff;
  border-radius: 20rpx;
  .kefuItem {
    width: 50%;
    .title {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 800;
      color: #333333;
      line-height: 46px;
      image {
        width: 125rpx;
        height: 40rpx;
      }
      .hotServe {
        width: 120rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-align: center;
        color: #fff;
        font-size: 20rpx;
        background: linear-gradient(141deg, #ffa3a3 0%, #ff2e2e 100%);
        border-radius: 10rpx;
      }
    }
    .des {
      font-size: 24rpx;
      font-weight: 400;
      color: #989898;
      line-height: 36rpx;
    }
    .btn {
      width: 128rpx;
      height: 44rpx;
      line-height: 44rpx;
      text-align: center;
      background: #e8efff;
      border-radius: 8rpx;
      font-size: 22rpx;
      font-family: MicrosoftYaHei;
      color: #2562fe;
      margin-top: 24rpx;
    }
    .hongbao {
      width: 265rpx;
      height: 125rpx;
      margin-top: 14rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .persons {
      display: flex;
      justify-content: space-between;
      margin-top: 20rpx;
      .personItem {
        position: relative;
        width: 125rpx;
        height: 125rpx;
        border-radius: 20rpx;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
        .line {
          position: absolute;
          left: 0;
          bottom: 10rpx;
          height: 35rpx;
          line-height: 35rpx;
          width: 70rpx;
          text-align: center;
          color: #ffffff;
          font-size: 16rpx;
          background: linear-gradient(141deg, #2bff4e 0%, #75ff9c 100%);
          border-bottom-right-radius: 10rpx;
          border-top-right-radius: 10rpx;
        }
      }
    }
  }
  .kefuItem:nth-child(2n) {
    padding-left: 40rpx;
    border-left: 2px solid #f6f6f6;
  }
  .kefuItem:nth-child(1),
  .kefuItem:nth-child(2) {
    border-bottom: 2px solid #f6f6f6;
    padding-bottom: 20rpx;
  }
}
.scrollView {
  width: 100% !important;
  display: flex;
  height: 250rpx !important;
  white-space: nowrap !important;
  border-radius: 20px;
  overflow-y: hidden !important;
  overflow-x: auto !important;
  .itembox {
    display: inline-block !important;
    text-align: center;
    padding-top: 30rpx;
    text-align: center;
    image {
      width: 100rpx !important;
      height: 100rpx !important;
      margin: auto !important;
    }
  }
}
// /deep/.uni-scroll-view::-webkit-scrollbar {
// 	display: none
// }
.uni-scroll-view-content {
  border-radius: 15rpx;
  // overflow: hidden;
}

// 从其他页面复制过来的列表样式
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
</style>
