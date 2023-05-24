<template>
	<web-view :src="webviewPath"></web-view>
</template>
 
<script>
	export default {
		name: "webview",
		data() {
			return {
				webviewPath: ''
			};
		},
		onLoad() {
			this.webviewPath = this.$Route.query.webviewPath
			
		}
	}
</script>
 
<style>
 
</style>