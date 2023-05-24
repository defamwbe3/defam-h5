<template>
	<view class="container">
		<u-navbar :title="title" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<!-- 头像 -->
		<view class="userInfo-item userInfo-item-u flex-between" v-if="type == 'avatar'">
			<view class="label">头像</view>
			<view class="value flex-middle" @click="chooseImage()">
				<image v-if="userInfo.avatar!=''" :src="userInfo.avatar" mode=""></image>
				<image v-else src="/static/images/base_avatar.png" mode=""></image>
				<view class="more-img">
					<image class="more" src="/static/images/icon_more.png"></image>
				</view>
			</view>
		</view>
		<!-- 昵称 -->
		<view class="userInfo-item" v-if="type == 'nickname'">
			<input v-model="userInfo.nickname" placeholder="请输入您的昵称" placeholder-class="pl" />
			<view class="userInfo-item-1">限4-16个字符，一个汉字为2个字符</view>
		</view>
		
		<!-- 签名 -->
		<view class="userInfo-item" v-if="type == 'qianming'">
			<input v-model="userInfo.sign" placeholder="请输入您的签名" placeholder-class="pl" />
			<!-- <view class="userInfo-item-1">限4-16个字符，一个汉字为2个字符</view> -->
		</view>
		
		<!-- 手机号 -->
		<view class="userInfo-item" v-if="type == 'phone'">
			<input v-model="form.new_mobile" placeholder="请输入新手机号" placeholder-class="pl" />
				<view class="code-row flex-between">
					<input type="text" v-model="form.code " placeholder="请输入验证码" placeholder-class="pl" />
					<view class="code" v-if="tiemJudge" @click="codehandle1">{{codetext}}</view>
					<view class="code" v-else @click="dontClick">{{codetext}}</view>
				</view>
		</view>
		<!-- 找回密码 -->
		<view v-if="type == 'forgetpassword'">
			<view class="userInfo-item">
				<input type="text" v-model="formfor.mobile" placeholder="请输入手机号/邮箱" placeholder-class="pl" />
			</view>
			<view class="userInfo-item">
				<view class="code-row flex-between">
					<input type="text" v-model="formfor.code " placeholder="请输入验证码" placeholder-class="pl" />
					<view class="code" v-if="tiemJudge" @click="codehandle">{{codetext}}</view>
					<view class="code" v-else @click="dontClick">{{codetext}}</view>
				</view>
			</view>
			<view class="userInfo-item">
				<input type="password" v-model="formfor.password" placeholder="请输入新密码" placeholder-class="pl" />
			</view>
			<view class="userInfo-item">
				<input type="password" v-model="formfor.password_confirm" placeholder="请再次输入新密码" placeholder-class="pl" />
			</view>
		</view>
		<!-- 编辑封面 -->
		<view class="userInfo-item userInfo-item-u flex-between" v-if="type == 'cover'">
			<view class="label">封面</view>
			<view class="value flex-middle" @click="chooseImage1()">
				<image class="cover-img" v-if="userInfo.wap_cover_address!=''" :src="userInfo.wap_cover_address" mode=""></image>
				<image class="cover-img" v-else :src="IMG_URL+'banner.png'" mode=""></image>
				<view class="more-img">
					<image class="more" src="/static/images/icon_more.png"></image>
				</view>
			</view>
		</view>
		<button class="btn"  @click="submithandle()">确定</button>
	</view>
</template>

<script>
	import {
		userInfo
	} from '@/engine/storage';
	export default {
		components: {

		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				title: '',
				form: {
					new_mobile: '',
					code: ''
				},
				formfor: {
					mobile: '',
					code: '',
					password_confirm: '',
					password: '',
				},
				codetext: '获取验证码',
				tiemJudge: true,
				userInfo: {},
				loading: false,
				type: '',
				nickname: '',
				avatar: '',
			}
		},
		onLoad(){
			this.type = this.$Route.query.type || 'alipay'
			// let title = ''
			// console.log(this.type)
			if (this.type == 'nickname') {
				this.title = "修改昵称"
			}
			if (this.type == 'avatar') {
				this.title = "修改头像"
			}
			if (this.type == 'phone') {
				this.title = "更换手机号"
			}
			if (this.type == 'forgetpassword') {
				this.title = "找回密码"
			}
			if (this.type == 'qianming') {
				this.title = "修改签名"
			}
			if (this.type == 'cover') {
				this.title = "编辑封面"
			}
			uni.setNavigationBarTitle({
				title: this.title
			})
		},
		onShow() {
			if(uni.getStorageSync('token')){
				let _this = this;
				userInfo.get(true).then(res => {
					_this.userInfo = res;
					console.log(_this.userInfo)
				}).catch(() => { })
			}
			
		},

		methods: {
			// 修改按钮
			submithandle() {
				let form = {}
				// 修改昵称
				if (this.type == 'nickname') {
					if (!this.userInfo.nickname) {
						this.$u.toast('昵称不能为空')
						return
					}
					form = { nickname: this.userInfo.nickname }
					this.loading = true;
					this.$http('member/update', form, 'post').then(res => {
						this.$u.toast(res.message)
						if (res.code == 10000) {
							this.$u.toast('修改成功')
							this.loading = false;
							this.$Router.back()
						}
					})
				}
				// 修改签名
				if (this.type == 'qianming') {
					if (!this.userInfo.sign) {
						this.$u.toast('签名不能为空')
						return
					}
					form = { sign: this.userInfo.sign }
					this.loading = true;
					this.$http('member/update', form, 'post').then(res => {
						this.$u.toast(res.message)
						if (res.code == 10000) {
							this.$u.toast('修改成功')
							this.loading = false;
							this.$Router.back()
						}
					})
				}
				// 修改头像
				if (this.type == 'avatar') {
					if (!this.userInfo.avatar) {
						this.$u.toast('头像不能为空')
						return
					}
					form = { avatar: this.userInfo.avatar }
					this.loading = true;
					this.$http('member/update', form, 'post').then(res => {
						this.$u.toast(res.message)
						if (res.code == 10000) {
							this.$u.toast('修改成功')
							this.loading = false;
							this.$Router.back()
						}
					})
				}
				// 修改封面
				if (this.type == 'cover') {
					if (!this.userInfo.wap_cover_address) {
						this.$u.toast('封面不能为空')
						return
					}
					form = { wap_cover_address: this.userInfo.wap_cover_address }
					this.loading = true;
					this.$http('member/update', form, 'post').then(res => {
						this.$u.toast(res.message)
						if (res.code == 10000) {
							this.$u.toast('修改成功')
							this.loading = false;
							this.$Router.back()
						}
					})
				}
				// 修改手机号
				if (this.type == 'phone') {
					if (!this.form.new_mobile) {
						this.$u.toast('手机号不能为空')
						return
					}
					if (!this.form.code) {
						this.$u.toast('验证码不能为空')
						return
					}
					this.loading = true;
					this.$http('member/mobile', this.form, 'post').then(res => {
						this.$u.toast(res.message)
						if (res.code == 10000) {
							this.$u.toast('修改成功')
							this.loading = false;
							this.$Router.back()
						}
					})
				}
				// 修改登录密码
				if (this.type == 'forgetpassword') {
					if (!this.formfor.mobile) {
						this.$u.toast('手机号/邮箱不能为空')
						return
					}
					if (!this.formfor.code) {
						this.$u.toast('验证码不能为空')
						return
					}
					if (!this.formfor.password) {
						this.$u.toast('新密码不能为空')
					}
					if (!this.formfor.password_confirm) {
						this.$u.toast('确认新密码不能为空')
					}
					if (this.formfor.password != this.formfor.password_confirm) {
						this.$u.toast('两次密码输入不一致')
					}
					this.loading = true;
					this.$http('password/forget', this.formfor, 'post').then(res => {
						
						if (res.code == 10000) {
							this.loading = false;
							this.$u.toast('你的密码已修改，请去登陆')
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/public/login'
								})
							}, 1000)
						} else {
							this.loading = false;
							this.$u.toast(res.message)
						}
					})
				}
			},
			
			// 上传图片
			chooseImage() {
				let that = this;
				that.$tools.chooseImage(1).then(res => {
					let tempFilePaths = res[0]
					console.log("--------",tempFilePaths)
					that.$tools.uploadImage('upload/images', tempFilePaths).then(resone => {
						that.userInfo.avatar = resone.filePath
					}).catch(err => {
						console.log(err)
					})
				})
			},
			// 上传图片
			chooseImage1() {
				let that = this;
				that.$tools.chooseImage(1).then(res => {
					let tempFilePaths = res[0]
					console.log("--------",tempFilePaths)
					that.$tools.uploadImage('upload/images', tempFilePaths).then(resone => {
						that.userInfo.wap_cover_address = resone.filePath
					}).catch(err => {
						console.log(err)
					})
				})
			},
			// 验证码
			codehandle1() {
				if (!this.$u.test.mobile(this.form.new_mobile)) {
					uni.showToast({
						icon: 'none',
						title: '手机号不正确'
					});
					return false
				}
				this.codehandles1()
			},
			// 验证码
			codehandle() {
				// if (!this.$u.test.mobile(this.formfor.mobile)) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '手机号不正确'
				// 	});
				// 	return false
				// }
				this.codehandles()
			},
			// plus创建web-view方法
			appCreateVerify() {
				let _this = this
				if (wv) {
					return wv.show()
				}
				var wv = plus.webview.create('', 'custom-webview', {
					'uni-app': 'none',
					background: 'transparent',
					webviewBGTransparent: true
				})
				wv.loadURL('/hybrid/html/awsc-verify.html')
				const currentWebview = this.$scope.$getAppWebview()
				// 此处监听uni.postMessage传递参数  
				// plus.globalEvent.addEventListener('plusMessage', msg => {
				// 	const result = msg.data.args.data
				// 	if (result.name == 'postMessage') {
				// 		_this.codehandles(result.arg)
				// 	}
				// })
				wv.overrideUrlLoading({mode:'reject'}, e => {  
					var params = decodeURI(e.url.split('push?params=')[1])
					let respon = {
						ticket: JSON.parse(params).ticket,
						randstr: JSON.parse(params).randstr
					}
					_this.codehandles(respon)
				})
				currentWebview.append(wv)
			},
			codehandles(respon) {
				var _this = this
				_this.$http('sms/code', { mobile: _this.formfor.mobile, type: 'forget' }, 'get').then(res => {
					if (res.code == 10000) {
						let tiemnum = 60
						_this.codetext = tiemnum
						_this.tiemJudge = false
						uni.showToast({
							icon: 'none',
							title: '验证码已发送'
						});
						let timer = setInterval(() => {
							tiemnum--
							_this.codetext = tiemnum
							if (tiemnum === 0) {
								clearInterval(timer)
								_this.codetext = '获取验证码'
								_this.tiemJudge = true
							}
						}, 1000)
					} else {
						_this.$u.toast(res.message)
					}
				})
			},
			codehandles1(respon) {
				var _this = this
				_this.$http('sms/code', { mobile: _this.form.new_mobile, type: 'change_mobile' }, 'get').then(res => {
					if (res.code == 10000) {
						let tiemnum = 60
						_this.codetext = tiemnum
						_this.tiemJudge = false
						uni.showToast({
							icon: 'none',
							title: '验证码已发送'
						});
						let timer = setInterval(() => {
							tiemnum--
							_this.codetext = tiemnum
							if (tiemnum === 0) {
								clearInterval(timer)
								_this.codetext = '获取验证码'
								_this.tiemJudge = true
							}
						}, 1000)
					} else {
						_this.$u.toast(res.message)
					}
				})
			},
			dontClick() {
				uni.showToast({
					icon: 'none',
					title: '请勿重复获取'
				});
			},
			// 返回
			backhandle() {
				this.$Router.back()
			},
		}
}
</script>

<style lang="scss" scoped>
.container {
	font-size: 36rpx;
	font-weight: 700;
	color: #333333;
	font-weight: bold;

	.more-1 {
		width: 48rpx;
		height: 48rpx;
		margin-top: 10rpx;
	}
}
.pl{
	font-weight: 400;
	font-size: 28rpx;
	text-align: left;
	color: #bebec0;
}
.userInfo-item-u{
	background-color: #fff;
	padding: 20rpx 24rpx;
	font-size: 28rpx;
	color: $textbl;
}
.userInfo-item {
	margin: 20rpx 24rpx 0;
	border-radius: 16rpx;
	&:first-child{
		margin-top: 40rpx;
	}
	
	.userInfo-item-1{
		margin: 20rpx 24rpx 0;
		font-weight: 400;
		font-size: 26rpx;
		color: #666;
	}

	.label {
		font-size: 28rpx;
	}

	text {
		color: #CCCCCC;
	}

	input {
		background-color: #fff;
		padding: 40rpx 24rpx;
		font-size: 28rpx;
	}

	.value {
		.more-img{
			width: 40rpx;
			height: 40rpx;
			display: block;
			image{
				width: 100%;
				height: 100%;
			}
		}
		image {
			width: 88rpx;
			height: 88rpx;
			margin-right: 10rpx;
			border-radius: 50%;
		}
	}
}
.btn {
	width: 92%;
	background: $btnColor;
	color: $btnText;
	border-radius: $btnRadius;
	letter-spacing: 2rpx;
	font-weight: 400;
	font-size: 32rpx;
	margin-top: 80rpx;

	&::after {
		border: 0;
	}
}
.code-row {
	margin-top: 20rpx;
	// width: 100%;
	background-color: #fff;
	input {
		// background-color: #fff;
		padding: 40rpx 24rpx;
		font-size: 28rpx;
	}

	.code {
		white-space: nowrap;
		color: $themeColor;
		margin-right: 24rpx;
		font-size: 28rpx;
	}
}
.cover-img{
	width: 120rpx !important;
	height: 80rpx !important;
	border-radius: 0 !important;
}
</style>
