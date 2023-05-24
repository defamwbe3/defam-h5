<template>
	<view class="container">
		<u-navbar title="我的邀请" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
			<!-- #ifdef H5 -->
			<view slot="right"  @click="$Router.push({path: '/pages/user/invite/count'})">
				<view class="nav-btn">邀请记录</view>
			</view>
			<!-- #endif -->
		</u-navbar>
		
		<view class="box-img">
			<image :src="posterImage || ''" mode="widthFix"></image>
			<!-- <image class="images" :src="IMG_URL+'eweima.png'" mode=""></image> -->
		</view>
		
		<view class="three">
			<view class="three-box flex-between">
				<view class="item" @click="handlecopylink">
					<image :src="IMG_URL+'yq_icon_lj.png'" mode=""></image>
					<view>复制链接呀</view>
				</view>
				<view class="item" @click="saveImage">
					<!-- <image :src="IMG_URL+'yq_icon_tp.png'" mode=""></image> -->
					
					<image src="../../../static/images/save.png" mode=""></image>
					<view>保存也有图片</view>
				</view>
				<view class="item" @click="handlecopycode">
					<image :src="IMG_URL+'yq_icon_yqm.png'" mode=""></image>
					<view>复制邀请码</view>
				</view>
			</view>
		</view>
		<!-- 适配小程序 -->
		<!-- #ifdef MP-WEIXIN -->
			<view class="fined" @click="$Router.push({path: '/pages/user/invite/count'})">邀请记录</view>
		<!-- #endif -->
		<view class="content">
			<!-- 画布 -->
			<view class="hideCanvasView">
				<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
			</view>
		</view>
	</view>
</template>

<script>
	import _app from '@/components/poster/QS-SharePoster/app.js';
	import {getSharePoster} from '@/components/poster/QS-SharePoster/QS-SharePoster.js';
	const QR = require('@/components/poster/weapp-qrcode.js');
	import { SHARE_url} from '@/env';
	import { userInfo } from '@/engine/storage';
	export default {
		components: {

		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor:'#FAFAFE',
				canvasId: 'default_PosterCanvasId',
				poster: {},
				posterImage: '',
				bgImg: '',
				userinfo: '',
			}
		},
		onLoad(){
			// console.log('----------',uni.getStorageSync('userInfo'))
		},
		onShow() {
			userInfo.get(true).then(res=>{
				this.userinfo = res
			})
			this.getConfig();
		},

		methods: {
			
			// 返回
			backhandle() {
				this.$Router.back()
			},
			getConfig() {
				let app = this;
				this.$http('config', {
					module: 'poster'
				}, 'GET').then((res) => {
					if(res.code==10000){
						app.bgImg = res.data.poster;
					}else{
						app.$u.toast(res.message);
					}		
					app.handleShare()
				});
			},
			//点击分享
			handleShare(){
				_app.showLoading('正在绘制海报');
				this.shareFc()
			},
			async shareFc() {
				let that = this;
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						// background: {
						// 	width: 1080,
						// 	height: 2080
						// },
						backgroundImage: that.bgImg, // 'http://api.cjlbzx.szyqa.com/images/20221220/a825a68eaa5afd8e4dbdc62b658f273d.png',
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.045;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									{
										name: '普通二维码',
										type: 'qrcode',
										// text: 'https://h5.cjlbzx.szyqa.com/#/?invite_code=' + uni.getStorageSync('userInfo').invite_code,
										text: SHARE_url+'pages/public/register?invite_code=' + uni.getStorageSync('userInfo').invite_code,
										size: 200,
										dx: bgObj.width * 0.6 - 160, //X轴位置
										dy: bgObj.height * 0.75, //Y轴位置
										isBgCenter: true
									}
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					uni.hideLoading()
				} catch (e) {
					_app.hideLoading();
					// console.log(e)
					_app.showToast(JSON.stringify(e));
				}
			},
			// 复制链接
			handlecopylink(){
				let _this = this
				uni.setClipboardData({
					data: SHARE_url+'pages/public/register?usercode='+ _this.userinfo.invite_code,
					// data: 'http://localhost:8080/#/pages/public/register?usercode='+ _this.userinfo.invite_code,
					success: data => {
						_this.$u.toast('已复制到剪切板');
					}
				});
			},
			// 复制邀请码
			handlecopycode(){
				let _this = this
				uni.setClipboardData({
					data: _this.userinfo.invite_code,
					success: data => {
						_this.$u.toast('已复制到剪切板');
					}
				});
			},
			saveImage() {
				let that = this;
				that.disabled = true
					//#ifndef H5
						 uni.getImageInfo({
							src: that.posterImage,
							success: function (image) {
								that.disabled = false
								uni.saveImageToPhotosAlbum({
									filePath: image.path,
									success: res => {
										that.disabled = false
										uni.showToast({
											title: '保存成功',
											icon: 'none',
											duration: 2000
										})						
									},
									fail: err => {
										that.disabled = false
										uni.showToast({
											title: '保存失败',
											icon: 'none',
											duration: 2000
										})
									}
								});
							}
						});
					//#endif
					//#ifdef H5
						var ua = navigator.userAgent.toLowerCase();
						if(ua.match(/MicroMessenger/i) == "micromessenger" || ua.match(/QQ/i) == "qq" || ua.match(/Alipay/i) == "alipay") {
							uni.showToast({
								title:'长按图片进行保存',
								icon:'none'
							})
							that.disabled = false;
						} else {
							var arr = that.posterImage.split(',');
							var bytes = atob(arr[1]);
							let ab = new ArrayBuffer(bytes.length);
							let ia = new Uint8Array(ab);
							for (let i = 0; i < bytes.length; i++) {
								ia[i] = bytes.charCodeAt(i);
							}
							var blob = new Blob([ab], { type: 'application/octet-stream' });
							var url = URL.createObjectURL(blob);
							var a = document.createElement('a');
							a.href = url;
							a.download = new Date().valueOf() + ".png";
							var e = document.createEvent('MouseEvents');
							e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
							a.dispatchEvent(e);
							URL.revokeObjectURL(url);
							that.disabled = false
						}			
					//#endif	
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
		position: relative;
		text{
			font-size: 36rpx;
			font-weight: 500;
			color: #333333;
		}
		.more{
			width: 48rpx;
			height: 48rpx;
			margin-top: 10rpx;
			
		}
		.nav-btn{
			font-size: 30rpx;
			color: #333333;
		}
	}
	.box-img{
		width: 550rpx;
		height: 920rpx;
		margin: 40rpx auto 0;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
		.images{
			position: absolute;
			width: 210rpx;
			height: 210rpx;
			bottom: 40rpx;
			left: 50%;
			transform: translate(-50%);
		}
	}
	.three{
		margin: 80rpx 130rpx 0;
		.three-box{
			.item{
				font-weight: 700;
				font-size: 28rpx;
				text-align: center;
				color: #333;
				image{
					width: 80rpx;
					height: 80rpx;
					margin-bottom: 16rpx;
				}
			}
		}
	}
	.fined{
		margin: 0 24rpx;
		padding: 22rpx 286rpx;
		border-radius: 44px;
		font-weight: 400;
		font-size: 32rpx;
		text-align: center;
		color: #fff;
		background: linear-gradient(320.28deg, #01c8e5 0%, #f177c1 100%);
		box-shadow: 0 6px 32px rgba(1, 200, 229, 0.2);
		position: fixed;
		bottom: 64rpx;
	}
	.hideCanvasView{
		.hideCanvas{
			position: fixed;
			top: -99999rpx;
			left: -99999rpx;
			z-index: -99999;
		}
	}
</style>
