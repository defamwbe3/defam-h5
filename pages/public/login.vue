
<!-- tyep 类型： 1账号密码登录  2手机验证码登录 -->
<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" /> -->
<template>
	<!-- 登录 -->
	<view class="container">
		<u-navbar title=" " :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<!-- <view class="logo">
			logo
		</view>
		<view class="title">数字引擎</view> -->
		<view class="header">
			Welcome to the
			Defam
		</view>
		<view class="form">
			<view class="form-row flex-middle" v-if="form.type==1">
				<image :src="IMG_URL +'sign_icon_phone.png'" mode=""></image>
				<input type="text" v-model="form.mobile" placeholder="请输入手机号码/邮箱" placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle" v-if="form.type==2">
				<image :src="IMG_URL +'sign_icon_phone.png'" mode=""></image>
				<input type="text" v-model="form.mobile" placeholder="请输入手机号码" placeholder-class="pl" />
			</view>
			<view class="form-row flex-middle" v-if="form.type==1">
			    <image :src="IMG_URL +'sign_icon_password.png'" mode=""></image>
				<input type="text" :password="showPassword" v-model="form.password" placeholder="请输入密码" placeholder-class="pl" />
			</view>
			<view class="form-row code-row flex-middle" v-if="form.type==2">
				<image :src="IMG_URL+'sign_icon_yzm.png'" mode=""></image>
				<input type="text" v-model="form.code" placeholder="请输入验证码" placeholder-class="pl" />
				<app-captcha :mobile="form.mobile" type="0"></app-captcha>
			</view>
			<!-- 邮箱登录 -->
			<view class="form-row flex-middle" v-if="form.type==3">
				<image src="../../static/images/loginyouxiang.png" mode=""></image>
				<input type="text" v-model="forms.email" placeholder="请输入邮箱号码" placeholder-class="pl" />
			</view>
			<view class="form-row code-row flex-middle" v-if="form.type==3">
				<image :src="IMG_URL+'sign_icon_yzm.png'" mode=""></image>
				<input type="text" v-model="forms.code" placeholder="请输入邮箱验证码" placeholder-class="pl" />
				<email-captcha :email="forms.email" type="0"></email-captcha>
			</view>
			
			
			<button v-if="form.type == 1" class="btn" :loading="loading" :disabled="loading" @click="sumbithandle">登录</button>
			<button v-if="form.type == 2" class="btn" :loading="loading" :disabled="loading" @click="sumbiter">登录</button>
			<button v-if="form.type == 3" class="btn" :loading="loading" :disabled="loading" @click="youxiangsumbiter">登录</button>
		</view>
		
		<view class="tips-row">
			<view class="qitafangshi" v-if="form.type == 1">
				——————— 其他登录方式 ———————
			</view>
			<view class="tips-row-top flex-between" v-if="form.type == 1">
				<view class="tips-row-top-image" @click="(form.type = 2)">
					<image src="../../static/images/sign_icon_shouji.png" mode=""></image>
				</view>
				<view class="tips-row-top-image tips-row-top-image2" @click="form.type = 3">
					<image src="../../static/images/com.png" mode=""></image>
				</view>
				<view class="tips-row-top-image tips-row-top-image2" @click="vxLogin()">
					<image src="../../static/images/vx.png" mode=""></image>
				</view>
			</view>
			<view class="">
				<text class="left" @click="$Router.push('/pages/public/register')">注册账号</text>
				<text class="xian">|</text>
				<text v-if="form.type == 2 ||form.type == 3" class="right" @click="form.type = 1">密码登录</text>
				<!-- <text v-if="form.type == 1" class="right" @click="(form.type = 2)">验证码登录</text> -->
				<!-- <text v-if="form.type == 1" class="xian">|</text> -->
				<text v-if="form.type == 1" class="right" @click="jump('/pages/user/sets/editItem',{type: 'forgetpassword'})">忘记密码?</text>
			</view>
			
			<view class="tip">
	<!-- 			<u-checkbox-group :value="agreement" @change="changeAgreement">
					<u-checkbox :customStyle="{marginTop: '-8rpx'}" name="agreement" shape="circle" activeColor="#C0E021">
					</u-checkbox>
				</u-checkbox-group> -->
				登录即表示您已阅读并同意
				<text @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type: 'user_service'}})">《用户服务政策》和</text>
				<text @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type: 'private'}})">《隐私政策》</text>
			</view>
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
			name: null,
			logo: null,
			bgColor: '#FAFAFE',
			loading: false,
			// agreement: ['agreement'],
			isAgreement: true,
			showPassword: true,
			form: {
				mobile: '',
				password: '',
				is_agree: 1,
				type: 1
			},
			forms: {
				email: '',
				code: '',
				is_agree: 1,
			},
			tabList: [
				{ id: 1, name: '密码登录' },
				{ id: 2, name: '验证码登录' },
			],
			Rules: [
				{ name: 'mobile', errmsg: '请输入手机号' },
				{ name: 'password', errmsg: '请输入密码' },
			],
			Rules1: [
				{ name: 'mobile', errmsg: '请输入手机号' },
				{ name: 'code', errmsg: '请输入验证码' },
			],
			Rules2: [
				{ name: 'email', errmsg: '请输入邮箱号' },
				{ name: 'code', errmsg: '请输入邮箱验证码' },
			],
			windowHeight: null,
			// showTip: true,
			codetext: '发送验证码',
			tiemJudge: true,
		}
	},
	onLoad() {
	},
	onShow() {
		try {
			if (uni.getStorageSync('token')) {
				this.$Router.replace({
					path: '/pages/index/index'
				})
			}
		} catch (e) {
			//TODO handle the exception
		}
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop
		if (this.scrollTop < 45) {
			
		} else {
			
		}
	},
	methods: {
		// changeAgreement(detail) {
		// 	if (detail.length) {
		// 		this.isAgreement = true
		// 	} else {
		// 		this.isAgreement = false
		// 	}
		// },
		// 切换第一级分类
		switchTab(id) {
			if (this.form.type == id) {
				return false;
			}
			this.form.type = id;
		},
		getConfig() {
			let app = this;
			this.$http('config', {
				module: 'basic',
				key: 'name'
			}, 'GET').then((res) => {
				uni.stopPullDownRefresh();
				if (res.code == 10000) {
					app.name = res.data.name;
					app.logo = res.data.logo;
				} else {
					app.$u.toast(res.message);
				}
			});
		},
		backhandle() {
			this.$Router.push({
				path: '/pages/index/index',
				query: {from: 'login'}
			})
		},

		sumbithandle() {
			let _this = this
			if (_this.form.type == 1) {
				for (let rule of _this.Rules) {
					if (!_this.form[rule.name]) {
						_this.$u.toast(rule.errmsg);
						return;
					}
				}
			}
			// if (!_this.$u.test.mobile(_this.form.mobile)) {
			// 	_this.$u.toast('手机号输入有误，请核对');
			// 	return;
			// }
			// if (!_this.isAgreement) {
			// 	_this.$u.toast('请先阅读并同意相关协议');
			// 	return;
			// }
			_this.submit()
		},
		submit() {
			this.loading = true
			this.$http('login', { ...this.form }, 'post').then((res) => {
				this.loading = false
				this.$u.toast('登录成功');
				uni.setStorageSync('token', res.data.token)
				this.$store.commit('IS_LOGIN', false);
				this.$Router.replace({
					path: '/pages/index/index'
				})
			}).catch(()=>{
				this.loading = false
			})
		},
		sumbiter(){
			let _this = this
			if (_this.form.type == 2) {
				for (let rule of _this.Rules1) {
					if (!_this.form[rule.name]) {
						_this.$u.toast(rule.errmsg);
						return;
					}
				}
			}
			if (!_this.$u.test.mobile(_this.form.mobile)) {
				_this.$u.toast('手机号输入有误，请核对');
				return;
			}
			this.loading = true
			this.$http('login/code', { ...this.form }, 'post').then((res) => {
				this.loading = false
				this.$u.toast('登录成功');
				uni.setStorageSync('token', res.data.token)
				this.$Router.replace({
					path: '/pages/index/index'
				})
			}).catch(()=>{
				this.loading = false
			})
		},
		youxiangsumbiter(){
			// console.log(1111111111)
			let _this = this
			if (_this.form.type == 3) {
				for (let rule of _this.Rules2) {
					if (!_this.forms[rule.name]) {
						_this.$u.toast(rule.errmsg);
						return;
					}
				}
			}
			this.loading = true
			this.$http('login/email', { ...this.forms }, 'post').then((res) => {
				this.loading = false
				this.$u.toast('登录成功');
				uni.setStorageSync('token', res.data.token)
				this.$Router.replace({
					path: '/pages/index/index'
				})
			}).catch(()=>{
				this.loading = false
			})
		},
		// 微信授权登录
		vxLogin(){
			// let appId = 'wxf5aed38b39f6c1e1'
			// let url = 'http://h5.cjlbzx.szyqa.com/#/' //测试
			// window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5aed38b39f6c1e1&redirect_uri=http://api.cjlbzx.szyqa.com/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'"
			// console.log('1111111')
			// this.$Router.push({
			// 	path:'/pages/public/wechat'
			// })
		},
		
		
		
		// 跳转
		jump(path, query) {
			this.$Router.push({
				path: path,
				query: query
			})
		},
		// 返回
		backhandle() {
			this.$Router.back()
		},
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
	position: relative;
	z-index: 9;
	overflow: hidden;
	min-height: 100vh;

	.more {
		width: 48rpx;
		height: 48rpx;
		margin-top: 10rpx;
	}
	
	.header{
		width: 480rpx;
		height: 176rpx;
		margin: 196rpx 60rpx 80rpx;
		font-weight: 900;
		font-size: 60rpx;
		text-align: left;
		color: $textbl;
		font-family: "Source Han Serif CN Heavy";
	}
	.logo {
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
		background: $linerColor;
		font-size: 48rpx;
		font-weight: bold;
		text-align: center;
		color: $textblack;
		line-height: 200rpx;
		margin: 160rpx auto 0;
		.thumb {
			width: 100%;
			height: 100%;
		}
	}
	.title {
		margin-top: 20rpx;
		font-size: 32rpx;
		text-align: center;
		color: $textblack;
	}

	.form {
		margin: 120rpx 80rpx 0;
		.code-row {
			position: relative;
		}
		.form-row {
			margin-bottom: 52rpx;
			border-bottom: 2rpx solid $borderColor;
			position: relative;
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 32rpx;
			}
			
			input {
				width: 100%;
				height: 76rpx;
				color: $textblack;
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


		.btn {
			width: 75%;
			background: linear-gradient(320.28deg, #01c8e5 0%, #f177c1 100%);
			box-shadow: 0 6rpx 32rpx rgba(1, 200, 229, 0.2);
			color: $btnText;
			border-radius: $btnRadius;
			letter-spacing: 2rpx;
			font-size: 32rpx;
			margin-top: 70rpx;
		}

		.btn::after {
			border: none;
		}
	}
}
		
		
		.qitafangshi{
			text-align: center;
			font-weight: 400;
			font-size: 28rpx;
			letter-spacing: 0.06px;
			color: #666;
			margin-bottom: 40rpx;
		}
		.tips-row {
			// overflow-y:scroll;
			width: 100%;
			font-weight: 400;
			font-size: 28rpx;
			letter-spacing: 0.06rpx;
			color: #666;
			text-align: center;
			// position: absolute;
			// bottom: 102rpx;
			// left: 50%;
			// transform: translateX(-50%);
			padding: 320rpx 0 54rpx 0;
			
			.xian{
				// width: 46rpx;
				// height: 40rpx;
				padding: 0 20rpx;
				font-weight: 400;
				font-size: 28rpx;
				letter-spacing: 0.06px;
				color: #f0f1f9;
			}
			
		}
		
		.right{
			width: 150rpx;
		}
		.left{
			width: 120rpx;
		}
		.tip {
		
			
			margin-top: 40rpx;
			font-size: 24rpx;
			// line-height: 40rpx;
			// text-align: center;
			color: $secondFontColor;
		}
		.tips-row-top{
			margin: 0 156rpx 80rpx;
			.tips-row-top-image{
				width: 80rpx;
				height: 80rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.tips-row-top-image2{
				margin-left: 60rpx;
			}
			
		}

</style>
