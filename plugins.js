import jsencrypt from "./util/jsencrypt.js";

import {
  request
} from './util/request.js';

export default {
  install(Vue) {

    // 这里修改隐私框是否默认勾选  华为 OPPO 为false 其他为true
    Vue.prototype.setPrivacyState = true

    // 每次打包前修改这里的渠道信息
    Vue.prototype.msgCode1 = function() {
      return "VIVO_早鸽商标查询_商标_短信"
    }

    Vue.prototype.msgCode2 = function() {
      return "VIVO_早鸽商标查询_商标_短信_true"
    }

    Vue.prototype.shouquan = function() {
      return "VIVO_早鸽商标查询_商标_授权"
    }

    // 给Vue添加变量或者方法
    Vue.prototype.$jsencrypt = jsencrypt
    Vue.prototype.loginOKTips = "请保持手机畅通,我们会尽快联系您！"
    Vue.prototype.baseimg = 'https://public.yuzhua.com/zaoge/xcx_tmimg/'
    Vue.prototype.baseimg1 = '../../static/images/'
    Vue.prototype.baseimg2 = '../../static/images/'
    Vue.prototype.baseapi = 'https://www.zaoge.com'
    Vue.prototype.baseapi2 = 'https://api-seo.sudoyu.com'
    Vue.prototype.baseapi3 = 'https://yx.yuzhua.com/eapi.esp?'
    Vue.prototype.baseapi4 = 'https://api-auto-delivery.sudoyu.com'


    // 判读传入的数据为空
    // 调用方法：isblank(xxx)
    Vue.prototype.isblank = function(chr) {
      if (Object.prototype.toString.call(chr) === '[object Object]') {
        chr = Object.keys(chr);
      };
      if (chr == null || chr == '' || chr == undefined || chr == 'undefined' || chr == 'null' || chr.length ==
        0) {
        return true;
      };
      var chr = chr.toString();
      var chr = chr.replace(/(^\s*)|\s*$/g, '');
      if (chr == null || chr == '' || chr == undefined || chr == 'undefined' || chr == 'null' || chr.length ==
        0) {
        return true;
      };
      return false;
    }

    // 插件名称：弹窗
    // 官方地址：https://uniapp.dcloud.io/api/ui/prompt?id=showtoast
    Vue.prototype.$layer = function(titles = "操作成功", icons = "none", durations = 800) {
      uni.showToast({
        title: titles,
        icon: icons,
        duration: durations,
        mask: false, //是否可以穿透，false可以穿透，true不能穿透
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      });
    }

    // 插件名称：随机数，取数字min到数字max之间的数字，也包括两端
    // 调用方法：{{ $randomNum(1, 3) }}
    Vue.prototype.$randomNum = function(mins, maxs) {
      var rangs = maxs - mins;
      var rands = Math.random();
      return mins + Math.round(rands * rangs);
    }

    // 插件名称：隐藏手机号码/电话号码的中间四位
    // 调用方法：{{ $hidePhone('15756449652') }}
    // 特别说明：返回的是：157****9652
    Vue.prototype.$hidePhone = function(tel) {
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      return tel.replace(reg, "$1****$2");
    }

    // 插件名称：跳转到页面(page跳转的页面，type跳转方式)
    // 调用方法：@click="gopage('../index/index', 'tabbar')"
    Vue.prototype.gopage = function(page, type) {
      if (this.isblank(type)) {
        uni.navigateTo({
          url: page,
          animationType: 'pop-in',
          animationDuration: 300
        })
      } else if (type == "redirectto") {
        uni.redirectTo({
          url: page
        });
      } else if (type == "relaunch") {
        uni.reLaunch({
          url: page
        });
      } else if (type == "tabbar") {
        uni.switchTab({
          url: page
        });
      }
    }

    // 插件名称：返回上一页，括号里面默认不带参数就是返回上一页，如果带有数字几就是返回几页
    // 调用方法：goback(1)
    Vue.prototype.goback = function(page = 1) {
      uni.navigateBack({
        delta: page
      })
    }

    // 插件名称：判断是H5还是APP的平台，以此来切换不同的class
    // 调用方法： :class="{ isApp: !judgeIsH5(), isH5: judgeIsH5() }"
    Vue.prototype.judgeIsH5 = function() {
      return !!window;
    }

    // 插件名称：禁止弹窗时的页面滚动
    // 调用方法： @touchmove.prevent="stopScroll"
    Vue.prototype.stopScroll = function() {
      return;
    }

    // 插件名称：不足两位补齐两位
    // 调用方法：{{ doubleNum(index + 1) }}
    Vue.prototype.doubleNum = function(str) {
      if (str < 10) {
        return "0" + str;
      } else {
        return str;
      }
    }

    // 插件名称：时间戳转年月日
    // 调用方法：{{timeStamp(14654161131465)}}
    Vue.prototype.timeStamp = function(mills) {
      var luD = new Date(mills * 1000);
      var luYear = luD.getFullYear();
      var luDay = luD.getDate();
      var luMonth = +luD.getMonth() + 1;
      var luHour = luD.getHours();
      var luMinute = luD.getMinutes();
      var luSecond = luD.getSeconds();
      var luTime = luYear + "-" + this.doubleNum(luMonth) + "-" + this.doubleNum(luDay);
      return luTime;
    }

    // 插件名称：金钱为中文单位元、万元、亿元、万亿
    // 特别说明：以下两个分开写，因为要让数字和单位包裹在两个不同的text中
    // 调用方法：{{tenThousand1(10245)}}-----这个只返回数字
    // 调用方法：{{tenThousand2(10245)}}-----这个只返回单位
    Vue.prototype.strNumSize = function(tempNum) {
      var stringNum = tempNum.toString()
      var index = stringNum.indexOf(".")
      var newNum = stringNum;
      if (index != -1) {
        newNum = stringNum.substring(0, index)
      }
      return newNum.length;
    }
    Vue.prototype.tenThousand1 = function(num) {
      var moneyUnits = ["元", "万元", "亿元", "万亿"]
      var dividend = 10000;
      var curentNum = Number(num);
      var curentUnit = moneyUnits[0];
      for (var i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (this.strNumSize(curentNum) < 5) {
          break;
        }
        curentNum = curentNum / dividend
      }
      var m = {
        num: 0,
        unit: ""
      }
      m.num = curentNum.toFixed(2)
      m.unit = curentUnit;
      return m.num;
    }
    Vue.prototype.tenThousand2 = function(num) {
      var moneyUnits = ["元", "万元", "亿元", "万亿"]
      var dividend = 10000;
      var curentNum = Number(num);
      var curentUnit = moneyUnits[0];
      for (var i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (this.strNumSize(curentNum) < 5) {
          break;
        }
        curentNum = curentNum / dividend
      }
      var m = {
        num: 0,
        unit: ""
      }
      m.num = curentNum.toFixed(2)
      m.unit = curentUnit;
      return m.unit;
    }

    // 插件名称：字符串转换为数组
    // 调用方法：strToArr(xxx)
    Vue.prototype.strToArr = function(str) {
      return str.split(/[;|,]/)
    }

    // 插件名称：批量替换，批量删除item文字的逗号
    // 调用方法：delComma(xxx)
    Vue.prototype.delComma = function(str) {
      return str.replace(/,/g, "2")
    }

    // 插件名称：解决https图片在H5端不显示的问题
    Vue.prototype.$getImg = function(_url) {
      if (_url !== undefined) {
        let _u = _url.substring(7);
        return 'https://images.weserv.nl/?url=' + _u;
      }
    }


    // 插件名称：数组去重
    // 调用方法：arrDelRepeat(xxx)
    Vue.prototype.arrDelRepeat = function(arr) {
      return arr.filter(function(item, index, arr) {
        return arr.indexOf(item, 0) === index;
      });
    }

    // 插件名称：表单基本的正则校验
    // 调用方法：{{ $checkType('15756449523', 'phone') }}
    // 特别说明：返回值是false表示错误，返回值是true表示正确
    Vue.prototype.$checkType = function(str, type) {
      switch (type) {
        case 'email': //电子邮箱
          return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone': //电话号码=手机号码
          return /^1[3456789]\d{9}$/.test(str);
        case 'english': //英文字母，不区分大小写
          return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文汉字
          return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower': //英文小写
          return /^[a-z]+$/.test(str);
        case 'upper': //英文大写
          return /^[A-Z]+$/.test(str);
        default:
          return true;
      }
    }

    // 极光授权登录---自定义UI样式
    Vue.prototype.jiguangUI = function() {
      if (uni.getSystemInfoSync().platform == 'ios') {
        return false;
      } else {
        let that = this;
        uni.getSystemInfo({
          success: function(res) {
            let left = (res.screenWidth - 285) / 2
            that.jv.setCustomUIWithConfigAndroid({
              setLogBtnText: '一键登录',
              setLogBtnWidth: 230,
              setLogBtnHeight: 50,
              setLogBtnTextSize: 20,
              setLogBtnTextBold: true,
              setLogBtnBottomOffsetY: 260,
              setNumberSize: 20,
              setNumberTextBold: true,
              setNumberColor: 0xff000000,
              setNavText: '欢迎来到早鸽商标查询',
              setPrivacyTextCenterGravity: true,
              setPrivacyCheckboxInCenter: true,
              setPrivacyCheckboxSize: 20,
              setPrivacyTextSize: 10,
              setAppPrivacyColor: [0xffaaaaaa, 0xff15D3C0],
              setPrivacyUnderlineText: true,
              setPrivacyState: that.setPrivacyState,
              setPrivacyOffsetY: 50,
              setPrivacyOffsetX: left,
              setPrivacyCheckboxHidden: false,
              setPrivacyUnderlineText: true,
              setPrivacyWithBookTitleMark: true
            });
          }
        });
      }
    }


    // 极光授权登录---自定义弹窗UI样式
    Vue.prototype.popupsUI = function() {
      if (uni.getSystemInfoSync().platform == 'ios') {
        return false;
      } else {
        let that = this;
        uni.getSystemInfo({
          success: function(res) {
            let left = (res.screenWidth - 285) / 2
            that.jv.setCustomUIWithConfigAndroid({
              setNavColor: 0xff0086d0,
              setLogBtnText: " 一键登录 ",
              setLogoHidden: true,
              setLogBtnWidth: 270,
              setLogBtnHeight: 40,
              setLogoOffsetY: 20,
              setNumFieldOffsetY: 30,
              setSloganOffsetY: 60,
              setLogBtnOffsetY: 90,
              setLogBtnTextBold: true,
              setPrivacyCheckboxSize: 20,
              setPrivacyTextSize: 10,
              setPrivacyState: that.setPrivacyState,
              setDialogTheme: [res.screenWidth, 240, 0, 0, true],
              setAppPrivacyColor: [0xffaaaaaa, 0xff15D3C0],
              setPrivacyWithBookTitleMark: true,
              setDimAmount: 0.5,
              setPrivacyOffsetX: left,
              setPrivacyOffsetY: 30,
              setPrivacyTextCenterGravity: true,
              privacyNeedClose: true, //弹窗是否需要关闭按钮 
              privacyCloseTheme: [960, 0, 0, 0], //弹窗关闭按钮偏移量 privacyNeedClose为true时，必须设置它的偏移量
            })
          }
        });

      }
    }


    // 极光授权登录---一键认证登录
    Vue.prototype.jgLogin = function(jv, callBack) {
      jv.loginAuth({
          autoFinish: true,
          timeout: 5000
        },
        result => {
          // console.log("----result", result)
          let code = result.code;
          let loginToken = result.content;
          let operator = result.operator;
          // result必须判断---用户数据网络较差
          if (code == 6001) {
            uni.showToast({
              title: '当前数据网络较差,请稍后重试',
              duration: 800,
              icon: 'none'
            });
            return false;
          }
          // result必须判断---用户取消登录
          if (code == 6002) {
            console.log('用户取消登录');
            callBack && callBack(6002);
            return false;
          }
          // result必须判断---请勿重复点击
          if (code == 6004) {
            uni.showToast({
              title: '请勿重复点击',
              duration: 800,
              icon: 'none'
            });
            return false;
          }
          // 用logintoken获取手机号
          uni.request({
            url: 'https://api.verification.jpush.cn/v1/web/loginTokenVerify',
            method: 'POST',
            data: {
              loginToken
            },
            header: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic MTUwOTllMmNkMDViZjI5ZGEzZmI3MWJlOmM0MmQ5MGI3N2MwN2ViZDdjZjFjM2QyNQ=='
            },
            success: async res => {
              console.log("----res", res)
              // res必须判断---必须返回8000才是登录成功的标识
              if (res.data.code !== 8000) {
                console.log('不是8000：', res.data);
                uni.showToast({
                  title: '登录频繁,请稍后再试',
                  duration: 800,
                  icon: 'none'
                });
                return false;
              }
              var decrypt = new this.$jsencrypt(); //创建解密对象实例
              var priKey = `-----BEGIN PRIVATE KEY-----
		          MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAPfp+tWPyQJ3Z6Dk
		          Oh/59vFNjpzn81buxRRBeb8V946jWzWCcslsy8rqbVQABq3/G+ratF8y3dpCP8xL
		          yj7P/ndFxDQ285M5l+4cxb3JvcHHo+0YE9wkEoY7JzLCKmgYu88UvIkfCXsmXjc9
		          laFQ1Tdtwl40EE0GQN27d13ybjKJAgMBAAECgYEAkuuoSp4uuvZ2hIQc6kxiC3ky
		          FkzkClXwl+OBujvTfUXUTO7lBfgjAjtR1WE6lC1GpzU7hduIXMu8MV+NGRJ8s5oa
		          tK3/DDIjM7BILv0ZIefJ26eErfwzzzwLkf/ixB7Q+UaZc3AtQPojL9HoRiG/k74Y
		          0Pj5y9IIOeqrKy4ATJ0CQQD9tbmkNcWMxOk3YsfFp7LmIRomtTOrLPGwuSTwqt3K
		          Lw6bz3oxG8dIcf06Dm4X6ux7Rfe/G2mbO1hcfWCKDpKbAkEA+ibcircKGmA52PMZ
		          GYODcTQFnUg8205zpPsiVze8BXHnolj9pkGx1zzzYXJ2q8wPz+XLe7iGxY2NhnAq
		          oSyfqwJAUXpmBxV5vw6R80aW76Q+sOdalanF0Sha6i1bbqsBFWhtYZ6NGG5aXqq0
		          70spEidREPnUaZxtGvxBEVr2gP/TFwJBAIH1rp5ied06INOVeHTI3oDxhfkwjm1h
		          VLNhxXWKfyRVCQJPOXgmqT4pbEg0L3MRkSVxPUYJl/sKj3xIydzyUgECQQD8cySS
		          n7hUyBO17o8zHUTr7d7Uow5eTZS/mzwiS0SATE2kRb4iujyDQ+UBdmFmZbUkxroq
		          cJ/lsLXQyeHuMQBr
		          -----END PRIVATE KEY-----`;
              decrypt.setPrivateKey(priKey); //设置秘钥
              var uncrypted = decrypt.decrypt(res.data.phone); //uncrypted为手机号
              uni.setStorageSync('telPhone', uncrypted); //把手机号存入到缓存中
              this.$layer("登录成功", "success", 800);
              // 拿到了用户的手机号就调用邹接口存储起来
              let result = await request("/api.php?add_phone", {
                "phone": uncrypted,
                "type": this.shouquan()
              })
              callBack && callBack(uncrypted);
            }
          });
        }, event => {
          console.log(JSON.stringify(event))
        }
      );
    }

  },
}
