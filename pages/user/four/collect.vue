<template>
	<view class="container">
		<u-navbar title="我的收藏" :bgColor="bgColor" placeholder>
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
				<u-tabs :scrollable="false" :list="tabslist" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" :activeStyle="{color:'#1B1BDD'}"
				inactiveStyle="color: #666666" lineWidth="30" itemStyle="padding-left: 45px; padding-right: 45px; height: 44px;"></u-tabs>
			</view>
		</u-sticky>
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<!-- 资讯 -->
			<realimeinfo v-if="tabsactive==0" :list="list"></realimeinfo>
			<!-- 发帖  -->
			<articlelist v-if="tabsactive==1" :list="list" :is_main="userinfo.belong_to=='other'?false:true"
			  :memberId="userinfo.id" @acticlehandle="acticlehandle"></articlelist>
			<!-- Collection -->
			<activitylist v-if="tabsactive==2" :list="list"></activitylist>
			<engine-empty v-if="!list.length" :tipText="'暂无收藏信息'"></engine-empty>
		</block>
	</view>
</template>

<script>
	import realimeinfo from './components/realimeinfo.vue';
	import articlelist from './components/articlelist.vue';
	import activitylist from './components/activitylist.vue';
	import { userInfo } from '@/engine/storage';
	export default {
		components: {
			realimeinfo,
			articlelist,
			activitylist
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				tabslist: [
					{id: 1,name: '资讯',},
					{id: 2,name: '发帖'},
					{id: 3,name: '活动'},
				],
				tabsactive: 0,
				tabstype: 1,
				specs:{
					name:[],
					space:[],
				},
				list: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				userinfo:{}
			}
		},
		onLoad() {
			this.getList();
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
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
		onShareAppMessage(res) {
			this.$http('member/forward', {action_id: res.target.dataset.id,type: 2}, 'get').then(res=>{
			}).catch(()=>{})
		},
		methods: {
			tabshandle(item) {
				this.tabsactive = item.index
				this.tabstype = item.id
				this.list = []
				this.page = 1;
				this.getList()
			},
			//收藏列表membercollection/list
			getList() {
				this.$http('membercollection/list', {
					page: this.page,
					type: this.tabstype,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			},
			acticlehandle(e){
				if(e.dianzan){
					this.page = 1;
					this.getList()
				}
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
		.more-1 {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;
		}
	}
	.box{
		margin: 40rpx 24rpx;
		.item{
			margin-bottom: 40rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #333;
		}
	}
	.container{
		padding-bottom: calc(env(safe-area-inset-bottom)/2 + 20upx);
		.tabs{
			padding: 0 15upx;
		}
		/deep/.u-sticky{
			margin-top: -4upx;
		}
	}
</style>
