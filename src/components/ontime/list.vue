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
								<el-select size="small" collapse-tags v-model="custname" multiple filterable placeholder="客户名称" @change="searchFn('custname',custname)">
									<el-option v-for="(item,index) in grouplist.CustNameOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="custname.length>0" @click="clearFn('custname')"></i>
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
								<el-select size="small" collapse-tags v-model="transitstatus" multiple filterable placeholder="状态" @change="searchFn('transitstatus',transitstatus)">
									<el-option v-for="(item,index) in grouplist.TransitStatusOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="transitstatus.length>0" @click="clearFn('transitstatus')"></i>
							</div>
						</div>
					</transition>
					<el-table header-row-class-name="tablehead" @row-dblclick="rowFn" :data="tableData" style="width: 100%">
						<el-table-column prop="custname" label="客户名称">
						</el-table-column>
						<el-table-column prop="billno" label="出口发票号">
						</el-table-column>
						<el-table-column prop="startport" label="起运港口">
						</el-table-column>
						<el-table-column prop="destport" label="目的港口">
						</el-table-column>
						<el-table-column prop="transitstatus" label="状态">
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
				query: {
					custname: "",
					startport: "",
					destport: "",
					transitstatus: "",
				}
			}
		},
		methods: {
			searchFn(name, sortItem) {
				var itemParam = sortItem.toString();
				switch(name) {
					case 'custname':
						this.query.custname = itemParam;
						sessionStorage.setItem('custnameSort', itemParam);
						this.initFn();
						break;
					case 'startport':
						this.query.startport = itemParam;
						sessionStorage.setItem('startportSort', itemParam);
						this.initFn();
						break;
					case 'destport':
						this.query.destport = itemParam;
						sessionStorage.setItem('destportSort', itemParam);
						this.initFn();
						break;
					case 'transitstatus':
						this.query.transitstatus = itemParam;
						sessionStorage.setItem('transitstatusSort', itemParam);
						this.initFn();
						break;
					default:
						this.query = {
							custname: "",
							startport: "",
							destport: "",
							transitstatus: "",						
						}
						sessionStorage.removeItem('custnameSort');
						sessionStorage.removeItem('startportSort');
						sessionStorage.removeItem('destportSort');
						sessionStorage.removeItem('transitstatusSort');
				}
			},
			clearFn(name) {
				switch(name) {
					case 'custname':
						this.custname = [];
						this.query.custname="";
						sessionStorage.removeItem('custnameSort');
						this.initFn();
						break;
					case 'startport':
						this.startport = [];
						this.query.startport="";
						sessionStorage.removeItem('startportSort');
						this.initFn();
						break;
					case 'destport':
						this.destport = [];
						this.query.destport="";
						sessionStorage.removeItem('destportSort');
						this.initFn();
						break;
					case 'transitstatus':
						this.transitstatus = [];
						this.query.transitstatus="";
						sessionStorage.removeItem('transitstatusSort');
						this.initFn();
						break;
					default:
				}
			},
			sortInitFn(nameStorage) {
				var nameStorageString = sessionStorage.getItem(nameStorage);
				switch(nameStorage) {
					case 'custnameSort':
						if(nameStorageString) {
							this.custname = nameStorageString.split(',');
							console.log('custname',this.custname)
							this.query.custname = nameStorageString;
						} else {
							this.custname = [];
							this.query.custname ="";
						}
						break;
					case 'startportSort':
						if(nameStorageString) {
							this.startport = nameStorageString.split(',');
							this.query.startport = nameStorageString;
						} else {
							this.startport = [];
							this.query.startport="";
						}
						break;					
					case 'destportSort':
						if(nameStorageString) {
							this.destport = nameStorageString.split(',');
							this.query.destport = nameStorageString;
						} else {
							this.destport = [];
							this.query.destport="";
						}
						break;
					case 'transitstatusSort':
						if(nameStorageString) {
							this.transitstatus = nameStorageString.split(',');
							this.query.transitstatus = nameStorageString;
						} else {
							this.transitstatus = [];
							this.query.transitstatus="";
						}
						break;
					default:
						this.custname = [];
						this.startport = [];
						this.destport = [];
						this.transitstatus = [];
						this.query.custname="";
						this.query.startport="";
						this.query.destport="";
						this.query.transitstatus="";

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
				let params = {
					pageindex: 1,
					pagesize: 100,
					query:JSON.stringify(this.query),
					transway: 1,
				}
				ontimelistApi(params).then(res => {
					this.tableData = res.body.resultdata
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
			this.sortInitFn("custnameSort");
			this.sortInitFn("startportSort");
			this.sortInitFn("destportSort");
			this.sortInitFn("transitstatusSort");
		}
	}
</script>

<style>

</style>