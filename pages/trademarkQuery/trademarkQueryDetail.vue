<template>
  <view class="ifHasFixBotBar" :class="isZhiFuBaoBody == true ? 'on' : ''" v-if="vIfRes">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 新版的头部带背景的区域 开始 -->
    <view class="queryDetailNewTop bgcov" :style="{ background: `url(${baseimg2 + 'bgQueryDetail.png'}) #333` }">
      <view class="banxin690 queryDetailNewTop2">
        <view class="fls"><image class="imgcov" :src="trademarkTop.graphicStyle" mode="widthFix"></image></view>
        <view class="frs">
          <view class="fr1">
            <text class="t1 oe">{{ trademarkTop.trademarkName || '暂无' }}</text>
            <text class="t2">{{ trademarkTop.trademarkTypeName || '暂无' }}</text>
          </view>
          <view class="fr2 oe">商标类别：{{ trademarkTop.trademarkMessage || '暂无' }}</view>
          <view class="fr3 oe">申请号：{{ trademarkTop.trademarkNumber || '暂无' }}</view>
        </view>
      </view>
    </view>
    <!-- 新版的头部带背景的区域 结束 -->

    <!-- 吸顶的导航 开始 -->
    <view id="xiDingID" ref="xiDingID" class="xiDingMenu jsClass" :class="isXiDingNav == true ? 'on' : ''">
      <view class="banxin690 xiDingMenu2">
        <view class="itembox" :class="xiDingIndex == index ? 'on' : ''" v-for="(item, index) in xiDingArr" :key="index" @click="xiDingTab(index)">{{ item }}</view>
      </view>
    </view>
    <!-- 吸顶的导航 结束 -->

    <!-- 新版的区域模块之基本信息 开始 -->
    <view class="queryDetailInfo">
      <view class="banxin690 queryDetailInfo2">
        <view class="queryDetailTitle jsClass" id="nav1" ref="nav1">
          <text class="t1"></text>
          <text class="t2">基本信息</text>
        </view>
        <view class="itembox">
          <view class="fls oe">商品名称</view>
          <view class="frs">{{ trademarkTop.trademarkName || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">商品类别</view>
          <view class="frs">{{ trademarkTop.trademarkMessage || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">初审公告日期</view>
          <view class="frs">{{ bulletinInfo.preliminaryNoticeDate || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">注册公告期号</view>
          <view class="frs">{{ bulletinInfo.ext1 || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">初审公告期号</view>
          <view class="frs">{{ bulletinInfo.ext2 || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">注册公告日期</view>
          <view class="frs">{{ bulletinInfo.ext3 || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">商标公告信息</view>
          <view class="frs">{{ bulletinInfo.trademarkName || '暂无' }}</view>
        </view>
        <view class="itembox">
          <view class="fls oe">代理公司名称</view>
          <view class="frs">{{ bulletinInfo.agency || '暂无' }}</view>
        </view>
        <view class="otherBox" @click="toMoreList(bulletinInfo.agency, 2)">
          <text class="title">查看该代理机构下的所有商标</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
        <view class="itembox">
          <view class="fls oe">申请公司名称</view>
          <view class="frs">{{ bulletinInfo.applicationNameCn || '暂无' }}</view>
        </view>
        <view class="otherBox" @click="toMoreList(bulletinInfo.applicationNameCn, 1)">
          <text class="title">查看该申请人下的其他商标</text>
          <text class="iconfont icon-youjiantou"></text>
        </view>
        <view class="itembox">
          <view class="fls oe">申请公司地址</view>
          <view class="frs">{{ bulletinInfo.applicationDddrCn || '暂无' }}</view>
        </view>
      </view>
    </view>
    <!-- 新版的区域模块之基本信息 结束 -->

    <!-- 新版的区域模块之商品信息 开始 -->
    <view class="queryDetailList">
      <view class="banxin690 queryDetailList2">
        <view class="queryDetailTitle jsClass" id="nav2" ref="nav2">
          <text class="t1"></text>
          <text class="t2">商品信息</text>
        </view>
        <view class="itembox">
          <view class="fls oe">已选择商品/服务项</view>
          <view class="frs otherCss">
            <view class="smallItem orange" v-for="(item, index) in trademarkTop.goodsServices" :key="index">{{ item || '暂无' }}</view>
          </view>
        </view>
        <view class="itembox">
          <view class="fls oe">已选择类似群</view>
          <view class="frs otherCss">
            <view class="smallItem green" v-for="(item, index) in trademarkTop.similarGroup" :key="index">{{ item }}</view>
          </view>
        </view>

        <view class="toLv" @click="gopage('/pages/trademarkReg/trademarkReg?key=' + trademarkTop.trademarkName)">查看当前群组注册成功率分析</view>
      </view>
    </view>
    <!-- 新版的区域模块之商品信息 结束 -->

    <!-- 新版的区域模块之商标说明 开始 -->
    <view class="queryDetailText" style="position: relative;">
      <!-- /有疑问免费解答的图片定位 -->
      <view class="jieDaBtn" @click="ziXunBtnFun"><image :src="baseimg1 + 'jiedabtn.png'"></image></view>
      <!-- 有疑问免费解答的图片定位/ -->
      <view class="banxin690 queryDetailText2">
        <view class="queryDetailTitle jsClass" id="nav3" ref="nav3">
          <text class="t1"></text>
          <text class="t2">商标说明</text>
        </view>
        <view class="itembox">{{ trademarkDescription || '暂无' }}</view>
      </view>
    </view>
    <!-- 新版的区域模块之商标说明 结束 -->

    <!-- 当前申请人申请同名商标 开始 -->
    <view class="trademarkList chaoTongMingBox">
      <view class="queryDetailTitle jsClass" id="nav4" ref="nav4">
        <text class="t1"></text>
        <text class="t2">当前申请人申请同名商标</text>
      </view>
      <view class="list">
        <template v-if="sameApplicationArr.length > 0">
          <view class="listItem" v-for="(item, index) in sameApplicationArr" :key="index" @click="gopage('./trademarkQueryDetail?id=' + item.id)">
            <view class="itemImage"><image :src="item.graphicStyle" mode="widthFix"></image></view>
            <view class="more">
              <view class="title">
                <view class="keyword oe">{{ item.trademarkName || '暂无' }}</view>
                <view class="other oe">{{ item.legalStatusName || '暂无' }}</view>
              </view>
              <view class="message">
                <view class="type">类别:{{ item.typeOfTrademarkCode || '暂无' }}类-{{ item.typeOfTrademarkName || '暂无' }}</view>
                <view class="number">申请号:{{ item.trademarkNumber || '暂无' }}</view>
              </view>
              <view class="date">申请日期：{{ item.trademarkApplicationDate || '暂无' }}</view>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="noTrademark">暂无同名商标</view>
        </template>
      </view>
    </view>
    <!-- 当前申请人申请同名商标 结束 -->

    <!-- 商标状态流程 开始 -->
    <view class="process chaoLiuChenBox" style="position: relative;">
      <!-- /有疑问免费解答的图片定位 -->
      <view class="jieDaBtn" @click="ziXunBtnFun"><image :src="baseimg1 + 'jiedabtn.png'"></image></view>
      <!-- 有疑问免费解答的图片定位/ -->
      <view class="queryDetailTitle jsClass" id="nav5" ref="nav5">
        <text class="t1"></text>
        <text class="t2">商标状态流程</text>
      </view>
      <view class="processList">
        <view v-show="isShowProcess"><unisteps :options="stepsOptions" active-color="#666666" direction="column" :active="stepsOptions.length - 1"></unisteps></view>
        <view v-show="!isShowProcess">暂无商标状态流程</view>
      </view>
    </view>
    <!-- 商标状态流程 结束 -->

    <!-- 推荐商标 开始 -->
    <view class="trademarkList chaoTongMingBox">
      <view class="queryDetailTitle">
        <text class="t1"></text>
        <text class="t2">其他推荐商标</text>
      </view>
      <view class="list">
        <template v-if="tuijianArr.length > 0">
          <view class="listItem" v-for="(item, index) in tuijianArr" :key="index" @click="gopage('./trademarkQueryDetail?id=' + item._id)">
            <view class="itemImage"><image :src="'https://image.qmxip.com/' + item._graphicStyle" mode="widthFix"></image></view>
            <view class="more">
              <view class="title">
                <view class="keyword oe">{{ item._trademarkName || '暂无' }}</view>
                <!-- <view class="other oe">{{ item._typeOfTrademarkName || '暂无' }}</view> -->
              </view>
              <view class="message">
                <view class="type">类别:{{ item._typeOfTrademarkCode || '暂无' }}类-{{ item._typeOfTrademarkName || '暂无' }}</view>
                <view class="number">申请号:{{ item._trademarkNumber || '暂无' }}</view>
              </view>
              <!-- <view class="date">申请日期：{{ item.trademarkApplicationDate || '暂无' }}</view> -->
            </view>
          </view>
        </template>
        <template v-else>
          <view class="noTrademark">暂无同名商标</view>
        </template>
      </view>
    </view>
    <!-- 当前申请人申请同名商标 结束 -->

    <!-- 新版本的详情页面固定在底部的条条 开始 -->
    <view class="detailFixBotBar">
      <view class="banxin690 detailFixBotBar2">
        <view class="fls">
          <view class="itembox itembox1" @click="ziXunBtnFun">
            <text class="iconfont icon-zixun"></text>
            <text class="text">咨询</text>
          </view>
          <view class="itembox itembox2" v-if="isShowCollect1">
            <text class="iconfont icon-shoucangxiao"></text>
            <text class="text">未收藏</text>
          </view>
          <view class="itembox itembox3" v-if="isShowCollect2">
            <text class="iconfont icon-shoucangxiao"></text>
            <text class="text">已收藏</text>
          </view>
          <view class="itembox itembox4" style="display: none;">
            <text class="iconfont icon-fenxiang"></text>
            <text class="text">分享</text>
          </view>
        </view>
        <view class="frs">
          <view class="itembox" @click="layerBtnReg">商标注册</view>
          <view class="itembox" @click="layerBtnBuy">商标购买</view>
        </view>
      </view>
    </view>
    <!-- 新版本的详情页面固定在底部的条条 结束 -->

    <!-- 商标注册的弹窗 开始 -->
    <view class="layerDetailMask layerDetailReg" v-if="isShowLayerReg" @touchmove.prevent="stopScroll">
      <view class="layerDetailMask2" @touchmove.prevent="stopScroll">
        <view class="titlebox oe">商标注册</view>
        <view class="namebox oe">{{ trademarkTop.trademarkName || '暂无' }} {{ trademarkTop.trademarkMessage || '暂无' }}{{ trademarkTop.trademarkNumber || '暂无' }}</view>
        <view class="inputbox">
          <input type="tel" maxlength="11" placeholder="请留下您的手机号码" class="inputClass" placeholder-class="placeClass" v-model="layerPhone" />
          <text class="iconfont icon-guanbixiao" @click="layerClearPhone"></text>
        </view>
        <view class="submitbox">
          <text @click="closeLayerMsk">取消</text>
          <text @click="submitLayer(1)">提交</text>
        </view>
      </view>
    </view>
    <!-- 商标注册的弹窗 结束 -->

    <!-- 商标购买的弹窗 开始 -->
    <view class="layerDetailMask layerDetailBuy" v-if="isShowLayerBuy" @touchmove.prevent="stopScroll">
      <view class="layerDetailMask2" @touchmove.prevent="stopScroll">
        <view class="titlebox oe">商标购买</view>
        <view class="namebox oe">{{ trademarkTop.trademarkName || '暂无' }} {{ trademarkTop.trademarkMessage || '暂无' }}{{ trademarkTop.trademarkNumber || '暂无' }}</view>
        <view class="inputbox">
          <input type="tel" maxlength="11" placeholder="请留下您的手机号码" class="inputClass" placeholder-class="placeClass" v-model="layerPhone" />
          <text class="iconfont icon-guanbixiao" @click="layerClearPhone"></text>
        </view>
        <view class="submitbox">
          <text @click="closeLayerMsk">取消</text>
          <text @click="submitLayer(2)">提交</text>
        </view>
      </view>
    </view>
    <!-- 商标购买的弹窗 结束 -->

    <!-- 组件 -->
    <layerneed
      :ismask1="ismask1"
      :ismask2="ismask2"
      :ismask3="ismask3"
      :dataParams="dataParams"
      @contactOpen="contactOpen"
      @closeMask="closeMask"
      @successBuy="successBuy"
    ></layerneed>

    <!-- 组件 -->
    <contact :maskShow="maskShow" @changeMaskShow="changeMaskShow" @closeMask="closeMask"></contact>
  </view>
</template>

<script>
import { request } from '../../util/request.js';
import { mapState, mapMutations } from 'vuex';
// #ifdef MP-ALIPAY
import { evaluate } from '../../util/eval5.min.js'; //支付宝小程序不兼容eval
// #endif
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      // 吸顶导航 开始
      isZhiFuBaoBody: false, //为了解决支付宝小程序吸顶后头部还有一段间距的问题
      xiDingDistanceHeight: 0, //吸顶的导航--导航栏距离顶部的距离，需要js一进来就动态获取
      navData1: 0, //吸顶的导航--item
      navData2: 0, //吸顶的导航--item
      navData3: 0, //吸顶的导航--item
      navData4: 0, //吸顶的导航--item
      navData5: 0, //吸顶的导航--item
      isXiDingNav: false, //吸顶的导航--为true就加on的class---针对自身html的
      xiDingIndex: 0, //吸顶的导航--索引
      xiDingArr: ['基本信息', '商品信息', '商标说明', '同名商标', '状态流程'], //吸顶的导航--数组
      // 吸顶导航 结束
      isShowSmallType: true, //商标小类的数组是否显示
      isShowServiceArea: true, //服务领域的数组是否显示
      layerPhone: '', //商标注册的弹窗和商标购买的弹窗的手机号的值
      isShowLayerReg: false, //商标注册的弹窗
      isShowLayerBuy: false, //商标购买的弹窗
      isShowCollect1: false, //是否展示收藏按钮--未收藏
      isShowCollect2: false, //是否展示收藏按钮--已收藏
      baseimg: this.baseimg,
      vIfRes: null,
      serviceAreaArr: [], //服务领域的数组
      smallCategoryArr: [], //商标小类的数组
      stepsOptions: [], // 步骤数组
      trademarkTop: {}, // 顶部商标信息
      trademarkDescription: '', // 商标说明
      trademarkUnscramble: '', // 商标含义
      sameApplicationArr: [], // 同名商标
      bulletinInfo: {}, // 公告信息
      ismask1: false, // 第一个遮罩层
      ismask2: false, // 第一个遮罩层
      ismask3: false, // 第一个遮罩层
      dataParams: {}, // mask的参数
      maskShow: false, // 联系客服的遮罩层
      isShowProcess: false, // 是否显示商标状态流程
      isShowMask2: false, //打开验证码弹窗组件
      tuijianArr: [], //推荐商标
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad(options) {
    if (JSON.stringify(options) == '{}') {
      this.gopage('../index/index', 'tabbar');
      return false;
    }
    this.getDetails(options);
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  // 吸顶的导航
  onPageScroll(opt) {
    // console.log('滚动事件');
    let myScrollTop = parseInt(opt.scrollTop);
    // console.log('滚动', myScrollTop);
    // 1
    if (parseInt(this.xiDingDistanceHeight) < myScrollTop) {
      this.isXiDingNav = true;
    } else {
      this.isXiDingNav = false;
      this.isZhiFuBaoBody = false;
      this.isZhiFuBaoBody = false;
    }
    // 2
    if (myScrollTop < this.navData1) {
      this.xiDingIndex = 0;
    } else if (parseInt(this.navData2) <= myScrollTop && myScrollTop < parseInt(this.navData3)) {
      this.xiDingIndex = 1;
    } else if (parseInt(this.navData3) <= myScrollTop && myScrollTop < parseInt(this.navData4)) {
      this.xiDingIndex = 2;
    } else if (parseInt(this.navData4) <= myScrollTop && myScrollTop < parseInt(this.navData5)) {
      this.xiDingIndex = 3;
    } else if (parseInt(this.navData5) <= myScrollTop) {
      this.xiDingIndex = 4;
    }
  },
  methods: {
    // 吸顶的导航
    xiDingTab(options) {
      // console.log('点击事件');
      this.xiDingIndex = options; //改变索引

      // console.log('--1', parseInt(this.navData1));
      // console.log('--2', parseInt(this.navData2));
      // console.log('--3', parseInt(this.navData3));
      // console.log('--4', parseInt(this.navData4));
      // console.log('--5', parseInt(this.navData5));

      if (options == 0) {
        this.isZhiFuBaoBody = true;
        uni.pageScrollTo({
          scrollTop: parseInt(this.navData1),
          duration: 300
        });
      } else if (options == 1) {
        this.isZhiFuBaoBody = true;
        uni.pageScrollTo({
          scrollTop: parseInt(this.navData2),
          duration: 300
        });
      } else if (options == 2) {
        this.isZhiFuBaoBody = true;
        uni.pageScrollTo({
          scrollTop: parseInt(this.navData3),
          duration: 300
        });
      } else if (options == 3) {
        this.isZhiFuBaoBody = true;
        uni.pageScrollTo({
          scrollTop: parseInt(this.navData4),
          duration: 300
        });
      } else if (options == 4) {
        this.isZhiFuBaoBody = true;
        uni.pageScrollTo({
          scrollTop: parseInt(this.navData5),
          duration: 300
        });
      }
    },
    // 吸顶的导航
    getElementTopHei() {
      let query = uni.createSelectorQuery();
      let doms = query.selectAll('.jsClass');
      doms
        .fields(
          {
            rect: true,
            size: true,
            scrollOffset: true
          },
          res => {
            // console.log('吸顶距离顶部的距离数组', res);
            this.xiDingDistanceHeight = res[0].top;
            this.navData1 = res[1].top;
            this.navData2 = res[2].top;
            this.navData3 = res[3].top;
            this.navData4 = res[4].top;
            this.navData5 = res[5].top;
          }
        )
        .exec();
    },
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
      // 本页面单独搞的
      this.ismask1 = true;
      this.ismask2 = true;
      this.dataParams = {
        phone: option ? option : '',
        trademarkName: this.trademarkTop.trademarkName,
        trademarkMessage: this.trademarkTop.trademarkMessage
      };
    },
    // 未收藏按钮的事件
    collectFun1() {
      this.$layer('收藏成功demo');
      this.isShowCollect1 = false;
      this.isShowCollect2 = true;
    },
    // 已收藏按钮的事件
    collectFun2() {
      this.$layer('取消成功demo');
      this.isShowCollect1 = true;
      this.isShowCollect2 = false;
    },
    // 两个弹窗的清除手机号码的值
    layerClearPhone() {
      this.layerPhone = '';
    },
    // 两个弹窗的关闭
    closeLayerMsk() {
      this.layerPhone = '';
      this.isShowLayerReg = false;
      this.isShowLayerBuy = false;
    },
    // 两个弹窗的提交
    submitLayer(options) {
      // options为1是商标注册的弹窗,options为2是商标购买的弹窗
      if (this.$checkType(this.layerPhone, 'phone') == false) {
        this.$layer('手机号码格式错误');
        return false;
      }
      if (options == 1) {
        // this.$layer('商标注册layer接口');
        this.$layer(this.loginOKTips);
      } else if (options == 2) {
        // this.$layer('商标购买layer接口');
        this.$layer(this.loginOKTips);
      }
      this.closeLayerMsk();
    },
    // 打开商标注册的弹窗
    layerBtnReg() {
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone) {
        this.isShowLayerReg = true;
        this.isShowLayerBuy = false;
        this.layerPhone = telPhone; //登录成功后有了手机好自动填入到弹窗内
      } else {
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
              that.isShowLayerReg = true;
              that.isShowLayerBuy = false;
              that.layerPhone = uncrypted; //登录成功后有了手机好自动填入到弹窗内
            });
          }
        });
        // #endif
      }
    },
    // 打开商标购买的弹窗
    layerBtnBuy() {
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone) {
        this.isShowLayerReg = false;
        this.isShowLayerBuy = true;
        this.layerPhone = telPhone; //登录成功后有了手机好自动填入到弹窗内
      } else {
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
              that.isShowLayerReg = false;
              that.isShowLayerBuy = true;
              that.layerPhone = uncrypted; //登录成功后有了手机好自动填入到弹窗内
            });
          }
        });
        // #endif
      }
    },
    // 咨询按钮
    ziXunBtnFun() {
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone) {
        this.gopage('../index3/onlineService');
      } else {
        // #ifdef H5
        this.gopage('../index3/onlineService');
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
            });
          }
        });
        // #endif
      }
    },
    // 一键登录：numbre1是委托购买，numbre2是顾问咨询
    getAuthor(numbre) {
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
            if (numbre == 1) {
              that.ismask1 = true;
              that.ismask2 = true;
              that.dataParams = {
                phone: uncrypted ? uncrypted : '',
                trademarkName: that.trademarkTop.trademarkName,
                trademarkMessage: that.trademarkTop.trademarkMessage
              };
            } else if (numbre == 2) {
              uni.navigateTo({
                url: '../index3/index3'
              });
            }
          });
        }
      });
      // #endif
    },
    async getDetails(id) {
      uni.showLoading({
        title: '数据加载中...'
      });
      let res = await request('/sbc.esp?qmx_detail', id);

      // let resul = null
      // #ifdef MP-ALIPAY
      let result = evaluate(res);
      // console.log('支付宝平台res', result);
      // #endif

      // #ifdef APP-PLUS || H5
      let result = eval(res);
      // console.log('APP+H5平台res', result);
      // #endif

      let json = result.data[0].json;
      // 商标顶部信息
      this.trademarkTop = {
        trademarkName: json.trademarkName,
        trademarkTypeName: json.trademarkTypeName,
        similarGroup: JSON.parse(json.similarGroup),
        goodsServices: json.goodsServices.split(';,'),
        legalStatusName: json.legalStatusName,
        trademarkMessage: json.typeOfTrademarkCode + '类-' + json.typeOfTrademarkName,
        graphicStyle: json.graphicStyle.indexOf('-') > -1 ? 'https://image.qmxip.com/' + json.graphicStyle.split('.')[0] : 'https://image.qmxip.com/' + json.graphicStyle,
        trademarkNumber: json.trademarkNumber
      };

      this.tuijianArr = result.data[0].tuijianArr;

      // 商标说明
      this.trademarkDescription = `${json.trademarkName}属于${json.typeOfTrademarkCode}类-${json.typeOfTrademarkName}，申请人是${json.applicationNameCn}，于${
        json.applicationDate
      }申请的商标，此商标以${json.trademarkStructureCn}结构申请的${json.trademarkTypeName}，该商标到期时间为${json.renewalExpired || '(暂无)'}。`;
      // 商标含义
      this.trademarkUnscramble = json.trademarkUnscramble;
      // 同名商标
      this.sameApplicationArr = result.data[0].sameApplicationArr ? result.data[0].sameApplicationArr : [];
      if (this.sameApplicationArr) {
        this.sameApplicationArr.forEach(item => {
          if (item.graphicStyle.indexOf('-') > -1) {
            item.graphicStyle = 'https://image.qmxip.com/' + item.graphicStyle.split('.')[0];
          } else {
            item.graphicStyle = 'https://image.qmxip.com/' + item.graphicStyle;
          }
        });
      }

      // 公告信息的自定义json
      this.bulletinInfo = {
        preliminaryNoticeDate: json.preliminaryNoticeDate ? json.preliminaryNoticeDate : '暂无',
        ext1: json.ext1 ? json.ext1 + '期商标初审公告' : '暂无',
        ext2: json.ext2 ? json.ext2 + '期商标注册公告' : '暂无',
        ext3: json.ext3 ? json.ext3 : '暂无',
        trademarkName: json.trademarkName ? json.trademarkName + '商标公告' : '持续更新中',
        agency: json.agency ? json.agency : '暂无',
        tradeMarkStatusName: json.tradeMarkStatusName ? json.tradeMarkStatusName : '暂无',
        applicationNameCn: json.applicationNameCn ? json.applicationNameCn : '暂无',
        applicationDddrCn: json.applicationDddrCn ? json.applicationDddrCn : '暂无',
        trademarkUnscramble: json.trademarkUnscramble ? json.trademarkUnscramble : '暂无',
        noSelectGroup: json.noSelectGroup ? json.noSelectGroup : '暂无'
      };

      // 服务领域的数组特别处理
      // let serviceAreaArr = this.strToArr(this.bulletinInfo.goodsServices);
      // this.serviceAreaArr = serviceAreaArr.filter(item => {
      //   return item && item.trim();
      // });

      // 服务领域的数组
      this.serviceAreaArr = this.bulletinInfo.trademarkUnscramble.split('、');
      // 商标小类的数组
      this.smallCategoryArr = this.bulletinInfo.noSelectGroup.split(',');
      // console.log(this.smallCategoryArr);
      if (this.smallCategoryArr.length == 0 || this.smallCategoryArr == false || this.smallCategoryArr == '[]') {
        this.isShowSmallType = false;
      }

      // 商标状态流程
      let tradeMarkStatusName = [];
      if (json.tradeMarkStatusName != null) {
        if (json.tradeMarkStatusName.indexOf('#') > -1) {
          tradeMarkStatusName = json.tradeMarkStatusName.split('#');
          tradeMarkStatusName.pop();
        } else {
          tradeMarkStatusName[0] = json.tradeMarkStatusName;
        }
        this.stepsOptions = tradeMarkStatusName.map(item => {
          return {
            desc: item.slice(0, 10),
            title: item.slice(11)
          };
        });
      } else {
        this.stepsOptions[0] = {
          desc: '',
          title: ''
        };
      }
      // 判断商标流程是否为空
      if (this.isblank(this.stepsOptions[0].desc) || this.isblank(this.stepsOptions[0].title)) {
        this.isShowProcess = false;
      } else {
        this.isShowProcess = true;
      }
      this.vIfRes = result.data[0];
      uni.hideLoading();
      // 吸顶导航
      if (this.vIfRes) {
        this.$nextTick(() => {
          this.getElementTopHei(); // 核心代码
        });
      }
    },
    // 委托购买：参数1是委托购买 参数2是顾问咨询
    buyClick(numbre) {
      let storPhone = uni.getStorageSync('telPhone');
      if (!storPhone) {
        // #ifdef APP-PLUS
        this.getAuthor(numbre); // 一键登录
        // #endif

        // #ifdef H5
        uni.showToast({
          title: 'H5端不支持登录',
          duration: 800,
          icon: 'none'
        });
        // #endif
      } else {
        if (numbre == 1) {
          this.ismask1 = true;
          this.ismask2 = true;
          this.dataParams = {
            phone: storPhone ? storPhone : '',
            trademarkName: this.trademarkTop.trademarkName,
            trademarkMessage: this.trademarkTop.trademarkMessage
          };
        } else if (numbre == 2) {
          uni.navigateTo({
            url: '../index3/onlineService',
            animationType: 'pop-in',
            animationDuration: 300
          });
        }
      }
    },
    closeMask() {
      this.ismask1 = false;
      this.ismask2 = false;
      this.ismask3 = false;
      this.maskShow = false;
    },
    async successBuy(params) {
      this.ismask1 = true;
      this.ismask2 = false;
      this.ismask3 = true;
      let res = await request('/miniapi.esp?q_reg', {
        phone: params.phone,
        need: '委托购买'
      });
    },
    contactOpen() {
      this.ismask1 = false;
      this.ismask2 = false;
      this.maskShow = true;
    },
    changeMaskShow(number) {
      this.maskShow = false;
      if (number == 1) {
        uni.switchTab({
          url: '../index3/index3'
        });
      } else {
        uni.makePhoneCall({
          phoneNumber: this.hotLine
        });
      }
    },
    // 跳转查询机构或者申请人
    toMoreList(val, type) {
      // console.log(type)
      // if(type === 2) {
      // 	uni.navigateTo({
      // 		url:`./trademarkQuery?keyword=${val}&option=1`
      // 	})
      // }else {

      // }
      uni.navigateTo({
        url: `./trademarkQuery?keyword=${val}&option=${type}`
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkQueryDetail.scss';
.otherCss {
  display: flex;
  flex-wrap: wrap;
  .smallItem {
    padding: 8rpx 20rpx;
    font-size: 24rpx;
    font-weight: 400;
    margin-bottom: 16rpx;
    margin-right: 16rpx;
  }
  .orange {
    color: #ff5700;
    background-color: #ffeee5;
  }
  .green {
    color: #1db951;
    background-color: #e8f8ed;
  }
}
.queryDetailInfo2 {
  .otherBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 10rpx 0;
    .title {
      font-size: 24rpx;
      font-weight: 400;
      color: #2884ff;
    }
    .iconfont {
      font-size: 24rpx;
      color: #2884ff;
      margin-left: 10rpx;
    }
  }
}
.toLv {
  width: 570rpx;
  height: 80rpx;
  border: 2rpx solid #2884ff;
  border-radius: 80rpx;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 80rpx;
  text-align: center;
  margin: 15rpx auto;
  color: #2884ff;
}
</style>
