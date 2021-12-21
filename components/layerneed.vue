<template>
  <!-- 需求信息的两个弹窗盒子(一个填写需求，一个提交成功) 开始 -->
  <view>
    <view class="layerMask" v-show="ismask1" @touchmove.prevent="stopScroll" @click="closemask"></view>
    <!-- ++++++++++++一个填写需求+++++++++++++ -->
    <view class="comLayer layerNeed" v-show="ismask2" @touchmove.prevent="stopScroll">
      <view class="closeBtn" @click="closemask"><image :src="baseimg + 'iconclose.png'"></image></view>
      <view class="containBox">
        <view class="titlebox">需求信息</view>
        <view class="formbox">
          <!-- 单条 -->
          <view class="itembox">
            <view class="fls oe">您的称呼</view>
            <view class="frs"><input class="input" type="text" placeholder="请填写您的称呼" placeholder-class="place" /></view>
          </view>
          <!-- 单条 -->
          <view class="itembox">
            <view class="fls oe">联系电话</view>
            <view class="frs"><input class="input" v-model="dataParams.phone" type="text" placeholder="请填写联系电话" placeholder-class="place" /></view>
          </view>
          <!-- 单条 -->
          <view class="itembox">
            <view class="fls oe">商标名称</view>
            <view class="frs">
              <input
                :disabled="dataParams.trademarkName ? true : false"
                class="input"
                v-model="dataParams.trademarkName"
                type="text"
                placeholder="请填写商标名称"
                placeholder-class="place"
              />
            </view>
          </view>
          <view class="itembox">
            <view class="fls oe">商标类别</view>
            <view class="frs">
              <input
                :disabled="dataParams.trademarkMessage ? true : false"
                class="input"
                v-model="dataParams.trademarkMessage"
                type="text"
                placeholder="请填写商标类别"
                placeholder-class="place"
              />
            </view>
          </view>
          <!-- 单条 -->
          <view class="itembox">
            <view class="fls oe">需要服务</view>
            <view class="frs">
              <picker mode="selector" class="picker" :value="serviceVal" :range="serviceArr" @change="serviceChange">
                <view class="onlyBox">
                  <text class="t1 text">{{ serviceArr[serviceVal] }}</text>
                  <text class="t2 iconfont icon-youjiantou"></text>
                </view>
              </picker>
            </view>
          </view>
          <!-- 单条 -->
          <view class="itembox">
            <view class="fls oe">备注</view>
            <view class="frs"><input class="input" type="text" placeholder="选填" placeholder-class="place" /></view>
          </view>
        </view>
        <!-- 提交 -->
        <view class="subbox">
          <view class="comBtnBox"><view @click="contact">联系客服</view></view>
          <view class="comBtnBox" @click="confirm"><view>确定</view></view>
        </view>
        <!-- 提示 -->
        <view class="tipsbox">*若收件信息错误，请联系客服</view>
      </view>
    </view>
    <!-- ++++++++++++一个提交成功+++++++++++++ -->
    <view class="comLayer layerSuccess" v-show="ismask3" @touchmove.prevent="stopScroll">
      <!-- <view class="closeBtn" @click="closemask"><image :src="baseimg + 'iconclose.png'"></image></view> -->

      <view class="containBox">
        <view class="okImg"><image :src="baseimg + 'iconok2.png'"></image></view>
        <view class="okSuccess">提交成功！</view>
        <view class="okContact">稍后我们的工作人员将会联系到您</view>
        <view class="okSubmit">
          <view class="comBtnBox" @click="confirmok"><view>确定</view></view>
        </view>
      </view>
    </view>
  </view>
  <!-- 需求信息的两个弹窗盒子(一个填写需求，一个提交成功) 结束 -->
</template>

<script>
export default {
  props: {
    ismask1: {
      type: Boolean,
      default: false
    },
    ismask2: {
      type: Boolean,
      default: false
    },
    ismask3: {
      type: Boolean,
      default: false
    },
    dataParams: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      // ismask1: false,
      // ismask2: false,
      // ismask3: false,
	  baseimg: this.baseimg, //全局定义图片路径
      telphone: '',
      serviceArr: [
        '请选择服务',
        '顾问商标注册',
        '国际商标注册',
        '商标转让',
        '商标异议答辩',
        '商标设计',
        '商标续展',
        '商标信息变更',
        '商标行政诉讼',
        '商标注销',
        '商标无效宣告答辩',
        '商标异议申请',
        '商标许可备案',
        '自助商标注册',
        '商标补发注册证',
        '商标驳回复审',
        '商标撤三申请',
        '商标撤三答辩',
        '商标变更',
        '担保商标注册',
        '商标交易',
        '商标宽展'
      ],
      serviceVal: 0
    };
  },
  created() {
    this.telphone = this.dataParams.phone;
  },
  methods: {
    // 下拉选择服务
    serviceChange: function(e) {
      this.serviceVal = e.target.value;
      console.log(e.target.value);
    },
    // 打开遮罩
    openmask() {
      // this.isMask1 = true;
      // this.isMask2 = true;
      // this.isMask3 = false;
      this.$emit('openmask2');
    },
    // 关闭遮罩
    closemask() {
      this.$emit('closeMask');
      // this.isMask1 = false;
      // this.isMask2 = false;
      // this.isMask3 = false;
    },
    // 联系客服
    contact() {
      this.$emit('contactOpen');
    },
    // 第一个弹窗的确定
    confirm() {
      this.$emit('closeMask');
      this.$emit('successBuy', {
        phone: this.dataParams.phone
      });
    },
    // 第二个弹窗的确定
    confirmok() {
      this.$emit('closeMask');
    }
  }
};
</script>

<style lang="scss">
// @import '@/components/aaa.scss';
// 公共类picker样式
.picker {
  height: 100%;
  padding: 15rpx 0;
  .onlyBox {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .t1 {
      font-size: 28rpx;
      color: #292929;
    }
    .t2.iconfont {
      font-size: 14px;
      color: #bbb;
      transform: rotate(90deg);
    }
  }
}
// 需求信息的两个弹窗盒子--遮罩
.layerMask {
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 100;
  background: #616263;
}
// 需求信息的两个弹窗盒子--内容
.comLayer {
  width: 606rpx;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 104;
  background: #fff;
  border-radius: 12rpx;
  padding: 60rpx 40rpx;
  // 关闭按钮
  .closeBtn {
    position: absolute;
    padding: 40rpx;
    right: 0;
    top: 0;
    image {
      width: 24rpx;
      height: 24rpx;
    }
  }
}
// ++++++++++++一个填写需求+++++++++++++
.layerNeed {
  // 内容区域
  .containBox {
    .titlebox {
      text-align: center;
      padding-bottom: 30rpx;
      font-size: 36rpx;
      color: #3f3f3f;
    }
    .formbox {
      .itembox {
        width: 100%;
        display: flex;
        align-items: center;
        .fls {
          width: 30%;
          font-size: 28rpx;
          color: #969696;
          padding: 15rpx 0;
        }
        .frs {
          width: 70%;
          .input {
            padding: 15rpx 0;
            font-size: 28rpx;
            color: #292929;
            display: block;
            height: 100%;
          }
          .place {
            font-size: 28rpx;
            color: #969696;
          }
        }
      }
    }
    // 提交
    .subbox {
      padding-top: 80rpx;
      display: flex;
      justify-content: space-between;
      .comBtnBox {
        view {
          width: 252rpx;
          height: 80rpx;
          border-radius: 80rpx;
          font-size: 32rpx;
        }
        &:first-child {
          view {
            background: #fff;
            border: 2rpx solid #ebebeb;
            color: #4d4d4d;
          }
        }
      }
    }
    // 提示
    .tipsbox {
      padding-top: 40rpx;
      font-size: 26rpx;
      color: #969696;
      text-align: center;
    }
  }
}
// ++++++++++++一个提交成功+++++++++++++
.layerSuccess {
  .containBox {
    .okImg {
      width: 100%;
      display: flex;
      justify-content: center;
      image {
        width: 140rpx;
        height: 144rpx;
      }
    }
    .okSuccess {
      text-align: center;
      padding-top: 45rpx;
      font-size: 36rpx;
      color: #3f3f3f;
    }
    .okContact {
      text-align: center;
      padding-top: 20rpx;
      font-size: 28rpx;
      color: #656565;
    }
    .okSubmit {
      padding-top: 40rpx;
      .comBtnBox {
        view {
          width: 320rpx;
        }
      }
    }
  }
}
</style>
