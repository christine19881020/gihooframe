<template>
	<div class="simple-stack">
		<div class="page page-behind" @click="setShowFn">
			<a href="javascript:;">
				{{ordertitle}}
			</a>
		</div>
		<div class="page page-1">
			<div>
			<h1>地址管理</h1>
			<ul class="addressManage">
				<li class="mapli" v-for="(item,index) in addresslist" :id="'address'+index">
					<div class="addressBox">
						<template v-if="!item.editshow">
							<div class="oprate">
								<i class="iconfont icon-dui" @click.stop="chooseFn(item)"></i>
								<i class="iconfont icon-bianji1" @click.stop="editFn(item)"></i>
								<i class="iconfont icon-shanchu" @click.stop="deleteAddressFn(item)"></i>
							</div>
							<ul class="no-editbox">
								<li>
									{{item.province}}{{item.city}}{{item.county}}{{item.town}}{{item.address}}
								</li>
								<li>
									{{item.companyName}}
								</li>
								<li>
									{{item.contactName}}
								</li>
								<li>
									{{item.contactMobile}}
								</li>
							</ul>
						</template>
						<template v-else>
							<div class="editbox">
								<div class="oprate">
									<i class="iconfont icon-dui" @click.stop="saveFn(item)"></i>
									<!--<i class="fa fa-mail-reply" @click.stop="saveFn(item)"></i>-->
								</div>
								<div class="inputbox">
									<el-row class="boxInput">
										<el-col :span="15">
											<el-cascader class="border0" filterable size="mini" :options="AmapData" @change="changePlaceFn(item)" v-model="item.addressIDs" placeholder="请输入所在省、市或县名"></el-cascader>
										</el-col>
										<el-col :span="9">
											<el-select v-model="item.town" class="border0" @focus="addressFn(item)" size="mini" placeholder="请选择乡镇街道">
												<el-option v-for="(item,index) in streetList" :key="index" :label="item.NAME" :value="item.NAME">
												</el-option>
											</el-select>
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<input type="text" class="boxInput" placeholder="请输入详细地址" v-model="item.address" />
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<input type="text" class="boxInput" placeholder="请输入公司名称" v-model="item.companyName" />
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<input type="text" class="boxInput" placeholder="请输入联系人" v-model="item.contactName" />
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<input type="text" class="boxInput" placeholder="请输入联系电话" v-model="item.contactMobile" />
										</el-col>
									</el-row>
								</div>
							</div>
						</template>
					</div>
					<transition name="el-fade-in-linear">
						<mapsmall v-if="item.editshow&&false" class="mapsmall" :vid="'address'+index"></mapsmall>
					</transition>
					<div class="clear"></div>
				</li>
				<li id="newbox" v-if="newAddressShow">
					<div class="addressBox">
						<div class="editbox">
							<div class="oprate">
								<i class="iconfont icon-dui" @click.stop="addAddressFn"></i>
								<i class="iconfont icon-guanbi" @click.stop="cancelFn"></i>
							</div>
							<div class="inputbox">
								<el-row class="boxInput">
									<el-col :span="15">
										<el-cascader class="border0" filterable size="mini" :options="AmapData" :props="props" @change="addAddress.town=''" v-model="addAddress.addressIDs" placeholder="请输入所在省、市或县名"></el-cascader>
									</el-col>
									<el-col :span="9">
										<el-select v-model="addAddress.town" class="border0" @focus="addressFn(addAddress)" size="mini" placeholder="请选择乡镇街道">
											<el-option v-for="(item,index) in streetList" :key="index" :label="item.NAME" :value="item.NAME">
											</el-option>
										</el-select>
									</el-col>
								</el-row>
								<el-row>
									<el-col>
										<input type="text" class="boxInput" placeholder="请输入详细地址" v-model="addAddress.address" />
									</el-col>
								</el-row>
								<el-row>
									<el-col>
										<input type="text" class="boxInput" placeholder="请输入公司名称" v-model="addAddress.companyName" />
									</el-col>
								</el-row>
								<el-row>
									<el-col>
										<input type="text" class="boxInput" placeholder="请输入联系人" v-model="addAddress.contactName" />
									</el-col>
								</el-row>
								<el-row>
									<el-col>
										<input type="text" class="boxInput" placeholder="请输入联系电话" v-model="addAddress.contactMobile" />
									</el-col>
								</el-row>
							</div>
						</div>
					</div>
					<mapsmall vid="addressnew" v-if="false"></mapsmall>
				</li>
			</ul>
			<div class="clear"></div>
			<button class="cyan-a" @click="newAddressShowFn">添加地址</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import Vue from 'vue'
	import { AmapData } from '@/components/AmapData'
	import mapsmall from '@/components/trailer/mapsmall'
	import { addresslist, addAddress } from '@/components/searchLists'
	import Bus from '@/components/bus'
	import { addAddressApi, getAddressApi, modifyAddressApi, deleteAddressApi, townlist } from '@/api/api'
	export default {
		components: {
			mapsmall
		},
		props: ['ordertitle', 'setShow'],
		data() {
			return {
				AmapData: AmapData,
				addressnew: 'addressnew',
				addresslist: [],
				addAddress: {},
				newAddressShow: false,
				streetList: []
			}
		},
		methods: {
			changePlaceFn(item) {
				item.town = "";
				item.province = item.addressIDs[0];
				item.city = item.addressIDs[1];
				item.county = item.addressIDs[2];
			},
			cancelFn() {
				this.newAddressShow = false;
			},
			setShowFn() {
				this.$emit('setShowHide')
			},
			saveFn(item) {
				this.modifyAddressFn(item);
			},
			deleteFn(index) {
				this.addresslist.splice(index, 1);
			},
			editFn(item) {
				item.editshow = !item.editshow;
			},
			chooseFn(item) {
				sessionStorage.setItem('msg', JSON.stringify(item));
				this.$emit('setShowHide', JSON.stringify(item));
			},
			newAddressShowFn() {
				this.newAddressShow = true;
				this.addAddress = {
					addressIDs: [],
					town: '',
					address: '',
					companyName: '',
					contactName: '',
					contactMobile: ''
				};
				//				console.log("xxx",this.$route)
				//				if(Cookies.get("lastAddress")&&this.$route.name=="orderDetail"){
				//					this.addAddress=JSON.parse(Cookies.get("lastAddress"));
				//					this.addAddress.addressIDs=[this.addAddress.province,this.addAddress.city,this.addAddress.county];
				//				}

			},
			addressFn(item) {
				let params = {
					ProvinceName: item.addressIDs[0],
					CityName: item.addressIDs[1],
					CountyName: item.addressIDs[2]
				}
				townlist(params).then(res => {
					this.streetList = res.body;
				})
			},
			addAddressFn() {
				if(this.addAddress.addressIDs.length != 3 || !this.addAddress.town || !this.addAddress.address || !this.addAddress.companyName || !this.addAddress.contactName || !this.addAddress.contactMobile) {
					this.$message({
						showClose: true,
						message: '地址，公司，联系人，电话均为必填！',
						type: 'warning'
					});
				} else {
					let params = {
						orderid: this.orderid,
						province: this.addAddress.addressIDs[0],
						city: this.addAddress.addressIDs[1],
						county: this.addAddress.addressIDs[2],
						town: this.addAddress.town,
						address: this.addAddress.address,
						companyName: this.addAddress.companyName,
						contactName: this.addAddress.contactName,
						contactMobile: this.addAddress.contactMobile
					}
					addAddressApi(params).then(res => {
						if(res.type == 1) {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'success'
							});

							this.getAddressListFn();
							this.newAddressShow = false;
							//TODO编辑添加 返回参数
							//最后一次添加地址存COOKIE
							//							Cookies.set('lastAddress', JSON.stringify(res.resultdata));
							console.log("lastAddress", res.resultdata);
							this.$emit('setShowHide', JSON.stringify(res.resultdata));

						} else {
							this.$message({
								showClose: true,
								message: res.meassage,
								type: 'error'
							})
						}
					})
				}

			},
			getAddressListFn() {
				let params = {

				}
				getAddressApi(params).then(res => {
					this.addresslist = [];
					res.resultdata.resultdata.forEach(item => {
						item.editshow = false;
						item.addressIDs = [item.province, item.city, item.county];
						this.addresslist.push(item);
					});
					console.log(this.addresslist)
				})
			},
			modifyAddressFn(item) {
				console.log(item)
				if(item.addressIDs.length != 3 || !item.town || !item.address || !item.companyName || !item.contactName || !item.contactMobile) {
					this.$message({
						showClose: true,
						message: '地址，公司，联系人，电话均为必填！',
						type: 'warning'
					});
				} else {
					let params = {
						orderid: this.orderid,
						province: item.province,
						city: item.city,
						county: item.county,
						town: item.town,
						address: item.address,
						companyName: item.companyName,
						contactName: item.contactName,
						contactMobile: item.contactMobile
					};
					modifyAddressApi(params, item.id).then(res => {
						if(res.type == 1) {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'success'
							});
							item.editshow = false;
							this.$emit('setShowHide', JSON.stringify(item));
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error'
							});
						}

					})
				}
			},
			deleteAddressFn(item) {
				let params = {

				}
				deleteAddressApi(params, item.id).then(res => {
					if(res.type == 1) {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'success'
						});

						this.getAddressListFn();
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				})
			}
		},
		mounted() {
			this.orderid = sessionStorage.getItem('orderid');
			this.getAddressListFn();
		}
	}
</script>

<style lang="scss" scoped>
	.addressBox {}
</style>