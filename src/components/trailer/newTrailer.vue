<template>
	<section>
		<!--<newhelp v-if="helpshow" @helpshowFn="colseHelpFn($event)"></newhelp>-->
		<div class="simple-stack" v-show="!setShowNew">
			<div class="page">
				<div class="neworder" v-show="!setShowNew">
					<h1>创建新的拖车订单
					    <span class="fr">任何问题请致电：057487170728 李小姐</span>
				    </h1>
					<div class="namebox">
						<el-input class="greyInput" v-model="autotitle" v-if="namecheck" :disabled="namecheck" placeholder="输入一个便于查找和记忆的名称"></el-input>
						<el-input class="greyInput" clearable v-model="ordertitle" v-else :disabled="namecheck" placeholder="输入一个便于查找和记忆的名称"></el-input>
						<div class="">
							<el-checkbox class="automake" v-model="namecheck" @change="automakeFn">自动生成，系统会自动生成一个订单名称</el-checkbox>
							<a class="set" @click="setFn">
								<template v-if="!nameshow">设置</template>
								<template v-else>收起</template>
							</a>
							<span class="fr adddesc" @click="descFn">
								<template v-if="!descshow">添加描述</template>
								<template v-else>收缩描述</template>														
						     </span>
						</div>
						<transition name="el-zoom-in-top">
							<div class="namelist clearfix" v-show="nameshow">
								<el-checkbox v-for="(item,index) in orderlist" @change="cookieFn" :key="index" v-model="item.check">{{item.name}}</el-checkbox>
							</div>
						</transition>
						<div class="clearfix">
							<transition name="el-zoom-in-top">
								<el-input v-show="descshow" class="addtextarea" type="textarea" :rows="3" placeholder="简单描述订单" v-model="desc">
								</el-input>
							</transition>
						</div>
					</div>
					<!--<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>-->
					<button class="portBtn">宁波港出口</button>
					<div class="form">
						<el-input clearable disabled class="greyInput" v-model="easyname" placeholder="输入客户简称"></el-input>
						<el-input clearable disabled class="greyInput" v-model="aimport" placeholder="输入目的港"></el-input>
						<el-input clearable class="greyInput" v-model="orderno" placeholder="输入提单号"></el-input>
						<el-input clearable disabled class="greyInput" v-model="ticketno" placeholder="出口发票号"></el-input>
					</div>
					<h2 class="clearfix">
						<span class="fl">箱型&箱量</span>
						<button class="addBtn" @click="addboxFn">添加集装箱</button>
					</h2>
					<!--@listenToChildFn="showMessageFromchild" @setShowFn="setShowFn"-->
					<boxtypeweight v-for="(item,index) in boxlist" :id="'box'+index" :key="index" :data-box="item" :box-index="index" @setShowFn="setShowFn" @delete="deleteFn"></boxtypeweight>
					<fileupload v-if="!$route.params.id" :orderid="orderguid"></fileupload>
					<fileupload v-if="$route.params.id" :orderid="$route.params.id"></fileupload>
					<ordershare v-if="false"></ordershare>
					<div class="newbtns">
						<!--新建页-->
						<button type="button" class="blueBtn" :disabled="ordersending" @click="sendFn(0)" v-if="!$route.params.id">发送订单</button>
						<button type="button" class="greyBtn" :disabled="draftsending" @click="sendFn(1)" v-if="!$route.params.id">保存为草稿</button>
						<!--草稿编辑页-->
						<button type="button" class="blueBtn" :disabled="ordersending" @click="saveDraftFn(0)" v-if="$route.params.id">发送订单</button>
						<button type="button" class="greyBtn" :disabled="draftsending" @click="saveDraftFn(1)" v-if="$route.params.id">保存为草稿</button>
						<button type="button" class="cancelBtn" @click="$router.push('/ontime/list')">取消</button>
					</div>
				</div>
			</div>
		</div>
		<addressSet ref="addressset" ordertitle="创建新的拖车订单" v-show="setShowNew" @setShowHide="chooseAddressFn"></addressSet>
	</section>
</template>

<script>
	import Cookies from 'js-cookie'
	import boxtypeweight from '@/components/commons/boxtypeweight'
	import files from '@/components/commons/files'
	import fileupload from '@/components/commons/fileupload'
	import ordershare from '@/components/commons/ordershare'
	import addressSet from '@/components/trailer/addressSet'
	import {
		createid,
		newidApi,
		addOrder,
		orderDetailApi,
		ModifyDraftApi,
		firstApi,
		detailApi,
	} from '@/api/api'
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
				helpshow: Boolean,
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				ordersending: false,
				draftsending: false,
				setShowNew: false,
				choosedItem: {},
				ordertitle: '',
				namecheck: true,
				nameshow: false,
				orderlist: [{
					name: '客户简称',
					check: true
				}, {
					name: '目的港',
					check: true
				}, {
					name: '提单号',
					check: true
				}, {
					name: '发票号',
					check: true
				}],
				desc: "",
				descshow: false,
				easyname: '',
				aimport: '',
				orderno: '',
				ticketno: '',
				orderguid: '',
				orderlistlcoal: [{
					name: '客户简称',
					check: true
				}, {
					name: '目的港',
					check: true
				}, {
					name: '提单号',
					check: true
				}, {
					name: '发票号',
					check: true
				}],
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
				addressSetsort: 0,
				cookieAddress: {
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
				},
			}
		},
		methods: {
			colseHelpFn($event) {
				//console.log($event);
				this.helpshow = $event;
			},
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
				if(isdraft == 0) {
					this.ordersending = true;
				} else {
					this.draftsending = true;
				}
				this.addOrderFn(isdraft);
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
					setTimeout(() => {
						var bottomID = 'box' + (this.boxlist.length - 1)
						document.getElementById(bottomID).scrollIntoView();
					}, 300)
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
						if(isdraft == 0) {
							this.ordersending = false;
						} else {
							this.draftsending = false;
						}

						this.cookieFn();
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
				if(!this.$route.params.id) {
					//纯新建 非草稿编辑页
					let params = {}
					newidApi(params).then(res => {
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
				}
			},
			setShowFn(index, sort) {
				console.log("收到子级打开地址管理", index, sort)
				this.addressSetIndex = index;
				this.addressSetsort = sort;
				this.setShowNew = true;
				window.scrollTo(0, 0);
			},
			chooseAddressFn(data) {
				this.setShowNew = false;
				this.addAddress = JSON.parse(data);
				var boxinfo = this.boxlist[this.addressSetIndex];
				console.log("地址选择完毕", this.addressSetIndex, this.addressSetsort, boxinfo.AddressList.length)
				if(boxinfo.AddressList.length - 1 < this.addressSetsort) {
					boxinfo.AddressList.push(this.addAddress);
				} else {
					this.$set(boxinfo.AddressList, this.addressSetsort, this.addAddress)
				}

				this.$set(this.boxlist, this.addressSetIndex, boxinfo);

				var scrollTop = sessionStorage.getItem('scrollTopNew');
				window.scrollTo(0, scrollTop);
				//this.$set(this.boxlist,this.addressSetIndex,this.$set(this.boxlist[this.addressSetIndex],this.addressSetsort,this.addAddress ));
			},
			cookieFn() {
				Cookies.set("namecheck", this.namecheck);
				Cookies.set("orderlist", JSON.stringify(this.orderlist));
			},
			getCookiesFn() {
				if(Cookies.get('namecheck')) {
					this.namecheck = Cookies.get('namecheck') == 'true' ? true : false;
					console.log(this.namecheck)
					this.nameshow = this.namecheck;
					this.orderlist = JSON.parse(Cookies.get('orderlist'));
				};
				if(Cookies.get('lastAddress') && !this.$route.params.id) {
					//判断缓存地址存在，并且是首次新建不是草稿修改
					this.cookieAddress = JSON.parse(Cookies.get('lastAddress'));
					//console.log("last",this.cookieAddress);
					//最后一次选择地址填充
					this.boxlist[0].AddressList[0] = this.cookieAddress;
				}
			},
			draftInitFn() {
				if(this.$route.params.id) {
					let params = {}
					orderDetailApi(params, this.$route.params.id).then(res => {
						this.detailBasic = res.resultdata;
						if(this.$route.name == "neworder") {

							this.orderguid = this.$route.params.id;

							this.desc = res.resultdata.remark;
							this.easyname = res.resultdata.khname;
							this.aimport = res.resultdata.port;
							this.orderno = res.resultdata.tidanhao;
							this.ticketno = res.resultdata.fapiaohao;
							this.namecheck = res.resultdata.namecheck;
							if(res.resultdata.orderlist) {
								this.orderlist = JSON.parse(res.resultdata.orderlist);
							} else {
								this.orderlist = this.orderlistlcoal;
							}
							this.ordertitle = res.resultdata.title;
							this.boxlist = [];
							//this.boxlist = res.resultdata.TcBoxInfo;
							if(res.resultdata.TcBoxInfo.length > 0) {
								res.resultdata.TcBoxInfo.forEach(item => {
									var boxinfo = {
										Id: item.Id,
										E_BOX_TYPE: item.E_BOX_TYPE,
										NUM: item.NUM,
										WEIGHT: item.WEIGHT,
										ENDDAY: item.ENDDAY,
										ED_NOTES: item.ED_NOTES,
										AddressList: item.AddressList,
										BOX_STATUS: item.BOX_STATUS,
										unit: item.WEIGHT + "&" + item.ENDDAY,
										BOX_TYPE: item.BOX_TYPE
									};
									this.boxlist.push(boxinfo);

								})
							} else {
								this.boxlist = [{
									Id: '',
									E_BOX_TYPE: '',
									NUM: '',
									WEIGHT: '',
									ENDDAY: '',
									ED_NOTES: '',
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
									}],
									BOX_STATUS: '',
									unit: '',
									BOX_TYPE: ''
								}]
							}

						}
						sessionStorage.setItem('ordertitle', res.resultdata.title);
					})
					sessionStorage.setItem('orderid', this.$route.params.id);
				}
			},

			saveDraftFn(isdraft) {
				if(isdraft == 0) {
					this.ordersending = true;
				} else {
					this.draftsending = true;
				}
				let params = {
					orderguid: this.$route.params.id,
					title: this.autotitle ? this.autotitle : this.ordertitle,
					remark: this.desc,
					port: this.aimport,
					khname: this.easyname,
					tidanhao: this.orderno,
					fapiaohao: this.ticketno,
					TcBoxInfo: this.boxlist,
					isdraft: isdraft,
					namecheck: this.namecheck,
					orderlist: JSON.stringify(this.orderlist),
				}
				ModifyDraftApi(params, this.orderguid).then(res => {
					if(res.type == 1) {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'success'
						});
						if(isdraft == 0) {
							this.ordersending = false;
						} else {
							this.draftsending = false;
						}
						this.cookieFn();
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
			scrollFn() {
				var _this = this;
				console.log('_this.setShowNew', _this.setShowNew)

				console.log("this.$route.name", this.$route.name)
				if(this.$route.name == "neworder") {
					window.addEventListener("scroll", function() { //监听滚动条
						var top = document.body.scrollTop || document.documentElement.scrollTop; //document.body是获取的body滚动高度，document.documentElement是根节点html的     
						if(top != 0 && !_this.setShowNew) {
							sessionStorage.setItem('scrollTopNew', top);
						}
					})
				} else {
					window.removeEventListener("scroll");
				}

			},
			helpInitFn() {
				//				var user = JSON.parse(sessionStorage.getItem('user'));
				//				if(!user.BootPage){
				//					 this.helpshow=true;
				//				}else{
				//					var ifhelp=user.BootPage.split("");
				//					console.log('ifhelp',ifhelp)
				//					if(ifhelp[3]=='0'){
				//						//新注册 未读
				//						this.helpshow=true;
				//					}else{
				//						this.helpshow=false;
				//					}
				//				}												

			},			
			getinfoFn() {
				let params = {
					orderId: this.$route.params.cid,
				}
				detailApi(params).then(res => {
					var detail = res.body.resultdata;
					this.easyname =detail.custname;
					this.aimport=detail.destport;
					this.ticketno=detail.billno;
					this.boxlist=JSON.parse(detail.boxtypejson);
					this.boxlist.forEach(item => {
					item.AddressList = [{
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
				})
			}
		},

		computed: {
			autotitle: function() {
				var val = ""
				if(this.namecheck && this.easyname && this.orderlist[0].check) {
					val = this.easyname;
				}
				if(this.namecheck && this.aimport && this.orderlist[1].check) {
					val += "+" + this.aimport;
				}
				if(this.namecheck && this.orderno && this.orderlist[2].check) {
					val += "+" + this.orderno;
				}
				if(this.namecheck && this.ticketno && this.orderlist[3].check) {
					val += "+" + this.ticketno
				}
				var combine = val;
				if(combine.substr(0, 1) == "+") {
					combine = combine.substring(1, combine.length);
				} else {
					combine = val
				}
				return combine;
			}
		},
		mounted() {
			this.creatIdFn();
			//this.getCookiesFn();
			this.draftInitFn();
			//this.scrollFn();
			this.helpInitFn();
			this.orderguid = sessionStorage.getItem('orderid');
			this.getinfoFn();
		}
	}
</script>

<style lang="scss" scoped>
	.newbtns {
		button {
			margin-right: 25px;
		}
		button.disabled {
			cursor: not-allowed;
		}
	}
	
	.neworder {
		h2 {
			font-size: 20px;
		}
	}
</style>