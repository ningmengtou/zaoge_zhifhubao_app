import {
  mapMutations,
  mapState
} from 'vuex';
export default {
  data() {
    return {
      baseimg: this.baseimg,
      baseimg1: this.baseimg1,
      baseimg2: this.baseimg2,
      baseapi: this.baseapi,
      baseapi2: this.baseapi2,
      baseapi3: this.baseapi3,
      baseapi4: this.baseapi4,
      loginOKTips: this.loginOKTips,
      isLoginBar: true, //底部的登录享不限查询次数的条是否显示，false不显示，true显示
      isshowauth2: true, //登录享不限查询次数
      titleHeight: 0, //状态栏和导航栏的总高度
      statusBarHeight: 0, //状态栏高度
      naviBarHeight: 0, //导航栏高度
    }
  },
  computed: {
    ...mapState(['phone', 'mobileDevice'])
  },
  methods: {
    ...mapMutations(['clearTransKey']),
  },
  onShow() {
    // #ifdef APP-PLUS
    let page = this.$mp.page.route
    let options = this.$mp.page.options
    let tel = this.phone
    let params = this.mobileDevice
    if (page == 'pages/guide/judge' || page == 'pages/guide/guide') {
      return false;
    }
    uni.getSystemInfo({
      success: function(res) {
        let obj = {
          'a_version': plus.runtime.version,
          'a_url': page,
          'res_brand': res.brand,
          'res_model': res.model,
          'res_language': res.language,
          'res_system': res.system,
          'res_version': res.version,
          'res_platform': res.platform,
          'res_SDKVersion': res.SDKVersion,
          'res_deviceId': res.deviceId,
          'plus_device_imei': plus.device.imei,
          'plus_device_imsi': plus.device.imsi,
          'plus_device_model': plus.device.model,
          'plus_device_vendor': plus.device.vendor,
          'plus_device_uuid': plus.device.uuid,
        }
        Object.assign(obj, params)
        if (tel) {
          Object.assign(obj, {
            'a_tel': tel
          })
        }

        uni.request({
          method: 'POST',
          url: 'https://www.zaoge.com/miniapi.esp?appstats',
          data: obj,
          success: res => {
            // console.log(res)
          }
        })

      }
    });
    // #endif
  },
  onHide() {
    this.clearTransKey()
  }
}
