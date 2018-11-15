import Cookies from 'js-cookie'

const TokenKey = _MyCook + 'token'

const beforeUrl = _MyCook + "beforeUrl"
export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token,autoLogin) {
	if(autoLogin) {
		return Cookies.set(TokenKey, token, {
			expires:30
		})
	} else {
		return Cookies.set(TokenKey, token,{
			
		})
	}
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}

export function getbeforeUrl() {
	return Cookies.get(beforeUrl)
}

export function setbeforeUrl(url) {
	return Cookies.set(beforeUrl, url)
}

export function removebeforeUrl() {
	return Cookies.remove(beforeUrl)
}