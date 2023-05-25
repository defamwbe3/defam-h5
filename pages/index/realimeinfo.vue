<template>
	<view class="container">
		<movable-area>
			<!-- #ifdef H5 -->
			<view class="content">
				<!-- #endif -->
				<scroll-view :scroll-y="true" style="height: 100vh;overflow: scroll;" @scrolltolower="scrollhandle"
					lower-threshold="50">
					<view>
						<!-- #endif -->
						<!-- 分类 -->
						<!-- 这里的文章是从第三方数据爬取的 -->
						<view class="tabstop flex-center">
							<u-tabs :list="tabslisttop" :current="tabsactivetop" @click="tabstophandle"
								lineColor="#1B1BDD"
								activeStyle="color:#1B1BDD; font-size: 17px; font-weight: 700;font-family: 'PingFang SC Bold';}"
								inactiveStyle="color: #373748; font-size: 17px; font-weight: 700;font-family: 'PingFang SC Bold';"
								lineWidth="15"
								itemStyle="padding-left: 15px; padding-right: 15px; height: 44px; font-size: 32rpx;"></u-tabs>
							<!-- 搜索 -->
							<navbarsearch tabsactive="0"></navbarsearch>
						</view>
						<!-- 轮播 -->
						<AppBanner :bannerList="bannerList" previousMargin="0" nextMargin="0"></AppBanner>
						<!-- 标签 -->
						<view class="tabs" v-if="this.tabsactivetop == 0">
							<u-tabs :list="tabslist" :current="tabsactive" @click="tabshandle" lineColor="#1B1BDD"
								activeStyle="color:#373748; font-weight: 700;" inactiveStyle="color: #666666"
								lineWidth="30" itemStyle="padding-left: 12px; padding-right: 12px; height: 44px;">
								<!-- <template v-slot:title="{item}">
									<image class="tab-image" :src="item.logo" mode=""></image>
								</template> -->
							</u-tabs>
						</view>
						<!-- <u-loading-page :loading="pageLoading"></u-loading-page> -->
						<view class="bottom" >
							<!-- 文章 -->
							<!-- <realimeinfo v-if="tabsactivetop==0" :list="list"></realimeinfo> -->
							<!-- 快讯 -->
							<realimeinfo v-if="tabsactivetop==0" :list="list" :type="2" :tabsactivetop="tabsactivetop">
							</realimeinfo>
							<!-- KOL言论 -->
							<realimeinfo v-if="tabsactivetop==1" :list="list" tab="kol" @acticlehandle="acticlehandle"
								@integralhandle="integralhandle"></realimeinfo>
						</view>
						<engine-empty v-if="list.length === 0 && !pageLoading" :tipText="'暂无列表信息'"></engine-empty>
						<!-- <view class="bottom beian flex" @click="beian" >
							<image class="beian-img2" src="../../static/images/beian-cj.png.gif" mode=""></image>
							<image class="beian-img1" src="../../static/images/beian.png" mode=""></image>
							<view class="beian-text">粤ICP备2023010984号-1</view>
						</view> -->
						<!-- #ifdef MP-WEIXIN -->
					</view>
				</scroll-view>
				<!-- #ifdef H5 -->
			</view>
			<!-- #endif -->
			<!-- 添加拖拽 -->
			<!-- <movable-view :x="x" :y="y" direction="all" @change="onChange">
				<image :src="IMG_URL+'add.png'" mode="" @click.stop="$Router.push('/pages/release/index')"></image>
			</movable-view> -->
		</movable-area>

		<engine-tabbar></engine-tabbar>
		<isintegral :inputmode="inputmode" :integramessage="integramessage" :integramessagedata="integramessagedata"
			@tozizhihandle="tozizhihandle"></isintegral>
	</view>
</template>

<script>
	import AppBanner from '@/components/common/AppBanner.vue';
	import navbarsearch from './components/navbarsearch.vue';
	import realimeinfo from './components/realimeinfo.vue';
	import articlelist from './components/articlelist.vue';
	import isintegral from '@/components/common/is_integral.vue';
	export default {
		components: {
			AppBanner,
			navbarsearch,
			realimeinfo,
			articlelist,
			isintegral
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bannerList: [{
						id: 1,
						image: this.$IMG_URL + 'banner.png',
						path: 'https://juejin.cn/'
					},
					{
						id: 1,
						image: this.$IMG_URL + 'banner1.png',
						path: 'https://juejin.cn/'
					},
					{
						id: 1,
						image: this.$IMG_URL + 'banner2.png',
						path: 'https://juejin.cn/'
					}
				],
				tabslisttop: [
					// {id: 0,name: '文章',type:'article'},
					{
						id: 1,
						name: '快讯',
						type: 'newsflash'
					},
					{
						id: 2,
						name: 'KOL',
						type: 'kol'
					},
				],
				tabsactivetop: 0,
				tabsactivetype: 'newsflash',
				tabslist: [],
				tabsactive: 0,
				category_id: '',
				category_name: '',
				list: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				x: 300,
				y: 690,
				old: {
					x: 0,
					y: 0
				},
				inputmode: false,
				integramessage: '',
				integramessagedata: {}
			}
		},
		onShow() {
			let bottom = 0
			uni.getSystemInfo({
				success: function(res) {
					bottom = res.safeAreaInsets.bottom
				}
			})
			this.y = uni.getWindowInfo().screenHeight - (180 + bottom)
			this.getbannerList();
		},
		onLoad() {
			this.getrealinfocategoryList()
			setTimeout(() => {
				this.pageLoading = false
			}, 1000)
		},
		onPullDownRefresh() {
			// this.getrealinfocategoryList()
			this.getbannerList();
			this.page = 1;
			this.getList();
		},
		onReachBottom() {
			// if (this.hasNext) {
			// 	this.page++;
			// 	this.getList();
			// }
		},
		mounted() {
			// this.$nextTick(() => {
			// 	let scrollTargetBox = document.querySelector('.content');
			// 	console.log(scrollTargetBox)
			// 	scrollTargetBox.onscroll = () => {
			// 		// console.log(scrollTargetBox.scrollHeight,scrollTargetBox.scrollTop,scrollTargetBox.clientHeight)
			// 		var scrollHeight = scrollTargetBox.scrollHeight;
			// 		var scrollTop = scrollTargetBox.scrollTop;
			// 		var clientHeight = scrollTargetBox.clientHeight;
			// 		// console.log(scrollHeight - clientHeight == scrollTop)
			// 		if (scrollHeight - clientHeight == scrollTop) {
			// 			// console.log(scrollTargetBox)
			// 			// console.log(this.hasNext)
			// 			//滚动条滚到最底部
			// 			if (this.hasNext) {
			// 				this.page++;
			// 				this.getList();
			// 			}
			// 		}
			// 	}

			// })
		},
		methods: {
			scrollhandle(e) {
				if (this.hasNext) {
					this.page++;
					this.getList();
				}
			},
			//banner数据
			getbannerList() {
				this.$http('banner', {
					is_page: 0,
					code: 'realinfo'
				}, 'get').then((res) => {
					uni.stopPullDownRefresh()
					this.bannerList = res.data || []
				}).catch(() => {})
			},
			getList() {
				let url = ''
				let obj = {}
				if (this.tabsactivetop == 0) {
					url = 'realinfo' //咨询文章列表，未对接
					obj = {
						title: '',
						type: this.tabsactivetype,
						category_id: this.category_id,
						page: this.page,
					}
				} else if (this.tabsactivetop == 1) {
					url = 'realinfo/kollist' //kol列表
					obj = {
						page: this.page,
						// name: this.category_name,
					}
				}
				this.pageLoading = true
				this.$http(url, obj, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.pageLoading = false
					if (this.tabsactivetop == 0 || this.tabsactivetop == 1) {
						for (let item of res.data.data) {
							item.created_at_old = item.created_at
							item.created_at = this.$tools.getTimeInterval(new Date(item.created_at).getTime(),
								new Date().getTime())
						}
					}
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];

				}).catch(() => {})
			},
			acticlehandle(e) {
				if (e.dianzan) {
					this.page = 1;
					this.getList()
				}
			},
			//资讯分类
			getrealinfocategoryList() {
				let url = ''
				// if(this.tabsactivetop == 2){
				// 	url = 'realinfocategory/kolcategory' //kol分类
				// }else 
				if (this.tabsactivetop == 0) {
					url = 'articlecategory' //文章分类
				} else {
					url = 'realinfocategory' //资讯分类
				}
				this.$http(url, {}, 'get').then((res) => {
					uni.stopPullDownRefresh()
					if (this.tabsactivetop == 2) {
						this.tabslist = res.data || []
					} else {
						this.tabslist = res.data.data || []
					}
					this.tabsactive = 0
					this.category_id = this.tabslist.length > 0 ? this.tabslist[0].id : ''
					this.category_name = this.tabslist.length > 0 ? this.tabslist[0].name : ''
					this.getList()
				}).catch(() => {})
			},
			tabstophandle(item) {
				this.list = []
				this.tabsactivetop = item.index
				this.tabsactivetype = item.type
				// this.getrealinfocategoryList()
				this.getList()
				// if(this.tabsactivetop==2){
				// 	this.tabslist = [
				// 		{id: 0,name: '精选',},
				// 		{id: 1,name: '神鱼'},
				// 		{id: 2,name: '梭教授'},
				// 		{id: 3,name: 'BTCdayu'},
				// 		{id: 4,name: '凉粉小刀'},
				// 	]
				// }else{
				// 	this.tabslist = [
				// 		{id: 0,name: '精选',},
				// 		{id: 1,name: 'Panews'},
				// 		{id: 2,name: '区块律动'},
				// 		{id: 3,name: '金色财经'},
				// 		{id: 4,name: 'DeFi之道'},
				// 	]
				// }
			},
			tabshandle(item) {
				this.tabsactive = item.index
				this.category_id = item.id
				this.category_name = item.name
				this.page = 1;
				this.list = [];
				this.getList();
			},
			onChange(e) {
				this.old.x = e.detail.x
				this.old.y = e.detail.y
			},
			integralhandle(e) {
				console.log('====ee', e)
				this.inputmode = e.inputmode
				this.integramessage = e.message
				this.integramessagedata = e.messagedata
			},
			tozizhihandle(e) {
				this.inputmode = e
			},
			beian() {
				this.$tools.routerTo('https://beian.miit.gov.cn/')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.container {
		overflow: hidden;

		.content {
			overflow: scroll;
		}

		.bottom {
			padding-bottom: calc(120upx + env(safe-area-inset-bottom));
		}

		.search-box {
			width: 702rpx;
		}

		.tabs {
			margin-top: 30upx;
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

		image {
			width: 136upx;
			height: 136upx;
		}
	}

	movable-area {
		width: 100%;
		height: 100%;
	}

	.beian {
		margin: 0 140rpx 0rpx;

		.beian-img1 {
			width: 38rpx;
			height: 38rpx;
			margin-left: 20rpx;
		}

		.beian-img2 {
			width: 38rpx;
			height: 38rpx;
		}

		.beian-text {
			margin-left: 20rpx;
			color: #111;
		}
	}

	.tab-image {
		width: 60rpx;
		height: 60rpx;
	}
	/deep/ .u-tabs__wrapper__nav__item__text{
		font-size: 28rpx;
	}
</style>