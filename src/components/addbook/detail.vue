<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/addbook/list')">
			<a> 返回通讯录列表</a>
		</div>
		<div class="page page-1">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">{{detail.custname}}</span>
						<p class="desc"></p>
					</div>
					<ul class="set">
						<li @click="$router.push('/addbook/edit/'+$route.params.id)">
							<i class="iconfont icon-bianji"></i>
							<label>编辑</label>
						</li>
						<li @click="$router.push('/addbook/setting/'+$route.params.id)">
							<i class="iconfont icon-set"></i>
							<label>设置</label>
						</li>
					</ul>
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>

				<div class="neworder pform">
					<div class="block">
						<h1>基本信息</h1>
						<div class="result">
							<p>
								<label>公司代码:</label>
								<!-- <span>(自动生成，是集货系统唯一码，阿拉伯数字，7位数的一个随机号)</span> -->
								<span>{{companycode}}</span>
							</p>
							<p><label>公司全称:</label><span>{{detail.custname}}</span></p>
							<p><label>公司简称:</label><span>{{detail.custsimpname}}</span></p>
							<p><label>公司性质:</label>
								<span v-if="detail.custatt=='1'">客户</span>
								<span v-else-if="detail.custatt=='2'">供应商</span>
								<span v-else-if="detail.custatt=='3'">客户/供应商</span>
							</p>
							<p><label>所在国家:</label><span>{{detail.country}}</span></p>
							<p><label>详细地址:</label><span>{{detail.adress}}</span></p>
							<p><label>运维人员:</label><span>{{detail.serviceman}}</span></p>
						</div>
					</div>

					<div class="block">
						<h1>添加联系人
							<el-button size="mini" class="ml20" @click="addshowFn">添加联系人</el-button>
						</h1>
						<table class="exportTb toptb" cellpadding="0" cellspacing="0">
							<tr>
								<td class="greybg">姓名</td>
								<td class="greybg">电话</td>
								<td class="greybg">固话</td>
								<td class="greybg">邮件</td>
								<td class="greybg">部门</td>
								<td class="greybg">职位</td>
							</tr>
							<tbody>
								<tr v-if="contactTb.length>0" v-for="(item,index) in contactTb" :KEY="index">
									<td>{{item.name}}</td>
									<td>{{item.tel}}</td>
									<td>{{item.fixtel}}</td>
									<td>{{item.email}}</td>
									<td>{{item.dept}}</td>
									<td>{{item.pos}}</td>
								</tr>
								<tr v-if="addshow">
									<td>
										<el-input class="tbinput" v-model="contact.name" placeholder="请输入姓名" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="contact.tel" placeholder="请输入电话" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="contact.fixtel" placeholder="请输入固话" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="contact.email" placeholder="请输入邮件" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="contact.dept" placeholder="请输入部门" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input class="tbinput" v-model="contact.pos" placeholder="请输入职位" @keyup.enter.native="addnewFn"></el-input>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div class="block">						
						<fileupload :userid="$route.params.id"></fileupload>
					</div>

				</div>
			</div>
		</div>
	</div>
	</div>

</template>

<script>
	import fileupload from '@/components/commons/fileupload'
	import {
		contactDetailApi,
		addcusApi,
		companycodeApi,
	} from '@/api/api'
	export default {
		components: {
			fileupload,		
		},
		data() {
			return {
				companycode:'',
				addshow: false,
				detail: {},
				contact: {
					name: "",
					tel: '',
					fixtel: '',
					email: '',
					dept: "",
					pos: '',

				},
				contactTb: [],
				fileList: [],
			};
		},
		methods: {
			addshowFn() {
				this.addshow = true;
			},
			addnewFn() {
				if (this.contact.name &&
					this.contact.tel &&
					this.contact.fixtel &&
					this.contact.email &&
					this.contact.dept &&
					this.contact.pos) {
					let params = {
						customerId: this.$route.params.id,
						name: this.contact.name,
						tel: this.contact.tel,
						fixtel: this.contact.fixtel,
						email: this.contact.email,
						dept: this.contact.dept,
						pos: this.contact.pos,
					}
					addcusApi(params).then(res => {
						if (res.body.type == 1) {
							this.$message({
								type: 'success',
								message: res.body.message,
							})
							this.contactTb.push(this.contact);
							this.contact = {};
						} else {
							this.$message({
								type: 'warning',
								message: '操作失败！'
							})
						}
					})

				} else {
					this.$message({
						type: 'warning',
						message: '请输入全部联系人信息！'
					})
				}

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
					customerId: this.$route.params.id
				}
				contactDetailApi(params).then(res => {
					this.detail = res.body.resultdata;
					this.contactTb = res.body.resultdata.linkerlist;
				})
			},
			compantcodeFn(){
				let params={
					resId:'6',
					isLocal:'1',
				}
				companycodeApi(params).then(res=>{
					this.companycode=res.body.resultdata;
				})
			}
		},
		mounted() {
			this.initFn();
			this.compantcodeFn();
		}
	}
</script>

<style>

</style>
