<template>
	<view class="container">
		<u-loading-page :loading="pageLoading"></u-loading-page>
		<block v-if="!pageLoading">
			<view class="list" v-if="list && list.length">
				<view class="list-item flex-between" v-for="(item, index) in list" :key="item.id"
					@click="handleToDetail(item)">
					<view class="left-box">
						<view class="title">{{ item.title }}</view>
						<view class="date">{{ item.created_at }}</view>
					</view>
					<image class="right-image"
						:src="item.image && item.image.length && item.image[0].url ? item.image[0].url : '/static/images/not_found.png'">
					</image>
				</view>
				<u-loadmore :status="loadStatus" loadingIcon="semicircle" loadingText="努力加载中" line></u-loadmore>
			</view>
			<engine-empty v-else :text="'暂无公告信息'"></engine-empty>
			<engine-tabbar></engine-tabbar>
		</block>
	</view>
</template>

<script>
export default {
	components: {

	},
	data() {
		return {
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
	onReachBottom() {
		if (this.hasNext) {
			this.page++;
			this.getList();
		}
	},
	onPullDownRefresh() {
		this.page = 1;
		this.getList();
	},
	methods: {
		getList() {
			let app = this;
			this.$http('notice', {
				page: app.page,
				type: 1
			}, 'get').then((res) => {
				uni.stopPullDownRefresh();
				let newData = res.data;
				this.page = newData.current_page;
				this.hasNext = newData.last_page > newData.current_page;
				this.loadStatus = this.hasNext ? 'loadmore' : 'nomore';
				this.list = this.page == 1 ? newData.data : [...this.list, ...newData.data];
			});
		},
		handleToDetail(item) {
			try {
				this.$Router.push({ path: '/pages/other/newsDetail', query: { id: item.id } });
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
}

.list {
	.list-item {
		margin: 20rpx 30rpx 0;
		background: #fff;
		padding: 20rpx 24rpx;
		border-radius: 12rpx;

		.left-box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			flex: 1;
			height: 120rpx;

			.title {
				font-size: 30rpx;
			}

			.date {
				font-size: 24rpx;
				color: $secondFontColor;
			}
		}

		.right-image {
			display: block;
			width: 210rpx;
			height: 120rpx;
		}
	}
}
</style>