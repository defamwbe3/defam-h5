<template>
    <view></view>
</template>
 
<script>
// h5 使用控制台打log 得先npm install vconsole
import Vconsole from 'vconsole';
export default {
	data() {
		return {
			code:'',
			state:''
		}
	},
    onLoad() {
	   let vConsole = new Vconsole();
	   this.state = this.getUrlCode('state')
	   this.checkWeChatCode(this.code)
    },
    methods: {
		checkWeChatCode() {
			// 页面一进来先判断是否有code
			this.code = this.getUrlCode('code')
			if (this.code) {
			// 如果有，走登记接口
				this.getLogin(this.code)
			} else {
			// 没有调后端接口获取地址
				// let params = {
				//     url:window.location.href,//当前页面的详细地址
				//     state:this.state,
				//     authType:0
				// }
				// this.$http('authorize?redirect_url=http://h5.cjlbzx.szyqa.com/#/', {},'get').then(res => {
				// 	if(res.data.code == 0){
				// 		window.location.href = res.data.message
				// 	}else {
				// 		this.$u.toast(res.data.message)
				// 	}
				// })
				this.$http('authorize', { 
					redirect_url: 'http://h5.cjlbzx.szyqa.com/#/'
				}, 'get').then((res) => {
					
				}).catch(()=>{
					
				})
				// 根据需求使用 this.getCode()
			}
		},
		getUrlCode (name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
		},
		// 获取code
		// getCode () {
		// 	window.location.href = 
		// 	'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.appID +
		// 	'&redirect_uri=' + encodeURIComponent(this.callBack) +
		// 	'&response_type=code&scope=snsapi_userinfo&state=' + this.state + '#wechat_redirect';
			
		// redirect_uri是授权成功后，跳转的url地址，微信会帮我们跳转到该链接，并且通过？的形式拼接code，这里需要用encodeURIComponent对链接进行处理。
		// 如果配置参数一一对应，那么此时已经通过回调地址刷新页面后，你就会再地址栏中看到code了。
		// https://test.yuruantong.com/pages/loginAndRegister/login/loginH5?code=0312nn200ADR1P1BYh100zp2VL32nn2f&state=1
		// },
	    //登录
		async getLogin(value){
			let params = {
				code:value,
				wechartState:this.state
			}
			const res = await xxxx(params)
			if(res.data.code != 0){
				this.$u.toast(res.data.message)
				return;
			}
			if(res.data.rows[0].code == 1){
				let obj = res.data.rows;
				obj.push({
					wechartState:this.state
				})
				let arr = {
					params:obj,
					isShow:true
				}
				uni.redirectTo({
					url: '/pages/public/login?params=' + JSON.stringify(arr)
				})
			}else if(res.data.rows[0].code == 2){ //res.data.rows 返回的是token 跳转对应的页面
				uni.setStorageSync('userInfo',res.data.rows[0].loginUserVO);
				uni.redirectTo({
					url:'/pages/index/index'
				})
			}else{}
		}
     }
}
</script>
<style>
</style>
