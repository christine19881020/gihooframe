<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<div class="oprateSquare clearfix">
						<el-button round size="small" @click="filterFn" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
						<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index" @click="tabFn(item,index)">{{item.name}}</el-button>
						<div class="fr">
							<router-link to="/addbook/new">新建</router-link>
						</div>
					</div>
					<transition name="el-zoom-in-top">
						<div class="filterboxList clearfix" v-if="filtershow">
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="custname" multiple filterable placeholder="公司简称" @change="searchFn('custname',custname)">
									<el-option v-for="(item,index) in grouplist.CustNameOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="custname.length>0" @click="clearFn('custname')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="country" multiple filterable placeholder="国家" @change="searchFn('country',country)">
									<el-option v-for="(item,index) in grouplist.CountryOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="country.length>0" @click="clearFn('country')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="serviceMan" multiple filterable placeholder="维护人员" @change="searchFn('serviceMan',serviceMan)">
									<el-option v-for="(item,index) in grouplist.ServiceManOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="iconfont icon-guanbi1" v-if="serviceMan.length>0" @click="clearFn('serviceMan')"></i>
							</div>
						</div>
					</transition>
					<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
						<el-table header-row-class-name="tablehead" @row-dblclick="rowFn" :data="tableData" style="width: 100%">
							<el-table-column prop="custsimpname" label="公司简称">
							</el-table-column>
							<el-table-column prop="country" label="国家">
							</el-table-column>
							<el-table-column prop="serviceman" label="运维人员">
							</el-table-column>
							<el-table-column prop="custattname" label="性质">
							</el-table-column>
						</el-table>
					</div>
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
	import InfiniteLoading from 'vue-infinite-loading';
	import {
		addbooklistAPI,
		addbookdownAPI,
		ontimeList
	} from '@/api/api'
	export default {
		name: 'list',
		components: {
			InfiniteLoading,
		},
		data() {
			return {
				filtershow: false,
				transway: '',
				tablist: [{
						name: '公司',
						active: true,
					}, {
						name: '客户',
						active: false,
					},
					{
						name: '供应商',
						active: false,
					}
				],
				custname: [],
				country: [],
				serviceMan: [],
				grouplist: {
					CustNameOption: [],
					CountryOption: [],
					ServiceManOption: [],
				},
				tableData: [],
				query: {
					custname: "",
					country: "",
					serviceMan: "",
				},
				count: 1,
				busy: false,
				totalpage: 1,
				finishloading: false,
			}
		},
		methods: {
			searchFn(name, sortItem) {
				var itemParam = sortItem.toString();
				this.count = 1;
				this.busy = false;
				this.finishloading = false;
				this.tableData = [];
				switch(name) {
					case 'custname':
						this.query.custname = itemParam;
						sessionStorage.setItem('custnameSort', itemParam);
						this.initFn(this.transway);
						break;
					case 'country':
						this.query.country = itemParam;
						sessionStorage.setItem('countrySort', itemParam);
						this.initFn(this.transway);
						break;
					case 'serviceMan':
						this.query.serviceMan = itemParam;
						sessionStorage.setItem('serviceManSort', itemParam);
						this.initFn(this.transway);
						break;
					default:
						this.query = {
							custname: "",
							country: "",
							serviceMan: "",
						}
						sessionStorage.removeItem('custnameSort');
						sessionStorage.removeItem('countrySort');
						sessionStorage.removeItem('serviceManSort');
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
					case 'country':
						this.country = [];
						this.query.country = "";
						sessionStorage.removeItem('countrySort');
						this.initFn(this.transway);
						break;
					case 'serviceMan':
						this.serviceMan = [];
						this.query.serviceMan = "";
						sessionStorage.removeItem('serviceManSort');
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
							this.query.custname = nameStorageString;
						} else {
							this.custname = [];
							this.query.custname = "";
						}
						break;
					case 'countrySort':
						if(nameStorageString) {
							this.country = nameStorageString.split(',');
							this.query.country = nameStorageString;
						} else {
							this.country = [];
							this.query.country = "";
						}
						break;
					case 'serviceManSort':
						if(nameStorageString) {
							this.serviceMan = nameStorageString.split(',');
							this.query.serviceMan = nameStorageString;
						} else {
							this.serviceMan = [];
							this.query.serviceMan = "";
						}
						break;
					default:
						this.custname = [];
						this.country = [];
						this.serviceMan = [];
						this.query.custname = "";
						this.query.country = "";
						this.query.serviceMan = "";
				}
			},
			filterFn() {
				this.filtershow = !this.filtershow;
			},
			tabFn(item, index) {
				this.tablist.forEach((tabbtn, tabindex) => {
					tabbtn.active = false;
				});
				item.active = true;
				this.transway = index;
				sessionStorage.setItem('booktrans', this.transway.toString());

				this.count = 1;
				this.busy = false;
				this.tableData = [];
				this.initFn(this.transway);
			},
			rowFn(row) {
				this.$router.push('/addbook/detail/' + row.id)
			},
			initFn(transway) {
				let params = {
					pageindex: this.count,
					pagesize: 10,
					query: JSON.stringify(this.query),
					custatt: transway,
				}
				addbooklistAPI(params).then(res => {
					this.tableData = this.tableData.concat(res.body.resultdata);
					this.totalpage = res.body.returnValue;
					if(res.body.resultdata.length==0||this.totalpage>=this.tableData.length){
						this.busy=true;	
//						console.log('busy 不加载');
					}else{
						this.busy=false;
//						console.log('busy 加载');
					}
				});

			},

			loadMore: function() {
				this.busy = true;
				//把busy置位true，这次请求结束前不再执行
				setTimeout(() => {
					this.count++;
					this.initFn(this.transway);
					console.log('count', this.count, this.totalpage, Math.ceil(this.totalpage / 10));
				}, 300);
			},
			downFn() {
				let params = {}
				addbookdownAPI(params).then(res => {
					this.grouplist = res.body.resultdata;
				})
			}
		},
		mounted() {
			this.downFn();
			this.sortInitFn("custnameSort");
			this.sortInitFn("countrySort");
			this.sortInitFn("serviceManSort");
			this.$nextTick(() => {
				if(sessionStorage.getItem('booktrans')) {
					this.transway = sessionStorage.getItem('booktrans');
					this.tablist.forEach((tabbtn) => {
						tabbtn.active = false;
					})
					this.tablist[this.transway].active = true;
				} else {
					this.transway = "0"
				}
				this.initFn(this.transway);
			})

		}
	}
</script>

<style>

</style>