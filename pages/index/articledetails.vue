<template>
	<view class="detail-wrap bt-1px">
		<view class="title" v-if="lang!='short'&&detail.title">{{detail.title}}</view>
		<view class="information flex-between">
			<view class="left flex-middle">
				<block v-if="type==2">
					<image v-if="detail.member&&detail.member.avatar" :src="detail.member.avatar" mode=""></image>
					<image v-else :src="IMG_URL+'avatar.png'" mode=""></image>
				</block>
				<block v-if="type==1">
					<image :src="IMG_URL+'avatar.png'" mode=""></image>
				</block>
				<view class="names">
					<block v-if="type==1">
						<view class="name">{{detail.author}}</view>
					</block>
					<block v-else>
						<view class="name" v-if="detail.member&&detail.member.nickname">{{detail.member.nickname}}
						</view>
					</block>
					<view class="time">{{detail.created_at}} &nbsp;&nbsp;{{detail.read}}阅读</view>
				</view>
			</view>
			<view class="right" v-if="type==2&&detail.belongs_to=='others'">
				<image v-if="detail.is_follow==0" :src="IMG_URL+'follow.png'" mode="" @click="is_followMemberhandle()">
				</image>
				<image v-else :src="IMG_URL+'follow_true.png'" mode="" @click="is_followMemberhandle()"></image>
			</view>
		</view>

		<view class="content">
			<mp-html class="tips" :content="detail.content"></mp-html>
		</view>
		<view class="images flex-between" v-if="detail.image_text&&detail.image_text.length>0 && type == '2'">
			<image v-for="(items,indexs) in detail.image_text" :key="indexs" :src="items"></image>
			<!-- <view style="width: 210rpx;"></view> -->
		</view>

		<!-- 精选推荐 -->
		<view class="hot" v-if="this.recommendList != ''">
			<view class="hot-name">
				精选推荐
			</view>
			<view class="hot-item">
				<view class="item-box flex-between" v-for="(item, index) in recommendList.slice(0,4)" :key="index"
					@click="dianji(item)">
					<view class="item-left">
						<view class="item-left-title much-ell-two">
							{{ item.title }}
						</view>
						<view class="item-left-ping flex-middle">
							<text>{{item.comments || '0'}}评论</text>
							<text class="t1">{{item.updated_at}}</text>
						</view>
					</view>
					<view class="item-right" v-if="item.image">
						<image :src="item.image" mode="scaleToFill"></image>
						<!-- <image src="" mode="" v-else></image> -->
					</view>
				</view>
			</view>
		</view>


		<view class="stickyScrollTop">
			<u-loading-page :loading="pageLoading"></u-loading-page>
			<block v-if="!pageLoading">
				<comment :commentlist="commentlist" @commenthandle="commenthandle" @handlepinglun="handlepinglun"
					@integralhandle="integralhandle" :type="type" :detail="detail"></comment>
			</block>
		</view>
		<sharemodel :sharemode="sharemode" :url="sharemodeurl" @handleclose="handleclose" :shareid="id"
			@integralhandles="integralhandles" :sharetype="type" :detail="detail" @onChange="onChange" :tabsactivetop="tabsactivetop"></sharemodel>
		<isintegral :inputmode="inputmode" :integramessage="integramessage" :integramessagedata="integramessagedata"
			@tozizhihandle="tozizhihandle"></isintegral>
		<!-- 登录提示 -->
		<login-modal></login-modal>
		<view class="post" v-show="tishi==1" >
				<p style="color: #fff;font-size: 30upx;margin-top: 10upx;">长按保存图片至相册</p>
				<view class="content" style="text-align: center;width: 90%;margin: 0 10px;">
					<view style="margin-top: 30upx;background: #fff;">
						<view  style="background: #fff;">
							<img id="test" style="width: 100%;height: 400upx;"/>
						  <!-- <img id="test" style="width: 580upx;height: 954upx;"/> -->
						  
						  <view class="artictitle">{{detail.title}}</view>
						  <mp-html class="articcontent" :content="detail.content"></mp-html>
						  <!-- <view id="content" class="articcontent" v-html="detail.cont"></view> -->
						<view id="tip" style="display: flex;">
							
							<view v-for="(item,index) in detail.tag" :key="index" class="tip1" >{{item.name}}</view>
						 </view>
						 <view class="bottom">
							<view class="left">
							<view class="top">扫码进入Defam</view>	
							<view class="top">阅读更多深度内容</view>	
							</view> 
							<view class="right">
							<image src="../../static/images/codeImg.png" style="width: 50px;height: 50px;text-align: right;"></image>
						   </view>
						 </view>
						</view>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
			<image @click="guanbi" class="cha" style="width: 80upx;height: 80upx; margin-top: 25upx;margin-left: 47%;"></image>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<image @click="guanbi" class="cha" style="width: 80upx;height: 80upx; margin-top: 25upx; margin: 0;"></image>
			<!-- #endif -->
			</view>
		<!-- </view> -->
	</view>
</template>

<script>
	import canvas_x from "../../components/mg-h5hb/common/canvas_x.js"
	import MpHtml from '@/components/mp-html/mp-html'
	import comment from './components/comment.vue'
	import sharemodel from './components/sharemodel.vue'
	import {
		userInfo
	} from '@/engine/storage';
	import isintegral from '@/components/common/is_integral.vue';
	export default {
		components: {
			MpHtml,
			comment,
			sharemodel,
			isintegral
		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				detail: {},
				commentinfo: {},
				type: 0,
				sharemode: false,
				id: '',
				commentlist: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				sharemodeurl: '',
				inputmode: false,
				integramessage: '',
				integramessagedata: {},
				recommendList: [] ,// 精选推荐列表,
				
				
				
				tishi:0,
				userid:0,
				img:"",
				phone:"",
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				nickname:"",
				val:"",
				detail:'',
				title:'',
				articContent:'',
				tags:[],
				content:'',
				tabsactivetop:''
			}
		},
		onLoad() {
			this.tabsactivetop = this.$Route.query.tabsactivetop
			console.log('888',this.tabsactivetop)
			this.type = this.$Route.query.type || '' //类型1资讯 2文章 3活动 4.帖子
			this.lang = this.$Route.query.lang || '' //长文还是短文
			
		
			try {
				this.id = this.$Route.query.id;
				this.detailhandle()
				this.commentlisthandle()
				this.getRecommend()
			} catch (e) {
				//TODO handle the exception
			}
			
		},
		onPullDownRefresh() {
			this.page = 1;
			this.commentlisthandle();
			this.detailhandle();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.commentlisthandle();
			}
		},
		onShareAppMessage(res) {
			this.$http('member/forward', {
				action_id: this.id,
				type: this.type
			}, 'get').then(res => {}).catch(() => {})
		},
		methods: {
			dianji(item) {
				// console.log(item)
				this.$Router.replace({
					path: '/pages/index/articledetails',
					query: {
						id: item.id,
						type: 1,
					}
				})
				this.reload()
			},
			// 获取资讯精选推荐列表
			getRecommend() {
				this.$http('realinfo/recommend_list', {}, 'get').then(res => {
					console.log(res)
					this.recommendList = res.data.data;
				}).catch(() => {})
			},
			// 资讯详情realinfo/read?id=3
			//文章or帖子详情article/read?id=1
			detailhandle() {
				let url = ''
				if (this.type == 1) {
					url = 'realinfo/read'
				} else if (this.type == 2) {
					url = 'article/read'
				}
				uni.showLoading()
				this.$http(url, {
					id: this.id
				}, 'get').then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					this.detail = res.data
					if (res.data) {
						uni.setNavigationBarTitle({
							title: res.data.title
						})
					}
					this.sharemodeurl = 'pages/index/articledetails?type=' + this.type + '&lang=' + this.detail
						.type + '&id=' + this.detail.id
					setTimeout(() => {
						this.pageLoading = false
					}, 100)
				})
			},
			//评论列表comment?id=1&type=2
			commentlisthandle() {
				uni.showLoading()
				this.$http('comment', {
					page: this.page,
					id: this.id,
					type: this.type
				}, 'get').then(res => {
					uni.hideLoading()
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.commentlist = this.page == 1 ? newData.data : [...this.commentlist, ...newData.data];
				}).catch(() => {})
			},
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			is_followMemberhandle() {
				userInfo.get(true).then(res => {
					uni.showLoading()
					this.$http('memberfollow/is_followMember', {
						to_member_id: this.detail.member_id,
						member_id: res.id,
						type: 1
					}, 'get').then(res => {
						uni.hideLoading()
						let _this = this
						setTimeout(() => {
							_this.$u.toast(res.message)
						})
						this.detailhandle()
					}).catch(() => {})
				})
			},
			//评论返回
			commenthandle(e) {
				if (e.pinglun) {
					this.page = 1;
					this.commentlisthandle()
					this.detailhandle()
				} else if (e.dianzan) {
					this.detailhandle()
				} else if (e.share) {
					this.sharemode = e.share
				}
			},
			//分享取消
			handleclose(e) {
				this.sharemode = e
				this.detailhandle()
			},
			//跳转到评论的位置
			handlepinglun() {
				uni.createSelectorQuery().select('.stickyScrollTop').boundingClientRect(res => {
					//这里会获取到选择器中元素距离顶部的距离，以便后续定位或吸顶效果实现
					uni.pageScrollTo({
						scrollTop: res.top,
						duration: 0,
					})
				}).exec();
			},
			integralhandle(e) {
				this.inputmode = e.inputmode
				this.integramessage = e.message
				this.integramessagedata = e.messagedata
			},
			tozizhihandle(e) {
				this.inputmode = e
			},
			integralhandles(e) {
				this.integralhandle(e)
			},
			
			guanbi:function(){
				this.tishi=0;
				
			},
			erweima:function(){
				this.tishi=1;
				canvas_x.makeImage({
								type: 'url',
								parts: [
									{
										type: 'image',
										url: '../../static/images/headImg.png',
										width: 680,
										height: 1264,
										// backgroundSize:680,
									},
									// {
									// 	type: 'qrcode',
									// 	text: this.val,
									// 	x: 80,
									// 	y: -50,
									// 	width: 130,
									// 	height: 130,
									// 	padding: 0,
									// 	background: '#fff',
									// 	level: 3
									// },
									//  {
									// 	type: 'text',
									// 	text: this.title,
									// 	textAlign: 'left',
									// 	lineAlign: 'TOP',
									// 	x: 440,
									// 	y: 300,
									// 	color: 'black',
									// 	size: '30px',
									// 	// bold: true
									// },
									// {
									// 	type: 'text',
									// 	text:'玫瑰',
									// 	textAlign: 'left',
									// 	lineAlign: 'TOP',
									// 	x: 440,
									// 	y: 1185,
									// 	color: 'black',
									// 	size: '30px',
									// 	// bold: true
									// }
								],
								width: 680,
								height: 1264
							}, (err, data) => {
								 document.getElementById('test').src = data
							})
			},
			//监听保存图片的额点击事件
			   onChange(val){
			 console.log('88888888',val)
			 	 this.erweima()
				}
		}
	}
</script>

<style lang="scss" scoped>
	.tips{
		line-height: 2.5;
		color: #080F18;
		
	}
	/deep/ ._i {
		font-size: 30rpx !important;
		line-height: 1.5 !important;
	}
	.images{
		margin-top: 40rpx;
		flex-wrap: wrap;
		image{
			width: 210upx;
			height: 210upx;
			border-radius: 8upx;
			margin-bottom: 20upx;
		}
	}
	.detail-wrap {
		background: #fff;
		// #ifdef MP-WEIXIN
		min-height: 100vh;
		// #endif
		// #ifdef H5
		min-height: calc(100vh - 44px);
		// #endif
		padding: 1upx 24upx 40upx;

		.title {
			font-family: "PingFang SC Bold";
			font-size: 18px;
			color: #000;
			padding-top: 38upx;
		}

		.information {
			margin: 40upx 0;

			image {
				width: 64upx;
				height: 64upx;
				margin-right: 20upx;
			}

			.left {
				image {
					border-radius: 50%;
				}
			}

			.names {
				.name {
					font-family: "PingFang SC Bold";
					// font-weight: 700;
					font-size: 18px;
					color: #080F18;
				}

				.time {
					font-family: "PingFang SC";
					font-size: 14px;
					color: #646464;
				}
			}

			.right {
				image {
					width: 44upx;
					height: 44upx;
				}
			}
		}
	}

	// 精选推荐
	.hot {
		margin-top: 40rpx;

		.hot-name {
			margin: 0 0 10rpx 0;
			font-weight: 700;
			font-size: 36rpx;
			color: #080F18;
		}

		.hot-item {
			.item-box {
				padding: 32rpx 24rpx;
				margin-bottom: 20rpx;
				border-radius: 16rpx;
				background: #fafafe;

				.item-left {
					margin-right: 40rpx;

					.item-left-title {
						font-weight: 700;
						font-size: 28rpx;
						color: #080F18;
					}

					.item-left-ping {
						margin-top: 40rpx;
						font-weight: 400;
						font-size: 24rpx;
						color: #646464;

						.t1 {
							margin-left: 16rpx;
						}
					}
				}

				.item-right {
					
					image {
						width: 226rpx;
						height: 160rpx;
						border-radius: 8rpx;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	.post {
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,0.7);
		position: fixed;
		top: 0upx;
		z-index: 10000;
		text-align: center;
		.wrapper {
			height: 1420upx;
			width: 610upx;
			// margin: 0 auto;
			margin-top: -150upx;
			
			// margin-top: 50upx;
		}
	}
	.tupian{
		width: 100%;
		height: 1360upx;
		// background-image: url('../../static/images/tutu3.png');
		background-size:750upx 1360upx ;
	}
	
	.cha{
		background-image: url('../../static/images/chacha.png');background-size: 80upx 80upx;
		position: relative;
		top: 40upx
	
	}
	.articcontent{
		line-height: 2;
		padding: 0px 20px;
		color: #333;
	}
	.artictitle{
		color: #000;
		font-weight: 500;
		padding: 15px 20px;
	}
	.bottom{
		display: flex;
		background-color: rgb(242, 242, 242);
		padding: 15px 20px;
	}
	.left{
		width: 50%;
	
		text-align: left;
	}
	.right{
		width: 50%;
		
		text-align: right;
		padding-top: 10px;
		// margin-left: 20px;
	}
	.top{
		padding-top: 10px;
		color: #767676;
	}
	.tip1{
		
		background-color: rgb(245, 246, 248);
		margin: 15px 0px 15px 20px;
		padding: 5px 10px;
		color: #767676;
		font-size: 14rpx;
		
	}
</style>
