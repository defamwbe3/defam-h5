<template>
	<view class="container">
		<u-navbar :title="title" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<view class="box" v-if="list && list.length">
				<view class="box-item flex" v-for="(item,index) in list" :key="index">
					<view class="item-left">
						<view class="left-img">
							<image :src="item.to_member_info.avatar" mode=""></image>
						</view>
					</view>
					<view class="left-title">
						<view class="left-top flex justify-between">
							<view class="left-title-1">{{item.to_member_info.nickname}}</view>
							<view class="left-title-3">{{item.created_at}}</view>
						</view>
						<view class="left-title-2">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
			<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
		</block>
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
				essayist: [
					{
						id: 1,
						avart: this.$IMG_URL+ 'add.png',
						name: '小迷妹HH',
						time: '3小时前',
						title: '回复了您的评论'
					},
					{
						id: 2,
						avart: this.$IMG_URL+ 'add.png',
						name: '小迷妹HH',
						time: '3小时前',
						title: '回复了您的评论'
					},
					{
						id: 3,
						avart: this.$IMG_URL+ 'add.png',
						name: '小迷妹HH',
						time: '3小时前',
						title: '回复了您的评论'
					}
				],
				list: [],
				pageLoading: true,
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				type: '',
				title: '',
			}
		},
		onLoad(){
			this.type = this.$Route.query.type||''
			this.getList();
			this.title = this.$Route.query.type=='good'?'点赞详情':this.$Route.query.type=='reply'?'回复详情':this.$Route.query.type=='follow'?'关注详情':'平台通知'
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
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
			// 我的消息通知notify/index
			getList() {
				this.$http('notify/index', {
					page: this.page,
					mold: this.type,
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
		}
}
</script>

<style lang="scss" scoped>
.container {
	color: #333333;
	.more {
		width: 48rpx;
		height: 48rpx;
		margin-top: 10rpx;
	}
}
.box{
	margin: 20rpx 24rpx 0;
	
	.box-item{
		padding: 24rpx;
		border-radius: 16rpx;
		background: #fff;
		margin-bottom: 20rpx;
		
		.item-left{
			.left-img{
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
				margin-right: 24rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			
		}
		.left-title{
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.left-top{
				width: 100%;
			}
			.left-title-1{
				font-weight: 700;
				font-size: 28rpx;
				color: #333;
			}
			.left-title-2{
				font-weight: 400;
				font-size: 24rpx;
				color: #999;
				margin-top: 14rpx;
			}
			.left-title-3{
				font-weight: 400;
				font-size: 22rpx;
				color: #999;
			}
		}
	}
}
</style>
