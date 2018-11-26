<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<div class="list">
					<div class="oprateSquare clearfix">
						<el-button round size="small" @click="filterFn" class="tabBtn" :class="{'active':filtershow}">筛选</el-button>
						<el-button round size="small" class="tabBtn" :class="{'active':item.active}" v-for="(item,index) in tablist" :key="index"
						 @click="tabFn(item,index)">{{item.name}}</el-button>
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
								<i class="fa fa-close" v-if="custname.length>0" @click="clearFn('custname')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="country" multiple filterable placeholder="国家" @change="searchFn('country',country)">
									<el-option v-for="(item,index) in grouplist.CountryOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="country.length>0" @click="clearFn('country')"></i>
							</div>
							<div class="selectlist">
								<el-select size="small" collapse-tags v-model="serviceMan" multiple filterable placeholder="维护人员" @change="searchFn('serviceMan',serviceMan)">
									<el-option v-for="(item,index) in grouplist.ServiceManOption" :key="index" :label="item.value" :value="item.value">
									</el-option>
								</el-select>
								<i class="fa fa-close" v-if="serviceMan.length>0" @click="clearFn('serviceMan')"></i>
							</div>
						</div>
					</transition>
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
			</div>
		</div>
	</section>
</template>

<script>
	import {
		addbooklistAPI,
		addbookdownAPI,
		ontimeList
	} from '@/api/api'
	export default {
		name: 'list',
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
				}
			}
		},
		methods: {
			searchFn(name, sortItem) {
				var itemParam = sortItem.toString();
				switch (name) {
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
				switch (name) {
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
				switch (nameStorage) {
					case 'custnameSort':
						if (nameStorageString) {
							this.custname = nameStorageString.split(',');
							this.query.custname = nameStorageString;
						} else {
							this.custname = [];
							this.query.custname = "";
						}
						break;
					case 'countrySort':
						if (nameStorageString) {
							this.country = nameStorageString.split(',');
							this.query.country = nameStorageString;
						} else {
							this.country = [];
							this.query.country = "";
						}
						break;
					case 'serviceManSort':
						if (nameStorageString) {
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
					item.active = false;
				});
				item.active = !item.active;
				this.transway = index;
				if (this.transway == 0) {
					this.transway = ";"
				}
				this.initFn(this.transway);
			},
			rowFn(row) {
				this.$router.push('/addbook/detail/' + row.id)
			},
			initFn(transway) {
				let params = {
					pageindex: 1,
					pagesize: 100,
					query: JSON.stringify(this.query),
					custatt: transway,
				}
				addbooklistAPI(params).then(res => {
					this.tableData = res.body.resultdata
				})
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
			this.initFn('');
		}
	}
</script>

<style>

</style>
