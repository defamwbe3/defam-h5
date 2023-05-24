<template>
	<view class="article-wrap">
		<view class="list">
			<view class="items" v-for="(item,index) in list" :key="index" @click="todetailhandle(item)">
				<view class="information flex-between">
					<view class="left flex-middle">
						<image v-if="item.action_txt.member&&item.action_txt.member.avatar" :src="item.action_txt.member.avatar" mode=""></image>
						<image v-else :src="IMG_URL+'avatar.png'" mode=""></image>
						<view class="names">
							<view class="name" v-if="item.action_txt.member&&item.action_txt.member.nickname">{{item.action_txt.member.nickname}}</view>
							<view class="time">{{item.action_txt.created_at}}</view>
						</view>
					</view>
					<block v-if="item.action_txt.belongs_to=='others'">
						<view class="right" v-if="item.action_txt.is_follow==0" @click.stop="is_followMemberhandle(item)">
							<image :src="IMG_URL+'follow.png'" mode=""></image>
						</view>
					</block>
				</view>
				<view class="title much-ell-two">{{item.action_txt.title}}</view>
				<view class="images flex-between" v-if="item.action_txt.image_text&&item.action_txt.image_text.length>0">
					<image v-for="(items,indexs) in item.action_txt.image_text" :key="indexs" :src="items" mode=""></image>
					<view style="width: 210rpx;"></view>
				</view>
				<view class="bottom flex-between">
					<view class="item flex-center" @click.stop="sharemodeidhandle(item)">
						<image :src="IMG_URL+'fenxiang_grey.png'" mode=""></image>
						<view class="name">分享</view>
					</view>
					<view class="item flex-center">
						<image :src="IMG_URL+'pinglun_grey.png'" mode=""></image>
						<view class="name">{{item.action_txt.comments}}</view>
					</view>
					<view class="item flex-center" @click.stop="is_goodhandle(item)">
						<image :src="item.action_txt.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
						<view class="name" :class="item.action_txt.is_good?'main':''">{{item.action_txt.good}}</view>
					</view>
				</view>
			</view>
		</view>
		<sharemodel :sharemode="sharemode" :url="sharemodeurl" @handleclose="handleclose"></sharemodel>
	</view>
</template>

<script>
	import sharemodel from '../../../index/components/sharemodel.vue'
	export default{
		props:['list','is_main','memberId'],
		components:{
			sharemodel
		},
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				sharemode: false,
				sharemodeurl: '',
			}
		},
		methods:{
			//分享取消
			handleclose(e){
				this.sharemode = e
			},
			//具体分享
			sharemodeidhandle(item){
				this.sharemodeurl = 'pages/index/articledetails?type=2&lang='+item.action_txt.type+'&id='+item.action_txt.id
				this.sharemode = true
			},
			//点赞取消点赞thumbsup/dolike?id=1&type=2(文章)1(资讯)
			is_goodhandle(item){
				uni.showLoading()
				this.$http('thumbsup/dolike', {id: item.action_txt.id,type: 2}, 'get').then(res=>{
					uni.hideLoading()
					this.$u.toast('操作成功')
					this.$emit('acticlehandle',{dianzan: true})
				}).catch(()=>{})
			},
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			is_followMemberhandle(item){
				uni.showLoading()
				this.$http('memberfollow/is_followMember', {to_member_id: item.action_txt.member_id, member_id: this.memberId,type: 1}, 'get').then(res=>{
					uni.hideLoading()
					this.$u.toast('操作成功')
					this.$emit('acticlehandle',{dianzan: true})
				}).catch(()=>{})
			},
			todetailhandle(item){
				this.$Router.push({path:'/pages/index/articledetails',query:{type: 2,lang:item.action_txt.type,id: item.action_txt.id}})
			},
			//删除文章或帖子article/member_article_del?id=28
			is_delhandle(item){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: item.action_txt.type=='short'?'您确定要删除这篇帖子吗？':'您确定要删除这篇文章吗？',
					success: function (res) {
						if (res.confirm) {
							_this.$http('article/member_article_del', {id: item.action_txt.id}, 'get').then(res=>{
								_this.$u.toast('删除成功')
								_this.$emit('acticlehandle',{dianzan: true})
							}).catch(()=>{})
						}
					}
				})		
			},
		}
	}
</script>

<style lang="scss" scoped>
	.article-wrap{
		.list{
			margin: 20upx 24upx;
			.items{
				background: $footerColor;
				margin-bottom: 20upx;
				padding: 30upx 24upx;
				border-radius: 16upx;
				.information{
					image{
						width: 80upx;
						height: 80upx;
						margin-right: 20upx;
					}
					.left{
						image{
							border-radius: 50%;
						}
					}
					.names{
						.name{
							font-family: "PingFang SC Bold";
							font-weight: 700;
							font-size: 28upx;
							color: $textbl;
						}
						.time{
							font-family: "PingFang SC";
							font-size: 22upx;
							color: #999;
						}
					}
					.right{
						image{
							width: 44upx;
							height: 48upx;
						}
					}
				}
				.title{
					font-family: "PingFang SC";
					font-size: 28upx;
					color: $textbl;
					margin: 24upx 0 20upx;
				}
				.images{
					height: 210upx;
					flex-wrap: wrap;
					image{
						width: 210upx;
						height: 210upx;
						border-radius: 8upx;
					}
				}
				.bottom{
					margin-top: 52upx;
					.item{
						width: 33%;
						image{
							width: 40upx;
							height: 40upx;
						}
						.name{
							font-family: "PingFang SC";
							font-size: 24upx;
							color: #767682;
						}
						.main{
							color: #F177C1;
						}
					}
				}
			}
		}
	}
</style>