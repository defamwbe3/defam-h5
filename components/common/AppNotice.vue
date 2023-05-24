<template>
	<view class="notice-section">
		<view class="notice-box flex-middle" @click.stop="$Router.push({ path: '/pages/other/messageList' })">
			<image class="left" :src="IMG_URL+'common_iocn_lingdang.png'"></image>
			<view class="right">
				<swiper class="swiper-container" :vertical="config.vertical" :autoplay="config.autoplay"
					:circular="config.circular" :interval="config.interval" :duration="config.duration"
					@change="swiperBannerChange">
					<swiper-item class="swiper-item" v-for="(item, index) in noticeList" :key="index">
						<view class="slide text-ellipsis">{{ item.title }}</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="swiper-dots flex" v-if="false">
				<view class="dots am-ease" :class="bannerIndex == index ? 'cur' : ''"
					v-for="(item, index) in noticeList" :key="index"></view>
			</view>
			<!-- <image class="more" src="/static/images/more.png"></image> -->
		</view>
	</view>

</template>

<script>
export default {
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			bannerIndex: 0,
			config: {
				vertical: true,
				autoplay: true,
				circular: true,
				interval: 5000,
				duration: 500
			}
		}
	},
	props: ['noticeList'],
	methods: {
		swiperBannerChange(e) { // banner轮播切换
			this.bannerIndex = e.detail.current
		},
		toLink(path) {
			if (path) {
				this.$tools.routerTo(path)
			}
		}
	}
}
</script>

<style lang="scss">
.notice-section {
	margin: 60rpx 30rpx 0;
}

.notice-box {
	margin-top: 20rpx;
	position: relative;
	height: 70rpx;
	box-sizing: border-box;
	padding: 0 20rpx;
	overflow: hidden;
	background: rgba(27,27,221,0.1);
	border-radius: 16upx;
	overflow: hidden;
	.left {
		display: block;
		width: 34rpx;
		height: 34rpx;
		margin-right: 20rpx;
	}

	.right {
		flex: 1;
		box-sizing: border-box;
		overflow: hidden;
	}
	.more {
		display: block;
		width: 28rpx;
		height: 26rpx;
		margin-left: 12rpx;
	}

	.swiper-container,
	.swiper-item {
		height: 66rpx;
		text-align: left;
	}

	.slide {
		height: 66rpx;
		font-size: 26rpx;
		line-height: 66rpx;
		color: #1B1BDD;
	}

	.swiper-dots {
		position: absolute;
		left: 50%;
		bottom: 12rpx;
		transform: translateX(-50%);
		z-index: 1;

		.dots {
			width: 50rpx;
			height: 4rpx;
			background: #60686B;
			margin: 0 8rpx;

			&.cur {
				width: 50rpx;
				background: #BEA35D;
			}
		}
	}
}
</style>
