<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
			<a> 返回海运详情</a>
		</div>
		<div class="page page-1">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">HFYH5641564  目的港</span>
						<p class="desc"></p>
					</div>
					
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>

				<div class="neworder pform">
					<div class="block">
						<h1>客户信息</h1>
						<div class="result">
							<p><label>委托人:</label><span>宁波嘉德货运代理有限公司</span></p>							
						</div>
					</div>
					<div class="block">
						<h1>基本信息</h1>
						<div class="result">
							<p><label>出口口岸:</label><span>宁波港</span></p>
							<p><label>提单号:</label><span>HFYH5641564</span></p>
							<p><label>目的港：</label><span>玲珑</span></p>
							<p><label>船公司:</label><span>1186E</span></p>
							<p><label>船名/航次:</label><span>POS YOKOHAMA/1186E</span></p>
						</div>
					</div>                   
					<div class="block">
						<h1>拖车
						  <el-button size="small" class="ml20">添加集装箱</el-button>
						</h1>
						<div class="tbox">
							<div class="hrline"></div>
							<ul class="tul">								
								<li v-for="(item,index) in tlist" :key="index" :class="{'active':item.active}">
									<p class="name">{{item.name}}</p>
									<img v-if="item.active" src="@/assets/greendotline.png"/>
									<img v-else src="@/assets/greydotline.png"/>
									<p class="grey">{{item.hour}}</p>
									<p class="grey">{{item.date}}</p>
								</li>
							</ul>							
						</div>
						<div class="ttable">
							<el-row>
								<el-col>箱号</el-col>
								<el-col>封号</el-col>
								<el-col>箱重(KG)</el-col>
								<el-col>提箱点</el-col>
								<el-col>进港码头</el-col>
								<el-col>时间</el-col>
								<el-col>状态</el-col>
								<el-col>箱型</el-col>
								<el-col>操作</el-col>
							</el-row>
						</div>
					</div>							
					<div class="block">
						<div class="fileblock">
							<fileDrapUploadDetail :dingcangid="$route.params.cid"  :FolderId="FolderId"></fileDrapUploadDetail>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment'
	import fileDrapUploadDetail from '@/components/commons/fileDrapUploadDetail'
	import {
		detailApi,
		settingGetApi,
		settingUpdateApi,
		trailerListApi
	} from '@/api/api'
	export default {
		name: 'new',
		components: {
			fileDrapUploadDetail,
		},
		data() {
			return {
				FolderId:'0',
				fileList: [],
			    tlist:[{
					name:'发单时间',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'接单时间',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'派单时间',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'提箱',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'到工厂',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'离工厂',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'开船',
					active:true,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'海运',
					active:false,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'发单时间',
					active:false,
					date:'2018/05/27',
					hour:"9:15"
				},{
					name:'到达目的港',
					active:false,
					date:'2018/05/27',
					hour:"9:15"
				}]
				
			}
		},
		methods: {
			goTrailerFn() {
				this.$router.push('/ontime/newTrailer/' + this.$route.params.id);
			},
			templateFn(item) {
				item.show = !item.show;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			initFn() {
				let params = {
					orderId: this.$route.params.id,
				}
				detailApi(params).then(res => {
					this.detail = res.body.resultdata;
				})
			},
			temInitFn() {
				let params = {
					orderId: this.$route.params.id,
				}
				settingGetApi(params).then(res => {				
					this.templates = res.body.resultdata;
					this.showFn();
				})
			},
			showFn() {
				this.templates.forEach(item => {
					if (item.value == "towdisplay") {
						this.towdisplay = item.show;
						console.log('item', item)
					} else
					if (item.value == "customdisplay") {
						this.customdisplay = item.show;
					} else
					if (item.value == "waredisplay") {
						this.waredisplay = item.show;
					}
				})
			},
			trailerFn() {
				let params = {
					dingCangId: this.$route.params.id,
				}
				trailerListApi(params).then(res => {
					this.trailList = res.resultdata;
				})
			},
			setFn(item) {
				item.show = true;
				let params = {
					orderId: this.$route.params.id,
					data: JSON.stringify(this.templates),

				}
				settingUpdateApi(params).then(res => {
					if (res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						});
						this.showFn();
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
				})
			}

		},
		mounted() {
			this.initFn();
// 			this.trailerFn();
// 			this.temInitFn();
		}
	}
</script>

<style>

</style>
