<template>
  <view class="uniBigBox" v-if="vIfRes">
    <!-- 搜索盒子的组件 开始 -->
    <view style="padding: 50rpx 0;"><searchs :keyword="keyword" @searchFun2="search"></searchs></view>
    <!-- 搜索盒子的组件 结束 -->

    <!-- 列表大全 开始 -->
    <view class="classDetailList">
      <view class="banxin670 classDetailList2">
        <view class="list1">
          <view class="fls oe">{{ this.aaa }}</view>
          <view class="frs">{{ this.bbb }}</view>
        </view>
        <view class="list2">
          <view class="itembox" v-for="(item, index) in tableList" :key="index">
            <view class="fls oe">{{ item.fspdm }}</view>
            <view class="frs">{{ item.fspname }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      vIfRes: null, //防止页面闪屏
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      keyword: '', // 关键字
      tableList: [], //列表数据
      id: '', //从上一个页面传递过来的值
      aaa: '', //从上一个页面传递过来的值
      bbb: '' //从上一个页面传递过来的值
    };
  },
  onReady() {},
  onLoad(params) {
    this.id = params.id; //从上一个页面传过来的值
    this.aaa = params.aaa; //从上一个页面传过来的值
    this.bbb = params.bbb; //从上一个页面传过来的值
    this.getAjax(); // 获取本页面的Ajax数据
  },
  methods: {
    // 获取本页面的Ajax数据
    getAjax() {
      uni.showLoading({
        title: '加载中....'
      });
      uni.request({
        url: this.baseapi + '/sbc/get_tm_type?type=2&id=' + this.id,
        method: 'GET',
        success: res => {
          this.vIfRes = res;
          this.tableList = res.data.gridData.table_list.data;
        },fail: err=> {
        	uni.hideLoading();
        }
      });
    },
    // 点击搜索
    search(keyword) {
      uni.navigateTo({
        url: './trademarkClassifyQuery?keyword=' + keyword,
		animationType:'pop-in',
		animationDuration:300
      });
    }
  },
  watch:{
	  tableList:function() {
		  this.$nextTick(function(){
		  	 uni.hideLoading();
		  })
	  }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkList.scss';
</style>
