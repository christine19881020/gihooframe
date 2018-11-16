<template>
</template>

<script>
	import {
		getToken,
		setToken,
		removeToken
	} from '@/utils/auth'
	import {
		tokenCodeApi
	} from '@/api/api'
	export default {
		name: 'token',
		data() {
			return {}
		},
		methods: {
			tokenFn() {
				sessionStorage.setItem('code', this.$route.params.code);
				setToken(this.$route.params.code, 1);
				this.getIdFn();
			},
			getIdFn() {
				tokenCodeApi().then(res => {
					if (res.success) {
						console.log('res', res);						
						this.$router.push('/ontime/list')
					
					}

				})
			},
		},
		mounted() {
			this.tokenFn();
		}
	}
</script>

<style>

</style>
