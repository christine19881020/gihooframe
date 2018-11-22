//Insearch 搜索结果列表  /INeye
const searchLists = [{
		no: 'COSCO2346352345',
		aim: '英国利物浦',
		status: '跟踪中'
	},
	{
		no: 'COSCO2346352345',
		aim: '英国利物浦',
		datex: '2017-3-4',
		status: '到港'
	},
	{
		no: 'COSCO2346352345',
		aim: '英国利物浦',
		datex: '2017-3-4',
		status: '到港'
	},
	{
		no: 'COSCO2346352345',
		aim: '英国利物浦',
		datex: '2017-3-4',
		status: '到港'
	}
]

//search 千里眼搜索  自动船公司搜索下拉 /eye
const autoBoatsCompany = [{
		"value": "宁波海运",
		"address": "长宁区新渔路144号"
	},
	{
		"value": "宁波海运1",
		"address": "上海市长宁区淞虹路661号"
	},
	{
		"value": "宁波海运2",
		"address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
	},
	{
		"value": "宁波海运3",
		"address": "天山西路438号"
	},
	{
		"value": "宁波海运4",
		"address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
	},
	{
		"value": "宁波海运5",
		"address": "上海市长宁区金钟路633号"
	},
	{
		"value": "宁波海运6",
		"address": "上海市嘉定区曹安公路曹安路1685号"
	},
	{
		"value": "宁波海运7",
		"address": "上海市普陀区同普路1435号"
	},
	{
		"value": "宁波海运8",
		"address": "上海市北翟路1444弄81号B幢-107"
	}
]

//应用页面  search.vue,detail.vue,InSearchNew.vue
//页面中 集装箱号 提单号 船公司 目的港 字段名
const resultList = {
	boxNo: 'COSCO2346352345',
	orderNo: 'COSCO2346352345',
	boatCompany: '某某某海运公司',
	aimPort: '某某某港'
}

//detail.vue,InSearchNew.vue
//步骤流程
const steps = [{
		time: '2018-04-06 16:04:00',
		description: '已到香港'
	},
	{
		time: '2018-04-06 16:04:00',
		description: '已开船'
	},
	{
		time: '2018-04-06 16:04:00',
		description: '海关已放行'
	},
	{
		time: '2018-04-06 16:04:00',
		description: '已进港'
	},
	{
		time: '2018-04-06 16:04:00',
		description: '已出港'
	},
	{
		time: '2018-04-06 16:04:00',
		description: '已发货'
	}
]
//InSearchNew 搜索无结果新建页面 点击添加成员下拉  /INeye/new  
const users = [{
	img: require('@/assets/erha.jpg'),
	name: '李某某',
	role: '成员',
	to: '1',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '王某某',
	role: '管理员',
	to: '2',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '张某某',
	role: '成员',
	to: '2',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '张某某',
	role: '成员',
	to: '2',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '张某某',
	role: '成员',
	to: '2',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '张某某',
	role: '成员',
	to: '2',
	selected: true,
}, {
	img: require('@/assets/erha.jpg'),
	name: '张某某',
	role: '成员',
	to: '2',
	selected: true,
}]

//准时达 订单详情 orderDetail.vue 
//口岸，目的港，提单号等字段
const detailBasic = {
	port: '宁波',
	aimport: '利物浦港',
	order: 'C017429TX790',
	easy: '宁波利星',
	portTicket: 'TX32083297CX',
	boatCompany: '',
	boatName: '',
	inport: '宁波北仑港'
}

//通用组建 添加箱型箱量 --这个设计改过 数据结构要改 暂时先不用
const boxtype = [{
	type: '40GP',
	weight: '245KGS',
	time: '2018-2-21',
	attention: '早点到，监装！',
	status: '已进港'
}]

//箱子列表 --这个设计改过 数据结构要改 暂时先不用
const boxlist = [{
		type: '40GP',
		weight: '245KGS',
		time: '2018-2-21',
		attention: '早点到，监装！',
		status: '已进港',
		addBoxShow: false,
		addresslist: [{
				addressIDs: ["120000", "120100", "120101"],
				addressChars: [],
				menpai: '118号',
				sheng: '浙江省',
				shi: '温州市',
				qu: '鹿城区',
				street: '五马街道',
				menpai: '118号',
				company: '温州泰昌黏胶制品有限公司',
				name: '林志文',
				phone: '18905745858'
			},
			{
				addressIDs: ["120000", "120100", "120101"],
				addressChars: [],
				sheng: '浙江省',
				shi: '温州市',
				qu: '鹿城区',
				street: '五马街道',
				menpai: '119号',
				company: '温州泰昌黏胶制品有限公司',
				name: '林志文',
				phone: '18905745858'
			}
		]
	}

]

//添加箱子数据类型 本地使用 不用返回
const addbox = {
	type: '40GP',
	num: '',
	unit: '',
	weight: '',
	time: '',
	attention: '',
	addressOb: {
		addressIDs: ["120000", "120100", "120101"],
		addressChars: [],
		sheng: '浙江省',
		shi: '温州市',
		qu: '鹿城区',
		street: '五马街道',
		menpai: '119号',
		company: '温州泰昌黏胶制品有限公司',
		name: '林志文',
		phone: '18905745858',
		modify: false,
	}
}

//验证规则 不用返回
const dataBoxrules = {
	WEIGHT: [{
		required: true,
		message: '请输入单箱重量',
		trigger: 'blur'
	}, {
		type: 'number',
		message: "单箱重量必须为数字",
		trigger: 'blur'
	}],
	ENDDAY: [{
		type: 'date',required: true,
		message: '请选择时间',
		trigger: 'change'
	}]
}

//箱量下拉列表
const droplist =[
    {
        "ID": 10009,
        "NAME": "20GP"
    },
    {
        "ID": 10010,
        "NAME": "40GP"
    },
    {
        "ID": 10011,
        "NAME": "40HQ"
    },
    {
        "ID": 10131,
        "NAME": "45HQ"
    },
    {
        "ID": 14087,
        "NAME": "20OT"
    },
    {
        "ID": 14088,
        "NAME": "40Ot"
    },
    {
        "ID": 14089,
        "NAME": "20Rh"
    },
    {
        "ID": 14090,
        "NAME": "40RH"
    },
    {
        "ID": 14091,
        "NAME": "20NOR"
    },
    {
        "ID": "14092",
        "NAME": "40NOR"
    }
]
//新建订舱
const droplistx =[
    {
        "ID": 10009,
        "E_BOX_TYPE": "20GP",
        'NUM':""
    },
    {
        "ID": 10010,
        "E_BOX_TYPE": "40GP",
        'NUM':""
    },
    {
        "ID": 10011,
        "E_BOX_TYPE": "40HQ",
        'NUM':""
    },
    {
        "ID": 10131,
        "E_BOX_TYPE": "45HQ",
        'NUM':""
    },
    {
        "ID": 14087,
        "E_BOX_TYPE": "20OT",
        'NUM':""
    },
    {
        "ID": 14088,
        "E_BOX_TYPE": "40Ot",
        'NUM':""
    },
    {
        "ID": 14089,
        "E_BOX_TYPE": "20Rh",
        'NUM':""
    },
    {
        "ID": 14090,
        "E_BOX_TYPE": "40RH",
        'NUM':""
    },
    {
        "ID": 14091,
        "E_BOX_TYPE": "20NOR",
        'NUM':""
    },
    {
        "ID": "14092",
        "E_BOX_TYPE": "40NOR",
        'NUM':""
    }
]

//地图展示页面步骤 map.vue
//路径'/ontime/map'
const mapsteps = [{
		time: '2018-05-28T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，全部未提箱',
		active: false,
	},
	{
		time: '2018-05-29T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	},
	{
		time: '2018-05-30T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	},
	{
		time: '2018-05-31T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	},
	{
		time: '2018-06-01T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: true,
	},
	{
		time: '2018-06-02T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	}, {
		time: '2018-06-03T12:00:00+08:00',
		no: '3',
		desc: '今天共有10个箱子，已提箱8个',
		active: false,
	}, {
		time: '2018-06-04T12:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	}, {
		time: '2018-06-05T13:00:00+08:00',
		no: '3',
		desc: '今天共有3个箱子，已全部提上箱',
		active: false,
	},
]

//地图展示页面步骤 map.vue
//路径'/ontime/map'
//拖车地址
const positionCarouselList = [{
		position: "宁波鄞州区银城国际1号楼"
	},
	{
		position: "宁波鄞州区银城国际2号楼"
	},
	{
		position: "宁波鄞州区银城国际3号楼"
	},
	{
		position: "宁波鄞州区银城国际4号楼"
	}
]

//准时达列表页  reachOnTime/list
//列表页返回数据
const ontimelist = [{
	type: 1,
	title: '名称标题1111',
	status: '去工厂'
}, {
	type: 1,
	title: '名称2222',
	status: '去工厂'
}, {
	type: 1,
	title: '名称3333',
	status: '去工厂'
}, {
	type: 1,
	title: '名称4444',
	status: '去工厂'
}, {
	type: 0,
	title: '草稿箱标题',
	status: ''
}]

//准时达 下拉筛选选项 
const namelists = [{
		value: "名称1111"
	},
	{
		value: "名称2222"
	},
	{
		value: "名称3333"
	},
	{
		value: "名称4444"
	}
]

//准时达 新建 分享人员列表
//reachontime/new.vue
//ontime/new
const orderlist = [{
	name: '客户简称',
	check: true
}, {
	name: '目的港',
	check: true
}, {
	name: '提单号',
	check: true
}, {
	name: '发票号',
	check: true
}]

//准时达 地址设置页
//addressSet.vue
//路径 /ontime/addressSet
const addresslist = [{
	editshow: false,
	address: '温州苍南龙港镇港前路118号 ',
	company: '温州泰昌胶粘制品有限公司',
	name: '林志文',
	mobile: '18905745858'
}]

//添加地址 不用返回
const addAddress = {
	addressIDs:[],
	address: '',
	province:'',
	city:'',
	country:'',
	town:'',
	address:'',
	company: '',
	name: '',
	mobile: ''
//orderid,province,city,county,town,address
}

//单证列表
const documentlist = [{
	title: '单证标题名称1',
	status: '报关单证',
	datetime: '2018-12-21 22:00:21'
}, {
	title: '单证标题名称2',
	status: '报关单证',
	datetime: '2018-12-21 22:00:21'
}, {
	title: '单证标题名称3',
	status: '报关单证',
	datetime: '2018-12-21 22:00:21'
}, {
	title: '单证标题名称4',
	status: '报关单证',
	datetime: '2018-12-21 22:00:21'
}]

//单证筛选 
const filterList = [{
	value: 'all',
	item: '全部',
	active: true
}, {
	value: '报关',
	item: '报关',
	active: false
}, {
	value: '清关单证',
	item: '清关单证',
	active: false
}, {
	value: '销售合同',
	item: '销售合同',
	active: false
}]

//单证详情页  基本信息
const docBasic = {
	docmaker: 'XXX名字',
	doctime: '2018-12-21 12:09:01',
	doctype: '报关单证'
}


const YardListData= [{
					Name: "高新堆场",
					Gps: [
						[121.823073528653, 29.932607536646],
						[121.8216827069, 29.932771059609],
						[121.821321032804, 29.932549762197],
						[121.819878643821, 29.931077111745],
						[121.820075611498, 29.930822316482],
						[121.823992055609, 29.92997952294],
						[121.82469194027, 29.932214829378]
					],
					longlat: [121.824661,29.931949],
					Cost: 0,
					Cost2: null,
					distance: "4.03公里"
				}, {
					Name: "大亚一堆场",
					Gps: [
						[121.86973557999, 29.913546438156],
						[121.865096592513, 29.914691029306],
						[121.863676141729, 29.914963231317],
						[121.8618690378, 29.915422259281],
						[121.861500583052, 29.914217804638],
						[121.864188312066, 29.913505148472],
						[121.868173125443, 29.912698912038],
						[121.868839463678, 29.912622415758],
						[121.869028850179, 29.912511777673]
					],
					longlat: [121.869789674429, 29.913380924222],
					Cost: 0,
					Cost2: null,
					distance: "1.34公里"
				}, {
					Name: "大亚二堆场",
					Gps: [
						[121.956603323249, 29.882261423601],
						[121.956684329336, 29.880917216494],
						[121.954323870268, 29.880990869356],
						[121.95429549319, 29.882477970342],
						[121.95671843379, 29.882639402686]
					],
					longlat: [121.956616573053, 29.881956737898],
					Cost: 100,
					Cost2: null,
					distance: "9.99公里"
				}, {
					Name: "大亚三堆场(中创三)",
					Gps: [
						[121.86959189686, 29.903995922656],
						[121.867539705797, 29.904035942148],
						[121.868115089949, 29.906904386486],
						[121.870032257583, 29.906621621407],
						[121.870095519641, 29.906049039747]
					],
					longlat: [121.867563336483, 29.90552166784],
					Cost: 0,
					Cost2: null,
				    distance: "2.16公里"
				}, {
					Name: "国柜堆场",
					Gps: [
						[121.828406783217, 29.927650662709],
						[121.82146055689, 29.92936245701],
						[121.820047086123, 29.930104685513],
						[121.820155135459, 29.930654601653],
						[121.821980109376, 29.930239666647],
						[121.824966324273, 29.929589305681],
						[121.827630521212, 29.928982161601],
						[121.829033648993, 29.928624828746]
					],
					longlat: [121.827542674896, 29.928680431172],
					Cost: 0,
					Cost2: null,
					distance: "3.70公里"
				}, {
					Name: "太平堆场",
					Gps: [
						[121.860733830557, 29.92066226774],
						[121.861282746265, 29.922038907296],
						[121.863304476587, 29.921338178539],
						[121.863754749997, 29.921132567491],
						[121.863191554204, 29.91976933862]
					],
					longlat: [121.860948109868, 29.921093145827],
					Cost: 0,
					Cost2: null,
					distance: "0.61公里"
				}, {
					Name: "大港新世纪(空箱)",
					Gps: [
						[121.827611683538, 29.932406558975],
						[121.825511089615, 29.933141204239],
						[121.826299333333, 29.93506539873],
						[121.831090365047, 29.933466243668],
						[121.830024176919, 29.931114311829]
					],
					longlat: [121.828622662087, 29.934195228085],
					Cost: 0,
					Cost2: null,
					distance: "3.71公里"
				}, {
					Name: "大港堆场(重箱)",
					Gps: [
						[121.827611683538, 29.932406558975],
						[121.825511089615, 29.933141204239],
						[121.826299333333, 29.93506539873],
						[121.831090365047, 29.933466243668],
						[121.830024176919, 29.931114311829]
					],
					longlat: [121.828622662087, 29.934195228085],
					Cost: 0,
					Cost2:null,
					distance: "3.71公里"
				}, {
					Name: "四期堆场(四期码头)",
					Gps: [
						[122.028805906714, 29.882741337961],
						[122.026642954296, 29.883610966618],
						[122.028365928937, 29.891041164043],
						[122.030310944572, 29.892023217914],
						[122.035134803035, 29.890298267607],
						[122.036212030688, 29.892579157459],
						[122.052226465561, 29.887510519165],
						[122.051547638913, 29.886126257191],
						[122.048650339882, 29.879272951455],
						[122.047825931742, 29.879298340164]
					],
					longlat: [122.033092036443, 29.882773902129],
					Cost: 100,
					Cost2: 200,
					distance: "16.82公里"
				}, {
					Name: "东华堆场",
					Gps: [
						[121.864059991391, 29.921042368898],
						[121.86354680617, 29.919686136079],
						[121.864589422398, 29.918793816737],
						[121.866010669512, 29.919682471742],
						[121.866766977845, 29.919966755536],
						[121.86685229574, 29.920314229593]
					],
					longlat: [121.864784562082, 29.920655136061],
					Cost: 0,
					Cost2: null,
					distance: "0.47公里"
				}, {
					Name: "东华二堆场",
					Gps: [
						[121.89803880316, 29.885824147539],
						[121.898558015839, 29.885822130097],
						[121.898577372725, 29.884519109313],
						[121.898058138354, 29.884544117308]
					],
					longlat: [121.898131794519, 29.885214669872],
					Cost: 50,
					Cost2: null,
					distance: "5.41公里"
				}, {
					Name: "东华三堆场(永港)",
					Gps: [
						[121.971662050764, 29.886722952791],
						[121.971244542017, 29.883025380744],
						[121.975907732118, 29.883626662099],
						[121.97593312987, 29.885215380014],
						[121.976947144411, 29.885320957689],
						[121.9769015961, 29.886956430934]
					],
					longlat: [121.974597706362, 29.884165352935],
					Cost: 100,
					Cost2: null,
					distance: "11.44公里"
				}, {
					Name: "长胜堆场",
					Gps: [
						[121.863266229084, 29.911712507826],
						[121.860731049921, 29.912327582223],
						[121.861279428388, 29.913841092168],
						[121.862956209103, 29.91335652358],
						[121.864452507123, 29.913013994058],
						[121.864857951042, 29.91291111807],
						[121.864322190409, 29.911496517245]
					],
					longlat: [121.863285246013, 29.91173144617],
					Cost: 0,
					Cost2: null,
					distance: "1.48公里"
				}, {
					Name: "长胜中创",
					Gps: [
						[121.956603323249, 29.882261423601],
						[121.956684329336, 29.880917216494],
						[121.954323870268, 29.880990869356],
						[121.95429549319, 29.882477970342],
						[121.95671843379, 29.882639402686]
					],
					longlat: [121.956751604856, 29.879372811353],
					Cost: 100,
					Cost2: 0,
					distance: "10.14公里"
				}, {
					Name: "朝华兴合堆场",
					Gps: [
						[121.908509452039, 29.890877926687],
						[121.908527123739, 29.891320642878],
						[121.909526518873, 29.891505202932],
						[121.909779053995, 29.891596689841],
						[121.909733432333, 29.892219010283],
						[121.913374338943, 29.892714108734],
						[121.913670828334, 29.892681225387],
						[121.913672016328, 29.891236510066]
					],
					longlat: [121.908646755715, 29.890947431413],
					Cost: 50,
					Cost2: null,
					distance: "5.61公里"
				}, {
					Name: "东兴堆场(在三期码头)",
					Gps: [
						[121.840264197536, 29.930974936978],
						[121.842840480806, 29.930123283047],
						[121.84468695283, 29.933374567084],
						[121.845962506184, 29.93716345047],
						[121.847684507984, 29.940283202895],
						[121.846575368218, 29.940880103359],
						[121.835412167113, 29.945258482325],
						[121.834893736458, 29.945482973654],
						[121.832653166742, 29.940589747854],
						[121.834529677898, 29.939779810082],
						[121.838177648711, 29.93895349313],
						[121.835023324572, 29.932605216267]
					],
					longlat: [121.840313059895, 29.931040754426],
					Cost: 0,
					Cost2: 0,
					distance: "2.53公里"
				}, {
					Name: "大榭堆场(大榭码头)",
					Gps: [
						[121.933704185963, 29.922439607832],
						[121.928704307514, 29.920993552745],
						[121.92612655838, 29.92772102378],
						[121.926341583753, 29.928145429174],
						[121.925751103562, 29.928924070528],
						[121.925445384583, 29.928766346719],
						[121.925087432243, 29.929452625377],
						[121.937924033764, 29.936993056987],
						[121.938622377048, 29.937019994241],
						[121.938890469656, 29.936163053617],
						[121.940608170061, 29.936801471975],
						[121.942002210685, 29.934712937708],
						[121.941624470245, 29.933313025279],
						[121.941034654097, 29.932989798064],
						[121.941481186723, 29.93237132635],
						[121.941122345613, 29.931990067057],
						[121.938921128587, 29.930701264826],
						[121.936700223659, 29.929242808946],
						[121.938166012001, 29.927120582477],
						[121.938558805881, 29.926234581472],
						[121.937412571614, 29.925449690033],
						[121.937161896101, 29.924615766787],
						[121.936732055698, 29.924030284428],
						[121.936177365443, 29.924508304682],
						[121.934385025556, 29.922417350589]
					],
					longlat: [121.933774871556, 29.922284476404],
					Cost: 100,
					Cost2: 200,
					distance: "6.57公里"
				}, {
					Name: "大榭和欣堆场(和欣堆场)",
					Gps: [
						[121.936983098759, 29.903835014338],
						[121.938821866875, 29.904752319189],
						[121.938602405359, 29.906074750708],
						[121.938593424988, 29.906149604696],
						[121.936776289292, 29.905933813694],
						[121.936163482253, 29.905900904005],
						[121.935966186246, 29.905840090877],
						[121.935809737861, 29.905801878257]
					],
					longlat: [121.936559202054, 29.905356661369],
					Cost: 100,
					Cost2: null,
					distance: "7.17公里"
				}, {
					Name: "天翔一堆场",
					Gps: [
						[121.86540285142, 29.895413620389],
						[121.865129818028, 29.893634364344],
						[121.865921155387, 29.893278112376],
						[121.867440349841, 29.894934845911],
						[121.868344089903, 29.896316665336],
						[121.865689353539, 29.896710834895]
					],
					longlat: [121.865422926683, 29.895344524918],
					Cost: 0,
					Cost2: null,
					distance: "3.28公里"
				}, {
					Name: "天翔三堆场(宏达后山)",
					Gps: [
						[121.915510996994, 29.891752561901],
						[121.915207539327, 29.888451671191],
						[121.916476002958, 29.888258464622],
						[121.917464545142, 29.888466424213],
						[121.918920351202, 29.888291824839],
						[121.919223894672, 29.891147919973],
						[121.919223894672, 29.891147919973]
					],
					longlat: [121.916189534078, 29.889598214171],
					Cost: 50,
					Cost2: null,
					distance: "6.26公里"
				}, {
					Name: "中集一堆场",
					Gps: [
						[121.869152239687, 29.900697208828],
						[121.869754272456, 29.903978416421],
						[121.867458577189, 29.903981540427],
						[121.86687474629, 29.900988921246]
					],
					longlat: [121.867521865595, 29.903454120032],
					Cost: 0,
					Cost2: null,
					distance: "2.39公里"
				}, {
					Name: "中集二堆场",
					Gps: [
						[121.956332072997, 29.876790880715],
						[121.957190045811, 29.877040236161],
						[121.956420440308, 29.878021176445],
						[121.955843361655, 29.877673772099]
					],
					longlat: [121.956376895437, 29.876769697542],
					Cost: 100,
					Cost2: null,
					distance: "10.26公里"
				}, {
					Name: "中集三堆场",
					Gps: [
						[122.01785890784, 29.867198538832],
						[122.01780615986, 29.865258828373],
						[122.02000838435, 29.863827391832],
						[122.02437142355, 29.865749034077],
						[122.023900762014, 29.868323197702],
						[122.023627920657, 29.870502666518],
						[122.022491703204, 29.870598526599],
						[122.021321316412, 29.869380000728],
						[122.021480826646, 29.871740954996],
						[122.020524673608, 29.872163227036],
						[122.018865511883, 29.871471167024],
						[122.017858297629, 29.867950400677]
					],
					longlat: [122.018003729378, 29.866946047942],
					Cost: 100,
					Cost2: null,
					distance: "16.05公里"
				}, {
					Name: "中集五堆场",
					Gps: [
						[121.938314250515, 29.920963873507],
						[121.939344705688, 29.923421691142],
						[121.938119725552, 29.925202503041],
						[121.937887708439, 29.925339932385],
						[121.937447830717, 29.92460507493],
						[121.936767554412, 29.923475715803],
						[121.935333091201, 29.921044894563]
					],
					longlat: [121.937527416496, 29.921290765224],
					Cost: 100,
					Cost2: 0,
					distance: "6.94公里"
				}, {
					Name: "兴合堆场",
					Gps: [
						[121.866681690494, 29.900446268341],
						[121.866296117121, 29.898519978708],
						[121.869486505728, 29.897880583007],
						[121.86980109883, 29.899877396346],
						[121.869436157771, 29.900099739431]
					],
					longlat: [121.867008559979, 29.899792154862],
					Cost: 0,
					Cost2: null,
					distance: "2.79公里"
				}, {
					Name: "新华昌堆场",
					Gps: [
						[121.794087132169, 29.930361679851],
						[121.794663295649, 29.930781571234],
						[121.796100912395, 29.929655738362],
						[121.7973410757, 29.928688478454],
						[121.797951813093, 29.927951890002],
						[121.795404355376, 29.924860741114],
						[121.791978933992, 29.927222414323],
						[121.791061788941, 29.928090125536]
					],
					longlat: [121.794180079465, 29.930154096714],
					Cost: 0,
					Cost2: null,
					distance: "6.92公里"
				}, {
					Name: "远东堆场(远东码头)",
					Gps: [
						[122.049098266212, 29.879402765861],
						[122.053185197393, 29.87794319559],
						[122.057215190492, 29.877465405698],
						[122.061277270075, 29.877296174702],
						[122.061921476108, 29.877354334711],
						[122.062257108768, 29.881227262854],
						[122.062520478065, 29.886772569894],
						[122.05425054971, 29.887347335898],
						[122.052208706127, 29.887307362805]
					],
					longlat: [122.055590932464, 29.87848358736],
					Cost: 100,
					Cost2: 200,
					distance: "19.04公里"
				}, {
					Name: "地中海堆场",
					Gps: [
						[121.884738366239, 29.879267638044],
						[121.884441168892, 29.879128135634],
						[121.884112340365, 29.878492308456],
						[121.88377067018, 29.877649732062],
						[121.884248976632, 29.877480064168],
						[121.886352028326, 29.876999153414],
						[121.886358758369, 29.879272462997]
					],
					longlat: [121.885263779288, 29.878252174899],
					Cost: 50,
					Cost2: null,
					distance: "5.52公里"
				}, {
					Name: "东南堆场",
					Gps: [
						[122.01785890784, 29.867198538832],
						[122.01780615986, 29.865258828373],
						[122.02000838435, 29.863827391832],
						[122.02437142355, 29.865749034077],
						[122.023900762014, 29.868323197702],
						[122.023627920657, 29.870502666518],
						[122.022491703204, 29.870598526599],
						[122.021321316412, 29.869380000728],
						[122.021480826646, 29.871740954996],
						[122.020524673608, 29.872163227036],
						[122.018865511883, 29.871471167024],
						[122.017858297629, 29.867950400677]
					],
					longlat: [121.875142652069, 29.878470967974],
					Cost: 50,
					Cost2: null,
					distance: "5.24公里"
				}, {
					Name: "铃隆堆场",
					Gps: [
						[121.864177249219, 29.921292923433],
						[121.866281616048, 29.920737966187],
						[121.867066009195, 29.922681106597],
						[121.86494335777, 29.923358767232]
					],
					longlat: [121.864695250772, 29.922052751127],
					Cost: 0,
					Cost2: null,
					distance: "0.32公里"
				}, {
					Name: "铃与堆场",
					Gps: [
						[121.893569392061, 29.875296208924],
						[121.894683580666, 29.875212394911],
						[121.89468726077, 29.876558998657],
						[121.893003454721, 29.876625560294],
						[121.892597594939, 29.876601253502],
						[121.892620407129, 29.875892993986],
						[121.892707223257, 29.875476449125]
					],
					longlat: [121.893603420345, 29.875426537309],
					Cost: 50,
					Cost2: null,
					distance: "6.13公里"
				}, {
					Name: "中亚堆场",
					Gps: [
						[121.815380153353, 29.906066114095],
						[121.816601663096, 29.907402413773],
						[121.81516954273, 29.908204144586],
						[121.814918367032, 29.908337735942],
						[121.814228583975, 29.908625610318],
						[121.813557757886, 29.907784096785],
						[121.813266704912, 29.90728751617],
						[121.813185979013, 29.907070538122]
					],
					longlat: [121.814669388267, 29.906752455112],
					Cost: 0,
					Cost2: null,
					distance: "5.31公里"
				}, {
					Name: "梅山堆场(梅山码头)",
					Gps: [
						[121.993328940195, 29.766664780336],
						[122.001448798946, 29.761528062206],
						[122.017535490287, 29.77379715044],
						[122.015042761867, 29.777728666229],
						[122.024491165967, 29.791958412805],
						[122.014461482437, 29.792877568054],
						[121.99577369476, 29.773683973709],
						[121.99577369476, 29.773683973709]
					],
					longlat: [121.993680926528, 29.766751378898],
					Cost: 300,
					Cost2: 300,
					distance: "21.50公里"
				}, {
					Name: "二期堆场(二期码头)",
					Gps: [
						[121.865042052852, 29.924218421033],
						[121.87438743959, 29.923020984237],
						[121.877711406594, 29.932193456818],
						[121.866527203626, 29.935855428222],
						[121.864957195728, 29.930777134031],
						[121.863339002377, 29.931269912194],
						[121.862727525556, 29.930128509622],
						[121.861195424675, 29.92603068217],
						[121.862795782454, 29.926778634259],
						[121.86569135936, 29.926234335967]
					],
					longlat: [121.865799789063, 29.925264543402],
					Cost: 0,
					Cost2: 0,
					distance: "0公里"
				}, {
					Name: "通达一堆场",
					Gps: [
						[121.861260873542, 29.922261968159],
						[121.862070593827, 29.924397963031],
						[121.860804465882, 29.924852859961],
						[121.861047019481, 29.925541758602],
						[121.859026404669, 29.926081925599],
						[121.858378424101, 29.924445788783],
						[121.858045847398, 29.923373014443]
					],
					longlat: [121.861148908004, 29.922373119608],
					Cost: 0,
					Cost2: null,
					distance: "0.51公里"
				}, {
					Name: "通达二堆场",
					Gps: [
						[121.864159252413, 29.921331003282],
						[121.866276605765, 29.920732996481],
						[121.867046988856, 29.922700240985],
						[121.864983482654, 29.923475588808],
						[121.864960395863, 29.923385687987]
					],
					longlat: [121.865337795476, 29.923273746825],
					Cost: 0,
					Cost2: null,
					distance: "0.18公里"
				}, {
					Name: "鑫三利堆场一",
					Gps: [
						[121.866214018245, 29.898476490248],
						[121.869031545648, 29.897821649665],
						[121.868335090097, 29.896289742595],
						[121.866206280449, 29.896433848684],
						[121.865819648868, 29.896538122764]
					],
					longlat: [121.866769187116, 29.896395265841],
					Cost: 0,
					Cost2: null,
					distance: "3.17公里"
				},  {
					Name: "鑫三利堆场三",
					Gps: [
						[121.866214018245, 29.898476490248],
						[121.869031545648, 29.897821649665],
						[121.868335090097, 29.896289742595],
						[121.866206280449, 29.896433848684],
						[121.865819648868, 29.896538122764]
					],
					longlat: [121.866769187116, 29.896395265841],
					Cost: 50,
					Cost2: null,
					distance: "3.17公里"
				}, {
					Name: "宏达一堆场",
					Gps: [
						[121.866309883398, 29.91268010424],
						[121.866049503353, 29.91274369065],
						[121.865576680118, 29.911197362347],
						[121.868514626752, 29.910617101693],
						[121.868812341342, 29.912086630748],
						[121.868812341342, 29.912086630748]
					],
					longlat: [121.866323894464, 29.912605014588],
					Cost: 0,
					Cost2: null,
					distance: "1.36公里"
				}, {
					Name: "宏达四堆场",
					Gps: [
						[121.889141693121, 29.876324329067],
						[121.889187984814, 29.879222726436],
						[121.886408978612, 29.879283515971],
						[121.886361132731, 29.87693699758]
					],
					longlat: [121.889129707548, 29.876253575612],
					Cost: 50,
					Cost2: null,
					distance: "5.86公里"
				}, {
					Name: "海丰堆场",
					Gps: [
						[121.796157572641, 29.93251915825],
						[121.795563450314, 29.931962476312],
						[121.794467005355, 29.932903108152],
						[121.796546185928, 29.93486930087],
						[121.796951005598, 29.935373109486],
						[121.798064653636, 29.93432208148]
					],
					longlat: [121.798506956458, 29.934441350348],
					Cost: 0,
					Cost2: null,
					distance: "6.56公里"
				}, {
					Name: "英丰堆场",
					Gps: [
						[121.813062826701, 29.932136850224],
						[121.813918735446, 29.932690604992],
						[121.8147743387, 29.93305786106],
						[121.812729390226, 29.934828496454],
						[121.811308118997, 29.933591202358]
					],
					longlat: [121.81304586384, 29.934218132388],
					Cost: 0,
					Cost2: null,
					distance: "5.18公里"
				}, {
					Name: "三期堆场(三期码头)",
					Gps: [
						[121.840264197536, 29.930974936978],
						[121.842840480806, 29.930123283047],
						[121.84468695283, 29.933374567084],
						[121.845962506184, 29.93716345047],
						[121.847684507984, 29.940283202895],
						[121.846575368218, 29.940880103359],
						[121.835412167113, 29.945258482325],
						[121.834893736458, 29.945482973654],
						[121.832653166742, 29.940589747854],
						[121.834529677898, 29.939779810082],
						[121.838177648711, 29.93895349313],
						[121.835023324572, 29.932605216267]
					],
					longlat: [121.840313059895, 29.931040754426],
					Cost: 0,
					Cost2: 0,
					distance: "2.53公里"
				}, {
					Name: "安信一堆场",
					Gps: [
						[121.858800286217, 29.921288895234],
						[121.85929895576, 29.922615565506],
						[121.860830688397, 29.922138399096],
						[121.861135710427, 29.922052086863],
						[121.860541807488, 29.920675391601]
					],
					longlat: [121.85867221296, 29.921086704825],
					Cost: 0,
					Cost2:null,
					distance: "0.79公里"
				}, {
					Name: "安信三堆场",
					Gps: [
						[121.908532553751, 29.890830686404],
						[121.908545888545, 29.89048261587],
						[121.909590796403, 29.890193838707],
						[121.91037879881, 29.89002231884],
						[121.911199262538, 29.889259196765],
						[121.911478523168, 29.888502021969],
						[121.912661653959, 29.888621853819],
						[121.914005858401, 29.889681813423],
						[121.913379488151, 29.891321356166],
						[121.913379488151, 29.891321356166]
					],
					longlat: [121.911017819244, 29.890462495968],
					Cost: 50,
					Cost2: null,
					distance: "5.81公里"
				}, {
					Name: "新霸达堆场",
					Gps: [
						[121.884440108094, 29.880165896338],
						[121.882414684644, 29.880636263293],
						[121.881856204999, 29.879730286563],
						[121.881424349316, 29.878767014325],
						[121.881226017935, 29.87826954981],
						[121.881365863028, 29.878017208556],
						[121.882475849653, 29.877782893149],
						[121.88284153813, 29.877686427289],
						[121.883405103282, 29.877597352639],
						[121.883733924424, 29.878225255533]
					],
					longlat: [121.884662461678, 29.879819897908],
					Cost: 50,
					Cost2: null,
					distance: "5.34公里"
				}, {
					Name: "龙星堆场",
					Gps: [
						[121.834834533337, 29.92601133434],
						[121.828845618319, 29.927518011905],
						[121.829257385569, 29.92837105362],
						[121.830938196096, 29.928020135979],
						[121.83329790122, 29.927680919878],
						[121.8381443057, 29.926564087515],
						[121.839441637842, 29.926297278232],
						[121.838956868361, 29.925239861618],
						[121.838545484568, 29.925076771064]
					],
					longlat: [121.834760014272, 29.926197987731],
					Cost: 0,
					Cost2: null,
					distance: "2.98公里"
				}, {
					Name: "福洋堆场",
					Gps: [
						[121.822363139644, 29.928720064715],
						[121.821732965847, 29.928858066559],
						[121.82085951688, 29.927488782895],
						[121.821641817025, 29.926986108005],
						[121.822253981251, 29.926718743176],
						[121.823507835214, 29.928377412064]
					],
					longlat: [121.82226613852, 29.928218253757],
					Cost: 0,
					Cost2: null,
					distance: "4.20公里"
				}, {
					Name: "亿流一堆场",
					Gps: [
						[121.796157572641, 29.93251915825],
						[121.795563450314, 29.931962476312],
						[121.794467005355, 29.932903108152],
						[121.796546185928, 29.93486930087],
						[121.796951005598, 29.935373109486],
						[121.798064653636, 29.93432208148]
					],
					longlat: [121.795728397607, 29.932783951742],
					Cost: 0,
					Cost2: null,
					distance: "6.80公里"
				}, {
					Name: "宏达三堆场",
					Gps: [
						[121.866214018245, 29.898476490248],
						[121.869031545648, 29.897821649665],
						[121.868335090097, 29.896289742595],
						[121.866206280449, 29.896433848684],
						[121.865819648868, 29.896538122764]
					],
					longlat: [121.866769187116, 29.896395265841],
					Cost: 0,
					Cost2: null,
					distance: "3.17公里"
				}, {
					Name: "中创四堆场",
					Gps: [
						[121.896272330574, 29.904445476693],
						[121.892951124449, 29.90471812655],
						[121.893672820335, 29.903554604444],
						[121.89444959767, 29.902953119551],
						[121.895297523611, 29.902757429042],
						[121.895820902753, 29.902692835538],
						[121.896308062029, 29.902730970623],
						[121.897580398539, 29.903420143871],
						[121.899303679699, 29.903516319357],
						[121.899366714096, 29.904227197524],
						[121.899366714096, 29.904227197524]
					],
					longlat: [121.896487331764, 29.904285599136],
					Cost: 50,
					Cost2: null,
					distance: "3.75公里"
				}, {
					Name: "珉钧堆场(白峰)",
					Gps: [
						[122.021118218796, 29.826018197604],
						[122.021676020725, 29.824630021585],
						[122.03025686123, 29.82680117589],
						[122.029743420984, 29.827605283783],
						[122.028834156412, 29.827606555735],
						[122.027460803078, 29.82802095836],
						[122.027034149534, 29.828653165573],
						[122.026732621105, 29.829055920436],
						[122.024112584458, 29.827375234781]
					],
					longlat: [122.024765471378, 29.827018046444],
					Cost: 200,
					Cost2: null,
					distance: "18.82公里"
				}, {
					Name: "珉钧三堆场(大榭)",
					Gps: [
						[121.836386414047, 29.931760949879],
						[121.835521496358, 29.929772756259],
						[121.836120628382, 29.929564649339],
						[121.83737682474, 29.929259137349],
						[121.838110505346, 29.92908400344],
						[121.838858809234, 29.930771298738],
						[121.838823096819, 29.930923720916],
						[121.838702676697, 29.931003672234]
					],
					longlat: [121.837181546729, 29.931366127779],
					Cost: 0,
					Cost2: null,
					distance: "2.84公里"
				}, {
					Name: "珉钧五堆场(北仑)",
					Gps: [
						[121.798672645204, 29.935084270708],
						[121.800039054849, 29.936284678026],
						[121.799428399138, 29.936667936684],
						[121.799020171935, 29.936519218322],
						[121.798444769769, 29.93629689532],
						[121.798084479633, 29.936160488308],
						[121.797712132332, 29.936005233637],
						[121.797562983307, 29.935942570787],
						[121.797428823417, 29.935864887743],
						[121.797315508851, 29.935622126224],
						[121.798613563432, 29.935021335903]
					],
					longlat: [121.798852453477, 29.934833987115],
					Cost: 0,
					Cost2: null,
					distance: "6.53公里"
 				}
             , {
					Name: "长胜物流中心",
					Gps: [],
					longlat: [],
					Cost: 50,
					Cost2: 0,
					distance: ""
				}, {
					Name: "天翔五(原长胜中创)",
					Gps: [],
					longlat: [],
					Cost: 100,
					Cost2: 0,
					distance: ""
				}, {
					Name: "荣盛一",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				}, {
					Name: "荣盛二",
					Gps: [],
					longlat: [],
					Cost: 50,
					Cost2: 0,
					distance: ""
				}, {
					Name: "荣盛三(梅山)",
					Gps: [],
					longlat: [],
					Cost: 300,
					Cost2: 0,
					distance: ""
				},
				];
				
				var  maxBox=[ {
					Name: "二期码头（提箱0元 进港0元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				}, {
					Name: "三期码头（提箱0元 进港0元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "四期码头（提箱100元 进港200元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "远东码头（提箱100元 进港200元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "梅山码头（提箱300元 进港300元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "大榭码头（提箱100元 进港150元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				}]
				
				var  minBox=[ {
					Name: "二期码头（提箱0元 进港0元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				}, {
					Name: "三期码头（提箱0元 进港0元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "四期码头（提箱100元 进港150元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "远东码头（提箱100元 进港150元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "梅山码头（提箱300元 进港300元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				},
				{
					Name: "大榭码头（提箱100元 进港100元）",
					Gps: [],
					longlat: [],
					Cost: 0,
					Cost2: 0,
					distance: ""
				}]
				
export {
	searchLists,
	autoBoatsCompany,
	resultList,
	steps,
	users,
	detailBasic,
	boxtype,
	addbox,
	boxlist,
	droplist,
	droplistx,
	dataBoxrules,
	mapsteps,
	positionCarouselList,
	ontimelist,
	namelists,
	orderlist,
	addresslist,
	addAddress,
	filterList,
	documentlist,
	docBasic,
	YardListData,
	maxBox,
	minBox
}