<template>
	<view>
		<!-- #ifdef H5 -->
		<!-- <u-navbar title=" " bgColor="#FAFAFE" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold"> -->
			<!-- <view slot="left"></view> -->
			<!-- <view class="numlist flex-middle" v-if="userinfo">
				<view class="logo">
					<image src="" mode=""></image>
				</view>
				<view class="item flex-middle">积分：{{userinfo.integral || '0.00'}}<text @click="$Router.push('/pages/user/integral/index')">去兑换</text></view>
				<view class="item flex-middle">藏宝图碎片：{{userinfo.suipian_total}}<text @click="$Router.push('/pages/user/mymap/myMap')">去兑换</text></view>
			</view> -->
			<view class="search-box" @click="toLogin()">
				<!-- :animation="true" actionText="搜索-->
				<u-search bgColor="#F4F5FB" placeholderColor="#BEBEC0" searchIconColor="#BEBEC0" :showAction="false" :disabled="true"></u-search>
			</view>
		<!-- </u-navbar> -->
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<u-navbar title=" " bgColor="#FAFAFE" placeholder titleStyle="fontWeight: bold">
			<view slot="left" class="search-boxs"  @click="toLogin()">
				<!--  actionText="搜索" :animation="true" -->
				<u-search bgColor="#F4F5FB" placeholderColor="#BEBEC0" searchIconColor="#BEBEC0" :showAction="true"></u-search>
			</view>
		</u-navbar>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		props:['tabsactive','userinfo'],
		data(){
			return{
				
			}
		},
		methods:{
			toLogin(){
				if(uni.getStorageSync('token')){
					this.$Router.push({path:'/pages/other/search',query:{tabsactive:this.tabsactive}})
				}else{
					this.$store.commit('IS_LOGIN', true);
					// uni.navigateTo({
					// 	url:'/pages/public/login'
					// })
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-fixed{
		z-index: 999;
	}
	.search-box {
		width: 702rpx;
		margin: 0 auto;
	}
	// .numlist{
	// 	padding: 20upx 32upx;
	// 	.item{
	// 		font-size: 26upx;
	// 		color: #666666;
	// 		width: 50%;
	// 		text{
	// 			display: inline-block;
	// 			width: 86rpx;
	// 			height: 40rpx;
	// 			border-radius: 8rpx;
	// 			background: rgba(27,27,221,0.1);
	// 			color: #1B1BDD;
	// 			font-size: 24upx;
	// 			text-align: center;
	// 			line-height: 40upx;
	// 			margin-left: 10upx;
	// 		}
	// 	}
	// }
	.search-boxs{
		width: 520upx;
	}
</style>