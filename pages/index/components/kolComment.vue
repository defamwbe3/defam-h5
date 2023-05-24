<template>
	<view class="comment-wrap">
		<view class="title flex-between">
			<view class="left">评论{{detail.comments||0}}</view>
			<view class="right flex">
				<view class="text br-1px">{{detail.good||0}}点赞</view>
				<view class="text">{{detail.forward||0}}转发</view>
			</view>
		</view>
		<view class="footerbar flex-between">
			<view class="input flex-middle" @click="inputhandle">
				<image :src="IMG_URL+'xpl.png'" mode=""></image>
				<view class="text">写评论~</view>
			</view>
			<view class="images">
				<image :src="IMG_URL+'pinglun.png'" mode="" @click="$emit('handlepinglun')"></image>
				<image v-if="detail.is_good==1" :src="IMG_URL+'dianzan_pink.png'" mode="" @click="is_goodhandle()"></image>
				<image v-else :src="IMG_URL+'dianzan.png'" mode="" @click="is_goodhandle()"></image>
				<image v-if="detail.is_collection == 1" :src="IMG_URL+'shoucang.png'" mode="" @click="is_collectionhandle()"></image>
				<image v-else :src="IMG_URL+'shoucang_grey.png'" mode="" @click="is_collectionhandle()"></image>
				<image :src="IMG_URL+'fenxiang.png'" mode="" @click="sharehandle"></image>
			</view>
		</view>
		<!-- 总评论列表 -->
		<view class="list" v-if="commentlist&&commentlist.length>0">
			<view class="items" v-for="(item,index) in commentlist" :key="index">
				<view class="information flex-between">
					<view class="left flex-middle">
						<image v-if="item.member" :src="item.member.avatar" mode=""></image>
						<view class="names">
							<view class="name">{{item.member.nickname}}</view>
							<view class="time">{{item.created_ats}}</view>
						</view>
					</view>
					<view class="right flex" :class="item.is_good?'main':''" @click="commentgoodhandle(item.id)">
						<view class="value">{{item.good}}</view>
						<image :src="item.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
					</view>
				</view>
				<view class="content">{{item.content}}</view>
				<view class="reply" @click="inputmodehandle(item)">{{item.comment}} 回复 <text class="iconfont icon-icon_direction_rightoutlined"></text></view>
			</view>
		</view>
		<engine-empty v-else :tipText="'暂无评论列表'"></engine-empty>
		
		<!-- 评论输入 -->
		<u-popup :show="inputtrue" mode="bottom" round="0" :customStyle="{ width: '100%', background: '#fff'}" @close="inputtrue=false">
			<view class="comment-input flex-between">
				<input type="text" v-model="content" placeholder="说点什么吧~" :focus="inputtrue" placeholder-style="color:#BEBEC0;"/>
				<view class="btns" @click.stop="releasesumbit(0)">发布</view>
			</view>
		</u-popup>
		<!-- 总回复弹窗 -->
		<u-popup :show="inputmode" mode="bottom" round="14" :safeAreaInsetBottom="false" @close="inputmode=false">
			<view class="mode">
				<u-sticky>
					<view class="title flex-center bb-1px">
						<image :src="IMG_URL+'icon_guanbi.png'" mode="" @click="inputmode=false"></image>
						<view class="name">{{commentinfo.comment}}条回复</view>
					</view>
				</u-sticky>
				<scroll-view class="list-scroll" scroll-y="true" @scrolltolower="loadMoreList">
					<view class="list">
						<!-- 回复主详情 -->
						<view class="items">
							<view class="information flex-between">
								<view class="left flex-middle">
									<image :src="commentinfo.member.avatar" mode=""></image>
									<view class="names">
										<view class="name">{{commentinfo.member.nickname}}</view>
										<view class="time">{{commentinfo.created_ats}}</view>
									</view>
								</view>
								<view class="right flex" :class="commentinfo.is_good?'main':''">
									<view class="value">{{commentinfo.good}}</view>
									<image :src="commentinfo.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
								</view>
							</view>
							<view class="content">{{commentinfo.content}}</view>
						</view>
						<!-- 所有主详情的子回复 -->
						<view class="allcomment">全部回复</view>
						<block v-if="commentinfolist&&commentinfolist.length>0">
							<view class="items" v-for="(item,index) in commentinfolist" :key="index">
								<view class="information flex-between">
									<view class="left flex-middle">
										<image :src="item.member.avatar" mode=""></image>
										<view class="names">
											<view class="name">{{item.member.nickname}}</view>
											<view class="time">{{item.created_ats}}</view>
										</view>
									</view>
									<view class="right flex" :class="item.is_good?'main':''" @click="commentgoodhandle(item.id)">
										<view class="value">{{item.good}}</view>
										<image :src="item.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
									</view>
								</view>
								<!-- 回复的哪一条 -->
								<view class="oline-wrap text-ellipsis" v-if="item.level>2">{{item.tomember.nickname}}：{{item.to_content}}</view>
								<view class="content">{{item.content}}</view>
								<view class="reply flex-middle" @click="zipinglunhandle(item.id)">回复 <text class="iconfont icon-icon_direction_rightoutlined"></text></view>
							</view>
						</block>
						<engine-empty v-else :tipText="'暂无评论列表'"></engine-empty>
					</view>
				</scroll-view>
				<!-- 评论输入 -->
				<view class="comment-input flex-between">
					<input type="text" placeholder="说点什么吧~" v-model="contentzi" :focus="ziinputtrue" placeholder-style="color:#BEBEC0;"/>
					<view class="btns" @click="releasesumbits()">发布</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		props:['type','detail','commentlist'],
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				inputtrue: false,
				inputmode: false,
				ziinputtrue: false,
				content: '',
				contentzi: '',
				zipinglun_id: '',
				commentinfo:{
					member:{}
				},
				commentinfolist: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
			}
		},
		created() {
		},
		methods:{			
			//点赞取消点赞thumbsup/dolike?id=1&type=article(文章)realinfo(资讯)
			is_goodhandle(){
				uni.showLoading()
				this.$http('thumbsup/dolike', {id: this.detail.id,type: this.type}, 'get').then(res=>{
					uni.hideLoading()
					if(res.data.is_rewards==1){
						this.$emit('integralhandle',{inputmode: true, message: res.message,messagedata: res.data.sui||''})
					}else{
						let _this = this
						setTimeout(()=>{
							_this.$u.toast(res.message)
						})
					}
					this.$emit('commenthandle',{dianzan: true})
				}).catch(()=>{})
			},
			//评论点赞comment/dolike?id=14&type=2
			commentgoodhandle(id){
				uni.showLoading()
				this.$http('comment/dolike', {id: id,type: this.type}, 'get').then(res=>{
					uni.hideLoading()
					let _this = this
					setTimeout(()=>{
						_this.$u.toast(res.message)
					})
					this.$emit('commenthandle',{pinglun: true})
					this.page = 1
					this.commentinfolisthandle()
				}).catch(()=>{})
			},
			//收藏与取消
			is_collectionhandle(){
				uni.showLoading()
				this.$http('membercollection/collection_save', {action_id: this.detail.id,type: this.type}, 'get').then(res=>{
					uni.hideLoading()
					let _this = this
					setTimeout(()=>{
						_this.$u.toast(res.message)
					})
					this.$emit('commenthandle',{dianzan: true})
				}).catch(()=>{})
			},
			//发布评论comment/save
			releasesumbit(id){
				if(this.content == ''){
					this.$u.toast('评论内容不能为空')
					return false
				}
				this.$http('comment/save', {
					id: id,
					article_id:this.detail.id, 
					type: this.type,
					content: this.content,
				}, 'post').then(res=>{
					uni.hideLoading()
					this.$emit('commenthandle',{pinglun: true})
					this.content = ''
					this.contentzi = ''
					this.inputtrue = false
					this.ziinputtrue = false
					this.zipinglun_id = ''
					if(this.commentinfo.id){
						this.inputmodehandle(this.commentinfo)
					}
					if(res.data.is_rewards==1){
						this.$emit('integralhandle',{inputmode: true, message: res.message,messagedata: res.data.sui||''})
					}else{
						let _this = this
						setTimeout(()=>{
							_this.$u.toast(res.message)
						})
					}
				})
			},
			//发布子评论
			releasesumbits(){
				this.content = this.contentzi
				if(this.zipinglun_id==''){
					this.releasesumbit(this.commentinfo.id)
				}else{
					this.releasesumbit(this.zipinglun_id)
				}
			},
			//操作回复哪一条子评论
			zipinglunhandle(id){
				this.ziinputtrue = false
				let _this = this
				setTimeout(()=>{
					_this.zipinglun_id = id
					_this.ziinputtrue = true
				})
			},
			//打开子评论列表
			inputmodehandle(item){
				this.commentinfo = item
				this.page = 1
				this.commentinfolisthandle()
				this.inputmode = true
			},
			//触底加载子评论
			loadMoreList() {
				if(this.hasNext) {
					this.page++;
					this.commentinfolisthandle();
				}
			},
			//查询子评论comment/comment_children?id=1
			commentinfolisthandle(){
				uni.showLoading()
				this.$http('comment/comment_children', {page: this.page,id: this.commentinfo.id}, 'get').then(res=>{
					uni.hideLoading()
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.commentinfolist = this.page == 1 ? newData.data : [...this.commentinfolist, ...newData.data];
				}).catch(()=>{})
			},
			inputhandle(){
				this.inputtrue = true
			},
			sharehandle(){
				this.$emit('commenthandle',{share: true})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.comment-wrap{
		padding-bottom: 100upx;
		.title{
			padding: 40upx 0;
			.left{
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 36upx;
				line-height: 56upx;
				color: $textbl;
			}
			.right{
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 24upx;
				color: #666;
				.text:first-child{
					padding-right: 20upx;
				}
				.text:last-child{
					padding-left: 20upx;
				}
			}
		}
		.list{
			.items{
				color: $textbl;
				margin-bottom: 40upx;
				.information{
					.left{
						image{
							width: 80upx;
							height: 80upx;
							margin-right: 20upx;
							border-radius: 50%;
						}
						.names{
							.name{
								font-family: "PingFang SC Bold";
								font-weight: 700;
								font-size: 28upx;
							}
							.time{
								font-family: "PingFang SC";
								font-size: 22upx;
								color: #999;
							}
						}
					}
					.right{
						font-family: "PingFang SC";
						font-size: 22upx;
						image{
							width: 32upx;
							height: 32upx;
							margin-left: 4upx;
						}
					}
					.main{
						color: #F177C1;
					}
				}				
				.content{
					padding: 20upx 0 22upx;
					padding-left: 100upx;
					font-family: "PingFang SC";
					font-size: 28upx;
					color: #333;
				}
				.reply{
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 22upx;
					padding-left: 116upx;
				}
			}
		}
		.footerbar{
			width: 100%;
			background: #fff;
			box-shadow: 0 -6upx 12upx rgba(27, 27, 221, 0.05);
			position: fixed;
			padding-top: 20upx;
			padding-bottom: calc(env(safe-area-inset-bottom)/2 + 20upx);
			left: 0;
			bottom: -1upx;
			.input{
				margin-left: 24upx;
				width: 44%;
				height: 66upx;
				border-radius: 33upx;
				background: #fafafe;
				border: 2upx solid #f0f1f9;
				padding: 0 24upx;
				image{
					width: 32upx;
					height: 32upx;
					margin-right: 16upx;
				}
			}
			.images{
				margin-right: 24upx;
				image{
					width: 48upx;
					height: 48upx;
					margin-left: 32upx;
				}
			}
		}
		.comment-input{
			padding: 20upx 0;
			margin: 0 24upx;
			width: 93%;
			input{
				width: 80%;
				height: 66upx;
				line-height: 66upx;
				border-radius: 33upx;
				background: #fafafe;
				border: 2upx solid #f0f1f9;
				padding: 0 24upx;
				font-size: 26upx;
			}
			.btns{
				font-family: "PingFang SC";
				font-size: 30upx;
				color: $textbl;
			}
		}
		.mode{
			max-height: calc(100vh - 104px);
			padding-bottom: 120upx;
			position: relative;
			background: #fff;
			border-top-left-radius: 28upx;
			border-top-right-radius: 28upx;
			/deep/.u-sticky{
				top: 0!important;
			}
			.title{
				width: 100%;
				background: #fff;
				z-index: 99;
				border-top-left-radius: 28upx;
				border-top-right-radius: 28upx;
				image{
					width: 48upx;
					height: 48upx;
					position: absolute;
					left: 24upx;
				}
				.name{
					font-family: "PingFang SC Bold";
					font-weight: 700;
					color: $textbl;
				}
			}
			.list-scroll{
				height: calc(100vh - 100px);
			}
			.list{
				padding: 40upx 24upx 120upx;
				.allcomment{
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 32upx;
					line-height: 56upx;
					text-align: left;
					color: $textbl;
					margin: 20upx 0 40upx;
				}
				.items{
					.information{
						.left{
							image{
								width: 64upx;
								height: 64upx;
							}
						}
					}
					.content{
						padding-left: 84upx;
					}
					.oline-wrap{
						width: 580upx;
						height: 68upx;
						margin-left: 84upx;
						border-radius: 4px;
						background: #fafafe;
						border: 1px solid #f0f1f9;
						line-height: 68upx;
						padding: 0 16upx;
						margin-top: 20upx;
						font-family: "PingFang SC";
						font-size: 26upx;
						color: #767682;
					}
					.reply{
						padding-left: 100upx;
					}
				}
			}
			.comment-input{
				padding: 24upx 30upx;
				padding-bottom: calc(env(safe-area-inset-bottom)/2 + 24upx);
				box-shadow: 0 -6upx 12upx rgba(27, 27, 221, 0.05);
				width: 92%;
				position: fixed;
				left: 0;
				bottom: -1upx;
				margin: 0;
				background: #fff;
			}
		}
	}
</style>