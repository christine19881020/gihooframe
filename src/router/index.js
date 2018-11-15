import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import ontimelist from '@/components/ontime/list'

Vue.use(Router)

export default new Router({
	routes: [{
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
		},{
			path: '/ontime/new',
			name: 'new',
			component: resolve => require(['@/components/ontime/new'], resolve),
		}]
	}]

})