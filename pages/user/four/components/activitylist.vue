<template>
	<view class="activity-wrap">
		<view class="list">
			<view class="items" v-for="(item,index) in list" :key="index"
			 @click="$Router.push({path:'/pages/activity/activitydetail',query:{id:item.action_txt.id}})">
			 <block v-if="item.action_txt">
				 <image class="activity-img" v-if="item.action_txt.image" :src="item.action_txt.image" mode=""></image>
				 <view class="con">
				 	<view class="activity-title" style="margin-bottom: 20upx;">{{item.action_txt.title}}</view>
				 	<view class="times">{{item.action_txt.start_time}} ~ {{item.action_txt.end_time}}</view>
				 </view>
			 </block>
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
					color: $textbl;
					font-family: "PingFang SC";
					.activity-title{
						font-family: "PingFang SC Bold";
						font-weight: 700;
						font-size: 32upx;
						margin-bottom: 40upx;
					}
					.times{
						font-size: 24upx;
						color: #999;
					}
				}
			}
			.bottoms{
				margin-bottom: 32upx;
			}
		}
	}
</style>