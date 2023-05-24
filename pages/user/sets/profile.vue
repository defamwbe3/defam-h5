<template>
	<view class="container">
		<u-navbar title="个人信息" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="box">
			<view class="box-item flex-between"  @click="jump('/pages/user/sets/editItem', { type: 'avatar' })">
				<view class="box-item-left">头像</view>
				<view class="box-item-right flex-middle">
					<image class="img1" v-if="userInfo.avatar!=''" :src="userInfo.avatar" mode=""></image>
					<image v-else class="img1" src="../../../static/images/avatar.png" mode=""></image>
					<image class="img2" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
			<view class="box-item flex-between"  @click="jump('/pages/user/sets/editItem', { type: 'nickname' })">
				<view class="box-item-left">昵称</view>
				<view class="box-item-right flex-middle">
					<view class="nickname">{{userInfo.nickname}}</view>
					<image class="img2" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
		</view>
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
			border-radius: 16rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			&:first-child{
				padding: 20rpx 32rpx;
			}
			.box-item-left{
				font-weight: 700;
				font-size: 28rpx;
				color: $textbl;
			}
			.box-item-right{
				.img1{
					display: block;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 16rpx;
				}
				.nickname{
					font-weight: 400;
					font-size: 28rpx;
					color: #bebec0;
					margin-right: 16rpx;
				}
				.img2{
					display: block;
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
	}
</style>
