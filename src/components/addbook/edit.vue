<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/addbook/list')">
			<a> 返回客户列表</a>
		</div>
		<div class="page page-1">
			<div class="neworder pform">
				<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
					<h1 class="font30">编辑信息</h1>
					<div class="block">
						<h1>基本信息</h1>
						<el-form-item prop="custatt" label="公司性质">
							<el-radio-group v-model="ruleForm.custatt">
								<el-radio label="1">客户</el-radio>
								<el-radio label="2">供应商</el-radio>
								<el-radio label="3">客户/供应商</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item prop="custname" label="公司全称">
							<el-input clearable class="greyInput" v-model="ruleForm.custname" placeholder="请输入公司全称"></el-input>
						</el-form-item>
						<el-form-item prop="custsimpname" label="公司简称">
							<el-input clearable class="greyInput" v-model="ruleForm.custsimpname" placeholder="请输入公司简称"></el-input>
						</el-form-item>
						<el-form-item prop="country" label="所有国家">
							<el-autocomplete class="greyInput" clearable v-model="ruleForm.country" :trigger-on-focus="true"
							 :fetch-suggestions="querySearch" placeholder="请选择国家" @select="handleSelect">
								<template slot-scope="{ item }">
									<div class="name">{{ item.text }}</div>
								</template>
							</el-autocomplete>
						</el-form-item>
						<el-form-item prop="adress" label="公司地址">
							<el-input clearable class="greyInput" v-model="ruleForm.adress" placeholder="请输入公司地址"></el-input>
						</el-form-item>
						<el-form-item prop="serviceman" label="维护人员">
							<!-- <el-input clearable class="greyInput" v-model="ruleForm.serviceman" placeholder="请选择维护人员"></el-input> -->
							<el-autocomplete clearable popper-class="my-autocomplete" class="tbauto greyInput" v-model="ruleForm.serviceman"
							 :fetch-suggestions="querySearch2" placeholder="请选择维护人员" :trigger-on-focus="true" @select="handleSelect2">
								<template slot-scope="{ item }">
									<div class="name">{{ item.name }}</div>
								</template>
							</el-autocomplete>
						</el-form-item>
					</div>
					<div class="block">
						<h1>人员列表
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
									<td><el-input class="tbinput" v-model="item.name" placeholder="请输入姓名"></el-input></td>
									<td><el-input class="tbinput" v-model="item.tel" placeholder="请输入电话"></el-input></td>
									<td><el-input class="tbinput" v-model="item.fixtel" placeholder="请输入固话"></el-input></td>
									<td><el-input class="tbinput" v-model="item.email" placeholder="请输入邮件"></el-input></td>
									<td><el-input class="tbinput" v-model="item.dept" placeholder="请输入部门"></el-input></td>
								<td><el-input class="tbinput" v-model="item.pos" placeholder="请输入职位"></el-input></td>
								</tr>							
							</tbody>
						</table>
					</div>


					<div class="block">
						<fileupload :userid="$route.params.id"></fileupload>
					</div>
					<el-form-item class="ml0">
						<!--<el-button type="success" size="small" @click="">生成发票号</el-button>
						<el-button type="success" size="small" @click="">保存并打印</el-button>-->
						<el-button type="success" size="small" @click="submitForm('ruleForm')">保存</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import fileupload from '@/components/commons/fileupload'
	import moment from 'moment'
	import {
		contactEditApi,
		servicemanApi,
		contactDetailApi
	} from '@/api/api'
	import {
		country
	} from '@/components/country'
	export default {
		name: 'new',
		components: {
			fileupload,		
		},
		data() {
			return {
				addshow:false,
				contactTb: [],
				contact: {},
				down: {},
				ruleForm: {
					custatt: '1',
					custname: '',
					custcode: '',
					custsimpname: '',
					country: '',
					adress: '',
					serviceman: ''
				},
				rules: {
					custatt: [{
						required: true,
						message: '请选择公司性质',
						trigger: 'change'
					}, ],
					custname: [{
						required: true,
						message: '请输入公司全称',
						trigger: 'blur'
					}],
					custsimpname: [{
						required: true,
						message: '请输入公司简称',
						trigger: 'blur'
					}],
					country: [{
						required: true,
						message: '请选择国家',
						trigger: 'change'
					}],
					adress: [{
						required: true,
						message: '请输入公司地址',
						trigger: 'blur'
					}],
					serviceman: [{
						required: true,
						message: '请选择维护人员',
						trigger: 'blur'
					}],
				},
				restaurants: country,
				choosedBox: [],
				fileList: [],
			}
		},
		methods: {
			addshowFn(){
				this.addshow=true;
				this.contactTb.push(this.contact);
			},
			addnewFn() {
				if (this.contact.name &&
					this.contact.tel &&
					this.contact.fixtel &&
					this.contact.email &&
					this.contact.dept &&
					this.contact.pos) {
					this.contactTb.push(this.contact);
					this.contact = {};
				} else {
					this.$message({
						type: 'warning',
						message: '请输入全部联系人信息！'
					})
				}

			},
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.text.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				// console.log(item)
				this.ruleForm.country = item.text;
			},
			// 维护人员
			querySearch2(queryString, cb) {
				let params = {
					filter: queryString,
				}
				servicemanApi(params).then(res => {
					var results = res.body.resultdata;
					cb(results);
				})
			},
			handleSelect2(item) {
				this.ruleForm.serviceman = item.name;
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
			newFn() {
				let params = {
					customerId:this.$route.params.id,
					custatt: this.ruleForm.custatt,
					custname: this.ruleForm.custname,
					custcode: this.ruleForm.custcode,
					custsimpname: this.ruleForm.custsimpname,
					country: this.ruleForm.country,
					adress: this.ruleForm.adress,
					serviceman: this.ruleForm.serviceman,
					linkerlist: JSON.stringify(this.contactTb),
				}
				contactEditApi(params).then(res => {
					if (res.body.type == 1) {
						this.$message({
							type: 'success',
							message: res.body.message
						});
						this.$router.push('/addbook/list');
					} else {
						this.$message({
							type: 'warning',
							message: res.body.message
						})
					}
				})
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.newFn();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			initFn(){
				let params = {
					customerId: this.$route.params.id
				}
				contactDetailApi(params).then(res => {
					this.ruleForm=res.body.resultdata;
					this.contactTb=res.body.resultdata.linkerlist;
				})
			}

		},
		mounted() {
			this.initFn();
		}
	}
</script>

<style>

</style>
