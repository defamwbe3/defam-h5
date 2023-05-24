<template>
	<view class="from">
		<view class="rows">
			<view class="label xing">项目名称/公司/DAO名称</view>
			<input type="text" v-model="form.title" :disabled="disabled" placeholder="请填写项目名称/公司/DAO名称" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label xing">简介</view>
			<textarea class="ta" v-model="form.introduction" type="textarea" :disabled="disabled" placeholder="请填写简介"placeholder-style="color:#BEBEC0"
			 maxlength="-1" @input="inputcontent"/>
		</view>
		<view class="rows">
			<view class="label xing">网站链接</view>
			<input type="text" v-model="form.website" :disabled="disabled" placeholder="网站链接" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label xing">申请人职位</view>
			<input type="text" v-model="form.applicant" :disabled="disabled" placeholder="请填写申请人职位" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label xing">申请人联系方式</view>
			<input type="text" v-model="form.contact" :disabled="disabled" placeholder="微信/手机号/邮箱均可 不填写将不会被验证成功" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label">Twitter链接</view>
			<input type="text" v-model="form.twitter_url" :disabled="disabled" placeholder="网站链接" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label">Telegram链接</view>
			<input type="text" v-model="form.telegram_url" :disabled="disabled" placeholder="网站链接" placeholder-style="color:#BEBEC0">
		</view>
		<view class="rows">
			<view class="label">Discord链接</view>
			<input type="text" v-model="form.discord" :disabled="disabled" placeholder="网站链接" placeholder-style="color:#BEBEC0">
		</view>
		<view class="btn">
			<button :disabled="loading" :loading="loading" @click="sumbithandle()" v-if="is_enterprise==0||is_enterprise==2">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				form:{
					id: 0,
					title: '', 
					website: '', 
					twitter_url: '', 
					telegram_url: '', 
					discord: '', 
					applicant: '', 
					contact: '', 
					introduction: '',
					// #ifdef H5
					platform: 'h5',
					//#endif
					// #ifdef MP-WEIXIN
					platform: '小程序',
					//#endif
				},
				loading: false,
				Rules: [
					{ name: 'title', errmsg: '请填写项目名称/公司/DAO名称' },
					{ name: 'introduction', errmsg: '请填写简介' },
					{ name: 'website', errmsg: '请填写网站链接' },
					{ name: 'applicant', errmsg: '请填写申请人职位' },
					{ name: 'contact', errmsg: '请填写申请人联系方式' },
				],
				is_enterprise: 0,
				disabled: false,
			}
		},
		onLoad() {
			try{
				this.is_enterprise = this.$Route.query.is_enterprise;
				if(this.is_enterprise!=0){
					this.disabled = this.is_enterprise==3?true: this.is_enterprise==1?true:false
					this.detailhandle()
				}
			}catch(e){
				//TODO handle the exception
			}
		},
		methods:{
			detailhandle(){
				this.$http('authenterprise/detail', {}, 'get').then((res) => {
					this.form = {
						id: res.data.id,
						title: res.data.title, 
						website: res.data.website, 
						twitter_url: res.data.twitter_url, 
						telegram_url: res.data.telegram_url, 
						discord: res.data.discord, 
						applicant: res.data.applicant, 
						contact: res.data.contact, 
						introduction: res.data.introduction,
						platform: res.data.platform,
					}
				}).catch(()=>{
					this.loading = false
				})
			},
			// 资质认证提交
			sumbithandle(){
				for (let rule of this.Rules) {
					if (!this.form[rule.name]) {
						this.$u.toast(rule.errmsg);
						return;
					}
				}
				this.loading = true
				this.$http('authenterprise', this.form, 'post').then((res) => {
					this.loading = false
					this.$u.toast('提交成功');
					let _this = this
					setTimeout(()=>{
						_this.$Router.replace({
							path: '/pages/activity/activity'
						})
					},100)
				}).catch(()=>{
					this.loading = false
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.from{
		padding:  40upx 24upx;
		padding-bottom: 80upx;
		.rows{
			.label{
				position: relative;
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 28upx;
				color: #333;
			}
			.xing{
				padding-left: 24upx;
			}
			.xing::before{
				content: '*';
				position: absolute;
				left: 0;
				color: #FF1C41;
			}
			input, textarea{
				padding: 32upx 24upx;
				background-color: #fff;
				font-size: 28upx;
				margin: 20upx 0 60upx;
				border-radius: 8upx;
			}
			textarea{
				width: 93%;
			}
		}
		.btn{
			position: fixed;
			bottom: 30upx;
			width: 93%;
			z-index: 9;
		}
	}
</style>