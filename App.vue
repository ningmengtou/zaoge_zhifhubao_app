<script>
import { mapMutations } from 'vuex';
// #ifdef APP-PLUS
const jv = uni.requireNativePlugin('JG-JVerification');
// #endif
export default {
  data() {
    return {
      // #ifdef APP-PLUS
      jv: jv
      // #endif
    };
  },
  methods: {
    ...mapMutations(['getPhone', 'clearPhone'])
  },
  onLaunch: function() {
    // const interpreter = new Interpreter(window, {
    //   timeout: 1000
    // });
    // let result;
    // try {
    //   result = interpreter.evaluate('1+1');
    //   console.log(result);
    //   interpreter.evaluate('var a=100');
    //   interpreter.evaluate('var b=200');
    //   result = interpreter.evaluate('a+b');
    //   console.log(result);
    // } catch (e) {
    //   console.log(e);
    // }

    // ---------------------解决uniapp第二次启动非常慢的代码-------------------------
    // #ifdef APP-PLUS
    switch (uni.getSystemInfoSync().platform) {
      case 'android':
        plus.navigator.closeSplashscreen(); //console.log('运行Android上')
        break;
      case 'ios':
        plus.navigator.closeSplashscreen(); //console.log('运行iOS上')
        break;
      default:
        break; //console.log('运行在开发者工具上')
    }
    // #endif
    // ---------------------电话号码问题 开始-------------------------
    var storageTelPhone = uni.getStorageSync('telPhone');
    if (storageTelPhone) {
      this.getPhone(storageTelPhone);
    }
    // ---------------------电话号码问题 结束-------------------------
	
	
	// #ifdef APP-PLUS
	//设置2.4秒后主动关闭，最多设置6秒
	setTimeout(() => {
		plus.navigator.closeSplashscreen();
	}, 2500);
	// #endif

  },
  onShow: function() {
    // ---------------------极光一键登录 开始------------------------------
    // #ifdef APP-PLUS
    this.jv.setDebugMode(true);
    this.jv.init(
      {
        timeout: 7000,
        isProduction: false
      },
      result => {
        let code = result.code;
        let desc = result.content;
      }
    );
    this.jv.isInitSuccess(result => {
      let isSucc = result.enable;
    });
    this.jv.getToken(5000, result => {});
    this.jv.preLogin(5000, result => {});
    this.jv.dismissLoginAuth(false, res => {});
    // #endif
    // ---------------------极光一键登录 结束------------------------------
  },
  onHide: function() {}
};
</script>

<style lang="scss">
// 这是之前项目的
// @import url('https://at.alicdn.com/t/font_2664791_jr4vrs4sbc.css');
@import './static/css/iconfont.css';
// 这是“zaoGeNew”项目的
// @import url('https://at.alicdn.com/t/font_2930050_orsueihhaj.css');
@import './static/css/iconfont2.css';
// 公共类
@import './static/css/comm.scss';
/* #ifdef H5 */
// 隐藏H5的头部导航条(默认H5是44px)
uni-page-head {
  display: none;
}
/* #endif */
</style>
