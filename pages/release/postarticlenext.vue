<template>
	<view class="container">
		<u-navbar title=" " bgColor="#fff" placeholder titleWidth="702rpx" titleStyle="fontWeight: bold" :border="true" :autoBack="true">
		<!-- #ifdef H5 -->
			<view slot="right" class="search-box" @click="sumbit">
				<button class="btn active" :disabled="loading" :loading="loading">发布</button>
			</view>
		<!-- #endif -->
		</u-navbar>
		<view class="from">
			<view class="row">
				<view class="title">设置标签</view>
				<view class="list flex">
					<view class="item flex-center" v-for="(item,index) in form.tags">{{item}} <image :src="IMG_URL+'close1.png'" mode=""></image> </view>
					<view class="itemadd flex-center" @click="inputmode=true">+</view>
				</view>
			</view>
			<view class="row">
				<view class="title">声明原创</view>
				<u-switch v-model="form.is_original" :activeValue="1" :inactiveValue="0" @change="change"></u-switch>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class='toolbar'>
			<button class="btns actives" :disabled="loading" :loading="loading" @click="sumbit">发布</button>
		</view>
		<!-- #endif -->
		<u-popup :show="inputmode" mode="center" round="10" :customStyle="{ width: '80%', background: '#fff'}" :safeAreaInsetBottom="false">
			<view class="mode">
				<view class="title">设置标签</view>
				<input class="bb-1px" v-model="tagsvalue" type="text" placeholder="请输入标签名"/>
				<view class="btns flex-between">
				    <button class="button" @click="inputmode=false">取消</button>
				    <button class="button" @click="inputmodesumbit()">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>
 
<script>
export default {
	name: "editor",
	components: {
	},
	data() {
		return {
			IMG_URL: this.$IMG_URL,
			postingBtn: false,
			inputmode: false,
			loading: false,
			value: true,
			form:{
				tags: []
			},
			tagsvalue:''
		};
	},
	onLoad() {
		if(this.$Route.query.type){
			this.apptype = this.$Route.query.type
		}
		this.form = this.$Route.query.form||{}
	},
	methods: {
		// 发布
		sumbit() {
			this.loading = true
			this.$http('article/release_long', this.form, 'post').then((res) => {
				this.loading = false
				this.$u.toast('发布成功');
				if(this.apptype=='IOS'){
					window.webkit.messageHandlers.toFnish.postMessage('2');
				}else if(this.apptype=='Android'){
					if (window.androidapp){
					    androidapp.toFnish('2');
					}else{
					    alert("launcher not found!");
					}
				}else{
					this.$Router.replace({path:'/pages/public/success',query:{type: 'postar',id: res.data.id}})
				}
			}).catch(()=>{
				this.loading = false
			})
		},
		inputmodesumbit(){
			this.form.tags.push(this.tagsvalue)
			this.inputmode = false
			setTimeout(()=>{
				this.tagsvalue = ''
			},500)
		},
		change(){},
	}
}
</script>
 
<style lang="scss">
	.container {
		width: 100%;
		min-height: 100vh;
		overflow: hidden;
		background: #fff;
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
	.from{
		padding: 0 20upx;
		.row{
			.title{
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 28upx;
				color: #333;
				padding: 40upx 0 32upx;
			}
			.list{
				.item{
					width: 156upx;
					height: 56upx;
					border-radius: 28upx;
					background: #fafafe;
					border: 2upx solid #f0f1f9;
					line-height: 56upx;
					margin-right: 20upx;
					image{
						width: 32upx;
						height: 32upx;
						margin-left: 8upx;
					}
				}
				.itemadd{
					width: 100upx;
					height: 56upx;
					border-radius: 28upx;
					background: #fff;
					border: 2upx solid #f0f1f9;
				}
			}
		}
	}
	.toolbar{
		position: fixed;
		bottom: calc(env(safe-area-inset-bottom)/2 + 20upx);
		width: 100%;
		background-color: #fff;
		.btns{
			width: 92%;
			margin-top: 22upx;
			background: #bebec0;
		}
		.actives{
			background: $btnColor;
		}
	}
	.mode{
		padding: 40upx 40upx 30upx;
		.title{
			text-align: center;
			font-weight: 700;
			margin-bottom: 20upx;
		}
		input{
			padding: 30upx 0;
			font-size: 28upx;
		}
		.btns {
			width: 100%;
		    .button {
				width: 40%;
		        height: 70rpx;
		        text-align: center;
		        font-size: 30rpx;
		        border-radius: 60upx;
		        margin-top: 30rpx;
				background: none;
				background: #bebec0;
				flex: none;
		    }
		    .button:last-child {
		        background: $btnColor;
		    }
		    .button::after {
		        border: none;
		    }
		}
	}
</style>