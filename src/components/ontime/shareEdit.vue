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
								<el-checkbox v-model="item.ischeck"></el-checkbox>
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
	import { teamlistApi, shareApi, sharelistApi } from '@/api/api'
	export default {
		name: '',
		data() {
			return {
				userlist: [],
				shareduserlist: [],
			}
		},
		methods: {
			initFn() {
				//				let params = {
				//					pagesize: 100,
				//					currentpage: 1,
				//				}
				//				teamlistApi(params).then(res => {
				//					this.userlist = [];
				//					res.data.list.forEach(item => {
				//						item.ischeck = false;
				//						this.userlist.push(item);
				//					});	
				//					this.sharedFn();
				//				});								
				let params = {
					orderId: this.$route.params.id
				}
				sharelistApi(params).then(res => {
					this.userlist = res.body.resultdata;
				})
			},
			sharedFn() {
				let params = {
					orderId: this.$route.params.id
				}
				sharelistApi(params).then(res => {
					this.shareduserlist = res.body.resultdata;
					this.userlist.forEach(item => {
						this.shareduserlist.forEach(sItem => {
							if(sItem.userid == item.userid) {
								item.ischeck = true;
							}
						})
					})
				})
			},
			shareFn() {
				var passarr = [];
				this.userlist.forEach(item => {
					var obj = {
						'nickname': item.nickname,
						'userid': item.userid,
						'ischeck': item.ischeck
					}
					passarr.push(obj)
				})
				let params = {
					data: JSON.stringify(passarr),
					orderId: this.$route.params.id,
				}
				shareApi(params).then(res => {
					if(res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						});
						this.$router.push('/ontime/share/' + this.$route.params.id)
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
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