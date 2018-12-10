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
							<span v-if="detail.sharecount">{{detail.sharecount}}</span>
							<span v-else>0</span>
							<label>共享</label>
						</li>
						<li @click="$router.push('/ontime/edit/'+$route.params.id)">
							<i class="iconfont icon-bianji"></i>
							<label>编辑</label>
						</li>
						<li @click="$router.push('/ontime/setting/'+$route.params.id)">
							<i class="iconfont icon-set"></i>
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

					<div class="block" v-if="detail.transway=='1'">
						<!--海运整箱-->
						<h1>
							海运订舱
							<el-dropdown class="ml20" size="mini" split-button @click="downExcelFn">
								下载委托单
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click="viewExcelFn">预览委托单</el-dropdown-item>
									<!-- <el-dropdown-item @click.native="downExcelFn">下载委托单</el-dropdown-item>									 -->
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=1&keyValue='+$route.params.id"
										 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
										</el-upload>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0" >
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4" class="tdfl">
									<span>{{detail.trafficagent}}</span>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input disabled type="textarea" class="tbtext disgrey" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
								</td>
								<td width="112px" class="title greybg" colspan="2">出口发票号</td>
								<td width="290px" class="greybg tdfl">
									<span>{{detail.billno}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">合同号</td>
								<td class="tdfl">
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
								<td class="tdfl">
									<span>{{detail.tradetype}}</span>
								</td>
							</tr>
							</td>
							</tr>
							<tr>
								<td width="92px" rowspan="4" class="title ">收货人</td>
								<!-- <td rowspan="4" width="350px" class="tdfl">
									<span>{{detail.reciver}}</span>
								</td> -->
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input  disabled type="textarea" class="tbtext diswhite" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>
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
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in detail.products" class="protb" :key="index">
								<tr>
									<td>
										{{item.prdtcode}}

									</td>
									<td>
										{{item.prdtcn}}

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
										{{item.supplier}}
									</td>
									<td>
										{{item.prdten}}
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
										{{item.contactno}}
									</td>
									<td>{{item.hscode}}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="block" v-if="detail.transway=='2'">
						<!--海运拼箱-->
						<h1>
							海运订舱
							<el-dropdown class="ml20" size="mini" split-button @click="downExcelFn">
								下载委托单
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click="viewExcelFn">预览委托单</el-dropdown-item>
									<!-- <el-dropdown-item @click.native="downExcelFn">下载委托单</el-dropdown-item>									 -->
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=1&keyValue='+$route.params.id"
										 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
										</el-upload>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0" >
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4" class="tdfl">
									<span>{{detail.trafficagent}}</span>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input disabled type="textarea" class="tbtext disgrey" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
								</td>
								<td width="112px" class="title greybg" colspan="2">出口发票号</td>
								<td width="290px" class="greybg tdfl">
									<span>{{detail.billno}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">合同号</td>
								<td class="tdfl">
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
								<td class="tdfl">
									<span>{{detail.tradetype}}</span>
								</td>
							</tr>
							</td>
							</tr>
							<tr>
								<td width="92px" rowspan="4" class="title ">收货人</td>
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input  disabled type="textarea" class="tbtext diswhite" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>	
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
								<td class="title">开船</td>
								<td class="tdfl">
									<span>{{detail.shiptime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">通知人</td>
								<td class="greybg tdfl">
									<span>{{detail.notifier}}</span>
								</td>
								<td class="title greybg" rowspan="2">运费</td>
								<td class="title greybg">RMB</td>
								<td class="greybg tdfl">
									<span>{{detail.freightrmb}}</span>
								</td>
							</tr>
							<tr>
								<td class="title">起运港</td>
								<td class="tdfl">
									<span>{{detail.startport}}</span>
								</td>
								<td class="title greybg">USD</td>
								<td class="greybg tdfl">
									<span>{{detail.freightusd}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">目的港</td>
								<td class="greybg tdfl ">
									<span>{{detail.destport}}</span>
								</td>
								<td class="title bdt0" colspan="2" rowspan="3">备注</td>
								<td class="bdt0 tdfl" rowspan="3">
									<span>{{detail.remark}}</span>
								</td>
							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td class="tdfl bdr1">
									<span>{{detail.transititem}}</span>
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
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in detail.products" class="protb" :key="index">
								<tr>
									<td>
										{{item.prdtcode}}

									</td>
									<td>
										{{item.prdtcn}}

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
										{{item.supplier}}
									</td>
									<td>
										{{item.prdten}}
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
										{{item.contactno}}
									</td>
									<td>{{item.hscode}}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="block" v-if="detail.transway=='3'">
						<!--空运-->
						<h1>
							空运
							<el-dropdown class="ml20" size="mini" split-button @click="downExcelFn">
								下载委托单
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click="viewExcelFn">预览委托单</el-dropdown-item>
									<!-- <el-dropdown-item @click.native="downExcelFn">下载委托单</el-dropdown-item>									 -->
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=1&keyValue='+$route.params.id"
										 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
										</el-upload>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0" >
							<tr>
								<td width="93px" class="name">货运代理:</td>
								<td colspan="4" class="tdfl">
									<span>{{detail.trafficagent}}</span>
								</td>
							</tr>
							<tr>
								<td rowspan="4" class="title greybg">发货人</td>
								<td rowspan="4" width="350px" class="greybg tdfl" style="height:144px;padding-left:0;">
									<el-input disabled type="textarea" class="tbtext disgrey" v-model="detail.consigner" placeholder="请输入发货人"></el-input>
								</td>
								<td width="112px" class="title greybg" colspan="2">出口发票号</td>
								<td width="290px" class="greybg tdfl">
									<span>{{detail.billno}}</span>
								</td>
							</tr>
							<tr>
								<td class="title" colspan="2">合同号</td>
								<td class="tdfl">
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
								<td class="tdfl">
									<span>{{detail.tradetype}}</span>
								</td>
							</tr>
							</td>
							</tr>
							<tr>
								<td width="92px" rowspan="4" class="title ">收货人</td>
								<td rowspan="4" width="350px" style="height:144px;padding-left:0;">
									<el-input  disabled type="textarea" class="tbtext diswhite" v-model="detail.reciver" placeholder="请输入收货人"></el-input>
								</td>	
								<td class="title" colspan="2">航空公司</td>
								<td class="tdfl">
									<span>{{detail.airline}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">航班时间</td>
								<td class="greybg tdfl">
									<span>{{detail.flighttime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg" colspan="2">货好时间</td>
								<td class="greybg tdfl">
									<span>{{detail.throughtime|moment}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg" rowspan="2">运费</td>
								<td class="title greybg">RMB</td>
								<td class="greybg tdfl">
									<span>{{detail.freightrmb}}</span>
								</td>
							</tr>
							
							<tr>
								<td class="title greybg">通知人</td>
								<td class="greybg tdfl">
									<span>{{detail.notifier}}</span>
								</td>
								<td class="title greybg">USD</td>
								<td class="greybg tdfl">
									<span>{{detail.freightusd}}</span>
								</td>
							</tr>
							<tr>
								<td class="title">起运地</td>
								<td class="tdfl">
									<span>{{detail.startport_air}}</span>
								</td>
								<td class="title bdt0" colspan="2" rowspan="4">备注</td>
								<td class="bdt0 tdfl" rowspan="4">
									<span>{{detail.remark}}</span>
								</td>
							</tr>
							<tr>
								<td class="title greybg">目的地</td>
								<td class="greybg tdfl bdr1">
									<span>{{detail.destport_air}}</span>
								</td>
								
							</tr>
							<tr>
								<td class="title">运输条款</td>
								<td class="tdfl bdr1">
									<span>{{detail.transititem}}</span>
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
									<th width="135px">产品编号/工厂/合同号</th>
									<th width="180px">中英品名/HS编码</th>
									<th width="127px">包装件数/数量</th>
									<th width="90px">毛重/净重(KGS)</th>
									<th width="90px">体积</th>
									<th width="90px">单价</th>
									<th width="93px">总价格</th>
								</tr>
							</thead>
							<tbody v-for="(item,index) in detail.products" class="protb" :key="index">
								<tr>
									<td>
										{{item.prdtcode}}

									</td>
									<td>
										{{item.prdtcn}}

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
										{{item.supplier}}
									</td>
									<td>
										{{item.prdten}}
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
										{{item.contactno}}
									</td>
									<td>{{item.hscode}}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
					
					<div class="block" v-if="towdisplay">
						<h1>拖车
							<el-dropdown class="ml20" size="mini" split-button @click="goTrailerFn">
								<a >安排拖车</a>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=2&keyValue='+$route.params.id"
										 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
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
							<tr v-if="trailList.length==0">
								<td colspan="7" class="nodata">暂无数据</td>
							</tr>
							<tr v-else v-for="(item,index) in trailList" :key="index">
								<td>{{item.BOX_TYPE}}</td>
								<td>{{item.BOX_NO}}</td>
								<td>{{item.SEAL_NO}}</td>
								<td>{{item.ENDDAY|moment}}</td>
								<td>{{item.gongChang}}</td>
								<td>{{item.BOX_STATUS}}</td>
								<td>
									<router-link :to="'/Box/Info/'+$route.params.id+'/'+item.Id" v-if="item.isdraft==0">查看详情</router-link>
								</td>
							</tr>
						</table>
					</div>

					<div class="block" v-if="waredisplay">
						<h1>仓库
							<el-dropdown class="ml20" size="mini" split-button>
								新建进仓单
								<el-dropdown-menu slot="dropdown">

									<el-dropdown-item>
										<el-dropdown-item>
											<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=3&keyValue='+$route.params.id"
											 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
												<el-button size="small" type="text" style="color:#333">上传文件</el-button>
											</el-upload>
										</el-dropdown-item>
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

					<div class="block" v-if="customdisplay">
						<h1>报关
							<el-dropdown class="ml20" size="mini" split-button>
								新建报关单
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>
										<el-upload :headers="header" class="filebtn ml20" :action="fileUrl+'module=4&keyValue='+$route.params.id"
										 :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
											<el-button size="small" type="text" style="color:#333">上传文件</el-button>
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
						<div class="fileblock">
							<fileDrapUploadDetail ref="fileupload" :towdisplay='towdisplay' :waredisplay="waredisplay" :customdisplay="customdisplay"
							 :dingcangid="$route.params.id" :FolderId="FolderId"></fileDrapUploadDetail>
						</div>
					</div>
					<div class="footer">
						<ul class="Tblock">
							<li v-for="(item,index) in templates" :key="index" v-if="!item.show" @click="setFn(item)">{{item.name}}</li>
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
	import fileDrapUploadDetail from '@/components/commons/fileDrapUploadDetail'
	import {
		detailApi,
		settingGetApi,
		settingUpdateApi,
		trailerListApi,
	} from '@/api/api'
	export default {
		name: 'new',
		components: {
			fileDrapUploadDetail,
		},
		data() {
			return {
				excelUrl: 'http://120.26.212.93:8085/trans/export/transbill',
				fileUrl: 'https://www.jihuobao.net/filecenter/ResourceFile/UploadifyFile?',
				header: {
					Authorization: ''
				},
				FolderId: '0',
				trailList: [],
				towdisplay: false,
				waredisplay: false,
				customdisplay: false,
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
				// 				templates: [{
				// 					name: '拖车',
				// 					value: 'towdisplay',
				// 					show: false
				// 				},
				// 				{
				// 					name: '报关',
				// 					value: 'customdisplay',
				// 					show: true
				// 				}, {
				// 					name: '仓库',
				// 					value: 'waredisplay',
				// 					show: true
				// 				},
				// 				],
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
				templates: [],
			}
		},
		methods: {
			viewExcelFn() {},
			downExcelFn() {
				var token = "";
				token = sessionStorage.getItem('code');
				console.log("222");
				window.location.href = this.excelUrl + '?orderid=' + this.$route.params.id + '&token=Bearer ' + token;
				// window.location.href="https://www.baidu.com";   
			},
			newProductFn(index) {
				var length = this.detail.products.length;
				console.log(index, length, this.detail.products[index]);
				// 				if (this.detail.products[index].prdtcn &&
				// 					this.detail.products[index].supplier &&
				// 					this.detail.products[index].pcs &&
				// 					this.detail.products[index].grossweight &&
				// 					this.detail.products[index].vols &&
				// 					this.detail.products[index].price &&
				// 					this.detail.products[index].prdten &&
				// 					this.detail.products[index].contactno &&
				// 					this.detail.products[index].amount &&
				// 					this.detail.products[index].netweight &&
				// 					this.detail.products[index].hscode
				// 				) {
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
				// 				} else {
				// 					this.$message({
				// 						type: 'warning',
				// 						message: '请去编辑页输入完整产品参数！'
				// 					})
				// 				}
			},
			setHead() {
				let code = sessionStorage.getItem('code');
				if (code) {
					this.header.Authorization = 'Bearer ' + code;
				}
			},
			fileSuccessFn(res) {
				if (res.error == 0) {
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
			goTrailerFn() {
				if(this.detail.boxtype){
					this.$router.push('/ontime/newTrailer/' + this.$route.params.id);
				}else{
					this.$message({
						type:'warning',
						message:'安排拖车前必填箱型*箱量'
					})
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
				})
			},
			temInitFn() {
				let params = {
					orderId: this.$route.params.id,
				}
				settingGetApi(params).then(res => {
					this.templates = res.body.resultdata;
					this.showFn();
				})
			},
			showFn() {
				this.templates.forEach(item => {
					if (item.value == "towdisplay") {
						this.towdisplay = item.show;
						console.log('item', item)
					} else
					if (item.value == "customdisplay") {
						this.customdisplay = item.show;
					} else
					if (item.value == "waredisplay") {
						this.waredisplay = item.show;
					}
				})
			},
			trailerFn() {
				let params = {
					dingCangId: this.$route.params.id,
				}
				trailerListApi(params).then(res => {
					this.trailList = res.resultdata;
				})
			},
			setFn(item) {
				item.show = true;
				let params = {
					orderId: this.$route.params.id,
					data: JSON.stringify(this.templates),
				}
				settingUpdateApi(params).then(res => {
					if (res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						});
						this.showFn();
						this.$refs.fileupload.getFilesFn();
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
				})
			}

		},
		mounted() {
			this.$nextTick(()=>{
				this.initFn();
			})
			
			this.setHead();
			this.trailerFn();
			this.temInitFn();
		}
	}
</script>

<style>

</style>
