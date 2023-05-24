<template>
	<view class="article-wrap">
		<view class="list" v-for="(item,index) in list" :key="index">
			<!-- 单图 -->
			<view class="items flex-between" v-if="item.action_txt.image_text&&item.action_txt.image_text.length==1" @click="todetailhandle(item)">
				<view class="left">
					<view class="title much-ell-two">{{item.action_txt.title}}</view>
					<view class="bottom flex-middle">
						<!-- 是否显示置顶 -->
						<view class="topping" v-if="item.action_txt.is_top==1">置顶</view>
						<view class="text">{{item.action_txt.comments}}评论</view>
						<view class="text">{{item.action_txt.created_at}}</view>
					</view>
				</view>
				<view class="right">
					<image :src="item.action_txt.image_text[0]" mode=""></image>
				</view>
			</view>
			<!-- 多图 -->
			<view class="items item-many" v-else @click="todetailhandle(item)">
				<view class="title much-ell-two">{{item.action_txt.title}}</view>
				<view class="images flex-between">
					<image v-for="(items,indexs) in item.action_txt.image_text" :key="indexs" v-if="indexs<=2" :src="items" mode=""></image>
					<view style="width: 210rpx;"></view>
				</view>
				<view class="bottom flex-middle">
					<!-- 是否显示置顶 -->
					<view class="topping" v-if="item.action_txt.is_top==1">置顶</view>
					<view class="text">{{item.action_txt.comments}}评论</view>
					<view class="text">{{item.action_txt.created_at}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['list'],
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		},
		methods:{
			todetailhandle(item){
				this.$Router.push({path:'/pages/index/articledetails',query:{type:'1',id:item.action_txt.id}})
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
				.title{
					color: $textbl;
					font-size: 32upx;
					font-weight: 700;
					line-height: 44upx;
				}
				.bottom{
					margin-top: 34upx;
					.topping{
						width: 72upx;
						height: 36upx;
						text-align: center;
						line-height: 36upx;
						border-radius: 4upx;
						background: rgba(255, 255, 255, 0);
						border: 2upx solid #cc1919;
						font-family: "PingFang SC";
						font-size: 22upx;
						color: #cc1919;
						margin-right: 16upx;
					}
					.text{
						font-size: 24upx;
						color: #999999;
						margin-right: 16upx;
					}
				}
				.right{
					margin-left: 40upx;
					height: 160upx;
					image{
						width: 226upx;
						height: 160upx;
						display: inline-block;
						border-radius: 8upx;
					}
				}
			}
			.item-many{
				.images{
					margin-top: 20upx;
					margin-left: 0;
					height: 144upx;
					flex-wrap: wrap;
					image{
						width: 210upx;
						height: 144upx;
						border-radius: 8upx;
					}
				}
				.bottom{
					margin-top: 20upx;
				}
			}
		}
	}
</style>