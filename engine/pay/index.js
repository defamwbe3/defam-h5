import $http from '@/engine/request/index'
// #ifdef H5
import wxsdk from '@/engine/wechat/sdk'
// #endif
import wechat from '@/engine/wechat/wechat'
import {
	router as $Router
} from '@/engine/router/index.js'
import store from '@/engine/store';
import $platform from '@/engine/platform';

/**
 * 支付
 * 
 * @param {String} payment = ['wechat','alipay','wallet']  	- 支付方式
 * @param {Object} order = {}  								- 订单详情
 * @param {String} orderType = ['goods','recharge'] 		- 订单类型
 */

export default class ShoproPay {


	//						wxOfficialAccount			wxMiniProgram			App						H5
	// 			wechat			公众号JSSDK支付				小程序支付			微信开放平台支付			H5网页支付
	//			alipay			复制网址						复制网址				支付宝开放平台支付		    直接跳转链接
	// 			wallet			v							v					v						v


	constructor(payment, order, orderType) {
		this.payment = payment;
		this.order = order;
		this.orderType = orderType;
		this.platform = $platform.get();
		let payMehod = this.getPayMethod();
		payMehod();

	}

	getPayMethod() {
		var payMethod = {
			'wxOfficialAccount': {
				'wechat': () => {
					this.wxOfficialAccountPay()
				},
				'alipay': () => {
					this.copyPayLink()
				},
				'wallet': () => {
					this.walletPay()
				}
			},
			'wxMiniProgram': {
				'wechat': () => {
					this.wxMiniProgramPay()
				},
				'alipay': () => {
					this.copyPayLink()
				},
				'wallet': () => {
					this.walletPay()
				}
			},
			'App': {
				'wechat': () => {
					this.wechatPay()
				},
				'alipay': () => {
					this.aliPay()
				},
				'wallet': () => {
					this.walletPay()
				},
			},
			'H5': {
				'wechat': () => {
					this.wechatWapPay()
				},
				'alipay': () => {
					this.goToPayLink()
				},
				'wallet': () => {
					this.walletPay()
				},
			},
		}
		return payMethod[this.platform][this.payment];
	}



	// 预支付
	prepay() {
		let that = this;
		return new Promise((resolve, reject) => {
			let that = this;
			let params = {
				order_sn: that.order.order_sn,
				payment: that.payment
			}
			if (uni.getStorageSync('openid')) {
				params.openid = uni.getStorageSync('openid');
			}
			$http('pay/prepay', params).then(res => {
				if (res.code === 1) {
					res.data === 'no_openid' ?
						uni.showModal({
							title: '微信支付',
							content: '请先绑定微信再使用微信支付',
							success: function(res) {
								if (res.confirm) {
									wechat.bind();
								}
							},
						}) :
						resolve(res);

				}
			})
		});
	}


	// 微信H5支付
	async wxOfficialAccountPay() {
		let that = this;
		let result = await this.prepay();
		wxsdk.wxpay(result.data.pay_data, (res) => {
			res.errMsg == "chooseWXPay:ok" ? that.payResult('success') : that.payResult('fail')
		});

	}

	//浏览器微信支付
	async wechatWapPay() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			var url = result.data.pay_data.match(/url\=\'(\S*)\'/);
			let reg = new RegExp('&amp;', 'g') //g代表全部
			let newUrl = url[1].replace(reg, '&');
			let domain = store.getters.initShop.domain; //域名需要https
			let params = encodeURIComponent(
				`${domain}pages/order/payment/result?orderId=${that.order.id}&type=${that.payment}&orderType=${that.orderType}`
			)
			window.location.href = newUrl + '&redirect_url=' + params;
		}
	}

	// 微信小程序支付
	async wxMiniProgramPay() {
		let that = this;
		let result = await this.prepay();
		uni.requestPayment({
			provider: 'wxpay',
			...result.data.pay_data,
			success: res => {
				that.payResult('success')
			},
			fail: err => {
				console.log('支付取消或者失败:', err);
				err.errMsg !== "requestPayment:fail cancel" && that.payResult('fail')
			}
		});
	}

	// 余额支付
	async walletPay() {
		let that = this;
		let result = await this.prepay();
		result.code === 1 && that.payResult('success')
	}

	// 支付宝复制链接支付
	async copyPayLink() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			//引入showModal 点击确认 复制链接；
			uni.showModal({
				title: '支付宝支付',
				content: '复制链接到外部浏览器',
				confirmText: '复制链接',
				success: (res) => {
					if (res.confirm) {
						uni.setClipboardData({
							data: result.data.pay_data,
							success: function(data) {
								that.$u.toast('已复制到剪切板');
							}
						});
					}
				}
			})
		}
	}

	// 支付链接
	async goToPayLink() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			window.location = result.data.pay_data;
		}
	}

	// 支付宝支付
	async aliPay() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			uni.requestPayment({
				provider: 'alipay',
				orderInfo: result.data.pay_data, //支付宝订单数据
				success: res => {
					that.payResult('success')
				},
				fail: err => {
					console.log('支付取消或者失败:', err);
					err.errMsg !== "requestPayment:fail cancel" && that.payResult('fail')
				}
			});
		}
	}

	// 微信支付
	async wechatPay() {
		let that = this;
		let result = await this.prepay();
		if (result.code === 1) {
			uni.requestPayment({
				provider: 'wxpay',
				orderInfo: JSON.parse(result.data.pay_data), //微信订单数据(官方说是string。实测为object)
				success: res => {
					that.payResult('success')
				},
				fail: err => {
					err.errMsg !== "requestPayment:fail cancel" && that.payResult('fail')
					console.log('支付取消或者失败:', err);
				}
			});
		}
	}


	// 支付结果跳转,success:成功，fail:失败
	payResult(resultType) {
		const that = this;
		$Router.replace({
			path: '/pages/order/payment/result',
			query: {
				orderId: that.order.id,
				type: that.payment, //重新支付的时候使用
				payState: resultType,
				orderType: that.orderType
			}
		});
	}

}
