<template>
	<view class="container">
		<view class="content">
			<view class="title">{{detail.name}}</view>
			<view class="date">{{detail.created_at}}</view>
			<mp-html class="tips" :content="detail.full_text"></mp-html>
			<view class="content-image thumb" v-if="detail.link_text">
				<image :src="detail.link_text.img" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import MpHtml from '@/components/mp-html/mp-html'
	export default {
		components: {
			MpHtml
		},
		data() {
			return {
				detail: null
			}
		},
		onLoad() {
			try{
				this.detail = JSON.parse(uni.getStorageSync('detail'));
			}catch(e){
				//TODO handle the exception
			}
			
		}
	}
</script>

<style lang="scss">
	.container {
		box-sizing: border-box;
	}
	.content {
		width: 100%;
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		.title {
			font-size: 36rpx;
			line-height: 60rpx;
			text-align: center;
		}
		.date {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 24rpx;
			line-height: 40rpx;
			color: #999;
			text-align: center;
		}
		.content-image{
			margin: 20rpx;
			width: 90%;
			
			image{
				width: 100%;
				height: 1100rpx;
			}
		}
	}
	
</style>