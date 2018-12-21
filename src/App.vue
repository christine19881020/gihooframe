<template>
	<div id="app">
	    <logindlg></logindlg>
		<router-view></router-view>
	</div>
</template>

<script>
	import logindlg from '@/components/login/logindlg'
	export default {
		name: 'App',
		components:{
			logindlg,
		}
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
		font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimSun, sans-serif;
		font-size: 18px;
	}
</style>
