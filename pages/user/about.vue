<template>
	<!-- 关于我们 -->
	<view class="container">
		<u-navbar title="关于我们" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="about">
			<view class="logo">
				<image :src="company_logo" mode="aspectFill" class="thumb"></image>
			</view>
			<view class="title">{{company_name}}</view>
			<view class="edition">V{{edition}}</view>
			<view class="row" @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type:'user_service'}})">
				<view class="row-title">《用户服务协议》</view>
				<view class="more-img">
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
			<view class="row" @click.stop="$Router.push({path: '/pages/other/singlePage', query: {type: 'private'}})">
				<view class="row-title">《用户隐私政策》</view>
				<view class="more-img">
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			IMG_URL: this.$IMG_URL,
			bgColor: '#FAFAFE',
			company_name: '',
			company_logo: '',
			edition: '1.0.0',
			kefuinfo: {}
		}
	},
	onLoad() {
		this.getConfig();
	},
	methods: {
		getConfig() {
			let app = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			this.$http('config', {
				module: 'basic',
				key: ''
			}, 'GET').then((res) => {
				uni.hideLoading();
				if(res.code==10000){
					let newData = res.data;
					app.company_name = newData.name;
					app.company_logo = newData.logo;
					if(newData.version) {
						app.edition = newData.version.versionCode
					}
				}else{
					this.$u.toast(res.message)
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
.about{
	text-align: center;
	color: $textblack;
	padding-top: 60rpx;
	position: relative;
	z-index: 9;
	.logo{
		width: 160rpx;
		height: 160rpx;
		border-radius: 32rpx;
		margin: 0 auto;
		overflow: hidden;
		.thumb {
			width: 100%;
			height: 100%;
		}
	}
	.title{
		font-size: 40rpx;
		margin: 20rpx 0 0;
		color: #222;
	}
	.edition{
		color: #666;
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-bottom: 80rpx;
	}
	.row{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 86%;
		margin: 0 auto;
		background: #fff;
		border-radius: 16rpx;
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
		
		.row-title{
			font-weight: 700;
			font-size: 28rpx;
			color: #333;
		}
		.more-img{
			width: 40rpx;
			height: 40rpx;
			display: block;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
