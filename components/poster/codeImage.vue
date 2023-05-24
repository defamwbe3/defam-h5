<template>
	<view class="content">
		<!-- share弹窗 -->
		<u-popup mode="bottom" border-radius="20" :safe-area-inset-bottom="true" :mask-close-able="!disabled" v-model="share" @close="handleShareClose">
			<view class="share">
				<button class="share-item" open-type='share' :disabled="disabled">
					<u-icon color="#09D817" name="weixin-fill"></u-icon>
					<text>分享朋友</text>
				</button>
				<button class="share-item" @click="handlePoster" :disabled="disabled">
					<u-icon color="#FFB900" name="photo-fill"></u-icon>
					<text>分享海报</text>
				</button>
			</view>
			<view class="shareClose" @click="shareClose">取消</view>
		</u-popup>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" id="default_PosterCanvasId" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
		</view>
		<u-popup mode="center" border-radius="20" v-model="posterIs" @close="handleClose">
			<view class="flex_column">
				<view class="padding1vh">
					<image :src="posterImage || ''" mode="widthFix" class="posterImage" @longtap="toSave"></image>
				</view>
				<view class="flex_row marginTop2vh">
					<button size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import _app from './QS-SharePoster/app.js';
	import {
		getSharePoster
	} from './QS-SharePoster/QS-SharePoster.js';
	import {Decrypt,Encrypt} from './qsaes.js'
	import {pathToBase64,  //图片路径转base64
			base64ToPath,  //base64码转图片
		} from './js_sdk/index.js'
	const QR = require('./weapp-qrcode.js')
	export default {
		props:{
			shareIs:{
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				show: false,
				posterIs: false,
				share: false,
				poster: {},
				posterImage: '',
				imageInfo: {},
				qrcodeImg: '',
				disabled: false,
				canvasId: 'default_PosterCanvasId',
			}
		},
		onLoad() {
		},
		watch: {
			shareIs(val, oldVal){
				this.share = val
				if(val){
					this.getImage()
				}
			}
		},		
		onShareAppMessage: function(options){
		  var that = this;
			var shareObj = {
				path: '/pages/index/index?userId='+ that.userInfo.userId,
			};
		  return shareObj;
		},
		methods: {
			// 获取详情
			handleDetail(id){
				this.$http.get('goods/detail/'+2).then(res => {
					this.detail = res
				}).catch(err => {
					console.log(err)
				})
			},			
			getImage() {
				this.$api('user.sharePosters').then(res=>{
					if(res.code === 1) {
						console.log(3333,res)
						this.qrcodeImg = res.data;
					}
				})
			},
			//海报套框关闭
			handleClose(){
				this.disabled = false
			},
			//取消分享
			shareClose(){
				this.$emit("ShareClosehan")
				this.disabled = false
			},
			handleShareClose(){
				this.shareClose()
			},
			//点击分享海报
			handlePoster(){	
				this.shareFc()
				this.disabled = true
				_app.showLoading('正在绘制海报');
			},
			async shareFc() {
				let that = this
				console.log(that.qrcodeImg)
				try {
					// _app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId,	//canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 1080,
							height: 1920,
							// backgroundColor: 'rgba(0,0,0,0.5)'
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.042;
							const lineHeight = bgObj.height * 0.04;
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([
									{
										type: 'image',
										url: that.qrcodeImg,
										alpha: 1,
										dx: 0, //X轴位置
										dy: 0, //Y轴位置
										infoCallBack(imageInfo) {
											that.imageInfo = imageInfo
											return {
												dWidth: bgObj.width, // 因为设置了圆形图片 所以要乘以2
												dHeight: bgObj.height,
												roundRectSet: { // 圆角矩形
													r: 18
												}
											}
										}
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
					// _app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.posterImage = d.poster.tempFilePath;
					_app.hideLoading();
					if(this.shareIs){
						this.posterIs = true
					}
				} catch (e) {
					_app.hideLoading();
					// _app.showToast(JSON.stringify(e));
					// console.log(JSON.stringify(e));
				}
			},
			//生成小程序二维码
			// getqrcode(){
			// 	let that = this
			// 	let qrcode={
			// 		text: 'pa'
			// 	}
			// 	let hexiaotext=Encrypt(JSON.stringify(qrcode));
			// 	var imgData = QR.drawImg(hexiaotext, {
			// 	    typeNumber: 4,//码点大小 1-40，数字越大，码点越小，二维码会显得越密集
			// 	    errorCorrectLevel: 'H',//纠错等级 H等级最高(30%) 简单来说，就是二维码被覆盖了多少仍然能被识别出来 详见qrcode.js
			// 	    size: 200
			// 	})
			// 	base64ToPath(imgData).then(res => {
			// 		that.qrcodeImg = res
			// 	})
			// },
			saveImage() {
				let that = this;
				uni.saveImageToPhotosAlbum({
					filePath: that.posterImage,
					success: res => {
						this.posterIs = false
						this.$emit("ShareClosehan")
						this.disabled = false
						uni.showToast({
							title: '保存成功',
							icon: 'none',
							duration: 2000
						})						
					},
					fail: err => {
						this.$emit("ShareClosehan")
						this.posterIs = false
						this.disabled = false
						uni.showToast({
							title: '保存失败',
							icon: 'none',
							duration: 2000
						})
					}
				});
			},
			// 长按图片
			toSave() {
				uni.showModal({
					title: '图片保存',
					content: '确定要保存图片吗',
					success: e => {
						if (e['confirm']) {
							this.saveImage();
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.share{
		width: 100%;
		display: flex;
		justify-content: space-around;
		border-bottom: 1px solid #f1f1f1;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		padding: 20rpx 0;
		.share-item{
			width: 50%;
			height: 120rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			background: #FFFFFF;
			u-icon{
				font-size: 38rpx;
				height: 46rpx;
			}
			&::after{
				border: none;
			}
		}
	}
	.shareClose{
		text-align: center;
		line-height: 80rpx;
		font-size: 28rpx;
	}
	.hideCanvasView{
		.hideCanvas{
			position: fixed;
			top: -99999rpx;
			left: -99999rpx;
			z-index: -99999;
		}
	}	
	.flex_column{
		// margin-top: -140rpx;
		.padding1vh{
			width: 540rpx;
			height: 960rpx;
			overflow: hidden;
			// margin-top: -140rpx;
			.posterImage{
				width: 100%;
				height: 98%;
			}
		}
		.flex_row{
			position: fixed;
			left: calc(50% - 86rpx);
			margin-top: 30rpx;
			button{
				background: #9590F7;
				color: #FFFFFF;
			}
		}
	}
</style>
