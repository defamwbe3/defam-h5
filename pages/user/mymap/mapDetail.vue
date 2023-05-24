<template>
	<view class="container">
		<u-navbar :title="name" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="header">
			<image :src="detail.image" mode=""></image>
		</view>
		<view class="name">
			<view class="name-1">{{name}}</view>
			<view class="name-2 flex-middle">
				<image src="../../../static/images/cangbaotu.png" mode=""></image>
				<view class="name-2-left text-ellipsis">
					{{receipt}}
				</view>
				<view class="copy" @click="copy(receipt)">
					<image :src="IMG_URL+'me_icon_stick.png'" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 藏宝图详情 -->
		<view class="detail">
			<view class="detail-top">交易信息</view>
			<!-- <view class="detail-img">
				<image :src="detail.image" mode=""></image>
			</view> -->
			<view class="detail-cont">
				<view class="detail-cont-item flex-between">
					<view class="bian">交易编号：</view>
					<view class="sum">{{order_no}}</view>
				</view>
				<view class="detail-cont-item flex-between">
					<view class="bian">兑换时间：</view>
					<view class="sum">{{exchange_time}}</view>
				</view>
				<view class="detail-cont-item flex-between">
					<view class="bian">发放时间：</view>
					<view class="sum">{{provide_time}}</view>
				</view>
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
				id: '',
				name: '',
				receipt: '',
				detail:'',
				exchange_time: '',
				provide_time: '',
				order_no: '',
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.receipt = this.$Route.query.receipt
			this.id = this.$Route.query.id
			this.name = this.$Route.query.name
			this.order_no = this.$Route.query.order_no
			this.provide_time = this.$Route.query.provide_time
			this.exchange_time = this.$Route.query.exchange_time
			this.getDetail();
		},

		methods: {
			// 获取详情接口
			getDetail() {
				this.$http('usermap/detail', {
					map_id: this.id
				}, 'POST').then((res) => {
					uni.stopPullDownRefresh();
					this.detail = res.data
					this.suipianList = res.data.usermap
					// console.log(this.suipianList)
				}).catch(() => {})
			},
			copy(value){
			  //提示模板
			  uni.setClipboardData({
			    data:value,//要被复制的内容
			    success:()=>{//复制成功的回调函数
			      uni.$u.toast('复制成功')
			    }
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
	.header{
		width: 100%;
		height: 750rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.name{
		// height: 118rpx;
		background-color: #fff;
		.name-1{
			padding: 32rpx 24rpx 0;
			font-weight: 700;
			font-size: 36rpx;
			color: $textbl;
		}
		.name-2{
			padding: 20rpx 24rpx 32rpx;
			image{
				width: 40rpx;
				height: 40rpx;
			}
			.name-2-left{
				width: 90%;
				height: 40rpx;
				line-height: 40rpx;
				border-radius: 0 20rpx 20rpx 0;
				background: #f4f4fd;
				font-weight: 700;
				font-size: 22rpx;
				padding-left: 10rpx;
				color: #1b1bdd;
			}
			.copy{
				width: 32rpx;
				height: 32rpx;
				margin-left: 20rpx;
				margin-bottom: 8rpx;
				image{
					width: 100%;
					height: 100%;
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
		// .detail-img{
		// 	padding: 32rpx 24rpx;
		// 	width: 702rpx;
		// 	height: 1200rpx;
		// 	image{
		// 		width: 100%;
		// 		height: 100%;
		// 	}
		// }
		.detail-cont{
			padding: 32rpx 24rpx;
			.detail-cont-item{
				font-weight: 400;
				font-size: 24rpx;
				margin-bottom: 24rpx;
				&:last-child{
					margin-bottom: 0;
				}
				.bian{
					color: #333;
				}
				.sum{
					color: #666;
				}
			}
		}
	}
</style>
