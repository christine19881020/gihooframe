<template>
	<div id="app">		
		<router-view/>
	</div>
</template>

<script>
	
	export default {		
		name: 'App',		
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