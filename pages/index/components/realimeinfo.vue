<template>
	<view class="article-wrap">
		<block v-if="tab&&tab=='kol'">
			<view class="list" v-for="(item,index) in list" :key="index">
				<!-- 单图 -->
				<!-- <view class="items flex-between" @click="todetailhandle(item)">
					<view class="left">
						<view class="title much-ell-two">{{item.full_text}}</view>
						<view class="bottom flex-middle">
							<view class="text">{{item.created_at}}</view>
						</view>
					</view>
					<view class="right">
						<image :src="item.src_tx" mode=""></image>
					</view>
				</view> -->
				<!-- 多图 -->
				<!-- @click="handleToDetail(item)" -->
				<view class="items item-many">
					<view class="flex-middle items-boxx">
						<image class="imgsss" :src="item.src_tx_text.img" mode=""></image>
						<!-- <image class="imgsss" v-if="item.src_tx_text == ''" src="../../../static/images/avatar.png" mode=""></image> -->
						<view class="">
							<view class="title">{{item.name}}</view>
							<view class="title2">{{item.screen_name}}</view>
						</view>
					</view>

					<view class="title3">{{item.full_text}}</view>
					<view class="items-image" v-if="tab=='kol' && item.link_text">
						<image :src="item.link_text.img" mode=""></image>
					</view>
					<view class="title4">{{item.href}}</view>
					<!-- link_info -->
					<view class="title-link" v-for="(aaa,bbb) in item.link_info" :key="bbb">
						<view class="title-link-tig" v-if="bbb == '显示主题帖'">{{bbb.slice(2)}}</view>
						<view class="title-link-tig" v-else-if="bbb == '图片' && item.link_text.img"></view>
						<view class="title-link-tig" v-else>{{bbb}}</view>
						<view class="title-link">{{aaa.screen_name}}</view>
						<view class="title-link">{{aaa.full_text}}</view>
						<view class="title-link">{{aaa.href}}</view>
					</view>

					<view class="bottom flex-middle">
						<view class="text">{{item.created_at_old}}</view>
					</view>
					<view class="bottom flex-middle">
						<view class="tags">{{item.name}}</view>
					</view>
					<!-- 分享点赞评论 -->
					<view class="bottom2 flex-between">
						<view class="item flex-center" @click.stop="sharemodeidhandle(item)">
							<image :src="IMG_URL+'fenxiang_grey.png'" mode=""></image>
							<view class="name">分享</view>
						</view>
						<!-- <view class="item flex-center">
							<image :src="IMG_URL+'pinglun_grey.png'" mode=""></image>
							<view class="name">{{item.comments}}</view>
						</view> -->
						<view class="item flex-center" @click.stop="is_goodhandle(item)">
							<image :src="item.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
							<view class="name" :class="item.is_good?'main':''">{{item.good}}</view>
						</view>
					</view>
					<!-- <kolComment :commentlist="commentlist" @commenthandle="commenthandle" @handlepinglun="handlepinglun"
						@integralhandle="integralhandle" :type="type" :detail="detail"></kolComment> -->
				</view>
			</view>
			<sharemodel :sharemode="sharemode" :url="sharemodeurl" @handleclose="handleclose"
				@integralhandles="integralhandles" :shareid="shareid" :sharetype="2"></sharemodel>
		</block>
		<block v-else>
			<view v-if="type == 2" class="time-line">
				<view class="list" v-for="(item,index) in list" :key="index">
					<!-- 单图 -->
					<view class="time-yuan"></view>
					<view class="time-xian"></view>
					<view class="time-text">{{item.created_at_old}}</view>
					<view class="items flex-between" v-if="item.image_text&&item.image_text.length==1"
						@click="todetailhandle(item)">
						<view class="left">
							<view class="title much-ell-two" v-if="item.title">{{item.title}}</view>
							<view class="bottom flex-middle">
								<!-- 是否显示置顶 -->
								<view class="topping" v-if="item.is_top==1">置顶</view>
								<!-- <view class="text">{{item.comments}}评论</view> -->
								<view class="text">{{item.created_at_old}}</view>
							</view>
						</view>
						<view class="right">
							<image :src="item.image_text[0]" mode=""></image>
						</view>
					</view>
					<!-- 多图 -->
					<view class="items item-many" v-else @click="todetailhandle(item)">
						<view class="title much-ell-two" v-if="item.title">{{item.title}}</view>
						<view class="images flex-between" v-if="item.image_text.length>0">
							<image v-for="(items,indexs) in item.image_text" :key="indexs" v-if="indexs<=2" :src="items" mode="">
							</image>
							<view style="width: 210rpx;"></view>
						</view>
						<view class="bottom flex-middle">
							<!-- 是否显示置顶 -->
							<view class="topping" v-if="item.is_top==1">置顶</view>
							<!-- <view class="text">{{item.comments}}评论</view> -->
							<view class="text">{{item.created_at_old.substring(0,10)}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<view class="list" v-for="(item,index) in list" :key="index">
					<!-- 单图 -->
					<view class="items flex-between" v-if="item.image_text&&item.image_text.length==1"
						@click="todetailhandle(item)">
						<view class="left">
							<view class="title much-ell-two" v-if="item.title">{{item.title}}</view>
							<view class="bottom flex-middle">
								<!-- 是否显示置顶 -->
								<view class="topping" v-if="item.is_top==1">置顶</view>
								<!-- <view class="text">{{item.comments}}评论</view> -->
								<view class="text">{{item.created_at_old}}</view>
							</view>
						</view>
						<view class="right">
							<image :src="item.image_text[0]" mode=""></image>
						</view>
					</view>
					<!-- 多图 -->
					<view class="items item-many" v-else @click="todetailhandle(item)">
						<view class="title much-ell-two" v-if="item.title">{{item.title}}</view>
						<view class="images flex-between" v-if="item.image_text.length>0">
							<image v-for="(items,indexs) in item.image_text" :key="indexs" v-if="indexs<=2" :src="items" mode="">
							</image>
							<view style="width: 210rpx;"></view>
						</view>
						<view class="bottom flex-middle">
							<!-- 是否显示置顶 -->
							<view class="topping" v-if="item.is_top==1">置顶</view>
							<!-- <view class="text">{{item.comments}}评论</view> -->
							<view class="text">{{item.created_at_old}}</view>
						</view>
					</view>
				</view>
			</view>
		</block>
		<!-- 登录提示 -->
		<login-modal></login-modal>
	</view>
</template>

<script>
	import sharemodel from './sharemodel.vue'
	// import kolComment from './kolComment.vue'
	export default {
		props: ['list', 'tab','tabsactivetop','type'],
		components: {
			sharemodel,
			// kolComment,
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				sharemode: false,
				shareid: '',
				sharemodeurl: '',

				// detail: {},
				// commentlist: [],
			}
		},
		onLoad() {
			this.detailhandle()
		},
		methods: {
			todetailhandle(item) {
				// if(uni.getStorageSync('token')){
				this.$Router.push({
					path: '/pages/index/articledetails',
					query: {
						type: '1',
						id: item.id,
						tabsactivetop:this.tabsactivetop
					}
				})
				// }else{
				// this.$store.commit('IS_LOGIN', true);
				// uni.navigateTo({
				// 	url:'/pages/public/login'
				// })
				// }
			},
			handleToDetail(item) {
				try {
					uni.setStorageSync('detail', JSON.stringify(item))
					this.$Router.push({
						path: '/pages/index/koldetail'
					});
				} catch (e) {
					//TODO handle the exception
				}
			},
			//分享取消
			handleclose(e) {
				this.sharemode = e
			},
			//具体分享
			sharemodeidhandle(item) {
				if (uni.getStorageSync('token')) {
					this.sharemodeurl = 'pages/index/articledetails?type=5&lang=' + item.type + '&id=' + item.id
					this.shareid = item.id
					this.sharemode = true
				} else {
					this.$store.commit('IS_LOGIN', true);
				}

			},
			//点赞取消点赞thumbsup/dolike?id=1&type=2(文章)1(资讯)
			is_goodhandle(item) {
				if (uni.getStorageSync('token')) {
					uni.showLoading()
					this.$http('thumbsup/dolike', {
						id: item.id,
						type: 5
					}, 'get').then(res => {
						uni.hideLoading()
						if (res.data.is_rewards == 1) {
							this.$emit('integralhandle', {
								inputmode: true,
								message: res.message,
								messagedata: res.data.sui || ''
							})
						} else {
							let _this = this
							setTimeout(() => {
								_this.$u.toast(res.message)
							})
						}
						this.$emit('acticlehandle', {
							dianzan: true
						})

					}).catch(() => {})
				} else {
					this.$store.commit('IS_LOGIN', true);
				}

			},
			integralhandles(e) {
				this.$emit('integralhandle', {
					inputmode: e.inputmode,
					message: e.message,
					messagedata: e.messagedata
				})
			},


			//评论返回
			// commenthandle(e) {
			// 	if (e.pinglun) {
			// 		this.page = 1;
			// 		this.commentlisthandle()
			// 		this.detailhandle()
			// 	} else if (e.dianzan) {
			// 		this.detailhandle()
			// 	} else if (e.share) {
			// 		this.sharemode = e.share
			// 	}
			// },
			// detailhandle(item) {
			// 	let url = 'comment/kol_list_comment'
			// 	uni.showLoading()
			// 	this.$http(url, {
			// 		article_id: item.id
			// 	}, 'get').then(res => {
			// 		uni.hideLoading()
			// 		uni.stopPullDownRefresh();
			// 		this.detail = res.data
			// 		if (res.data) {
			// 			uni.setNavigationBarTitle({
			// 				title: res.data.title
			// 			})
			// 		}
			// 		this.sharemodeurl = 'pages/index/articledetails?type=' + this.type + '&lang=' + this.detail
			// 			.type + '&id=' + this.detail.id
			// 		setTimeout(() => {
			// 			this.pageLoading = false
			// 		}, 100)
			// 	})
			// },
			//跳转到评论的位置
			// handlepinglun() {
			// 	uni.createSelectorQuery().select('.stickyScrollTop').boundingClientRect(res => {
			// 		//这里会获取到选择器中元素距离顶部的距离，以便后续定位或吸顶效果实现
			// 		uni.pageScrollTo({
			// 			scrollTop: res.top,
			// 			duration: 0,
			// 		})
			// 	}).exec();
			// },
		}
	}
</script>

<style lang="scss" scoped>
	.title2 {
		font-size: 24upx;
	}

	.title3 {
		font-size: 28upx;
	}

	.title4 {
		margin-top: 20rpx;
		font-size: 24upx;
	}

	.title-link {
		margin-top: 20rpx;
	}

	.title-link-tig {
		display: inline-block;
		border-radius: 5rpx;
		padding: 5rpx 5rpx;
		background-color: #f2f5fa;
		color: #1b1bdd;
	}

	.imgsss {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.items-boxx {
		margin-bottom: 20rpx;
	}

	.article-wrap {

		// margin-top: 60rpx;
		.list {
			margin: 20upx 24upx;

			.items {
				background: $footerColor;
				margin-bottom: 20upx;
				padding: 30upx 24upx;
				border-radius: 16upx;

				.title {
					// color: $textbl;
					// font-size: 32upx;
					// font-weight: 700;
					// line-height: 44upx;
					
					font-size: 18px;
					font-family: Inter-Semi Bold, Inter;
					font-weight: normal;
					color: #080F18;
					
				}

				.bottom {
					margin-top: 34upx;
					font-size: 14px;
					font-family: Inter-Regular, Inter;
					font-weight: 400;
					color: #646464;

					.topping {
						width: 72upx;
						height: 36upx;
						text-align: center;
						line-height: 36upx;
						border-radius: 4upx;
						background: rgba(255, 255, 255, 0);
						border: 2upx solid #cc1919;
						// font-family: "PingFang SC";
						// font-size: 22upx;
						color: #cc1919;
						margin-right: 16upx;
						
						font-size: 14px;
						font-family: Inter-Regular, Inter;
						font-weight: 400;
					}

					.text {
						// font-size: 24upx;
						// color: #999999;
						margin-right: 16upx;
					}
				}

				.right {
					margin-left: 40upx;
					height: 160upx;

					image {
						width: 226upx;
						height: 160upx;
						display: inline-block;
						border-radius: 8upx;
					}
				}
			}

			.item-many {
				.images {
					margin-top: 20upx;
					margin-left: 0;
					height: 144upx;
					flex-wrap: wrap;

					image {
						width: 210upx;
						height: 144upx;
						border-radius: 8upx;
					}
				}

				.bottom {
					margin-top: 20upx;
				}
			}
		}
	}

	.tags {
		border-radius: 5rpx;
		padding: 5rpx 5rpx;
		background-color: #f2f5fa;
		color: #1b1bdd;
	}

	.bottom2 {
		margin-top: 32upx;

		.item {
			width: 33%;

			image {
				width: 40upx;
				height: 40upx;
			}

			.name {
				font-family: "PingFang SC";
				font-size: 24upx;
				color: #767682;
			}

			.main {
				color: #F177C1;
			}
		}
	}
	.time-line{
		padding-left: 60rpx;
		.list{
			position: relative;
		}
		.time-yuan{
			display: inline-block;
			contain: '';
			width: 20rpx;
			height: 20rpx;
			background:#e3e6ed;
			border-radius: 50%;
			position: absolute;
			top: 0;
			left: -44rpx;
		}
		.time-xian{
			display: inline-block;
			contain: '';
			width: 6rpx;
			height: calc(100% + 20rpx);
			background:#e3e6ed;
			position: absolute;
			top: 0;
			left: -38rpx;
			
		}
		.time-text{
			color: #bec0c5;
			padding-left: 30rpx;
			margin-bottom: 10rpx;
		}
	}
	.time-line .list:last-of-type .time-xian{
		display: none;
	}
		// .time-yuan:last-of-type{
		// 	display: none;
		// }
		// .time-xian:last-of-type{
		// 	display: none;
		// }
</style>