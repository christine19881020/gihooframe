<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<div class="oprateSquare clearfix">
						<el-button round size="small" @click="filterFn" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
						<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index" @click="tabFn(item,index)">{{item.name}}</el-button>
						<div class="fr">
							<router-link :to="'/ontime/new/'+transway">添加订单</router-link>
						</div>
					</div>
					<transition name="el-zoom-in-top">
						<div class="filterboxList clearfix" v-if="filtershow">
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="custname" multiple filterable placeholder="客户名称" @change="searchFn('custname',custname)">
									<el-option v-for="(item,index) in grouplist.CustNameOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="custname.length>0" @click="clearFn('custname')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="startport" multiple filterable placeholder="起运港口" @change="searchFn('startport',startport)">
									<el-option v-for="(item,index) in grouplist.StartPortOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="startport.length>0" @click="clearFn('startport')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="destport" multiple filterable placeholder="目的港口" @change="searchFn('destport',destport)">
									<el-option v-for="(item,index) in grouplist.DestPortOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="destport.length>0" @click="clearFn('destport')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="status" multiple filterable placeholder="状态" @change="searchFn('status',status)">
									<el-option v-for="(item,index) in grouplist.StatusOption" :key="index" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="status.length>0" @click="clearFn('status')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="module" multiple filterable placeholder="模块" @change="searchFn('module',module)">
									<el-option v-for="(item,index) in grouplist.moduleOption" :key="index" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="module.length>0" @click="clearFn('module')"></i>
							</div>
						</div>
					</transition>
					<el-table v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" header-row-class-name="tablehead" @row-dblclick="rowFn" :data="tableData" style="width: 100%">
						<el-table-column prop="custname" label="客户名称">
						</el-table-column>
						<el-table-column prop="billno" label="出口发票号">
						</el-table-column>
						<el-table-column v-if="transway=='1'||transway=='2'" prop="startport" label="起运港口">
						</el-table-column>
						<el-table-column v-if="transway=='1'||transway=='2'" prop="destport" label="目的港口">
						</el-table-column>
						<el-table-column v-if="transway=='3'" prop="startport_air" label="起运地">
						</el-table-column>
						<el-table-column v-if="transway=='3'" prop="destport_air" label="目的地">
						</el-table-column>
						<el-table-column prop="statusname" label="状态">
						</el-table-column>
					</el-table>
					<div v-if="!busy" style="text-align: center;margin-top:20px;">
						<i class="el-icon-loading"></i>
					</div>
					<div v-if="busy&&tableData.length>0" style="text-align: center;margin-top:20px;color: #999;font-size:14px;">
						<p>-加载完成-</p>
					</div>

				</div>
			</div>
		</div>
	</section>
</template>

<script>
	//	var count = 0;
	import verify from '@/components/commons/verify'
	import {
		ontimelistApi,
		downApi,
		ontimeList
	} from '@/api/api'
	export default {
		name: 'list',
		components: {
			verify,
		},
		data() {
			return {

				loading: true,
				transway: '1',
				filtershow: false,
				tablist: [{
						name: '海运整箱',
						active: true,
					},
					{
						name: '海运拼箱',
						active: false,
					},
					{
						name: '空运',
						active: false,
					},
					//					{
					//						name: '快递',
					//						active: false,
					//					}, {
					//						name: '拖车',
					//						active: false,
					//					}, {
					//						name: '铁路',
					//						active: false,
					//					},
				],
				khname: [],
				startport: [],
				destport: [],
				status: [],
				module: [],
				grouplist: {
					CustNameOption: [],
					StartPortOption: [],
					DestPortOption: [],
					StatusOption: [],
					moduleOption: []
				},
				tableData: [],
				query: {
					custname: "",
					startport: "",
					destport: "",
					status: "",
					module: ''
				},
				count: 1,
				busy: true,
				page: 100,
				totalpage: 1,
				finishloading: false,
			}
		},
		methods: {
			searchFn(name, sortItem) {
				this.count = 1;
				this.busy = false;
				this.finishloading = false;
				this.tableData = [];
				var itemParam = sortItem.toString();
				switch(name) {
					case 'custname':
						this.query.custname = itemParam;
						sessionStorage.setItem('custnameSort', itemParam);
						this.initFn(this.transway);
						break;
					case 'startport':
						this.query.startport = itemParam;
						sessionStorage.setItem('startportSort', itemParam);
						this.initFn(this.transway);
						break;
					case 'destport':
						this.query.destport = itemParam;
						sessionStorage.setItem('destportSort', itemParam);
						this.initFn(this.transway);
						break;
					case 'status':
						this.query.status = itemParam;
						sessionStorage.setItem('statusSort', itemParam);
						this.initFn(this.transway);
						break;
					case 'module':
						this.query.module = itemParam;
						sessionStorage.setItem('moduleSort', itemParam);
						this.initFn(this.transway);
						break;
					default:
						this.query = {
							custname: "",
							startport: "",
							destport: "",
							status: "",
							module: '',
						}
						sessionStorage.removeItem('custnameSort');
						sessionStorage.removeItem('startportSort');
						sessionStorage.removeItem('destportSort');
						sessionStorage.removeItem('statusSort');
						sessionStorage.removeItem('moduleSort');
				}
			},
			clearFn(name) {
				this.count = 1;
				this.busy = false;
				this.finishloading = false;
				this.tableData = [];
				switch(name) {
					case 'custname':
						this.custname = [];
						this.query.custname = "";
						sessionStorage.removeItem('custnameSort');
						this.initFn(this.transway);
						break;
					case 'startport':
						this.startport = [];
						this.query.startport = "";
						sessionStorage.removeItem('startportSort');
						this.initFn(this.transway);
						break;
					case 'destport':
						this.destport = [];
						this.query.destport = "";
						sessionStorage.removeItem('destportSort');
						this.initFn(this.transway);
						break;
					case 'status':
						this.status = [];
						this.query.status = "";
						sessionStorage.removeItem('statusSort');
						this.initFn(this.transway);
						break;
					case 'module':
						this.module = [];
						this.query.module = "";
						sessionStorage.removeItem('moduleSort');
						this.initFn(this.transway);
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
							console.log('custname', this.custname)
							this.query.custname = nameStorageString;
						} else {
							this.custname = [];
							this.query.custname = "";
						}
						break;
					case 'startportSort':
						if(nameStorageString) {
							this.startport = nameStorageString.split(',');
							this.query.startport = nameStorageString;
						} else {
							this.startport = [];
							this.query.startport = "";
						}
						break;
					case 'destportSort':
						if(nameStorageString) {
							this.destport = nameStorageString.split(',');
							this.query.destport = nameStorageString;
						} else {
							this.destport = [];
							this.query.destport = "";
						}
						break;
					case 'statusSort':
						if(nameStorageString) {
							this.status = nameStorageString.split(',');
							this.query.status = nameStorageString;
						} else {
							this.status = [];
							this.query.status = "";
						}
						break;
					case 'moduleSort':
						if(nameStorageString) {
							this.module = nameStorageString.split(',');
							this.query.module = nameStorageString;
						} else {
							this.module = [];
							this.query.module = "";
						}
						break;
					default:
						this.custname = [];
						this.startport = [];
						this.destport = [];
						this.status = [];
						this.module = [];
						this.query.custname = "";
						this.query.startport = "";
						this.query.destport = "";
						this.query.status = "";
						this.query.module = "";

				}
			},
			filterFn() {
				this.filtershow = !this.filtershow;
			},
			tabFn(item, index) {
				this.tablist.forEach((tabbtn) => {
					tabbtn.active = false;
				})
				item.active = true;
				this.transway = (index + 1).toString();
				sessionStorage.setItem('transway', this.transway);
				this.count = 1;
				this.busy = false;
				this.finishloading = false;
				this.tableData = [];
				this.initFn(this.transway)
			},
			rowFn(row) {
				console.log(row)
				this.$router.push('/ontime/detail/' + row.id)
			},
			initFn(transway) {
				let params = {
					pageindex: this.count,
					pagesize: 10,
					query: JSON.stringify(this.query),
					transway: transway,
				}
				ontimelistApi(params).then(res => {
					if(this.count == 1) {
						this.tableData = res.body.resultdata;
						this.busy = false;
					} else {
						this.tableData = this.tableData.concat(res.body.resultdata);
						this.totalpage = res.body.returnValue;
						if(res.body.resultdata.length == 0) {
							this.busy = true;
							console.log('数据加载完 禁用滚动')
						} else {
							this.busy = false;
							console.log('busy 加载')
						}
					}
				});
			},
			loadMore: function() {
				this.busy = true;
				setTimeout(() => {
					this.count++;
					this.initFn(this.transway);
					console.log('count', this.count, this.totalpage, Math.ceil(this.totalpage / 10));
				}, 300);
			},
			downFn() {
				let params = {}
				downApi(params).then(res => {
					this.grouplist = res.body.resultdata;
					this.grouplist.moduleOption = [{
						text: '拖车',
						value: '拖车'
					}, {
						text: '报关',
						value: '报关'
					}, {
						text: '仓库',
						value: '仓库'
					}]
				})
			},

		},
		mounted() {
			sessionStorage.setItem('board', false);
			this.downFn();
			this.sortInitFn("custnameSort");
			this.sortInitFn("startportSort");
			this.sortInitFn("destportSort");
			this.sortInitFn("statusSort");

			this.$nextTick(() => {
				if(sessionStorage.getItem('transway')) {
					this.transway = sessionStorage.getItem('transway').toString();
					this.tablist.forEach((tabbtn) => {
						tabbtn.active = false;
					})
					this.tablist[this.transway - 1].active = true;
				} else {
					this.transway = "1"
				}
				this.count = 1;
				this.busy = true;
				this.finishloading = false;
				this.tableData = [];
				this.initFn(this.transway);
			})

		}
	}
</script>

<style>

</style>