<template>
	<view class="container">
		<movable-area>
			<!-- #ifdef H5 -->
			<view class="content">
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<scroll-view :scroll-y="true" style="height: 100vh;" @scrolltolower="scrollhandle" 	lower-threshold="50">
			<view>
			<!-- #endif -->
				<u-navbar title="活动" bgColor="#fff" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold">
					<view slot="left"></view>
				</u-navbar>
				<!-- 轮播 -->
				<view class="banner">
					<AppBanner :bannerList="bannerList" previousMargin="40rpx" nextMargin="40rpx"></AppBanner>
				</view>
				<!-- 标签 -->
				<u-sticky bgColor="#fff"
				<!-- #ifdef MP-WEIXIN -->
					customNavHeight="88"
				<!-- #endif -->
				>
					<view class="tabs bb-1px">
						<u-tabs :list="tabslist" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" :activeStyle="{color:'#1B1BDD'}"
						inactiveStyle="color: #666666" lineWidth="30" itemStyle="padding-left: 13px; padding-right: 13px; height: 44px; touch-action: none;"></u-tabs>
					</view>
				</u-sticky>
				<u-loading-page :loading="pageLoading"></u-loading-page>
				<block v-if="!pageLoading">
					<view class="bottom" v-if="list && list.length">
						<!-- 热门活动 -->
						<activitylist v-if="tabsactive!=4" :list="list"></activitylist>
						<!-- 活动方列表 -->
						<activeparty v-if="tabsactive==4" :list="list" @followhandle="followhandle" :memberId="userinfo.id"></activeparty>
					</view>
					<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
				</block>
				<view class="bottom beian flex" @click="beian" v-if="!pageLoading">
					<image class="beian-img2" src="../../static/images/beian-cj.png.gif" mode=""></image>
					<image class="beian-img1" src="../../static/images/beian.png" mode=""></image>
					<view class="beian-text">粤ICP备2023010984号-1</view>
				</view>
			<!-- #ifdef MP-WEIXIN -->
			</view>
			</scroll-view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			</view>
			<!-- #endif -->
			<!-- 添加拖拽 -->
			<!-- <movable-view :x="x" :y="y" direction="all" @change="onChange">
				<image :src="IMG_URL+'add1.png'" mode="" @click.stop="openPuo()"></image>
			</movable-view> -->
		</movable-area>
		<u-popup :show="inputmode" mode="center" round="16" :customStyle="{ width: '80%', background: '#fff'}" :closeable="true"
		 :safeAreaInsetBottom="false" @close="inputmode=false">
			<view class="mode">
				<image :src="IMG_URL + 'yanzheng.png'" mode=""></image>
				<view class="title">验证身份</view>
				<view class="text">Verify identity</view>
				<view class="con" v-if="userinfo.is_enterprise==0"> 您还未提交身份验证 <br/> 提交验证后即可发布活动</view>
				<view class="con" v-else-if="userinfo.is_enterprise==3"> 提交的信息在审核中~</view>
				<view class="con" v-else-if="userinfo.is_enterprise==1"> 审核已通过</view>
				<view class="con" v-else-if="userinfo.is_enterprise==2"> 审核失败</view>
				<view class="btns flex-between">
				    <button class="button" v-if="userinfo.is_enterprise==0" @click.stop="tozizhi">立即认证</button>
				    <button class="button" v-else-if="userinfo.is_enterprise==3||userinfo.is_enterprise==1"  @click.stop="tozizhi">去查看</button>
				    <button class="button" v-else-if="userinfo.is_enterprise==2"  @click.stop="tozizhi">重新提交</button>
				</view>
			</view>
		</u-popup>
		<engine-tabbar></engine-tabbar>
		<!-- 登录提示 -->
		<login-modal></login-modal>
	</view>
</template>

<script>
import activitylist from '../index/components/activitylist.vue';
import activeparty from './components/activeparty.vue';
import AppBanner from '@/components/common/AppBanner.vue';
import { userInfo } from '@/engine/storage';
export default {
	components: {
		activitylist,
		activeparty,
		AppBanner
	},
	data() {
		return {
			bannerList: [
				{
					id: 1,
					image: this.$IMG_URL+'banner.png',
					path: 'https://juejin.cn/'
				},
				{
					id: 1,
					image: this.$IMG_URL+'banner1.png',
					path: 'https://juejin.cn/'
				},
				{
					id: 1,
					image: this.$IMG_URL+'banner2.png',
					path: 'https://juejin.cn/'
				}
			],
			IMG_URL: this.$IMG_URL,
			// 类型 hot=>热门活动 ,ranking=>排行,'airdrop=>空投活动 online=>线上活动upline=>线下活动
			tabslist: [
				{id: 0,name: '热门活动',type: 'hot'},
				{id: 1,name: '排行榜',type: 'ranking'},
				{id: 2,name: '空投活动',type: 'airdrop'},
				{id: 3,name: '线上活动',type: 'online'},
				{id: 4,name: '活动方列表',type: 'hot'},
			],
			tabsactive: 0,
			tabsactivetype: 'hot',
			x: 300,
			y: 690,
			old: {
			    x: 0,
			    y: 0
			},
			forms:{},
			userinfo:{},
			inputmode: false,
			list: [],
			hasNext: false,
			page: 1,
			loadStatus: 'loadmore',
			pageLoading: true,
		}
	},
	onShow() {
		let bottom = 0
		uni.getSystemInfo({
			success: function (res) {
				bottom = res.safeAreaInsets.bottom
			}
		})
		this.y = uni.getWindowInfo().screenHeight - (180+bottom)
		if(uni.getStorageSync('token')){
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
		}else{
			// this.$store.commit('IS_LOGIN', true);
		}
		this.getbannerList();
	},
	onLoad() {
		this.getList();
		setTimeout(()=>{
			this.pageLoading = false
		}, 1000)
	},
	onPullDownRefresh() {
		this.getbannerList();
		this.page = 1;
		this.getList();
		userInfo.get(true).then(res=>{
			this.userinfo = res
		})
	},
	mounted() {
		this.$nextTick(() => {
			let scrollTargetBox = document.querySelector('.content');
			scrollTargetBox.onscroll = () => {
				var scrollHeight = scrollTargetBox.scrollHeight;
				var scrollTop = scrollTargetBox.scrollTop;
				var clientHeight = scrollTargetBox.clientHeight;
				if (scrollHeight - clientHeight == scrollTop) {
					//滚动条滚到最底部
					if (this.hasNext) {
						this.page++;
						this.getList();
					}
				}
			}
		})
	},
	methods: {
		scrollhandle(e){
			if (this.hasNext) {
				this.page++;
				this.getList();
			}
		},
		// 打开资质认证弹框
		openPuo(){
			if(uni.getStorageSync('token')){
				this.inputmode = true
			}else{
				this.$store.commit('IS_LOGIN', true);
			}
		},
		//banner数据
		getbannerList(){
			this.$http('banner', {is_page: 0,code:'activity'}, 'get').then((res) => {
				uni.stopPullDownRefresh()
				this.bannerList = res.data || []
			}).catch(()=>{})
		},
		tozizhi(){
			this.$Router.push({path:'/pages/activity/qualification',query:{is_enterprise: this.userinfo.is_enterprise}})
			this.inputmode = false
		},
		//活动列表activity/hot_activity?status=online
		getList() {
			if(this.tabsactive==4){
				this.$http('authenterprise/activeParty', {
					page: this.page,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.list = res.data
					// let newData = res.data;
					// this.page = newData.current_page;
					// this.hasNext = newData.last_page > newData.current_page;
					// this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					// this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			}else{
				this.$http('activity/hot_activity', {
					page: this.page,
					status: this.tabsactivetype,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			}
		},
		followhandle(e){
			if(e.follow){
				this.page = 1;
				this.getList();
			}
		},
		tabshandle(item) {
			this.tabsactive = item.index
			this.tabsactivetype = item.type
			this.page = 1;
			this.getList();
		},
		onChange(e) {
			this.old.x = e.detail.x
			this.old.y = e.detail.y
		},
		beian(){
			this.$tools.routerTo('https://beian.miit.gov.cn/')
		}
	}
}
</script>
<style lang="scss" scoped>
.container {
	overflow: hidden;
	max-height: 100vh;
	.content{
		height: 100vh;
		overflow: scroll;
	}
	.banner{
		background-color: #fff;
		padding-bottom: 50upx;
	}
	.bottom{
		padding-bottom: calc(120upx + env(safe-area-inset-bottom));
	}
	.tabs{
		padding: 0 15upx;
	}
}
movable-view {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 136upx;
	height: 136upx;
	z-index: 99999;
	image{
		width: 136upx;
		height: 136upx;
	}
}
movable-area {
	width: 100%;
	height: 100%;
}
.mode{
	padding: 20upx 40upx 50upx;
	position: relative;
	text-align: center;
	>image{
		width: 300upx;
		height: 300upx;
	}
	.title{
		font-weight: 700;
		margin-bottom: 8upx;
		color: #222;
		font-size: 40upx;
	}
	.text{
		font-size: 24upx;
		color: #999999;
	}
	.con{
		padding: 40upx 0 150upx;
		font-family: "PingFang SC";
		line-height: 56upx;
		font-size: 30upx;
		color: #666;
	}
	.btns {
		width: 100%;
		position:absolute;
		bottom: 60upx;
		left: 0;
		.button {
			width: 70%;
			height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			border-radius: 60upx;
			margin-top: 30rpx;
			background: none;
			background: $btnColor;
			box-shadow: 0 6px 18px rgba(45, 45, 254, 0.35);
			flex: none;
		}
		.button::after {
			border: none;
		}
	}
}
.beian{
	margin: 0rpx 140rpx 0rpx;
	.beian-img1{
		width: 38rpx;
		height: 38rpx;
		margin-left: 20rpx;
	}
	.beian-img2{
		width: 38rpx;
		height: 38rpx;
	}
	.beian-text{
		margin-left: 20rpx;
		color: #111;
	}
}
.box-box-box{
	padding-bottom: 50rpx;
}
</style>
