<template>
	<!-- /box/Info/fc1a4318-2b2d-4602-88ca-8e389e8ca951/82eb8db5-d065-4fc2-8be1-d4e9d5c60626 -->
	<div class="simple-stack"  v-loading="loading">
		<div class="page page-root page-behind" @click="$router.push('/ontime/detail/'+$route.params.pid)">
			<a> 返回海运详情</a>
		</div>
		<div class="page page-1">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">{{ BoxInfo.LADING_NUM }}&nbsp;&nbsp;&nbsp;{{ BoxInfo.PORT_OF_DISCHARGE_NAME }}</span>
						<p class="desc"></p>
					</div>

				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>

				<div class="neworder pform">
					<div class="block">
						<h1>客户信息</h1>
						<div class="result">
							<p><label>委托人:</label><span>{{ BoxInfo.HD_COMPANY_NAME }}</span></p>
						</div>
					</div>
					<div class="block">
						<h1>基本信息</h1>
						<div class="result">
							<p><label>出口口岸:</label><span>{{ BoxInfo.E_PORT_NAME}}</span></p>
							<p><label>提单号:</label><span>{{ BoxInfo.LADING_NUM }}</span></p>
							<p><label>目的港：</label><span>{{ BoxInfo.PORT_OF_DISCHARGE_NAME }}</span></p>
							<p><label>船公司:</label><span>{{ BoxInfo.SHIP_COMPANY_NAME }}</span></p>
							<p><label>船名/航次:</label><span>{{ BoxInfo.SHIP_NAME }}/{{ BoxInfo.VOYAGE }}</span></p>
						</div>
					</div>
					<div class="block">
						<h1>拖车

						</h1>
						<div class="tbox">
							<div class="hrline"></div>
							<ul class="tul">
								<li v-for="(item,index) in BoxInfo.TrackList" :key="index" :class="{'active':item.TYPE!=0}">
									<p class="name">{{item.BOX_STATUS}}</p>
									<img v-if="item.TYPE!=0" src="@/assets/greendotline.png" />
									<img v-else src="@/assets/greydotline.png" />
									<p class="grey" v-if="item.CREATEDTIME">{{item.CREATEDTIME | momentHHmm}}</p>
									<p class="grey" v-if="item.CREATEDTIME">{{item.CREATEDTIME| moment}}</p>
									<p class="grey notime" v-if="!item.CREATEDTIME">暂无时间</p>
									<img class="gline" src="@/assets/gline.png" />
								</li>
							</ul>
						</div>
						<div class="ttable">
							<el-row class="theader">
								<el-col :span="3">箱号
									<i class="iconfont icon-tupian" :class="{'blue':BoxInfo.IsBoxNoImg==1}">
										<img class="bigpic" :src="'http://www.jihuobao.net/jihuo/rest/img/BoxNo?tcBoxId='+BoxInfo.ID" v-if="BoxInfo.IsBoxNoImg==1" />
									</i>
								</el-col>
								<el-col :span="3">封号
									<i class="iconfont icon-tupian" :class="{'blue':BoxInfo.IsSealNoImg==1}">
										<img class="bigpic" :src="'http://www.jihuobao.net/jihuo/rest/img/SEALNO?tcBoxId='+BoxInfo.ID" v-if="BoxInfo.IsSealNoImg==1" />
									</i>
								</el-col>
								<el-col :span="3">箱重(KG)</el-col>
								<el-col :span="4">提箱点</el-col>
								<el-col :span="3">进港码头</el-col>
								<el-col :span="2">箱型</el-col>
								<el-col :span="3">
									状态
									<!-- 	<img src="@/assets/greendot.png" /> -->
									<!-- <img src="@/assets/greydot.png"/> -->
								</el-col>
								<el-col :span="3">装箱时间</el-col>
								<!-- 	<el-col :span="3">操作</el-col> -->
							</el-row>
							<el-row class="ttr">
								<el-col :span="3">{{ BoxInfo.BOX_NO }}&nbsp;</el-col>
								<el-col :span="3">{{ BoxInfo.SEAL_NO }}&nbsp;</el-col>
								<el-col :span="3">{{ BoxInfo.BOX_WEIGHT }}&nbsp;</el-col>
								<el-col :span="4" class="ellipsis" :title="BoxInfo.E_LO_YARD_NAME">{{ BoxInfo.E_LO_YARD_NAME }}&nbsp;</el-col>
								<el-col :span="3">{{ BoxInfo.E_DOCK_NAME }}&nbsp;</el-col>
								<el-col :span="2">{{ BoxInfo.BOX_TYPE }}&nbsp;</el-col>
								<el-col :span="3">{{ BoxInfo.BOX_STATUS }}&nbsp;</el-col>
								<el-col :span="3">{{ BoxInfo.ENDDAY }}&nbsp;</el-col>
								<!-- <el-col :span="3">
									<el-button type="text" size="mini">编辑</el-button> 
									<el-button type="text" size="mini">复制信息</el-button>
									<i class="iconfont icon-jiantou-xia-cuxiantiao"></i>

								</el-col> -->
							</el-row>
							<el-row class="ttr blacktr">
								<el-col :span="6">
									<!-- 	<i class="iconfont icon-info"></i> -->
									<label>司机：</label>
									<span class="bspan">{{ BoxInfo.CD_USERS_NAME }}/{{ BoxInfo.CD_USERS_MOBILE }}</span>
								</el-col>
								<el-col :span="5">
									<label>车牌：</label>
									<span class="bspan">{{ BoxInfo.CD_CARNUM }}</span>

								</el-col>
								<el-col :span="13">
									<label>备注：</label>
									<span class="bspan">{{ BoxInfo.ED_NOTES }}</span>
								</el-col>
							</el-row>
							<el-row class="maptr" v-if="BoxInfo.E_BOX_STATUS<12">
								<el-col :span="24">
									<div class="noGPS">{{BoxInfo.BOX_STATUS}}</div>
									<img src="@/assets/nogpsmap2.png" width="100%" height="240px" class="mappicbg" />
								</el-col>
							</el-row>
							<el-row class="maptr" v-if="BoxInfo.E_BOX_STATUS<99&&BoxInfo.E_BOX_STATUS>11">
								<el-col :span="21">
									<div class="mapblock">
										<div class="amap-page-container" style="width:755px;height:240px;">
											<el-amap vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :events="events" ref="mapdlg">
												<el-amap-marker v-for="(marker,index) in markers" :key="index" :position="marker.position" :events="marker.events"
												 :content="marker.content"></el-amap-marker>
												<el-amap-info-window v-if="window" :position="window.position" :visible="window.visible" :offset="offset"></el-amap-info-window>
											</el-amap>
										</div>
									</div>
								</el-col>
								<el-col :span="3">
									<div class="mapdesc" id="my-list">
									</div>
								</el-col>
							</el-row>
							<el-row class="maptr" v-if="BoxInfo.E_BOX_STATUS>99&&BoxInfo.E_BOX_STATUS<999">
								<el-col :span="24">
									<div class="noGPS">{{BoxInfo.BOX_STATUS}}</div>
									<img src="@/assets/nogpsmap2.png" width="100%" height="240px" class="mappicbg" />
								</el-col>
							</el-row>
							<el-row class="maptr" v-if="BoxInfo.E_BOX_STATUS>=999">
								<el-col :span="24">
									<div class="noGPS">已开船</div>
									<img src="@/assets/nogpsmap2.png" width="100%" height="240px" class="mappicbg" />
								</el-col>
							</el-row>
						</div>
					</div>
					<div class="block">
						<div class="fileblock">
							<div class="filebox clearfix" style="margin-bottom:40px;">
								<h2>
									<span>文件</span>
								</h2>
								<ul>
									<li v-for="(item,index) in defaultList" :key="index">
										<div class="filetype">
											<img v-if="item.FileType=='ppt'" src="@/assets/ppt.png" class="type" />
											<img v-if="item.FileType=='doc'||item.FileType=='docx'" src="@/assets/doc.png" class="type" />
											<img v-if="item.FileType=='xls'||item.FileType=='xlsx'" src="@/assets/xls.png" class="type" />
											<img v-if="item.FileType=='pdf'" src="@/assets/pdf.png" class="type" />
											<template v-if="imgTypes.indexOf(item.FileType)>-1">
												<!--图片后缀文件-->
												<img :src="'https://www.jihuobao.net/filecenter'+item.FilePath" class="pic" />
											</template>
											<template v-else-if="item.FileType=='ppt'||
						item.FileType=='doc'||item.FileType=='docx'||
						item.FileType=='xls'||item.FileType=='xlsx'||
						item.FileType=='pdf'
						">
												<!--有设计ICON文件-->
												<span class="havetype">
													{{item.FileType}}
												</span>
											</template>
											<template v-else>
												<!--非图片和没有设计格式图片的文件-->
												<span class="hasnotype" v-if="imgTypes.indexOf(item.FileType)==-1">{{item.FileType}}</span>
											</template>
										</div>
										<div class="link-name">{{FileNameFn(item)}}</div>
										<div class="file-links">

											<a href="javascript:;" @click="downloadFn(item)">下载</a>
										</div>

									</li>
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>


<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.10&key=820a99b1440d7195baa183e7acf26652&plugin=AMap.PolyEditor"></script>
<script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
	import {
		AMapManager
	} from 'vue-amap';

	let amapManager = new AMapManager();

	import moment from 'moment'
	// import fileDrapUploadDetail from '@/components/commons/fileDrapUploadDetail'

	import {
		getboxInfo,
		getBoxFile
	} from '@/api/BoxService'


	export default {
		name: 'new',
		data() {

			return {
				amapManager,

				FolderId: '0',
				OrderInfo: {},
				shipgpsinfo: {
					longitude: "",
					latitude: "",
					vessel_name: "",
					voyage: "",
					sendtime: ""
				},
				BoxInfo: {},
				fileList: [],
				vid: "",
				mappoint: [],
				gpsinfo: "",
				boxinfo: "",
				boxstatus: "",
				endday: "",
				count: 1,
				slotStyle: {
					padding: '2px 8px',
					background: '#eee',
					color: '#333',
					border: '1px solid #aaa'
				},
				zoom: 14,
				center: [121.865652, 29.924881],

				windows: [],
				window: {
					position: [121.865652, 29.924881],
					content: 'content'
				},
				offset: [0, -15],

				markers: [],
				loading: true,
				markerList: null,
				events: {
					init(map) {

					}
				},
				defaultList: [],
				imgTypes: 'jpg,bmp,ico,gif,jpeg,png,JPG,BMP,ICO,GIF,JPEG,PNG',
				fileTypes: 'avi,mp3,mp4,bmp,ico,gif,jpeg,jpg,png,psd,rar,zip,swf,log,pdf,doc,docx,ppt,pptx,txt,xls,xlsx',


			}
		},
		async created() {
			//已载入高德地图API，则直接初始化地图
			if (window.AMap && window.AMapUI) {
				this.initFn()
				// 未载入高德地图API，则先载入API再初始化
			} else {

// 				await remoteLoad(`http://webapi.amap.com/maps?v=1.4.10&key=820a99b1440d7195baa183e7acf26652`)
// 				await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
				this.initFn()
			}
		},
		methods: {
			initMap() {
				var _this = this;
				return new Promise(function(resolve, reject) {

					AMapUI.loadUI(['misc/MarkerList', 'overlay/SvgMarker', 'overlay/SimpleInfoWindow'], function(MarkerList,
						SvgMarker, SimpleInfoWindow) {

						if (!SvgMarker.supportSvg) {
							//当前环境并不支持SVG，此时SvgMarker会回退到父类，即SimpleMarker
							alert('当前环境不支持SVG');
						}

						let map = amapManager.getMap();

						var markerList = new MarkerList({
							//关联的map对象
							map: map,

							//列表的dom容器的id
							listContainer: 'my-list',

							selectedClassNames: 'selected',

							//需要监听的列表节点事件
							listElementEvents: ['click'],

							//需要监听的marker事件
							markerEvents: ['click', 'mouseover', 'mouseout'],

							//需要监听的infoWindow事件
							infoWindowEvents: ['click', 'mouseover', 'mouseout'],

							//返回数据项的Id
							getDataId: function(dataItem, index) {
								//index表示该数据项在数组中的索引位置，从0开始，如果确实没有id，可以返回index代替
								return dataItem.id;
							},
							//返回数据项的位置信息，需要是AMap.LngLat实例，或者是经纬度数组，比如[116.789806, 39.904989]
							getPosition: function(dataItem) {
								return [dataItem.longitude, dataItem.latitude];
							},
							//返回数据项对应的Marker
							getMarker: function(dataItem, context, recycledMarker) {
								var label = {
									offset: new AMap.Pixel(16, 18)
								};
								return new AMap.Marker({
									label: label
								});
							},
							//返回数据项对应的列表节点
							getListElement: function(dataItem, context, recycledListElement) {
								var content = `<p>`;
								if (dataItem.isAdd == 1) {

									if (dataItem.index == 0) {
										content += `<i class="iconfont icon-zutai-ditubiaoji_X purplem"></i><span>装箱地址</span></p>`;
									} else {
										content += `<i class="iconfont icon-zutai-ditubiaoji_X bluem"></i><span>工厂地址` + (dataItem.index + 1) +
											`</span></p>`;
									}

								} else {
									content += `<i class="iconfont icon-zutai-ditubiaoji_X greenm"></i><span>车辆当前位置</span></p>`;
								}
								return content;
							},
							//坐标文本提示
							getInfoWindow: function(dataItem, context, recycledInfoWindow) {

								var contentSrt = `<div class="prompt">`;

								if (dataItem.isAdd == 1) {
									if (dataItem.address) {
										contentSrt += `<div>` + dataItem.address + `</div>`;
									}
									if (dataItem.companyName) {
										contentSrt += `<div>` + dataItem.companyName + `</div>`;
									}
									if (dataItem.contactName) {

										contentSrt += `<div>` + dataItem.contactName + "/" + dataItem.contactMobile + `</div>`;
									}
									contentSrt += `</div>`;
								} else {
									contentSrt += `<div>车牌号码：` + dataItem.CARNUM + `</div>`;
									contentSrt += `<div>当前车速：` + dataItem.velocity + `</div>`;
									contentSrt += `<div>当前状态：` + dataItem.BoxStatus + `</div>`;
									contentSrt += `<div>当前位置：` + dataItem.ampaAdds + `</div>`;
									contentSrt += `<div>最后更新：` + moment(dataItem.sendTime).format('YYYY-MM-DD HH:mm') + `</div>`;
									contentSrt += `</div>`;
								}

								return new AMap.InfoWindow({
									offset: new AMap.Pixel(0, -23),
									content: contentSrt
								});
							}

						});

						_this.markerList = markerList;

						_this.markerList.on('listElementClick', function(event, record) {
							map.setZoom(18);

							map.setCenter([record.position.lng, record.position.lat]);
						});

						//监听选中改变
						_this.markerList.on('selectedChanged', function(event, info) {
							//console.log(event, info);
						});
						resolve();
						//构建一个数据项数组，数据项本身没有格式要求，但需要支持下述的getDataId和getPosition
					});
				})


			},
			FileNameFn(item) {
				return item.FileName.length > 20 ? item.FileName.slice(0, 20) + '...' + item.FileType : item.FileName;
			},
			downloadFn(file, $event) {
				console.log(file)
				var token = "";
				token = sessionStorage.getItem('code');
				// console.log('token', token);				
				window.location.href = "https://www.jihuobao.net/filecenter/ResourceFile/downloadfile?keyValue=" + file.FileId +
					'&token=Bearer ' + token;
			},
			initFn() {
				var _this = this;
				let params = {
					BoxId: this.$route.params.id,
				}
				getboxInfo(params).then(res => {
					this.loading = false;
					if (res.success) {
						this.BoxInfo = res.data;
						if (this.BoxInfo.E_BOX_STATUS < 99 && this.BoxInfo.E_BOX_STATUS > 11) {
							console.log("港前")
							this.initMap().then(function(data) {

								_this.gpsinfo = res.data.vm;
								var data = [];
								if (_this.gpsinfo != null) {
									_this.center = [_this.gpsinfo.longitude, _this.gpsinfo.latitude];
									data.push(_this.gpsinfo);
								}
								_this.BoxInfo.AddressList.forEach((item, i) => {
									if (item.LONGITUDE && item.LATITUDE) {
										var _date = {};
										_date.longitude = item.LONGITUDE;
										_date.latitude = item.LATITUDE;
										_date.address = item.address;
										_date.companyName = item.companyName;
										_date.contactName = item.contactName;
										_date.contactMobile = item.contactMobile;
										_date.isAdd = 1;
										_date.index = i;
										data.push(_date);
									}
								})

								_this.$nextTick(() => {
									_this.markerList.render(data)
								});
							});
						}
					} else {
						this.$message.warning(`订单信息错误`);
					}
				})
				//https://www.jihuobao.net/filecenter/OpenApi/ResourceFile/GetBoxFile?keyValue=
				let params2 = {
					keyValue: this.$route.params.pid,
				}
				getBoxFile(params2).then(res => {
					if (res.type == 1 && res.resultdata.length > 0) {
						this.defaultList = res.resultdata;
					}
				})
			}
		},
		mounted() {

			// 			this.$nextTick(() => {
			// 				Promise.all([this.events.init()]).then(() => {
			// 					console.log(22)
			// 
			// 				})
			// 			});
			// 			this.$nextTick(() => {
			// 				setTimeout(() => {
			// 					this.initFn();
			// 				}, 1000)
			// 			})
		}
	}
</script>

<style lang='scss'>
	@import "@/css/tdetail.scss";

	.blue {
		position: relative;

		.bigpic {
			display: none;
			position: absolute;
			left: 0;
			top: -460px;
			z-index: 100;
			width: 390px;
			height: 440px;
			border: 1px solid rgba(151, 151, 151, 1);
		}
	}

	.blue:hover {
		.bigpic {
			display: block;
		}
	}

	.noGPS {
		width: 881px;
		height: 240px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 100;
		text-align: center;
		line-height: 240px;
		background: rgba(0, 0, 0, .6);
		color: #fff;
	}


	.amap-demo2 {
		width: 881px;
		height: 240px;

	}


	.prompt {
		width: 240px;
		background-color: #ffffff;
	}

	@import url('//at.alicdn.com/t/font_656871_0r019yjiwpxp.css');
	@import url('//at.alicdn.com/t/font_764146_cuv2k8vsio4.css');
</style>
