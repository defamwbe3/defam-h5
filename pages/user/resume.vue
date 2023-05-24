<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<u-navbar v-if="Scrolltop" title="个人主页" bgColor="#fff" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold"></u-navbar>
			<view class="images">
				<image v-if="userinfo.wap_cover_address" :src="userinfo.wap_cover_address" mode=""></image>
				<image v-else :src="IMG_URL + 'banner.png'" mode=""></image>
				<view class="navbar" :style="{top: barheight + 'px'}"  @click="backhandle">
					<view class="iconfont icon-icon_direction_leftoutlined"></view>
				</view>
				<view class="edit" v-if="!memberinfo_id" @click="jump('/pages/user/sets/editItem', { type: 'cover' })">编辑封面</view>
			</view>
			<view class="information">
				<view class="avatar">
					<image v-if="!userinfo.avatar" :src="IMG_URL +'avatar.png'"></image>
					<image v-else :src="userinfo.avatar"></image>
				</view>
				<view class="name flex-between">
					<view class="left">{{userinfo.nickname}}</view>
					<block v-if="userinfo.belong_to=='other'">
						<view class="name-img" v-if="userinfo.is_follow==1" @click.stop="is_followMemberhandle()">
							<image :src="IMG_URL+'follow_true.png'" mode=""></image>
						</view>
						<view class="name-img" v-if="userinfo.is_follow==0" @click.stop="is_followMemberhandle()">
							<image :src="IMG_URL+'follow.png'" mode=""></image>
						</view>
					</block>
				</view>
				<view class="profile" @click="jump('/pages/user/sets/editItem', { type: 'qianming' })">{{userinfo.sign || '编辑个签，展示我的独特态度'}}</view>
				<view class="url" v-if="userinfo.url">{{userinfo.url}}</view>
				<view class="follow flex-middle">
					<view class="item"><text class="item-floow">{{userinfo.fans_num||0}}</text>粉丝</view>
					<view class="item"><text class="item-floow">{{userinfo.follow_num || '0'}}</text>关注</view>
					<view class="item"><text class="item-floow">{{userinfo.zan_num || '0'}}</text> 赞</view>
				</view>
			</view>
			<u-sticky bgColor="#fff"
			<!-- #ifdef MP-WEIXIN -->
				customNavHeight="88"
			<!-- #endif -->
			>
				<view class="tabs">
					<u-tabs :list="tabslist" :scrollable="false" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD" :activeStyle="{color:'#1B1BDD'}"
					inactiveStyle="color: #666666" lineWidth="30" itemStyle="padding-left: 15px; padding-right: 15px; height: 44px;"></u-tabs>
				</view>
			</u-sticky>
			<articlelist v-if="list.length>0" :list="list" @acticlehandle="acticlehandle" :is_main="userinfo.belong_to=='other'?false:true"></articlelist>
			<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
		</block>
		<engine-tabbar></engine-tabbar>
	</view>
</template>

<script>
	import articlelist from '../index/components/articlelist.vue';
	import { userInfo } from '@/engine/storage';
	export default {
		components: {
			articlelist
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				barheight: 0,
				tabslist: [
					{id: 0,name: '全部',type: 'all'},
					{id: 1,name: '帖子',type: 'short'},
					{id: 2,name: '文章',type:'long'},
				],
				tabsactive: 0,
				Scrolltop: false,
				userinfo:'',
				tabstype: 'all',
				list: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				memberinfo_id: '',
			}
		},
		onLoad(){
			this.barheight = this.StatusBar
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
		onShow() {
			this.memberinfo_id = this.$Route.query.id||''
			if(this.memberinfo_id){
				this.memberinfohandle()
				uni.setNavigationBarTitle({
					title:'他人主页'
				})
				this.getList();
			}else{
				userInfo.get(true).then(res=>{
					this.userinfo = res
					uni.setNavigationBarTitle({
						title:'个人主页'
					})
				})
				this.getList();
			}
		},
		onPageScroll(e) {
			if(e.scrollTop>200){
				this.Scrolltop = true
			}else{
				this.Scrolltop = false
			}
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
			// 获取他人主页 member/memberinfo
			memberinfohandle(){
				this.$http('member/memberinfo', {
					id: this.memberinfo_id,
				}, 'post').then((res) => {
					this.userinfo = res.data
				}).catch(()=>{})
			},			
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			is_followMemberhandle(){
				userInfo.get(true).then(res=>{
					uni.showLoading()
					this.$http('memberfollow/is_followMember', {to_member_id: this.userinfo.id, member_id: res.id,type: 1}, 'get').then(res=>{
						uni.hideLoading()
						this.$u.toast('操作成功')
						this.memberinfohandle()
						this.page = 1;
						this.getList();
					}).catch(()=>{})
				})
			},
			tabshandle(item) {
				this.tabsactive = item.index
				this.tabstype = item.type
				this.page = 1;
				this.getList();
			},
			//文章列表article
			getList() {
				this.$http('article/member_article', {
					page: this.page,
					title: '',
					type: this.tabstype,
					member_id: this.memberinfo_id?this.memberinfo_id:'',
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					if(this.tabsactive == 0 || this.tabsactive == 2){
						for(let item of res.data.data){
							item.created_at = this.$tools.getTimeInterval(new Date(item.created_at).getTime(), new Date().getTime())
						}
					}
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
			// 跳转
			jump(path, query) {
				this.$Router.push({
					path: path,
					query: query
				})
			},
			// 返回
			backhandle() {
				this.$Router.back()
			},
		}
}
</script>

<style lang="scss" scoped>
	
	.container{
		padding-bottom: calc(env(safe-area-inset-bottom)/2 + 20upx);
		.images{
			position: relative;
			top: 0;
			width: 100%;
			image{
				width: 100%;
				height: 428upx;
				display: inline-block;
			}
			.navbar{
				position: absolute;
				z-index: 99;
				color: #fff;
				padding: 20upx 26upx;
				.iconfont{
					font-size: 44upx;
				}
			}
			.edit{
				width: 120upx;
				height: 48upx;
				line-height: 46upx;
				border-radius: 4upx;
				background: rgba(0, 0, 0, 0.5);
				font-family: "PingFang SC";
				font-size: 22upx;
				text-align: center;
				color: #f0f1f9;
				position: absolute;
				bottom: 32upx;
				right: 40upx;
			}
		}
		.tabs{
			padding: 0 15upx;
		}
		/deep/.u-sticky{
			margin-top: -4upx;
		}
	}
	.information{
		background-color: #fff;
		padding-left: 24rpx;
		position: relative;
		top: 0rpx;
		.avatar{
			width: 200rpx;
			height: 200rpx;
			background-color: #fff;
			border-radius: 50%;
			position: absolute;
			top: -100rpx;
			image{
				top: 10%;
				left: 50%;
				transform: translate(-50%);
				width: 160rpx;
				height: 160rpx;
				border-radius: 50%;
			}
		}
		.name{
			padding-top: 104rpx;
			.left{
				font-weight: 700;
				font-size: 40rpx;
				color: $textbl;
			}
			.name-img{
				width: 44rpx;
				height: 48rpx;
				padding-right: 50rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.profile{
			padding: 20rpx 24rpx 0 0;
			font-weight: 400;
			font-size: 24rpx;
			color: #666;
		}
		.url{
			padding: 20rpx 24rpx 0 0;
			font-weight: 400;
			font-size: 24rpx;
			color: #3499fe;
		}
		.follow{
			padding: 20rpx 24rpx 60rpx 0;
			.item-floow{
				font-weight: 700;
				font-size: 28rpx;
				color: $textbl;
				margin-right: 8rpx;
			}
			.item{
				font-weight: 400;
				font-size: 24rpx;
				color: $textbl;
				margin-right: 40rpx;
			}
		}
	}
</style>
