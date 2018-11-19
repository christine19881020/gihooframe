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
								<el-select size="small" collapse-tags v-model="khname" multiple filterable placeholder="客户名称" @change="searchFn('khname',khname)">
									<el-option v-for="(item,index) in grouplist.CustNameOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="khname.length>0" @click="clearFn('khname')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="startport" multiple filterable placeholder="起运港口" @change="searchFn('startport',startport)">
									<el-option v-for="(item,index) in grouplist.StartPortOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="startport.length>0" @click="clearFn('startport')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="destport" multiple filterable placeholder="目的港口" @change="searchFn('destport',destport)">
									<el-option v-for="(item,index) in grouplist.DestPortOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="destport.length>0" @click="clearFn('destport')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="status" multiple filterable placeholder="状态" @change="searchFn('status',status)">
									<el-option v-for="(item,index) in grouplist.TransitStatusOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="status.length>0" @click="clearFn('status')"></i>
							</div>
						</div>
					</transition>
					<el-table header-row-class-name="tablehead" @row-dblclick="rowFn" :data="tableData" style="width: 100%">
						<el-table-column prop="khname" label="客户名称">
						</el-table-column>
						<el-table-column prop="billno" label="出口发票号">
						</el-table-column>
						<el-table-column prop="startPort" label="起运港口">
						</el-table-column>
						<el-table-column prop="aimPort" label="目的港口">
						</el-table-column>
						<el-table-column prop="status" label="状态">
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import {
		ontimelistApi,
		downApi,
		ontimeList
	} from '@/api/api'
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
				destport: [],
				status: [],
				grouplist: {
					CustNameOption: [],
					StartPortOption: [],
					DestPortOption: [],
					StartPortOption: [],
				},
				tableData: [{
						id: '1',
						khname: '嘉德物流',
						billno: 'DLX1806010',
						startPort: '宁波',
						aimPort: '圣彼得堡',
						exDate: '2018-10-25',
						status: '审批中',
					},
					{
						id: '2',
						khname: '嘉德物流',
						billno: 'DLX1806010',
						startPort: '上海',
						aimPort: '圣彼得堡',
						exDate: '2018-10-25',
						status: '进行中',
					},
					{
						id: '3',
						khname: '嘉德物流',
						billno: 'DLX1806010',
						startPort: '上海',
						aimPort: '圣彼得堡',
						exDate: '2018-10-25',
						status: '已出运',
					}
				],
			}
		},
		methods: {
			searchFn(name, sortItem) {
				switch(name) {
					case 'khname':
						sessionStorage.setItem('khnameSort', this.khname.toString());
						this.initFn();
						break;
					case 'startport':
						sessionStorage.setItem('startportSort', this.startport.toString());
						this.initFn();
						break;
					case 'destport':
						sessionStorage.setItem('destportSort', this.destport.toString());
						this.initFn();
						break;
					case 'status':
						sessionStorage.setItem('statusSort', this.status.toString());
						this.initFn();
						break;
					default:
						this.khname = [];
						this.startport = [];
						this.destport = [];
						this.status = [];
						this.initFn();
						sessionStorage.removeItem('khnameSort');
						sessionStorage.removeItem('startportSort');
						sessionStorage.removeItem('destportSort');
						sessionStorage.removeItem('statusSort');
				}
			},
			clearFn(name, sortItem) {
				switch(name) {
					case 'khname':
						this.khname = [];
						sessionStorage.removeItem('khnameSort');
						break;
					case 'startport':
						this.startport = [];
						sessionStorage.removeItem('startportSort');
						break;
					case 'destport':
						this.destport = [];
						sessionStorage.removeItem('destportSort');
						break;
					case 'status':
						this.status = [];
						sessionStorage.removeItem('statusSort');
						break;
					default:
				}
			},
			sortInitFn(nameStorage) {
				var nameStorageString = sessionStorage.getItem(nameStorage);
				switch(nameStorage) {
					case 'khnameSort':
						if(nameStorageString) {
							this.khname = nameStorageString.split(',');
						} else {
							this.khname = [];
						}
						break;
					case 'startport':
						if(nameStorageString) {
							this.startport = nameStorageString.split(',');
						} else {
							this.startport = [];
						}
						break;
					case 'destport':
						if(nameStorageString) {
							this.destport = nameStorageString.split(',');
						} else {
							this.destport = [];
						}
						break;
					default:
						this.khname = [];
						this.startport = [];
						this.destport = [];
						this.status = [];
				}
			},
			filterFn() {
				this.filtershow = !this.filtershow;
			},
			tabFn(item) {
				this.tablist.forEach(tabbtn => {
					tabbtn.active = false;
				})
				item.active = !item.active;
			},
			rowFn(row) {
				console.log(row)
				this.$router.push('/ontime/detail/' + row.id)
			},
			initFn() {
				var khnameSTR = this.khname.length == 0 ? "" : this.khname.toString();
				var startportSTR = this.startport.length == 0 ? "" : this.startport.toString();
				var destportSTR = this.destport.length == 0 ? "" : this.destport.toString();
				var statusSTR = this.status.length == 0 ? "已出运" : this.status.toString();
				let params = {
					pageindex: 1,
					pagesize: 100,
					transway: 1,
					custname: khnameSTR,
					startport: startportSTR,
					destport: destportSTR,
					status: statusSTR,
				}
				ontimelistApi(params).then(res => {
//					this.tableData = res.body.resultdata
				})
			},
			downFn() {
				let params = {}
				downApi(params).then(res => {
					this.grouplist = res.body.resultdata;
				})
			}
		},
		mounted() {
			this.initFn();
			this.downFn();
			this.sortInitFn("khnameSort");
			this.sortInitFn("startportSort");
			this.sortInitFn("destportSort");
			this.sortInitFn("statusSort");
		}
	}
</script>

<style>

</style>