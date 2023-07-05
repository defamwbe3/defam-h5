<template>
	<view class="container">
		<u-navbar title="DD集市" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
			<!-- #ifdef H5 -->
			<view slot="right" @click="$Router.push({path: '/pages/user/integral/countter'})">
				<view class="nav-btn">兑换记录</view>
			</view>
			<!-- #endif -->
		</u-navbar>
		<!-- 轮播图 -->
		<AppBanner :bannerList="bannerList" previousMargin="0" nextMargin="0"></AppBanner>
		<!-- 热门兑换 -->
		<view class="duihuan">热门兑换</view>
		
		<view class="box"
		<!-- #ifdef MP-WEIXIN -->
			style="padding-bottom: 70px"
		<!-- #endif -->
		>
			<view class="box-1 flex-between flex-wrap">
				<view class="box-item" v-for="(item,index) in suipianList" :key="index" @click="jump('/pages/user/integral/integralDetail',{id: item.id})">
					<image :src="item.image" mode=""></image>
					<view class="item-name flex-between">
						<view class="item-name1">{{item.price}}DD</view>
						<view class="item-name2">已兑:{{item.sale_num}}</view>
					</view>
					<view class="item-title much-ell-two">{{item.name}}</view>
				</view>
			</view>
			<engine-empty v-if="!suipianList.length" :tipText="'暂无兑换列表信息'"></engine-empty>
		</view>
		
		<!-- 适配小程序 -->
		<!-- #ifdef MP-WEIXIN -->
			<view class="fined" @click="$Router.push({path: '/pages/user/integral/countter'})">兑换记录</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import AppBanner from './components/banner.vue';
	export default {
		components: {
			AppBanner,
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				page: 1,
				hasNext: false,
				loadStatus: 'loadmore',
				suipianList: [],
				bannerList: [],
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.page = 1
			this.getBannerList()
			this.getHotList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getHotList();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.getHotList();
			}
		},
		methods: {
			// 获取轮播图列表
			getBannerList(){
				this.$http('banner', {is_page: 0,code: 'shop'}, 'get').then((res) => {
					this.bannerList = res.data
				}).catch(()=>{})
			},
			// 获取热门兑换列表
			getHotList(){
				this.$http('goods', {
					is_page: this.page
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.suipianList = this.page == 1 ? newData.data : [...this.suipianList, ...newData.data];
				}).catch(()=>{})
			},
			// 返回
			backhandle() {
				this.$Router.back()
			},
			// 跳转
			jump(path, query) {
				this.$Router.push({
					path: path,
					query: query
				})
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

		.more {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;

		}

		.nav-btn {
			font-size: 30rpx;
			color: #333333;
		}
	}
	
	.box-bg{
		width: 702rpx;
		height: 280rpx;
		border-radius: 16rpx;
		background-color: yellow;
		margin: 20rpx auto 0;
	}
	.duihuan{
		margin: 60rpx 24rpx 0;
		font-weight: 700;
		font-size: 36rpx;
		color: $textbl;
	}
	
	.box{
		margin: 40rpx 24rpx;
		.box-1{
			.box-item{
				width: 340rpx;
				height: 528rpx;
				border-radius: 16rpx;
				background: #fff;
				margin-bottom: 22rpx;
				position: relative;
				image{
					width: 340rpx;
					height: 340rpx;
					border-radius: 16rpx;
				}
				// .box-item-num{
				// 	position: absolute;
				// 	top: 20rpx;
				// 	right: 20rpx;
				// 	padding: 2rpx 22rpx;
				// 	border-radius: 16rpx;
				// 	background: #000;
				// 	opacity: 0.5;
				// 	font-weight: 400;
				// 	font-size: 22rpx;
				// 	text-align: center;
				// 	color: #fff;
				// }
				.item-name{
					padding: 24rpx 20rpx 0;
					.item-name1{
						font-weight: 700;
						font-size: 32rpx;
						color: #ff1c41;
					}
					.item-name2{
						font-weight: 400;
						font-size: 24rpx;
						color: #999;
					}
				}
				.item-title{
					padding: 20rpx 20rpx 24rpx;
					font-weight: 700;
					font-size: 28rpx;
					color: $textbl;
				}
			}
		}
	}
	.fined{
		margin: 0 24rpx;
		padding: 22rpx 286rpx;
		border-radius: 44px;
		font-weight: 400;
		font-size: 32rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(320.28deg, #01c8e5 0%, #f177c1 100%);
		box-shadow: 0 6px 32px rgba(1, 200, 229, 0.2);
		position: fixed;
		bottom: 64rpx;
	}
</style>
