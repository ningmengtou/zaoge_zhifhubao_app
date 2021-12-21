<template>
  <view class="announceBigBox" v-if="vIfRes">
    <!-- +++++++++++++++++定位在上面部分的区域 开始+++++++++++++++++++++++ -->
    <view class="announceFixTop" style="padding-top: 30rpx;">
      <!-- 头部的搜索盒子 开始 -->
<!--      <view class="searchBox">
        <view class="flBox">
          <view class="pickerbox">
            <picker @change="bindPickerChange" :value="filterIndex" :range="filterArray">
              <view class="OnlyBox">
                <text class="t1 uni-input">{{ filterArray[filterIndex] }}</text>
                <text class="t2 iconfont icon-sanjiaoxing"></text>
              </view>
            </picker>
          </view>
          <input class="inputClass" placeholder-class="placeClass" type="text" placeholder="请输入商标名/申请人/代理机构" v-model="keywords" />
        </view>
        <view class="frBox" @click="searchBtn">搜索</view>
      </view> -->
      <!-- 头部的搜索盒子 结束 -->
      <!-- 三个picker搜索框 开始 -->
      <view class="selectPick">
        <!-- 商标类别 -->
        <view class="itemPick">
          <picker @change="trademarkChange" :value="trademarkIndex" :range="trademarkArray" :range-key="'tradeName'">
            <view class="onlyBox">
              <text class="t1">{{ trademarkArray[trademarkIndex].tradeName }}</text>
              <text class="t2 iconfont icon-sanjiaoxing"></text>
            </view>
          </picker>
        </view>
        <!-- 选择公告类型 -->
        <view class="itemPick">
          <picker @change="bulletinChange" :value="bulletinIndex" :range="bulletinArray" :range-key="'key'" mode="selector">
            <view class="onlyBox">
              <text class="t1">{{ bulletinArray[bulletinIndex] }}</text>
              <text class="t2 iconfont icon-sanjiaoxing"></text>
            </view>
          </picker>
        </view>
        <!-- 选择期号 -->
        <view class="itemPick">
          <picker @change="IssueChange" :value="IssueIndex" :range="IssueArray">
            <view class="onlyBox">
              <text class="t1">第{{ IssueArray[IssueIndex] }}期</text>
              <text class="t2 iconfont icon-sanjiaoxing"></text>
            </view>
          </picker>
        </view>
      </view>
      <!-- 三个picker搜索框 结束 -->
    </view>
    <!-- +++++++++++++++++定位在上面部分的区域 结束+++++++++++++++++++++++ -->

    <!-- +++++++++++++++++定位在下面部分的区域 开始+++++++++++++++++++++++ -->
    <view class="announceFixBot">
      <!-- 公告 -->
      <view class="announBox" v-if="isShowData">
        <view class="announTitle">
          <view class="announTime">
            <view class="issue">第 {{ annChecked }} 期</view>
            <view class="time">{{ noticeName }}</view>
          </view>
        </view>
        <view class="announList">
          <view class="announItem" v-for="(item, index) in dataList" :key="item.id" @click="toDetail(item.trademarkId)">
            <view class="announImage"><image :src="item.trademarkPic" mode="widthFix"></image></view>
            <view class="message">
              <view class="mechanism dot2">{{ item.trademarkName }}</view>
              <view class="applicant">申请机构:{{ item.agency || '暂无' }}</view>
              <view class="type">{{ item.typeOfTrademarkCode }}类-{{ item.typeOfTrademarkName }}</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 如果列表没有数据 开始 -->
      <nodata v-else @refreshFun2="refreshFun3"></nodata>
      <!-- 如果列表没有数据 结束 -->
    </view>
    <!-- +++++++++++++++++定位在下面部分的区域 结束+++++++++++++++++++++++ -->
  </view>
</template>

<script>
import { requset } from '../../util/request.js';
import { jsonCategory } from '../../util/jsonCategory.js';
// #ifdef MP-ALIPAY
import { evaluate } from '../../util/eval5.min.js'; //支付宝小程序不兼容eval
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      vIfRes: null,
      filterArray: ['商标名称', '申请人', '代理机构'],
      filterIndex: 0,
      annChecked: '', // 当前期号
      trademarkArray: jsonCategory.data, // 商标类别数组
      trademarkIndex: 0, // 商标类别数组
      bulletinArray: [
        '商标初审公告',
        '集体商标初审公告',
        '证明商标初审公告',
        '商标注册公告（一）',
        '商标注册公告（二）',
        '集体商标注册公告',
        '证明商标注册公告',
        '商标转让/移转公告',
        '商标注册人/申请人名义及地址变更公告',
        '商品/服务项目删减公告',
        '变更商标代理机构公告',
        '商标更正公告',
        '注册商标续展公告',
        '商标使用许可备案公告',
        '注册商标注销公告',
        '注册商标撤销公告',
        '注册商标宣告无效公告',
        '商标注册申请撤回公告',
        '无效公告',
        '商标注册证遗失声明公告',
        '送达公告',
        '商标质权登记公告',
        '注册商标未续展注销公告'
      ], // 公告类型数组
      bulletinIndex: 0, // 公告类型数组
      IssueArray: [], // 期号数组
      IssueIndex: 0, // 期号数组
      // 数据
      dataList: [],
      // 请求页
      qqy: 1,
      // 商标类别
      tmtype: '',
      // 公告类型
      noticetype: 1,
      // 查询期号
      ggqh: '',
      // 申请人
      sqr: '',
      // 搜索关键词
      keywords: '',
      // 商标名
      tmname: '',
      // 代理机构
      dljg: '',
      // 选择的索引
      typeIndex: '',
      // 数据总量
      totalNum: 0,
      isShowData: true,
      // 是否是第一次请求
      isFirst: true,
      noticeName: '商标初审公告'
    };
  },
  onLoad() {
    this.getData();
  },
  methods: {
    bindPickerChange: function(e) {
      // console.log('picker发送选择改变，携带值为', e.target.value);
      this.filterIndex = e.target.value;
      let str = this.filterArray[e.target.value];
      this.typeIndex = e.target.value;
      // console.log(str);
    },
    toDetail(id) {
      uni.navigateTo({
        url: './announcementDetail?id=' + id,
        animationType: 'pop-in',
        animationDuration: 300
      });
    },
    refreshFun3() {
      this.getData();
    },
    getData() {
      uni.showLoading({
        title: '数据加载中...'
      });
      this.tmname = '';
      this.sqr = '';
      this.dljg = '';
      if (this.typeIndex == 0) {
        this.tmname = this.keywords;
      } else if (this.typeIndex == 1) {
        this.sqr = this.keywords;
      } else if (this.typeIndex == 2) {
        this.dljg = this.keywords;
      }

      let data = {
        qqy: this.qqy,
        noticetype: this.noticetype,
        ggqh: this.ggqh,
        tmtype: this.tmtype,
        sqr: this.sqr,
        tmname: this.tmname,
        dljg: this.dljg
      };

      uni.request({
        url: this.baseapi + '/sbc/get_tm_qmx_notice_list',
        method: 'GET',
        dataType: 'text',
        data: data,
        success: res => {
          // #ifdef MP-ALIPAY
          let result = evaluate(res.data);
          // console.log('支付宝平台res', result);
          // #endif

          // #ifdef APP-PLUS || H5
          let result = eval(res.data);
          // console.log('APP+H5平台res', result);
          // #endif

          this.vIfRes = result;
          // 期号
          this.IssueArray = result.data[0].numArr;
          result.data[0].listData.forEach(item => {
            item.trademarkPic = 'https://image.qmxip.com/' + item.trademarkPic;
          });
          this.dataList = [...this.dataList, ...result.data[0].listData];
          this.totalNum = result.data[0].total;
          this.ggqh = result.data[0].numArr[0];
          if (this.isFirst) {
            this.annChecked = result.data[0].numArr[0];
          }
          uni.hideLoading();
          if (this.dataList.length == 0) {
            this.isShowData = false;
          } else {
            this.isShowData = true;
          }
        }
      });
    },
    trademarkChange(e) {
      this.qqy = 1;
      this.trademarkIndex = e.detail.value;
      this.tmtype = e.detail.value == 0 ? '' : e.detail.value;
      this.dataList = [];
      this.getData();
    },
    bulletinChange(e) {
      this.qqy = 1;
      this.bulletinIndex = e.detail.value;
      this.noticetype = e.detail.value + 1;
      this.noticeName = this.bulletinArray[e.detail.value];
      this.dataList = [];
      this.getData();
    },
    IssueChange(e) {
      this.isFirst = false;
      this.qqy = 1;
      this.IssueIndex = e.detail.value;
      this.ggqh = this.IssueArray[e.detail.value];
      this.dataList = [];
      this.getData();
      this.annChecked = this.IssueArray[e.detail.value];
    },
    searchBtn() {
      this.qqy = 1;
      this.dataList = [];
      this.getData();
    },
    // 上拉加载更多
    onReachBottom() {
      let total = this.qqy * 20;
      if (this.totalNum > total) {
        this.qqy += 1;
        this.getData();
      } else {
        uni.showToast({
          title: '没有数据了',
          icon: 'none'
        });
      }
    }
  }
};
</script>

<style lang="scss">
page {
  background-color: #f2f4f5;
}

.announBox {
  width: 100%;
  padding: 60rpx 40rpx;
  border-radius: 16rpx;
  background: #f7f7f7;

  .announTitle {
    display: flex;
    justify-content: space-between;

    .announTime {
      display: flex;
      align-items: center;

      .issue {
        font-size: 36rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #1c2132;
        line-height: 34rpx;
        margin-right: 15rpx;
      }

      .time {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ff5500;
        line-height: 34rpx;
      }
    }

    .past {
      .uni-input {
        font-size: 22rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #134bfc;
        line-height: 34rpx;
      }
    }
  }

  .announList {
    margin-top: 25rpx;
    .announItem {
      display: flex;
      align-items: center;
      padding: 30rpx;
      background-color: #fff;
      border-radius: 12px;
      margin-bottom: 25rpx;
      width: 100%;
      .announImage {
        width: 150rpx;
        height: 150rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eee;
        padding: 1px;
        overflow: hidden;
        image {
          width: 100%;
          max-width: 100%;
        }
      }

      .message {
        padding-left: 20rpx;
        width: calc(100% - 150rpx);
        .applicant,
        .typesOf {
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #989898;
          line-height: 24rpx;
          margin: 20rpx 0;
          letter-spacing: 3rpx;
          width: 450rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .mechanism {
          font-size: 32rpx;
          font-weight: 600;
          color: #333333;
        }
        .type {
          width: 180rpx;

          height: 45rpx;
          background: RGBA(236, 241, 255, 1);
          border-radius: 4rpx;
          // opacity: 0.08;
          font-size: 20rpx;
          text-align: center;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: RGBA(18, 71, 252, 1);
          line-height: 45rpx;
        }
      }
    }
  }
}
.bulletinClass {
  width: 170rpx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.nodata {
  margin-top: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  image {
    width: 328rpx;
    height: 165rpx;
  }
}
// 头部的搜索盒子
.searchBox {
  padding: 40rpx 20rpx;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .flBox {
    width: 78%;
    display: flex;
    border: 1px solid #ddd;
    border-radius: 10rpx;
    .pickerbox {
      width: 30%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #ddd;
      .OnlyBox {
        display: inline-flex;
        align-items: center;
        height: 60rpx; //高度一致
        text {
          font-size: 24rpx;
          color: #333;
        }
      }
    }
    .inputClass {
      width: 70%;
      height: 60rpx; //高度一致
      line-height: 60rpx; //高度一致
      font-size: 24rpx;
      color: #333;
      padding-left: 20rpx;
    }
    .placeClass {
      height: 60rpx; //高度一致
      line-height: 60rpx; //高度一致
    }
  }
  .frBox {
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60rpx; //高度一致
    font-size: 24rpx;
    color: #fff;
    border: 1px solid $thecol;
    border-radius: 10rpx;
    background: $thecol;
  }
}
// 三个picker搜索框
.selectPick {
  background: #fff;
  padding: 0 20rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .itemPick {
    width: 30%;
    max-width: 30%;
    border: 1px solid $thecol;
    border-radius: 5rpx;
    .onlyBox {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      text {
        font-size: 24rpx;
        color: $thecol;
        max-width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding: 10rpx 0;
      }
    }
  }
}
// 黄老师把页面分割成了上下的两部分
.announceBigBox {
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  .announceFixTop {
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    width: 100%;
  }
  .announceFixBot {
    width: 100%;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
