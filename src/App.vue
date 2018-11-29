<template>
	<div id="app">
		<verify></verify>
		<router-view />
	</div>
</template>

<script>
	import verify from '@/components/commons/verify'
	export default {
		name: 'App',
		components: {
			verify
		},
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
