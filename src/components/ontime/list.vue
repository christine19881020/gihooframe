<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<el-button round size="small" @click="" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
					<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index" @click="tabFn(item)">{{item.name}}</el-button>

				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				filtershow: false,
				tablist: [{
						name: '海运',
						active: true,
					},
					{
						name: '拖车',
						active: false,
					}, {
						name: '空运',
						active: false,
					}, {
						name: '铁路',
						active: false,
					}, {
						name: '报关',
						active: false,
					}
				]
			}
		},
		methods:{
			tabFn(item){
				this.tablist.forEach(tabbtn=>{
					tabbtn.active=false;
				})
				item.active=!item.active;
			}
		}
	}
</script>

<style>

</style>