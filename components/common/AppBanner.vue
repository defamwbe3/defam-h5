<template>
	<view class="swiper-banner">
		<!-- <swiper :class="[ previousMargin!=0? 'swiper-container' : 'swiper-containers']" :autoplay="config.autoplay" :circular="config.circular" :previous-margin="previousMargin"
		 :next-margin="nextMargin" @change="swiperBannerChange">
			<swiper-item @click="handleBannerClick(item)" class="swiper-item" v-for="(item, index) in bannerList" :key="index">
				<image :class="['slide-image',bannerIndex === index ? 'active' : '']"
					lazy-load class="thumb" mode="aspectFill" :src="item.image" />
			</swiper-item>
		</swiper>
		<view class="swiper-dots flex">
			<view class="dots am-ease" :class="bannerIndex == index ? 'cur' : ''" v-for="(item, index) in bannerList"
				:key="index"></view>
		</view> -->
		<u-swiper :list="bannerList" @change="e => config.current = e.current" :autoplay="true" circular keyName="image" showTitle>
			<view slot="indicator" class="indicator">
				<view class="indicator__dot" v-for="(item, index) in bannerList" :key="index"
					:class="[index === config.current && 'indicator__dot--active']">
				</view>
			</view>
		</u-swiper>
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
				},
				
			}
		},
		props: ['bannerList', 'previousMargin', 'nextMargin'],
		methods: {
			swiperBannerChange(e) { // banner轮播切换
				this.bannerIndex = e.detail.current
			},
			handleBannerClick(item) { // 处理banner点击
				if (item.jump_url) {
					this.$tools.routerTo(item.jump_url)
				}
			},
		}
	}
</script>

<style lang="scss">
	.swiper-banner {
		position: relative;
		z-index: 2;
		margin: 0 16rpx;
		padding-top: 20upx;


		.indicator {
			@include flex(row);
			justify-content: center;

			&__dot {
				height: 3px;
				width: 12px;
				background-color: rgba(255, 255, 255, 0.35);
				margin: 0 5px;
				transition: background-color 0.3s;

				&--active {
					background-color: #ffffff;
				}
			}
		}

		.indicator-num {
			padding: 2px 0;
			background-color: rgba(0, 0, 0, 0.35);
			border-radius: 100px;
			width: 35px;
			@include flex;
			justify-content: center;

			&__text {
				color: #FFFFFF;
				font-size: 12px;
			}
		}
		/deep/ .u-swiper__indicator{
			left: 20rpx;
		}
		/deep/ .u-swiper__wrapper__item__wrapper__title{
			background: none;
			padding-left: 30rpx;
			bottom: 12px;
			
		}
		/deep/ .u-swiper__wrapper__item__wrapper__image{
			border-radius: 0 !important;
		}
		/deep/ .u-swiper{
			border-radius: 0 !important;
		}


		// .swiper-container {
		// 	height: 350rpx;
		// 	overflow: hidden;
		// 	border-radius: 16upx;
		// 	.swiper-item {
		// 		display: flex;
		// 		flex-direction: column;
		// 		justify-content: center;
		// 		align-items: flex-start;
		// 		overflow: unset;		
		// 		.slide-image {
		// 			height: 280rpx;
		// 			width: 100%;
		// 			z-index: 1;
		// 			border-radius: 16upx;
		// 		}		
		// 		.active{
		// 			width: 96%;
		// 			height: 350rpx;
		// 			margin: 0 auto;
		// 			border-radius: 16upx;
		// 		}
		// 	}
		// }
		// .swiper-containers {
		// 	height: 364rpx;
		// 	overflow: hidden;
		// 	border-radius: 16upx;
		// 	padding: 0 8upx;
		// 	.swiper-item {
		// 		display: flex;
		// 		flex-direction: column;
		// 		justify-content: center;
		// 		align-items: flex-start;
		// 		overflow: unset;		
		// 		.slide-image {
		// 			height: 364rpx;
		// 			width: 100%;
		// 			z-index: 1;
		// 			border-radius: 16upx;
		// 		}
		// 	}		
		// }
		// // .active {
		// // 	transform: scale(1.14);
		// // 	transition: all 0.2s ease-in 0s;
		// // 	z-index: 20;
		// // 	// border-radius: 28rpx;
		// // }
		// .swiper-dots {
		// 	position: absolute;
		// 	left: 50%;
		// 	bottom: -32rpx;
		// 	transform: translateX(-50%);
		// 	z-index: 1;
		// 	.dots {
		// 		width: 12rpx;
		// 		height: 12rpx;
		// 		background: #C8CAF0;
		// 		margin: 0 4rpx;
		// 		border-radius: 50%;
		// 		&.cur {
		// 			background: #1B1BDD;
		// 		}
		// 	}
		// }
	}
</style>