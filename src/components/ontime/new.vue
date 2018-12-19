<template>
	<div class="simple-stack" v-loading="loading">
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
							<el-radio-group v-model="ruleForm.transway">
								<el-radio label="1">海运整箱</el-radio>
								<el-radio label="2">海运拼箱</el-radio>
								<el-radio label="3">空运</el-radio>
								<!--<el-radio label="4">快递</el-radio>
								<el-radio label="5">拖车</el-radio> 
								<el-radio label="6">铁路</el-radio>-->
							</el-radio-group>
						</el-form-item>
					</div>
					<div class="block">
						<h1>基本信息</h1>
						<el-form-item prop="billno" label="出口发票号">
							<el-input clearable class="greyInput" v-model="ruleForm.billno" placeholder="请输入出口发票号"></el-input>
						</el-form-item>
						<el-form-item class="addclient" prop="custname" label="客户名称">
							<el-autocomplete clearable popper-class="greyInput" class="greyInput" v-model="ruleForm.custname" :fetch-suggestions="querySearchClient" placeholder="请输入客户名称" :trigger-on-focus="true" @select="handleSelectClient">
								<template slot-scope="{ item }">
									<div class="name">{{ item.text }}</div>
								</template>
							</el-autocomplete>
							<i class="iconfont icon-tianjia" @click="draftFn('1')"></i>
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
					<div class="block">
						<h1>
							<template v-if="ruleForm.transway==1||ruleForm.transway==2">
								海运订舱
							</template>
							<template v-if="ruleForm.transway==3">
								空运订舱
							</template>
							<el-dropdown class="ml20" size="mini" split-button @click="openmuduleFn">
								<span>下载模板</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-upload ref="onekeyupload" :headers="header" 
											class="filebtn ml20"
											 :action="importUrl+'?orderid='+newid" 
											 :on-success="excelSuccessFn"
											 :on-progress="excelProgressFn"
										 multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333" @click="onekeyUploadFn">一键导入</el-button>
										</el-upload>
									</el-dropdown-item>
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=1&keyValue='+newid" :on-success="fileSuccessFn"
										 multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
										</el-upload>
									</el-dropdown-item>									
								</el-dropdown-menu>
							</el-dropdown>
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4" class="hydl">
									<el-autocomplete clearable popper-class="greyInput" class="tbinput" v-model="trafficagent" :fetch-suggestions="querySearchHY" placeholder="请输入货运代理" :trigger-on-focus="true" @select="handleSelectHY">
										<template slot-scope="{ item }">
											<div class="name">{{ item.text }}</div>
										</template>					
									</el-autocomplete>
									<i class="iconfont icon-tianjia" @click="draftFn('2')"></i>
									
									<!--<el-input class="tbinput" v-model="trafficagent" placeholder="请输入货运代理">
										
									</el-input>-->
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input type="textarea" class="tbtext greybg" v-model="consigner" placeholder="请输入发货人"></el-input>
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
							<template v-if="ruleForm.transway==1">
								<!--海运整箱-->
								<tr>
									<td width="92px" rowspan="4" class="title">收货人</td>
									<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
										<el-input type="textarea" class="tbtext" v-model="reciver" placeholder="请输入收货人"></el-input>
									</td>

									<td class="title greybg" colspan="2">箱型*箱量</td>
									<td class="greybg">
										<el-popover placement="bottom-start" width="220" trigger="click" @hide="datacomFn" @show="droplistxFn">
											<ul class="choosebox">
												<li v-for="(item,index) in droplistx" :key="item.ID" v-if="index<4">
													<span class="name">{{item.E_BOX_TYPE}}</span>
													<span>
													   <el-input-number size="mini" :min="0" v-model="item.NUM"></el-input-number>
												    </span>
												</li>
												<li v-if="!moreshow" class="moreshow" @click="moreshow=true">更多箱型</li>
												<li v-for="(item,index) in droplistx" :key="item.ID" v-if="index>=4&&moreshow">
													<span class="name">{{item.E_BOX_TYPE}}</span>
													<span>
													   <el-input-number size="mini" :min="0" v-model="item.NUM"></el-input-number>
												    </span>
												</li>
											</ul>
											<el-input disabled class="tbinput disabled" v-model="boxtype" :title="boxtype" slot="reference" placeholder="请选择箱型*箱量"></el-input>
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
									<td class="title greybg" rowspan="4">通知人</td>
									<td width="350px" class="greybg" rowspan="4">
										<el-input type="textarea" class="tbtext greybg" v-model="notifier" placeholder="请输入通知人"></el-input>
									</td>
									<td class="title">开船</td>
									<td>
										<el-date-picker class="tbdate" v-model="shiptime" type="date" placeholder="请选择开船">
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<td class="title greybg" rowspan="2">运费</td>
									<td class="title greybg">RMB</td>
									<td class="greybg relative">
										<el-input class="tbinput" v-model="freightrmb" placeholder="请输入RMB"></el-input>
										<span v-if="numRequiredFn(freightrmb)" class="numRequired">请输入数字！</span>
									</td>
								</tr>
								<tr>
									<td class="title greybg">USD</td>
									<td class="greybg relative">
										<el-input class="tbinput" v-model="freightusd" placeholder="请输入USD"></el-input>
										<span v-if="numRequiredFn(freightusd)" class="numRequired">请输入数字！</span>
									</td>
								</tr>
								<tr>
									<td class="title bdt0" colspan="2" rowspan="5">备注</td>
									<td class="bdt0" rowspan="5">
										<el-input type="textarea" class="tbtext small" v-model="remark2" placeholder="请输入备注"></el-input>
									</td>
								</tr>
								<tr>
									<td class="title">起运港</td>
									<td class="bdr1">
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="startport" :fetch-suggestions="querySearch" placeholder="请选择起运港" :trigger-on-focus="true" @select="handleSelectStart">
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
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="destport" :fetch-suggestions="querySearch" placeholder="请选择目的港" :trigger-on-focus="true" @select="handleSelect">
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
										<el-select class="tbselect" v-model="transititem" filterable placeholder="请选择运输条款">
											<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
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
							</template>
							<template v-if="ruleForm.transway==2">
								<!--海运拼箱-->
								<tr>
									<td width="92px" rowspan="4" class="title">收货人</td>
									<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
										<el-input type="textarea" class="tbtext" v-model="reciver" placeholder="请输入收货人"></el-input>
									</td>
									<td class="title greybg" colspan="2">船务公司</td>
									<td class="greybg">
										<el-input class="tbinput " v-model="shipcompany" disaled placeholder="请输入船务公司"></el-input>
									</td>

								</tr>
								<tr>
									<td class="title " colspan="2">货好时间</td>
									<td class="">
										<el-date-picker class="tbdate" v-model="throughtime" type="date" placeholder="请选择货好时间">
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<td class="title greybg" rowspan="2">船期</td>
									<td class="title greybg">截关</td>
									<td class="greybg">
										<el-date-picker class="tbdate" v-model="closetime" type="date" placeholder="请选择截关">
										</el-date-picker>
									</td>

								</tr>

								<tr>
									<td class="title greybg">开船</td>
									<td class="greybg">
										<el-date-picker class="tbdate" v-model="shiptime" type="date" placeholder="请选择开船">
										</el-date-picker>
									</td>

								</tr>
								<tr>
									<td class="title greybg" rowspan="4">通知人</td>
									<td width="350px" class="greybg" rowspan="4">
										<el-input type="textarea" class="tbtext greybg" v-model="notifier" placeholder="请输入通知人"></el-input>
									</td>
									<td class="title " rowspan="2">运费</td>
									<td class="title ">RMB</td>
									<td class=" relative">
										<el-input class="tbinput" v-model="freightrmb" placeholder="请输入RMB"></el-input>
										<span v-if="numRequiredFn(freightrmb)" class="numRequired">请输入数字！</span> </td>
								</tr>
								<tr>
									<td class="title ">USD</td>
									<td class="relative">
										<el-input class="tbinput" v-model="freightusd" placeholder="请输入USD"></el-input>
										<span v-if="numRequiredFn(freightusd)" class="numRequired">请输入数字！</span>
									</td>
								</tr>
								<tr>
									<td class="title bdt0" colspan="2" rowspan="6">备注</td>
									<td class="bdt0" rowspan="6">
										<el-input type="textarea" class="tbtext mid" v-model="remark2" placeholder="请输入备注"></el-input>
									</td>
								</tr>

								<tr></tr>
								<tr>
									<td class="title">起运港</td>
									<td class="bdr1">
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="startport" :fetch-suggestions="querySearch" placeholder="请选择起运港" :trigger-on-focus="true" @select="handleSelectStart">
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
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="destport" :fetch-suggestions="querySearch" placeholder="请选择目的港" :trigger-on-focus="true" @select="handleSelect">
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
										<el-select class="tbselect" v-model="transititem" filterable placeholder="请选择运输条款">
											<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
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
							</template>
							<template v-if="ruleForm.transway==3">
								<!--空运-->
								<tr>
									<td width="92px" rowspan="4" class="title">收货人</td>
									<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
										<el-input type="textarea" class="tbtext" v-model="reciver" placeholder="请输入收货人"></el-input>
									</td>
									<td class="title greybg" colspan="2">航空公司</td>
									<td class="greybg">
										<el-input class="tbinput " v-model="airline" disaled placeholder="请输入航空公司"></el-input>
									</td>
								</tr>
								<tr>
									<td class="title " colspan="2">航班时间</td>
									<td class="">
										<el-date-picker class="tbdate" v-model="flighttime" type="date" placeholder="请选择航班时间">
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<td class="title " colspan="2">货好时间</td>
									<td class="">
										<el-date-picker class="tbdate" v-model="throughtime" type="date" placeholder="请选择货好时间">
										</el-date-picker>
									</td>
								</tr>
								<tr>
									<td class="title " rowspan="2">运费</td>
									<td class="title ">RMB</td>
									<td class=" relative">
										<el-input class="tbinput" v-model="freightrmb" placeholder="请输入RMB"></el-input>
										<span v-if="numRequiredFn(freightrmb)" class="numRequired">请输入数字！</span>
									</td>
								</tr>

								<tr>
									<td class="title greybg" rowspan="4">通知人</td>
									<td width="350px" class="greybg" rowspan="4">
										<el-input type="textarea" class="tbtext greybg" v-model="notifier" placeholder="请输入通知人"></el-input>
									</td>
									<td class="title ">USD</td>
									<td class="relative">
										<el-input class="tbinput" v-model="freightusd" placeholder="请输入USD"></el-input>
										<span v-if="numRequiredFn(freightusd)" class="numRequired">请输入数字！</span>
									</td>
								</tr>
								<tr class="clearfix">
									<td class="title bdt0" colspan="2" rowspan="7">备注</td>
									<td class="bdt0" rowspan="7">
										<el-input type="textarea" class="tbtext big" v-model="remark2" placeholder="请输入备注"></el-input>
									</td>
								</tr>
								<tr></tr>
								<tr></tr>
								<tr>
									<td class="title">起运地</td>
									<td class="bdr1">
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="startport_air" :fetch-suggestions="querySearch" placeholder="请选择起运地" :trigger-on-focus="true" @select="handleSelectFStart">
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
										<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto" v-model="destport_air" :fetch-suggestions="querySearch" placeholder="请选择目的地" :trigger-on-focus="true" @select="handleSelectFdest">
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
										<el-select class="tbselect" v-model="transititem" filterable placeholder="请选择运输条款">
											<el-option v-for="item in down.TransitItemOption" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
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
							</template>

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
							<tbody v-for="(itemP,indexP) in products" class="protb" :key="indexP">
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
										<!--<el-input clearable class="tbinput" v-model="itemP.pcs" placeholder="包装件数"></el-input>-->
										<el-autocomplete class="tbinput" v-model="itemP.pcscombine" :fetch-suggestions="querySearchPcs" placeholder="请输入包装件数" @select="((item)=>{handleSelectPcs(item,indexP)})"></el-autocomplete>
										<!--<span v-if="numRequiredFn(itemP.pcs)" class="numRequired">请输入数字！</span>-->
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.grossweight" placeholder="请输入毛重"></el-input>
										<span v-if="numRequiredFn(itemP.grossweight)" class="numRequired">请输入数字！</span>
									</td>
									<td class="relative">
										<el-input clearable class="tbinput" v-model="itemP.vols" placeholder="请输入体积"></el-input>
										<!--<span v-if="numRequiredFn(itemP.vols)" class="numRequired">请输入数字！</span>-->
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
										<el-button size="mini" type="text" v-if="products.length>1" @click="deleteFn(indexP)">删除</el-button>
									</td>
								</tr>
								<tr>
									<td>
										<!--<el-input clearable class="tbinput" v-model="itemP.supplier" placeholder="请输入工厂"></el-input>-->
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
										<el-button v-if="indexP==products.length-1" size="mini" type="text" @click="newProductFn(indexP)">添加产品</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="block">
						<div class="fileblock">
							<fileDrapUploadDetail ref="fileupload" :towdisplay='towdisplay' :waredisplay="waredisplay" :customdisplay="customdisplay" :dingcangid="newid" :FolderId="FolderId"></fileDrapUploadDetail>
						</div>
					</div>
					<div class="block">
						<h1>功能模块</h1>
						<ul class="funTem">
							<li v-for="(item,index) in templates" :class="{'show':item.show,'hide':!item.show}" :key="index" class="clearfix" @click="templateFn(item)">
								<span>{{item.name}}</span>
								<label class="fr" v-if="item.show">隐藏</label>
								<label class="fr" v-else>显示</label>
							</li>
						</ul>
					</div>
					<el-form-item class="ml0">
						<el-popover popper-class="userpop" ref="popover5" placement="top" width="100" v-model="appshow" @show="userFn">
							<ul class="appul">
								<li @click="chooseFn(item)" v-for="(item,index) in userlist" :key="index">{{item.name}}</li>
							</ul>
						</el-popover>
						<el-button type="success" size="small" v-popover:popover5>保存并审批</el-button>
						<!-- <el-button type="success" size="small" @click="">保存并打印</el-button> -->
						<el-button type="success" size="small" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import moment from 'moment'
	import fileDrapUploadDetail from '@/components/commons/fileDrapUploadDetail'
	import {
		newdownApi,
		newApi,
		newidApi,
		portlistApi,
		transwayApi,
		newcidApi,
		verifyUserApi,
		verifyUserSubApi,
		addbooklistAPI,
		pcodeApi,
		filterApi,
		detailApi,
		contactDetailApi,
		updateApi
	} from '@/api/api'
	import {
		droplistx
	} from '@/components/searchLists'
	export default {
		name: 'new',
		components: {
			fileDrapUploadDetail,
		},
		data() {
			return {
				moreshow:false,
				airline: '',
				flighttime: '',
				startport_air: '',
				destport_air: '',
				ppopshow: false,
				ploading: false,
				pOptions: [],
				loading: false,
				towdisplay: true,
				waredisplay: false,
				customdisplay: false,
				custOptions: [],
				query: {
					custname: "",
					country: "",
					serviceMan: "",
				},
				importUrl: 'https://www.gihoo.work/huayong/file//upload/import/transbill',
				fileUrl: 'https://www.jihuobao.net/filecenter/ResourceFile/UploadifyFile?',
				header: {
					Authorization: ''
				},
				FolderId: '0',
				newid: '',
				userlist: [],
				appshow: false,
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
					show: true
				}, {
					name: '报关',
					value: 'customdisplay',
					show: false
				}, {
					name: '仓库',
					value: 'waredisplay',
					show: false
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
				}],
				down: {},
				options: [],
				value8: '',
				ruleForm: {
					transway: '',
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
					// 					billno: [{
					// 						required: true,
					// 						message: '请输入出口发票号',
					// 						trigger: 'blur'
					// 					}],
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
				restaurants: [],
				choosedBox: [],
				pOptions: [],
				restaurants: [],
				pcsX: '',
				queryX: '',
			}
		},
		methods: {
			onekeyUploadFn() {

				this.$refs.onekeyupload.submit();
			},
			cinitFn() {
				let params = {
					orderId: this.$route.params.oid,
				}
				detailApi(params).then(res => {
					var newparams = res.body.resultdata;
					this.newid = this.$route.params.oid;
					this.trafficagent = newparams.trafficagent;
					this.ruleForm.transway = newparams.transway.toString();
					this.ruleForm.billno = newparams.billno;
					this.ruleForm.custname = newparams.custname;
					this.ruleForm.contactno = newparams.contactno;
					this.ruleForm.saleman = newparams.saleman;
					this.ruleForm.tradetype = newparams.tradetype;
					this.ruleForm.settletype = newparams.settletype;
					this.ruleForm.remark = newparams.remark;
					this.consigner = newparams.consigner;
					this.reciver = newparams.reciver;
					this.notifier = newparams.notifier;
					this.boxtype = newparams.boxtype;
					this.droplistx = JSON.parse(newparams.boxtypejson);
					this.shipcompany = newparams.shipcompany;
					this.throughtime = newparams.throughtime;
					this.closetime = newparams.closetime;
					this.shiptime = newparams.shiptime;
					this.freightrmb = newparams.freightrmb;
					this.freightusd = newparams.freightusd;
					this.startport = newparams.startport;
					this.destport = newparams.destport;
					this.transititem = newparams.transititem;
					this.freightitem = newparams.freightitem;
					this.remark2 = newparams.remark2;
					this.products = newparams.products;
					this.airline = newparams.airline;
					this.flighttime = newparams.flighttime;
					this.startport_air = newparams.startport_air;
					this.destport_air = newparams.destport_air;
					this.custinitFn();
					if(newparams.towdisplay == '1') {
						this.templates[0].show = true;
					} else {
						this.templates[0].show = false;
					}
					if(newparams.customdisplay == "1") {
						this.templates[1].show = true;
					} else {
						this.templates[1].show = false;
					}
					if(newparams.customdisplay == '1') {
						this.templates[2].show = true;
					} else {
						this.templates[2].show = false;
					}
				})
			},
			custinitFn() {
				let params = {
					customerId: this.$route.params.cid
				}
				contactDetailApi(params).then(res => {
					if(this.$route.params.type == '1') {
						this.ruleForm.custname = res.body.resultdata.custsimpname;
					} else {
						this.trafficagent = res.body.resultdata.custsimpname;
					}
				})
			},
			pcodeFn(item) {
				var query = {}
				query.product_number = item.product_number;
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
				item.product_number = pitem.product_number;
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
			querySearchHY(queryString, cb) {
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
			handleSelectHY(item) {
				this.trafficagent = item.text;
			},
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
				this.products[indexP].pcscombine = this.pcsX + item.value;
				this.products[indexP].pcs = this.pcsX;
				this.products[indexP].packtype = item.value;
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
				this.products[indexP].prdtcode = item.product_number;
				this.products[indexP].hscode = item.hscode;
				this.products[indexP].prdtcn = item.name;
				this.products[indexP].prdten = item.enname;
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
				this.products[indexP].supplier = item.text
			},
			deleteFn(index) {
				this.products.splice(index, 1);
			},
			droplistxFn() {
				if(!this.boxtype) {
					this.droplistx = [{
							"ID": 10009,
							"E_BOX_TYPE": "20GP",
							'NUM': ""
						},
						{
							"ID": 10010,
							"E_BOX_TYPE": "40GP",
							'NUM': ""
						},
						{
							"ID": 10011,
							"E_BOX_TYPE": "40HQ",
							'NUM': ""
						},
						{
							"ID": 10131,
							"E_BOX_TYPE": "45HQ",
							'NUM': ""
						},
						{
							"ID": 14087,
							"E_BOX_TYPE": "20OT",
							'NUM': ""
						},
						{
							"ID": 14088,
							"E_BOX_TYPE": "40Ot",
							'NUM': ""
						},
						{
							"ID": 14089,
							"E_BOX_TYPE": "20Rh",
							'NUM': ""
						},
						{
							"ID": 14090,
							"E_BOX_TYPE": "40RH",
							'NUM': ""
						},
						{
							"ID": 14091,
							"E_BOX_TYPE": "20NOR",
							'NUM': ""
						},
						{
							"ID": "14092",
							"E_BOX_TYPE": "40NOR",
							'NUM': ""
						}
					]
				}
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
			setHead() {
				let code = Cookies.get('gihoo_v1.1_token');
				if(code) {
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
				this.products.push(ob);
			},
			openmuduleFn() {
				window.open('https://www.gihoo.work/huayong/module.xls')
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
						console.log(this.products);
						if(this.products.length == 1 &&
							this.products[0].amount == '' &&
							this.products[0].grossweight == '' &&
							this.products[0].netweight == '' &&
							this.products[0].pcs == '' &&
							this.products[0].pid == '' &&
							this.products[0].prdtcn == '' &&
							this.products[0].prdten == '' &&
							this.products[0].price == '' &&
							this.products[0].suppilier == '' &&
							this.products[0].total == '' &&
							this.products[0].vols == ''
						) {
							this.$message({
								type: 'warning',
								message: '请输入产品！'
							})
						} else if(this.ruleForm.transway == '1' && this.boxtype == '') {
							this.$message({
								type: 'warning',
								message: '箱型*箱量！'
							})
						} else {
							console.log('save')
							if(this.products[this.products.length - 1].prdtcn == '') {
								this.products.splice(this.products.length - 1, 1);
							}

							let params = {
								isdraft: '0',
								orderId: this.newid,
								trafficagent: this.trafficagent,
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
								boxtypejson: JSON.stringify(this.droplistx),
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
								waredisplay: this.templates[2].show ? 1 : 0,
								towdisplay: this.templates[0].show ? 1 : 0,
								customdisplay: this.templates[1].show ? 1 : 0,
								airline: this.airline,
								flighttime: this.flighttime,
								startport_air: this.startport_air,
								destport_air: this.destport_air,
							}
							newApi(params).then(res => {
								if(res.body.type == 1) {
									let paramsx = {
										orderId: this.newid,
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
									this.$router.push('/ontime/list');
								} else {
									this.$message({
										type: 'warning',
										message: res.body.message
									})
								}
							})
						}
					}

				});
			},
			fileSuccessFn(res) {
				if(res.error == 0) {
					this.$refs.fileupload.getFilesFn();
					this.$message({
						message: res.errmsg,
						type: 'success'
					});

				} else {
					this.$message({
						message: res.errmsg,
						type: 'warning'
					});
				}

			},
			excelProgressFn(event, file, fileList) {
				this.loading = true;
				console.log(event, file, fileList)
			},
			excelSuccessFn(res) {
				if(res.success) {

					var detail = res.resultdata;
					this.ruleForm.custname = detail.custname;
					this.ruleForm.contactno = detail.contactno;
					this.ruleForm.settletype = detail.settletype;
					this.ruleForm.tradetype = detail.tradetype;
					this.startport = detail.startport;
					this.destport = detail.destport;
					this.products = [];
					detail.products.forEach(item => {
						item.product_number = item.prdtcode;
						this.products.push(item);
					})
					setTimeout(() => {
						this.loading = false;
						this.$message({
							type: 'success',
							message: res.message,
						});
					}, 300)

				} else {
					this.loading = false;
					this.$message({
						type: 'warning',
						message: res.message,
					})
				}
			},
			datacomFn() {
				console.log(this.droplistx);
				this.moreshow=false;
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
				this.towdisplay = this.templates[0].show;
				this.waredisplay = this.templates[1].show;
				this.customdisplay = this.templates[2].show;
				console.log('item', this.templates[0], item)

				this.$refs.fileupload.getFilesFn();
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
			draftFn(type) {
				let params = {
					isdraft: '1',
					orderId: this.newid ? this.newid : this.$route.params.oid,
					trafficagent: this.trafficagent,
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
					boxtypejson: JSON.stringify(this.droplistx),
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
					templates: JSON.stringify(this.templates),
					waredisplay: this.templates[2].show ? 1 : 0,
					towdisplay: this.templates[0].show ? 1 : 0,
					customdisplay: this.templates[1].show ? 1 : 0,
					airline: this.airline,
					flighttime: this.flighttime,
					startport_air: this.startport_air,
					destport_air: this.destport_air,
				}
				newApi(params).then(res => {
					if(res.body.type == 1) {
						var orderId = this.newid ? this.newid : this.$route.params.oid;
						this.$router.push('/addbook/new/' + orderId + '/' + type + '/' + this.ruleForm.transway);
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
				})
			},
			newFn() {
				if(this.ruleForm.transway == '1' && this.boxtype == '') {
					this.$message({
						type: 'warning',
						message: '箱型*箱量！'
					})
				} else {
					console.log('xx11')
					if(this.products.length > 1 && this.products[this.products.length - 1].prdtcn == '') {
						this.products.splice(this.products.length - 1, 1);
					}
					let params = {
						isdraft: '0',
						orderId: this.newid ? this.newid : this.$route.params.oid,
						trafficagent: this.trafficagent,
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
						boxtypejson: JSON.stringify(this.droplistx),
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
						waredisplay: this.templates[2].show ? 1 : 0,
						towdisplay: this.templates[0].show ? 1 : 0,
						customdisplay: this.templates[1].show ? 1 : 0,
						airline: this.airline,
						flighttime: this.flighttime,
						startport_air: this.startport_air,
						destport_air: this.destport_air,
					}
					if(this.$route.params.oid) {
						updateApi(params).then(res => {
							if(res.body.type == 1) {
								this.$message({
									type: 'success',
									message: res.body.message
								});
								this.$router.push('/ontime/list')
							} else {
								this.$message({
									type: 'warning',
									message: res.body.message
								})
							}
						})
					} else {
						newApi(params).then(res => {
							if(res.body.type == 1) {
								this.$message({
									type: 'success',
									message: res.body.message
								});
								this.$router.push('/ontime/list')
							} else {
								this.$message({
									type: 'warning',
									message: res.body.message
								})
							}
						})
					}

				}

			},

			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.newFn();
					} else {
						document.documentElement.scrollTop = 0;
						return false;
					}
				});
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
				this.destport = item.text;
			},
			handleSelectStart(item) {
				this.startport = item.text;
			},
			handleSelectFStart(item) {
				this.startport_air = item.text;
			},
			handleSelectFdest(item) {
				this.destport_air = item.text;
			},
			newidFn() {
				let params = {}
				newcidApi(params).then(res => {
					this.newid = res.body.resultdata;
					console.log('newid', this.newid);
				})
			}
		},
		mounted() {
			this.setHead();
			this.getdownFn();
			this.userFn();
			this.clientFn();
			this.restaurants = this.loadAll();

			this.$nextTick(() => {
				if(this.$route.params.oid) {
//					this.newid = this.$route.params.oid;
					this.cinitFn();
				} else {
					this.newidFn();
					this.ruleForm.transway = this.$route.params.id;
				}
			})

		}
	}
</script>

<style lang="scss" scoped>

</style>