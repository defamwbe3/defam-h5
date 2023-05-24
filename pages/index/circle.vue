<template>
	<view class="container">
		<movable-area>
			<!-- #ifdef H5 -->
			<view class="content">
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<scroll-view :scroll-y="true" style="height: 100vh;" @scrolltolower="scrollhandle" 	lower-threshold="50">
			<view>
			<!-- #endif -->
				<!-- 搜索 -->
				<navbarsearch tabsactive="2"></navbarsearch>
				<u-loading-page :loading="pageLoading"></u-loading-page>
				<block v-if="!pageLoading">
					<view class="bottom">
						<!-- 是平台推荐的用户所发布的长短文+所关注用户发布的长短文 -->
						<articlelist v-if="list.length>0" :list="list" :isadd="true" @acticlehandle="acticlehandle" @integralhandle="integralhandle" :memberId="userinfo.id"></articlelist>
						<engine-empty v-else :tipText="'暂无列表信息'"></engine-empty>
					</view>
				</block>
				<view class="bottom beian flex" @click="beian" v-if="!pageLoading">
					<image class="beian-img2" src="../../static/images/beian-cj.png.gif" mode=""></image>
					<image class="beian-img1" src="../../static/images/beian.png" mode=""></image>
					<view class="beian-text">粤ICP备2023010984号-1</view>
				</view>
			<!-- #ifdef MP-WEIXIN -->
			</view>
			</scroll-view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			</view>
			<!-- #endif -->
			<!-- 添加拖拽 -->
			<movable-view :x="x" :y="y" direction="all" @change="onChange">
				<image :src="IMG_URL+'add.png'" mode="" @click.stop="$Router.push('/pages/release/index')"></image>
			</movable-view>
		</movable-area>
		<engine-tabbar></engine-tabbar>
		<isintegral :inputmode="inputmode" :integramessage="integramessage" :integramessagedata="integramessagedata" @tozizhihandle="tozizhihandle"></isintegral>
	</view>
</template>

<script>
import navbarsearch from './components/navbarsearch.vue';
import articlelist from './components/articlelist.vue';
import { userInfo } from '@/engine/storage';
import isintegral from '@/components/common/is_integral.vue';
export default {
	components: {
		navbarsearch,
		articlelist,
		isintegral
	},
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			list: [],
			hasNext: false,
			page: 1,
			loadStatus: 'loadmore',
			pageLoading: true,
			userinfo:{},
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
			success: function (res) {
				bottom = res.safeAreaInsets.bottom
			}
		})
		this.y = uni.getWindowInfo().screenHeight - (180+bottom)	
	},
	onLoad() {
		this.getList();
		if(uni.getStorageSync('token')){
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
		}
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getList();
	},
	onShareAppMessage(res) {
		this.$http('member/forward', {action_id: res.target.dataset.id,type: 2}, 'get').then(res=>{
		}).catch(()=>{})
	},
	mounted() {
		this.$nextTick(() => {
			// #ifdef H5
				let scrollTargetBox = document.querySelector('.content');
				console.log(scrollTargetBox.scrollHeight)
				scrollTargetBox.onscroll = () => {
					// console.log(scrollTargetBox.scrollHeight)
					var scrollHeight = scrollTargetBox.scrollHeight;
					var scrollTop = scrollTargetBox.scrollTop;
					var clientHeight = scrollTargetBox.clientHeight;
					console.log(scrollHeight,clientHeight,scrollTop )
					if (scrollHeight - clientHeight == scrollTop) {
						//滚动条滚到最底部
						if (this.hasNext) {
							this.page++;
							this.getList();
						}
					}
				}
			// #endif
		})
	},
	methods: {
		scrollhandle(e){
			console.log(e)
			if (this.hasNext) {
				this.page++;
				this.getList();
			}
		},
		tabshandle(item) {
			this.tabsactive = item.index
			this.page = 1;
			this.getList();
		},
		onChange(e) {
			this.old.x = e.detail.x
			this.old.y = e.detail.y
		},
		//文章列表article?title=&type=all
		getList() {
			this.$http('article', {
				page: this.page,
				type: 'all',
				title: ''
			}, 'get').then((res) => {
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
				setTimeout(()=>{
					this.pageLoading = false
				}, 500)
			}).catch(()=>{})
		},
		acticlehandle(e){
			if(e.dianzan){
				this.page = 1;
				this.getList()
			}
		},
		integralhandle(e){
			this.inputmode = e.inputmode
			this.integramessage = e.message
			this.integramessagedata = e.messagedata
		},
		tozizhihandle(e){
			this.inputmode = e
		},
		beian(){
			this.$tools.routerTo('https://beian.miit.gov.cn/')
		}
	}
}
</script>
<style lang="scss" scoped>
.container {
	overflow: hidden;
	max-height: 100vh;
	.search-box {
		// width: 702rpx;
		width: 100%;
	}
	.content{
		height: 100vh;
		overflow: scroll;
	}
	.bottom{
		padding-bottom: calc(120upx + env(safe-area-inset-bottom));
	}
}
movable-view {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 136upx;
	height: 136upx;
	z-index: 99999;
	image{
		width: 136upx;
		height: 136upx;
	}
}
movable-area {
	width: 100%;
	height: 100%;
}
.beian{
	margin: 0 140rpx 0rpx;
	.beian-img1{
		width: 38rpx;
		height: 38rpx;
		margin-left: 20rpx;
	}
	.beian-img2{
		width: 38rpx;
		height: 38rpx;
	}
	.beian-text{
		margin-left: 20rpx;
		color: #111;
	}
}
</style>
