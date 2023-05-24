<template>
	<view class="container">
		<view class="content" v-if="hasLoading">
			<view class="list" v-if="list.length">
				<view class="list-item flex flex-col justify-center items-center" v-for="(item, index) in list"
					:key="item.id" @click.stop="handleToDetail(item)">
					<view class="date">{{ item.created_at }}</view>
					<view class="card">
						<view class="title">{{ item.title }}</view>
						<view class="richtxt">
							<mp-html class="tips" :content="item.content"></mp-html>
						</view>
					</view>
				</view>
			</view>
			<!-- empty -->
			<engine-empty v-else :text="'暂无公告信息'"></engine-empty>
		</view>
	</view>
</template>

<script>
import MpHtml from '@/components/mp-html/mp-html'
export default {
	components: {
		MpHtml
	},
	data() {
		return {
			hasLoading: false,
			list: [],
			page: 1,
			hasNext: false
		}
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		if (this.hasNext) {
			this.page++;
			this.getList();
		}
	},
	onPullDownRefresh() {
		this.hasLoading = false;
		this.page = 1;
		this.getList();
	},
	methods: {
		getList() {
			let app = this;
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			this.$http('notice', {
				is_page: 1,
				page: app.page,
				limit: 10
			}, 'get').then((res) => {
				uni.stopPullDownRefresh();
				uni.hideLoading();
				if (res.code == 10000) {
					let newData = res.data;
					app.page = newData.current_page;
					app.hasNext = newData.last_page > newData.current_page;
					app.list = newData.current_page == 1 ? newData.data : [...app.list, ...newData.data];
				} else {
					app.$u.toast(res.message)
				}
				app.hasLoading = true;
			});
		},
		handleToDetail(item) {
			try {
				uni.setStorageSync('detail', JSON.stringify(item))
				this.$Router.push({ path: '/pages/other/messageDetail' });
			} catch (e) {
				//TODO handle the exception
			}
		}
	}
}
</script>

<style lang="scss">
.container {
	box-sizing: border-box;
	padding: 30rpx;
}

.list {
	.date {
		margin: 0 auto;
		width: auto;
		height: 36rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		line-height: 36rpx;
		color: $secondFontColor;
	}

	.card {
		margin: 20rpx 0 42rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 26rpx 34rpx 20rpx;
		background: #fff;
		.title {
			font-size: 36rpx;
			line-height: 44rpx;
			font-weight: bolder;
		}
		.richtxt {
			margin-top: 24rpx;
			font-size: 24rpx;
			color: #666;
		}
		.date {
			margin-top: 20rpx;
			font-size: 24rpx;
			line-height: 40rpx;
			color: $secondFontColor;
		}
		.iconfont {
			color: #fff;
			font-size: 50rpx;
		}
	}
}
</style>