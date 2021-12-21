<template>
  <view class="sourcePageView">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 固定在上方的区域 开始 -->
    <view class="sourcePageFixHead">
      <!-- 公共类搜索组件 开始 -->
      <view class="searchsView"><searchs @searchFun2="searchFun3" @inputEvent="inputEvent"></searchs></view>
      <!-- 公共类搜索组件 结束 -->
      <!-- 下拉选择 开始 -->
      <view class="threeSelect">
        <!-- 1.商标类别 -->
        <picker mode="selector" class="pickItem" @change="categoryChange" :value="categoryIndex" :range="categoryArray" :range-key="'tradeName'">
          <view class="pickOnly">
            <text class="t1">{{ categoryArray[categoryIndex].tradeName }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
        <!-- 2.价格筛选 -->
        <picker mode="selector" class="pickItem" @change="priceChange" :value="priceIndex" :range="priceArray" :range-key="'label'">
          <view class="pickOnly">
            <text class="t1">{{ priceArray[priceIndex].label }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
        <!-- 3.排序类型 -->
        <picker mode="selector" class="pickItem" @change="sortChange" :value="sortIndex" :range="sortArray" :range-key="'name2'">
          <view class="pickOnly">
            <text class="t1">{{ sortArray[sortIndex].name2 }}</text>
            <text class="t2 iconfont icon-sanjiaoxing"></text>
          </view>
        </picker>
      </view>
      <!-- 下拉选择 结束 -->
      <!-- 友情提示 开始 -->
      <view class="myTipBar">
        <view class="banxin690 myTipBar2">
          共找到商标
          <text>{{ totalNum }}</text>
          个（今日新增
          <text>{{ $randomNum(20, 100) }}</text>
          个 ）
        </view>
      </view>
      <!-- 友情提示 结束 -->
    </view>
    <!-- 固定在上方的区域 结束 -->

    <!-- 固定在下方的区域 开始 -->
    <view class="sourcePageFixBody">
      <!-- 如果没有数据时的组件 开始 -->
      <view v-show="isHasData1"><nodata @refreshFun2="refreshFun3"></nodata></view>
      <!-- 如果没有数据时的组件 结束 -->
      <!-- 列表大全 开始 -->
      <view class="trademarkList" v-show="isHasData2">
        <!-- /单条(有数据) -->
        <view class="trademarkItem" v-for="(item, index) in QueryList" :key="index" @click="goToDetail(item.solesn)">
          <view class="iconTag">{{ item.term }}类</view>
          <view class="moreMessage">
            <view class="imgBox">
              <view class="onlyBor"><image :src="item.img || baseimg + 'nohead.png'" mode="widthFix"></image></view>
            </view>
            <view class="titles oe">{{ item.accounts || '暂无标题' }}</view>
            <view class="type dot2">{{ item.feature || '暂无类别' }}</view>
            <view class="price">
              <text class="t1">{{ tenThousand1(item.goods_price) }}</text>
              <text class="t2">{{ tenThousand2(item.goods_price) }}</text>
            </view>
          </view>
        </view>
        <!-- 单条(有数据)/ -->
      </view>
      <!-- 列表大全 结束 -->
    </view>
    <!-- 固定在下方的区域 结束 -->
  </view>
</template>

<script>
import { request } from '../../util/request.js';
import { jsonCategory } from '../../util/jsonCategory.js'; //商标类别
import { jsonPrice } from '../../util/jsonPrice.js'; //价格筛选
import { jsonSort } from '../../util/jsonSort.js'; //排序类型
import { mapState, mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      baseapi3: this.baseapi3, //全局定义接口路径
      categoryArray: jsonCategory.data, // 商标类别
      categoryIndex: 0, // 商标类别
      sortArray: jsonSort.data, // 排序类型
      sortIndex: 0, // 排序类型
      priceArray: jsonPrice.data, // 价格筛选
      priceIndex: 0, // 价格筛选
      //专门用于放ajax的请求参数对象
      ajaxJson: {
        trems: '',
        page: 1,
        page_size: 10,
        keyword: ''
      },
      isHasData1: false, //如果没有数据时就显示
      isHasData2: true, //如果没有数据时就显示
      QueryList: [], //筛选结果的所有列表
      totalNum: 0, //前端定义好用于接收后端返回的总条数
      searchVal: '', //从组件传递过来的搜索框的值
      detailId: '',
      isShowMask2: false,
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  onLoad(options) {
    // 如果页面没有参数就直接返回首页
    if (JSON.stringify(options) == '{}') {
      this.gopage('../index/index', 'tabbar');
      return false;
    }
    // 从上一个页面传递过来的关键字
    this.searchVal = options.word;
    this.changeTransKey(options.word);
	this.categoryIndex = options.picker
	console.log(options.picker,'options.picker')
    this.ajaxJson['keyword'] = this.searchVal;
	this.ajaxJson['trems'] = options.picker >= 10 ? options.picker : '0'+options.picker;
    // 初始化就调用接口
    this.initAjax(); //公共类的请求方法
  },
  methods: {
    ...mapMutations(['changeTransKey', 'clearTransKey', 'changeSearchNumber']),
    // 如果没有数据执行的事件
    refreshFun3() {
      this.initAjax(); //公共类的请求方法
    },
    // 搜索执行事件
    searchFun3(obj) {
      this.QueryList = [];
      this.ajaxJson['page'] = 1;
      this.ajaxJson['keyword'] = obj;
      this.ajaxJson['trems'] = '';
      this.ajaxJson['price'] = '';
      this.ajaxJson['sort_type'] = 1;
      this.categoryIndex = 0;
      this.priceIndex = 0;
      this.sortIndex = 0;
      this.initAjax(); //公共类的请求方法
    },
    // 公共类的请求方法
    initAjax() {
      uni.showLoading({
        title: '加载中....'
      });
      uni.request({
        url: this.baseapi3 + 'mark/search',
        method: 'POST',
        data: this.ajaxJson,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          if (res.data.success == false) {
            // 暂无数据
            this.isHasData1 = true;
            this.isHasData2 = false;
            uni.hideLoading();
            return false;
          } else {
            // 查询成功
            this.isHasData1 = false;
            this.isHasData2 = true;
            res.data.lists.forEach(item => {
              if (item.term[0] == '0') {
                item.term = this.categoryArray[Number(item.term.slice(1))].tradeName;
              } else {
                item.term = this.categoryArray[Number(item.term)].tradeName;
              }
            });
            this.QueryList = [...this.QueryList, ...res.data.lists];
            this.totalNum = res.data.total;
            // 虽然请求成功了，但是如果没有数据，还是要显示nodata的图片
            if (res.data.total == 0) {
              this.isHasData1 = true;
              this.isHasData2 = false;
            }
            uni.hideLoading();
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    // 商标类别
    categoryChange(e) {
      this.categoryIndex = e.target.value;
      let tm_typeParm = JSON.parse(JSON.stringify(this.categoryArray[e.target.value].firstNum));
      // 给后端传参：1类就传01,16类就传16……
      this.QueryList = [];
      this.ajaxJson['page'] = 1;
      this.ajaxJson['trems'] = this.doubleNum(tm_typeParm) == '00' ? '' : this.doubleNum(tm_typeParm);
      this.initAjax(); //公共类的请求方法
    },
    // 价格筛选
    priceChange: function(e) {
      this.priceIndex = e.target.value;
      let tm_priceParm = JSON.parse(JSON.stringify(this.priceArray[e.target.value].id));
      // 给后端传参：0-1万就传0-10000,1万-3万就传10000-30000……
      this.QueryList = [];
      this.ajaxJson['page'] = 1;
      this.ajaxJson['price'] = tm_priceParm;
      this.initAjax(); //公共类的请求方法
    },
    // 排序类型
    sortChange(e) {
      this.sortIndex = e.target.value;
      let sort_typeParm = JSON.parse(JSON.stringify(this.sortArray[e.target.value].name1));
      this.QueryList = [];
      this.ajaxJson['page'] = 1;
      this.ajaxJson['sort_type'] = sort_typeParm;
      this.initAjax(); //公共类的请求方法
    },
    //上拉加载更多
    onReachBottom() {
      let allCounts = this.ajaxJson['page'] * this.ajaxJson['page_size'];
      if (this.totalNum > allCounts) {
        this.ajaxJson['page'] = this.ajaxJson['page'] + 1;
        this.initAjax();
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        });
      }
    },
    goToDetail(id) {
      let telPhone = uni.getStorageSync('telPhone');
      if (telPhone) {
        uni.navigateTo({
          url: './trademarkSourceDetail?solesn=' + id
        });
      } else {
        this.changeSearchNumber();
        this.detailId = id;
        if (this.searchTraNumber >= 4 && !this.phone) {
          this.getAuthor(); // 一键登录
        } else {
          uni.navigateTo({
            url: './trademarkSourceDetail?solesn=' + id
          });
        }
      }
    },
    // 打开验证码弹窗组件
    openMask3() {
      this.isShowMask2 = true;
    },
    // 关闭验证码弹窗组件
    closeMask3() {
      this.isShowMask2 = false;
    },
    // 登录成功后跳转tababr
    loginSuccess(option) {
      this.isShowMask2 = false;
      // 本页面单独搞的
      uni.navigateTo({
        url: './trademarkSourceDetail?solesn=' + this.detailId
      });
    },
    getAuthor() {
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
            if (uncrypted == 6002) {
              // 取消登录
              return false;
            }
            // ------------此页面单独写的东东
            uni.navigateTo({
              url: './trademarkSourceDetail?solesn=' + that.detailId
            });
          });
        }
      });
      // #endif
    },
    inputEvent(key) {
      this.ajaxJson['keyword'] = key;
    }
  },
  computed: {
    ...mapState(['phone', 'searchTraNumber'])
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkSource.scss';
.sourcePageFixHead {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 100;
}
.sourcePageFixBody {
	margin-top: 278rpx;
}
</style>
