<template>
	<view class="container">
		<u-navbar :title="name" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		
		<view class="header">
			<image :src="detail.image" mode=""></image>
		</view>
		<view class="name">
			<view class="name-1">{{detail.name}}</view>
			<view class="name-2 flex">
				<view class="name-2-left text-ellipsis">
					已兑: {{detail.sale_num}}
				</view>
			</view>
		</view>
		
		<!-- 兑换条件 -->
		<view class="criteria">
			<view class="criteria-top">兑换条件</view>
			<view class="criteria-cont">
				<view class="box-1 flex-between flex-wrap">
					<view class="box-item" v-for="(item,index) in suipianList" :key="index">
						<image :src="item.image" mode=""></image>
						<view class="box-item-num">X{{item.number}}</view>
						<view class="item-name">{{item.name}}</view>
						<view class="item-name2">兑换需要 x{{item.value}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 藏宝图详情 -->
		<view class="detail">
			<view class="detail-top">藏宝图详情</view>
			<view class="detail-img">
				<image :src="detail.image" mode=""></image>
			</view>
			<view class="detail-bottom flex-between">
				<view class="detail-bottom-1">可兑换</view>
				<view class="detail-bottom-2" @click="coin">立即兑换</view>
			</view>
		</view>
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
				detail: '',
				id: '',
				name: '',
				links: '3582',
				suipianList: [],
				fragment_ids: ''
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
			this.name = this.$Route.query.name
			uni.setNavigationBarTitle({
				title: this.name
			})
		},
		onShow() {
			this.getDetail();
		},
		onPullDownRefresh() {
			this.getDetail();
		},
		methods: {
			// 获取详情接口
			getDetail() {
				this.$http('usermap/newdetail', {
					map_id: this.id
				}, 'POST').then((res) => {
					uni.stopPullDownRefresh();
					this.detail = res.data
					this.suipianList = res.data.synthesis_needed
					// console.log(this.suipianList)
				}).catch(() => {})
			},
			// 点击立即兑换接口
			coin(){
				this.$http('usermap/newexchange', {
					map_id: this.id
				}, 'POST').then((res) => {
					let _this = this
					setTimeout(()=>{
						_this.$u.toast(res.message)
					})
				}).catch(() => {})
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
	
	.header{
		width: 100%;
		height: 750rpx;
		image{
			width: 100%;
			height: 750rpx;
		}
	}
	.name{
		height: 168rpx;
		background-color: #fff;
		.name-1{
			padding: 32rpx 24rpx 0;
			font-weight: 700;
			font-size: 36rpx;
			color: $textbl;
		}
		.name-2{
			padding: 20rpx 24rpx 32rpx;
			.name-2-left{
				font-weight: 400;
				font-size: 24rpx;
				color: #999;
			}
		}
	}
	
	// 兑换条件
	.criteria{
		background: #fff;
		margin-top: 20rpx;
		.criteria-top{
			padding: 32rpx 0rpx 31rpx;
			margin: 0 24rpx;
			border-bottom: 1px solid #f0f1f9;
			font-weight: 700;
			font-size: 32rpx;
			color: $textbl;
		}
		.criteria-cont{
			padding: 32rpx 0rpx;
			.box-1{
				margin: 0 24rpx;
				.box-item{
					width: 340rpx;
					height: 470rpx;
					border-radius: 16rpx;
					background-color: #fafafe;
					margin-bottom: 22rpx;
					position: relative;
					image{
						width: 340rpx;
						height: 340rpx;
						border-radius: 16rpx;
					}
					.box-item-num{
						position: absolute;
						top: 20rpx;
						right: 20rpx;
						padding: 2rpx 22rpx;
						border-radius: 16rpx;
						background: #000;
						opacity: 0.5;
						font-weight: 400;
						font-size: 22rpx;
						text-align: center;
						color: #fff;
					}
					.item-name{
						padding: 20rpx 24rpx 0;
						font-weight: 700;
						font-size: 32rpx;
						// text-align: center;
						color: #222;
					}
					.item-name2{
						padding: 8rpx 24rpx 0;
						font-weight: 400;
						font-size: 24rpx;
						color: #999;
					}
				}
			}
		}
	}
	
	.detail{
		background: #fff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		.detail-top{
			padding: 32rpx 0rpx 31rpx;
			margin: 0 24rpx;
			border-bottom: 1px solid #f0f1f9;
			font-weight: 700;
			font-size: 32rpx;
			color: $textbl;
		}
		.detail-img{
			padding: 32rpx 24rpx 0;
			width: 702rpx;
			height: 1200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-bottom{
			padding: 24rpx 32rpx;
			.detail-bottom-1{
				font-weight: 700;
				font-size: 36rpx;
				color: $textbl;
			}
			.detail-bottom-2{
				width: 280rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 40rpx;
				background: $btnColor;
				font-weight: 400;
				font-size: 32rpx;
				color: #fff;
			}
		}
	}
</style>
