<template>
	<view class="container">
		<u-navbar title="藏宝图兑换" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
			<!-- #ifdef H5 -->
			<view slot="right" @click="$Router.push({path: '/pages/user/treasuremap/counter'})">
				<view class="nav-btn">兑换记录</view>
			</view>
			<!-- #endif -->
		</u-navbar>

		<view class="box">
			<view class="box-1 flex-between flex-wrap">
				<view class="box-item" v-for="(item,index) in list" :key="index"
					@click="jump('/pages/user/treasuremap/treasureDetail',{id: item.id,name: item.name})">
					<image :src="item.image" mode=""></image>
					<view class="item-name">{{item.name}}</view>
				</view>
			</view>
		</view>
		
		<!-- 适配小程序 -->
		<!-- #ifdef MP-WEIXIN -->
			<view class="fined" @click="$Router.push({path: '/pages/user/treasuremap/counter'})">兑换记录</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				list: [{
						id: 1,
						image: this.$IMG_URL + 'activity-img.png',
						name: '国潮插画系列'
					},
					{
						id: 2,
						image: this.$IMG_URL + 'activity-img.png',
						name: '中西方文化交融'
					},
					{
						id: 3,
						image: this.$IMG_URL + 'activity-img.png',
						name: '国潮插画系列9999'
					}
				]
			}
		},
		onLoad() {
			
		},
		onShow() {},

		methods: {
			// 返回
			backhandle() {
				this.$Router.back()
			},
			// 跳转
			jump(path, query) {
				this.$Router.push({
					path: path,
					query: query
				})
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

		.more {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;

		}

		.nav-btn {
			font-size: 30rpx;
			color: #333333;
		}
	}

	.box {
		margin: 40rpx 24rpx 0;

		.box-1 {
			.box-item {
				width: 340rpx;
				height: 432rpx;
				border-radius: 16rpx;
				background: #fff;
				margin-bottom: 22rpx;

				image {
					width: 340rpx;
					height: 340rpx;
					border-radius: 16rpx 16rpx 0 0;
				}

				.item-name {
					padding: 20rpx 24rpx;
					font-weight: 700;
					font-size: 32rpx;
					color: #222;
				}
			}
		}
	}
	.fined{
		margin: 0 24rpx;
		padding: 22rpx 286rpx;
		border-radius: 44px;
		font-weight: 400;
		font-size: 32rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(320.28deg, #01c8e5 0%, #f177c1 100%);
		box-shadow: 0 6px 32px rgba(1, 200, 229, 0.2);
		position: fixed;
		bottom: 64rpx;
	}
</style>
