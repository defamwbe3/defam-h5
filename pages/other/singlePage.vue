<template>
	<view class="container">
		<view class="content">
			<mp-html class="tips" :content="detail"></mp-html>
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
				type: '',
				title: '',
				detail: ''
			}
		},
		onLoad() {
			this.type = this.$Route.query.type;
			switch (this.type) {
				case 'user_service':
					uni.setNavigationBarTitle({
						title: '《用户服务政策》'
					})
					break
				case 'private':
					uni.setNavigationBarTitle({
						title: '《隐私政策》'
					})
					break
				case 'about_us':
					uni.setNavigationBarTitle({
						title: '《关于我们》'
					})
					break
				case 'register':
					uni.setNavigationBarTitle({
						title: '《注册协议》'
					})
					break
			}
			
			this.loadData();
		},
		methods: {
			// 获取数据
			loadData() {
				let app = this;
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				this.$http('agreement', {
					code: app.type == 'user_service'?'user_service':app.type == 'private'?'private':app.type == 'about_us'?'about_us':'point'
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					uni.hideLoading();
					if(res.code==10000){
						if(app.type == 'user_service') {
							app.detail = res.data
						} else if (app.type == 'private') {
							app.detail =  res.data
						} else if (app.type == 'about_us'){
							app.detail =  res.data.about_us
						} else if (app.type == 'register'){
							app.detail =  res.data
						}
					
					}else{
						this.$u.toast(res.message)
					}				
				});
			},
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
	min-height: calc(100vh - 60rpx);
	box-sizing: border-box;
	padding: 30rpx;
	background: #fff;

	.title {
		font-size: 32rpx;
		line-height: 60rpx;
		text-align: center;
		color: $textwhite;
	}
}
</style>