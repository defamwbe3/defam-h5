<template>
	<u-popup :show="isShow" mode="bottom" :customStyle="{width:'92%',background:'#000',marginBottom: '0rpx',marginLeft:'4%'}">
		<view class="mods">
			<view class="heads">
				<image src="/static/images/shimingrenzheng.png" mode=""></image>
			</view>
			<view>
				<view class="text">您尚未进行实名认证</view>
				<view class="text text1">当前操作需要实名认证，是否继续？</view>
			</view>
			<view class="btns">
				<button class="button" @click="goRealName()">前往认证</button>
				<button class="button" @click="$emit('update:isShow', false)">以后再说</button>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default{
		props:{
			isShow: {
				type: Boolean,
				default: false,
			}
		},
		watch: {
		},
		data(){
			return{
				IMG_URL: this.$IMG_URL
			}
		},
		methods:{
			goRealName() {
				this.$Router.push({
					path: '/pages/user/realname',
					query: {type: 'add'}
				});
				this.$emit('update:isShow',false)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mods{
		padding-bottom: calc(40rpx + env(safe-area-inset-bottom) / 2);
		padding-top: 20rpx;
		.heads{			
			text-align: center;
			image{
				width: 349rpx;
				height: 277rpx;
				margin: 30rpx 0;
			}
		}
		.text{
			text-align: center;
			font-size: 28rpx;
			font-weight: 600;
			color: $secondFontColor;
		}
		.text1{
			color: $secondFontColor;
			margin-top: 20rpx;
		}
		.btns{
			padding: 30rpx;
			padding-bottom: 0;
			.button{
				width: 60%;
				background: $btnColor;
				margin: 0 auto;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				font-size: 30rpx;
				border: none;
				color: $btnText;
				margin-top: 20rpx;
				font-weight: 600;
				border-radius: 0;
			}
			.button:last-child{
				background: none;
				color: $secondFontColor;
				font-weight: 500;
			}
			.button::after{
				border: none;
			}
		}
	}
	.buttons{
		width: 90%;
		background: #3e8dfd;
		margin: 0 auto;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		color: #f2f2f2;
		border: none;
	}
	.buttons::after{
		border: none;
	}
</style>
