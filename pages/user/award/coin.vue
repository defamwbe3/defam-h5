<template>
	<view class="container">
		<u-navbar title="DD兑换规则" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="box">
			<mp-html class="tips" :content="list"></mp-html>
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
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				list: []
			}
		},
		onLoad(){
			this.getList()
		},
		onShow() {},
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			// 获取DD兑换规则
			getList(){
				this.$http('agreement', {
					code: 'point',
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.list = res.data
				}).catch(()=>{})
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
		margin: 60rpx 24rpx 0rpx;
		font-weight: 400;
		font-size: 28rpx;
		color: #333;
	}
</style>
