<template>
	<view class="support-box">
		<view class="support" v-if="showSupport">
			<image src="/static/images/copyright-img.png" mode=""></image> |
			<text class="text">提供技术支持</text>
		</view>
		<!-- copyright -->
		<view class="copyright flex flex-wrap items-center justify-center" v-if="copyright">
			<view class="beian"
				@click.stop="handleToOuter('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + copyright.number)">
				{{ copyright.security }}</view>
		</view>
		<view class="copyright flex flex-wrap items-center justify-center" v-if="copyright && copyright.number">
			<image src="/static/images/gongshang.gif" class="icon" mode="" @click.stop="handleToOuter(copyright.url)">
			</image>
			<image src="/static/images/gongan.png" class="icon" mode=""
				@click.stop="handleToOuter('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + copyright.number)">
			</image>
			<view class="beian"
				@click.stop="handleToOuter('http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' + copyright.number)">
				{{ copyright.number }}号</view>
			
		</view>
		<view class="copyright flex flex-wrap items-center justify-center" v-if="copyright">
			<view class="beian" @click.stop="handleToOuter('https://beian.miit.gov.cn')">{{ copyright.record }}</view>
			<view class="beian">{{ copyright.copyright }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: ['copyright', 'showSupport'],
	methods: {
		handleToOuter(url) {
			// 跳转外部链接
			window.location.href = url;
		}
	}
}
</script>

<style lang="scss">
.support-box{
	margin: 260rpx auto 42rpx;
}
.support {
	
	margin-bottom: 20rpx;
	font-size: 28rpx;
	font-weight: bold;
	color: $secondFontColor;
	line-height: 36rpx;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;

	image {
		width: 158rpx;
		height: 39rpx;
		margin-right: 16rpx;
	}

	.text {
		margin-left: 16rpx;
		font-size: 24rpx;
		color: $secondFontColor;
	}
}

.copyright {
	line-height: 46rpx;
	color: $secondFontColor;
	font-size: 24rpx;

	.icon {
		margin: 0 12rpx;
		width: 32rpx;
		height: 32rpx;
	}

	.beian {
		margin: 0 12rpx;
	}
}
</style>