<template>
  <view class="uniBigBox" style="background: #f2f4f5;padding: 40rpx 0;">
    <view class="whiteBgBox">
      <!-- /请选择统计区域 -->
      <view class="itemInpBox">
        <view class="title1">请选择统计区域</view>
        <view class="title2"><text class="t1">第一级省份/直辖市必选</text></view>
        <uni-data-picker placeholder="请选择省份/城市" popup-title="请选择所在地区" :localdata="dataTree" v-model="classes" @change="onchange"></uni-data-picker>
      </view>
      <!-- 请选择统计区域/ -->
      <!-- /请选择时间段 -->
      <view class="itemInpBox" style="padding-top: 120rpx;">
        <view class="title1">请选择时间段</view>
        <view class="title2">
          <text class="t1">起始日期</text>
          <text class="t2">（默认当月1号）</text>
        </view>
        <view class="inpbox">
          <picker mode="date" class="picker" :value="timeVal1" :start="startDate1" :end="endDate1" @change="dateChange1">
            <view class="onlyBox">
              <text class="t1 text">{{ timeVal1 }}</text>
              <text class="t2 iconfont icon-youjiantou"></text>
            </view>
          </picker>
        </view>
        <view class="title2">
          <text class="t1">终止日期</text>
          <text class="t2">（默认当天）</text>
        </view>
        <view class="inpbox">
          <picker mode="date" class="picker" :value="timeVal2" :start="startDate2" :end="endDate2" @change="dateChange2">
            <view class="onlyBox">
              <text class="t1 text">{{ timeVal2 }}</text>
              <text class="t2 iconfont icon-youjiantou"></text>
            </view>
          </picker>
        </view>
      </view>
      <!-- 请选择时间段/ -->
      <!-- /公共类按钮 -->
      <view class="comBtnBox" style="padding-top: 100rpx;"><view style="width: 100%;height: 88rpx;border-radius: 88rpx;" @click="statistics">开始统计</view></view>
      <!-- 公共类按钮/ -->
    </view>
  </view>
</template>

<script>
import { cityData } from '../../util/tow.js';
export default {
  data() {
    const currentDate = this.getDate({
      format: true
    });
    const oneDate = this.getOneData();
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      cityVal: 0,
      // 开始时间
      timeVal1: oneDate,
      // 结束时间
      timeVal2: currentDate,
      // 省市数据
      dataTree: cityData,
      // 选择的城市
      classes: '',
      // 省份
      province: '',
      // 城市
      city: '',
      // 开始时间
      applyDateFrom: '',
      // 结束时间
      applyDateTo: ''
    };
  },
  computed: {
    startDate1() {
      return this.getDate('start');
    },
    endDate1() {
      return this.getDate('end');
    },
    startDate2() {
      return this.getDate('start');
    },
    endDate2() {
      return this.getDate('end');
    }
  },
  onReady() {},
  onLoad() {
    this.getOneData();
  },
  methods: {
    cityChange: function(e) {
      this.cityVal = e.target.value;
      console.log(e.target.value);
    },
    dateChange1: function(e) {
      this.timeVal1 = e.target.value;
    },
    dateChange2: function(e) {
      this.timeVal2 = e.target.value;
      var date1 = new Date(e.target.value);
    },
    // 封装的日期时间
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (type === 'start') {
        year = year - 60;
      } else if (type === 'end') {
        year = year + 2;
      }
      month = month > 9 ? month : '0' + month;
      day = day > 9 ? day : '0' + day;
      return `${year}-${month}-${day}`;
    },
    // 获取本月第一天
    getOneData() {
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      month = month > 10 ? month : '0' + month;
      return `${year}-${month}-01`;
    },
    onchange(e) {
      let citys = ['北京市', '上海市', '天津市', '重庆市'];
      let value = e.detail.value;
      this.province = value[0].text;
      if (citys.includes(this.province)) {
        this.city = '';
      } else {
        this.city = value[1].text;
      }
      console.log(this.province, this.city);
    },
    statistics() {
      let start = new Date(this.timeVal1);
      let end = new Date(this.timeVal2);
      if (start > end) {
        uni.showToast({
          title: '起始时间不能大于终止时间',
          icon: 'none'
        });
        return false;
      }
      if (!this.province) {
        uni.showToast({
          title: '请选择城市',
          icon: 'none'
        });
        return false;
      }
      let data = {
        province: this.province,
        city: this.city,
        area: '',
        applyDateFrom: this.timeVal1,
        applyDateTo: this.timeVal2
      };
      uni.navigateTo({
        url: './trademarkArea2?data=' + JSON.stringify(data),
        animationType: 'pop-in',
        animationDuration: 300
      });
      // uni.request({
      // 	url:'https://www.iptop.cn/search/services/tmsearch/searchRegionApplyDate',
      // 	method:'POST',
      // 	data:{
      // 		"province": this.province,
      // 		"city": this.city,
      // 		"area": "",
      // 		"applyDateFrom": this.timeVal1,
      // 		"applyDateTo": this.timeVal1
      // 	},
      // 	success:res=>{
      // 		console.log(res)
      // 	}
      // })
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkArea.scss';
</style>
