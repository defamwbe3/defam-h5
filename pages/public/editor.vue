<template>
	<view class="container">
		<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
		<view class='toolbar flex-middle'>
			<view class="iconfont icon-charutupian" @tap="insertImage">tupian</view>
		</view>
	</view>
</template>
 
<script>
export default {
	name: "editor",
	components: {
	},
	data() {
		return {
			placeholder: '开始输入...'
		};
	},
	onLoad() {
	},
	methods: {
		onEditorReady() {
			// #ifdef APP-PLUS || H5 ||MP-WEIXIN
			uni.createSelectorQuery().select('#editor').context((res) => {
				this.editorCtx = res.context
			}).exec()
			// #endif
		},
		undo() {
			this.editorCtx.undo()
		},
		insertImage() {
			uni.chooseImage({
				count: 1,
				success: (res) => {
					this.editorCtx.insertImage({
						src: res.tempFilePaths[0],
						alt: '图像',
						success: function () {
							console.log('insert image success')
						}
					})
				}
			})
		}
	}
}
</script>
 
<style lang="scss">
.container {
	padding: 10px;
}

#editor {
	width: 100%;
	height: 100lvmin;
	background-color: #fff;
}

button {
	margin-top: 10px;
}
</style>