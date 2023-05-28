<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import APPUpdate from "@/components/js_sdk/zhouWei-APPUpdate/APPUpdate";
import wechat from '@/engine/wechat/wechat';
import Vue from 'vue';

// #ifdef H5
// var script = document.createElement('script');
// script.src = "https://ssl.captcha.qq.com/TCaptcha.js";
// document.head.appendChild(script);
// #endif
export default {
	globalData: {},
	onLaunch(options) {
		let that = this;
		// #ifdef H5
		that.$platform.entry();
		// #endif
		// #ifdef MP-WEIXIN
		// 检测小程序更新(如果从朋友圈场景进入则无此API)
		options.scene !== 1154 && wechat.checkMiniProgramUpdate();
		// #endif
		// that.appInit(options);
		if (process.env.NODE_ENV === 'development') {
			// this.syncPages();
		}

		// #ifdef APP-PLUS ||APP-NVUE
			APPUpdate();
		// #endif
		that.setAppInfo(); 
	},
	onShow: function() {
		uni.setStorageSync('apptime', new Date().getTime());
	},
	onHide: function() {
		if(uni.getStorageSync('token')){
			if(new Date().getTime()-uni.getStorageSync('apptime')>0){
				this.$http('member/readreward', {time: Number((new Date().getTime()-uni.getStorageSync('apptime'))/1000).toFixed()}, 'get').then(res=>{
				}).catch(()=>{})
			}
		}
		
	},
	mounted() {
		
	},
	methods: {
		//应用初始化,获取模板数据，自动同步新页面到后台,获取用户信息
		...mapActions(['getAppInit', 'getTemplate', 'getRoutes']),
		// 获取系统栏高度
		setAppInfo() {
			let that = this;
			let platform = '';
			uni.getSystemInfo({
				success: function (e) {
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.StatusBars = e.statusBarHeight + 6;
					// #ifdef H5
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
					// console.log(Vue.prototype.CustomBar)
					// #endif

					// #ifdef APP-PLUS
					platform = 'App';
					if (e.platform == 'android') {
						uni.setStorageSync('isAndroid', true);
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
						uni.setStorageSync('isAndroid', false);
					}
					// #endif
					// #ifdef MP-WEIXIN
					platform = 'wxMiniProgram';
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif
					uni.setStorageSync('platform', platform);

				}
			});
			uni.setStorageSync('platform', platform);
		},
		
	}
};
</script>
<!-- <script>

</script> -->

<style lang="scss">
@import 'uview-ui/index.scss';
@import 'static/font/engine-icon.css';
@import 'static/font/iconfont.css';
@import 'static/style/index.scss';

uni-modal {
	z-index: 9999999 !important;
}

/* 字体文件 */
@font-face {
	font-family: OPPOSANS;
	src: url('~@/static/font/OPPOSANS-M-subfont.ttf');
}

.font-OPPOSANS {
	font-family: OPPOSANS;
}

page {
	-webkit-overflow-scrolling: touch; // ios滑动不流畅
	height: 100%;
	background: $bgColor;
	width: 100%;
	font-size: 28rpx;
	font-family: OPPOSANS;
	word-break: break-all; //英文文本不换行
	color: $textblack;
	margin: 0 auto;
	// padding-bottom: calc(env(safe-area-inset-bottom) / 2);
	margin-bottom: calc(env(safe-area-inset-bottom) / 2);
}

::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
	display: none;
}
uni-page-body{
	font-family: -apple-system, "Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "Microsoft JhengHei", SimSun, sans-serif;
}
</style>
