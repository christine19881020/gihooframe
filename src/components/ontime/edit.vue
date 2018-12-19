<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
			<a> 返回海运列表</a>
		</div>
		<div class="page page-1 page-behind" @click="$router.push('/ontime/detail/'+$route.params.id)">
			<a> 返回订单详情</a>
		</div>
		<div class="page page-2">
			<div class="neworder pform">
				<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
					<h1 class="font30">编辑</h1>
					<div class="block">
						<div class="hr-4"></div>
						<div class="hr-1"></div>
					</div>
					<div class="block">
						<h1>基本信息</h1>
						<el-form-item prop="billno" label="出口发票号">
							<el-input clearable class="greyInput" v-model="ruleForm.billno" placeholder="请输入出口发票号"></el-input>
						</el-form-item>
						<el-form-item prop="custname" label="客户名称">
							<el-autocomplete clearable popper-class="greyInput" class="greyInput" v-model="ruleForm.custname" :fetch-suggestions="querySearchClient" placeholder="请输入客户名称" :trigger-on-focus="true" @select="handleSelectClient">
								<template slot-scope="{ item }">
									<div class="name">{{ item.text }}</div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item prop="saleman" label="业务员">
							<el-input clearable class="greyInput" v-model="ruleForm.saleman" placeholder="请输入业务员"></el-input>
						</el-form-item>
						<el-form-item prop="contactno" label="合同号">
							<el-input clearable class="greyInput" v-model="ruleForm.contactno" placeholder="请输入合同号"></el-input>
						</el-form-item>
						<el-form-item prop="tradetype" label="贸易方式">
							<el-select class="greyInput" clearable v-model="ruleForm.tradetype" filterable placeholder="请输入贸易方式">
								<el-option v-for="item in down.TradeTypeOption" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item prop="settletype" label="结汇方式">
							<el-select class="greyInput" clearable v-model="ruleForm.settletype" filterable placeholder="请输入结汇方式">
								<el-option v-for="item in down.SettleTypeOption" :key="item.value" :label="item.text" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="备注">
							<el-input clearable class="greyInput" v-model="ruleForm.remark" placeholder="请输入备注"></el-input>
						</el-form-item>
					</div>
					<div class="block" v-if="detail.transway=='1'">
						<!--海运整箱-->
						<h1>
							海运订舱
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4">
									<el-input class="tbinput" v-model="trafficagent" placeholder="请输入货运代理"></el-input>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>

								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
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
								<td width="92px" rowspan="4" class="title">收货人</td>
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>
								<td class="title greybg" colspan="2">箱型*箱量</td>
								<td class="greybg">
									<el-popover placement="bottom-start" width="220" trigger="click" @hide="datacomFn">
										<ul class="choosebox">
											<li v-for="item in droplistx" :key="item.ID">
												<span class="name">{{item.E_BOX_TYPE}}</span>
												<span>
													<el-input-number size="mini" :min="0" v-model="item.NUM"></el-input-number>
												</span>
											</li>
										</ul>
										<el-input disabled class="tbinput" v-model="boxtype" :title="boxtype" slot="reference" placeholder="请选择箱型*箱量"></el-input>
									</el-popover>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">船务公司</td>
								<td>
									<el-input class="tbinput" v-model="detail.shipcompany" disaled placeholder="请输入船务公司"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">货好时间</td>
								<td class="greybg">
									<el-date-picker class="tbdate" v-model="detail.throughtime" type="date" placeholder="请选择货好时间">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title" rowspan="2">船期</td>
								<td class="title">截关</td>
								<td>
									<el-date-picker class="tbdate" v-model="detail.closetime" type="date" placeholder="请选择截关">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg" rowspan="4">通知人</td>
								<td width="350px" class="greybg" rowspan="4">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.notifier" placeholder="请输入通知人"></el-input>
								</td>
								<td class="title">开船</td>
								<td>
									<el-date-picker class="tbdate" v-model="detail.shiptime" type="date" placeholder="请选择开船">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg" rowspan="2">运费</td>
								<td class="title greybg">RMB</td>
								<td class="greybg relative">
									<el-input class="tbinput" v-model="detail.freightrmb" placeholder="请输入RMB"></el-input>
									<span v-if="numRequiredFn(detail.freightrmb)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">USD</td>
								<td class="greybg relative">
									<el-input class="tbinput" v-model="detail.freightusd" placeholder="请输入USD"></el-input>
									<span v-if="numRequiredFn(detail.freightusd)" class="numRequired">请输入数字！</span>
								</td>

							</tr>
							<tr>
								<td class="title bdt0" colspan="2" rowspan="5">备注</td>
								<td class="bdt0" rowspan="5">
									<el-input type="textarea" class="tbtext small" v-model="detail.remark2" placeholder="请输入备注"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title">起运港</td>
								<td class="bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.startport" :fetch-suggestions="querySearch" placeholder="请选择起运港" :trigger-on-focus="true" @select="handleSelectStart">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>

							</tr>
							<tr>
								<td class="title greybg">目的港</td>
								<td class="greybg bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.destport" :fetch-suggestions="querySearch" placeholder="请选择目的港" :trigger-on-focus="true" @select="handleSelect">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>

							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td class="bdr1">
									<el-select class="tbselect" v-model="detail.transititem" filterable placeholder="请选择运输条款">
										<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>

							</tr>
							<tr>
								<td class="title greybg">运费条款</td>
								<td class="greybg bdr1">
									<el-select class="tbselect" v-model="detail.freightitem" filterable placeholder="请选择运费条款">
										<el-option v-for="item in down.FreightItemOption" :key="item.value" :label="item.text" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>
						</table>
						<table class="exportTb bottomtb" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
									<th width="60px">操作</th>
								</tr>
							</thead>
							<tbody v-for="(itemP,indexP) in detail.products" class="protb" :key="indexP">
								<tr>
									<td>
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.prdtcode" :fetch-suggestions="querySearchPro" placeholder="请输入产品编号" :trigger-on-focus="true" @select="((item)=>{handleSelectPro(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.product_number}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdtcn" placeholder="请输入中文品名"></el-input>
									</td>
									<td class="relative">
										<!--<el-input clearable class="tbinput"  v-model="itemP.pcsCombine" placeholder="请输入包装件数"></el-input>-->
										<!--<span v-if="numRequiredFn(itemP.pcs)" class="numRequired">请输入数字！</span>-->
										<el-autocomplete class="tbinput" v-model="itemP.pcscombine" :fetch-suggestions="querySearchPcs" placeholder="请输入包装件数" @select="((item)=>{handleSelectPcs(item,indexP)})"></el-autocomplete>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.grossweight" placeholder="请输入毛重"></el-input>
										<span v-if="numRequiredFn(itemP.grossweight)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.vols" placeholder="请输入体积"></el-input>
										<span v-if="numRequiredFn(itemP.vols)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.price" placeholder="请输入单价"></el-input>
										<span v-if="numRequiredFn(itemP.price)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable disabled class="tbinput" v-model="itemP.total" placeholder="请输入总价格"></el-input>
										<span v-if="numRequiredFn(itemP.total)" class="numRequired">请输入数字！</span>
									</td>
									<td>
										<el-button size="mini" type="text" v-if="detail.products.length>1" @click="deleteFn(indexP)">删除</el-button>
									</td>
								</tr>
								<tr>
									<td>
										<!--<el-input clearable class="tbinput" v-model="item.supplier" placeholder="请输入工厂"></el-input>-->
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.supplier" :fetch-suggestions="querySearchSupplier" placeholder="请输入工厂" :trigger-on-focus="true" @select="((item)=>{handleSelectSupplier(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.text}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdten" placeholder="请输入英文品名"></el-input>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.amount" placeholder="请输入数量"></el-input>
										<span v-if="numRequiredFn(itemP.amount)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.netweight" placeholder="请输入净重"></el-input>
										<span v-if="numRequiredFn(itemP.netweight)" class="numRequired">请输入数字！</span>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.contactno" placeholder="请输入合同号"></el-input>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.hscode" placeholder="请输入HS编码"></el-input>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<el-button v-if="indexP==detail.products.length-1" size="mini" type="text" @click="newProductFn(indexP)">添加产品</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="block" v-if="detail.transway=='2'">
						<!--海运拼箱-->
						<h1>
							海运订舱
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4">
									<el-input class="tbinput" v-model="trafficagent" placeholder="请输入货运代理"></el-input>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>

								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
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
								<td width="92px" rowspan="4" class="title">收货人</td>
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>
								<td class="title greybg" colspan="2">船务公司</td>
								<td class="greybg">
									<el-input class="tbinput" v-model="detail.shipcompany" disaled placeholder="请输入船务公司"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title " colspan="2">货好时间</td>
								<td>
									<el-date-picker class="tbdate" v-model="detail.throughtime" type="date" placeholder="请选择货好时间">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg" rowspan="2">船期</td>
								<td class="title greybg">截关</td>
								<td class="greybg">
									<el-date-picker class="tbdate" v-model="detail.closetime" type="date" placeholder="请选择截关">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg">开船</td>
								<td class="greybg">
									<el-date-picker class="tbdate" v-model="detail.shiptime" type="date" placeholder="请选择开船">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title greybg" rowspan="4">通知人</td>
								<td width="350px" class="greybg" rowspan="4">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.notifier" placeholder="请输入通知人"></el-input>
								</td>
								<td class="title " rowspan="2">运费</td>
								<td class="title ">RMB</td>
								<td class=" relative">
									<el-input class="tbinput" v-model="detail.freightrmb" placeholder="请输入RMB"></el-input>
									<span v-if="numRequiredFn(detail.freightrmb)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr>
								<td class="title ">USD</td>
								<td class="relative">
									<el-input class="tbinput" v-model="detail.freightusd" placeholder="请输入USD"></el-input>
									<span v-if="numRequiredFn(detail.freightusd)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr>
								<td class="title bdt0" colspan="2" rowspan="6">备注</td>
								<td class="bdt0" rowspan="6">
									<el-input type="textarea" class="tbtext mid" v-model="detail.remark2" placeholder="请输入备注"></el-input>
								</td>
							</tr>

							<tr></tr>
							<tr>
								<td class="title">起运港</td>
								<td class="bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.startport" :fetch-suggestions="querySearch" placeholder="请选择起运港" :trigger-on-focus="true" @select="handleSelectStart">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>
							</tr>
							<tr>
								<td class="title greybg">目的港</td>
								<td class="greybg bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.destport" :fetch-suggestions="querySearch" placeholder="请选择目的港" :trigger-on-focus="true" @select="handleSelect">
										<template slot-scope="{ item }">
											<div class="name">{{item.text}}</div>
											<span class="addr">{{item.value}}</span>
										</template>
									</el-autocomplete>
								</td>

							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td class="bdr1">
									<el-select class="tbselect" v-model="detail.transititem" filterable placeholder="请选择运输条款">
										<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td class="title greybg">运费条款</td>
								<td class="greybg bdr1">
									<el-select class="tbselect" v-model="detail.freightitem" filterable placeholder="请选择运费条款">
										<el-option v-for="item in down.FreightItemOption" :key="item.value" :label="item.text" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>
						</table>
						<table class="exportTb bottomtb" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
									<th width="60px">操作</th>
								</tr>
							</thead>
							<tbody v-for="(itemP,indexP) in detail.products" class="protb" :key="indexP">
								<tr>
									<td>
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.prdtcode" :fetch-suggestions="querySearchPro" placeholder="请输入产品编号" :trigger-on-focus="true" @select="((item)=>{handleSelectPro(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.product_number}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdtcn" placeholder="请输入中文品名"></el-input>
									</td>
									<td class="relative">
										<!--<el-input clearable class="tbinput"  v-model="itemP.pcs" placeholder="请输入包装件数"></el-input>
										<span v-if="numRequiredFn(itemP.pcs)" class="numRequired">请输入数字！</span>-->
										<el-autocomplete class="tbinput" v-model="itemP.pcscombine" :fetch-suggestions="querySearchPcs" placeholder="请输入包装件数" @select="((item)=>{handleSelectPcs(item,indexP)})"></el-autocomplete>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.grossweight" placeholder="请输入毛重"></el-input>
										<span v-if="numRequiredFn(itemP.grossweight)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.vols" placeholder="请输入体积"></el-input>
										<span v-if="numRequiredFn(itemP.vols)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.price" placeholder="请输入单价"></el-input>
										<span v-if="numRequiredFn(itemP.price)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable disabled class="tbinput" v-model="itemP.total" placeholder="请输入总价格"></el-input>
										<span v-if="numRequiredFn(itemP.total)" class="numRequired">请输入数字！</span>
									</td>
									<td>
										<el-button size="mini" type="text" v-if="detail.products.length>1" @click="deleteFn(indexP)">删除</el-button>
									</td>
								</tr>
								<tr>
									<td>
										<!--<el-input clearable class="tbinput" v-model="item.supplier" placeholder="请输入工厂"></el-input>-->
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.supplier" :fetch-suggestions="querySearchSupplier" placeholder="请输入工厂" :trigger-on-focus="true" @select="((item)=>{handleSelectSupplier(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.text}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdten" placeholder="请输入英文品名"></el-input>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.amount" placeholder="请输入数量"></el-input>
										<span v-if="numRequiredFn(itemP.amount)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.netweight" placeholder="请输入净重"></el-input>
										<span v-if="numRequiredFn(itemP.netweight)" class="numRequired">请输入数字！</span>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.contactno" placeholder="请输入合同号"></el-input>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.hscode" placeholder="请输入HS编码"></el-input>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<el-button v-if="indexP==detail.products.length-1" size="mini" type="text" @click="newProductFn(indexP)">添加产品</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="block" v-if="detail.transway=='3'">
						<!--空运-->
						<h1>
							空运订舱
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4">
									<el-input class="tbinput" v-model="trafficagent" placeholder="请输入货运代理"></el-input>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
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
								<td width="92px" rowspan="4" class="title">收货人</td>
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>
								<td class="title greybg" colspan="2">航空公司</td>
								<td class="greybg">
									<el-input class="tbinput " v-model="detail.airline" disaled placeholder="请输入航空公司"></el-input>
								</td>
							</tr>
							<tr>
								<td class="title " colspan="2">航班时间</td>
								<td class="">
									<el-date-picker class="tbdate" v-model="detail.flighttime" type="date" placeholder="请选择航班时间">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title " colspan="2">货好时间</td>
								<td>
									<el-date-picker class="tbdate" v-model="detail.throughtime" type="date" placeholder="请选择货好时间">
									</el-date-picker>
								</td>
							</tr>
							<tr>
								<td class="title " rowspan="2">运费</td>
								<td class="title ">RMB</td>
								<td class=" relative">
									<el-input class="tbinput" v-model="detail.freightrmb" placeholder="请输入RMB"></el-input>
									<span v-if="numRequiredFn(detail.freightrmb)" class="numRequired">请输入数字！</span>
								</td>

							</tr>

							<!--??-->
							<tr>
								<td class="title greybg" rowspan="4">通知人</td>
								<td width="350px" class="greybg" rowspan="4">
									<el-input type="textarea" class="tbtext greybg" v-model="detail.notifier" placeholder="请输入通知人"></el-input>
								</td>
								<td class="title ">USD</td>
								<td class="relative">
									<el-input class="tbinput" v-model="detail.freightusd" placeholder="请输入USD"></el-input>
									<span v-if="numRequiredFn(detail.freightusd)" class="numRequired">请输入数字！</span>
								</td>
							</tr>
							<tr class="clearfix">
								<td class="title bdt0" colspan="2" rowspan="7">备注</td>
								<td class="bdt0" rowspan="7">
									<el-input type="textarea" class="tbtext big" v-model="detail.remark2" placeholder="请输入备注"></el-input>
								</td>
							</tr>
							<tr></tr>
							<tr></tr>
							<tr>
								<td class="title">起运地</td>
								<td class="bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.startport_air" :fetch-suggestions="querySearch" placeholder="请选择起运地" :trigger-on-focus="true" @select="handleSelectFStart">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
											<span class="addr">{{ item.value }}</span>
										</template>
									</el-autocomplete>
								</td>
							</tr>

							<tr>
								<td class="title greybg">目的地</td>
								<td class="greybg bdr1">
									<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="detail.destport_air" :fetch-suggestions="querySearch" placeholder="请选择目的地" :trigger-on-focus="true" @select="handleSelectFdest">
										<template slot-scope="{ item }">
											<div class="name">{{item.text}}</div>
											<span class="addr">{{item.value}}</span>
										</template>
									</el-autocomplete>
								</td>
							</tr>

							<tr>
								<td class="title">运输条款</td>
								<td class="bdr1">
									<el-select class="tbselect" v-model="detail.transititem" filterable placeholder="请选择运输条款">
										<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>

							</tr>
							<tr>
								<td class="title greybg">运费条款</td>
								<td class="greybg bdr1">
									<el-select class="tbselect" v-model="detail.freightitem" filterable placeholder="请选择运费条款">
										<el-option v-for="item in down.FreightItemOption" :key="item.value" :label="item.text" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>

						</table>
						<table class="exportTb bottomtb" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
									<th width="60px">操作</th>
								</tr>
							</thead>
							<tbody v-for="(itemP,indexP) in detail.products" class="protb" :key="indexP">
								<tr>
									<td>
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.prdtcode" :fetch-suggestions="querySearchPro" placeholder="请输入产品编号" :trigger-on-focus="true" @select="((item)=>{handleSelectPro(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.product_number}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdtcn" placeholder="请输入中文品名"></el-input>
									</td>
									<td class="relative">
										<!--<el-input clearable class="tbinput"  v-model="itemP.pcs" placeholder="请输入包装件数"></el-input>
										<span v-if="numRequiredFn(itemP.pcs)" class="numRequired">请输入数字！</span>-->
										<el-autocomplete class="tbinput" v-model="itemP.pcscombine" :fetch-suggestions="querySearchPcs" placeholder="请输入包装件数" @select="((item)=>{handleSelectPcs(item,indexP)})"></el-autocomplete>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.grossweight" placeholder="请输入毛重"></el-input>
										<span v-if="numRequiredFn(itemP.grossweight)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.vols" placeholder="请输入体积"></el-input>
										<span v-if="numRequiredFn(itemP.vols)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.price" placeholder="请输入单价"></el-input>
										<span v-if="numRequiredFn(itemP.price)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable disabled class="tbinput" v-model="itemP.total" placeholder="请输入总价格"></el-input>
										<span v-if="numRequiredFn(itemP.total)" class="numRequired">请输入数字！</span>
									</td>
									<td>
										<el-button size="mini" type="text" v-if="detail.products.length>1" @click="deleteFn(indexP)">删除</el-button>
									</td>
								</tr>
								<tr>
									<td>
										<!--<el-input clearable class="tbinput" v-model="item.supplier" placeholder="请输入工厂"></el-input>-->
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbinput" v-model="itemP.supplier" :fetch-suggestions="querySearchSupplier" placeholder="请输入工厂" :trigger-on-focus="true" @select="((item)=>{handleSelectSupplier(item, indexP)})">
											<template slot-scope="{item}">
												<div class="name">{{item.text}}</div>
											</template>
										</el-autocomplete>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.prdten" placeholder="请输入英文品名"></el-input>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" @blur="totalFn(itemP)" v-model="itemP.amount" placeholder="请输入数量"></el-input>
										<span v-if="numRequiredFn(itemP.amount)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.netweight" placeholder="请输入净重"></el-input>
										<span v-if="numRequiredFn(itemP.netweight)" class="numRequired">请输入数字！</span>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.contactno" placeholder="请输入合同号"></el-input>
									</td>
									<td>
										<el-input clearable class="tbinput" v-model="itemP.hscode" placeholder="请输入HS编码"></el-input>
									</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td>
										<el-button v-if="indexP==detail.products.length-1" size="mini" type="text" @click="newProductFn(indexP)">添加产品</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<el-form-item class="ml0">
						<el-popover ref="popover5" placement="top" width="100" v-model="appshow">
							<ul class="appul">
								<li @click="chooseFn(item)" v-for="(item,index) in userlist" :key="index">{{item.name}}</li>
							</ul>
						</el-popover>
						<el-button type="success" size="small" v-popover:popover5>保存并审批</el-button>
						<!--<el-button type="success" size="small" @click="">保存并打印</el-button>-->
						<el-button type="success" size="small" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		newdownApi,
		detailApi,
		updateApi,
		portlistApi,
		verifyUserApi,
		verifyUserSubApi,
		addbooklistAPI,
		pcodeApi,
		filterApi,
	} from '@/api/api'
	import {
		droplistx
	} from '@/components/searchLists'
	export default {
		name: 'edit',
		data() {
			return {
				ppopshow: false,
				ploading: false,
				pOptions: [],
				importUrl: 'https://www.gihoo.work/huayong/file//upload/import/transbill',
				fileUrl: 'https://www.jihuobao.net/filecenter/ResourceFile/UploadifyFile?',
				header: {
					Authorization: ''
				},
				custOptions: [],
				appshow: false,
				userlist: [],
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
				down: {},
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
					pcscombine: '',
					amount: "",
					grossweight: "",
					netweight: "",
					vols: "",
					price: "",
					total: "",
				}],
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
				detail: {},
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
					}],
					custname: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'change'
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
						trigger: 'change'
					}],
					settletype: [{
						required: true,
						message: '请输入结汇方式',
						trigger: 'change'
					}],

				},
				choosedBox: [],
				query: {
					custname: "",
					country: "",
					serviceMan: "",
				},
				restaurants: [],
				pcsX: '',
				queryX: '',
			}
		},
		methods: {
			querySearchPcs(queryString, cb) {
				var restaurants = this.restaurants;
				var results = this.splitFn(queryString) ? restaurants.filter(this.createFilter(this.splitFn(queryString))) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			splitFn(queryString) {
				var arr = queryString.split('');
				this.queryX = "";
				var index = "";
				this.pcsX = "";
				console.log('arr', arr);
				index = arr.findIndex(t => isNaN(t));
				console.log('index', index)
				this.pcsX = queryString.substr(0, index);
				this.queryX = queryString.substr(index, arr.length - 1);
				console.log('pcs', this.pcsX, 'query', this.queryX);
				return this.queryX;
			},
			createFilter(queryString) {
				return(restaurant) => {
					return(restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelectPcs(item, indexP) {
				console.log(item, indexP);
				this.detail.products[indexP].pcscombine = this.pcsX + item.value;
				this.detail.products[indexP].pcs = this.pcsX;
				this.detail.products[indexP].packtype = item.value;
			},
			loadAll() {
				return [{
						"value": "CARTON",
					}, {
						"value": "PACKAGE",
					},
					{
						"value": "PALLET",
					},
					{
						"value": "SET",
					},
					{
						"value": "PIECES",
					}, {
						"value": "WOODEN CASE",
					}
				];
			},
			querySearchClient(queryString, cb) {
				let params = {
					filter: queryString,
					custAtt: 1,
				}
				filterApi(params).then(res => {
					if(res.body.type == 1) {
						var results = res.body.resultdata;
						cb(results);
					}
				})
			},
			handleSelectClient(item) {
				this.ruleForm.custname = item.text;
			},
			querySearchSupplier(queryString, cb) {
				let params = {
					filter: queryString,
					custAtt: 2,
				}
				filterApi(params).then(res => {
					if(res.body.type == 1) {
						var results = res.body.resultdata;
						cb(results);
					}
				})
			},
			handleSelectSupplier(item, indexP) {
				console.log("FF", item, indexP)
				this.detail.products[indexP].supplier = item.text
			},
			deleteFn(index) {
				this.detail.products.splice(index, 1);
			},
			pcodeFn(item) {
				var query = {}
				query.product_number = item.prdtcode;
				let params = {
					query: JSON.stringify(query),
				}
				this.pOptions = [];
				pcodeApi(params).then(res => {
					if(res.body.type == 1) {
						this.pOptions = res.body.resultdata;
						item.ppopshow = true;
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}

				})
			},
			choosePFn(item, index, pitem) {
				item.ppopshow = false;
				item.hscode = pitem.hscode;
				item.prdtcn = pitem.name;
				item.prdten = pitem.enname;
				item.prdtcode = pitem.product_number;
			},
			querySearchPro(queryString, cb) {
				var query = {}
				query.product_number = queryString;
				let params = {
					query: JSON.stringify(query),
				}
				pcodeApi(params).then(res => {
					if(res.body.type == 1) {
						var results = res.body.resultdata;
						cb(results);
					}
				})
			},
			handleSelectPro(item, indexP) {
				console.log("XX", item, indexP);
				this.detail.products[indexP].prdtcode = item.product_number;
				this.detail.products[indexP].hscode = item.hscode;
				this.detail.products[indexP].prdtcn = item.name;
				this.detail.products[indexP].prdten = item.enname;
			},
			setHead() {
				let code = Cookies.get('gihoo_v1.1_token');
				if (code) {
					this.header.Authorization = 'Bearer ' + code;
				}
			},
			newProductFn(index) {
				var ob = {
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
				};
				this.detail.products.push(ob);
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
					filterValue: this.destport,
					rowNum: 100
				}
				portlistApi(params).then(res => {
					this.restaurants = res.body.resultdata;
				})
			},
			handleSelect(item) {
				this.detail.destport = item.text;
			},
			handleSelectStart(item) {
				console.log('item', item)
				this.detail.startport = item.text;
			},
			handleSelectFStart(item) {
				this.detail.startport_air = item.text;
			},
			handleSelectFdest(item) {
				this.detail.destport_air = item.text;
			},
			dataleaveFn() {
				this.droplistx = this.detail.boxtypejson;
			},
			datacomFn() {
				console.log(this.droplistx);
				sessionStorage.setItem('droplistx', JSON.stringify(this.droplistx));
				var arr = [];
				this.choosedBox = [];
				this.droplistx.forEach(item => {
					if(item.NUM != 0) {
						this.choosedBox.push(item);
						sessionStorage.setItem('choosedBox', JSON.stringify(this.choosedBox));
						arr.push(item.E_BOX_TYPE + '*' + item.NUM);
					}
					this.boxtype = arr.toString();
				})
				console.log('choosedBox', this.choosedBox);
			},
			totalFn(item) {
				item.total = item.price * item.amount;
			},
			numRequiredFn(value) {
				if(value) {
					var reg = new RegExp("^[0-9]+(.[0-9]{1,100})?$");
					if(reg.test(value)) {
						return false;
					} else {
						return true;
					}
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
			initFn() {
				let params = {
					orderId: this.$route.params.id,
				}
				detailApi(params).then(res => {
					this.detail = res.body.resultdata;
					this.ruleForm = this.detail;
					this.boxtype = this.detail.boxtype;
					this.trafficagent = this.detail.trafficagent;
					if(this.detail.products.length == 0) {
						this.detail.products = this.products;
					}

				})
			},
			getdownFn() {
				let params = {}
				newdownApi(params).then(res => {
					this.down = res.body.resultdata;
				})
			},
			updateFn() {
				if(this.detail.products[this.detail.products.length - 1].prdtcn == '') {
					this.detail.products.splice(this.detail.products.length - 1, 1);
				}
				let params = {
					orderId: this.$route.params.id,
					trafficagent: this.trafficagent,
					transway: this.ruleForm.transway,
					custname: this.ruleForm.custname,
					billno: this.ruleForm.billno,
					contactno: this.ruleForm.contactno,
					saleman: this.ruleForm.saleman,
					tradetype: this.ruleForm.tradetype,
					settletype: this.ruleForm.settletype,
					remark: this.ruleForm.remark,
					consigner: this.detail.consigner,
					reciver: this.detail.reciver,
					notifier: this.detail.notifier,
					boxtype: this.boxtype,
					boxtypejson: JSON.stringify(this.droplistx),
					shipcompany: this.detail.shipcompany,
					throughtime: this.detail.throughtime,
					closetime: this.detail.closetime,
					shiptime: this.detail.shiptime,
					freightrmb: this.detail.freightrmb,
					freightusd: this.detail.freightusd,
					startport: this.detail.startport,
					destport: this.detail.destport,
					transititem: this.detail.transititem,
					freightitem: this.detail.freightitem,
					remark2: this.detail.remark2,
					products: JSON.stringify(this.detail.products),
					airline: this.detail.airline,
					flighttime: this.detail.flighttime,
					startport_air: this.detail.startport_air,
					destport_air: this.detail.destport_air,
				}
				updateApi(params).then(res => {
					if(res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						})
						this.$router.push('/ontime/detail/' + this.$route.params.id)
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
						this.updateFn();
					} else {
						document.documentElement.scrollTop=0;
						return false;
					}
				});
			},
			userFn() {
				let params = {}
				verifyUserApi(params).then(res => {
					this.userlist = res.body.resultdata;
				})
			},
			chooseFn(item) {
				this.appshow = false;
				this.$refs['ruleForm'].validate((valid) => {
					if(valid) {
						if(this.detail.products[this.detail.products.length - 1].prdtcn == '') {
							this.detail.products.splice(this.detail.products.length - 1, 1);
						}
						let params = {
							orderId: this.$route.params.id,
							trafficagent: this.trafficagent,
							transway: this.ruleForm.transway,
							custname: this.ruleForm.custname,
							billno: this.ruleForm.billno,
							contactno: this.ruleForm.contactno,
							saleman: this.ruleForm.saleman,
							tradetype: this.ruleForm.tradetype,
							settletype: this.ruleForm.settletype,
							remark: this.ruleForm.remark,
							consigner: this.detail.consigner,
							reciver: this.detail.reciver,
							notifier: this.detail.notifier,
							boxtype: this.boxtype,
							boxtypejson: JSON.stringify(this.choosedBox),
							shipcompany: this.detail.shipcompany,
							throughtime: this.detail.throughtime,
							closetime: this.detail.closetime,
							shiptime: this.detail.shiptime,
							freightrmb: this.detail.freightrmb,
							freightusd: this.detail.freightusd,
							startport: this.startport,
							destport: this.destport,
							transititem: this.detail.transititem,
							freightitem: this.detail.freightitem,
							remark2: this.detail.remark2,
							products: JSON.stringify(this.detail.products),
							airline: this.detail.airline,
							flighttime: this.detail.flighttime,
							startport_air: this.detail.startport_air,
							destport_air: this.detail.destport_air,
						}
						updateApi(params).then(res => {
							if(res.body.type == 1) {
								let paramsx = {
									orderId: this.$route.params.id,
									toAuditer: item.id,
									toAuditerName: item.name,
								}
								verifyUserSubApi(paramsx).then(resx => {
									if(resx.body.type == 1) {
										this.$message({
											type: 'success',
											message: resx.body.message
										});

									} else {
										this.$message({
											type: 'warning',
											message: resx.body.message
										})
									}
								})
								this.$router.push('/ontime/detail/' + this.$route.params.id)
							} else {
								this.$message({
									type: 'warning',
									message: res.body.message
								})
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			clientFn() {
				let params = {
					pageindex: 1,
					pagesize: 100,
					query: JSON.stringify(this.query),
					custatt: '0',
				}
				addbooklistAPI(params).then(res => {
					this.custOptions = res.body.resultdata;

				})
			},
		},
		watch: {

		},
		mounted() {
			this.$nextTick(() => {
				this.initFn();
			});
			this.getdownFn();
			this.userFn();
			this.clientFn();
			this.dataleaveFn();
			this.setHead();
			this.restaurants = this.loadAll();

		}
	}
</script>

<style>

</style>