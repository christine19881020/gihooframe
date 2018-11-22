import request from '@/utils/request'
import store from '../store'
let BasicsUrl = _ApiUrl;
let BasicsUrlTC="https://www.jihuobao.net/Gihoo/punctuality"

//code换身份
export function tokenCodeApi() {
	return request({
		url: "https://www.jihuobao.net/cas2/rest/me",
		method: 'get'
	})
}

//伙伴例表数据
//https://www.jihuobao.net/Gihoo/punctuality/user/teamlist?pagesize=10&currentpage=1
export function teamlistApi(params){
	return request({
		url:  "https://www.jihuobao.net/Gihoo/punctuality/user/teamlist",
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
	    data:params
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

//外贸系统/com.trade.trans.order.add([新建订单]新增)
export function newApi(params) {
	params.method = "com.trade.trans.order.add";
	return request({
		url: BasicsUrl,
		method: 'post',
	    data:params
	})
}

// 外贸系统/com.trade.trans.order.update([编辑订单]订单编辑)
export function updateApi(params) {
	params.method = "com.trade.trans.order.update";
	return request({
		url: BasicsUrl,
		method: 'post',
	    data:params
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
	    data:params
	})
}


// 外贸系统/com.trade.trans.order.share([共享]共享订单)
export function shareApi(params){
	params.method="com.trade.trans.share.touser";
	return request({
		url:BasicsUrl,
		method:'post',
		data:params
	})
};
//  外贸系统/com.trade.trans.share.find([共享] 共享人员数据获取 20181121)
export function sharelistApi(params){
	params.method="com.trade.trans.share.find";
	return request({
		url:BasicsUrl,
		method:'get',
		params
	})
};
//港口数据源 20181121
export function portlistApi(params){
	params.method="com.trade.option.order.port";
	return request({
		url:BasicsUrl,
		method:'get',
		params
	})
};
//外贸系统/com.trade.trans.transway.update([设置]设置运输方式 20181121)
export function transwayApi(params){
	params.method="com.trade.trans.transway.update";
	return request({
		url:BasicsUrl,
		method:'get',
		params
	})
};
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
	    data:params
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
	    data:params
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
export function ModifyDraftApi(params,id) {
	return request({
		url: BasicsUrlTC + "/order/ModifyDraft?id=" +id,
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
		url: BasicsUrlTC + "/ResourceFile/RemoveFolderOrFile?keyValue=" + keyValue+"&"+"fileType=file",
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


