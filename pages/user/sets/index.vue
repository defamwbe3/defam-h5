<template>
	<view class="container">
		<u-navbar title="设置" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="box">
			<view class="box-item flex-middle flex-between" @click.stop="$Router.push('/pages/user/sets/profile')">
				<view>个人信息</view>
				<view class="more-img">
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
			<view class="box-item flex-between" @click="jump('/pages/user/sets/editItem', { type: 'phone' })">
				<view>手机号</view>
				<view class="phone flex-middle">
					<view class="phone-num">{{userInfo.mobile}}</view>
					<view class="more-img">
						<image class="more" :src="IMG_URL+'icon_more.png'"></image>
					</view>
				</view>
			</view>
			<view class="box-item flex-between" @click="jump('/pages/user/sets/editItem', { type: 'forgetpassword' })">
				<view>登录密码</view>
				<view class="more-img">
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
			<view class="box-item flex-between" @click.stop="$Router.push('/pages/user/about')">
				<view>关于我们</view>
				<view class="phone flex-middle">
					<view class="phone-num">v1.0.0</view>
					<view class="more-img">
						<image class="more" :src="IMG_URL+'icon_more.png'"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="out" @click="outLogin">退出登录</view>
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
				userInfo: {},
			}
		},
		onShow() {
			let _this = this;
			userInfo.get(true).then(res => {
				_this.userInfo = res;
				// console.log(_this.userInfo)
			}).catch(() => { })
		},

		methods: {
			outLogin(){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '您确定要退出登录嘛？',
					success: function (res) {
						if (res.confirm) {
							uni.removeStorageSync('token');
							uni.removeStorageSync('userInfo')
							_this.$u.toast('退出成功');
							_this.$Router.replace({
								path: '/pages/public/login'
							})
						}
					}
				})		
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
.box{
	margin: 40rpx 24rpx 0;
	.box-item{
		padding: 40rpx 32rpx;
		font-weight: 700;
		font-size: 28rpx;
		color: $textbl;
		border-radius: 16rpx;
		background: #fff;
		margin: 20rpx 0 0;
		.phone{
			.phone-num{
				font-weight: 400;
				font-size: 28rpx;
				color: #bebec0;
				margin-right: 16rpx;
			}
		}
		.more-img{
			width: 40rpx;
			height: 40rpx;
			display: block;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.out{
	margin: 80rpx 24rpx 0;
	border-radius: 16rpx;
	padding: 28rpx 0rpx;
	background-color: #fff;
	font-weight: 700;
	font-size: 32rpx;
	text-align: center;
	color: #1b1bdd;
}
</style>
