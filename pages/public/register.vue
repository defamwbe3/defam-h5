<template>
	<!-- 注册 -->
	<view class="container">
		<!-- <view class="logo" v-if="logo">
			<image :src="logo || '/static/images/logo.png'" mode="aspectFill" class="thumb"></image>
		</view> -->
		<u-navbar title=" " :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="header">
			Welcome to the
			Defam
		</view>
		邮箱注册
		<view class="form" v-if="fenlei == 2">
			<view class="form-row flex-middle">
				<image src="../../static/images/loginyouxiang.png" mode=""></image>
				<input type="text" v-model="formss.email" placeholder="请输入邮箱" placeholder-class="pl" />
			</view>
			<view class="form-row code-row flex-middle">
				<image :src="IMG_URL+'sign_icon_yzm.png'" mode=""></image>
				<input type="text" v-model="formss.code" placeholder="请输入验证码" placeholder-class="pl" />
				<email-captcha :email="formss.email" type="1"></email-captcha>
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_password.png'" mode=""></image>
				<input type="password" :password="showPassword1" v-model="formss.password" placeholder="请输入密码" placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_password.png'" mode=""></image>
				<input type="password" :password="showPassword2" v-model="formss.password_confirm" placeholder="请确认密码" placeholder-class="pl" />
			</view>
			
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_yqm.png'" mode=""></image>
				<input type="text" :disabled="readonly" readonly v-model="formss.invite_code" placeholder="请输入邀请码(选填)"
					placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_dz.png'" mode=""></image>
				<input type="text" v-model="formss.Polygin" placeholder="请输入BSC地址" placeholder-class="pl" />
			</view>
			<button class="btn" :loading="loading" :disabled="loading" @click="sumbithandleEmail">注册</button>
		</view>
		
		
		<!-- 手机号注册 -->
		<view class="form" v-if="fenlei == 1">
			<view class="form-row flex-middle" v-if="fenlei == 1">
				<image :src="IMG_URL +'sign_icon_phone.png'" mode=""></image>
				<input type="text" v-model="form.mobile" placeholder="请输入手机号" placeholder-class="pl" />
			</view>
			<view class="form-row code-row flex-middle" v-if="fenlei == 1">
				<image :src="IMG_URL+'sign_icon_yzm.png'" mode=""></image>
				<input type="text" v-model="form.code" placeholder="请输入验证码" placeholder-class="pl" />
				<app-captcha :mobile="form.mobile" type="1"></app-captcha>
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_password.png'" mode=""></image>
				<input type="password" :password="showPassword1" v-model="form.password" placeholder="请输入密码" placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_password.png'" mode=""></image>
				<input type="password" :password="showPassword2" v-model="form.password_confirm" placeholder="请确认密码" placeholder-class="pl" />
			</view>
			
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_yqm.png'" mode=""></image>
				<input type="text" :disabled="readonly" readonly v-model="form.invite_code" placeholder="请输入邀请码(选填)"
					placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle">
				<image :src="IMG_URL +'sign_icon_dz.png'" mode=""></image>
				<input type="text" v-model="form.Polygin" placeholder="请输入BSC地址" placeholder-class="pl" />
			</view>
			<button class="btn" :loading="loading" :disabled="loading" @click="sumbithandle">注册</button>
		</view>
		
		
		<view class="text-box flex">
			<!-- <view class="text-tips" v-if="fenlei == 1" @click="fenlei = 2">邮箱注册</view> -->
			<view class="text-tips" v-if="fenlei == 2" @click="fenlei = 1">手机号注册</view>
			<text class="xian">|</text>
			<view class="text-tips" @click="$Router.replace('/pages/public/login')">去登陆</view>
		</view>
		
		
		<view class="tip">
			注册登录即表示您已阅读并同意
			<text @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type: 'user_service'}})">《用户服务政策》和</text>
			<text @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type: 'private'}})">《隐私政策》</text>
		</view>
	</view>
</template>

<script>
import AppCaptcha from '@/components/common/AppCaptcha'
import EmailCaptcha from '@/components/common/EmailCaptcha'
export default {
	components: {
		AppCaptcha,
		EmailCaptcha
	},
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			bgColor: '#FAFAFE',
			// name: null,
			// logo: null,
			loading: false,
			showPassword1: true,
			showPassword2: true,
			form: {
				mobile: '',  // 手机号
				code: '',  //验证码
				password: '', // 密码
				password_confirm: '', // 确认密码
				invite_code: '', // 邀请码(选填)
				Polygin: '', // 地址
				
			},
			formss: {
				email: '', //邮箱号
				code: '',  //验证码
				password: '', // 密码
				password_confirm: '', // 确认密码
				invite_code: '', // 邀请码(选填)
				Polygin: '', // 地址
				
			},
			fenlei: 1,
			bgOne: '',
			Rules: [
				{ name: 'mobile', errmsg: '请输入手机号' },
				{ name: 'code', errmsg: '请输入验证码' },
				{ name: 'password', errmsg: '请输入密码' },
				{ name: 'password_confirm', errmsg: '请输入确认密码' },
				// { name: 'Polygin', errmsg: '请输入BSC地址' },
			],
			Rules2: [
				{ name: 'email', errmsg: '请输入邮箱号' },
				{ name: 'code', errmsg: '请输入验证码' },
				{ name: 'password', errmsg: '请输入密码' },
				{ name: 'password_confirm', errmsg: '请输入确认密码' },
				// { name: 'Polygin', errmsg: '请输入BSC地址' },
			],
			codetext: '发送验证码',
			tiemJudge: true,
			disabled: false,
			readonly: false,
			barHeight: 20,
		}
	},
	onLoad() {
		this.form.invite_code = this.$Route.query.usercode || '';
		if (this.$Route.query.usercode) {
			this.readonly = true
		}
		// this.getSystemStatusBarHeight()
		// this.bgOne = 'background:none; top:' + this.barHeight + 'px'
	},	
	onShow() {
		// this.getConfig();
		
	},
	onPageScroll(e) {
	},
	methods: {
		// getConfig() {
		// 	let app = this;
		// 	this.$http('getConfig', {
		// 		type: 'basic',
		// 	}, 'post').then((res) => {
		// 		uni.stopPullDownRefresh();
		// 		if (res.code == 10000) {
		// 			app.name = res.data.name;
		// 			app.logo = res.data.logo;
		// 		} else {
		// 			app.$u.toast(res.message);
		// 		}
		// 	});
		// },
		//获取系统状态栏高度
		getSystemStatusBarHeight() {
			let that = this;
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			that.barHeight = height;
			// #endif
			// #ifdef H5
			that.barHeight = 0;
			// #endif
			// #ifdef MP-WEIXIN
			var height = uni.getSystemInfoSync().statusBarHeight;
			that.barHeight = height;
			// #endif
		},
		backhandle() {
			this.$Router.push({
				path: '/pages/public/login'
			})
		},
		sumbithandle() {
			for (let rule of this.Rules) {
				if (!this.form[rule.name]) {
					this.$u.toast(rule.errmsg);
					return;
				}
			}
			if (this.form.mobile.length != 11) {
				this.$u.toast('手机号输入有误，请核对');
				return;
			}
			
			// 注册
			let _this = this
			this.$http('register', this.form, 'post').then((res) => {
				_this.loading = true
				if (res.code == 10000) {
					_this.$u.toast('注册成功，请登录');
					_this.loading = false
					setTimeout(function () {
						_this.$Router.replace({
							path: '/pages/public/login'
						})
					}, 1000);
				} else {
					_this.$u.toast(res.message)
					_this.loading = false
				}
			})
		},
		sumbithandleEmail(){
			for (let rule of this.Rules2) {
				if (!this.formss[rule.name]) {
					this.$u.toast(rule.errmsg);
					return;
				}
			}
			
			// 注册
			let _this = this
			this.$http('registerEmail', this.formss, 'post').then((res) => {
				_this.loading = true
				if (res.code == 10000) {
					_this.$u.toast('注册成功，请登录');
					_this.loading = false
					setTimeout(function () {
						_this.$Router.replace({
							path: '/pages/public/login'
						})
					}, 1000);
				} else {
					_this.$u.toast(res.message)
					_this.loading = false
				}
			})
		}

	}
}
</script>
<style>
.pl {
	font-size: 28rpx;
	color: #bebec0;
}
</style>
<style lang="scss" scoped>
	.container {
		font-size: 36rpx;
		font-weight: 700;
		color: #333333;
		font-weight: bold;
	
		.more {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;
		}
	}
.container {
	color: #FFFFFF;
	position: relative;
	z-index: 9;
	color: #FFFFFF;
	position: relative;
	z-index: 9;
	padding: 0rpx 60rpx 0;
	.header{
		width: 480rpx;
		height: 176rpx;
		margin: 60rpx 0rpx 80rpx;
		font-weight: 900;
		font-size: 60rpx;
		text-align: left;
		color: $textbl;
		font-family: "Source Han Serif CN Heavy";
	}
	.titles {
		font-size: 32rpx;
		display: block;
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		height: 88rpx;
		color: $textbl;
		line-height: 88rpx;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;

		text {
			font-weight: 400;
			margin-right: 4rpx;
			position: absolute;
			left: 30rpx;
			line-height: 88rpx;
			font-size: 50rpx;
		}
	}

	.bg-img {
		position: absolute;
		width: 100%;
		height: 922rpx;
		top: -110rpx;
		z-index: -1;
	}

	.logo {
		width: 240rpx;
		height: 34rpx;
		overflow: hidden;
		margin: 40rpx auto 160rpx;

		.thumb {
			width: 100%;
			height: 100%;
		}
	}

	.title-big {
		margin: 25rpx 0 0;
		font-size: 46rpx;
		font-weight: bold;
		line-height: 1;
		color: $textbl;
	}

	.title {
		margin: 30rpx 0 100rpx;
		font-size: 32rpx;
		line-height: 1;
		font-weight: bold;
		color: $textbl;
	}

	.form {
		.form-row {
			margin-bottom: 52rpx;
			position: relative;
			border-bottom: 2rpx solid $borderColor;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 32rpx;
			}
			// border-bottom: 2rpx solid #353A3E;
			input {
				// width: 92%;
				height: 88rpx;
				color: $textbl;
				font-weight: 400;
				// padding: 0 30rpx;
				// border-bottom: 2rpx solid $borderColor;
			}
			.eye {
				position: absolute;
				top: 0;
				bottom: 0;
				margin: auto;
				right: 32rpx;
				z-index: 10;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.code-row {
			position: relative;

			.code {
				position: absolute;
				right: 10rpx;
				top: 50%;
				transform: translateY(-50%);
				font-size: 28rpx;
				color: $themeColor;
			}
		}

		.btn {
			width: 75%;
			height: 88rpx;
			line-height: 88rpx;
			background: linear-gradient(320.28deg, #01c8e5 0%, #f177c1 100%);
			box-shadow: 0 6rpx 32rpx rgba(1, 200, 229, 0.2);
			border-radius: $btnRadius;
			color: $btnText;
			font-size: 32rpx;
			font-weight: 600;
			letter-spacing: 2rpx;
			margin-top: 70rpx;
		}

		.btn::after {
			border: none;
		}

		.tips-row {
			display: flex;
			padding: 32rpx 0;
			font-size: 28rpx;
			justify-content: space-between;

			.left {
				color: $textwhite;
			}

			.right {
				color: $textwhite;
			}
		}
	}
}
.text-box{
	display: flex;
	align-self: center;
	justify-content: center;
	width: 100%;
	margin-top: 100rpx;
}
.text-tips {
	font-weight: 400;
	font-size: 28rpx;
	letter-spacing: 0.06px;
	color: #666;
	text-align: center;
	font-size: 28rpx;
}
.xian{
	padding: 0 20rpx;
	font-weight: 400;
	font-size: 28rpx;
	letter-spacing: 0.06px;
	color: #f0f1f9;
}
.tip {
	// position: fixed;
	// bottom: 40rpx;
	// left: 50%;
	// transform: translateX(-50%);
	padding: 20rpx 0;
	width: 100%;
	height: 80rpx;
	font-size: 22rpx;
	line-height: 40rpx;
	text-align: center;
	color: $secondFontColor;
}
</style>
