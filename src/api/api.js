import request from '@/utils/request'
import store from '../store'
let BasicsUrl = _ApiUrl;

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
		url:  "https://www.jihuobao.net/Gihoo/punctuality/user/teamlist?pagesize=100&currentpage=1",
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

//外贸系统/com.trade.trans.setting.get([设置]获取配置信息)   
export function setInitApi(params) {
	params.method = "com.trade.trans.setting.get";
	return request({
		url: BasicsUrl,
		method: 'get',
	    params
	})
}