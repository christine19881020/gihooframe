import request from '@/utils/request'
import store from '../store'
let BasicsUrl = _ApiUrl;
let BasicsUrlTC = "https://www.jihuobao.net/Gihoo/punctuality"
let fileUrl = "https://www.jihuobao.net/filecenter"

//code换身份
export function tokenCodeApi() {
	return request({
		url: "https://www.jihuobao.net/cas2/rest/me",
		method: 'get'
	})
}

//伙伴例表数据
//https://www.jihuobao.net/Gihoo/punctuality/user/teamlist?pagesize=10&currentpage=1
export function teamlistApi(params) {
	return request({
		url: "https://www.jihuobao.net/Gihoo/punctuality/user/teamlist",
		method: 'get',
		params
	})
}
 // 外贸系统/com.trade.trans.tstatus.update([设置]出运状态更新)
export function goexportApi(params) {
	params.method = "com.trade.trans.tstatus.update";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}


//列表接口
// com.trade.trans.order.query
export function ontimelistApi(params) {
	params.method = "com.trade.trans.order.querylist";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}

//列表下拉
//com.trade.option.order.search
export function downApi(params) {
	params.method = "com.trade.option.order.search";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

// 外贸系统/com.trade.option.order.handle(新增、编辑订单下拉绑定)
export function newdownApi(params) {
	params.method = "com.trade.option.order.handle";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

// 外贸系统/com.trade.trans.order.get([详情信息-1]获取订单信息)
export function detailApi(params) {
	params.method = "com.trade.trans.order.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
//新建创建ID
// com.trade.options.order.getid
export function newcidApi(params) {
	params.method = "com.trade.options.order.getid";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

//外贸系统/com.trade.trans.order.add([新建订单]新增)
export function newApi(params) {
	params.method = "com.trade.trans.order.add";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
// 外贸系统/com.trade.trans.export.transbill([订单新建] 订单数据导出)
//  export function excelExportApi(params) {
//  	params.method = "com.trade.trans.export.transbill";
//  	return request({
//  		url: BasicsUrl,
//  		method: 'get',
//  	    params
//  	})
//  }

// 外贸系统/com.trade.trans.order.update([编辑订单]订单编辑)
export function updateApi(params) {
	params.method = "com.trade.trans.order.update";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}

//外贸系统/com.trade.trans.setting.get([设置]获取配置信息)   
export function setInitApi(params) {
	params.method = "com.trade.trans.setting.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

//外贸系统/com.trade.trans.setting.update([设置]设置配置项)
export function setApi(params) {
	params.method = "com.trade.trans.setting.update";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}


// 外贸系统/com.trade.trans.order.share([共享]共享订单)
export function shareApi(params) {
	params.method = "com.trade.trans.share.touser";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
};
//  外贸系统/com.trade.trans.share.find([共享] 共享人员数据获取 20181121)
export function sharelistApi(params) {
	params.method = "com.trade.trans.share.find";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
};
//港口数据源 20181121
export function portlistApi(params) {
	params.method = "com.trade.option.order.port";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
};
//外贸系统/com.trade.trans.transway.update([设置]设置运输方式 20181121)
export function transwayApi(params) {
	params.method = "com.trade.trans.transway.update";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
};
///////////////////////////////////////
// [通讯录]
//  外贸系统/com.contact.customer.operate.search(公司信息搜索)
export function addbooklistAPI(params) {
	params.method = "com.contact.customer.operate.search";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
// 外贸系统/com.contact.option.customer.searchoption(搜索页下拉数据源)
export function addbookdownAPI(params) {
	params.method = "com.contact.option.customer.searchoption";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.contact.customer.operate.add([客户新建信息]新增客户)
export function newclientApi(params) {
	params.method = "com.contact.customer.operate.add";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
//抢单APP(车队)/com.contact.option.customer.users([客户新建信息] 维护人员数据源)
export function servicemanApi(params) {
	params.method = "com.contact.option.customer.users";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.contact.customer.operate.get([客户详情信息])
export function contactDetailApi(params) {
	params.method = "com.contact.customer.operate.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.contact.customer.operate.update([客户编辑])
export function contactEditApi(params) {
	params.method = "com.contact.customer.operate.update";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}

//  外贸系统/com.contact.customer.setting.get([客户模块设置] 获取设置)
export function cusSetInitApi(params) {
	params.method = "com.contact.customer.setting.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.contact.customer.setting.update([客户模块设置]设置操作)
export function cusSetSaveApi(params) {
	params.method = "com.contact.customer.setting.update";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
// 外贸系统/com.contact.customer.operate.addlink([客户详细信息] 新增联系人)
export function addcusApi(params) {
	params.method = "com.contact.customer.operate.addlink";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
 // 外贸系统/com.trade.general.res.getcode([通用]产生客户号码)
 export function companycodeApi(params) {
 	params.method = "com.trade.general.res.getcode";
 	return request({
 		url: BasicsUrl,
 		method: 'get',
 	    params
 	})
 }
 //导出
 
///////////////////////////////////////
//拖车【浩良】
//外贸系统/com.dingcang.tuoche.order.createid(【订舱详情页-新建拖车订单获取预先创建的订单ID】)   
export function newidApi(params) {
	params.method = "com.dingcang.tuoche.order.createid";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
//外贸系统/ com.dingcang.tuoche.order.add(【订舱详情页-新建拖车订单】)
export function newTrailApi(params) {
	params.method = "com.dingcang.tuoche.order.add";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}
// 外贸系统/com.trade.trans.setting.get([设置]获取配置信息)
export function settingGetApi(params) {
	params.method = "com.trade.trans.setting.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
//外贸系统/com.trade.trans.setting.update([设置]设置配置项20181121)
export function settingUpdateApi(params) {
	params.method = "com.trade.trans.setting.update";
	return request({
		url: BasicsUrl,
		method: 'post',
		data: params
	})
}

//外贸系统/com.trade.trans.share.quit([共享]退出共享20181122)
export function quitShareApi(params) {
	params.method = "com.trade.trans.share.quit";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

// 外贸系统/com.trade.options.order.auditusers([审核详细] 获取审核人员表)
export function verifyUserApi(params) {
	params.method = "com.trade.options.order.auditusers";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.trade.trans.audit.askaudit([审核详情]提交审核)
export function verifyUserSubApi(params) {
	params.method = "com.trade.trans.audit.askaudit";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}

// 外贸系统/com.trade.trans.audit.notice([审核数据]待审核消息)
export function verifyListApi(params) {
	params.method = "com.trade.trans.audit.notice";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
// 外贸系统/com.trade.trans.audit.get([审批详情] 获取审批详细数据)
export function verifyDetailApi(params) {
	params.method = "com.trade.trans.audit.get";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}
//外贸系统/com.trade.trans.audit.doaudit([审核详情]审核操作)
export function verifyApi(params) {
	params.method = "com.trade.trans.audit.doaudit";
	return request({
		url: BasicsUrl,
		method: 'get',
		params
	})
}



//浩良接口
//拖车列表
///punctuality/order/DinCangBoxList?dingCangId=afde4dc2-0e38-49bb-9614-1e0bb375f3bd
export function trailerListApi(params) {
	return request({
		url: BasicsUrlTC + "/order/DinCangBoxList",
		method: 'get',
		params
	})
}

//拖车准时达
//准时达 订单ID生成
//http://121.40.217.143:8788/punctuality/order/createid
export function createid(params) {
	return request({
		url: BasicsUrlTC + "/order/createid",
		method: 'get',
		params
	})
}

//准时达--添加订单
//http://121.40.217.143:8788/punctuality/order/add?token=
export function addOrder(params) {
	return request({
		url: BasicsUrlTC + "/order/add",
		method: 'post',
		data: params
	})
}

//订单详情页
//http://121.40.217.143:8788/punctuality/order/details?orderid=
export function orderDetailApi(params, orderid) {
	return request({
		url: BasicsUrlTC + "/order/details?orderid=" + orderid,
		method: 'get',
		params
	})
}


//草稿编辑页 保存草稿操作
//http://121.40.217.143:8788/punctuality/order/ModifyDraft?id=
export function ModifyDraftApi(params, id) {
	return request({
		url: BasicsUrlTC + "/order/ModifyDraft?id=" + id,
		method: 'post',
		data: params
	})
}

//Punctuality/User/ModifyStatus
export function firstApi(params) {
	return request({
		url: BasicsUrlTC + "/User/ModifyStatus",
		method: 'post',
		params
	})
}

//联级地址 街道获取
export function townlist(params) {
	params.method = "com.jihuo.areas.townlist";
	return request({
		url: "https://www.jihuobao.net/jihuo/rest/ApiRest/Index",
		method: 'get',
		params
	})
}

//修改箱子
//http://121.40.217.143:8788/punctuality/order/modifybox?boxid=
export function modifyboxApi(params, boxid) {
	return request({
		url: BasicsUrlTC + "/order/modifybox?boxid=" + boxid,
		method: 'post',
		data: params
	})
}

//新增箱子
//http://121.40.217.143:8788/punctuality/order/addbox?
export function addboxApi(params, bindorderid, lading_num) {
	return request({
		url: BasicsUrlTC + "/order/addbox?bindorderid=" + bindorderid + "&lading_num=" + lading_num,
		method: 'post',
		data: params
	})
}

//删除文件
//Punctuality/ResourceFile/RemoveFolderOrFile?keyValue=&fileType=file
export function removefileApi(params, keyValue) {
	return request({
		url: BasicsUrlTC + "/ResourceFile/RemoveFolderOrFile?keyValue=" + keyValue + "&" + "fileType=file",
		method: 'post',
		data: params
	})
}

//文件上传 获取文件
//http://121.40.217.143:8788/punctuality/resourceFile/getlistjson?orderid
export function getfiles(params) {
	return request({
		url: BasicsUrlTC + "/resourceFile/getlistjson",
		method: 'get',
		params
	})
}

//添加地址
//http://121.40.217.143:8788/punctuality/address/add
export function addAddressApi(params) {
	return request({
		url: BasicsUrlTC + "/address/add",
		method: 'post',
		data: params
	})
}

//获取地址
//http://121.40.217.143:8788/punctuality/address/getlist
export function getAddressApi(params) {
	return request({
		url: BasicsUrlTC + "/address/list",
		method: 'get',
		params
	})
}

//修改地址
//http://121.40.217.143:8788/punctuality/address/modify?id=
export function modifyAddressApi(params, id) {
	return request({
		url: BasicsUrlTC + "/address/modify?id=" + id,
		method: 'post',
		data: params
	})
}

//删除地址
//http://121.40.217.143:8788/punctuality/address/delete?id=
export function deleteAddressApi(params, id) {
	return request({
		url: BasicsUrlTC + "/address/delete?id=" + id,
		method: 'post',
		data: params
	})
}

//文件上传
// 1.订舱详情底部文件模块例表
// https://www.jihuobao.net/filecenter/ResourceFile/GetDingCangFileList?keyvalue=123
export function TaskListJsonAPI(params) {
	return request({
		url: fileUrl + "/ResourceFile/GetDingCangFileList",
		method: 'get',
		params
	})
}

//通讯录文件获取
// https://www.jihuobao.net/filecenter/ResourceFile/GetModuleFileList?Module=&keyValue=
export function usergetfilesAPI(params) {
	return request({
		url: fileUrl + "/ResourceFile/GetModuleFileList",
		method: 'get',
		params
	})
}

// .删除文件
// https://www.jihuobao.net/filecenter/ResourceFile/removefolderorfile?keyValue=文件ID
export function RemoveFolderOrFileAPI(params) {
	return request({
		url: fileUrl + "/ResourceFile/removefolderorfile",
		method: 'post',
		params
	})
}

// 4.修改文件名
// https://www.jihuobao.net/filecenter/ResourceFile/modifyfilename?keyValue=文件ID
export function renamefileAPI(params) {
	return request({
		url: fileUrl + "/ResourceFile/modifyfilename",
		method: 'post',
		params
	})
}

// 5.文件日志例表
// https://www.jihuobao.net/filecenter/log/FileList?FileId=1d746e5b-f8d8-4e59-9ce3-7b38124d4b9a5.文件日志例表
export function filerecordsAPI(params) {
	return request({
		url: fileUrl + "/log/FileList",
		method: 'post',
		params
	})
}
// 6.文件查看记录例表
// https://www.jihuobao.net/filecenter/log/filelooklist?FileId=1d746e5b-f8d8-4e59-9ce3-7b38124d4b9a
export function FileLookListAPI(params) {
	return request({
		url: fileUrl + "/log/filelooklist",
		method: 'post',
		params
	})
}

// 点击查看文件接口
// /ResourceFile/CreateFileLog?fileid=544668e8-12b3-4f3a-aeb5-e87e18d0ac32
export function filelogApi(params) {
	return request({
		url: fileUrl + "/ResourceFile/CreateFileLog",
		method: 'get',
		params
	})
}



// 7.下载文件
// https://www.jihuobao.net/filecenter/ResourceFile/downloadfile?keyValue=文件ID、
