import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '',
			redirect: '/login',
			hidden: true
		},  {
			path: '/login',
			label: '登录',
			component: resolve => require(['@/components/login'], resolve),
			active: false,
			hidden: true,
		},
// 		{
// 			path: '/Box',
// 			label: '单箱详情',
// 			component: indexcMap,
// 			active: true,
// 			children: [{
// 				path: '/Box/Info/:pid/:id',
// 				name: 'boxInfo',
// 				component: resolve => require(['@/components/trailer/TdetailFWS'], resolve),
// 			}]
// 		},
		{
			path: '/ontime',
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
			}, {
				path: '/ontime/setting/:id',
				name: 'setting',
				component: resolve => require(['@/components/ontime/setting'], resolve),
			}, {
				path: '/ontime/share/:id',
				name: 'share',
				component: resolve => require(['@/components/ontime/share'], resolve),
			}, {
				path: '/ontime/shareEdit/:id',
				name: 'shareEdit',
				component: resolve => require(['@/components/ontime/shareEdit'], resolve),
			}, {
				path: '/ontime/newTrailer/:cid',
				name: 'newTrailer',
				component: resolve => require(['@/components/trailer/newTrailer'], resolve),
			}, {
				path: '/ontime/Tdetail/:cid',
				name: 'Tdetail',
				component: resolve => require(['@/components/trailer/Tdetail'], resolve),
			}, {
				path: '/ontime/verifyDetail/:id',
				name: 'verifyDetail',
				component: resolve => require(['@/components/ontime/verifyDetail'], resolve),
			},{
				path: '/Box/Info/:pid/:id',
				name: 'boxInfo',
				component: resolve => require(['@/components/trailer/TdetailFWS'], resolve),
			}]
		}, {
			path: '/token/:code',
			label: '令牌',
			component: resolve => require(['@/components/token'], resolve),
			active: false,
			hidden: true,
		}, {
			path: '/addbook',
			label: '通讯录',
			component: index,
			hidden: false,
			active: false,
			children: [{
				path: '',
				redirect: '/addbook/list',
				name: '',
				component: resolve => require(['@/components/addbook/list'], resolve),
			}, {
				path: '/addbook/list',
				name: 'list',
				component: resolve => require(['@/components/addbook/list'], resolve),
			}, {
				path: '/addbook/new',
				name: 'new',
				component: resolve => require(['@/components/addbook/new'], resolve),
			},  {
				path: '/addbook/edit/:id',
				name: 'new',
				component: resolve => require(['@/components/addbook/edit'], resolve),
			},{
				path: '/addbook/detail/:id',
				name: 'detail',
				component: resolve => require(['@/components/addbook/detail'], resolve),
			}, {
				path: '/addbook/setting/:id',
				name: 'setting',
				component: resolve => require(['@/components/addbook/setting'], resolve),
			}],
		}


	]

})
