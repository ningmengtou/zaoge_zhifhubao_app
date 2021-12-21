<template>
  <view class="uniBigBox">
    <!--头部两个表单框 开始 -->
    <view class="showBox">
      <view class="searchMore searchMore3">
        <view class="inputBox"><input type="text" class="inputBox2" placeholder-class="regPlace" v-model="regWords" placeholder="请输入商标名称" /></view>
        <!-- <view class="inputBox"><input type="text" class="inputBox2" placeholder-class="regPlace" v-model="regType" placeholder="请输入商品类型,如:手机,衣服,电器" /></view> -->
      </view>
      <view class="regBtn"><button class="resetBtn" hover-class="none" @click="loginBtn">智能分析</button></view>
    </view>
    <!--头部两个表单框 结束 -->

    <!-- 列表大全 开始 -->
    <view class="forecaseList" v-if="isShowNoData">
      <view class="banxin690 forecaseList2">
        <!-- ++++++++++++++++++++动态数据 开始+++++++++++++++++++++ -->
        <view >
          <view class="itembox" >
			  
				<view class="topTitle" :class="styleColor">
					注册成功率: {{jilv(resultInfo.registerSuccessRate)}}
				</view>
			  
				<view class="rate">
					此商标<text>{{keyword}}</text>注册指数为：<text>{{resultInfo.registerSuccessRate}}</text>
				</view>
				<view class="moreNum">
					共检测近似商标 <text>{{resultInfo.trademarkGeneralNameDTO.sameNameTrademark}}</text> 个 
				</view>
				<view class="moreNum">
					其中非常近似商标 <text>{{resultInfo.trademarkSameNameDTO.sameNameTrademark}}</text> 个 
				</view>
        </view>
		</view>
      </view>
    </view>
    <!-- 列表大全 结束 -->
	
	<view class="trademarkList" v-if="isShowNoData">
		<view class="listTitle">
			近似商标
			<view class="more" @click="gopage(`/pages/trademarkQuery/trademarkQuery?keyword=${keyword}&option=0`)">
				查看更多 <text class="iconfont icon-youjiantou"></text> <text class="iconfont icon-youjiantou"></text>
			</view>
		</view>
	  <view class="trademarks">
	    <view class="trademarkItem" v-for="(item, index) in trademarkList" :key="item.id">
	      <view class="photos"><image :src="item.patternUrl" mode="widthFix"></image></view>
	      <view class="message">
	        <view class="keyword">
	          <view class="tname oe">{{ item.trademarkName || '暂无' }}</view>
	          <view class="tstatus oe" >{{ item.status || '暂无' }}</view>
	        </view>
	        <view class="type">类别：{{ item.category || '暂无' }}</view>
	        <view class="application">申请人：{{ item.regUserName || '暂无' }}</view>
	        <!-- <view class="application">代理机构: {{ item.agency || '暂无' }}</view> -->
	        <view class="tworow">
	          <text class="oe">申请号：{{ item.regNo || '暂无' }}</text>
	          <text class="oe">日期：{{ item.applyYmd || '暂无' }}</text>
	        </view>
	      </view>
	    </view>
	  </view>
	</view>

  </view>
</template>

<script>
import { request } from '../../util/request.js';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      isShowNoData: false, //暂无数据
      isShowHasData: true, //列表数据
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      isDataShow: false, // 是否有数据
      trademarkList: [], // 成功率数据
      keyWords: '', //头部的关键字
      groundNum: 0, //头部的群组
      regWords: '',
      regType: '',
	  keyword:'',
	  styleColor:''
	
    };
  },
  onReady() {},
  onLoad(params) {
    this.regWords = params.key ? params.key : '';
  },
  methods: {
    // vuex东东
    ...mapMutations(['getkeyWords']),
    // 获取本页面的Ajax请求
    async getData(params) {
	   this.keyword = params
		let res = await request('/sbc.esp?tm_success', params);
		this.resultInfo = res.data.reportInfo
		
		if(res.data.reportInfo.generalRiskCategoryScale) {
			this.isShowNoData = true
			this.trademarkList = res.data.reportInfo.trademarkGeneralNameDTO.trademarkReportDetailDTOList
		}
    },
	jilv(num) {
		if(num > 0 && num <= 30) {
			this.styleColor = 'red'
			return '低'
		}else if (num <= 80) {
			this.styleColor = 'orange'
			return '中'
		}else {
			this.styleColor = 'green'
			return '高'
		}
	},
    // 取85到99随机数
    getRandom() {
      return Math.round((Math.random() * (99 - 85) + 85) * 10) / 10;
    },
    // 查看更多的页面跳转
    toMore(number, name, no) {
      let obj = {
        number,
        name,
        no,
        keyWords: this.keyWords
      };
      uni.navigateTo({
        url: './trademarkRegAnalyze?params=' + JSON.stringify(obj),
        animationType: 'pop-in',
        animationDuration: 300
      });
    },
    // 返回首页
    refreshFun3() {
      this.gopage('../index/index', 'tabbar');
    },
    // 智能分析
    loginBtn() {
      if (this.regWords == '') {
        this.$layer('请输入商标名称');
        return false;
      }
     
      let obj = this.regWords
      this.getData(obj);
    }
  }
};
</script>

<style lang="scss">
// 当前页面
.uniBigBox {
  background: #f2f4f5;
}

// 头部的提示句子
.topTip {
  width: 100%;
  background: #e3e9ff;

  .topTip2 {
    padding: 15rpx 0;
    font-size: 22rpx;
    color: $thecol;
    text-align: justify;
  }
}

// 列表大全
.forecaseList {
  padding: 30rpx 0;

  .forecaseList2 {
    .itembox {
      background: #fff;
      margin-top: 30rpx;
      padding: 40rpx;
      border-radius: 10rpx;
      position: relative;
		.topTitle {
			font-size: 35rpx;
			font-weight: 600rpx;
			margin-bottom: 30rpx;
			
		}
		.green {
			color: #35BB6A;
		}
		.red {
			color: #ff0000;
		}
		.orange {
			color: #ffaa00;
		}
      .rate {
      		  font-size: 35rpx;
      		  color: #000;
      		  margin-bottom: 30rpx;
      		  text {
      			  font-size: 35rpx;
      			  font-weight: 600;
      			  margin: 0 15rpx;
      			  color: #8085ff;
      		  }
      }
      .moreNum {
      		  font-size: 28rpx;
      		  color: #000;
      		  margin-bottom: 15rpx;
      		  text {
      			  font-size: 35rpx;
      			  font-weight: 600;
      			  margin: 0 15rpx;
      			  color: #8085ff;
      		  }
      }
    }
  }
}

.other {
  display: flex;
  align-items: center;

  text {
    margin-right: 10rpx;
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

.showBox {
  background-color: #fff;
  padding-bottom: 40rpx;

  .searchMore {
    display: flex;
    flex-direction: column;
    align-items: center;

    text {
      font-size: 24rpx;
      font-weight: 400;
      color: #989898;
      line-height: 34rpx;
      margin: 30rpx 0 20rpx 0;
    }

    .seletBox {
      display: flex;
      width: 580rpx;

      .selectItem {
        width: 160rpx;
        height: 66rpx;
        background: #eff2f9;
        text-align: center;
        font-size: 24rpx;
        font-weight: 400;
        color: #989898;
        line-height: 66rpx;
        margin-right: 40rpx;
        border-radius: 40rpx;
      }

      .active {
        position: relative;
        background: #1247fc;
        color: #fff;
      }

      .active::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: -10rpx;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
        border-top: 20rpx solid #1247fc;
      }
    }

    .inputBox {
      display: flex;
      align-items: center;
      margin: 30rpx 0;
      width: 690rpx;
      height: 90rpx;
      background-color: #e7e8f0;
      border-radius: 8rpx;
      border: 1rpx solid #dfdddd;

      .input {
        padding-left: 30rpx;
        width: 80%;
        line-height: 60rpx;
        height: 60rpx;
      }

      .place {
        line-height: 60rpx;
        height: 60rpx;
      }

      .imgBox {
        height: 100%;
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 35rpx;
          height: 35rpx;
        }
      }
    }
  }
}

.regBtn {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30rpx;
  .resetBtn {
    height: 80rpx;
    border-radius: 10rpx;
    width: 690rpx;
    background: linear-gradient(to right, #363a5d, #555882);
    font-size: 26rpx;
    color: #fff;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
.filterBox {
  filter: blur(2px);
}
.inputBox2 {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
  color: #333;
  display: block;
  width: 100%;
  padding: 0 30rpx;
  box-sizing: border-box;
}
.regPlace {
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
  color: #666;
}
.trademarkList {
	.listTitle {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 35rpx;
		font-weight: 600;
		padding: 30rpx;

		.more {
			width: 200rpx;
			height: 60rpx;
			line-height: 60rpx;
			color: #8085ff;
			font-size: 26rpx;
		
			text-align: center;
			text {
				color: #8085ff;
				font-size: 26rpx;
			}
		}
	}
	.trademarks {
		width: 100%;
		padding: 0 30rpx;
	  margin-top: 20rpx;
	  .trademarkItem {
	    position: relative;
	    box-sizing: border-box;
	    width: 100%;
	    display: flex;
	    align-items: center;
	    padding: 0 30rpx;
	    background-color: #fff;
	    border-radius: 12px;
	    margin-bottom: 20rpx;
	    .photos {
	      box-sizing: border-box;
	      display: flex;
	      justify-content: center;
	      align-items: center;
	      width: 150rpx;
	      height: 150rpx;
	      border: 1px solid #eee;
	      image {
	        width: 100%;
	        max-width: 100%;
	      }
	    }
	    .message {
	      padding-left: 30rpx;
	      box-sizing: border-box;
	      width: calc(100% - 150rpx);
	      .keyword {
	        display: flex;
	        align-items: center;
	        justify-content: space-between;
	        padding: 15rpx 0;
	        width: 100%;
	        .tname {
	          width: 70%;
	          font-size: 32rpx;
	          font-weight: 600;
	          color: #292929;
	          overflow: hidden;
	          white-space: nowrap;
	          text-overflow: ellipsis;
	        }
	        .tstatus {
	          width: 30%;
	          padding: 5rpx 10rpx;
	          text-align: center;
	        }
	      }
	      // 每个单行的
	      .type,
	      .application,
	      .status {
	        font-size: 24rpx;
	        font-weight: 400;
	        color: #969696;
	        margin-bottom: 16rpx;
	        width: 100%;
	        overflow: hidden;
	        white-space: nowrap;
	        text-overflow: ellipsis;
	      }
	      // 单独处理单个的
	      .type {
	        display: flex;
	        align-items: center;
	        text {
	          background: #ecf1ff;
	          color: #1247fc;
	          font-size: 20rpx;
	          padding: 10rpx 20rpx;
	          border-radius: 5rpx;
	        }
	      }
	      .tworow {
	        padding-bottom: 20rpx;
	        width: 100%;
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        text {
	          font-size: 24rpx;
	          color: #969696;
	          max-width: 50%;
	        }
	      }
	    }
	    .statusBox {
	      position: absolute;
	      padding: 7rpx 10rpx;
	      right: 10rpx;
	      top: 83rpx;
	      font-size: 20rpx;
	      color: RGBA(0, 150, 255, 1);
	      line-height: 40rpx;
	      border-radius: 10rpx;
	      border: 1rpx solid RGBA(0, 150, 255, 1);
	    }
	  }
	}
}


</style>
