<template>
  <view>
    <view class="uniBigBox" style="background: #fff;" v-if="vIfRes">
      <!-- 公共类的单个盒子 开始 -->
      <view class="itemListBox">
        <view class="itemListBox2">
          <view class="titlebox">统计条件</view>
          <view class="graybox">
            <view>统计区域：{{ area }}</view>
            <view>统计时段：{{ startDate }} 至 {{ endDate }}</view>
          </view>
        </view>
      </view>
      <!-- 公共类的单个盒子 结束 -->
      <!-- 公共类的单个盒子 开始 -->
      <view class="itemListBox">
        <view class="itemListBox2">
          <view class="titlebox">统计结果</view>
          <view class="blackbox">
            <view>
              共申请
              <text class="nmuber">{{ preTotal }}</text>
              件商标
            </view>
            <view>
              同比上一年，申请量增长
              <text style="color: #666666;">{{ addRate }}</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 公共类的单个盒子 结束 -->

      <!-- /公共类按钮 -->
      <view class="comBtnBox" style="padding-top: 100rpx;"><view @click="goback()">返回上一页</view></view>
      <!-- 公共类按钮/ -->
    </view>
    <!-- 如果没有数据时的组件 开始 -->
    <view v-show="noData"><nodata btntxt="返回上一页" @refreshFun2="goback()"></nodata></view>
    <!-- 如果没有数据时的组件 结束 -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      baseapi4: this.baseapi4, //全局定义接口路径
      addRate: '', // 增量
      preTotal: '', // 商标数量
      startDate: '', // 起始日期
      endDate: '', // 终止日期
      area: '', // 区域
      imagePage: '', // 截屏的图片地址
      saveImgUrl: '', //保存到本地图片的路径
      vIfRes: null,
      noData: false
    };
  },
  onReady() {},
  onLoad(params) {
    this.getData(params.data);
  },
  methods: {
    // 获取本页面的ajax数据
    getData(data) {
      uni.showLoading({
        title: '数据加载中'
      });
      uni.request({
        url: 'https://www.iptop.cn/search/services/tmsearch/searchRegionApplyDate',
        method: 'POST',
        data: JSON.parse(data),
        success: res => {
          this.addRate = res.data.result.addRate == '-100.00%' ? '(统计中)' : res.data.result.addRate;
          this.preTotal = res.data.result.preTotal;
          this.startDate = JSON.parse(data).applyDateFrom;
          this.endDate = JSON.parse(data).applyDateTo;
          this.area = JSON.parse(data).province + JSON.parse(data).city;
          this.vIfRes = res.data.result.preTotal;
          uni.hideLoading();
          if (this.preTotal) {
            this.noData = false;
          } else {
            this.noData = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkArea.scss';
</style>
