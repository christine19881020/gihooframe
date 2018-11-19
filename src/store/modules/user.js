//import {GetTokenIdentity} from '@/api/login'
import {tokenCodeApi} from '@/api/api'

import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
	state: {
		accounts: '',
		status: '',
		code: '',
		token: getToken(),
		name: '',
		avatar: '',
		introduction: '',
		roles: [],
		setting: {
			articlePlatform: []
		}
	},

	mutations: {
		SET_CODE: (state, code) => {
			state.code = code
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_ACCOUNTS: (state, accounts) => {
			state.accounts = accounts
		}
	},

	actions: {
		updateAccounts({
			commit
		}, accounts) {
			commit('SET_ACCOUNTS', accounts)
		},
		GetInfo({commit}) {
			return new Promise((resolve, reject) => {
				tokenCodeApi().then((res) => {
//					console.log(res)
					commit('SET_ACCOUNTS', res)			
					sessionStorage.setItem('user',JSON.stringify(res));
					resolve();
				}).catch(error => {
					console.log(error)
					reject(error)
				})
			})
		},
		// 获取用户信息
		
		//  登出
		LogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				removeToken()
				resolve()
			})
		}

	}
}

export default user