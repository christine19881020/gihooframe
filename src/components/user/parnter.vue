<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="parnterblock">
					<h1>伙伴
						<span class="h1desc">
						  （团队总数{{totalCount}}人，直属伙伴{{currentCount}}人）
						</span></h1>
					<ul class="palist">
						<li class="pa" v-for="(item,index) in palist" :key="index">
							<img src="../../assets/erhax2.jpg" class="pahead" />
							<p class="paname">{{item.nickname}}</p>
							<p class="patime">{{item.createdate}}</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { teamlistApi } from '@/api/api'
	export default {
		data() {
			return {
				palist: [],
				totalCount: '',
				currentCount: '',
			}
		},
		methods: {
			initFn() {
				let params = {}
				teamlistApi(params).then(res => {
					this.palist = res.data.list;
					this.totalCount = res.data.page.totalCount;
					this.currentCount = res.data.page.currentCount;
				})
			}
		},
		computed: {

		},
		mounted() {
			this.initFn();
		}
	}
</script>

<style>

</style>