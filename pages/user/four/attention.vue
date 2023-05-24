<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<view class="box">
				<view class="box-item flex-between"  v-for="(item,index) in list" :key="index">
					<view class="item-left flex">
						<view class="item-avart" @click="$Router.push({path:'/pages/user/resume',query:{id: item.tomember.id}})">
							<image v-if="item.tomember&&item.tomember.avatar" :src="item.tomember.avatar" mode=""></image>
						</view>
						<view class="left-name">
							<view class="left-name-1" v-if="item.tomember">{{item.tomember.nickname}}</view>
							<view class="left-name-2" v-if="item.tomember">作品：{{item.tomember.article_num }}</view>
						</view>
					</view>
					<view class="right-img">
						<!-- <image v-if="item.cur == 1" :src="IMG_URL+ 'follow.png'" mode="" @click="active(item)"></image> -->
						<image :src="IMG_URL+ 'follow_true.png'" @click="active(item)" mode=""></image>
					</view>
				</view>
			</view>
			<engine-empty v-if="!list.length" :tipText="'暂无关注列表信息'"></engine-empty>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				fans: [],
				list: [],
				hasNext: false,
				page: 1,
				loadStatus: 'loadmore',
				pageLoading: true
			}
		},
		onLoad() {
			this.getList();
			setTimeout(()=>{
				this.pageLoading = false
			}, 1000)
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getList();
		},
		onReachBottom() {
			if (this.hasNext) {
				this.page++;
				this.getList();
			}
		},
		methods: {
			//我的关注memberfollow/follow_list
			getList() {
				this.$http('memberfollow/follow_list', {
					page: this.page,
				}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					let newData = res.data;
					this.page = newData.current_page;
					this.hasNext = newData.last_page > newData.current_page;
					this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
					this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
				}).catch(()=>{})
			},
			//关注或取消关注memberfollow/is_followMember?to_member_id=2&type=
			active(item){
				uni.showLoading()
				this.$http('memberfollow/is_followMember', {to_member_id: item.to_member_id,member_id: item.member_id,type: item.type}, 'get').then(res=>{
					uni.hideLoading()
					this.$u.toast(res.message)
					this.page = 1;
					this.getList();
				}).catch(()=>{})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.box{
		.box-item{
			padding: 24rpx;
			background-color: #fff;
			
			.item-left{
				.item-avart{
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.left-name{
					margin-top: 8rpx;
					.left-name-1{
						font-weight: 700;
						font-size: 28rpx;
						color: $textbl;
					}
					.left-name-2{
						font-weight: 400;
						font-size: 22rpx;
						color: #999;
					}
				}
			}
			.right-img{
				width: 44rpx;
				height: 48rpx;
				image{
					display: block;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
