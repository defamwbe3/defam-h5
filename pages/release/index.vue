<template>
	<view class="release-wrap">
		<image class="release-bg" :src="IMG_URL+'release-bg.png'" mode=""></image>
		<view class="content">
			<view class="title">发布</view>
			<view class="text">这一刻，说出你的观点。</view>
			<view class="list flex-between">
				<view class="item flex-center flex-col" @click="jump('/pages/release/posting')">
					<image :src="IMG_URL+'fabu_ft.png'" mode=""></image>
					<view class="name">发布观点</view>
				</view>
				<view class="item flex-center flex-col" @click="jump('/pages/release/postarticle')">
					<image :src="IMG_URL+'fabu_fwz.png'" mode=""></image>
					<view class="name">发布长文</view>
				</view>
			</view>
			<view class="close flex-center">
				<image :src="IMG_URL+'fabu_guanbi.png'" mode="" @click="$Router.back()"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		},
		onLoad() {},
		methods:{
			jump(path){
				this.$Router.push({
					path: path,
					query: {}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.release-wrap{
		width: 100%;
		height: 100vh;
		position: relative;
		.release-bg{
			width: 100%;
			height: 100vh;
			display: inline-block;
		}
		.content{
			position: absolute;
			top: 0;
			margin: 0 40upx;
			width: 89.4%;
			font-family: "PingFang SC Bold";
			color: $textbl;
			.title{
				margin-top: 240upx;
				margin-bottom: 40upx;
				font-weight: 700;
				font-size: 64upx;
			}
			.text{
				font-weight: 700;
				font-size: 36upx;
			}
			.list{
				margin-top: 328upx;
				margin-bottom: 80upx;
				.item{
					width: 320upx;
					height: 376upx;
					border-radius: 24upx;
					background: #fff;
					box-shadow: 0 12upx 36upx rgba(27, 27, 221, 0.05);
					image{
						width: 96upx;
						height: 96upx;
						margin-bottom: 80upx;
					}
					.name{
						font-weight: 700;
						font-size: 28upx;
					}
				}
			}
			.close{
				image{
					width: 80upx;
					height: 80upx;
				}
			}
		}
	}
</style>