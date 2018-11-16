import request from '@/utils/request'

export function GetTokenIdentity() {
	return request({
		url: "https://www.jihuobao.net/cas2/rest/me",
		method: 'get'
	})
}