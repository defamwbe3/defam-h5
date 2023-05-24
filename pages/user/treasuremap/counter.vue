<template>
	<view class="container">
		<u-navbar title="兑换记录" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		
		<view class="box">
			<view class="box-item"  v-for="(item,index) in list" :key="index">
				<view class="item-top">{{item.created_at}}</view>
				<view class="item-bot flex-middle">
					<image class="images" :src="item.image" mode=""></image>
					<view class="item-bot-text">{{item.map_name}}</view>
				</view>
			</view>
			<!-- empty -->
			<engine-empty v-if="!list.length" tipText="暂未兑换记录~" marginTop="30px"></engine-empty>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				list: [],
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				pageLoading: true,
			}
		},
		onLoad() {
			this.getList();
		},
		onShow() {},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.getList();
			}
		},
		methods: {
			// 获取藏宝图列表
			getList() {
				this.$http('usermap/usermaplog', {
					page: this.page
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
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
	}
	.box{
		margin: 20rpx 24rpx;
		.box-item{
			border-radius: 16rpx;
			background: #fff;
			margin-bottom: 20rpx;
			.item-top{
				padding: 20rpx 0rpx;
				margin: 0 24rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: $textbl;
				border-bottom: 1px solid #f0f1f9;
			}
			.item-bot{
				padding: 24rpx 24rpx;
				.images{
					width: 160rpx;
					height: 160rpx;
				}
				.item-bot-text{
					font-weight: 700;
					font-size: 32rpx;
					color: $textbl;
					margin-left: 32rpx;
				}
			}
		}
	}
</style>
