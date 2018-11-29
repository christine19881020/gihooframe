<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
			<a> 返回客户列表</a>
		</div>
		<div class="page page-1">
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
				   <div class="block">
					   <h1>审批意见</h1>
					   <el-input class="verifybox" :autosize="{ minRows: 4, maxRows: 6}" type="textarea" placeholder="请输入审批意见" v-model="vcontent"></el-input>
				       <div class="verifybtns">
						    <el-button size="small" type="success" @click.native="verifyFn('passed')">通过</el-button>
						    <el-button size="small" type="text" @click.native="verifyFn('reject')">不通过</el-button>
					   </div>
				   </div>
				   
				   <div class="block">
					   <h1>操作记录</h1>
					   <ul class="operatelog">
						   <li v-for="(item,index) in detail.operatelog" :key="index">
							   <label>{{item.operateusr}}</label>
							   <span>在{{item.moudlename}}</span>
							   <span>{{item.operatename}}</span>
							   <span>{{item.operatedate|momentHm}}</span>
						   </li>
					   </ul>
				   </div>
									   
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import {
		verifyDetailApi,
		verifyApi,
	} from '@/api/api'
	export default {
		name: 'new',
		components: {
			
		},
		data() {
			return {
				vcontent:"",			
				trailList: [],				
				detail: {},
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
				products: [],
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
				},
			}
		},
		methods: {							
			initFn() {
				let params = {
					orderId: this.$route.params.id,
				}
				verifyDetailApi(params).then(res => {
					this.detail = res.body.resultdata;
				})
			},		
		    verifyFn(ifpass){
				let params={
					orderId:this.$route.params.id,
					auditStatus:ifpass,
					auditDesc:this.vcontent,
				}
				if(ifpass=='passed'){
					if(!this.vcontent){
						this.$message({
							type:'warning',
							message:'通过审核请输入审批意见！'
						})
					}else{
						verifyApi(params).then(res=>{
							if(res.body.type==1){
								this.$message({
									type:'success',
									message:res.body.message,
								});
								this.$router.push('/ontime/list')
							}else{
								this.$message({
									type:'warning',
									message:res.body.message,
								})
							}
						})
					}
					
				}else if(ifpass=='reject'){
					verifyApi(params).then(res=>{
						if(res.body.type==1){
							this.$message({
								type:'success',
								message:res.body.message,
							});
							this.$router.push('/ontime/list')
						}else{
							this.$message({
								type:'warning',
								message:res.body.message,
							})
						}
					})
				}
				
			}

		},
		mounted() {
			this.initFn();
		
		
		}
	}
</script>

<style>

</style>
