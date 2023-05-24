<template>
	<view class="detail-wrap">
		 <image class="images" :src="detail.image" mode=""></image>
		<!-- <image class="images" :src="IMG_URL+'activity-img.png'" mode=""></image> -->
		<view class="info-con compnt">
			<view class="title flex-between">
				<view class="name">{{detail.title}}</view>
				<!-- 活动状态 normal 未开始 ing进行中 hidden 已结束 -->
				<view class="status">{{detail.status=='normal'?'未开始':detail.status=='ing'?'进行中':'已结束'}}</view>
			</view>
			<view class="label flex">
				<view class="item" v-for="(item,index) in detail.tags" :key="index" @click="handleshaixuan(item)">{{item}}</view>
			</view>
			<view class="liantext" @click.stop="goLink(detail)">{{detail.link.name}} &nbsp;&nbsp;&nbsp; 独特奖励：<text>{{detail.special}}</text></view>
			<button v-if="detail.is_registered==0" @click="registeractivity">报名活动</button>
			<button v-else class="buttons" @click="abolish">取消报名</button>
		</view>
		<view class="rows compnt">
			<view class="row flex-between">
				<view class="label">开始时间</view>
				<view class="time">{{detail.start_time}}~{{detail.end_time}}</view>
			</view>
			<view class="row flex-between">
				<view class="label">报名人数</view>
				<view class="time"><text class="num">{{detail.registered_number}}</text>/{{detail.number}}人</view>
			</view>
			<view class="row flex-between">
				<view class="label">发起人</view>
				<view class="time flex-middle" v-if="detail.member.is_enterprise==0" @click.stop="$Router.push('/pages/activity/qualification')">
					{{detail.member.nickname}}(未认证)
					<text class="iconfont icon-icon_direction_rightoutlined"></text>
				</view>
				<view class="time flex-middle" v-else>
					{{detail.member.nickname}}(已认证)
					<text class="iconfont icon-icon_direction_rightoutlined"></text>
				</view>
			</view>
		</view>
		<view class="content-detail compnt">
			<view class="name bb-1px">活动详情</view>
			<mp-html class="tips" :content="detail.content"></mp-html>
		</view>
		<view class="stickyScrollTop compnt">
			<u-loading-page :loading="pageLoading"></u-loading-page>
			<block v-if="!pageLoading">
				<comment :commentlist="commentlist" @commenthandle="commenthandle" @handlepinglun="handlepinglun" @integralhandle="integralhandle"
				:type="type" :detail="detail"></comment>
			</block>
		</view>
		<sharemodel :sharemode="sharemode" :url="sharemodeurl" @handleclose="handleclose"@integralhandles="integralhandles" :shareid="id" :sharetype="type"></sharemodel>
		<u-popup :show="inputmode" mode="center" round="16" :customStyle="{ width: '80%', background: '#fff'}" :safeAreaInsetBottom="false">
			<view class="mode">
				<view class="title">温馨提示</view>
				<view class="con">
					{{detail.after_content}}
				</view>
				<view class="btns flex-between">
				    <button class="button" @click="inputmodehandle()">我知道了</button>
				</view>
			</view>
		</u-popup>
		<isintegral :inputmode="inputmodeintegral" :integramessage="integramessage" :integramessagedata="integramessagedata" @tozizhihandle="tozizhihandle"></isintegral>
		<!-- 登录提示 -->
		<login-modal></login-modal>
	</view>
</template>

<script>
	import MpHtml from '@/components/mp-html/mp-html'
	import comment from '../index/components/comment.vue'
	import sharemodel from '../index/components/sharemodel.vue'
	import isintegral from '@/components/common/is_integral.vue';
	export default{
		components:{
			MpHtml,
			comment,
			sharemodel,
			isintegral
		},
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				detail: {
					link:{},
					member: {}
				},
				commentlist:[],
				inputmode: false,
				type: 3,
				sharemode: false,
				id: '',				
				commentlist:[],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true,
				sharemodeurl:'',
				inputmodeintegral: false,
				integramessage: '',
				integramessagedata: {}
			}
		},
		onLoad() {
			try{
				this.id = this.$Route.query.id;
				this.detailhandle()
				this.commentlisthandle()
			}catch(e){
				//TODO handle the exception
			}
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
		onPullDownRefresh() {
			this.detailhandle();
		},
		onShareAppMessage(res) {
			this.$http('member/share', {action_id: this.id,type: this.type}, 'get').then(res=>{
			}).catch(()=>{})
		},
		methods:{
			handleshaixuan(item){
				this.$Router.push({path:'/pages/other/searchlist',query:{tabsactive:5,value: item}})
			},
			//报名活动
			registeractivity(){
				if(uni.getStorageSync('token')){
					this.inputmode = true
				}else{
					this.$store.commit('IS_LOGIN', true);
				}
				// uni.showModal({
				// 	title: '提示',
				// 	content: '你确定要报名当前活动吗？',
				// 	success: function (res) {
				// 		if (res.confirm) {
				// 			_this.$http('activitysignup/activitySignUp', {activity_id: _this.detail.id}, 'post').then(res=>{
				// 				_this.$u.toast('报名成功')
				// 				_this.detailhandle()
				// 			}).catch(()=>{})
				// 		}
				// 	}
				// })
			},
			inputmodehandle(){
				this.$http('activitysignup/activitySignUp', {activity_id: this.detail.id}, 'post').then(res=>{
					this.$u.toast('报名成功')
					this.inputmode = false
					this.detailhandle()
				}).catch(()=>{
					this.inputmode = false
				})
			},
			// 取消报名
			abolish(){
				this.$http('activitysignup/cancelSignUp', {activity_id: this.detail.id}, 'post').then(res=>{
					this.$u.toast(res.data)
					this.detailhandle()
				}).catch(()=>{
					
				})
			},
			//活动详情
			detailhandle(){
				uni.showLoading()
				this.$http('activity/detail', {id: this.id}, 'get').then(res=>{
					uni.hideLoading()
					uni.stopPullDownRefresh();
					this.detail = res.data
					if(this.detail.tags.length>0){
						this.detail.tags = this.detail.tags.split(',')
					}
					let _this = this
					// setTimeout(()=>{
					// 	if(_this.detail.is_registered==1){
					// 		_this.inputmode = true
					// 	}
					// },1000)
					if (res.data) {
						uni.setNavigationBarTitle({
							title: res.data.title
						})
					}
					this.sharemodeurl = 'pages/index/activitydetail?id='+this.detail.id
				})
			},
			//评论列表comment?id=1&type=2
			commentlisthandle(){
				uni.showLoading()
				this.$http('comment', {page: this.page,id: this.id,type: this.type}, 'get').then(res=>{
					uni.hideLoading()
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.commentlist = this.page == 1 ? newData.data : [...this.commentlist, ...newData.data];
				}).catch(()=>{})
			},
			//评论返回
			commenthandle(e){
				if(e.pinglun){
					this.page = 1;
					this.commentlisthandle()
					this.detailhandle()
				}else if(e.dianzan){
					this.detailhandle()
				}else if(e.share){
					this.sharemode = e.share
				}
			},
			//分享取消
			handleclose(e){
				this.sharemode = e
				this.detailhandle()
			},
			//跳转到评论的位置
			handlepinglun(){
				uni.createSelectorQuery().select('.stickyScrollTop').boundingClientRect(res=>{
					//这里会获取到选择器中元素距离顶部的距离，以便后续定位或吸顶效果实现
					uni.pageScrollTo({
					   scrollTop: res.top,
					   duration: 0,
					})
				}).exec();
			},
			integralhandle(e){
				this.inputmodeintegral = e.inputmode
				this.integramessage = e.message
				this.integramessagedata = e.messagedata
			},
			tozizhihandle(e){
				this.inputmodeintegral = e
			},
			integralhandles(e){
				this.integralhandle(e)
			},
			// 跳转主链
			goLink(detail){
				// if (detail.jump_url) {
					this.$tools.routerTo(detail.link.url)
				// }
				// console.log('???????????',detail.link.url)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tips{
		line-height: 2.5;
	}
	.detail-wrap{
		.images{
			width: 100%;
			height: 384upx;
		}
		.compnt{
			margin-bottom: 20upx;
			background: #fff;
			padding: 32upx 24upx;
		}
		.info-con{
			.title{
				margin-bottom: 20upx;
				.name{
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 36upx;
					color: $textbl;
					width: 85%;
				}
				.status{
					font-family: "PingFang SC";
					font-size: 28upx;
					color: #1b1bdd;
				}
			}
			.label{
				margin-bottom: 20upx;
				.item{
					font-family: "PingFang SC";
					font-size: 22upx;
					color: #f177c1;
					height: 40upx;
					line-height: 40upx;
					border-radius: 4upx;
					background: #fafafe;
					padding: 0 14upx;
					margin-right: 8upx;
				} 
				.item:nth-child(2){
					color: #FFAF39;
				}
				.item:nth-child(3){
					color: #01C8E5;
				}
				.item:nth-child(4){
					color: #1B1BDD;
				}
				.item:nth-child(5){
					color: #FF1C41;
				}
			}
			.liantext{
				font-size: 24upx;
				color: #65789D;
				margin-bottom: 60upx;
				text{
					color: #4B60FE;
				}
			}
			.buttons{
				background: #f0f1f9;
				color: #666;
			}
		}
		.rows{
			padding: 0 24upx;
			.row{
				padding: 32upx 0;
				.label{
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 28upx;
					color: $textbl;
				}
				.time{
					font-family: "PingFang SC";
					font-size: 28upx;
					color: #666;
					.num{
						color: $textbl;
					}
				}
			}
		}
		.content-detail{
			.name{
				padding-bottom: 32upx;
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 32upx;
				color: $textbl;
				margin-bottom: 32upx;
			}
		}
	}
	.mode{
		padding: 40upx 40upx 30upx;
		min-height: 628upx;
		position: relative;
		.title{
			text-align: center;
			font-weight: 700;
			margin-bottom: 20upx;
			color: #222;
			font-size: 32upx;
		}
		.con{
			padding: 30upx 0;
			font-family: "PingFang SC";
			font-size: 28upx;
			line-height: 50upx;
			text-align: center;
			color:$textbl;
		}
		.btns {
			width: 100%;
			position:absolute;
			bottom: 30upx;
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
				flex: none;
		    }
		    .button::after {
		        border: none;
		    }
		}
	}
</style>