<template>
	<div class="simple-stack">
		<div class="page">
			<div class="neworder">
				<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm" class="pform">
					<h1 class="font30">创建订单</h1>
					<div class="block">
						<h1><span class="red">*</span>选择运输方式</h1>
						<el-form-item prop="transway" style="margin-left:-80px;">
							<el-radio-group v-model="ruleForm.transway">
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
							<el-input clearable class="greyInput" v-model="ruleForm.tradetype" placeholder="请输入贸易方式"></el-input>
						</el-form-item>
						<el-form-item prop="settletype" label="结汇方式">
							<el-input clearable class="greyInput" v-model="ruleForm.settletype" placeholder="请输入结汇方式"></el-input>
						</el-form-item>
					</div>
				</el-form>
				<div class="block">
					<h1>海运订舱</h1>
					<table class="exportTb" cellpadding="0" cellspacing="0">
						<tr>
							<td width="93px" class="name">货运代理:</td>
							<td colspan="4">
								<el-select class="tbselect" v-model="trafficagent" filterable placeholder="请选择货运代理">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td rowspan="4" class="title greybg bdt0">发货人</td>
							<td rowspan="4" width="350px" class="greybg bdt0">
								<el-input class="tbinput" v-model="consigner" placeholder="请输入货运代理"></el-input>
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
								<el-input class="tbinput" v-model="reciver" placeholder="请输入货运代理"></el-input>
							</td>
							<td class="title greybg" colspan="2">箱型*箱量</td>
							<td class="greybg">
								<el-select class="tbselect" v-model="boxtype" filterable placeholder="请选择箱型*箱量">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="title" colspan="2">船务公司</td>
							<td>
								<el-input class="tbinput" v-model="rshipcompany" disaled placeholder="请输入船务公司"></el-input>
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
								<el-select class="tbselect" v-model="throughtime" filterable placeholder="请选择箱型*箱量">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="title greybg">通知人</td>
							<td width="350px" class="greybg">
								<el-input class="tbinput" v-model="reciver" placeholder="请输入通知人"></el-input>
							</td>
							<td class="title">开船</td>
							<td>
								<el-select class="tbselect" v-model="throughtime" filterable placeholder="请选择箱型*箱量">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="title">起运港</td>
							<td>
								<el-select class="tbselect" v-model="startport" filterable placeholder="请选择起运港">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
							<td class="title greybg" rowspan="2">运费</td>
							<td class="title greybg">RMB</td>
							<td class="greybg">
								<el-input class="tbinput" v-model="reciver" placeholder="请输入RMB"></el-input>
							</td>
						</tr>
						<tr>
							<td class="title greybg">目的港</td>
							<td class="greybg">
								<el-select class="tbselect" v-model="destport" filterable placeholder="请选择目的港">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
							<td class="title greybg">USD</td>
							<td class="greybg">
								<el-input class="tbinput" v-model="reciver" placeholder="请输入USD"></el-input>
							</td>
						</tr>
						<tr>
							<td class="title">运输条款</td>
							<td>
								<el-select class="tbselect" v-model="transititem" filterable placeholder="请选择运输条款">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
							<td class="title" colspan="2" rowspan="2">备注</td>
							<td class="" rowspan="2">
								<el-input class="tbinput" v-model="reciver" placeholder="请输入备注"></el-input>
							</td>
						</tr>
						<tr>
							<td class="title greybg">运费条款</td>
							<td class="greybg">
								<el-select class="tbselect" v-model="freightitem" filterable placeholder="请选择运费条款">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</td>
						</tr>

					</table>
				</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'new',
		data() {
			return {
				trafficagent: '',
				consigner: '',
				reciver: '',
				shipcompany: '',
				throughtime: '',
				startport:'',
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
					settletype: ''
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

		},
		mounted() {

		}
	}
</script>

<style>

</style>