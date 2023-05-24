<template>
	<view class="swiper-banner">
		<swiper :class="[ previousMargin!=0? 'swiper-container' : 'swiper-containers']" :autoplay="config.autoplay" :circular="config.circular" :previous-margin="previousMargin"
		 :next-margin="nextMargin" @change="swiperBannerChange">
			<swiper-item @click="handleBannerClick(item)" class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<image :class="['slide-image',bannerIndex === index ? 'active' : '']"
					lazy-load class="thumb" mode="aspectFill" :src="item.image" />
			</swiper-item>
		</swiper>
		<view class="swiper-dots flex">
			<view class="dots am-ease" :class="bannerIndex == index ? 'cur' : ''" v-for="(item, index) in bannerList"
				:key="index"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			bannerIndex: 0,
			config: {
				autoplay: true,
				circular: true,
				interval: 5000,
				duration: 500,
				previousMargin: '100rpx',
				nextMargin: '40rpx',
				current: 0
			}
		}
	},
	props: ['bannerList','previousMargin','nextMargin'],
	methods: {
		swiperBannerChange(e) { // banner轮播切换
			this.bannerIndex = e.detail.current
		},
		handleBannerClick(item) { // 处理banner点击
			if (item.path) {
				this.$tools.routerTo(item.path)
			}
		},
	}
}
</script>

<style lang="scss">
.swiper-banner {
	position: relative;
	z-index: 2;
	margin: 20rpx 16rpx 0;
	.swiper-container {
		height: 344rpx;
		overflow: hidden;
		border-radius: 16upx;
		.swiper-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			overflow: unset;		
			.slide-image {
				height: 280rpx;
				width: 100%;
				z-index: 1;
				border-radius: 16upx;
			}		
			.active{
				width: 96%;
				height: 344rpx;
				margin: 0 auto;
				border-radius: 16upx;
			}
		}
	}
	.swiper-containers {
		height: 364rpx;
		overflow: hidden;
		border-radius: 16upx;
		padding: 0 8upx;
		.swiper-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			overflow: unset;		
			.slide-image {
				height: 364rpx;
				width: 100%;
				z-index: 1;
				border-radius: 16upx;
			}
		}		
	}
	// .active {
	// 	transform: scale(1.14);
	// 	transition: all 0.2s ease-in 0s;
	// 	z-index: 20;
	// 	// border-radius: 28rpx;
	// }
	.swiper-dots {
		position: absolute;
		left: 50%;
		bottom: 20rpx;
		transform: translateX(-50%);
		z-index: 1;
		.dots {
			width: 32rpx;
			height: 2rpx;
			background-color:rgba(100, 100, 100, 0.5);
			margin: 0 8rpx;
			&.cur {
				background: #FFF;
			}
		}
	}
}
</style>
