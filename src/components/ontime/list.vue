<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<div class="oprateSquare clearfix">
						<el-button round size="small" @click="filterFn" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
						<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index" @click="tabFn(item,index)">{{item.name}}</el-button>
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
								<el-select size="small" collapse-tags v-model="status" multiple filterable placeholder="状态" @change="searchFn('status',status)">
									<el-option v-for="(item,index) in grouplist.TransitStatusOption" :key="index" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="status.length>0" @click="clearFn('status')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="module" multiple filterable placeholder="模块" @change="searchFn('module',module)">
									<el-option v-for="(item,index) in grouplist.moduleOption" :key="index" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="status.length>0" @click="clearFn('status')"></i>
							</div>
						</div>
					</transition>

					<!--<el-table class="orderlist scrollload-container" v-loading="loading" :class="{'holdH':loading}" ref="orderlistEl">
						<template v-if="tableData.length==0">
							<div class="nodata">暂无数据</div></template>
						<template v-else>
						<InfiniteScroll class="scrollload-content" :list="tableData" :loadmore="loadMore" marker="demo" :nomore="isdatanomore">
							<!--<ul class="orderlist" v-loading="loading" :class="{'holdH':loading}">-->
					<!--<li v-for="(item,index) in ontimelist" :key="index" class="clearfix li" @click="godetailFn(item)">-->
					<!--<template slot="item" slot-scope="props">
								<div style="height: 45px;" @click="rowFn(props.data)">
									<i class="fa fa-list-alt" v-if="props.data.isdraft==0"></i>
									<i class="fa fa-inbox" v-if="props.data.isdraft==1"></i>
									<span class="title">{{props.data.title}}</span>
									<span class="fr" v-if="props.data.type==1">{{props.data.status}}</span>

									<el-rate disabled class="fr" v-model="props.data.fraction"></el-rate>
								</div>
							</template>
							<!--</li>-->
					<!--</ul>-->
					<!--</InfiniteScroll>
						</template>
					</el-table>-->

					<el-table header-row-class-name="tablehead" @row-dblclick="rowFn" :data="tableData" style="width: 100%">
						<el-table-column prop="custname" label="客户名称">
						</el-table-column>
						<el-table-column prop="billno" label="出口发票号">
						</el-table-column>
						<el-table-column prop="startport" label="起运港口">
						</el-table-column>
						<el-table-column prop="destport" label="目的港口">
						</el-table-column>
						<el-table-column width="80" prop="transitstatus" label="状态">
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
				loading: true,
				transway: '',
				filtershow: false,
				tablist: [{
						name: '海运',
						active: true,
					},
					{
						name: '空运',
						active: false,
					}, {
						name: '铁路',
						active: false,
					}, {
						name: '快递',
						active: false,
					}, {
						name: '拖车',
						active: false,
					}
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
					StartPortOption: [],
					moduleOption: []
				},
				tableData: [],
				query: {
					custname: "",
					startport: "",
					destport: "",
					status: "",
					module: ''
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
							module:'',
						}
						sessionStorage.removeItem('custnameSort');
						sessionStorage.removeItem('startportSort');
						sessionStorage.removeItem('destportSort');
						sessionStorage.removeItem('statusSort');
						sessionStorage.removeItem('moduleSort');
				}
			},
			clearFn(name) {
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
				item.active = !item.active;
				this.transway = index + 1;
				this.initFn(this.transway);
			},
			rowFn(row) {
				console.log(row)
				this.$router.push('/ontime/detail/' + row.id)
			},
			initFn(transway) {
				let params = {
					pageindex: 1,
					pagesize: 100,
					query: JSON.stringify(this.query),
					transway: transway,
				}
				ontimelistApi(params).then(res => {
					this.tableData = res.body.resultdata
				})
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
			this.downFn();
			this.sortInitFn("custnameSort");
			this.sortInitFn("startportSort");
			this.sortInitFn("destportSort");
			this.sortInitFn("statusSort");
			this.initFn(1);
		}
	}
</script>

<style>

</style>