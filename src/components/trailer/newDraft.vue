<template>
	<section>
		<div class="simple-stack" v-show="!setShow">
			<div class="page">
				<div class="neworder">
					<h1>
					创建新的拖车订单
					<span class="fr">任何问题请致电：057487170728 李小姐</span>
				    </h1>
					<div class="namebox">
						<el-input class="greyInput" v-model="autotitle" v-if="namecheck" :disabled="namecheck" placeholder="输入一个便于查找和记忆的名称"></el-input>
						<el-input class="greyInput" v-model="ordertitle" v-else :disabled="namecheck" placeholder="输入一个便于查找和记忆的名称"></el-input>
						<div class="">
							<el-checkbox class="automake" v-model="namecheck" @change="automakeFn">自动生成，系统会自动生成一个订单名称</el-checkbox>
							<a class="set" @click="setFn">
								<template v-if="!nameshow">设置</template>
								<template v-else>收起</template>
							</a>
						</div>
						<transition name="el-zoom-in-top">
							<div class="namelist" v-if="nameshow">
								<el-checkbox v-for="(item,index) in orderlist" @change="cookieFn" :key="index" v-model="item.check">{{item.name}}</el-checkbox>
							</div>
						</transition>
						<div class="clearfix">
							<span class="fr adddesc" @click="descFn">
							<template v-if="!descshow">添加描述</template>
							<template v-else>收缩描述</template>														
						</span>
							<transition name="el-zoom-in-top">
								<el-input v-if="descshow" class="addtextarea" type="textarea" :rows="3" placeholder="简单描述订单" v-model="desc">
								</el-input>
							</transition>
						</div>
					</div>
					<button class="portBtn">宁波港出口</button>
					<div class="form">
						<el-input clearable class="greyInput" v-model="easyname" placeholder="输入客户简称"></el-input>
						<el-input clearable class="greyInput" v-model="aimport" placeholder="输入目的港"></el-input>
						<el-input clearable class="greyInput" v-model="orderno" placeholder="输入提单号"></el-input>
						<el-input clearable class="greyInput" v-model="ticketno" placeholder="出口发票号"></el-input>
					</div>
					<h2 class="clearfix"><span class="fl">箱型&箱量</span><button class="addBtn" @click="addboxFn">添加集装箱</button></h2>
					<!--@listenToChildFn="showMessageFromchild" @setShowFn="setShowFn"-->
					<boxtypeweight v-for="(item,index) in boxlist" :id="'box'+index" :key="index" :data-box="item" :box-index="index" @setShowFn="setShowFn" @delete="deleteFn"></boxtypeweight>
					<fileupload :orderid="orderguid"></fileupload>
					<ordershare v-if="false"></ordershare>
					<div class="newbtns">
						<button class="blueBtn" @click="sendFn(0)">发送订单</button>
						<!--新建页-->
						<button class="greyBtn" @click="sendFn(1)" v-if="!$route.params.id">保存为草稿</button>
						<!--草稿编辑页-->
						<button class="greyBtn" @click="saveDraftFn" v-if="$route.params.id">保存为草稿</button>
						<button class="cancelBtn">取消</button>
					</div>
				</div>
			</div>
		</div>
		<addressSet ref="addressset" ordertitle="创建新的拖车订单" v-show="setShow" @setShowHide="chooseAddressFn"></addressSet>
	</section>
</template>

<script>
	import Cookies from 'js-cookie'
	import boxtypeweight from '@/components/commons/boxtypeweight'
	import files from '@/components/commons/files'
	import fileupload from '@/components/commons/fileupload'
	import ordershare from '@/components/commons/ordershare'
	import addressSet from '@/components/reachOnTime/addressSet'
	import Bus from '@/components/bus'
	import { orderlist } from '@/components/searchLists'
	import { createid, addOrder } from '@/api/api'
	export default {
		name: '',
		components: {
			boxtypeweight,
			files,
			fileupload,
			ordershare,
			addressSet,
		},
		data() {
			return {
				setShow: false,
				choosedItem: {},
				ordertitle: '',
				namecheck: false,
				nameshow: false,
				orderlist: orderlist,
				desc: "",
				descshow: false,
				easyname: '',
				aimport: '',
				orderno: '',
				ticketno: '',
				orderguid: '',
				boxlist: [{
					E_BOX_TYPE: '',
					NUM: '',
					WEIGHT: '',
					ENDDAY: '',
					ED_NOTES: '',
					unit: '',
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
						seqNo: 0
					}]
				}],
				addaddress: '',
				addressSetIndex: 0,
				addressSetsort: 0
			}
		},
		methods: {
			setFn() {
				this.nameshow = !this.nameshow;
			},
			descFn() {
				this.descshow = !this.descshow;
			},
			automakeFn() {
				if(this.namecheck) {
					this.nameshow = true;
				}
				this.cookieFn();
			},
			deleteFn(boxIndex, sort) {
				this.boxlist[boxIndex].AddressList.splice(sort, 1);
			},
			sendFn(isdraft) {
				if(this.namecheck) {
					//勾选自动生成
					if(!this.easyname && !this.aimport && !this.orderno && !this.ticketno) {
						this.$message({
							showClose: true,
							message: '客户简称，目的港，提单号，出口发票必输其一',
							type: 'warning'
						});
						return false;
					} else {
						this.ordertitle = this.autotitle;
					}
				}
				this.addOrderFn(isdraft);
			},
			saveDraftFn(){
				
			},
			showMessageFromchild(data) {
				this.boxlist = data
			},
			addboxFn() {
				//判断最后一个箱封未填数据
				if(this.boxlist[this.boxlist.length - 1].E_BOX_TYPE &&
					this.boxlist[this.boxlist.length - 1].NUM &&
					this.boxlist[this.boxlist.length - 1].WEIGHT &&
					this.boxlist[this.boxlist.length - 1].ENDDAY &&
					this.boxlist[this.boxlist.length - 1].AddressList[0].companyName &&
					this.boxlist[this.boxlist.length - 1].AddressList[0].contactName &&
					this.boxlist[this.boxlist.length - 1].AddressList[0].contactMobile
				) {
					this.boxlist.push({
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
					})
					setTimeout(() => {
						var bottomID = 'box' + (this.boxlist.length - 1)
						document.getElementById(bottomID).scrollIntoView();
					}, 300)

				} else {
					this.$message({
						showClose: true,
						message: '新增箱型箱量未填充完整！',
						type: 'warning'
					});
				}
			},
			addOrderFn(isdraft) {
				let params = {
					orderguid: this.orderguid,
					title: this.ordertitle,
					remark: this.desc,
					port: this.aimport,
					khname: this.easyname,
					tidanhao: this.orderno,
					fapiaohao: this.ticketno,
					TcBoxInfo: this.boxlist,
					isdraft: isdraft,
				}
				addOrder(params).then(res => {
					if(res.type == 1) {

						this.$message({
							showClose: true,
							message: res.message,
							type: 'success'
						});
						this.$router.push('/ontime/list');
					} else {

						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}

				})
			},
			creatIdFn() {
				let params = {}
				createid(params).then(res => {
					this.orderguid = res.resultdata;
					sessionStorage.setItem('orderid', res.resultdata);
				});
				this.boxlist = [];
				var addbox = {
					E_BOX_TYPE: '',
					NUM: '',
					WEIGHT: '',
					ENDDAY: '',
					ED_NOTES: '',
					unit: "",
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
						seqNo: 0
					}]
				};
				this.boxlist.push(addbox);
			},
			setShowFn(index, sort) {
				console.log("收到子级打开地址管理", index, sort)
				this.addressSetIndex = index;
				this.addressSetsort = sort;
				this.setShow = true;
				window.scrollTo(0,0);
			},
			chooseAddressFn(data) {
				this.setShow = false;
				this.addAddress = JSON.parse(data);
				var boxinfo = this.boxlist[this.addressSetIndex];
				console.log("地址选择完毕", this.addressSetIndex, this.addressSetsort, boxinfo.AddressList.length)
				if(boxinfo.AddressList.length - 1 < this.addressSetsort) {
					boxinfo.AddressList.push(this.addAddress);
				} else {
					this.$set(boxinfo.AddressList, this.addressSetsort, this.addAddress)
				}

				this.$set(this.boxlist, this.addressSetIndex, boxinfo)
				//this.$set(this.boxlist,this.addressSetIndex,this.$set(this.boxlist[this.addressSetIndex],this.addressSetsort,this.addAddress ));
			},
			cookieFn() {
				Cookies.set("namecheck", this.namecheck);
				Cookies.set("orderlist", JSON.stringify(this.orderlist));
			},
			getCookiesFn() {
				if(Cookies.get('namecheck')) {
					this.namecheck = Boolean(Cookies.get('namecheck'));
					this.orderlist = JSON.parse(Cookies.get('orderlist'));
				}
			}
		},
		watch: {

		},
		computed: {
			autotitle: function() {
				var val = ""
				if(this.easyname && this.orderlist[0].check) {
					val = this.easyname;
				}
				if(this.aimport && this.orderlist[1].check) {
					if(this.easyname && this.orderlist[0].check) {
						val += "+" + this.aimport;
					} else {
						val += this.aimport;
					}
				}
				if(this.orderno && this.orderlist[2].check) {
					if(this.aimport && this.orderlist[1].check) {
						val += "+" + this.orderno;
					} else {
						val += this.orderno;
					}
				}
				if(this.ticketno && this.orderlist[3].check) {
					if(this.orderno && this.orderlist[2].check) {
						val += "+" + this.ticketno
					} else {
						val += this.ticketno
					}

				}
				return val;
			}
		},
		mounted() {
			this.creatIdFn();
			this.getCookiesFn();
		}
	}
</script>

<style lang="scss" scoped>
	.newbtns {
		button {
			margin-right: 25px;
		}
	}
</style>