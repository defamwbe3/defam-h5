<template>
	<view class="container">
		<u-navbar title="消息" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="box">
			<view class="box-item flex-between" @click.stop="$Router.push({path:'/pages/user/news/details',query:{type: 'good'}})">
				<view class="box-item-left flex-middle">
					<view class="box-item-left-image">
						<image :src="IMG_URL+'xx_icon_zan.png'" mode=""></image>
						<view class="reddian" v-if="userinfo.is_zan == '1'"></view>
					</view>
					<view class="box-item-left-name">赞了我</view>
				</view>
				<image class="more" :src="IMG_URL+'icon_more.png'"></image>
			</view>
			<!-- 'good'=&gt;点赞,'reply=&gt;回复','follow'=&gt;关注, -->
			<view class="box-item flex-between" @click.stop="$Router.push({path:'/pages/user/news/details',query:{type: 'reply'}})">
				<view class="box-item-left flex-middle">
					<view class="box-item-left-image">
						<image :src="IMG_URL+'xx_icon_pl.png'" mode=""></image>
						<view class="reddian" v-if="userinfo.is_reply == '1'"></view>
					</view>
					<view class="box-item-left-name">评论回复</view>
				</view>
				<image class="more" :src="IMG_URL+'icon_more.png'"></image>
			</view>
			<view class="box-item flex-between" @click.stop="$Router.push({path:'/pages/user/news/details',query:{type: 'follow'}})">
				<view class="box-item-left flex-middle">
					<view class="box-item-left-image">
						<image :src="IMG_URL+'xx_icon_gz.png'" mode=""></image>
						<view class="reddian" v-if="userinfo.is_attention == '1'"></view>
					</view>
					<view class="box-item-left-name">关注了我</view>
				</view>
				<image class="more" :src="IMG_URL+'icon_more.png'"></image>
			</view>
			<view class="box-item flex-between" @click.stop="$Router.push({path:'/pages/user/news/details',query:{type: 'auth'}})">
				<view class="box-item-left flex-middle">
					<view class="box-item-left-images flex-center">
						<image :src="IMG_URL+'common_iocn_lingdang.png'" mode=""></image>
						<view class="reddians" v-if="userinfo.is_platform == '1'"></view>
					</view>
					<view class="box-item-left-name">平台通知</view>
				</view>
				<image class="more" :src="IMG_URL+'icon_more.png'"></image>
			</view>
		</view>
	</view>
</template>

<script>
import { userInfo } from '@/engine/storage';
	export default {
		components: {

		},
		data() {
			return {
				userinfo: '',
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
			}
		},
		onShow() {
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
		},

		methods: {
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
	margin: 20rpx 24rpx 0;
	
	.box-item{
		padding: 20rpx 24rpx;
		border-radius: 16rpx;
		background: #fff;
		margin-bottom: 12rpx;
		
		.box-item-left{
			.box-item-left-image{
				width: 80rpx;
				height: 80rpx;
				image{
					width: 100%;
					height: 100%;
				}
				.reddian{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: red;
					color: red;
					position: relative;
					top:-76rpx;
					left: 60rpx;
				}
			}
			.box-item-left-images{
				width: 80rpx;
				height: 80rpx;
				background-color: #FAFAFE;
				border-radius: 50%;
				image{
					width: 48upx;
					height: 48upx;
				}
				.reddians{
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: red;
					color: red;
					position: relative;
					top:-26rpx;
					left: 0rpx;
				}
			}
			.box-item-left-name{
				font-weight: 700;
				font-size: 32rpx;
				color: #333;
				margin-left: 24rpx;
			}
		}
		.more {
		    display: block;
		    width: 40rpx;
		    height: 40rpx;
		}
	}
}
</style>
