<template>
	<view class="container">
		<u-navbar title="商品详情" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>


		<view class="header">
			<image :src="details.image" mode=""></image>
		</view>
		<view class="name">
			<view class="name-1">{{details.name}}</view>
			<view class="name-2 flex">
				<view class="name-2-left text-ellipsis">
					已兑：{{details.sale_num}}
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="detail">
			<view class="detail-top">商品详情<view v-if="details.is_hidden_detail" style="color: blue;font-size: 14px;display: inline;">（支付DD才能查看盲盒内容）</view></view>
			<view style="padding: 10px 10px;" v-html="details.detail"></view>
		</view>

		<view class="bottom">
			<view class="bottom-cont flex-between">
				<view class="bottom-left">{{details.price}}DD</view>
				<view class="bottom-right" @click="isBandWallet">立即兑换</view>
			</view>
		</view>

		<!-- 点击兑换弹窗 -->
		<u-popup :show="show" :round="20" mode="bottom" @close="close" @open="open">
			<view class="popup_box">
				<view class="popup_box_header flex-between">
					<image class="popup-img" :src="IMG_URL+'icon_guanbi.png'" mode="" @click="show = false"></image>
					<view class="popup-text">规格</view>
					<view class="popup-text_wuyon"></view>
				</view>

				<!-- 多选 -->
				<view class="u-page__tag-item1" v-if="uPageList != ''">
					<view class="" v-for="(ido, index) in uPageList" :key="index">
						<view class="u-page__tag-item-name">{{ido.name}}</view>
						<view class="u-page__tag-item flex flex-warp">
							<view class="u-page_item" v-for="(data,cur) in ido.children" :key="cur"
								:class="{'active':data.isCheck==true}" @click="chooseSku(ido.children,data,cur,index)">
								{{data.name}}
							</view>
						</view>
					</view>
				</view>
				<!-- empty -->
				<view class="empty" v-else>
					<engine-empty  marginTop="0" :tipText="'暂时没有规格提供选择哦~'"></engine-empty>
				</view>
				

				<view class="tag_btn flex-between">
					<view class="btn-left">{{skuStock}}DD</view>
					<view class="btn-right" @click="pay()">立即兑换</view>
				</view>
			</view>
		</u-popup>
		<view >
			<u-modal :show="bandDialog"  :content="content" confirmText='去绑定' @confirm="toWallet">
				<view class="slot-content">
					<rich-text :nodes="content"></rich-text>
				</view>
				
			</u-modal>
		</view>
	</view>
	
</template>

<script>
import user from '../../../engine/store/modules/user';
	export default {
		components: {

		},
		data() {
			return {
				bgColor: '#FFF',
				IMG_URL: this.$IMG_URL,
				details: '',
				id: '',
				show: false,
				cur: 0,
				skuType: '',
				uPageList: [],
				sku_price: [],
				skuStock: '0',
				skuString: '',
				bandDialog: false,
				content: `<div>未绑定钱包地址，请绑定</div>`
			}
		},
		onLoad() {
			this.id = this.$Route.query.id
		},
		onShow() {
			this.getDetail()
		},
		onPullDownRefresh() {
			this.getDetail();
		},
		methods: {
			toWallet(){
				this.bandDialog = false;
				this.$Router.push({
					path: '/pages/user/wallet/address'
				});
			},
			isBandWallet(){
				 let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				 console.log('userinfo', userInfo);
				 if (userInfo['wallet']['address'] == null || userInfo['wallet']['address'] == '') {
				 	this.bandDialog = true;
				 	return;
				 }
				this.show = true
			},
			// 获取商品详情
			getDetail() {
				this.$http('goods/' + this.id, {}, 'get').then((res) => {
					uni.stopPullDownRefresh();
					this.details = res.data || {}
					this.uPageList = res.data.sku
					this.sku_price = res.data.sku_price;
					this.skuStock = res.data.price //如果没有规格默认当前产品价格
					// 循环给sku的子元素字段加上判断属性
					res.data.sku.forEach((ele, index) => {
						ele.children.forEach((item, ids) => {
							if (ids == 0) {
								this.$set(item, 'isCheck', true)
							} else {
								this.$set(item, 'isCheck', false)
							}
						})
					});
					let template = [];
					this.uPageList.forEach((element, indexs) => {
						element.children.forEach((el, id) => {
							if (el.isCheck == true) {
								template.push(el.id)
							}
						})
					});
					// console.log(template)
					this.skuType = template;
					if (this.uPageList.length) {
						this.skuImageSelect(this.skuType)
					}
					// console.log(this.skuType)
				}).catch(() => {})
			},
			// 多选
			chooseSku(all, data, cur, index) {
				// console.log('=------', all)
				all.forEach((item, idx) => {
					if (cur == idx) {
						item.isCheck = true
					} else {
						item.isCheck = false
					}
				});
				let strs = JSON.parse(JSON.stringify(this.skuType));
				strs[index] = data.id;
				// console.log('--------',strs[index])
				this.skuImageSelect(strs)
			},
			skuImageSelect(str) {
				let as = str.join(',');
				// console.log('-------------',as)
				this.sku_price.forEach((sk, is) => {
					if (sk.goods_sku_ids == as) {
						this.skuStock = sk.price;
						this.skuString = sk.id;
					}
				});
			},
			// 下单接口
			pay() {
				// 如果 钱包地址 没有数据 不能兑换
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'));
				console.log('userinfo', userInfo);
				if (userInfo['wallet']['address'] == null || userInfo['wallet']['address'] == '') {
					this.bandDialog = true;
					return;
				}
				this.$http('order', {
					goods_id: this.id,
					sku_price_id: this.skuString,
				}, 'post').then((res) => {
					this.$u.toast('兑换成功')
					setTimeout(()=>{
						this.show = false
						this.$Router.replace({
							path: '/pages/user/integral/countter'
						})
					},1000)
				}).catch(() => {
					
				})
			},
			// 返回
			backhandle() {
				this.$Router.back()
			},
			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			},

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		font-size: 36rpx;
		font-weight: 700;
		color: #333333;
		font-weight: bold;

		.more {
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;

		}

		.nav-btn {
			font-size: 30rpx;
			color: #333333;
		}
	}

	.header {
		width: 100%;
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.name {
		height: 168rpx;
		background-color: #fff;

		.name-1 {
			padding: 32rpx 24rpx 0;
			font-weight: 700;
			font-size: 36rpx;
			color: $textbl;
		}

		.name-2 {
			padding: 20rpx 24rpx 32rpx;

			.name-2-left {
				font-weight: 400;
				font-size: 24rpx;
				color: #999;
			}
		}
	}

	.detail {
		background: #fff;
		margin-top: 20rpx;
		margin-bottom: 20rpx;

		.detail-top {
			padding: 32rpx 0rpx 31rpx;
			margin: 0 24rpx;
			border-bottom: 1px solid #f0f1f9;
			font-weight: 700;
			font-size: 32rpx;
			color: $textbl;
		}

		.detail-img {
			padding: 32rpx 24rpx;
			width: 702rpx;
			height: 1200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.bottom {
		width: 100%;
		height: 98rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: #fff;
		box-shadow: 0 -2rpx 4rpx rgba(0, 0, 0, 0.05);

		.bottom-cont {
			padding: 0rpx 32rpx;
			line-height: 98rpx;

			.bottom-left {
				font-weight: 700;
				font-size: 36rpx;
				color: $textbl;
			}

			.bottom-right {
				width: 280rpx;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 40rpx;
				background: $btnColor;
				color: $btnText;
				font-size: 32rpx;
			}
		}
	}

	.popup_box {
		.popup_box_header {
			padding: 24rpx 24rpx;
			border-bottom: 1px solid #f0f1f9;

			.popup-img {
				width: 48rpx;
				height: 48rpx;
			}

			.popup-text {
				font-weight: 700;
				font-size: 32rpx;
				color: $textbl;
			}
		}
	}

	.u-page__tag-item1 {
		margin-bottom: 300rpx;
	}

	.u-page__tag-item-name {
		margin: 20rpx 24rpx;
		font-weight: 700;
		font-size: 32rpx;
		color: $textbl;
	}

	.u-page__tag-item {
		margin: 40rpx 24rpx 86rpx;

		.u-page_item {
			width: 160rpx;
			height: 64rpx;
			line-height: 64rpx;
			border-radius: 8rpx;
			text-align: center;
			background: #fff;
			border: 1px solid #f0f1f9;
			font-weight: 400;
			font-size: 24rpx;
			color: $textbl;
			margin-right: 20rpx;
			// &:first-child{
			// 	margin-left: 0;
			// }
		}

		.active {
			background: #f1f1ff;
			border: 1px solid #1b1bdd;
			color: #1b1bdd;
		}



	}

	.tag_btn {
		padding: 24rpx 32rpx;
		background: #fff;
		box-shadow: 0 -2rpx 4rpx rgba(0, 0, 0, 0.05);

		.btn-left {
			font-weight: 700;
			font-size: 36rpx;
			color: $textbl;
		}

		.btn-right {
			width: 280rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			background: $btnColor;
			color: $btnText;
			font-size: 32rpx;
		}
	}
	.empty{
		margin-bottom: 50rpx;
		font-size: 30rpx;
		font-weight: bold;
	}
</style>
