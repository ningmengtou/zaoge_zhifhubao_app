<template>
  <view>
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 查商标的搜索框 开始 -->
    <view class="queryPageSearch">
      <view class="banxin690 queryPageSearch2">
        <view class="fls">
          <view class="fl1">
            <picker class="pickItem" mode="selector" @change="pickerChange1" :value="pickerIndex1" :range="pickerArray1" :range-key="'names'">
              <view class="pickOnly">
                <text class="text">{{ pickerArray1[pickerIndex1].names }}</text>
                <text class="iconfont icon-youjiantou"></text>
              </view>
            </picker>
          </view>
          <view class="fl2"><input type="text" placeholder="请输入关键字" placeholder-class="placeClass" class="inputClass" v-model="keyval" /></view>
        </view>
        <view class="frs" @click="searBtnFun">查询</view>
      </view>
    </view>
    <!-- 查商标的搜索框 结束 -->

    <!-- 风险盒子 开始 -->
    <view class="risk riskMask">
      <view class="flbox">
        <view class="low twos">
          <text>低风险</text>
          <view class="ring">
            <view class="circle" v-for="item in numberArr1" :key="item">{{ item }}</view>
            <view class="circle">...</view>
          </view>
        </view>
        <view class="high twos">
          <text>高风险</text>
          <view class="ring">
            <view class="circle" v-for="item in numberArr2" :key="item">{{ item }}</view>
            <view class="circle">...</view>
          </view>
        </view>
      </view>
      <view class="frbox" @click="goToReport">
        <text class="text">查看分析报告</text>
        <text class="iconfont icon-youjiantou"></text>
      </view>
    </view>
    <!-- 风险盒子 结束 -->

    <!-- 下拉选择 开始 -->
    <view class="threeSelect">
      <!-- 商标类别 -->
      <picker class="pickItem" mode="selector" @change="trademarkChange" :value="trademarkIndex" :range="trademarkArray" :range-key="'tradeName'">
        <view class="pickOnly">
          <text class="t1 oe">{{ trademarkArray[trademarkIndex].tradeName }}</text>
          <text class="t2 iconfont icon-sanjiaoxing"></text>
        </view>
      </picker>
      <!-- 选择年限 -->
      <picker class="pickItem" mode="selector" @change="yearChange" :value="yearIndex" :range="yearArray" :range-key="'key'">
        <view class="pickOnly">
          <text class="t1 oe">{{ yearStr }}</text>
          <text class="t2 iconfont icon-sanjiaoxing"></text>
        </view>
      </picker>
      <!-- 选择日期 -->
      <picker class="pickItem" mode="selector" @change="sortChange" :value="sortIndex" :range="sortArray">
        <view class="pickOnly">
          <text class="t1 oe">{{ sortArray[sortIndex] }}</text>
          <text class="t2 iconfont icon-sanjiaoxing"></text>
        </view>
      </picker>
    </view>
    <!-- 下拉选择 结束 -->

    <!-- 列表大全 开始 -->
    <view class="trademarkShow" v-if="noDataShow">
      <view class="trademarkList">
        <view class="trademarks">
          <view class="trademarkItem" v-for="(item, index) in trademarkList" :key="item.id" @click="seeDetail(item.id)">
            <view class="photos"><image :src="item.graphicStyle" mode="widthFix"></image></view>
            <view class="message">
              <view class="keyword">
                <view class="tname oe">{{ item.trademarkName || '暂无' }}</view>
                <view class="tstatus oe" :class="getcolor(item.legalStatusName)">{{ item.legalStatusName || '暂无' }}</view>
              </view>
              <view class="type">类别：{{ typeStr(item.typeOfTrademarkCode, item.typeOfTrademarkName) || '暂无' }}</view>
              <view class="application">申请人：{{ item.applicationNameCn || '暂无' }}</view>
              <view class="application">代理机构: {{ item.agency || '暂无' }}</view>
              <view class="tworow">
                <text class="oe">申请号：{{ item.trademarkNumber || '暂无' }}</text>
                <text class="oe">日期：{{ item.trademarkApplicationDate || '暂无' }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 列表大全 结束 -->

    <!-- 如果没有数据时的组件 开始 -->
    <view v-else><nodata @refreshFun2="refreshFun3"></nodata></view>
    <!-- 如果没有数据时的组件 结束 -->
  </view>
</template>

<script>
import { request } from '../../util/request.js';
import { jsonCategory } from '../../util/jsonCategory.js';
import { mapState, mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      pickerIndex1: 0, //picker选择器
      //picker选择器
      pickerArray1: [
        {
          ids: 0,
          types: 0,
          names: '商标名'
        },
        {
          ids: 1,
          types: 1,
          names: '申请人'
        },
        {
          ids: 2,
          types: 2,
          names: '代理机构'
        }
      ],
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      trademarkArray: jsonCategory.data, // 商标类别数组
      trademarkIndex: 0, // 商标类别数组
      yearArray: [], // 年限数组
      yearIndex: 0, // 年限数组
      yearStr: '选择年份',
      sortArray: ['申请日期', '顺序', '倒序'], // 排序数组
      sortIndex: 0, // 排序数组
      keyword: '', // 商标名关键字
      option: '', // 查找商标类型 0是商标名 1是申请人 2是代理机构
      orderWay: 0, // 商标申请时间 1是倒叙 0是顺序
      pageNo: 1, // 当前分页
      pageSize: 20, // 当前分页数据条数
      typeOfTrademarkId: '', // 商标类别参数
      currentPage: 1, // 当前页数
      totalNum: 0, // 数据总数
      yearOfApplication: '', // 商标年份参数
      trademarkList: [], // 商标列表
      noDataShow: true,
      searchType: 1,
      numberArr1: [],
      numberArr2: [],
      isShowMask2: false,
      detailId: '',
      // 搜索关键字
      keyval: '',
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
    // console.log('页面的传值', options);
    this.keyval = options.keyword;
    this.option = options.option;
    // if(this.option == 1) {
    // 	this.pickerIndex1 = 1
    // }
    this.option = this.pickerIndex1 = Number(options.option);
    console.log('options', this.option);
    this.changeTransKey(options.keyword);
    this.getRingArr();
    this.getData();
  },
  created() {},
  methods: {
    // vuex东东
    ...mapMutations(['clearkeyWords', 'getkeyWordsNull', 'changeTabIndex', 'changeSearchNumber', 'getPhone', 'changeTransKey', 'clearTransKey']),
    // picker选择器
    pickerChange1(e) {
      this.option = this.pickerIndex1 = e.target.value;
    },
    trademarkChange(e) {
		if(!this.keyval) {
			uni.showToast({
				title:'请输入关键字',
				icon:'none'
			})
			return false
		}
      this.currentPage = 1;
      this.trademarkIndex = e.target.value;
      this.typeOfTrademarkId = this.trademarkArray[e.target.value].id == '0' ? '' : this.trademarkArray[e.target.value].id;
      this.trademarkList = [];
      this.searchType = 1;
      this.sortIndex = 0;
      this.getData();
    },
    yearChange(e) {
		if(!this.keyval) {
			uni.showToast({
				title:'请输入关键字',
				icon:'none'
			})
			return false
		}
      this.currentPage = 1;
      this.yearIndex = e.target.value;
      this.yearOfApplication = this.yearArray[e.target.value].key == '选择年份' ? '' : this.yearArray[e.target.value].key;
      this.yearStr = this.yearArray[e.target.value].key;
      this.trademarkList = [];
      this.searchType = 1;
      this.sortIndex = 0;
      this.getData();
    },
    sortChange(e) {
		if(!this.keyval) {
			uni.showToast({
				title:'请输入关键字',
				icon:'none'
			})
			return false
		}
      this.currentPage = 1;
      this.trademarkList = [];
      this.sortIndex = e.target.value;
      if (this.sortIndex == 0) {
        this.orderWay = 0;
        this.searchType = 1;
      } else if (this.sortIndex == 1) {
        this.orderWay = 1;
        this.searchType = 0;
      } else if (this.sortIndex == 2) {
        this.orderWay = 0;
        this.searchType = 0;
      }
      this.getData();
    },
    async getData(number) {
      uni.showLoading({
        title: '数据加载中'
      });
      let apiData = {
        keyword: this.keyval,
        orderWay: this.orderWay,
        pageNo: this.currentPage,
        pageSize: this.pageSize,
        searchFieldDTO: {
          agency: this.option != 2 ? '' : 1,
          applicationNameAndGyr: this.option != 1 ? '' : 1,
          legalStatusId: '',
          trademarkName: this.option != 0 ? '' : 1,
          trademarkNumber: '',
          typeOfTrademarkId: this.typeOfTrademarkId,
          yearOfApplication: this.yearOfApplication
        },
        searchType: this.searchType
      };
      let res = await request('/sbc.esp?qmx', apiData);
      // 如果全明星接口崩了，直接返回首页
      if (res.status == 500 || res.status == 400) {
        uni.hideLoading();
        this.$layer('网络异常，请稍后重试', 'none', 1500);
        setTimeout(() => {
          this.gopage('../index/index', 'tabbar');
        }, 1500);
        return false;
      }
      // 如果全明星接口莫问题，直接渲染数据
      if (res.code == 200) {
        // 更改图片地址
        res.data.businessList.forEach(item => {
          if (item.graphicStyle.indexOf('-') > -1) {
            item.graphicStyle = 'https://image.qmxip.com/' + item.graphicStyle.split('.')[0];
          } else {
            item.graphicStyle = 'https://image.qmxip.com/' + item.graphicStyle;
          }

          if (item.legalStatusName.indexOf('申请中') > -1) {
            item.legalStatusName = '申请中';
          } else if (item.legalStatusName.indexOf('注册公告') > -1) {
            item.legalStatusName = '注册公告';
          } else if (item.legalStatusName.indexOf('注册') > -1) {
            item.legalStatusName = '已注册';
          } else if (item.legalStatusName.indexOf('失效') > -1) {
            item.legalStatusName = '已失效';
          } else if (item.legalStatusName.indexOf('驳回') > -1) {
            item.legalStatusName = '已驳回';
          } else {
            item.legalStatusName = '';
          }
        });

        this.trademarkList = [...this.trademarkList, ...res.data.businessList];
        this.totalNum = res.data.total;
        this.yearArray = res.data.aggListDTO.aggByYearOfApplication;
        this.yearArray.unshift({ key: '选择年份', value: '0' });
        if (number == 1) {
          this.yearStr = '选择年份';
        }
        if (this.trademarkList.length != 0) {
          this.noDataShow = true;
        } else {
          this.noDataShow = false;
        }
      }

      uni.hideLoading();
    },
    // 方便文本框传值和取值的方法
    inputEvent(key) {
      this.keyword = key;
    },
    // 搜索按钮
    searBtnFun() {
		
		let telPhone = uni.getStorageSync('telPhone')

		if(!this.keyval) {
			uni.showToast({
				title:'请输入关键字',
				icon:'none'
			})
			return false
		}
		
		if(telPhone) {
			this.trademarkList = [];
			this.currentPage = 1;
			this.orderWay = 0;
			this.typeOfTrademarkId = '';
			this.yearOfApplication = '';
			this.trademarkIndex = 0;
			this.sortIndex = 0;
			this.searchType = 1;
			this.getData(1);
		}else {
			this.getAuthor(3)
		}

    },
    // 如果没有数据执行的事件
    refreshFun3() {
      this.getData();
    },
    typeStr(num, str) {
      let number = num < 10 ? '0' + num : num;
      return number + '-' + str;
    },
    onReachBottom() {
      let total = this.currentPage * this.pageSize;
      if (this.totalNum > total) {
        this.currentPage = this.currentPage + 1;
        this.getData();
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        });
      }
    },
    // 详情
    seeDetail(id) {
      this.changeSearchNumber();
      this.detailId = id;
      if (this.searchTraNumber >= 4 && !this.phone) {
        this.getAuthor(2); // 一键登录
        return false;
      } else {
        uni.navigateTo({
          url: './trademarkQueryDetail?id=' + id
        });
      }
    },
    // 查看分析报告
    goToReport() {
      // #ifdef H5
      uni.navigateTo({
        url: './trademarkQueryReport?mykeyword=' + this.keyval
      });
      // #endif
      // #ifdef APP-PLUS
      if (!this.phone) {
        this.getAuthor(1);
      } else {
        uni.navigateTo({
          url: './trademarkQueryReport?mykeyword=' + this.keyval
        });
      }
      // #endif
    },
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
      // 本页面单独搞的
      uni.navigateTo({
        url: './trademarkQueryReport?mykeyword=' + this.keyword,
        animationType: 'pop-in',
        animationDuration: 300
      });
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
            // 用户点击取消登录，不能让他跳转页面
            if (uncrypted === 6002) {
              // 取消登录
              return false;
            }
            // ------------此页面单独写的东东
            if (number == 1) {
              uni.navigateTo({
                url: './trademarkQueryReport?mykeyword=' + that.keyword,
                animationType: 'pop-in',
                animationDuration: 300
              });
            } else if (number == 2) {
              uni.navigateTo({
                url: './trademarkQueryDetail?id=' + that.detailId,
                animationType: 'pop-in',
                animationDuration: 300
              });
            }else if (number == 3) {
              that.trademarkList = [];
              that.currentPage = 1;
              that.orderWay = 0;
              that.typeOfTrademarkId = '';
              that.yearOfApplication = '';
              that.trademarkIndex = 0;
              that.sortIndex = 0;
              that.searchType = 1;
              that.getData(1);
            }
          });
        }
      });
      // #endif
    },
    // 封装返回不同的类名的样式方法
    getcolor(str) {
      if (str == '已注册') {
        return 'ifHasRegClass';
      } else if (str == '注册公告') {
        return 'regNoticeClass';
      } else if (str == '已失效' || str == '已驳回') {
        return 'ifHasCancelClass';
      } else {
        return 'otherClass';
      }
    },
    getRingArr() {
      // 直接随机6个数 让33分成两个数组
      let arr = [];

      for (let i = 0; i < 100; i++) {
        let number = Math.floor(Math.random() * (45 - 1)) + 1;
        if (!arr.includes(number)) {
          arr.push(number);
        }
        if (arr.length == 6) {
          break;
        }
      }

      this.numberArr1 = arr.slice(0, 3);
      this.numberArr2 = arr.slice(3);
    }
  },
  computed: {
    ...mapState(['phone', 'searchTraNumber'])
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkQuery.scss';
</style>
