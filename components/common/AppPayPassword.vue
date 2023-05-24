<template>
	<view class="">
		<!-- 支付密码弹窗 -->
		<uni-popup ref="payModal" type="center" :maskClick="false">
			<view class="payPwdModal">
				<image src="/static/images/icon_close.png" class="icon-close" mode="aspectFill" @click.stop="handleClosePayModal"></image>
				<view class="title">请输入支付密码</view>
				<view class="pwd-group">
					<view class="num-block flex">
						<view class="num-item flex items-center justify-center" v-for="(item,index) in payPwd_text" :key="index">{{item}}</view>
					</view>
					<input class="input-block" v-model="payPwd" maxlength="6" type="number" :focus="autoFocus" @input="inputPwd"/>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payPwd: null,
				payPwd_text: ['', '', '', '', '', ''],
				autoFocus: false
			}
		},
		props: ['showPayModal'],
		watch: {
			showPayModal(newFlg, old) {
				console.log(newFlg)
				let app = this;
				if(newFlg) {
					this.payPwd = null;
					this.payPwd_text = ['', '', '', '', '', ''];
					this.$refs.payModal.open();
					this.$nextTick(function() {
						app.autoFocus = true;
					});
				} else {
					this.$refs.payModal.close();
				}
			}
		},
		methods: {
			// 输入支付密码
			inputPwd(e) {
				let app = this;
				this.payPwd_text = ['', '', '', '', '', ''];
				for (var i = 0; i < this.payPwd.length; i++) {
					this.payPwd_text[i] = "*";
				}
				if(this.payPwd.length == 6) {
					this.autoFocus = false;
					this.$emit('inputPwdComplete', this.payPwd);
				}
			},
			cloePwdModal() {
				this.payPwd = null;
				this.payPwd_text = ['', '', '', '', '', ''];
			},
			handleClosePayModal() {
				this.$refs.payModal.close();
				this.$emit('closePwdModal', true);
			}
		}
	}
</script>

<style lang="scss">
	.payPwdModal {
		position: relative;
		margin: -30% auto 0;
		width: 80%;
		box-sizing: border-box;
		padding: 30rpx;
		background: #fff;
		.icon-close {
			position: absolute;
			right: 24rpx;
			top: 24rpx;
			width: 30rpx;
			height: 30rpx;
		}
		.title {
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			line-height: 44rpx;
			color: $textwhite;
		}
		.pwd-group {
			margin: 80rpx auto;
			position: relative;
			width: 480rpx;
			height: 80rpx;
			.input-block {
				position: absolute;
				top: 0;
				left: 1%;
				z-index: 3;
				width: 98%;
				height: 80rpx;
				opacity: 0;
			}
			.num-block {
				width: 100%;
				height: 80rpx;
				box-sizing: border-box;
				border: 1rpx solid #828282;
				background: #383838;
				.num-item {
					flex: 1;
					height: 80rpx;
					border-right: 1rpx solid #828282;
					color: $textwhite;
					font-size: 44rpx;
					line-height: 1;
					&:last-child {
						border-right: none;
					}
				}
			}
		}
	}
</style>