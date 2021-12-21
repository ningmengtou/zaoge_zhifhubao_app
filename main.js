import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import mixin from './mixin.js'
import plugins from './plugins'
// 头部的搜索盒子
import searchs from './components/searchs'
// 头部的左侧返回，中间标题，右边文字
import headers from './components/headers'
// 选择你要联系的客服的弹窗组件
import contact from './components/contact'
// 需求信息的弹窗组件
import layerneed from './components/layerneed'
// 如果没有数据时
import nodata from './components/nodata'
// 输入手机号获取验证码的弹窗
import codelogin from './components/codelogin'
// 授权页面
import authorize from './components/authorize'
// tab切换仅仅头部
import tabswitch from './components/tabswitch'
// 顾问列表
import adviserlist from './components/adviserlist'
// 首页的红包
import hongbao from './components/hongbao'
// 固定在页面右侧的客服组件
import kefu from './components/kefu'
// 登录享不限查询次数
import freelogin from './components/freelogin'
// uniapp的第三方uniapp插件市场的进度条插件
import uniicons from './components/uniicons/uniicons'
import unisection from './components/unisection/unisection'
import unisteps from './components/unisteps/unisteps'


App.mpType = 'app'

Vue.mixin(mixin)
Vue.use(plugins)


const app = new Vue({
  ...App,
  store
})
app.$mount()


Vue.component('searchs', searchs)
Vue.component('headers', headers)
Vue.component('contact', contact)
Vue.component('layerneed', layerneed)
Vue.component('nodata', nodata)
Vue.component('codelogin', codelogin)
Vue.component('authorize', authorize)
Vue.component('tabswitch', tabswitch)
Vue.component('adviserlist', adviserlist)
Vue.component('hongbao', hongbao)
Vue.component('kefu', kefu)
Vue.component('freelogin', freelogin)

// uniapp的第三方uniapp插件市场的进度条插件
Vue.component('uniicons', uniicons)
Vue.component('unisection', unisection)
Vue.component('unisteps', unisteps)
