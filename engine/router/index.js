// 路由
import {
	RouterMount,
	createRouter
} from 'uni-simple-router';
import store from '@/engine/store'
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerErrorEach: ({
		type,
		msg
	}) => {
		switch (type) {
			case 3: // APP退出应用
				// #ifdef APP-PLUS
				router.$lockStatus = false;
				uni.showModal({
					title: '提示',
					content: '您确定要退出应用吗？',
					success: function(res) {
						if (res.confirm) {
							plus.runtime.quit();
						}
					}
				});
				// #endif
				break;
			case 2:
				router.$lockStatus = false;
				break;
			default:
				break;
		}

	},
	// 通配符，非定义页面，跳转404
	routes: [...ROUTES,
		{
			path: '*',
			redirect: (to) => {
				return {
					name: '404'
				}
			}
		},
	]
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
	// console.log(to.query)
	// 权限控制登录
	if (!uni.getStorageSync('token') && to.meta &&  to.meta.auth) {
		// if(to.path !== '/pages/public/login'){
		// 	return next({
		// 		path: '/pages/public/login',
		// 		NAVTYPE: 'replaceAll'
		// 	})
		// }
		// next()
		store.commit('IS_LOGIN', true);
		next(false)
	} else {
		if(to.meta.qu!=undefined){
			let fromqu=to.meta.qu.split(',');
			console.log(fromqu)
			
			let canshu='';
			fromqu.forEach(function(item, index) {
				if(index>0){
					canshu+="&"+item+"="+to.query[item]
				}
				else{
					canshu+=item+"="+to.query[item]
				}
			})
			var url="https://pc.defam.info/#" + to.meta.pcUrl+"?"+canshu+to.meta.c;  //测试站
			// var url="https://pc.defam.info/#" + to.meta.pcUrl+"?"+canshu+to.meta.c; //国内正式
			// var url="https://pc.defam.io/#" + to.meta.pcUrl+"?"+canshu+to.meta.c; //国外正式
			// console.log(url)
		}else{
			var url="https://pc.defam.info/#" + to.meta.pcUrl;  //测试站
			// var url="https://pc.defam.info/#" + to.meta.pcUrl;  //国内正式
			// var url="https://pc.defam.io/#" + to.meta.pcUrl;  //国外正式
			// console.log(url)
		}
		// #ifdef H5 
		const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
		if (flag) {
		 // alert('移动端打开')
		} else {
			// alert('PC端打开')
			window.open(url,"_self")  //测试
		}
		// #endif
		next()
	}
	// next()
});

export {
	router,
	RouterMount
}
