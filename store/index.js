import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 电话号码
    phone: '',
	// 每次打包前需要修改 a_channel 参数
	mobileDevice: {
	  'a_app': 'com.zaoge.TmAndroid',
	  'a_type': 0,
	  'a_channel': 'VIVO'
	},
    // 商标库到首页的参数
    index2keyWords: '',
    // 客服热线
    hotLine: '4009029915',
    // 客服热线带横线的
    hotLine2: '4009029915',
    // 首页中查询tab的index
    tabIndex: 0,
    // 搜索次数
    searchTraNumber: 1,

    logoutCount: 1, // 注销服务次数，点击了一次就提示已经点击过了
	transKey:'',
	// 红包展示
	baoShow:false,
	// 整体红包是否展示
	isBaoBox:false,
	
	showauth:true,
	LoginBar:true,
  },
  mutations: {
    getPhone(state, telphone) {
      state.phone = telphone.length === 11 ? telphone : ''
    },
    clearPhone(state) {
      state.phone = ''
    },
    // 删除商标库到首页的参数
    clearkeyWords(state) {
      state.index2keyWords = '无'
    },
    // 赋值商标库到首页的参数
    getkeyWords(state, keyWords) {
      state.index2keyWords = keyWords
    },
    // 商标库到首页的参数为空
    getkeyWordsNull(state) {
      state.index2keyWords = ''
    },
    // 更改首页中查询tab的index
    changeTabIndex(state, index) {
      state.tabIndex = index
    },
    // 更改查商标次数
    changeSearchNumber(state) {
      state.searchTraNumber += 1
    },
    // 注销服务次数，点击了一次就提示已经点击过了
    logoutClick(state) {
      state.logoutCount += 1;
    },
	changeTransKey(state,str) {
		state.transKey = str
	},
	clearTransKey(state) {
		state.transKey = ''
	},
	baoShowTrue(state) {
		state.baoShow = true
	},
	baoShowFalse(state) {
		state.baoShow = false
	},
	isBaoBoxTrue(state) {
		state.isBaoBox = true
	},
	isBaoBoxFalse(state) {
		state.isBaoBox = false
	},
	changeshowauth(state,val) {
		state.showauth = val
	},
	changeLoginBar(state,val) {
		state.LoginBar = val
	},
  },
  actions: {},
})

export default store
