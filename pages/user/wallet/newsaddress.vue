<template>
	<view class="container">
		<u-navbar title="新增地址" :bgColor="bgColor" placeholder>
			<view slot="left">
				<image class="more-1" :src="IMG_URL+'navnar_icon_back.png'" @click="backhandle"></image>
			</view>
		</u-navbar>
		<view class="add" v-if="type == 'add'">
			<view class="form">
				<view class="form-row">
					<input type="text" v-model="form.title" placeholder="请输入标签" placeholder-class="pl" />
				</view>
				<view class="form-row">
					<input type="text" v-model="form.address" placeholder="请输入对应的地址" placeholder-class="pl" />
				</view>
			</view>
			<button class="btn" :loading="loading" :disabled="loading" @click="sumbithandle">确定</button>
		</view>
		<view class="amend" v-else>
			<view class="form">
				<view class="form-row">
					<input type="text" v-model="form.title" placeholder="请输入标签" placeholder-class="pl" />
				</view>
				<view class="form-row">
					<input type="text" v-model="form.address" placeholder="请输入对应的地址" placeholder-class="pl" />
				</view>
			</view>
			<button class="btn" :loading="loading" :disabled="loading" @click="sumbithandle">修改</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				IMG_URL: this.$IMG_URL,
				bgColor: '#FAFAFE',
				loading: false,
				type: '',
				id: '',
				form:{
					title: '',
					address: '',
				},
				Rules: [
					{ name: 'title', errmsg: '请输入标签' },
					{ name: 'address', errmsg: '请输入对应的地址' },
				],
			}
		},
		onLoad(){
			this.type = this.$Route.query.type
			if(this.type != "add"){
				this.id = this.$Route.query.id
				this.form.title = this.$Route.query.title
				this.form.address = this.$Route.query.address
			}
			
			// console.log(this.type,this.id)
		},
		onShow() {},

		methods: {
			sumbithandle() {
				if(this.type == 'add'){
					for (let rule of this.Rules) {
						if (!this.form[rule.name]) {
							this.$u.toast(rule.errmsg);
							return;
						}
					}
					this.loading = true
					// 新增
					// let _this = this
					this.$http('walletaddress', this.form, 'post').then((res) => {
						this.loading = false
						if (res.code == 10000) {
							this.$u.toast('添加成功');
							setTimeout(()=>{
								this.$Router.back()
							},1000)
						} else {
							this.$u.toast(res.message)
							this.loading = false
						}
					})
				}else{
					for (let rule of this.Rules) {
						if (!this.form[rule.name]) {
							this.$u.toast(rule.errmsg);
							return;
						}
					}
					this.loading = true
					// 修改
					this.$http("walletaddress/update/"+this.id, this.form, 'post').then((res) => {
						this.loading = false
						if (res.code == 10000) {
							this.$u.toast('修改成功');
							setTimeout(()=>{
								this.$Router.back()
							},1000)
						} else {
							this.$u.toast(res.message)
							this.loading = false
						}
					})
				}
			},
			// 返回
			backhandle() {
				this.$Router.back()
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

	.more-1 {
		width: 48rpx;
		height: 48rpx;
		margin-top: 10rpx;
	}
}
.form{
	margin: 40rpx 24rpx 0;
	.form-row {
		margin-bottom: 20rpx;
		&:last-child{
			margin-bottom: 0rpx !important;
		}
		
		input {
			color: $textblack;
			border-radius: 10rpx;
			padding: 40rpx 32rpx;
			border-radius: 16rpx;
			background: #fff;
		}
	}
}
.btn{
	width: 95%;
	margin-top: 80rpx;
}
</style>
