<template>
	<view class="container">
		<u-navbar title="兑换记录" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		
		<!-- tab标签 -->
		<view class="tabs">
			<u-tabs :list="tabslist" :scrollable="false" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" activeStyle="color:#373748; font-weight: 700;" 
			inactiveStyle="color: #666666" lineWidth="30"></u-tabs>
		</view>
		
		<view class="box">
			<view class="box-item"  v-for="(item,index) in list" :key="index" @click="jump('/pages/user/integral/convert',{id:item.id})">
				<view class="box-item-header flex-between">
					<view class="item-top">{{item.created_at}}</view>
					<view v-if="item.status == 'paid'" class="item-top-right">发放中</view>
					<view v-if="item.status == 'finished'" class="item-top-right right1">已完成</view>
				</view>
				
				<view class="item-bot flex-middle">
					<image class="images" :src="item.goods[0].goods_image" mode=""></image>
					<view class="item-bot-box">
						<view class="item-bot-text">{{item.goods[0].goods_name}}</view>
						<view class="item-bot-text1">{{item.amount}}DD</view>
					</view>
					
				</view>
			</view>
			<!-- empty -->
			<engine-empty v-if="list == 0" tipText="暂未兑换记录~" marginTop="30px"></engine-empty>
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
				tabslist: [
					{id: 0,name: '全部',status: ''},
					{id: 1,name: '发放中',status: 'paid'},
					{id: 2,name: '已完成',status: 'finished'},
				],
				page: 1,
				hasNext: false,
				loadStatus: 'loadmore',
				status: '',
				tabsactive: 0,
				list: []
			}
		},
		onLoad() {

		},
		onShow() {
			this.page = 1
			this.getOrderList();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getOrderList();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.getOrderList();
			}
		},
		methods: {
			// 获取兑换记录列表 
			getOrderList(){
				this.$http('order', {
					page: this.page,
					status: this.status
				}, 'get').then((res) => {
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
				this.status = item.status
				this.page = 1
				this.getOrderList();
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
			.box-item-header{
				padding: 20rpx 0rpx;
				margin: 0 24rpx;
				border-bottom: 1px solid #f0f1f9;
				.item-top{
					font-weight: 400;
					font-size: 28rpx;
					color: $textbl;
				}
				.item-top-right{
					font-weight: 400;
					font-size: 26rpx;
					color: #1b1bdd;
				}
				.right1{
					color: #999;
				}
			}
			
			.item-bot{
				padding: 24rpx 24rpx;
				.images{
					width: 160rpx;
					height: 160rpx;
				}
				.item-bot-box{
					margin-left: 32rpx;
					.item-bot-text{
						font-weight: 700;
						font-size: 32rpx;
						color: $textbl;
						
					}
					.item-bot-text1{
						margin-top: 24rpx;
						font-weight: 700;
						font-size: 28rpx;
						color: #ff1c41;
					}
				}
				
			}
		}
	}
</style>
