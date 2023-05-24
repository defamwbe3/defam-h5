/**
 * MixinShare v1.0.0
 * @description engine-mixin-share 1.0.0 engine全局分享组件
 * @Author lidongtony
 * @Date 2021-04-18
 * @Email lidongtony@qq.com
 */
import store from '@/engine/store';
import {
	mapMutations,
	mapActions,
	mapState
} from 'vuex';
export default {
	data() {
		return {
			shareInfo: {}
		}
	},
	onLoad(){
		// #ifdef MP-WEIXIN
		// 需要分享的页面路由
		let isShareRoute = [
			'pages/index/index',
			'pages/goods/detail'
		]
		let routes = getCurrentPages();
		let curRoute = routes[routes.length - 1].route;
		if(isShareRoute.indexOf(curRoute) == -1){
			wx.hideShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
		}
		// #endif
	},
	// 是否登录
	computed: {
		shareData: {
			get() {
				this.shareInfo = store.state.shopro.shareInfo;
				return store.state.shopro.shareInfo;
			},
			set(val) {
				this.shareInfo = val;
			}
		}
	},
	// #ifdef MP-WEIXIN
	onShareAppMessage(res) {
		let that = this;
		uni.$emit('ON_WX_SHARE')
		return {
			title: that.shareInfo.title,
			path: that.shareInfo.path,
			imageUrl: that.shareInfo.image,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})

			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			},
			complete() {}
		}
	},
	onShareTimeline(res) {
		let that = this;
		let query = that.shareInfo.query;
		//携带当前页面资源ID参数
		let currentPage = getCurrentPages()[getCurrentPages().length - 1];
		let options = currentPage.options;
		if (JSON.stringify(options) != '{}' && options.id) {
			query += `&id=${options.id}`;
		}

		return {
			title: that.shareInfo.title,
			query: query,
			imageUrl: that.shareInfo.image,
			success(res) {
				uni.showToast({
					title: '分享成功'
				})
			},
			fail(res) {
				uni.showToast({
					title: '分享失败',
					icon: 'none'
				})
			},
			complete() {}
		}
	}
	// #endif

}
