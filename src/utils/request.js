import axios from 'axios'
import {
	Message
} from 'element-ui'
import store from '@/store'
import {
	getToken,
	removeToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
	baseURL: _ApiUrl, // api的base_url
	timeout: 50000 // request timeout
})

//request interceptor
service.interceptors.request.use(config => {
	// Do something before request is sent
//	console.log(config)
	if (getToken()) {
		//config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
		config.headers.Authorization = `Bearer ${getToken()}`; //${decodeURI(token)}
	}
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
	response => {
		//		console.log("response", response)
		if (response.data.type == 1 || response.data.success) {
			return response.data
		} else {
			if (response.data.type == -1) {
				//				console.log(response)
				removeToken();
				Message({
					message: response.data.message,
					type: 'error',
					duration: 5 * 1000
				});
				store.dispatch('LogOut').then(() => {
					setTimeout(function() {
						location.reload()
					}, 2000)
					// 为了重新实例化vue-router对象 避免bug
				})
			} else {
				if (response.data["is_error"] != undefined) {
					return response.data
				}

				if (response.data.message && response.data.msg != "请输入正确的箱号") {
					Message({
						message: response.data.message ? response.data.message : response.data.msg,
						type: 'error',
						duration: 5 * 1000
					})
				}

				return Promise.reject('error')
			}

		}
	},
	error => {
//		console.log('err' + error) // for debug
		if (error.response) {
			switch (error.response.status) {
				case 401:
					401
					// 返回 401 清除token信息并跳转到登录页面
					store.commit(types.LOGOUT);
					router.replace({
						path: 'login',
						//                      query: {redirect: router.currentRoute.fullPath}
					})
			}
		}
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	})

export default service
