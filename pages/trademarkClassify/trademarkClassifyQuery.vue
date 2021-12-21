<template>
  <view class="uniBigBox" v-if="vIfRes">
    <!-- 搜索盒子的组件 开始 -->
    <view style="padding: 50rpx 0;"><searchs  @searchFun2="searchFun3"  @inputEvent="inputEvent"></searchs></view>
    <!-- 搜索盒子的组件 结束 -->

    <!-- 单个bar提示 开始 -->
    <view class="singleBar">
      <view class="banxin690 singleBar2">
        <text>大类：{{ bigType }}个</text>
        <text>小类：{{ smallType }}个</text>
      </view>
    </view>
    <!-- 单个bar提示 结束 -->

    <!-- 列表大全 开始 -->
    <view class="myQueryList" v-if="dataList.length != 0">
      <view class="banxin690 myQueryList2">
        <!-- /单条 -->
        <view class="itembox" v-for="(item, index) in dataList" :key="item.id">
          <view class="v1">{{ item.category }}类 - {{ item.name }}</view>
          <view class="v2" v-for="(items, indexs) in item.children" :key="items.id">
            <view class="middle">
              <view class="v2fl">{{ items.group }}</view>
              <view class="v2fr">{{ items.name }}</view>
            </view>

            <view class="lastChild" v-for="(itemss, indexss) in items.children" :key="itemss.id">
              <view class="lastChildgroup">{{ itemss.group }}</view>
              <view class="lastChildname">{{ itemss.name }}</view>
            </view>
          </view>
        </view>
        <!-- 单条/ -->
      </view>
    </view>
    <!-- 列表大全 结束 -->

    <!-- 如果数据为空 开始 -->
    <nodata v-else @refreshFun2="refreshFun3"></nodata>
    <!-- 如果数据为空 结束 -->
  </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      vIfRes: null, //防止页面闪屏
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      baseapi4: this.baseapi4, //全局定义接口路径
      keywordVal: '', //关键词的值
      dataList: [], //列表的数据
      bigType: 0, //大类的值
      smallType: 0 //小类的值
    };
  },
  onReady() {},
  onLoad(options) {
    this.keywordVal = options.keyword; //接收上一个页面传递过来的值、
	this.changeTransKey(options.keyword)
    this.getData(); // 获取本页面的Ajax数据
  },
  methods: {
	  ...mapMutations(['changeTransKey']),
    // 获取本页面的Ajax数据
    getData(params) {
      uni.showLoading({
        title: '数据加载中...'
      });
      uni.request({
        url: this.baseapi4 + '/api/public/trademark-cate?type=search',
        method: 'POST',
        data: {
          keyword: this.keywordVal
        },
        success: res => {
          this.dataList = res.data.data;
          this.vIfRes = res.data.message;
          this.getTypeNumber(this.dataList);
        },fail:err=>{
			uni.hideLoading();
		}
      });
    },
    // 搜索
    searchFun3(key) {
      this.keywordVal = key;
      this.getData();
    },
	refreshFun3() {
		if(!this.keywordVal) {
			uni.showToast({
				title:'关键字不能为空',
				icon:'none'
			})
		}
		this.getData();
	},
    // 统计类别数量
    getTypeNumber(dataList) {
      let arr = [];
      let num = 0;
      arr = dataList.map(item => {
        num += item.children.length;
        return item.category;
      });
      this.bigType = [...new Set(arr)].length;
      this.smallType = num;
    },
	inputEvent(key) {
	  this.keywordVal = key;
	}
  },
  watch:{
	  dataList:function() {
		  this.$nextTick(function(){
		  	uni.hideLoading();
		  })
	  }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkClassifyQuery.scss';
.nodata {
  padding-top: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  image {
    width: 328rpx;
    height: 165rpx;
  }
}
.myQueryList .myQueryList2 .v2 .lastChild {
  border-bottom: 1px solid #eee;
}
.myQueryList .myQueryList2 .v2 .lastChild:last-child {
  border-bottom: none;
}
.myQueryList .myQueryList2 .v2:last-child {
  border-bottom: none;
}
</style>
