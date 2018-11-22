<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
			<a> 返回海运列表</a>
		</div>
		<div class="page page-1">
			<div class="neworder pform">
				<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
					<h1 class="font30">创建订单</h1>
					<div class="block">
						<h1><span class="red">*</span>选择运输方式</h1>
						<el-form-item prop="transway" style="margin-left:-80px;">
							<el-radio-group v-model="ruleForm.transway" @change="transwayFn(ruleForm.transway)">
								<el-radio label="1">海运</el-radio>
								<el-radio label="2">空运</el-radio>
								<el-radio label="3">铁路</el-radio>
								<el-radio label="4">快递</el-radio>
								<el-radio label="5">拖车</el-radio>
							</el-radio-group>
						</el-form-item>
					</div>
					<div class="block">
						<h1>基本信息</h1>
						<el-form-item prop="billno" label="出口发票号">
							<el-input clearable class="greyInput" v-model="ruleForm.billno" placeholder="请输入出口发票号"></el-input>
						</el-form-item>
						<el-form-item prop="custname" label="客户名称">
							<el-input clearable class="greyInput" v-model="ruleForm.custname" placeholder="请输入客户名称"></el-input>
						</el-form-item>
						<el-form-item prop="saleman" label="业务员">
							<el-input clearable class="greyInput" v-model="ruleForm.saleman" placeholder="请输入业务员"></el-input>
						</el-form-item>
						<el-form-item prop="contactno" label="合同号">
							<el-input clearable class="greyInput" v-model="ruleForm.contactno" placeholder="请输入合同号"></el-input>
						</el-form-item>
						<el-form-item prop="tradetype" label="贸易方式">
							<el-select class="greyInput" v-model="ruleForm.tradetype" filterable placeholder="请输入贸易方式">
								<el-option v-for="item in down.TradeTypeOption" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="settletype" label="结汇方式">
							<el-select class="greyInput" v-model="ruleForm.settletype" filterable placeholder="请输入结汇方式">
								<el-option v-for="item in down.SettleTypeOption" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input clearable class="greyInput" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
						</el-form-item>
					</div>

					<div class="block">
						<h1>
						海运订舱
					  <el-dropdown class="ml20" size="mini" split-button>
						  添加产品
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item>下载模板</el-dropdown-item>
						    <el-dropdown-item>一键导入</el-dropdown-item>
						    <el-dropdown-item>上传文件</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4">
									<el-input class="tbinput" v-model="trafficagent" placeholder="请输入货运代理"></el-input>
									<!--<el-select class="tbselect" v-model="trafficagent" filterable placeholder="请选择货运代理">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>-->
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg bdt0">发货人</td>
								<td rowspan="4" width="350px" class="greybg bdt0">
									<el-input class="tbinput" v-model="consigner" placeholder="请输入发货人"></el-input>
								</td>
								<td width="93px" class="title greybg" colspan="2">出口发票号</td>
								<td width="339px" class="greybg">
									<el-input v-model="ruleForm.billno" disabled class="tbinput" placeholder="基本信息自动带出"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">合同号</td>
								<td>
									<el-input class="tbinput" v-model="ruleForm.contactno" disabled placeholder="基本信息自动带出"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">结汇方式</td>
								<td class="greybg">
									<el-input class="tbinput" v-model="ruleForm.settletype" disabled placeholder="基本信息自动带出"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">贸易方式</td>
								<td>
									<el-input class="tbinput" v-model="ruleForm.tradetype" disabled placeholder="基本信息自动带出"></el-input>
								</td>
							</tr>
							</td>
							</tr>
							<tr>
								<td width="92px" rowspan="4" class="title greybg">收货人</td>
								<td rowspan="4" width="350px" class="greybg">
									<el-input class="tbinput" v-model="reciver" placeholder="请输入收货人"></el-input>
								</td>
								<td class="title greybg" colspan="2">箱型*箱量</td>
								<td class="greybg">
									<el-popover placement="bottom-start" width="220" trigger="click" @hide="datacomFn">
										<ul class="choosebox">
											<li v-for="item in droplistx" :key="item.ID">
												<span class="name">{{item.E_BOX_TYPE}}</span>
												<span><el-input-number size="mini" :min="0" v-model="item.NUM"></el-input-number></span>
											</li>
										</ul>
										<el-input disabled class="tbinput" v-model="boxtype" :title="boxtype" slot="reference" placeholder="请选择箱型*箱量"></el-input>
									</el-popover>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">船务公司</td>
								<td>
									<el-input class="tbinput" v-model="shipcompany" disaled placeholder="请输入船务公司"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">货好时间</td>
								<td class="greybg">
									<el-date-picker class="tbdate" v-model="throughtime" type="date" placeholder="请选择货好时间">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title" rowspan="2">船期</td>
								<td class="title">截关</td>
								<td>
									<el-date-picker class="tbdate" v-model="closetime" type="date" placeholder="请选择截关">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg">通知人</td>
								<td width="350px" class="greybg">
									<el-input class="tbinput" v-model="notifier" placeholder="请输入通知人"></el-input>
								</td>
								<td class="title">开船</td>
								<td>
									<el-date-picker class="tbdate" v-model="shiptime" type="date" placeholder="请选择开船">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title">起运港</td>
								<td>
									<!--<el-select class="tbselect" v-model="startport" filterable placeholder="请选择起运港">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>-->
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="startport" :fetch-suggestions="querySearch" placeholder="请选择起运港" :trigger-on-focus="true" @select="handleSelectStart">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>
								<td class="title greybg" rowspan="2">运费</td>
								<td class="title greybg">RMB</td>
								<td class="greybg relative">
									<el-input class="tbinput" v-model="freightrmb" placeholder="请输入RMB"></el-input>
									<span v-if="numRequiredFn(freightrmb)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">目的港</td>
								<td class="greybg">
									<!--<el-select class="tbselect" clearable autocomplete v-model="destport" @blur="portFn" placeholder="请选择目的港">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>-->
									<!--<el-input class="tbinput" v-model="destport" placeholder="请选择目的港"></el-input>-->
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="destport" :fetch-suggestions="querySearch" placeholder="请选择目的港" :trigger-on-focus="true" @select="handleSelect">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>
								<td class="title greybg">USD</td>
								<!--<td class="greybg">
									<el-input class="tbinput" v-model="freightusd" placeholder="请输入USD"></el-input>
								</td>-->
								<td class="greybg relative">
									<el-input class="tbinput" v-model="freightusd" placeholder="请输入USD"></el-input>
									<span v-if="numRequiredFn(freightusd)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td>
									<el-select class="tbselect" v-model="transititem" filterable placeholder="请选择运输条款">
										<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>
								<td class="title bdt0" colspan="2" rowspan="2">备注</td>
								<td class="bdt0" rowspan="2">
									<el-input class="tbinput" v-model="remark2" placeholder="请输入备注"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title greybg">运费条款</td>
								<td class="greybg bdr1">
									<el-select class="tbselect" v-model="freightitem" filterable placeholder="请选择运费条款">
										<el-option v-for="item in down.FreightItemOption" :key="item.value" :label="item.text" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>

						</table>
						<table class="exportTb bottomtb" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th>中英品名/HS编码</th>
									<th>工厂/合同号</th>
									<th>包装件数/数量</th>
									<th>毛重/净重(KGS)</th>
									<th>体积</th>
									<th>单价</th>
									<th>总价格</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in products" class="protb" :key="index">
								<tr>
									<td>
										<el-input class="tbinput" v-model="item.prdtcn" placeholder="请输入中文品名"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="item.supplier" placeholder="请输入工厂"></el-input>
									</td>
									<td class="relative">
										<el-input class="tbinput" @blur="totalFn(item)" v-model="item.pcs" placeholder="请输入包装件数"></el-input>
										<span v-if="numRequiredFn(item.pcs)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input class="tbinput" v-model="item.grossweight" placeholder="请输入毛重"></el-input>
										<span v-if="numRequiredFn(item.grossweight)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input class="tbinput" v-model="item.vols" placeholder="请输入体积"></el-input>
										<span v-if="numRequiredFn(item.vols)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input class="tbinput" @blur="totalFn(item)" v-model="item.price" placeholder="请输入单价"></el-input>
										<span v-if="numRequiredFn(item.price)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input disabled class="tbinput" v-model="item.total" placeholder="请输入总价格"></el-input>
										<span v-if="numRequiredFn(item.total)" class="numRequired">请输入数字！</span>
									</td>
								</tr>
								<tr>
									<td>
										<el-input class="tbinput" v-model="item.prdten" placeholder="请输入英文品名"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="item.contactno" placeholder="请输入合同号"></el-input>
									</td>
									<!--<td>
										<el-input class="tbinput" v-model="item.amount" placeholder="请输入数量"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="item.netweight" placeholder="请输入净重"></el-input>
									</td>-->
									<td class="relative">
										<el-input class="tbinput" v-model="item.amount" placeholder="请输入数量"></el-input>
										<span v-if="numRequiredFn(item.amount)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input class="tbinput" v-model="item.netweight" placeholder="请输入净重"></el-input>
										<span v-if="numRequiredFn(item.netweight)" class="numRequired">请输入数字！</span>
									</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										<el-input class="tbinput" v-model="item.hscode" placeholder="请输入HS编码"></el-input>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="block">
						<h1>文件
			    	  <!--<el-button class="ml20" size="mini">上传文件</el-button>-->
			    	  <el-upload
						  class="filebtn ml20"
						  action="https://jsonplaceholder.typicode.com/posts/"
						  :on-preview="handlePreview"
						  :on-remove="handleRemove"
						  :before-remove="beforeRemove"
						   multiple
						  :limit="3"
						  :on-exceed="handleExceed"
						  :file-list="fileList">
						  <el-button size="small">上传文件</el-button>
						</el-upload>
			    	</h1>
					</div>
					<div class="block">
						<h1>功能模块</h1>
						<ul class="funTem">
							<li v-for="(item,index) in templates" :class="{'show':!item.show,'hide':item.show}" :key="index" class="clearfix" @click="templateFn(item)">
								<span>{{item.name}}</span>
								<label class="fr" v-if="item.show">显示</label>
								<label class="fr" v-else>隐藏</label>
							</li>
						</ul>
					</div>
					<el-form-item class="ml0">
						<!--<el-button type="success" size="small" @click="">生成发票号</el-button>
						<el-button type="success" size="small" @click="">保存并打印</el-button>-->
						<el-button type="success" size="small" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import { newdownApi, newApi, newidApi, portlistApi,transwayApi } from '@/api/api'
	import { droplistx } from '@/components/searchLists'
	export default {
		name: 'new',
		data() {
			return {
				droplistx: droplistx,
				trafficagent: '',
				consigner: '',
				reciver: '',
				notifier: '',
				boxtype: '',
				shipcompany: '',
				throughtime: '',
				closetime: '',
				shiptime: '',
				freightrmb: '',
				freightusd: '',
				startport: '',
				destport: '',
				transititem: '',
				freightitem: '',
				remark2: '',
				fileList: [],
				templates: [{
					name: '拖车',
					value: 'towdisplay',
					show: false
				}, {
					name: '报关',
					value: 'customdisplay',
					show: true
				}, {
					name: '仓库',
					value: 'waredisplay',
					show: true
				}],
				products: [{
					pid: "",
					prdtcn: "",
					prdten: "",
					suppilier: '',
					hscode: "",
					pcs: "",
					amount: "",
					grossweight: "",
					netweight: "",
					vols: "",
					price: "",
					total: "",

				}, ],
				down: {},
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
				value8: '',
				ruleForm: {
					transway: '1',
					billno: '',
					custname: '',
					saleman: '',
					contactno: '',
					tradetype: '',
					settletype: '',
					remark: ''
				},
				rules: {
					transway: [{
						required: true,
						message: '请输入运输方式',
						trigger: 'change'
					}, ],
					billno: [{
						required: true,
						message: '请输入出口发票号',
						trigger: 'blur'
					}],
					custname: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}],
					saleman: [{
						required: true,
						message: '请输入业务员',
						trigger: 'blur'
					}],
					contactno: [{
						required: true,
						message: '请输入合同号',
						trigger: 'blur'
					}],
					tradetype: [{
						required: true,
						message: '请输入贸易方式',
						trigger: 'blur'
					}],
					settletype: [{
						required: true,
						message: '请输入结汇方式',
						trigger: 'blur'
					}],
				},
				restaurants: [],
			}
		},
		methods: {

			datacomFn() {
				console.log(this.droplistx);
				sessionStorage.setItem('droplistx', JSON.stringify(this.droplistx));
				var arr = [];
				var choosedBox = [];
				this.droplistx.forEach(item => {
					if(item.NUM != 0) {
						choosedBox.push(item);
						sessionStorage.setItem('choosedBox', JSON.stringify(choosedBox));
						arr.push(item.E_BOX_TYPE + '*' + item.NUM);
					}
					this.boxtype = arr.toString();
				})
			},
			totalFn(item) {
				item.total = item.price * item.pcs;
			},
			numRequiredFn(value) {
				var reg = new RegExp("^[0-9]*$");
				if(reg.test(value)) {
					return false;
				} else {
					return true;
				}
			},
			templateFn(item) {
				item.show = !item.show;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			getdownFn() {
				let params = {}
				newdownApi(params).then(res => {
					this.down = res.body.resultdata;
				})
			},
			newFn() {
				let params = {
					transway: this.ruleForm.transway,
					custname: this.ruleForm.custname,
					billno: this.ruleForm.billno,
					contactno: this.ruleForm.contactno,
					saleman: this.ruleForm.saleman,
					tradetype: this.ruleForm.tradetype,
					settletype: this.ruleForm.settletype,
					remark: this.ruleForm.remark,
					consigner: this.consigner,
					reciver: this.reciver,
					notifier: this.notifier,
					boxtype: this.boxtype,
					shipcompany: this.shipcompany,
					throughtime: this.throughtime,
					closetime: this.closetime,
					shiptime: this.shiptime,
					freightrmb: this.freightrmb,
					freightusd: this.freightusd,
					startport: this.startport,
					destport: this.destport,
					transititem: this.transititem,
					freightitem: this.freightitem,
					remark2: this.remark2,
					products: JSON.stringify(this.products),
					waredisplay:this.templates[2].show?1:0,
					towdisplay:this.templates[0].show?1:0,
					customdisplay:this.templates[1].show?1:0,
				}
				newApi(params).then(res => {
					if(res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						})
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.newFn();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			newidFn() {
				let params = {

				}
				newidApi(params).then(res => {

				})
			},
			querySearch(queryString, cb) {
				let params = {
					filterValue: queryString,
					rowNum: 100
				}
				portlistApi(params).then(res => {
					var results = res.body.resultdata;
					cb(results);
				})
			},
			portFn() {
				let params = {
					filterValue:this.destport,
					rowNum: 100
				}
				portlistApi(params).then(res => {
					this.restaurants = res.body.resultdata;
				})
			},
			handleSelect(item) {
				this.destport=item.text;
			},
			handleSelectStart(item){
				this.startport=item.text;
			},
			transwayFn(state){
				let params={
					orderId:this.$route.params.id,
					transway:state,
				}
				transwayApi(params).then(res=>{
					
				})
			}
		},
		mounted() {
			this.getdownFn();
			this.newidFn();
		}
	}
</script>

<style>

</style>