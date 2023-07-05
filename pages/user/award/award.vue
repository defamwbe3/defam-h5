<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
		<u-navbar title="奖励中心" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<!-- 标签 -->
		<u-sticky bgColor="#fafafe"
		<!-- #ifdef MP-WEIXIN -->
			customNavHeight="88"
		<!-- #endif -->
		>
			<view class="tabs">
				<u-tabs :list="tabslist" :scrollable="false" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" activeStyle="color:#373748; font-weight: 700;" 
				inactiveStyle="color: #666666" lineWidth="30"></u-tabs>
			</view>
		</u-sticky>
		<!-- 我的DD -->
		<view class="box" v-if="tabsactive == 0">
			<view class="header">
				<image class="header-image" :src="IMG_URL+'bg.png'" mode="" ></image>
				<view class="header-left">
					<view class="header-left1 flex-middle">
						当前DD
						<image :src="IMG_URL+'question.png'" mode=""  @click.stop="$Router.push('/pages/user/award/coin')"></image>
					</view>
					<view class="header-left2">{{userinfo.integral || '0.00'}}</view>
					<view class="header-left3 flex" @click.stop="$Router.push('/pages/user/integral/index')">
						DD集市
						<image class="more" :src="IMG_URL+'icon_more.png'"></image>
					</view>
				</view>
			</view>
			
			<view class="item flex-between" v-for="(item,index) in list" :key="index">
				<view class="item-left">
					<view class="item-left-name">{{item.remark}}</view>
					<view class="item-left-time">{{item.created_at}}</view>
				</view>
				<view class="item-right" :class="item.amount >= 0? 'blacks': '' "><text v-if="item.amount > 0">+</text>{{item.amount}}</view>
			</view>
			<engine-empty v-if="!list.length" :tipText="'暂无DD消费列表信息'"></engine-empty>
		</view>
		
		<!-- 我的碎片 -->
		<view class="box-suip" v-else>
			<view class="box-1 flex-between flex-wrap">
				<view class="box-item" v-for="(item,index) in suipianList" :key="index" @click="jump('/pages/user/award/awardDetail',{id: item.fragment_id,name: item.name})">
					<image :src="item.image" mode=""></image>
					<view class="box-item-num">X{{item.number}}</view>
					<view class="item-name">{{item.name}}</view>
				</view>
			</view>
			<engine-empty v-if="!suipianList.length" :tipText="'暂无碎片列表信息'"></engine-empty>
		</view>
		</block>
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
				tabslist: [
					{id: 0,name: '我的DD',},
					{id: 1,name: '我的碎片'},
				],
				tabsactive: 0,
				list: [],
				suipianList: [],
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				pageLoading: true,
				page1: 1,
				hasNext: false,
				hasNext2: false,
				loadStatus2: 'loadmore',
			}
		},
		onLoad(){
			this.getList();
			this.getFinance();
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
		onShow() {
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
			this.page1 = 1;
			this.getFinance();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.getList();
			}
			if(this.hasNext2){
				this.page1++;
				this.getFinance();
			}
		},
		methods: {
			// 获取碎片列表
			getList() {
				this.$http('usermap/fragmentlist', {
					page: this.page,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.suipianList = this.page == 1 ? newData.data : [...this.suipianList, ...newData.data];
				}).catch(()=>{})
			},
			// 获取财务列表
			getFinance(){
				this.$http('finance', {
					page: this.page1
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData2 = res.data
					this.page1 = newData2.current_page
					this.hasNext2 = newData2.last_page > newData2.current_page
					this.loadStatus2 = this.hasNext2 ? 'loadmore' : 'nomore'
					this.list = this.page1 == 1 ? newData2.data : [...this.list, ...newData2.data]
				}).catch(()=>{})
			},
			// 跳转
			jump(path, query) {
				this.$Router.push({
					path: path,
					query: query
				})
			},
			tabshandle(item) {
				this.tabsactive = item.index
				// console.log('item', item);
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
	// 我的DD
	.box{
		margin: 0rpx 24rpx;
		.header{
			width: 702rpx;
			height: 320rpx;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
			position: relative;
			// padding: 40rpx 40rpx;
			.header-image{
				width: 100%;
				height: 100%;
			}
			.header-left{
				margin: 40rpx 40rpx;
				position: absolute;
				top: 0;
				.header-left1{
					font-weight: 700;
					font-size: 28rpx;
					color: $textbl;
					image{
						width: 32rpx;
						height: 32rpx;
						margin-left: 16rpx;
					}
				}
				.header-left2{
					font-weight: 700;
					font-size: 80rpx;
					color: $textbl;
					margin-top: 8rpx;
				}
				.header-left3{
					font-weight: 400;
					font-size: 28rpx;
					color: $textbl;
					margin-top: 40rpx;
					.more {
					    display: block;
					    width: 40rpx;
					    height: 40rpx;
					}
				}
			}
		}
		
		.item{
			margin-bottom: 20rpx;
			border-radius: 16rpx;
			background: #fff;
			padding: 24rpx 24rpx;
			.item-left{
				.item-left-name{
					font-weight: 700;
					font-size: 28rpx;
					color: $textbl;
				}
				.item-left-time{
					font-weight: 400;
					font-size: 22rpx;
					color: #999;
					margin-top: 16rpx;
				}
			}
			.item-right{
				font-weight: 700;
				font-size: 32rpx;
				color: #ff1c41;
			}
			.blacks{
				color: $textbl;
			}
		}
	}
	
	// 我的碎片
	.box-suip{
		margin: 40rpx 24rpx 0;
		.box-1{
			.box-item{
				width: 340rpx;
				height: 432rpx;
				border-radius: 16rpx;
				background: #fff;
				margin-bottom: 22rpx;
				position: relative;
				image{
					width: 340rpx;
					height: 340rpx;
					border-radius: 16rpx;
				}
				.box-item-num{
					position: absolute;
					top: 20rpx;
					right: 20rpx;
					padding: 2rpx 22rpx;
					border-radius: 16rpx;
					background: #000;
					opacity: 0.5;
					font-weight: 400;
					font-size: 22rpx;
					text-align: center;
					color: #fff;
				}
				.item-name{
					padding: 20rpx 24rpx;
					font-weight: 700;
					font-size: 32rpx;
					// text-align: center;
					color: #222;
				}
			}
		}
	}
</style>
