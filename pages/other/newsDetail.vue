<template>
	<view class="container">
		<view class="content" v-if="detail">
			<view class="title">{{detail.title}}</view>
			<view class="date">{{detail.created_at}}</view>
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
				detail: null,
				id: 0
			}
		},
		onLoad() {
			try{
				this.id = this.$Route.query.id;
				this.getDetail()
			}catch(e){
				//TODO handle the exception
			}
		},
		methods: {
			getDetail() {
				uni.showLoading()
				this.$http('noticeInfo', {id: this.id}, 'post').then(res=>{
					uni.hideLoading()
					if (res.code == 10000) {
						this.detail = res.data
						if (res.data) {
							uni.setNavigationBarTitle({
								title: res.data.title
							})
						}
					} else {
						this.$u.toast(err.message)
					}
				})
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
		background: #333;
		.title {
			font-size: 30rpx;
			line-height: 60rpx;

			color: $textwhite;
		}
		.date {
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			font-size: 24rpx;
			line-height: 40rpx;
			color: $secondFontColor;
			// text-align: center;
		}
	}
	
</style>