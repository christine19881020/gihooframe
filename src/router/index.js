import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ontimelist from '@/components/ontime/list'

Vue.use(Router)

export default new Router({
	routes: [ {
		path: '/',
		label: '出运管理',
		component: index,
		hidden: false,
		active: false,
		children: [{
			path: '',
			redirect: '/ontime/list',
			name: '',
			component: resolve => require(['@/components/ontime/list'], resolve),
		}, {
			path: '/ontime/list',
			name: 'list',
			component: resolve => require(['@/components/ontime/list'], resolve),
		}, {
			path: '/ontime/new',
			name: 'new',
			component: resolve => require(['@/components/ontime/new'], resolve),
		}, {
			path: '/ontime/detail/:id',
			name: 'detail',
			component: resolve => require(['@/components/ontime/detail'], resolve),
		}, {
			path: '/ontime/edit/:id',
			name: 'edit',
			component: resolve => require(['@/components/ontime/edit'], resolve),
		}]
	},{
		path: '/token/:code',
		label: '令牌',
		component: resolve => require(['@/components/token'], resolve),
		active: false,
		hidden: true,
	}]

})