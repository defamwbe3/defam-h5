<template>
	<view class="search">
		<view class="search-box">
			<u-search bgColor="#f4f5fb" placeholderColor="#BEBEC0" searchIconColor="#BEBEC0" :showAction="true" actionText="搜索"
			 :animation="true" @search="handleInput" @custom="handleInput" v-model="value" shape="square"></u-search>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history">
			<view class="history-top">
				<view>搜索历史</view>
				<u-icon name="trash" @click="handleDelete"></u-icon>
			</view>
			<view class="titleList" v-if="searchLists.length>0">
				<view class="title" v-for="(item, index) in searchLists" :key='index' @click="handleInputtwo(item)">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapMutations, mapActions, mapState, mapGetters } from 'vuex';
	export default {
		data() {
			return {
				title: '首页',
				titleBold: true,
				backIconColor: '#000',
				backIconSize: 44,
				background: {
					background: '#ffffff'
				},
				value: '',
				searchLists:[],
				tabsactive: 0
			}
		},
		computed: {
			// ...mapGetters(['searchList']),
		},
		onShow() {
			this.searchLists = uni.getStorageSync('searchList')||[]
			this.barHeight = this.StatusBar
			this.bgOne = 'background:none; top:'+ this.barHeight + 'px'
			this.tabsactive = this.$Route.query.tabsactive||0
			console.log("------------",this.tabsactive)
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
			if(this.scrollTop<45){
				this.bgOne = 'background:none; top:'+ this.barHeight + 'px' 
			}else{
				this.bgOne = 'background: #F6F7F9; top:'+ this.barHeight + 'px'
			}
		},
		onPullDownRefresh() {
			this.searchLists = uni.getStorageSync('searchList')||[]
			this.barHeight = this.StatusBar
			this.bgOne = 'background:none; top:'+ this.barHeight + 'px'
			uni.stopPullDownRefresh();
		},
		methods:{
			// 搜索
			handleInput () {
				let searchList =  uni.getStorageSync('searchList')||[]
				if(this.value!=''){
					searchList.push(this.value)
					searchList = searchList.reverse()
					uni.setStorageSync('searchList', searchList)
				}
				this.$Router.push({
					path: '/pages/other/searchlist',
					query: { value: this.value, key: 1,tabsactive: this.tabsactive}
				})
			},
			handleInputtwo(value){
				this.$Router.push({
					path: '/pages/other/searchlist',
					query: { value: value, key: 1,tabsactive: this.tabsactive}
				})
			},
			handleDelete(){
				uni.setStorageSync('searchList', [])
				this.searchLists = []
			},
		}
	}
</script>

<style lang="scss">
	.search-box{
		margin: 30upx;
	}
	.search-history{
		padding:0 20upx;
		margin-bottom: 60upx;
		.history-top{
			font-size: 32upx;
			padding: 30upx 10upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 600;
			.iconfont{
				color: #838383;
				font-weight: 500;
				font-size: 36upx;
			}
		}
		.titleList{
			display: flex;
			flex-wrap: wrap;
			.title{
				display: inline-block;
				padding: 4upx 20upx;
				border-radius: 8upx;
				background: #f4f5fb;
				margin: 0 10upx;
				color: #333333;
				font-size: 28upx;
				margin-bottom: 20upx;
			}
		}
	}
</style>
