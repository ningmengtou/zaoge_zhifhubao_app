<template>
  <view class="uniBigBox" v-if="vIfRes">
    <!-- 搜索盒子的组件 开始 -->
    <view style="padding: 50rpx 0;"><searchs @searchFun2="searchFun2"></searchs></view>
    <!-- 搜索盒子的组件 结束 -->

    <!-- 列表大全 开始 -->
    <view class="classQueryList">
      <view class="banxin670 classQueryList2">
        <!-- 1 -->
        <view class="list1">
          <view class="fls"><image :src="baseimg + 'category' + imgObj + '.png'"></image></view>
          <view class="frs">
            <view class="fr1 oe">{{ theTitle }}</view>
            <view class="fr2 dot3">{{ theDescript }}</view>
          </view>
        </view>
        <!-- 2 -->
        <view class="list2">
          <view
            class="itembox"
            v-for="(item, index) in searchList"
            :key="index"
            @click="goToDetal(item.tmSecondCategoryTypeId, item.tmSecondCategoryTypeId, item.tmSecondCategoryTypeName)"
          >
            <view class="fls">
              <view class="fl1 oe">{{ item.tmSecondCategoryTypeId }}</view>
              <view class="fl2">{{ item.tmSecondCategoryTypeName }}</view>
            </view>
            <view class="frs"><text class="iconfont icon-youjiantou"></text></view>
          </view>
        </view>
      </view>
    </view>
    <!-- 列表大全 结束 -->
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
      theTitle: '', //标题文字
      theDescript: '', //描述文字
      searchList: [], //搜索的结果列表
      imgObj: '1', //专门收集传递过来的数字方便图片动态改变
      keyword: '' // 关键字
    };
  },
  onLoad(options) {
    let idx = options.idx; //获取上一个页面传递过来的参数
    this.imgObj = options.idx; //专门收集传递过来的数字方便图片动态改变
    this.getAjax(); // 获取当前页面的Ajax数据
  },
  methods: {
    ...mapMutations(['changeTransKey']),
    // 获取当前页面的Ajax数据
    getAjax() {
      uni.showLoading({
        title: '加载中....'
      });
      uni.request({
        url: this.baseapi + '/sbc/get_tm_type2',
        method: 'GET',
        data: {
          id: this.imgObj
        },
        success: res => {
          if (res.data.code == 200 || res.data.code == '200') {
            this.theTitle = res.data.data.tmIndustryTypeText; //标题文字
            this.theDescript = res.data.data.tmTypeDescribe; //描述文字
            this.searchList = res.data.data.secondCategoryInfos; //搜索的结果列表
          } else {
            return false;
          }
          this.vIfRes = res.data.data.tmIndustryTypeText;
        },
        fail: () => {
          uni.hideLoading();
        }
      });
    },
    // 跳转到详情
    goToDetal(id, parm1, parm2) {
      uni.navigateTo({
        url: './trademarkDetail?id=' + id + '&aaa=' + parm1 + '&bbb=' + parm2,
        animationType: 'pop-in',
        animationDuration: 300
      });
    },
    // 点击搜索
    searchFun2(keyword) {
      uni.navigateTo({
        url: './trademarkClassifyQuery?keyword=' + keyword
      });
    }
  },
  watch: {
    searchList: function() {
      this.$nextTick(function() {
        uni.hideLoading();
      });
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkList.scss';
</style>
