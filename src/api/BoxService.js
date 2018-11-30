import request from '@/utils/request'
import axios from 'axios';
import store from '../store'

export function getboxInfo(params) {
	return request({
		url:  "https://www.jihuobao.net/Tc/tcbox/Service/getbox/Info",
		method: 'get',
		params
	})
}

export function getBoxFile(params) {
	return request({
		url:  "https://www.jihuobao.net/filecenter/OpenApi/ResourceFile/GetBoxFile",
		method: 'get',
		params
	})
}

export function GetLiGang(params) {
	return request({
		url:  "https://www.jihuobao.net/Gihoo/punctuality/Order/GetLiGang",
		method: 'get',
		params
	})
}
