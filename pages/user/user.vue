<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
			<u-navbar title="我的" :bgColor="bgColor" titleStyle="fontWeight: bold">
				<view slot="left"></view>
			</u-navbar>
		<!-- #endif -->
		<!-- 头部消息设置 -->
		<movable-area>
			<view class="bg">
				<image :src="IMG_URL +'userbg.png'" mode=""></image>
			</view>
			<view class="top_header"
			<!-- #ifdef MP-WEIXIN -->
				:style="{ 'padding-top': Number(barHeight + 40) + 'px' }"
			<!-- #endif -->
			>
				<view class="images">
					<image v-if="userinfo.is_read==1" :src="IMG_URL +'common_iocn_lingdang1.png'" mode="" @click.stop="$Router.push('/pages/user/news/newsIndex')"></image>
					<image v-else :src="IMG_URL +'common_iocn_lingdang.png'" mode="" @click.stop="$Router.push('/pages/user/news/newsIndex')"></image>
					<!-- <text class="images-a-dian"></text> -->
					<image :src="IMG_URL +'common_iocn_shezhi.png'" mode="" @click.stop="$Router.push('/pages/user/sets/index')"></image>
				</view>
			</view>
			<!-- 头像昵称 -->
			<view class="user-box flex-between">
				<view class="user-info flex-middle">
					<view class="user-info-left">
						<image class="logo" v-if="!userinfo.avatar" :src="IMG_URL +'avatar.png'"></image>
						<image class="logo" v-else :src="userinfo.avatar"></image>
						<view class="user-info-left-lv">lv.{{userinfo.level}}</view>
					</view>
					<view class="info-right">
						<view class="username">{{userinfo.nickname}}</view>
						<view class="nickname flex-middle">
							<view class="nickname-1">DD：{{userinfo.integral || '0.00'}}</view>
							<view class="nickname-1">碎片：{{userinfo.suipian_total}}</view>
						</view>
					</view>
				</view>
				<view class="user-box-right" @click.stop="$Router.push('/pages/user/resume')">个人主页</view>
			</view>
			
			<!-- 四个盒子 -->
			<view class="four-box">
				<view class="four-box-item flex-between">
					<view class="four-box-item-1" @click.stop="$Router.push('/pages/user/four/fans')">
						<view class="four-box-item-1-top">{{userinfo.fans_num || '0'}}</view>
						<view class="four-box-item-1-bottom">粉丝</view>
					</view>
					<view class="four-box-item-1" @click.stop="$Router.push('/pages/user/four/attention')">
						<view class="four-box-item-1-top">{{userinfo.follow_num || '0'}}</view>
						<view class="four-box-item-1-bottom">关注</view>
					</view>
					<view class="four-box-item-1">
						<view class="four-box-item-1-top">{{userinfo.zan_num || '0'}}</view>
						<view class="four-box-item-1-bottom">赞</view>
					</view>
					<view class="four-box-item-1" @click.stop="$Router.push('/pages/user/four/collect')">
						<view class="four-box-item-1-top">{{userinfo.collection_num}}</view>
						<view class="four-box-item-1-bottom">收藏</view>
					</view>
				</view>
			</view>
			
			<view class="bar-box">
				<view class="bar-item flex-between" v-for="item in barList" :key="item.id" @click.stop="jump(item.path, {})">
					<view class="item-left flex-middle">
						<image class="icon" :src="item.icon"></image>
						<view class="text">{{item.text}}</view>
					</view>
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
			<view class="bar-box bar-box2">
				<view class="bar-item flex-between" v-for="item in barList2" :key="item.id" @click.stop="jump(item.path, {})">
					<view class="item-left flex-middle">
						<image class="icon" :src="item.icon"></image>
						<view class="text">{{item.text}}</view>
					</view>
					<image class="more" :src="IMG_URL+'icon_more.png'"></image>
				</view>
			</view>
		</movable-area>
        <engine-tabbar></engine-tabbar>
	</view>
</template>

<script>
import { userInfo } from '@/engine/storage';
export default {
	components: {

	},
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			userinfo: '',
            bgColor: 'transparent',
			barHeight: 0,
            barList: [
                {
                    id: 1,
                    text: 'DD集市',
                    icon: this.$IMG_URL+'me_icon_jfsc.png',
                    path: '/pages/user/integral/index'
                },
                // {
                //     id: 2,
                //     text: '藏宝图兑换',
                //     icon: this.$IMG_URL+'me_icon_cbtdh.png',
                //     path: '/pages/user/treasuremap/treasure'
                // },
                {
                    id: 2,
                    text: '我的邀请',
                    icon: this.$IMG_URL+'me_icon_wdyq.png',
                    path: '/pages/user/invite/invitation'
                },
				{
				    id: 3,
				    text: '奖励中心',
				    icon: this.$IMG_URL+'me_icon_jlzx.png',
				    path: '/pages/user/award/award'
				},
                // {
                //     id: 4,
                //     text: '富文本',
                //     icon: this.$IMG_URL+'me_icon_jlzx.png',
                //     path: '/pages/public/editor'
                // }
            ],
			barList2: [
			    {
			        id: 1,
			        text: '我的活动',
			        icon: this.$IMG_URL+'me_icon_wdhd.png',
			        path: '/pages/user/active/index'
			    },
			    {
			        id: 2,
			        text: '我的藏宝图',
			        icon: this.$IMG_URL+'me_icon_wdcbt.png',
			        path: '/pages/user/mymap/myMap'
			    },
			    {
			        id: 3,
			        text: '钱包地址',
			        icon: this.$IMG_URL+'me_icon_qbdz.png',
			        path: '/pages/user/wallet/address'
			    }
			]
		}
	},
	onShow() {
		userInfo.get(true).then(res=>{
			this.userinfo = res
		})
	},
	onLoad() {
		this.getSystemStatusBarHeight();
		
	},
	onReady() {
		
	},
	watch: {
		
	},
	onPullDownRefresh() {
		userInfo.get(true).then(res=>{
			this.userinfo = res
		})
	},
	onReachBottom() {
		
	},
	methods: {
		// 跳转
		jump(path,query){
			let _this = this;
			_this.$Router.push({
				path: path,
				query:query
			})
		},
		//获取系统状态栏高度
		getSystemStatusBarHeight() {
			let that = this;
			// #ifdef APP-PLUS
			var height = plus.navigator.getStatusbarHeight();
			that.barHeight = height;
			// #endif
			// #ifdef H5
			that.barHeight = 0;
			// #endif
			// #ifdef MP-WEIXIN
			var height = uni.getSystemInfoSync().statusBarHeight;
			that.barHeight = height;
			console.log('------',that.barHeight)
			// #endif
		},
	}
}
</script>
<style lang="scss" scoped>
	.container{
		position: relative;
	}
	.bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 400rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	
	
	.top_header{
		text-align: right;
		height: 88rpx;	
		// margin-top: 88rpx;
		.images{
			padding: 20rpx 24rpx;
			// .images-a{
			// 	.images-a-dian{
			// 		width: 8rpx;
			// 		height: 8rpx;
			// 		border-radius: 50%;
			// 		background: #fc6275;
			// 		position: relative;
			// 		top: 0;
			// 		right: 0;
			// 	}
			// }
			image{
				width: 48rpx;
				height: 48rpx;
				margin-right: 32rpx;
				
				&:last-child{
					margin-right: 0;
				}
			}
		}
		
	}
	
	
.user-box {
    height: 156rpx;
    width: 100%;
	position: relative;
    .user-info {
		margin-left: 24rpx;
		.user-info-left{
			position: relative;
			.logo {
			    display: block;
			    width: 136rpx;
			    height: 136rpx;
			    border-radius: 50%;
			    margin-right: 32rpx;
			}
			.user-info-left-lv{
				position: absolute;
				bottom: -20rpx;
				right: 63rpx;
				font-weight: 400;
				font-size: 22rpx;
				text-align: center;
				color: #fff;
				padding: 4rpx 16rpx;
				background-color: $textbl;
				border-radius: 20rpx;
				box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.1);
			}
		}
       
        .info-right {
            .username {
                font-weight: 700;
                font-size: 32rpx;
                color: $textbl;
            }
            .nickname {
                font-size: 28rpx;
                margin-top: 14rpx;
				.nickname-1{
					padding: 4rpx 16rpx;
					font-size: 22rpx;
					text-align: center;
					color: #fff;
					border-radius: 20rpx;
					background-color: #01c8e5;
					
					&:last-child{
						background-color: #F177C1;
						margin-left: 20rpx;
					}
				}
            }
        }
    }
	.user-box-right{
		padding: 14rpx 24rpx 14rpx 32rpx;
		font-weight: 400;
		font-size: 26rpx;
		color: #fff;
		border-radius: 32rpx 0 0 32rpx;
		background: linear-gradient(268.29deg, #01c8e5 0%, #f177c1 100%);
	}
}

.four-box{
	margin: 60rpx 50rpx 0;
	position: relative;
	.four-box-item{
		.four-box-item-1{
			text-align: center;
			.four-box-item-1-top{
				font-weight: 700;
				font-size: 36rpx;
				color: $textbl;
			}
			.four-box-item-1-bottom{
				font-weight: 400;
				font-size: 24rpx;
				color: #bebec0;
				margin-top: 12rpx;
			}
		}
	}
}


.bar-box2{
	margin: 0 24rpx !important;
}
.bar-box {
	margin: 36rpx 24rpx 20rpx;
	background: #fff;
	border-radius: 20rpx;
	
    .bar-item {
        height: 120rpx;
        background: #fff;
        padding: 0 32rpx;
        .icon {
            display: block;
            width: 48rpx;
            height: 48rpx;
            margin-right: 24rpx;
        }
        .text {
            font-size: 28rpx;
        }
        .more {
            display: block;
            width: 40rpx;
            height: 40rpx;
        }
    }
}
movable-area {
	width: 100%;
	height: 100%;
}
</style>
