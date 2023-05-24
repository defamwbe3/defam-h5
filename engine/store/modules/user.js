// 用户数据模块
import http from '@/engine/request/index'
import store from '@/engine/store'
import tools from '@/engine/utils/tools'
import wechat from '@/engine/wechat/wechat'

import {
	IS_LOGIN,
	USER_INFO,
	USER_DATA,
	MESSAGE_IDS,
	AGENT_INFO,
	AUTH_TYPE,
	BAR_HEIGHT
} from '../types.js'
const state = {
	isLogin: uni.getStorageSync('isLogin') ? uni.getStorageSync('isLogin') : false,
	userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : {},
	agentInfo: uni.getStorageSync('agentInfo') ? uni.getStorageSync('agentInfo') : {},
	barHeight: uni.getStorageSync('barHeight') ? uni.getStorageSync('barHeight') : 0,
	userData: {}, //用户其他相关信息
	messageIds: {}, //小程序订阅消息模板ids
	authType: '' // smsLogin:手机号登录注册, accountLogin:密码登录, forgotPwd:忘记密码, changePwd:修改密码, bindMobile:绑定手机号
}

const actions = {
	// 获取用户信息
	getUserInfo({
		commit
	}, token = '') {
		return new Promise((resolve, reject) => {
			token && uni.setStorageSync('token', token);
			http('user.info').then(res => {
					if (res.code === 1) {
						store.dispatch('showAuthModal', '');
						if (!store.state.user.isLogin) {
							store.dispatch('getShareInfo');
						}
						commit('IS_LOGIN', true);
						commit('USER_INFO', res.data);
						uni.setStorageSync('userInfo', res.data);
						let spm = uni.getStorageSync('spm');
						if (spm) {
							http('common.shareAdd', {
								spm: spm
							});
							uni.removeStorageSync('spm');
						}
						resolve(res)
					}

				}).then(() => {
					
				})
				.catch(e => {
					reject(e)
				})
		})
	},
	// 用户其他相关信息
	getUserData({
		commit
	}) {
		return new Promise((resolve, reject) => {
			http('user.userData').then(res => {
				commit('USER_DATA', res.data);
				resolve(res)
			}).catch(e => {
				reject(e)
			})
		})
	},

	// 自动登录
	async autoLogin({
		commit
	}) {
		if (store.state.shopro.config.wechat?.autologin && !store.state.user.isLogin) {
			let token = '';
			// #ifdef H5
			uni.setStorageSync('appid', store.state.shopro.config.wechat.appid);
			wechat.login();
			// #endif
			// #ifdef MP-WEIXIN
			token = await wechat.getWxMiniProgramSessionKey(true);
			// #endif
			if (token) {
				store.dispatch('getUserInfo', token);
			}
		}
	},

	// 登录弹窗控制
	showAuthModal({
		commit
	}, type = 'accountLogin') {
		commit('AUTH_TYPE', type);
	},

	// 退出登录
	logout({
		commit
	}) {
		uni.getStorageSync('token') && http('user.logout');
		uni.removeStorageSync('token');
		uni.removeStorageSync('session_key');
		uni.removeStorageSync('userInfo');
		uni.removeStorageSync('cartNum');
		uni.removeStorageSync('chatSessionId');
		commit('IS_LOGIN', false);
		commit('USER_INFO', {});
		commit('CART_LIST', []);
		commit('CART_NUM');
		commit('USER_DATA', {});
	}
}

const mutations = {
	// 登录态
	[IS_LOGIN](state, data) {
		uni.setStorageSync('isLogin', data);
		state.isLogin = data;
	},
	// 用户信息
	[USER_INFO](state, data) {
		state.userInfo = data;
	},
	// 分销商信息
	[AGENT_INFO](state, data) {
		state.agentInfo = data;
	},
	// 小程序订阅消息模板ids
	[MESSAGE_IDS](state, data) {
		state.messageIds = data;
	},
	[USER_DATA](state, data) {
		state.userData = data;
	},
	[AUTH_TYPE](state, data) {
		data ? uni.hideTabBar() : uni.showTabBar();
		state.authType = data;
	},
	[BAR_HEIGHT](state, data) {
		state.barHeight = data;
	},
}

const getters = {

}

export default {
	state,
	mutations,
	actions,
	getters
}
