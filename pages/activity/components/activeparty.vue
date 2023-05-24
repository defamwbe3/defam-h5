<template>
	<view class="activeparty-wrap">
		<view class="list">
			<view class="item flex-between" v-for="(item,index) in list" :key="index">
				<view class="left flex-middle">
					<image :src="item.member.avatar" mode=""></image>
					<view class="name">{{item.member.nickname}}</view>
				</view>
				<image v-if="item.is_follow==0" :src="IMG_URL+'follow.png'" mode="" @click="active(item)"></image>
				<image v-else :src="IMG_URL+'follow_true.png'" mode="" @click="active(item)"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:['list','memberId'],
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		},
		methods:{
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			active(item){
				uni.showLoading()
				this.$http('memberfollow/is_followMember', {to_member_id: item.member_id,member_id: this.memberId,type: 2}, 'get').then(res=>{
					uni.hideLoading()
					this.$u.toast('操作成功')
					this.$emit('followhandle',{follow: true})
				}).catch(()=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.activeparty-wrap{
		.list{
			padding: 32upx 24upx;
			.item{
				padding: 24upx;
				background-color: #fff;
				border-radius: 16upx;
				margin-bottom: 20upx;
				.left{
					image{
						width: 88upx;
						height: 88upx;
						margin-right: 20upx;
						border-radius: 50%;
					}
					.name{
						font-family: "PingFang SC Bold";
						font-weight: 700;
						font-size: 28upx;
						color: $textbl;
					}
				}
				>image{
					width: 44upx;
					height: 48upx;
				}
			}
		}
	}
</style>