import Vue from 'vue';
import App from './App';
// 挂载变量
import {
	API_URL,
	IMG_URL
} from './env.js';
Vue.prototype.$API_URL = API_URL;
Vue.prototype.$IMG_URL = IMG_URL;
import '@/engine/utils/plugin'

// uni方法重写, h5的粘贴板的设置，获取。图片视频的保存
import '@/engine/utils/sdk-h5.js'

// 引入路由
import {
	router,
	RouterMount
} from '@/engine/router';
Vue.use(router);

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 公共数据
Vue.prototype.$captchaId = '2031629192'

// 挂载请求
import http from '@/engine/request';
Vue.prototype.$http = http;

// 平台判断
import platform from '@/engine/platform';
Vue.prototype.$platform = platform;
Vue.prototype.$isInWechat = platform.get() == 'wxOfficialAccount'
Vue.prototype.$isInApp = platform.get() == 'App'

// 挂载store状态管理
import store from '@/engine/store';
Vue.prototype.$store = store;

// 挂载工具函数
import tools from '@/engine/utils/tools'
Vue.prototype.$tools = tools;


//全局引入未登录弹框
import LoginModal from '@/components/common/is_login.vue';
Vue.component('login-modal', LoginModal);

// mixin混入
import mixin from '@/engine/mixins';
import mixinShare from '@/engine/mixins/share';
Vue.mixin(mixin);
Vue.mixin(mixinShare);

// 返回上一页执行的方法
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
//路由带参跳转
const jump = (url,item,type='push') => {
	//过滤掉数据为null的字段
	if (item) {
		item = Object.keys(item).filter((key) => item[key] !== null && item[key] !== undefined)
			.reduce((acc, key) => ({
				...acc,
				[key]: item[key]
			}), {});
	};
	if (type == 'push') {
		router.push({
			path: url,
			query: item
		})
	} else{
		router.replace({
			path: url,
			query: item
		})
	}
	
}
Vue.prototype.$jump = jump;
Vue.prototype.$prePage = prePage;

//引入picker
import LbPicker from '@/components/lb-picker'
Vue.component("lb-picker", LbPicker)

// Vue.prototype._i18n = i18n

App.mpType = 'app';

const app = new Vue({
	store,
	...App
});

// #ifdef H5
// 微信H5,sdk挂载
import wxsdk from '@/engine/wechat/sdk'
Vue.prototype.$wxsdk = wxsdk;
RouterMount(app, router, '#app')





// #endif

// #ifndef H5
// 为了兼容小程序及app端必须这样写才有效果
app.$mount();
// #endif
