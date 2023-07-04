<template>
	<view>
		<u-popup :show="inputmode" mode="center" round="16" :customStyle="{ width: '70%', background: '#fff'}" :closeable="true"
		 :safeAreaInsetBottom="false" @close="tozizhi">
			<view class="mode">
				<image :style="integramessagedata.id?'borderRadius: 10rpx;marginTop:20px':''" :src="integramessagedata.image||'/static/images/jifen.png'" mode=""></image>
				<view class="title">{{integramessagedata.name||'获得DD'}}</view>
				<view class="con">{{integramessage}}</view>
				<view class="btns flex-between">
				    <button class="button" @click.stop="tozizhi">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default{
		props:{
			inputmode: {
				type: Boolean,
				default: false,
			},
			integramessage:{
				type: String,
				default: ''
			},
			integramessagedata:{
				type: Object,
				default:{
					id: '',
					name: '',
					image: '',
				}
			}
		},
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		},
		methods:{
			tozizhi() {
				this.$emit('tozizhihandle',false)
			},
		}
	}
</script>

<style lang="scss" scoped>
.mode{
	padding: 20upx 40upx 40upx;
	position: relative;
	text-align: center;
	>image{
		width: 204upx;
		height: 208upx;
	}
	.title{
		font-weight: 700;
		margin-bottom: 8upx;
		color: #222;
		font-size: 40upx;
	}
	.con{
		padding: 0 0 120upx;
		font-family: "PingFang SC";
		line-height: 56upx;
		font-size: 30upx;
		color: #666;
	}
	.btns {
		width: 100%;
		position:absolute;
		bottom: 60upx;
		left: 0;
		.button {
			width: 70%;
			height: 70rpx;
			text-align: center;
			font-size: 30rpx;
			border-radius: 60upx;
			margin-top: 30rpx;
			background: none;
			background: $btnColor;
			box-shadow: 0 6px 18px rgba(45, 45, 254, 0.35);
			flex: none;
		}
		.button::after {
			border: none;
		}
	}
}
</style>