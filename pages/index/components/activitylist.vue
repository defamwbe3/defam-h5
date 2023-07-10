<template>
	<view class="activity-wrap">
		<view class="list">
			<view class="items" :class="type=='collection'?'bottoms':''" v-for="(item,index) in list" :key="index"
			 @click="$Router.push({path:'/pages/activity/activitydetail',query:{id:item.id}})">
				<image class="activity-img" v-if="item&&item.image" :src="item.image" mode=""></image>
				<view class="con">
					<view class="activity-title" v-if="item.title">{{item.title}}</view>
					<view class="activity-time flex-middle">
						<image :src="IMG_URL+'shijian.png'" mode=""></image>
						<view class="text">{{item.start_time}} ~ {{item.end_time}}</view>	
					</view>	
					<view class="activity-time flex-middle">
						<image :src="IMG_URL+'renshu.png'" mode=""></image>
						<view class="text">限{{item.number}}人报名参加</view>
					</view>	
					<view class="bottom flex-between">
						<view class="text">已报名：{{item.registered_number}}</view>	
						<button class="button buttons" v-if="item.status=='hidden'">已结束</button>
						<block v-else>
							<button class="button" v-if="item.is_registered==0">进行中</button>
							<button class="button buttons" v-else>已报名</button>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['list','type'],
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-wrap{
		margin: 20upx 24upx;
		.list{
			.items{
				margin-bottom: 20upx;
				border-radius: 16upx;
				overflow: hidden;
				background: $footerColor;
				.activity-img{
					width: 702upx;
					height: 360upx;
				}
				.con{
					padding: 32upx 24upx;
					// color: $textbl;
					// font-family: "PingFang SC";
					.activity-title{
						// font-family: "PingFang SC Bold";
						// font-weight: 700;
						// font-size: 32upx;
						margin-bottom: 40upx;
						
						
						font-size: 18px;
						font-family: Inter-Semi Bold, Inter;
						font-weight: normal;
						color: #080F18;
					}
					.activity-time{
						// font-size: 24upx;
						font-size: 14px;
						font-family: Inter-Regular, Inter;
						font-weight: 400;
						color: #646464;
						margin-bottom: 20upx;
						image{
							width: 24upx;
							height: 24upx;
							margin-right: 16upx;
						}
					}
					.bottom{
						.text{
							// font-size: 24upx;
							// color: #999;
							font-size: 14px;
							font-family: Inter-Regular, Inter;
							font-weight: 400;
							color: #646464;
						}
						.button{
							width: 190upx!important;
							height: 64upx;
							flex: none;
							// font-size: 26upx;
							font-size: 14px;
							font-family: Inter-Regular, Inter;
							font-weight: 400;
							color: #969696;
							margin: 0;
						}
						.buttons{
							background: #f0f1f9;
							color: #666;
						}
					}
				}
			}
			.bottoms{
				margin-bottom: 32upx;
			}
		}
	}
</style>