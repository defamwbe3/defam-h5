<template>
	<view class="content">
		<!-- <view class="beijing"> -->
			<view class="post" v-show="tishi==1" >
				<p style="color: #fff;font-size: 30upx;margin-top: 10upx;">长按保存图片至相册</p>
				<view class="content" style="text-align: center;width: 85%;margin: 0 auto;">
					<view style="margin-top: 30upx;background: #fff;">
						<view  style="background: #fff;">
							<img id="test" style="width: 100%;height: 400upx;"/>
						  <!-- <img id="test" style="width: 580upx;height: 954upx;"/> -->
						  
						  <view class="artictitle">{{title}}</view>
						  <view id="content" class="articcontent">文章内容文章内容文章内容文章内容文章内jd好多话好多好多话好多话好多好多好多话好多好多话好多好多的好多好多话好多好多好多好多话容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</view>
						<view id="tip" style="display: flex;">
							
							<view v-for="(item,index) in tags" :key="index" class="tip1" >{{item.name}}</view>
						 </view>
						 <view class="bottom">
							<view class="left">
							<view class="top">扫码进入Defam</view>	
							<view class="top">阅读更多深度内容</view>	
							</view> 
							<view class="right">
							<image src="../../static/images/codeImg.png" style="width: 50px;height: 50px;text-align: right;"></image>
						   </view>
						 </view>
						</view>
					</view>
				</view>
				<!-- #ifdef APP-PLUS -->
			<image @click="guanbi" class="cha" style="width: 80upx;height: 80upx; margin-top: 25upx;margin-left: 47%;"></image>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<image @click="guanbi" class="cha" style="width: 80upx;height: 80upx; margin-top: 25upx; margin: 0;"></image>
			<!-- #endif -->
			</view>
		<!-- </view> -->
		
		<view class="tupian" @click="erweima" style="text-align: center;"></view>
	</view>
</template>
 
<script>
	// import canvas_x from '../../common/canvas_x.js';
    // import canvas_x from "./components/mg-h5hb/commom/canvas_x.js"
	import canvas_x from "../../components/mg-h5hb/common/canvas_x.js"
	
	export default {
		
		data() {
			return {
				tishi:0,
				userid:0,
				img:"",
				phone:"",
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				nickname:"",
				val:"",
				detail:'',
				title:'',
				articContent:'',
				tags:[],
				content:''
			};
		},
		onLoad(option) {
			//二维码地址（可从后台获取地址进行赋值）
			this.val='http://www.baidu.com'
			
			 // console.log('---h66--',this.$Route.query)
			  this.title = this.$Route.query.title
			  this.tags = this.$Route.query.tag
			  this.content =decodeURIs(this.$Route.query.content)
			  console.log(this.content)
			 
			
			this.erweima()
		},
		methods: {
			
			guanbi:function(){
				this.tishi=0;
				uni.navigateBack({delta:1})
			},
			erweima:function(){
				this.tishi=1;
				canvas_x.makeImage({
								type: 'url',
								parts: [
									{
										type: 'image',
										url: '../../static/images/headImg.png',
										width: 680,
										height: 1264,
										// backgroundSize:680,
									},
									// {
									// 	type: 'qrcode',
									// 	text: this.val,
									// 	x: 80,
									// 	y: -50,
									// 	width: 130,
									// 	height: 130,
									// 	padding: 0,
									// 	background: '#fff',
									// 	level: 3
									// },
									//  {
									// 	type: 'text',
									// 	text: this.title,
									// 	textAlign: 'left',
									// 	lineAlign: 'TOP',
									// 	x: 440,
									// 	y: 300,
									// 	color: 'black',
									// 	size: '30px',
									// 	// bold: true
									// },
									// {
									// 	type: 'text',
									// 	text:'玫瑰',
									// 	textAlign: 'left',
									// 	lineAlign: 'TOP',
									// 	x: 440,
									// 	y: 1185,
									// 	color: 'black',
									// 	size: '30px',
									// 	// bold: true
									// }
								],
								width: 680,
								height: 1264
							}, (err, data) => {
								document.getElementById('test').src = data
							})
			}
		}
	};
</script>
 
<style lang="scss">
	.post {
		width: 100%;
		height: 100%;
		background-color:rgba(0,0,0,0.7);
		position: fixed;
		top: 0upx;
		z-index: 10000;
		text-align: center;
		.wrapper {
			height: 1420upx;
			width: 610upx;
			margin: 0 auto;
			margin-top: -150upx;
			
			// margin-top: 50upx;
		}
	}
	.tupian{
		width: 100%;
		height: 1360upx;
		// background-image: url('../../static/images/tutu3.png');
		background-size:750upx 1360upx ;
	}
	
	.cha{
		background-image: url('../../static/images/chacha.png');background-size: 80upx 80upx;
		position: relative;
		top: 40upx
	
	}
	.articcontent{
		line-height: 2;
		padding: 0px 20px;
		color: #333;
	}
	.artictitle{
		color: #000;
		font-weight: 500;
		padding: 20px;
	}
	.bottom{
		display: flex;
		background-color: rgb(242, 242, 242);
		padding: 20px;
	}
	.left{
		width: 50%;
	
		text-align: left;
	}
	.right{
		width: 50%;
		
		text-align: right;
		padding-top: 10px;
		// margin-left: 20px;
	}
	.top{
		padding-top: 10px;
		color: #767676;
	}
	.tip1{
		
		background-color: rgb(245, 246, 248);
		margin: 20px 0px 20px 20px;
		padding: 5px 10px;
		color: #767676;
		font-size: 14rpx;
		
	}
</style>
