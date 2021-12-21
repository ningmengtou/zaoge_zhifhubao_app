<template>
  <view class="uniBigBox">
    <!-- 如果是输入手机号获取验证码的组件 开始 -->
    <codelogin ref="codelogin" :isShowMask="isShowMask2" @openMask2="openMask3" @closeMask2="closeMask3" @loginSuccess="loginSuccess"></codelogin>
    <!-- 如果是输入手机号获取验证码的组件 结束 -->

    <!-- 选择行业与选择类别的弹窗遮罩 开始 -->
    <view class="selectMask" v-show="isMask">
      <!-- 头部 -->
      <view class="selectTop">
        <view class="itembox" :class="tabIndex === index ? 'on' : 'off'" v-for="(item, index) in tabHeadList" :key="index" @click="tabChange(index)">{{ item }}</view>
      </view>
      <!-- 内容部分 -->
      <view class="selctCont">
        <!-- 1选择行业 -->
        <view class="selctCont1" v-show="!isShowCont">
          <view class="itembox" :class="accordionIndex == index ? 'on' : 'off'" v-for="(item, index) in accordionArr" :key="item.parent" @click="onlyAccordion(index)">
            <view class="titletext oe">
              <text class="text">{{ item.parent }}</text>
              <text class="iconfont icon-youjiantou"></text>
            </view>
            <view class="subbox">
              <view class="oe" :class="industryIndex == indexs ? 'on' : 'off'" v-for="(items, indexs) in item.children" :key="items" @click.stop="selectSingle(items, indexs)">
                {{ indexs + 1 }}、{{ items }}
              </view>
            </view>
          </view>
        </view>
        <!-- 2选择类别 -->
        <view class="selctCont2" v-show="isShowCont">
          <view class="itembox oe" :class="item.ison == true ? 'on' : 'off'" v-for="(item, index) in categoryList" :key="item.id" @click="selectMore(index, item)">
            {{ item.tradeName }}
          </view>
        </view>
      </view>
      <!-- 底部 -->
      <view class="selectBot">
        <view class="bot1Box botsBox" v-show="!isShowCont">
          <text @click="goback()">返回上一页</text>
          <text class="on" @click="confirmMore1">确定</text>
        </view>
        <view class="bot2Box botsBox" v-show="isShowCont">
          <text @click="goback()">返回上一页</text>
          <text class="on" @click="confirmMore2">确定</text>
        </view>
      </view>
    </view>
    <!-- 选择行业与选择类别的弹窗遮罩 结束 -->

    <!-- 三个数字显示盒子 开始 -->
    <view class="threeNumbers">
      <view class="banxin690 threeNumbers2">
        <view class="itembox">
          <text class="t1">{{ lowArr.length }}</text>
          <text class="t2">低风险类别</text>
        </view>
        <view class="itembox">
          <text class="t1">{{ middleArr.length }}</text>
          <text class="t2">中风险类别</text>
        </view>
        <view class="itembox">
          <text class="t1">{{ highArr.length }}</text>
          <text class="t2">高风险类别</text>
        </view>
      </view>
    </view>
    <!-- 三个数字显示盒子 结束 -->

    <!-- 三个风险的很多小数字的盒子 开始 -->
    <view class="threeRisk">
      <view class="banxin690 threeRisk2">
        <!-- 头部 -->
        <view class="topbox" @click="openMask">
          <view class="fls oe">{{ theKeyWord }}</view>
          <view class="frs">
            <text class="t1 oe" v-show="isParmShow">{{ parameter1 }}</text>
            <text class="t1 oe" v-show="!isParmShow">{{ parameter2.toString() }}</text>
            <text class="t2 iconfont icon-youjiantou"></text>
          </view>
        </view>
        <!-- 单条 -->
        <view class="everybox everybox1">
          <view class="fls">
            <text class="t1">低风险</text>
            <text class="t2">建议注册</text>
          </view>
          <view class="frs">
            <text class="text" v-show="!isNoData1" v-for="(item, index) in lowArr" :key="index">{{ item.cgNum }}</text>
            <text class="nodata" v-show="isNoData1">暂无数据</text>
          </view>
        </view>
        <!-- 单条 -->
        <view class="everybox everybox2">
          <view class="fls">
            <text class="t1">中风险</text>
            <text class="t2">可尝试注册</text>
          </view>
          <view class="frs">
            <text class="text" v-show="!isNoData2" v-for="(item, index) in middleArr" :key="index">{{ item.cgNum }}</text>
            <text class="nodata" v-show="isNoData2">暂无数据</text>
          </view>
        </view>
        <!-- 单条 -->
        <view class="everybox everybox3">
          <view class="fls">
            <text class="t1">高风险</text>
            <text class="t2">不建议注册</text>
          </view>
          <view class="frs">
            <text class="text" v-show="!isNoData3" v-for="(item, index) in highArr" :key="index">{{ item.cgNum }}</text>
            <text class="nodata" v-show="isNoData3">暂无数据</text>
          </view>
        </view>
      </view>
    </view>
    <!-- 三个风险的很多小数字的盒子 结束 -->

    <!-- 建议注册类别 开始 -->
    <view class="regCategory regCategoryA" v-show="!isNoData1">
      <view class="banxin690 regCategory2">
        <view class="topbox">
          <text class="t1">建议注册类别（{{ lowArr.length }}）</text>
          <text class="t2">低风险</text>
        </view>
        <view class="containbox">
          <view class="t3box">
            <view class="itembox" v-for="(item, index) in lowArr" :key="index">
              <view class="t1box">
                <view class="fls oe">{{ doubleNum(item.cgNum) }} {{ item.cgName }}</view>
              </view>
              <view class="onlytext">
                <text>{{ item.likeBrandNum }}</text>
                个相同商标，
                <text>{{ item.sameBrandNum }}</text>
                个近似商标
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 建议注册类别 结束 -->

    <!-- 建议注册类别(第二份) 开始 -->
    <view class="regCategory regCategoryB" v-show="!isNoData2">
      <view class="banxin690 regCategory2">
        <view class="topbox">
          <text class="t1">可尝试注册（{{ middleArr.length }}）</text>
          <text class="t2">中风险</text>
        </view>
        <view class="containbox">
          <view class="t3box">
            <view class="itembox" v-for="(item, index) in middleArr" :key="index">
              <view class="t1box">
                <view class="fls oe">{{ doubleNum(item.cgNum) }} {{ item.cgName }}</view>
              </view>
              <view class="onlytext">
                <text>{{ item.likeBrandNum }}</text>
                个相同商标，
                <text>{{ item.sameBrandNum }}</text>
                个近似商标
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 建议注册类别(第二份) 结束 -->

    <!-- 建议注册类别(第三份) 开始 -->
    <view class="regCategory regCategoryC" v-show="!isNoData3">
      <view class="banxin690 regCategory2">
        <view class="topbox">
          <text class="t1">不建议注册类别（{{ highArr.length }}）</text>
          <text class="t2">高风险</text>
        </view>
        <view class="containbox">
          <view class="t3box">
            <view class="itembox" v-for="(item, index) in highArr" :key="index">
              <view class="t1box">
                <view class="fls oe">{{ doubleNum(item.cgNum) }} {{ item.cgName }}</view>
              </view>
              <view class="onlytext">
                <text>{{ item.likeBrandNum }}</text>
                个相同商标，
                <text>{{ item.sameBrandNum }}</text>
                个近似商标
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 建议注册类别(第三份) 结束 -->

    <!-- 近似商标状态统计的echarts图表 开始 -->
    <view class="echartsTest">
      <view class="banxin690 echartsTest2" :class="isLoginMask === true ? 'hideMe' : ''">
        <text class="goToBtn" @click="toLogin">请登录后查看</text>
        <view class="titbox">近似商标状态统计</view>
        <view class="contbox"><qiun-data-charts type="bar" :chartData="statusChartData" /></view>
      </view>
    </view>
    <!-- 近似商标状态统计的echarts图表 结束 -->

    <!-- 近似商标状态统计的echarts图表 开始 -->
    <view class="echartsTest">
      <view class="banxin690 echartsTest2" :class="isLoginMask === true ? 'hideMe' : ''">
        <text class="goToBtn" @click="toLogin">请登录后查看</text>
        <view class="titbox">近似商标热门类别TOP5</view>
        <view class="contbox"><qiun-data-charts type="pie" :chartData="typeChartData" /></view>
      </view>
    </view>
    <!-- 近似商标状态统计的echarts图表 结束 -->
  </view>
</template>

<script>
import { jsonCategory } from '../../util/jsonCategory.js';
import { jsonIndustry } from '../../util/jsonIndustry.js';
import { mapState, mapMutations } from 'vuex';
import { request } from '../../util/request.js';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      baseimg: this.baseimg, //全局定义图片路径
      baseapi: this.baseapi, //全局定义接口路径
      isLoginMask: false, //没有登录前的Echarts遮罩
      isMask: true, //是否显示当前遮罩
      parameter1: '', //第一个参数
      parameter2: [], //第二个参数
      isShowCont: false, //显示选择行业还是选择类别
      accordionIndex: -1, //仅仅手风琴效果，-1就是默认都不展开
      industryIndex: -1, //用于二级菜单选中
      accordionArr: jsonIndustry.data, //手风琴的数据
      tabIndex: 0, //tab切换
      tabHeadList: ['选择行业(单选)', '选择类别(多选)'], //tab切换
      moreSelectIndex: 0, //选择类别的索引
      // categoryList: jsonCategory.data, // 商标类别数组
      // 因为支付宝小程序不能读取外部json，只能在return中声明json
      categoryList: [
        {
          id: '0',
          tradeName: '全部类别',
          firstNum: '0',
          sorts: 0,
          whether: null,
          ison: false
        },
        {
          img: 'category1.png',
          id: '568178368464121856',
          tradeName: '01-化学制剂',
          firstNum: '1',
          sorts: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category2.png',
          id: '568178380359168000',
          tradeName: '02-颜料油漆',
          firstNum: '2',
          sorts: 2,
          whether: null,
          ison: false
        },
        {
          img: 'category3.png',
          id: '568178380396916736',
          tradeName: '03-日化用品',
          firstNum: '3',
          sorts: 3,
          whether: null,
          ison: false
        },
        {
          img: 'category4.png',
          id: '568178380426276864',
          tradeName: '04-燃料油脂',
          firstNum: '4',
          sorts: 4,
          whether: null,
          ison: false
        },
        {
          img: 'category5.png',
          id: '568178380480802816',
          tradeName: '05-医药制造',
          firstNum: '5',
          sorts: 5,
          whether: null,
          ison: false
        },
        {
          img: 'category6.png',
          id: '568178380514357248',
          tradeName: '06-金属材料',
          firstNum: '6',
          sorts: 6,
          whether: null,
          ison: false
        },
        {
          img: 'category7.png',
          id: '568178380560494592',
          tradeName: '07-机械设备',
          firstNum: '7',
          sorts: 7,
          whether: null,
          ison: false
        },
        {
          img: 'category8.png',
          id: '568178380589854720',
          tradeName: '08-手工器械',
          firstNum: '8',
          sorts: 8,
          whether: null,
          ison: false
        },
        {
          img: 'category9.png',
          id: '568178380648574976',
          tradeName: '09-科学仪器',
          firstNum: '9',
          sorts: 9,
          whether: null,
          ison: false
        },
        {
          img: 'category10.png',
          id: '568178380673740800',
          tradeName: '10-医疗器械',
          firstNum: '10',
          sorts: 10,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category11.png',
          id: '568178380711489536',
          tradeName: '11-灯具空调',
          firstNum: '11',
          sorts: 11,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category12.png',
          id: '568178380774404096',
          tradeName: '12-运输工具',
          firstNum: '12',
          sorts: 12,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category13.png',
          id: '568178380833124352',
          tradeName: '13-军火烟火',
          firstNum: '13',
          sorts: 13,
          whether: null,
          ison: false
        },
        {
          img: 'category14.png',
          id: '568178380875067392',
          tradeName: '14-珠宝钟表',
          firstNum: '14',
          sorts: 14,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category15.png',
          id: '568178380933787648',
          tradeName: '15-音乐乐器',
          firstNum: '15',
          sorts: 15,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category16.png',
          id: '568178380984119296',
          tradeName: '16-办公用品',
          firstNum: '16',
          sorts: 16,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category17.png',
          id: '568178381034450944',
          tradeName: '17-橡胶制品',
          firstNum: '17',
          sorts: 17,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category18.png',
          id: '568178381088976896',
          tradeName: '18-皮革皮具',
          firstNum: '18',
          sorts: 18,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category19.png',
          id: '568178381114142720',
          tradeName: ' 19-建筑材料',
          firstNum: '19',
          sorts: 19,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category20.png',
          id: '568178381151891456',
          tradeName: '20-家庭家具',
          firstNum: '20',
          sorts: 20,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category21.png',
          id: '568178381185445888',
          tradeName: '21-厨房洁具',
          firstNum: '21',
          sorts: 21,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category22.png',
          id: '568178381223194624',
          tradeName: ' 22-绳网袋蓬',
          firstNum: '22',
          sorts: 22,
          whether: null,
          ison: false
        },
        {
          img: 'category23.png',
          id: '568178381248360448',
          tradeName: '23-纱线棉丝',
          firstNum: '23',
          sorts: 23,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category24.png',
          id: '568178381328052224',
          tradeName: '24-布料床单',
          firstNum: '24',
          sorts: 24,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category25.png',
          id: '568178381365800960',
          tradeName: '25-服装鞋帽',
          firstNum: '25',
          sorts: 25,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category26.png',
          id: '568178381411938304',
          tradeName: '26-纽扣拉链',
          firstNum: '26',
          sorts: 26,
          whether: null,
          ison: false
        },
        {
          img: 'category27.png',
          id: '568178381445492736',
          tradeName: '27-地毯席垫',
          firstNum: '27',
          sorts: 27,
          whether: null,
          ison: false
        },
        {
          img: 'category28.png',
          id: '568178381483241472',
          tradeName: '28-健身器材',
          firstNum: '28',
          sorts: 28,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category29.png',
          id: '568178381520990208',
          tradeName: '29-健康食品',
          firstNum: '29',
          sorts: 29,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category30.png',
          id: '568178381575516160',
          tradeName: '30-方便食品',
          firstNum: '30',
          sorts: 30,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category31.png',
          id: '568178381617459200',
          tradeName: ' 31-饲料种籽',
          firstNum: '31',
          sorts: 31,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category32.png',
          id: '568178381659402240',
          tradeName: '32-啤酒饮料',
          firstNum: '32',
          sorts: 32,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category33.png',
          id: '568178381692956672',
          tradeName: '33-酒精制造',
          firstNum: '33',
          sorts: 33,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category34.png',
          id: '568178381734899712',
          tradeName: '34-烟草烟具',
          firstNum: '34',
          sorts: 34,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category35.png',
          id: '568178381781037056',
          tradeName: '35-广告销售',
          firstNum: '35',
          sorts: 35,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category36.png',
          id: '568178381806202880',
          tradeName: ' 36-金融物管',
          firstNum: '36',
          sorts: 36,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category37.png',
          id: '568178381852340224',
          tradeName: '37-建筑修理',
          firstNum: '37',
          sorts: 37,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category38.png',
          id: '568178381881700352',
          tradeName: '38-通讯服务',
          firstNum: '38',
          sorts: 38,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category39.png',
          id: '568178381932032000',
          tradeName: '39-运输贮藏',
          firstNum: '39',
          sorts: 39,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category40.png',
          id: '568178381957197824',
          tradeName: '40-材料加工',
          firstNum: '40',
          sorts: 40,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category41.png',
          id: '568178381982363648',
          tradeName: '41-教育娱乐',
          firstNum: '41',
          sorts: 41,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category42.png',
          id: '568178382020112384',
          tradeName: '42-网站服务',
          firstNum: '42',
          sorts: 42,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category43.png',
          id: '568178382057861120',
          tradeName: '43-餐饮住宿',
          firstNum: '43',
          sorts: 43,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category44.png',
          id: '568178382099804160',
          tradeName: '44-医疗园艺',
          firstNum: '44',
          sorts: 44,
          whetherReleve: 1,
          whether: null,
          ison: false
        },
        {
          img: 'category45.png',
          id: '568178382124969984',
          tradeName: '45-社会服务',
          firstNum: '45',
          sorts: 45,
          whetherReleve: 1,
          whether: null,
          ison: false
        }
      ],

      isParmShow: true, //哪个参数传的就在页面上显示哪个
      tempJson: {},
      // 用于临时传参的json
      ajaxJson: {
        appKey: 'quandashi1866628177',
        signMethod: 'md5',
        v: '1.0',
        timestamp: 1626832058338,
        itemType: '0',
        method: 'searchReport',
        tradeId: '4006',
        bizName: '',
        searchType: '',
        cgNum: ''
      },
      theKeyWord: '', //从上个页面传递过来的关键字
      isNoData1: false,
      isNoData2: false,
      isNoData3: false,
      lowArr: [], //低风险
      middleArr: [], //中风险
      highArr: [], //高风险
      // 商标状态数据
      statusChartData: {
        categories: ['已无效', '答辩中', '被驳回', '公告中', '已注册'],
        series: [
          {
            type: 'bar',
            name: '状态总量',
            data: [
              {
                value: 35,
                color: '#5882D4'
              },
              {
                value: 75,
                color: '#F68B4C'
              },
              {
                value: 15,
                color: '#F4482C'
              },
              {
                value: 95,
                color: '#F9E755'
              },
              {
                value: 65,
                color: '#47D28F'
              }
            ]
          }
        ]
      },
      // 饼图数据
      typeChartData: {
        series: [
          {
            data: [
              {
                name: '一类广告消费',
                value: 50
              },
              {
                name: '二类金融文化',
                value: 30
              },
              {
                name: '三类IT服务',
                value: 20
              },
              {
                name: '四类知识产权',
                value: 18
              },
              {
                name: '五类餐饮饮食',
                value: 8
              }
            ]
          }
        ]
      },
      isShowMask2: false, //打开验证码弹窗组件
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  onLoad(options) {
    // 没有登录前的Echarts遮罩
    if (this.phone) {
      this.isLoginMask = true;
    } else {
      this.isLoginMask = false;
    }
    // 清除“选择类别的”选中聚焦效果
    this.categoryList.forEach(item => {
      item.ison = false;
    });
    // 因为这里的“选择行业”是单选，所以暂时不需要以下代码(如果多选就需要)
    // 改变原数组，让“选择行业”的新数组可以做选中效果
    // this.accordionArr.forEach((item, index) => {
    //   let arr = item.children.map((items, indexs) => {
    //     return {
    //       text: items,
    //       ison: false
    //     };
    //   });
    //   item.children = arr;
    // });

    // 页面传参
    console.log('页面传值-报告', options);
    this.theKeyWord = options.mykeyword; //从上个页面传递过来的关键字
    this.ajaxJson['bizName'] = this.theKeyWord; //从上个页面传递过来的关键字
  },
  computed: {
    ...mapState(['phone', 'hotLine', 'hotLine2'])
  },
  methods: {
    // vuex东东
    ...mapMutations(['getPhone', 'clearPhone']),
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
      this.isLoginMask = true; //没有登录前的Echarts遮罩
    },
    // 接口请求
    getReportAjax() {
      uni.showLoading({
        title: '加载中....'
      });
      uni.request({
        url: this.baseapi + '/sbc.esp?tm_searchReport',
        method: 'POST',
        data: this.ajaxJson,
        header: {
          'content-type': 'application/json'
        },
        success: res => {
          // console.log(res.data);

          if (JSON.stringify(res.data.data) === '{}') {
            // 接口没数据
            uni.hideLoading();
            this.$layer('查询失败,请稍后重试', 'none', 1200);
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1200);
            this.isMask = true;
            return false;
          } else if (res.data.status == 500) {
            // 接口崩了
            uni.hideLoading();
            this.$layer('查询失败,请稍后重试', 'none', 1200);
            setTimeout(() => {
              uni.navigateBack({
                delta: 1
              });
            }, 1200);
            this.isMask = true;
            return false;
          } else {
            // 查询成功
            uni.hideLoading();
            // console.log('查询成功res', res.data.data);
            this.isMask = false;
            this.tempJson = res.data.data;
            // 后端返回的三个风险分别放进三个数组
            this.highArr = res.data.data.highRiskList; //高风险
            this.middleArr = res.data.data.mediumRiskList; //中风险
            this.lowArr = res.data.data.lowRiskList; //低风险
            // 如果返回的三个数组中，没有数据，就判断一下
            if (this.lowArr.length == 0) {
              this.isNoData1 = true;
            }
            if (this.middleArr.length == 0) {
              this.isNoData2 = true;
            }
            if (this.highArr.length == 0) {
              this.isNoData3 = true;
            }
          }
        },
        fail: () => {},
        complete: () => {}
      });
    },
    //tab切换
    tabChange(index) {
      this.tabIndex = index;
      if (index == 0) {
        this.isShowCont = false;
      } else if (index == 1) {
        this.isShowCont = true;
      }
    },
    toLogin() {
      // #ifdef H5
      uni.showToast({
        title: 'H5端不支持登录',
        duration: 500,
        icon: 'none',
        position: 'top' //position仅仅App生效
      });
      // #endif

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
            that.isLoginMask = true; // ------------此页面单独写的东东
          });
        }
      });
      // #endif
    },
    // 选择行业，仅仅手风琴效果，同时借助accordionIndex让点击两次可以收回来
    onlyAccordion(index) {
      // this.accordionIndex = index;
      if (this.accordionIndex == index) {
        this.accordionIndex = -1;
      } else {
        this.accordionIndex = index;
      }
    },
    // 选择行业，获取单个选中的值
    selectSingle(items, indexs) {
      // 1.选中的值存到参数里面去
      this.parameter1 = items;
      // 2.用于选中与不选中的选中效果，暂时用css的hover替换js的选中效果
      this.industryIndex = indexs;
    },
    // 选择类别，单个多选
    selectMore(index, item) {
      // 1.用于数组的增加和删除
      if (this.parameter2.indexOf(index) == -1) {
        this.parameter2.push(index); // 没找到就新增
      } else {
        this.parameter2.splice(this.parameter2.indexOf(index), 1); // 找到了就删除
      }
      this.categoryList[index].ison = !this.categoryList[index].ison; //取反
      // console.log(this.categoryList);
      console.log(item.ison);
      // 2.用于选中与不选中的选中效果
      // if (item.ison == false) {
      //   item.ison = true;
      // } else {
      //   item.ison = false;
      // }
    },
    // 选择行业，确定事件
    confirmMore1() {
      console.log('第1个参数', this.parameter1);
      this.ajaxJson['searchType'] = '0'; //行业的时候，必须把searchType改为0
      this.ajaxJson['bizName'] = this.theKeyWord; //从上个页面传递过来的关键字
      this.ajaxJson['tradeName'] = this.parameter1; //行业的参数
      this.isParmShow = true; //在页面上显示行业的参数
      this.getReportAjax();
    },
    // 选择类别，确定事件
    confirmMore2() {
      console.log('第2个参数', JSON.parse(JSON.stringify(this.parameter2)).toString());
      let parameter2Var = JSON.parse(JSON.stringify(this.parameter2)).toString();
      this.ajaxJson['searchType'] = '1'; //类别的时候，必须把searchType改为1
      this.ajaxJson['bizName'] = this.theKeyWord; //从上个页面传递过来的关键字
      this.ajaxJson['cgNum'] = parameter2Var; //类别的参数
      this.isParmShow = false; //在页面上显示类别的参数
      this.getReportAjax();
    },
    // 打开遮罩
    openMask() {
      this.isMask = true;
      console.log(this.parameter1);
      console.log(this.parameter2);
    }
  }
};
</script>

<style lang="scss">
@import '@/static/css/trademarkQueryReport.scss';
// 黄老师新增页面样式用于弹窗选择
@import '@/static/css/trademarkQueryReport2.scss';
</style>
