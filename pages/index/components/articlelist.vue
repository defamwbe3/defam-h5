<template>
	<view class="article-wrap">
		<view class="list">
			<view class="items" v-for="(item,index) in list" :key="index" @click="todetailhandle(item)">
				<view class="information flex-between">
					<view class="left flex-middle">
						<image v-if="item.member&&item.member.avatar" :src="item.member.avatar" mode=""></image>
						<image v-else :src="IMG_URL+'avatar.png'" mode=""></image>
						<view class="names">
							<view class="name" v-if="item.member&&item.member.nickname">{{item.member.nickname}}</view>
							<view class="time">{{item.created_at}}</view>
						</view>
					</view>
					<block v-if="item.belongs_to=='others'">
						<view class="right" v-if="item.is_follow==0" @click.stop="is_followMemberhandle(item)">
							<image :src="IMG_URL+'follow.png'" mode=""></image>
						</view>
					</block>
					<view class="right" v-if="is_main" @click.stop="is_delhandle(item)">
						<image :src="IMG_URL+'sq_icon.png'" mode=""></image>
					</view>
				</view>
				<view class="title much-ell-two" v-if="item.title">{{item.title}}</view>
				<view class="images flex-between" v-if="item.image_text&&item.image_text.length>0">
					<image v-for="(items,indexs) in item.image_text" :key="indexs" :src="items" mode=""></image>
					<view style="width: 210rpx;"></view>
				</view>
				<view class="bottom flex-between">
					<view class="item flex-center" @click.stop="sharemodeidhandle(item)">
						<image :src="IMG_URL+'fenxiang_grey.png'" mode=""></image>
						<view class="name">分享</view>
					</view>
					<view class="item flex-center">
						<image :src="IMG_URL+'pinglun_grey.png'" mode=""></image>
						<view class="name">{{item.comments}}</view>
					</view>
					<view class="item flex-center" @click.stop="is_goodhandle(item)">
						<image :src="item.is_good?IMG_URL+'dianzan_pink.png':IMG_URL+'dianzan.png'" mode=""></image>
						<view class="name" :class="item.is_good?'main':''">{{item.good}}</view>
					</view>
				</view>
			</view>
		</view>
		<sharemodel :sharemode="sharemode" :url="sharemodeurl" @handleclose="handleclose" @integralhandles="integralhandles" :shareid="shareid" :sharetype="2"></sharemodel>
		<!-- 登录提示 -->
		<login-modal></login-modal>
	</view>
</template>

<script>
	import sharemodel from './sharemodel.vue'
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
				shareid: '',
			}
		},
		methods:{
			//分享取消
			handleclose(e){
				this.sharemode = e
			},
			//具体分享
			sharemodeidhandle(item){
				if(uni.getStorageSync('token')){
					this.sharemodeurl = 'pages/index/articledetails?type=2&lang='+item.type+'&id='+item.id
					this.shareid = item.id
					this.sharemode = true
				}else{
					this.$store.commit('IS_LOGIN', true);
				}
			},
			//点赞取消点赞thumbsup/dolike?id=1&type=2(文章)1(资讯)
			is_goodhandle(item){
				if(uni.getStorageSync('token')){
					uni.showLoading()
					this.$http('thumbsup/dolike', {id: item.id,type: 2}, 'get').then(res=>{
						uni.hideLoading()
						if(res.data.is_rewards==1){
							this.$emit('integralhandle',{inputmode: true, message: res.message,messagedata: res.data.sui||''})
						}else{
							let _this = this
							setTimeout(()=>{
								_this.$u.toast(res.message)
							})
						}
						this.$emit('acticlehandle',{dianzan: true})
						
					}).catch(()=>{})
				}else{
					this.$store.commit('IS_LOGIN', true);
				}
			},
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			is_followMemberhandle(item){
				if(uni.getStorageSync('token')){
					uni.showLoading()
					this.$http('memberfollow/is_followMember', {to_member_id: item.member_id, member_id: this.memberId,type: 1}, 'get').then(res=>{
						uni.hideLoading()
						let _this = this
						setTimeout(()=>{
							_this.$u.toast(res.message)
						})
						this.$emit('acticlehandle',{dianzan: true})
					}).catch(()=>{})
				}else{
					this.$store.commit('IS_LOGIN', true);
				}
			},
			todetailhandle(item){
				if(uni.getStorageSync('token')){
					this.$Router.push({path:'/pages/index/articledetails',query:{type: 2,lang:item.type,id: item.id}})
				}else{
					this.$store.commit('IS_LOGIN', true);
				}
			},
			//删除文章或帖子article/member_article_del?id=28
			is_delhandle(item){
				let _this = this;
				uni.showModal({
					title: '提示',
					content: item.type=='short'?'您确定要删除这篇帖子吗？':'您确定要删除这篇文章吗？',
					success: function (res) {
						if (res.confirm) {
							_this.$http('article/member_article_del', {id: item.id}, 'get').then(res=>{
								_this.$u.toast('删除成功')
								_this.$emit('acticlehandle',{dianzan: true})
							}).catch(()=>{})
						}
					}
				})		
			},
			integralhandles(e){
				this.$emit('integralhandle',{inputmode: e.inputmode, message: e.message,messagedata: e.messagedata})
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
					margin-bottom: 24upx;
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
							font-size: 18px;
							color: #080F18;
							
						}
						.time{
							font-family: "PingFang SC";
							font-size: 14px;
							color: #646464;
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
					// font-family: "PingFang SC";
					// font-size: 28upx;
					// color: $textbl;
					margin: 0 0 20upx;
					
					
					font-size: 18px;
					font-family: Inter-Semi Bold, Inter;
					font-weight: normal;
					color: #080F18;
					
				}
				.images{
					flex-wrap: wrap;
					image{
						width: 210upx;
						height: 210upx;
						border-radius: 8upx;
						margin-bottom: 20upx;
					}
				}
				.bottom{
					margin-top: 32upx;
					.item{
						width: 33%;
						image{
							width: 40upx;
							height: 40upx;
						}
						.name{
							font-family: "PingFang SC";
							font-size: 14px;
							color: #646464;
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