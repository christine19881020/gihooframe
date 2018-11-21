<template>
	<section>
		<div class="simple-stack">
			<div class="page page-root page-behind" @click="$router.push('/ontime/share/'+$route.params.id)">
				<a> 返回共享</a>
			</div>
			<div class="page page-1">
				<div class="pform" style="margin-top:15px;">
					<div class="block">
						<h1>
							选择成员							
						</h1>
						<ul class="userlist clearfix">
							<li class="ellipsis" v-for="(item,index) in userlist" :title="item.nickname">
								<el-checkbox v-model="item.checked"></el-checkbox>
								<span>{{item.nickname}}</span>
							</li>
						</ul>
					</div>
					<el-button size="small" type="success" @click="shareFn">保存设置</el-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { teamlistApi,shareApi } from '@/api/api'
	export default {
		name: '',
		data() {
			return {
				userlist: [],
			}
		},
		methods: {
			initFn() {
				let params = {
					pagesize: 100,
					currentpage: 1,
				}
				teamlistApi(params).then(res => {
					this.userlist = [];
					res.data.list.forEach(item => {
						item.checked = false;
						this.userlist.push(item);
					});
					this.totalCount = res.data.page.totalCount;
					this.currentCount = res.data.page.currentCount;
				})
			},
			shareFn(){
				var shareToIdsArr=[];
				var shareToIdsStr="";
				this.userlist.forEach(item=>{
					if(item.checked){
						shareToIdsArr.push(item.userid);
					}
				})
				shareToIdsStr=shareToIdsArr.toString();
				console.log(shareToIdsStr);
				let params={
					shareToIds:shareToIdsStr,
					orderId:this.$route.params.id,
				}
				shareApi(params).then(res=>{
					
				})
			}
		},
		mounted() {
			this.initFn();
		}

	}
</script>

<style>

</style>