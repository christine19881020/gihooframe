<template>
	<section>
		<div class="simple-stack">
			<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
				<a> 返回海运列表</a>
			</div>
			<div class="page page-1 page-behind" @click="$router.push('/ontime/list')">
				<a> 返回订单标题</a>
			</div>
			<div class="page page-2">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">共享</span>
						<p class="desc">编辑可以添加或移除成员</p>
					</div>
					<ul class="set">
						<li @click="$router.push('/ontime/shareEdit/'+$route.params.id)">
							<i class="iconfont icon-bianji"></i>
							<label>编辑</label>
						</li>
						<li @click="quitFn" class="red">
							<i class="iconfont icon-tuichu"></i>
							<label>退出</label>
						</li>
					</ul>
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>
				<div class="pform">
					<div class="parnterblock block">
						<h1>
						项目成员					
					</h1>
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
			},
			quitFn() {

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