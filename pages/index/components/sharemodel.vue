<template>
	<view class="share-wrap">
		<u-popup :show="inputmode" mode="bottom" round="14" :customStyle="{ width: '100%', background: '#FAFAFE'}" :safeAreaInsetBottom="false">
			<view class="mode">
				<view class="list flex">
					<!-- #ifdef MP-WEIXIN -->
					<button class="items"  open-type="share" :data-id="shareid">
						<image :src="IMG_URL+'fx_icon_zf.png'" mode=""></image>
						<view class="name">转发</view>
					</button>
					<!-- #endif -->
					<view class="items" @click="copy">
						<image :src="IMG_URL+'fx_icon_fz.png'" mode=""></image>
						<view class="name">复制链接</view>
					</view>
					<view class="items" v-if="tabsactivetop==1" @click="save()">
						<image  src="../../../static/images/save.png"  mode=""></image>
						<view class="name">保存图片</view>
					</view>
				</view>
				<view class="btns" @click="inputmode=false">取消</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { SHARE_url } from '@/env'
	export default{
		props:['sharemode','url','shareid','sharetype','detail','tabsactivetop'],
		data(){
			return{
				IMG_URL: this.$IMG_URL,
				inputmode: false,
			}
		},
		watch:{
			sharemode(newval,oldval){
				if(newval){
					this.inputmode = newval
				}
			},
			inputmode(newval,oldval){
				if(!newval){
					this.$emit('handleclose', false)
				}
			},
		},
		methods:{
			save(){
		  console.log('保存图片',this.detail)	
		  this.inputmode = false
		   if(this.inputmode == false){
			 this.$emit('onChange', '保存')   
		   }
		 
		 
		 // this.$Router.push({path:'/pages/index/cavsImg',query:{title:this.detail.title,tag:this.detail.tag,content:encodeURI(this.detail.content)}})
			},
			copy(){
				let _this = this
				console.log(SHARE_url , _this.url);
				uni.setClipboardData({
					data: SHARE_url + _this.url,
					success: function(data) {
						_this.$http('member/share', {action_id: _this.shareid,type: _this.sharetype}, 'get').then(res=>{
							_this.inputmode = false
							if(res.data.is_rewards==1){
								_this.$emit('integralhandles',{inputmode: true, message: res.message,messagedata: res.data.sui||''})
							}else{
								setTimeout(()=>{
									_this.$u.toast('已复制到剪切板')
								})
							}
						}).catch(()=>{})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.mode{
		.list{
			padding: 32upx 50upx;
			.items{
				
				display: block;
				line-height: 1;
				background: none;
				padding: 0;
				height: auto;
				margin: 0;
				margin-right: 38upx;
				flex: none;
				image{
					width: 96upx;
					height: 96upx;
				}
				.name{
					font-family: "PingFang SC";
					font-size: 22upx;
					text-align: center;
					color: #333;
					padding: 8upx 0;
				}
			}
		}
		.btns{
			width: 92%;
			padding: 24upx 30upx;
			background-color: #fff;
			padding-bottom: calc(env(safe-area-inset-bottom)/2 + 24upx);
			text-align: center;
			font-size: 32upx;
			color: #333;
		}
	}
</style>