import Request from './request'
import store from '@/engine/store/index.js'

export default function api(url, data = {},method='POST') {
	const request = new Request();
	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
		if (uni.getStorageSync('token')) {
			config.header.authorization = 'Bearer ' + uni.getStorageSync('token');
		}
		// #ifdef MP-WEIXIN
		// #endif
		// #ifdef MP-ALIPAY
		// #endif
		return config
	});

	request.interceptor.response((response) => { /* 请求之后拦截器 */
		if (response.data.code === 0 || response.data.code == 10002 || response.data.code == 10001) {
			if (response.data.code === 0) { // 服务端返回的状态码不等于200，则reject()
				uni.showToast({
					title: response.data.msg || '请求出错,稍后重试',
					icon: 'none',
					duration: 2000,
					mask: true
				});
			}
			if (response.data.code == 10002) { // 服务端返回的状态码不等于200，则reject()
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('token');
				uni.reLaunch({
					url:'/pages/public/login'
				})
			}
			if (response.data.code == 10001) { // 服务端返回的状态码不等于200，则reject()
				uni.removeStorageSync('userInfo');
				uni.removeStorageSync('token');
				uni.reLaunch({
					url:'/pages/public/login'
				})
			}
		} else {
			// 除了 0、10001、10002之外的  如果不为10000则报错
			if (response.data.code != 10000) {
				uni.showToast({
					title: response.data.msg || response.data.message || '请求出错,稍后重试',
					icon: 'none',
					duration: 2000,
					mask: true
				});
			}
		}
		return response
	}, (response) => { // 预留可以日志上报
		return response
		// return Promise.reject(response)
	})

	return request.request({
		url: url,
		data,
		method: method
	})

}


