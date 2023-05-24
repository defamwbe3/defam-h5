<template>
	<view class="">
		<view class="code" v-if="tiemJudge" @click="codehandle">{{ codetext }}</view>
		<view class="code" v-else @click="dontClick">{{ codetext }}s</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codetext: '获取验证码',
			tiemJudge: true,
			zhi: '',
		}
	},
	props: ['email', 'type'],
	onShow() {
		// this.
		console.log(this.$emit(email))
	},
	onPageScroll(e) {

	},
	methods: {
		codehandle() {
			if (!this.email) {
				uni.showToast({
					icon: 'none',
					title: '请输入邮箱号'
				});
				return false
			}
			if (this.tiemJudge) {
				this.codehandles()
			} else {
				uni.showToast({
					icon: 'none',
					title: '请勿重复获取'
				});
			}
		},
		codehandles() {
			var _this = this
			_this.$http('sms/email', { email: _this.email, type:_this.type=='0' ? 'login': 'register' }, 'GET').then(res => {
				if (res.code == 10000) {
					let tiemnum = 60
					_this.codetext = tiemnum
					_this.tiemJudge = false
					uni.showToast({
						icon: 'none',
						title: '验证码已发送'
					});
					let timer = setInterval(() => {
						tiemnum--
						_this.codetext = tiemnum
						if (tiemnum === 0) {
							clearInterval(timer)
							_this.codetext = '获取邮箱验证码'
							_this.tiemJudge = true
						}
					}, 1000)
				} else {
					_this.$u.toast(res.message)
				}
			})
		},
		dontClick() {
			uni.showToast({
				icon: 'none',
				title: '请勿重复获取'
			});
		}
	}
}
</script>
<style lang="scss" scoped>
.code {
	position: absolute;
	right: 10rpx;
	top: 50%;
	transform: translateY(-50%);
	font-size: 28rpx;
	color: $themeColor;
}
</style>
