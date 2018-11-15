<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<div class="oprateSquare clearfix">
						<el-button round size="small" @click="filterFn" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
						<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index" @click="tabFn(item)">{{item.name}}</el-button>
						<div class="fr">
							<router-link to="/ontime/new">添加订单</router-link>
						</div>
					</div>
					<transition name="el-zoom-in-top">
						<div class="filterboxList clearfix" v-if="filtershow">
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="khname" multiple filterable placeholder="客户名称">
									<el-option v-for="(item,index) in grouplist.khname" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="khname.length>0" @click="khnameClearFn"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="startport" multiple filterable placeholder="起运港口">
									<el-option v-for="(item,index) in grouplist.startport" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="startport.length>0" @click="startportClearFn"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="aimport" multiple filterable placeholder="目的港口">
									<el-option v-for="(item,index) in grouplist.aimport" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="aimport.length>0" @click="aimportClearFn"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="exportdate" multiple filterable placeholder="出口日期">
									<el-option v-for="(item,index) in grouplist.exportdate" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="exportdate.length>0" @click="exportdateClearFn"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="status" multiple filterable placeholder="状态">
									<el-option v-for="(item,index) in grouplist.status" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="status.length>0" @click="statusClearFn"></i>
							</div>
						</div>
					</transition>
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
				],
				khname: [],
				startport: [],
				aimport: [],
				exportdate: [],
				status: [],
				grouplist: {
					khname: [],
					startport: [],
					aimport: [],
					exportdate: [],
					status: [],
				}
			}
		},
		methods: {
			filterFn() {
				this.filtershow = !this.filtershow;
			},
			tabFn(item) {
				this.tablist.forEach(tabbtn => {
					tabbtn.active = false;
				})
				item.active = !item.active;
			}
		}
	}
</script>

<style>

</style>