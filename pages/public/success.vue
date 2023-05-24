<template>
	<view class="success-wrap">
		<image :src="IMG_URL + 'image_sucess.png'" mode=""></image>
		<block v-if="success_type=='postar'">
			<view class="text">已发布</view>
			<view class="tips">恭喜您发布成功~</view>
			<view class="btn" @click="todetail">查看</view>
		</block>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				success_type: '',
				id: ''
			}
		},
		onLoad() {
			this.success_type = this.$Route.query.type||'postar'
			this.id = this.$Route.query.id||''
			if(this.success_type=='postar'){
				uni.setNavigationBarTitle({title:'发布'})
			}
		},
		methods:{
			todetail(){
				if(this.success_type=='postar'){
					this.$Router.push({path:'/pages/index/articledetails',query:{type: 2,lang:'long',id: this.id}})
				}else{
					this.$Router.push('/pages/index/circle')
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.success-wrap{
		text-align: center;
		background-color: #fff;
		min-height: 100vh;
		>image{
			width: 160upx;
			height: 160upx;
			margin: 244upx 0 30upx;
		}
		.text{
			color: #222222;
			font-weight: 700;
			font-size: 32upx;
		}
		.tips{
			font-size: 26upx;
			color: #9F9EA3;
			margin: 20upx 0 40upx;
		}
		.btn{
			width: 192upx;
			height: 60upx;
			line-height: 60upx;
			margin: 0 auto;
			border-radius: 60upx;
			font-size: 28upx;
			text-align: center;
			color: #1B1BDD;
			background: #fafafe;
			border: 1px solid #f0f1f9;
		}
	}
</style>