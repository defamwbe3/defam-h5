<template>
	<view class="container">
		<u-navbar title=" " bgColor="#fff" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold" :border="true">
			<view class="u-nav-slot" slot="left" @click="back()">
				<image :src="IMG_URL+'navnar_icon_back.png'" mode=""></image>
			</view>
		<!-- #ifdef H5 -->
			<view slot="right" class="search-box" @click="saveEditor">
				<view class="btn" :class="postingBtn?'active':''">下一步</view>
			</view>
		<!-- #endif -->
		</u-navbar>
		<view class="tips flex-between" v-if="tips==true">
			<view class="text">提示：建议您前往官方网站发布长文，体验更佳</view>
			<image :src="IMG_URL+'close.png'" mode="" @click="tips=false"></image>
		</view>
		<input class="title" type="text" v-model="form.title" placeholder="请在这里输入标题" placeholder-style="color:#bebec0" />
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady" @input="inputhandle"></editor>
		<view class='toolbar'>
			<view class="operation flex-between">
				<view class="left">
					<image :src="IMG_URL+'picture.png'" mode="" @tap="insertImage"></image>
					<image :src="IMG_URL+'bload.png'" mode="" @tap="setBold"></image>
					<image :src="IMG_URL+'menu.png'" mode="" @tap="setLeft"></image>
					<image :src="IMG_URL+'menu1.png'" mode="" @tap="setRight"></image>
				</view>
				<view class="right">
					<image :src="IMG_URL+'syb.png'" mode="" @tap="undohandle"></image>
					<image :src="IMG_URL+'xyb.png'" mode="" @tap="redohandle"></image>
				</view>
			</view>	
			<!-- #ifdef MP-WEIXIN -->
			<button class="btns" :class="postingBtn?'actives':''" @click="saveEditor">下一步</button>
			<!-- #endif -->
		</view>
	</view>
</template>
 
<script>
export default {
	name: "editor",
	components: {},
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			placeholder: '从这里开始写正文~',
			postingBtn: false,
			tips: true,
			tempDelta: '',
			form:{
				title: '',
				tags: [],
				is_original: 0,
				content: '',
				// #ifdef H5
				platform: 'h5',
				//#endif
				// #ifdef MP-WEIXIN
				platform: '小程序',
				//#endif
			},
			apptype: '',
		};
	},
	onLoad() {
		if(this.$Route.query.type){
			this.apptype = this.$Route.query.type
			this.platform = this.$Route.query.type
		}
		if(!uni.getStorageSync('token')){
			if(this.$Route.query.token){
				uni.setStorageSync('token', this.$Route.query.token)
			}else{
				this.$store.commit('IS_LOGIN', true);
				// uni.reLaunch({
				// 	url:'/pages/public/login'
				// })
			}
		}
	},
	methods: {
		back(){
			if(this.apptype=='IOS'){
				window.webkit.messageHandlers.toFnish.postMessage('1');
			}else if(this.apptype=='Android'){
				if (window.androidapp){
				    androidapp.toFnish('1');
				}else{
				    alert("launcher not found!");
				}
			}else{
				this.$Router.back()
			}
		},
		//初始化副文本
		onEditorReady() {
			// #ifdef APP-PLUS || H5 ||MP-WEIXIN
			uni.createSelectorQuery().select('#editor').context((res) => {
				this.editorCtx = res.context
			}).exec()
			// #endif
		},
		//内容是否输入
		inputhandle(e){
			if(e.detail){
				if(e.detail.html!='' && e.detail.html!='<p><br></p>'){
					this.postingBtn = true
				}else{
					this.postingBtn = false
				}
			}
		},
		// 下一步
		saveEditor() {
			if(this.postingBtn){
				if(this.form.title==''){
					this.$u.toast('请输入标题')
					return false
				}
				var that = this
				this.editorCtx.getContents({
				  success(res) {
					that.form.content = res.html
					that.$Router.push({path:'/pages/release/postarticlenext',query:{form: that.form,type: that.apptype}})
				  }
				})
			}
		},
		//图片
		insertImage() {
			let _this = this;
			_this.$tools.chooseImage(1).then(res => {
				let tempFilePaths = res[0]
				_this.$tools.uploadImage('upload/images', tempFilePaths).then(resone => {
					_this.editorCtx.insertImage({
						src: resone.filePath,
						alt: '图像',
						success: function () {
							console.log('insert image success')
						}
					})
				}).catch(err => {
					console.log(err)
				})
			})
		},
		// 粗体
		setBold() {
			this.editorCtx.format('bold');
		},
		//左靠齐
		setLeft() {
			this.editorCtx.format('align', 'left');
		},
		//右靠齐
		setRight() {
			this.editorCtx.format('align', 'right');
		},
		//撤销
		undohandle(){
			this.editorCtx.undo()
		},
		//恢复
		redohandle(){
			this.editorCtx.redo()
		},
	}
}
</script>
 
<style lang="scss">
	.u-nav-slot{
		image{
			width: 48upx;
			height: 48upx;
		}
	}
	.container {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		background: #fff;
		.tips{
			padding: 0 30upx;
			height: 72upx;
			background: #fff7eb;
			.text{
				font-family: "PingFang SC";
				font-size: 24upx;
				color: $textbl;
			}
			image{
				width: 32upx;
				height: 32upx;
			}
		}
		.title{
			font-size: 48upx;
			font-weight: 700;
			padding: 40upx 24upx;
			font-family: "PingFang SC Bold";
			line-height: 56upx;
		}
	}
	#editor {
		width: 100%;
		// #ifdef MP-WEIXIN
			min-height: calc(100vh - (444upx + env(safe-area-inset-bottom)/2 ));
		// #endif
		// #ifdef H5
			min-height: calc(100vh - 202upx);
		// #endif
		background-color: #fff;
		margin: 0;
		overflow: hidden;
		height: 200px;
		padding: 0 24upx;
		/deep/.ql-editor.ql-blank:before{
			font-style: unset;
			color:#bebec0
		}
	}
	/deep/.u-border-bottom{
		border-color: #F0F1F9!important;
	}
	.search-box{
		.btn{
			width: 130upx;
			height: 52upx;
			line-height: 52upx;
			border-radius: 26upx;
			background: #bebec0;
			text-align: center;
			font-family: "PingFang SC";
			font-size: 26upx;
			color: #fff;
		}
		.active{
			background: $btnColor;
		}
	}
	.toolbar{
		position: fixed;
		bottom: calc(env(safe-area-inset-bottom)/2 + 20upx);
		width: 100%;
		background-color: #fff;
		.operation{
			padding: 30upx 40upx 10upx;
			box-shadow: 0 -2upx 0 rgba(0, 0, 0, 0.05);
			.left{
				image{
					margin-right: 60upx;
				}
			}
			.right{
				padding-left: 2upx;
				border-left: 2upx solid #BEBEC0;
				image{
					margin-left: 42upx;
				}
			}
			image{
				width: 48upx;
				height: 48upx;
			}
		}
	}
	.btns{
		width: 92%;
		margin-top: 22upx;
		background: #bebec0;
	}
	.actives{
		background: $btnColor;
	}
</style>