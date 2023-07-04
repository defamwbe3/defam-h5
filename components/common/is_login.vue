<template>
	<view>
		<u-popup :show="showModal" mode="center" :customStyle="{width:'80%', borderRadius: '16px',zIndex: '999999999'}" :safeAreaInsetBottom="false">
			<view class="headlogin">
				<image src="/static/images/denglu.png" mode=""></image>
			</view>
			<view class="text1">您尚未登录</view>
			<view class="text">登录赠送DD</view>
			<view class="btns">
				<button class="buttons" @click="jump('/pages/public/login',{})">前往登录</button>
				<button class="buttons button" @click="isLoginhandle">以后再说</button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { mapMutations, mapActions, mapState } from 'vuex';
	export default{
		data(){
			return{
				IMG_URL: this.$IMG_URL,
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.user.isLogin
			}),
			showModal: {
				get() {
					return this.isLogin;
				},
				set(val) {
					this.$store.commit('IS_LOGIN', val);
				}
			}
		},
		onLoad() {
		},
		methods:{
			isLoginhandle(){
				this.showModal = false
			},
			jump(path, query) {
				this.$Router.push({
					path: path,
					query: query
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.headlogin{
		text-align: center;
		image{
			width: 380upx;
			height: 380upx;
			margin-top: 10upx;
		}
	}
	.text1{
		text-align: center;
		font-size: 32upx;
		font-weight: 700;
		color: #222222;
	}
	.text{
		text-align: center;
		font-size: 28upx;
		color: #999999;
		padding: 14upx 0 0;
	}
	.btns{
		justify-content: space-between;
		padding-bottom: 10upx;
		.buttons{
			width: 50%;
			background-color: $btnColor;
			margin: 0 auto;
			height: 70upx;
			line-height: 70upx;
			text-align: center;
			font-size: 28upx;
			color: #f2f2f2;
			border: none;
			border-radius: 60upx;
			margin-top: 20upx;
		}
		.buttons:last-child{
			background: none;
			color: #999999;
		}
		.buttons::after{
			border: none;
		}
	}
</style>
