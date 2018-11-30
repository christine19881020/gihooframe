<template>
	<section>
		<div class="typeWeightBOX" :id="'anchor'+boxIndex">
			<ul class="boxList">
				<li class="addboxitem">
					<el-collapse-transition>
						<section>
<!-- 							<template v-if="dataBox.Id&&!dataBox.editShow">
								已添加箱子 未编辑状态
								<div class="boxType clearfix">
									<div class="bighover" :class="dataBox.E_BOX_STATUS===0?'leftx':'leftxx'">
										<div class="oprateboxbig" v-if="dataBox.E_BOX_STATUS==0">
											<i class="fa fa-pencil" @click="dataBox.editShow=true"></i>
											<i class="fa fa-trash" @click="deleteboxFn"></i>
										</div>
									</div>
									<span class="text">{{dataBox.BOX_TYPE}}</span>
									<span class="text"><label>重量：</label>{{dataBox.WEIGHT}}KGS</span>
									<span class="text"><label>装箱时间：</label>{{dataBox.ENDDAY|momentHm}}</span>
									<span class="text ellipsis" :title="dataBox.ED_NOTES" v-if="dataBox.ED_NOTES"><label>注意事项：</label>{{dataBox.ED_NOTES}}</span>
									<button class="orangeBtn">{{dataBox.BOX_STATUS}}</button>
									<!--<button class="remarkSaveBtn" @click="">保存</button>-->
					<!-- 			</div>
							</template> -->
							<!-- <template v-if="dataBox.Id&&dataBox.editShow">-->
							<template>
								已添加箱子 编辑状态
								<el-row class="addBox">
									<el-col :span="2" class="dropUnit">
										<el-select size="small" v-model="dataBox.E_BOX_TYPE" @change="typechangeFn" placeholder="请选择">
											<el-option v-for="item in droplist" :key="item.ID" :label="item.NAME" :value="item.ID">
											</el-option>
										</el-select>
									</el-col>
									<el-col :span="1" class="Tcenter mrt5">
										<span>*</span>
									</el-col>
									<el-col :span="3">
										<el-input clearable type="text" placeholder="箱量" class="boxweight w90" v-model='dataBox.NUM'></el-input>
										<span class="warning" v-if="isNaN(dataBox.NUM)">请输入数字</span>
									</el-col>
									<el-col :span="3">
										<el-input clearable type="text" placeholder="单箱重量" class="boxweight w90" v-model='dataBox.WEIGHT'>
											<i class="kgs" slot="suffix">KGS</i>
										</el-input>
										<span class="warning" v-if="isNaN(dataBox.WEIGHT)">请输入数字</span>
									</el-col>
									<el-col :span="5">
										<datePicker :enddate='dataBox.ENDDAY' @getDateTime="getDateTimeFn"></datePicker>
									</el-col>
									<el-col :span="8">
										<div class="addremark">
											<label>备注：</label>
											<el-input clearable placeholder="添加备注" v-model="dataBox.ED_NOTES"></el-input>
										</div>
										<button type="button" class="remarkSaveBtn" :disabled="saveboxing" v-if="$route.name=='orderDetail'" @click="modifyboxFn">保存</button>
									</el-col>
								</el-row>
							</template>
							<!-- <el-row class="addBox" v-if="!dataBox.Id"> -->
								<!-- 新建箱子 -->
								<!-- <el-col class="dropUnit" :span="1">
									<el-select size="small" v-model="dataBox.E_BOX_TYPE" placeholder="请选择">
										<el-option v-for="item in droplist" :key="item.ID" :label="item.NAME" :value="item.ID">
										</el-option>
									</el-select>								
								</el-col>
								<el-col :span="1" class="Tcenter mrt5">
									<span>*</span>
								</el-col>
								<el-col :span="3">
									<el-input clearable type="text" placeholder="箱量" class="boxweight w90" v-model='dataBox.NUM'></el-input>
									<span class="warning" v-if="isNaN(dataBox.NUM)">请输入数字</span>
								</el-col>
								<el-col :span="3">
									<el-input clearable type="text" placeholder="单箱重量" class="boxweight w90" v-model='dataBox.WEIGHT'>
										<i class="kgs" slot="suffix">KGS</i>
									</el-input>
									<span class="warning" v-if="isNaN(dataBox.WEIGHT)">请输入数字</span>
								</el-col>

								<el-col :span="5">
									<datePicker :enddate='dataBox.ENDDAY' @getDateTime="getDateTimeFn"></datePicker>
								</el-col>
								<el-col :span="8">
									<div class="addremark">
										<label>备注：</label>
										<el-input clearable placeholder="添加备注" v-model="dataBox.ED_NOTES"></el-input>
									</div>
									<button type="button" class="remarkSaveBtn" :disabled="addboxing" v-if="$route.name=='orderDetail'" @click="addboxFn">保存</button>
								</el-col>
							</el-row> -->
							{{dataBox.AddressList}}
							<div class="item clearfix" v-for="(item,key) in dataBox.AddressList" :id="'anchor'+boxIndex+'-'+key">
								<button class="fl NObtn" type="primary">{{key+1}}</button>
								<!--<button class="modifyBtn" @click="chooseFn(key)">选择</button>-->
								<div class="oprateBox">
									<i class="fa fa-pencil" @click="chooseFn(key)"></i>
									<i class="fa fa-trash" @click="deleteAddressFn(key)" v-if="dataBox.AddressList.length!=1"></i>
								</div>
								<div class="fl">
									<el-row>
										<el-col>
											<template v-if="item.province&&item.city&&item.county&&item.town">
												{{item.province+item.city+item.county+item.town+item.address}}
											</template>
											<template v-else>地址</template>
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<template v-if="item.companyName">{{item.companyName}}</template>
											<template v-else>公司名称</template>
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<template v-if="item.contactName">{{item.contactName}}</template>
											<template v-else>联系人</template>
										</el-col>
									</el-row>
									<el-row>
										<el-col>
											<template v-if="item.contactMobile">{{item.contactMobile}}</template>
											<template v-else>联系号码</template>
										</el-col>
									</el-row>
								</div>
							</div>
						</section>
					</el-collapse-transition>
				</li>
				<button class="addboxBtn" @click="chooseFn(dataBox.AddressList.length)">添加该箱子的装箱地址</button>
				<el-row class="boxPic" v-if="dataBox.Id">
					<el-col :span="12">
						<template v-if="dataBox.IsBoxNoImg">
							<div class="pic">
								<img class="bigpic" :src="'http://www.jihuobao.net/jihuo/rest/img/BoxNo?tcBoxId='+dataBox.Id" />
								<img class="smallpic" :src="'http://www.jihuobao.net/jihuo/rest/img/BoxNo?tcBoxId='+dataBox.Id" />
							</div>
						</template>
						<template v-else>
							<div class="nopic">
								无箱号照片
							</div>
						</template>
						<div>
							<p>
								<template v-if="dataBox.BOX_NO">箱号：{{dataBox.BOX_NO}}</template>
								<template v-else>箱号未录入</template>
							</p>
							<p>
								<template v-if="dataBox.TxAddress">提箱地点：{{dataBox.TxAddress}}</template>
								<!--<template v-else>提现地点未录入</template>-->
							</p>
						</div>
					</el-col>
					<el-col :span="12">
						<template v-if="dataBox.IsSealNoImg">
							<div class="pic">
								<img class="bigpic" :src="'http://www.jihuobao.net/jihuo/rest/img/SEALNO?tcBoxId='+dataBox.Id" />
								<img class="smallpic" :src="'http://www.jihuobao.net/jihuo/rest/img/SEALNO?tcBoxId='+dataBox.Id" />
							</div>
						</template>
						<template v-else>
							<div class="nopic">
								无封号照片
							</div>
						</template>
						<div>
							<p>
								<template v-if="dataBox.SEAL_NO">封号：{{dataBox.SEAL_NO}}</template>
								<template v-else>封号未录入</template>
							</p>
							<p>
							</p>
						</div>
					</el-col>
				</el-row>
			</ul>
		</div>
	</section>
</template>

<script>
	import moment from 'moment'
	import { AmapData } from '@/components/AmapData'
	import { townlist, modifyboxApi, addboxApi } from '@/api/api'
	import datePicker from '@/components/commons/datePicker'
	import { boxtype, boxlist, droplist, dataBoxrules } from '@/components/searchLists'
	export default {
		props: ['dataBox', 'boxIndex'],
		components: {
			datePicker
		},
		data() {
			return {
				saveboxing: false,
				addboxing: false,
				AmapData: AmapData,
				boxtype: boxtype,
				boxInfo: this.dataBox,
				droplist: droplist,
				addbox: {
					E_BOX_TYPE: '',
					NUM: '',
					WEIGHT: '',
					ENDDAY: '',
					ED_NOTES: '',
					unit: '',
					addBoxShow: false,
					AddressList: [{
						contactId: "",
						companyName: "",
						contactName: "",
						contactMobile: "",
						province: "",
						city: "",
						county: '',
						town: "",
						townId: "",
						address: "",
						seqNo: 0,
					}]
				},
				dataBoxrules: dataBoxrules,
				unitShow: false,
				addboxshow: true,
				streetList: [],
			}
		},
		methods: {
			getDateTimeFn(daytime) {
				console.log("daytime", daytime)
				this.dataBox.ENDDAY = daytime;
			},
			typechangeFn(val) {
				//            console.log(val) 
				if(val) {
					this.droplist.forEach(item => {
						if(val == item.ID) {
							this.dataBox.BOX_TYPE = item.NAME;
						}
					})
				}
			},
			modifyFn(item) {
				this.$router.push('/ontime/addressSet');
			},
			saveFn(item) {
				item.addressAll = item.province + item.city + item.county + item.town;
			},
			chooseFn(sort) {
				this.$emit('setShowFn', this.boxIndex, sort);
			},
			deleteboxFn() {
				this.$confirm('此操作将删除该箱子, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$emit('deleteBox', this.boxIndex, this.dataBox.Id);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			deleteFn(index) {
				this.boxlist.splice(index, 1)
				let params = {}
				deleteAddressApi(params).then(res => {

				})
			},
			unitShowFn() {
				this.unitShow = true;
			},
			dropshowFn() {
				this.dropShow = !this.dropShow;
			},
			selectFn(selectedvalue) {
				this.addbox.E_BOX_TYPE = selectedvalue;
			},
			addAddressFn(item) {

			},
			//sendMessageToParent
			addboxFn() {
				let params = {}
				//				console.log("this.dataBox-zdy", this.dataBox);
				this.addboxing = true;
				//				判断未填写就保存
				if(this.dataBox.E_BOX_TYPE &&
					this.dataBox.WEIGHT &&
					this.dataBox.NUM &&
					this.dataBox.ENDDAY &&
					this.dataBox.AddressList[0].companyName
				) {
					addboxApi(this.dataBox, this.dataBox.bindorderid, this.dataBox.tidanhao).then(res => {
						if(res.type == 1) {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'success'
							});
							this.$emit('initFn');
							this.addboxing = false;
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error'
							});
						}
					})
				} else {
					this.$message({
						showClose: true,
						message: '数据不完整，请填充完毕后保存！',
						type: 'error'
					});
				}

			},

			modifyboxFn() {
				this.saveboxing = true;
				//this.$emit('listenToChildFn', this.boxlist);
				let params = this.dataBox;
				modifyboxApi(params, this.dataBox.Id).then(res => {
					if(res.type == 1) {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'success'
						});
						this.saveboxing = false;
						this.dataBox.editShow = false;
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				})
			},
			saveunitFn(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					console.log(valid)
					if(valid) {
						_this.dataBox.WEIGHT = _this.dataBox.WEIGHT;
						_this.dataBox.ENDDAY = moment(_this.dataBox.ENDDAY).format("YYYY-MM-DD HH:mm");
						_this.dataBox.unit = _this.dataBox.WEIGHT + "&" + moment(_this.dataBox.ENDDAY).format("YYYY-MM-DD HH:mm");
						_this.unitShow = false;
					} else {
						return false;
					}
				})

			},
			addressFn(item) {
				var arr = item.addressIDs;
				let params = {
					countyId: arr[arr.length - 1]
				}
				townlist(params).then(res => {
					this.streetList = res.body;
				})
			},
			deleteAddressFn(sort) {
				this.$confirm('此操作将删除该箱子地址, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$emit('delete', this.boxIndex, sort)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			getChoosedAddress() {
				this.addbox.AddressList = [];
				this.addbox.AddressList.push(JSON.parse(sessionStorage.getItem('msg')));
			},
			unitInitFn() {
				if(this.dataBox.ENDDAY) {
					this.dataBox.unit = this.dataBox.WEIGHT + "&" + moment(this.dataBox.ENDDAY).format("YYYY-MM-DD HH:mm");
				}
			},

		},
		watch: {

		},
		mounted() {
			document.onclick = () => {
				this.unitShow = false;
			}
			this.getChoosedAddress();
			this.unitInitFn();
			console.log(this.dataBox)
			//console.log('item', this.dataBox);

		}

	}
</script>

<style>

</style>