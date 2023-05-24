<template>
	<view class="contenter">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<view class="bottom" v-if="list && list.length">
				<!-- 热门资讯 -->
				<realimeinfo v-if="tabsactive==0" :list="list"></realimeinfo>
				<!-- 热门活动 -->
				<activitylist v-if="tabsactive==1||tabsactive==5" :list="list"></activitylist>
				<!-- 热门KOL 不可以添加 -->
				<!-- <articlelist v-if="tabsactive==2" :list="5" :isadd="false"></articlelist> -->
				<!-- 热门文章 可以添加 -->
				<!-- 这里的热门文章展示的是经过后台管理员精选出来的长短文 -->
				<articlelist v-if="tabsactive==2" :list="list" :isadd="true" @acticlehandle="acticlehandle"></articlelist>
			</view>
			<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
		</block>
	</view>
</template>

<script>
import realimeinfo from '../index/components/realimeinfo.vue';
import activitylist from '../index/components/activitylist.vue';
import articlelist from '../index/components/articlelist.vue';
export default {
	components: {
		realimeinfo,
		activitylist,
		articlelist
	},
	data () {
		return {
			list: [],
			hasNext: false,
			page: 1,
			loadStatus: 'loadmore',
			pageLoading: true,
			value: '',
			tabsactive: '',
		}
	},
	onLoad () {
		this.value = this.$Route.query.value||'';
		this.tabsactive = this.$Route.query.tabsactive||0
		if(this.tabsactive==5){
			this.activitylist()
		}else{
			this.getList();
		}
		setTimeout(()=>{
			this.pageLoading = false
		}, 1000)
	},
	onPullDownRefresh() {
		this.getbannerList();
		this.page = 1;
		if(this.tabsactive==5){
			this.activitylist()
		}else{
			this.getList();
		}
	},
	onReachBottom() {
		if (this.hasNext) {
			this.page++;
			if(this.tabsactive==5){
				this.activitylist()
			}else{
				this.getList();
			}
		}
	},
	methods: {
		getList() {
			let url = ''
			if(this.tabsactive == 0){
				url = 'realinfo'
			}else if(this.tabsactive == 2){
				url = 'article'
			}else if(this.tabsactive == 1){
				url = 'activity/hot_activity'
			}
			this.$http(url, 
				this.tabsactive != 1?
				{page: this.page,
				title: this.value,
				category_id: '',}
				:{page: this.page,
				title: this.value,
				status:'hot'},
			 'get').then((res) => {
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
		activitylist(){
			this.$http('activity/hot_activity', {
				page: this.page,
				status: 'hot',
				title: this.value
			}, 'get').then((res) => {
				uni.stopPullDownRefresh();
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
		}
	}
}
</script>

<style lang="scss" scoped>
	.contenter{
		padding-bottom: 50upx;
	}
	.search-box{
		margin: 30upx;
	}
	.search-group {
		z-index: 99;
		height: 92rpx;
		box-sizing: border-box;
		margin-left: 40upx;
		margin-right: 20upx;
		flex: 1;
		.search-input {
			position: relative;
			width: 100%;
			height: 72rpx;
			border-radius: 40rpx;
			box-sizing: border-box;
			padding: 0 24rpx;
			background: #fff;
			text {
				position: absolute;
				left: 24rpx;
				color: #6D6E7C;
				font-size: 40upx;
			}
			.input {
				width: 100%;
				height: 72rpx;
				box-sizing: border-box;
				font-size: 28rpx;
				line-height: 72rpx;
				color: #000;
				padding-left: 50upx;
			}
		}
	}
	.goodsList{
		padding: 0 30upx;
		justify-content: space-between;
		padding-top: 100upx;
		.goodsItem{
			background-color: #FFFFFF;
			border-radius: 10upx;
			overflow: hidden;
			margin-bottom: 30upx;
			padding: 10upx;
			image{
				width: 200upx;
				height: 200upx;
				background-color: #f9f9f9;
				margin-right: 10upx;
				border-radius: 16upx;
			}
			.goods-con{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-content: space-between;
				flex: 1;
				height: 200upx;
				.goods-title{
					font-size: 28upx;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2;
					margin: 10upx 0;
					color: #000;
				}
				.goods-sub{
					font-size: 24upx;
					text{
						color: #FF1B40;
						border: 2upx solid #FF1B40;
						padding: 2upx 10upx;
						border-radius: 30upx;
						display: inline-block;
					}
				}
				.goods-btn{
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24upx;
					.goods-price{
						font-size: 30upx;
						color: #FF1B40;
						font-weight: 600;
						text{
							font-size: 24upx;
							font-weight: 500;
						}
					}
					.goods-volume{
						color: #6D6E7C;
					}
				}
			}
		}
	}
</style>
