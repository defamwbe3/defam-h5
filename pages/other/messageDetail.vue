<template>
	<view class="container">
		<view class="content" v-if="detail">
			<view class="title">{{ detail.title }}</view>
			<view class="date">{{ detail.created_at }}</view>
			<mp-html class="tips" :content="detail.content"></mp-html>
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
		try {
			this.detail = JSON.parse(uni.getStorageSync('detail'));
		} catch (e) {
			//TODO handle the exception
		}

	}
}
</script>

<style lang="scss">
.container {
	box-sizing: border-box;
	padding: 30rpx;
}

.content {
	width: 100%;
	min-height: calc(100vh - 60rpx - 44px);
	box-sizing: border-box;
	padding: 30rpx;
	background: #fff;

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
		color: $secondFontColor;
		text-align: center;
	}
}
</style>