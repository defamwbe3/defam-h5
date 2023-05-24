<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<u-navbar title="我的藏宝图" :bgColor="bgColor" placeholder>
				<view slot="left">
					<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
				</view>
				<!-- #ifdef H5 -->
				<view slot="right" @click="$Router.push({path: '/pages/user/treasuremap/counter'})">
					<view class="nav-btn">兑换记录</view>
				</view>
				<!-- #endif -->
			</u-navbar>
			<view class="box">
				<view class="box-1 flex-between flex-wrap">
					<view class="box-item" v-for="(item,index) in list" :key="index" @click="goDetali(item)">
						<image :src="item.image" mode=""></image>
						<view class="item-name">{{item.map_name}}</view>
						<view class="xian"></view>
						<view class="item-btn" v-if="item.status == 0">
							<button class="btns" @click.stop="withdraw(item)">藏宝图提现</button>
						</view>
						<view class="item-status-one" v-if="item.status == 1">
							提现中
						</view>
						<view class="item-status flex-middle" v-if="item.status == 2">
							<image src="../../../static/images/cangbaotu.png" mode=""></image>
							<view class="item-status-name text-ellipsis" @click.stop="openLink(item.receipt)">
								{{item.receipt}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 适配小程序 -->
			<!-- #ifdef MP-WEIXIN -->
				<view class="fined" @click="$Router.push({path: '/pages/user/treasuremap/counter'})">兑换记录</view>
			<!-- #endif -->
			<engine-empty v-if="!list.length" :tipText="'暂无藏宝图列表信息'"></engine-empty>
		</block>
		
		<!-- 藏宝图提现 -->
		<u-popup :show="show" mode="center"  @close="close" @open="open" customStyle="border-radius: 32rpx;width: 80%;">
			<view class="popup-box">
				<view class="popup-name">藏宝图提现</view>
				<view class="popup-img">
					<image :src="showList.image" mode=""></image>
				</view>
				<view class="popup-text">{{showList.map_name}}</view>
				<view class="popup-xian"></view>
				<view class="popup-add">
					提现到我的钱包地址
				</view>
				<view class="popup-address text-ellipsis">
					{{ wallet }}
				</view>
				<view class="selsse">
					<text class="" @click="select = true">选择钱包地址</text>
					<image src="../../../static/images/xiayibu.png" mode=""></image>
				</view>
				<view class="popup-btn">
					<button @click="tixian(showList)">确定</button>
				</view>
			</view>
		</u-popup>
		
		<!-- 选择钱包地址弹窗 -->
		<u-popup :show="select" mode="center"  @close="close" @open="open"  customStyle="border-radius: 32rpx;width: 80%;">
			<view class="popup-box">
				<view class="popup-name">请选择钱包地址</view>
				<view class="popup-adres text-ellipsis" v-for="(item,index) in walletList" :key="index" @click="selAdd(item)">
					地址{{index+1}}:{{item.address}}
				</view>
			</view>
		</u-popup>
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
				pageLoading: true,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				pageLoading: true,
				show: false,
				showList: '',
				walletList: '',
				wallet: '',
				addressId: '',
				select: false
			}
		},
		onLoad() {
			this.getWalletAddress()
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
			
		},
		onShow() {
			this.getList();
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
			openLink(val){
				console.log(val)
				if (val) {
					this.$tools.routerTo(val)
				}
			},
			// 跳转详情页面
			goDetali(item){
				console.log(item)
				if(item.status ==2){
					this.$router.push({
						path:"/pages/user/mymap/mapDetail",
						query: {
							id: item.map_id,
							name: item.map_name,
							receipt:item.receipt,
							order_no:item.order_no || '',
							provide_time: item.provide_time || '',
							exchange_time: item.exchange_time || ''
						}
					})
				}else if(item.status ==0){
					this.$u.toast('请先提现~');
				}else{
					this.$u.toast('正在审核中~');
				}
				// jump('',{id: item.map_id,name: item.map_name,receipt:item.receipt})
			},
			
			// 获取藏宝图列表
			getList() {
				this.$http('usermap', {
					page: this.page,
					type: 'map',
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			},
			withdraw(item){
				this.show = true
				this.showList = item
				// console.log(this.showList)
			},
			getWalletAddress() {
				this.$http('walletaddress', {
					page: this.page,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.walletList = this.page == 1 ? newData.data : [...this.walletList, ...newData.data];
					this.wallet = res.data.data[0].address || [];
				}).catch(()=>{})
			},
			selAdd(item){
				this.select = false
				this.wallet = item.address
				this.addressId = item.id
			},
			tixian(showList){
				// console.log(showList)
				this.$http('usermap/mapWith', {
					id: showList.id, 
					address: this.wallet
				}, 'post').then((res) => {
					this.$u.toast('提现成功');
					this.show = false
					this.page = 1;
					this.getList();
				}).catch(()=>{})
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
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				this.select = false
				// console.log('close');
			}
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
		.nav-btn {
			font-size: 30rpx;
			color: #333333;
		}
	}
	.box{
		margin: 40rpx 24rpx 0;
		.box-1{
			.box-item{
				width: 340rpx;
				height: 520rpx;
				border-radius: 16rpx;
				background: #fff;
				margin-bottom: 22rpx;
				image{
					width: 340rpx;
					height: 340rpx;
					border-radius: 16rpx 16rpx 0 0;
				}
				.item-name{
					padding: 20rpx 24rpx 0;
					font-weight: 700;
					font-size: 32rpx;
					// text-align: center;
					color: #222;
				}
				.xian{
					height: 1px;
					margin: 23rpx 20rpx 0;
					background: #f0f1f9;
				}
				.item-status{
					margin: 24rpx 20rpx 0;
					image{
						width: 40rpx;
						height: 40rpx;
						background-color: #f4f4fd;
						border-radius:  10rpx;
					}
					.item-status-name{
						width: 290rpx;
						height: 40rpx;
						line-height: 40rpx;
						border-radius: 0 20rpx 20rpx 0;
						background: #f4f4fd;
						font-weight: 700;
						font-size: 22rpx;
						color: #1b1bdd;
						padding-left: 6rpx;
					}
				}
				.item-btn{
					margin-top: 16rpx;
					.btns{
						width: 188rpx;
						height: 56rpx;
						font-weight: 400;
						font-size: 26rpx;
						text-align: center;
						line-height: 56rpx;
						color: #fff;
						border-radius: 28rpx;
						background: #1b1bdd;
					}
				}
				.item-status-one{
					font-size: 26rpx;
					text-align: center;
					margin-top: 26rpx;
					color: #CCC;
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
	
	.popup-box{
		height: 908rpx;
		border-radius: 32rpx;
		background: #fff;
		.popup-name{
			font-weight: 700;
			font-size: 36rpx;
			color: #000;
			text-align: center;
			margin-top: 44rpx;
		}
		.popup-img{
			margin: 42rpx auto 0;
			width: 200rpx;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 16px;
			}
			
		}
		.popup-text{
			font-weight: 700;
			font-size: 32rpx;
			text-align: center;
			color: #222;
			margin-top: 40rpx;
		}
		.popup-xian{
			margin: 23rpx 40rpx 0;
			height: 1px;
			background: #f0f1f9;
		}
		.popup-add{
			margin-top: 40rpx;
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #999;
		}
		.popup-address{
			margin: 20rpx 54rpx 0;
			font-weight: 400;
			font-size: 32rpx;
			text-align: center;
			color: #000;
		}
		.selsse{
			margin: 60rpx auto 0;
			font-weight: 700;
			font-size: 28rpx;
			color: #1b1bdd;
			text-align: center;
			image{
				width: 36rpx;
				height: 20rpx;
				margin-left: 16rpx;
			}
		}
		.popup-btn{
			margin: 80rpx 80rpx 60rpx;
		}
	}
	.popup-adres{
		font-size: 32rpx;
		// text-align: center;
		color: #000;
		margin: 60rpx 60rpx;
	}
</style>
