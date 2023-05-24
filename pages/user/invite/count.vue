<template>
	<view class="container">
		<u-navbar title="邀请记录" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="box">
			<view class="box-item flex-between"  v-for="(item,index) in list" :key="index">
				<view class="item-left flex">
					<view class="item-avart">
						<image :src="item.avatar" mode=""></image>
					</view>
					<view class="left-name">
						<view class="left-name-1">{{item.nickname}}</view>
						<view class="left-name-2">{{item.created_at}}</view>
					</view>
				</view>
				<view class="right-img">
					<image :src="IMG_URL+ 'icon_more.png'" mode=""></image>
				</view>
			</view>
		</view>
		<engine-empty v-if="!list.length" :tipText="'暂无邀请记录'"></engine-empty>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				IMG_URL: this.$IMG_URL,
				bgColor:'#FAFAFE',
				list: [],
			}
		},
		onLoad(){
			this.getList();
		},
		onShow() {},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
		},
		methods: {
			// 返回
			backhandle() {
				this.$Router.back()
			},
			getList() {
				this.$http('member/group', {
					page: this.page,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
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
		position: relative;

		.more{
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;
			
		}
		.nav-btn{
			font-size: 30rpx;
			color: #333333;
		}
	}
	.box{
		margin: 40rpx 24rpx;
		.box-item{
			padding: 24rpx;
			background-color: #fff;
			border-radius: 16rpx;
			margin-bottom: 20rpx;
			.item-left{
				.item-avart{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.left-name{
					margin-top: 14rpx;
					.left-name-1{
						font-weight: 700;
						font-size: 28rpx;
						color: $textbl;
					}
					.left-name-2{
						font-weight: 400;
						font-size: 22rpx;
						color: #999;
					}
				}
			}
			.right-img{
				width: 40rpx;
				height: 40rpx;
				image{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
