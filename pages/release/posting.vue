<template>
	<view class="posting-wrap">
		<u-navbar title=" " bgColor="#fff" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold" :border="true" :autoBack="true">
		<!-- #ifdef H5 -->
			<view slot="right" class="search-box" @click="postinghandle">
				<button class="btn" :disabled="loading" :loading="loading" :class="postingBtn?'active':''">发布</button>
			</view>
		<!-- #endif -->
		</u-navbar>
		<view class="wrap">
			<textarea class="ta" v-model="form.content" type="textarea" placeholder="快来发表你的观点~"placeholder-style="color:#BEBEC0"
			 maxlength="-1" @input="inputcontent"/>
			<view class="pwrap">
				<view class="upload flex-center" v-for="(i, index) in form.images" :key="index">
					<image class="thumb" mode="aspectFill" :src="i" />
					<image :src="IMG_URL+'icon_delete_image.png'" @click.stop="delImg(index)" class="icon-del"></image>	
				</view>
				<view class="upload" @click="chooseImage()">
					<image class="thumb" :src="IMG_URL+'fabu_icon_tupian.png'" mode=""></image>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<button class="btns" :disabled="loading" :loading="loading" :class="postingBtn?'actives':''" @click="postinghandle">发布</button>
		<!-- #endif -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				loading: false,
				form: {
					content: '',
					images: [],
					// #ifdef H5
					platform: 'h5',
					//#endif
					// #ifdef MP-WEIXIN
					platform: '小程序',
					//#endif
				},
				postingBtn: false,
				apptype: '',
			}
		},
		onLoad(){
		},
		methods:{
			// 上传图片
			chooseImage() {
				let that = this;
				that.$tools.chooseImage(9).then(res => {
					res.forEach(item => {
						that.$tools.uploadImage('upload/images', item).then(resone => {
							that.form.images.push(resone.filePath);
						}).catch(err => {
							console.log(err)
						})
					})
				})
			},
			inputcontent(e){
				if(e.detail.cursor>0){
					this.postingBtn = true
				}else{
					this.postingBtn = false
				}
			},
			postinghandle(){
				if(this.postingBtn){
					if(this.form.images.length<0){
						this.$u.toast('至少上传一张观点图')
						return false
					}
					this.loading = true
					this.$http('article/release_short', this.form, 'post').then((res) => {
						this.loading = false
						this.$u.toast('发布成功');
						this.$Router.replace({
							path: '/pages/user/resume'
						})
					}).catch(()=>{
						this.loading = false
					})
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.posting-wrap{
		background: #fff;
		width: 100%;
		min-height: 100vh;
	}
	/deep/.u-border-bottom{
		border-color: #F0F1F9!important;
	}
	.search-box{
		.btn{
			width: 104upx;
			height: 52upx;
			line-height: 52upx;
			border-radius: 26upx;
			background: #bebec0;
			text-align: center;
			font-family: "PingFang SC";
			font-size: 26upx;
			color: #fff;
			padding: 0;
		}
		.active{
			background: $btnColor;
		}
	}
	.wrap {
		padding: 40upx 24upx;
		background-color: #fff;
		border-radius: 20upx;
		.ta{
			font-size: 28upx;
			margin-bottom: 40upx;
		}
		.upload {
			position: relative;
			margin-top: 30upx;
			margin-right: 12upx;
			width: 220upx;
			height: 220upx;
			color: #BCBCBC;
			.thumb {
				width: 220rpx;
				height: 220rpx;
				border-radius: 10upx;
			}
			.icon-del {
				position: absolute;
				top: 0rpx;
				right: 0rpx;
				z-index: 5;
				width: 48rpx;
				height: 48rpx;
			}
			&:nth-child(4n) {
				margin-right: 0;
			}
	
			text {
				font-size: 60upx;
			}
		}
		.pwrap {
			display: flex;
			flex-wrap: wrap;
		}
	}
	.btns{
		width: 92%;
		margin-top: 80upx;
		background: #bebec0;
	}
	.actives{
		background: $btnColor;
	}
</style>