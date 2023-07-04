<template>
	<view class="container">
		<u-navbar title="兑换详情" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		
		<view class="header">{{orderList.status_name}}</view>
		
		<view class="box">
			<view class="box-item flex">
				<image :src="detail.goods_image" mode=""></image>
				<view class="right">
					<view class="right1">{{detail.goods_name}}</view>
					<view class="right2">{{detail.price}}DD</view>
				</view>
			</view>
		</view>
		
		<view class="detail">
			<view class="detail-x">
				<view class="detail-header">订单信息</view>
				<view class="detail-cont">
					<view class="detail-cont-c flex-between">
						<view class="detail-cont-c-left">订单编号：</view>
						<view class="detail-cont-c-right">{{orderList.order_no}}</view>
					</view>
					<view class="detail-cont-c flex-between">
						<view class="detail-cont-c-left">支付方式：</view>
						<view class="detail-cont-c-right">{{orderList.pay_type_name}}</view>
					</view>
					<view class="detail-cont-c flex-between">
						<view class="detail-cont-c-left">兑换时间：</view>
						<view class="detail-cont-c-right">{{orderList.paid_at}}</view>
					</view>
					<view class="detail-cont-c flex-between">
						<view class="detail-cont-c-left">发放时间：</view>
						<view class="detail-cont-c-right" v-if="!orderList.received_at">正在发放中</view>
						<view class="detail-cont-c-right" v-else>{{orderList.received_at}}</view>
					</view>
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
				orderList: '',
				detail: ''
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
			this.getDetail()
		},
		onShow() {},

		methods: {
			// 获取商品详情
			getDetail() {
				this.$http('order/' + this.id, {}, 'get').then((res) => {
					this.orderList = res.data || {}
					this.detail = res.data.goods[0]
				}).catch(() => {})
			},
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
	}
	.header{
		margin: 40rpx 32rpx 0;
		font-weight: 700;
		font-size: 40rpx;
		color: $textbl;
		position: relative;
		&::after {
            content:"";
            display: inline-block;
            width: 80rpx;
            height: 6rpx;
			border-radius: 3rpx;
			background: #1b1bdd;
			position: absolute;
			bottom: 0;
			left: 20rpx;
        }
	}
	
	.box{
		margin: 46rpx 24rpx 0;
		border-radius: 16rpx;
		background: #fff;
		.box-item{
			padding: 24rpx;
			
			image{
				width: 160rpx;
				height: 160rpx;
			}
			.right{
				margin-left: 32rpx;
				.right1{
					font-weight: 700;
					height: 88rpx;
					font-size: 32rpx;
					color: $textbl;
				}
				.right2{
					font-weight: 700;
					font-size: 28rpx;
					color: #FF1C41;
					margin-top: 24rpx;
				}
			}
		}
	}
	
	.detail{
		margin: 20rpx 24rpx 0;
		border-radius: 16rpx;
		background: #fff;
		.detail-x{
			padding: 32rpx 24rpx;
			
			.detail-header{
				font-weight: 700;
				font-size: 28rpx;
				color: #333;
			}
			.detail-cont{
				margin-top: 32rpx;
				.detail-cont-c{
					margin-bottom: 24rpx;
					font-weight: 400;
					font-size: 24rpx;
					&:last-child{
						margin-bottom: 0;
					}
					.detail-cont-c-left{
						color: #333;
					}
					.detail-cont-c-right{
						color: #666;
					}
				}
			}
		}
		
	}
</style>
