<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<u-navbar title="我的活动" :bgColor="bgColor" placeholder>
				<view slot="left">
					<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
				</view>
			</u-navbar>
			<!-- tab标签 -->
			<view class="tabs">
				<u-tabs :list="tabslist" :scrollable="false" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" activeStyle="color:#373748; font-weight: 700;" 
				inactiveStyle="color: #666666" lineWidth="30"></u-tabs>
			</view>
			<view class="box" v-if="list && list.length">
				<view class="box-item" v-for="(item,index) in list" :key="index" @click="$Router.push({path:'/pages/activity/activitydetail',query:{id:item.id}})">
					<view class="box-item-image">
						<image :src="item.image" mode=""></image>
					</view>
					<view class="box-item-bot">
						<view class="box-item-bot-1">{{item.title}}</view>
						<view class="box-item-bot-2 flex-between flex-middle">
							<view class="time">{{item.start_time}} ~ {{item.end_time}}</view>
							<view class="status" v-if="item.status_text == '进行中'">{{item.status_text}}</view>
							<view class="status over" v-else>{{item.status_text}}</view>
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
		components: {},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				// ing 进行中 finished结束的 is_join我的报名 own我发布的
				tabslist: [
					{id: 0,type: 'is_join',name: '我报名的',},
					{id: 1,type: 'ing',name: '进行中'},
					{id: 2,type: 'finished',name: '已结束'},
				],
				tabsactive: 0,
				tabstype: 'is_join',
				list: [],
				pageLoading: true,
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
			}
		},
		onLoad(){
			this.getList();
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
			// 我的活动activity/activitylist
			getList() {
				this.$http('activity/activitylist', {
					page: this.page,
					status: this.tabstype,
				}, 'post').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			},
			tabshandle(item) {
				this.tabsactive = item.index
				this.tabstype = item.type
				this.page = 1;
				this.getList();
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
		padding-bottom: 50upx;
		.more-1 {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;
		}
	}
	.box{
		margin: 32rpx 24rpx;
		.box-item{
			border-radius: 16rpx;
			background: #fff;
			margin-bottom: 32rpx;
			.box-item-image{
				width: 702rpx;
				height: 360rpx;
				border-radius: 16rpx 16rpx 0 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.box-item-bot{
				padding: 32rpx 24rpx;
				.box-item-bot-1{
					font-weight: 700;
					font-size: 32rpx;
					color: $textbl;
				}
				.box-item-bot-2{
					margin-top: 20rpx;
					.time{
						font-weight: 400;
						font-size: 22rpx;
						color: #999;
					}
					.status{
						width: 140rpx;
						height: 64rpx;
						border-radius: 32rpx;
						text-align: center;
						line-height: 64rpx;
						color: #fff;
						font-weight: 400;
						font-size: 26rpx;
						background-color: #1b1bdd;
						// margin-top: -30rpx;
					}
					.over{
						background-color: #bebec0;
					}
				}
			}
		}
	}
</style>
