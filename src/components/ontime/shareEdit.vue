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
							<li v-for="(item,index) in userlist">
								<el-checkbox v-model="item.checked"></el-checkbox>
								<span>{{item.name}}</span>
							</li>
						</ul>
					</div>
					<el-button size="small" type="success" @click="">保存设置</el-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import {  } from '@/api/api'
	export default {

		name: '',
		data() {
			return {
				userlist: [
				  {id:'1',name:'陈银浪0'},
				  {id:'2',name:'陈银浪1'},
				  {id:'3',name:'陈银浪2'},
				  {id:'4',name:'陈银浪3'},
				  {id:'5',name:'陈银浪4'},
				  {id:'6',name:'陈银浪5'},
				  {id:'7',name:'陈银浪6'},
				  {id:'8',name:'陈银浪7'},
				],
			}
		},
		methods:{
			
		},
		mounted(){
			
		}

	}
</script>

<style>

</style>