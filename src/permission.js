import router from './router'
import store from './store'
import {
	Message
} from 'element-ui'
import {
	getToken
} from '@/utils/auth' // 验权

const whiteList = ['/login', '/token', '/forgotPassword', '/register', '/homepage', ] // 不重定向白名单
router.beforeEach((to, from, next) => {
	//	NProgress.start()
	if (getToken()) {
		store.dispatch('GetInfo').then(res => { // 拉取用户信息				
			if (to.path != '/login') {
				next()
			} else {
				next({
					path: '/ontime/list'
				})
			}
		}).catch((err) => {
			//console.log('xx',err)
			store.dispatch('LogOut').then(() => {
				Message.error('验证失败,请重新登录');
				window.location.href = _loginHref;
			})
		})

	} else {
		if (whiteList.indexOf(to.path) > -1 || to.path.indexOf('token') > -1) {
			console.log(whiteList.indexOf(to.path))
			next()
		} else {
			//			console.log(whiteList);
			//			console.log(to.path);
			//			console.log(whiteList.indexOf(to.path));
			//			next('/login')
			window.location.href = _loginHref;
		}
	}
})

router.afterEach(() => {

})
