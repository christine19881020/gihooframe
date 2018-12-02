<template>
	<div class="homepage-lightblue">
		<verify></verify>
		<Jheader></Jheader>		
		<transition name="fade">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import Jheader from '@/components/Jheader'
	import verify from '@/components/commons/verify'
	export default {
		name: 'index',
		components: {
			Jheader,
			verify
		},
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.homepage-lightblue {
		background: #F1FEFF;
		width: 100%;
		height: 100%;
	}
</style>