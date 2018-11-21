<template>
	<div class="simple-stack">
		<div class="page">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">{{detail.custname}}+{{detail.contactno}}</span>
						<p class="desc">{{detail.remark}}</p>
					</div>
					<ul class="set">
						<li @click="">
							<i class="iconfont icon-price"></i>
							<label>费用</label>
						</li>
						<li @click="$router.push('/ontime/share/'+$route.params.id)">
							<span>6</span>
							<label>共享</label>
						</li>
						<li @click="$router.push('/ontime/edit/'+$route.params.id)">
							<i class="iconfont icon-bianji"></i>
							<label>编辑</label>
						</li>
						<li @click="$router.push('/ontime/setting/'+$route.params.id)">
							<i class="fa fa-cog"></i>
							<label>设置</label>
						</li>
					</ul>
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>

				<div class="neworder pform">
					<div class="block">
						<h1>基本信息</h1>
						<div class="result">
							<p><label>出口发票号:</label><span>{{detail.billno}}</span></p>
							<p><label>客户名称:</label><span>{{detail.custname}}</span></p>
							<p><label>合同号:</label><span>{{detail.contactno}}</span></p>
							<p><label>业务员:</label><span>{{detail.saleman}}</span></p>
							<p><label>贸易方式:</label><span>{{detail.tradetype}}</span></p>
							<p><label>结汇方式:</label><span>{{detail.settletype}}</span></p>
						</div>
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
								<td colspan="4" class="tdfl">
									<span>{{detail.trafficagent}}</span>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl">
									<span>{{detail.consigner}}</span>
								</td>
								<td width="112px" class="title greybg" colspan="2">出口发票号</td>
								<td width="290px" class="greybg tdfl">
									<span>{{detail.billno}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">合同号</td>
								<td class="greybg tdfl">
									<span>{{detail.contactno}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">结汇方式</td>
								<td class="greybg tdfl">
									<span>{{detail.settletype}}</span>
								</td>

							</tr>
							<tr>
								<td class="title" colspan="2">贸易方式</td>
								<td class="greybg tdfl">
									<span>{{detail.tradetype}}</span>
								</td>
							</tr>
							</td>
							</tr>
							<tr>
								<td width="92px" rowspan="4" class="title ">收货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl">
									<span>{{detail.reciver}}</span>
								</td>
								<!--<td rowspan="4" width="350px" class="">
									<el-input class="tbinput" v-model="reciver" placeholder="请输入货运代理"></el-input>
								</td>-->
								<td class="title greybg" colspan="2">箱型*箱量</td>
								<td class="greybg tdfl">
									<span>{{detail.boxtype}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">船务公司</td>
								<td class="tdfl">
									<span>{{detail.shipcompany}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">货好时间</td>
								<td class="greybg tdfl">
									<span>{{detail.throughtime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" rowspan="2">船期</td>
								<td class="title">截关</td>
								<td class="tdfl">
									<span>{{detail.shiptime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">通知人</td>
								<td class="greybg tdfl">
									<span>{{detail.notifier}}</span>
								</td>
								<td class="title">开船</td>
								<td class="tdfl">
									<span>{{detail.shiptime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title">起运港</td>
								<td class="tdfl">
									<span>{{detail.startport}}</span>
								</td>
								<td class="title greybg" rowspan="2">运费</td>
								<td class="title greybg">RMB</td>
								<td class="greybg tdfl">
									<span>{{detail.freightrmb}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">目的港</td>
								<td class="greybg tdfl">
									<span>{{detail.destport}}</span>
								</td>
								<td class="title greybg">USD</td>
								<td class="greybg tdfl">
									<span>{{detail.freightusd}}</span>
								</td>
							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td class="tdfl">
									<span>{{detail.transititem}}</span>
								</td>
								<td class="title bdt0" colspan="2" rowspan="2">备注</td>
								<td class="bdt0 tdfl" rowspan="2">
									<span>{{detail.remark}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">运费条款</td>
								<td class="greybg bdr1 tdfl">
									<span>{{detail.freightitem}}</span>
								</td>
							</tr>

						</table>
						<table class="exportTb bottomtb" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th width="189">中英品名/HS编码</th>
									<th width="137">工厂/合同号</th>
									<th width="131">包装件数/数量</th>
									<th width="112">毛重/净重(KGS)</th>
									<th>体积</th>
									<th>单价</th>
									<th>总价格</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in detail.products" class="protb" :key="index">
								<tr>
									<td>
										{{item.prdtcn}}
										
									</td>
									<td>
										{{item.supplier}}
										
									</td>
									<td>
										{{item.pcs}}
									</td>
									<td>
										{{item.grossweight}}
										
									</td>
									<td>
										{{item.vols}}										
									</td>
									<td>
										{{item.price}}
									</td>
									<td>
										{{item.total}}										
									</td>
								</tr>
								<tr>
									<td>
										{{item.prdten}}
									</td>
									<td>
										{{item.contactno}}
									</td>
									<td>
										{{item.amount}}
									</td>
									<td>
										{{item.netweight}}									
									</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										{{item.hscode}}									
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
					<div class="block" v-if="trailershow">
						<h1>拖车
			    	   <el-dropdown class="ml20" size="mini" split-button>
						 <router-link :to="'/ontime/newTrailer/'+$route.params.id">安排拖车</router-link> 
						  <el-dropdown-menu slot="dropdown">						  
						    <el-dropdown-item>
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
						  <el-button size="small" type="text">上传文件</el-button>
						  </el-upload>
						    </el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
			    	
			    	</h1>
						<table class="exportTb bdrs" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">拖车:</td>
								<td colspan="6" class="tdfl">
									<span>宁波嘉德货运代理有限公司</span>
								</td>
							</tr>
							<tr class="tbhead">
								<th>箱型</th>
								<th>箱号</th>
								<th>封号</th>
								<th>装货日期</th>
								<th>装货工厂</th>
								<th>状态</th>
								<th>操作</th>
							</tr>
							<tr>
								<td>40GT</td>
								<td>8504210000</td>
								<td>43PACKAGES</td>
								<td>2018-10-25 10:30</td>
								<td>宁波嘉德工厂</td>
								<td>提箱中</td>
								<td>
									<a href="#">查看详情</a>
								</td>
							</tr>
						</table>
					</div>

					<div class="block" v-if="warehouseshow">
						<h1>仓库
			    	   <el-dropdown class="ml20" size="mini" split-button>
						  新建进仓单
						  <el-dropdown-menu slot="dropdown">
			
						    <el-dropdown-item>
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
						  <el-button size="small" type="text">上传文件</el-button>
						  </el-upload>
						    </el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
			    	 
			    	</h1>
						<table class="exportTb bdrs" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">仓库:</td>
								<td colspan="6" class="tdfl">
									<span>宁波嘉德货运代理有限公司</span>
								</td>
							</tr>
							<tr class="tbhead">
								<th>进仓编号</th>
								<th>预计数量</th>
								<th>进仓数量</th>
								<th>送货工厂</th>
								<th>进仓日期</th>
								<th>操作</th>
							</tr>
							<tr>
								<td>123456</td>
								<td>20</td>
								<td>20</td>
								<td>宁波嘉德工厂</td>
								<td>2018-10-25 10:30</td>
								<td>
									<a href="#">查看详情</a>
								</td>
							</tr>
						</table>
					</div>

					<div class="block" v-if="customsshow">
						<h1>报关
			    	   <el-dropdown class="ml20" size="mini" split-button>
						  新建报关单
						  <el-dropdown-menu slot="dropdown">
			
						    <el-dropdown-item>
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
						  <el-button size="small" type="text">上传文件</el-button>
						  </el-upload>
						    </el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
			    	 
			    	</h1>
						<table class="exportTb bdrs" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">报关单位:</td>
								<td colspan="6" class="tdfl">
									<span>宁波报关行</span>
								</td>
							</tr>
							<tr class="tbhead">
								<th>申报单位</th>
								<th>出口金额</th>
								<th>日期</th>
								<th>状态</th>
								<th>操作</th>
							</tr>
							<tr>
								<td>华甬</td>
								<td>8504210000</td>
								<td>2018-10-25 10:30</td>
								<td>已放行</td>
								<td>
									<a href="#">查看详情</a>
								</td>
							</tr>
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
						  <el-button  size="mini">上传文件</el-button>
						</el-upload>
			    	</h1>
					</div>

					<div class="footer">
						<ul class="Tblock">
							<li v-if="!trailershow" @click="trailershow=true">拖车</li>
							<li v-if="!warehouseshow" @click="warehouseshow=true">仓库</li>
							<li v-if="!customsshow" @click="customsshow=true">报关</li>
						</ul>
						<router-link :to="'/ontime/setting/'+$route.params.id">类型设置</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {detailApi} from '@/api/api'
	export default {
		name: 'new',
		data() {
			return {
				trailershow:false,
				warehouseshow:false,
				customsshow:false,
				detail:{},
				ordertitle: '订单标题',
				trafficagent: '宁波嘉德货运代理有限公司',
				consigner: 'DELIXI GRPUP IMP.AND EXP.CO.LTDDELIXI GRPUP IMP.AND EXP.CO.LTDDELIXI GRPUP IMP.AND EXP.CO.LTDDELIXI GRPUP IMP.AND EXP.CO.LTDDELIXI GRPUP IMP.AND EXP.CO.LTD',
				reciver: '张忠利',
				shipcompany: '',
				throughtime: '2018-10-25',
				closetime: '2018-10-25',
				shiptime: '2018-10-25',
				startport: '宁波',
				boxtype: '40HQ*2，20GP*2',
				rshipcompany: 'KMTC',
				destport: '卡拉奇',
				transititem: 'CY TO CY',
				freightitem: 'FREIGHT PREPAID',
				notifier: '张忠利',
				freightrmb: '4000',
				freightusd: '6000',
				fileList: [],
				remark: '备注',
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
					prdtcn: "变压器",
					prdten: "TRANSFORM",
					suppilier: '宁波嘉德',
					hscode: "8504210000",
					contract: '18ART7076/A2242',
					pcs: "43WOODEN CASE",
					amount: "2040千克",
					grossweight: "54510",
					netweight: "61865",
					vols: "152CBM",
					price: "USD99813",
					total: "USD99813",
				}, {
					pid: "",
					prdtcn: "变压器",
					prdten: "TRANSFORM",
					suppilier: '宁波嘉德',
					hscode: "8504210000",
					contract: '18ART7076/A2242',
					pcs: "43WOODEN CASE",
					amount: "2040千克",
					grossweight: "54510",
					netweight: "61865",
					vols: "152CBM",
					price: "USD99813",
					total: "USD99813",
				}, ],
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
					billno: 'DLX1806010',
					custname: '中艺华甬进出口有限公司',
					saleman: '小张',
					contactno: '548154861',
					tradetype: '一般贸易',
					settletype: 'L/C',
					remark: '订单备注内容订单备注内容订单备注内容订单备注内容'
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

				}
			}
		},
		methods: {
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
			initFn(){
				let params={
					orderId:this.$route.params.id,
				}
				detailApi(params).then(res=>{
					this.detail=res.body.resultdata;
				})
			}
		},
		mounted() {
               this.initFn();
		}
	}
</script>

<style>

</style>