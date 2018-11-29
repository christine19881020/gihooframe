<template>
	<section>
		<div class="simple-stack">
			<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
				<a> 返回海运列表</a>
			</div>
			<div class="page page-1 page-behind" @click="$router.push('/ontime/detail/'+$route.params.id)">
				<a> 返回订单详情</a>
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
						<li @click="quitFn" class="red" v-if="quitshow">
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
							<li class="pa" v-for="(item,index) in userlist" v-if="item.ischeck" :key="index">
								<img v-if="item.avatarurl" :src="item.avatarurl" class="pahead"/>
								<img v-else src="../../assets/erhax2.jpg" class="pahead" />
							 	
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
	import { teamlistApi,sharelistApi,quitShareApi } from '@/api/api'
	export default {
		data() {
			return {
				userlist: [],
				quitshow:true,
			}
		},
		methods: {
			initFn() {
				let params = {
					orderId:this.$route.params.id
				}
				sharelistApi(params).then(res => {
					this.userlist = res.body.resultdata;
					this.quitshow=res.body.returnValue;
					
				})
			},
			quitFn() {
               let params={
               	 orderId:this.$route.params.id
               }
               quitShareApi(params).then(res=>{
               	  if(res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						})
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
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