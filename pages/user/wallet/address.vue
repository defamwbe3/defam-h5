<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<u-navbar title="钱包地址" :bgColor="bgColor" placeholder>
				<view slot="left">
					<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
				</view>
			</u-navbar>
			<view class="wallet" v-if="link.length && link.length != ''">
				<view class="wallet-item" v-for="(item,index) in link" :key="index" @click="select(item)">
					<view class="wallet-item-top flex-between">
						<view class="top_1">{{item.title}}</view>
						<view class="top_right">
							<image :src="IMG_URL+ 'icon_bianji.png'" mode=""
								@click.stop="jump('/pages/user/wallet/newsaddress',{id:item.id,title: item.title,address: item.address})">
							</image>
							<!-- <image :src="IMG_URL+ 'icon_shanchu.png'" mode="" @click="detlect(item)"></image> -->
						</view>
					</view>
					<view class="wallet-item-bottom">
						{{item.address}}
					</view>
				</view>
			</view>
			<engine-empty v-else :tipText="'暂无钱包地址列表'"></engine-empty>
			<!-- <button class="btn" @click="jump('/pages/user/wallet/newsaddress',{type: 'add'})">新增地址</button> -->
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
				link: [],
				pageLoading: true,
				type: ''
			}
		},
		onLoad() {
			this.type = this.$Route.query.type
			// console.log(this.type)
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
		onShow() {
			this.getList()
		},
		onPullDownRefresh() {
			this.getList();
		},
		methods: {
			getList() {
				this.$http('walletaddress', {}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.link = res.data.data
				}).catch(() => {})
			},
			// 删除
			detlect(item) {
				let _this = this;
				uni.showModal({
					title: '提示',
					content: '你确定要删除当前地址吗？',
					success: function (res) {
						if (res.confirm) {
							_this.$http('walletaddress/' + item.id, {}, 'DELETE').then((res) => {
								_this.$u.toast('删除成功');
								_this.getList()
							}).catch(() => {})
						}
					}
				})
			},
			select(item){
				// console.log(item)
				this.$Router.push({
					path: '/pages/user/mymap/myMap',
					query: {
						id:item.id,
						address: item.address
					}
				})
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

	.wallet {
		margin: 40rpx 24rpx 0;

		.wallet-item {
			padding: 32rpx 24rpx;
			border-radius: 16rpx;
			background: #fff;
			margin-bottom: 20rpx;

			.wallet-item-top {
				.top_1 {
					font-weight: 700;
					font-size: 28rpx;
					color: $textbl;
				}

				.top_right {
					image {
						width: 40rpx;
						height: 40rpx;

						&:last-child {
							margin-left: 32rpx;
						}
					}
				}
			}

			.wallet-item-bottom {
				margin-top: 16rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.btn {
		width: 95%;
		position: fixed;
		bottom: 88rpx;
		left: 50%;
		transform: translate(-50%);
	}
</style>
