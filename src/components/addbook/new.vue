<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/addbook/list')">
			<a> 返回客户列表</a>
		</div>
		<div class="page page-1">
			<div class="neworder pform">
				<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
					<h1 class="font30">新建信息</h1>
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
						<h1>添加联系人</h1>
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
								<tr>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.name" placeholder="请输入姓名" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.tel" placeholder="请输入电话" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.fixtel" placeholder="请输入固话" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.email" placeholder="请输入邮件" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.dept" placeholder="请输入部门" @keyup.enter.native="addnewFn"></el-input>
									</td>
									<td>
										<el-input size="mini" class="tbinput" v-model="contact.pos" placeholder="请输入职位" @keyup.enter.native="addnewFn"></el-input>
									</td>
								</tr>
							</tbody>
						</table>
					</div>


					<div class="block">
						<h1>文件
							<!--<el-button class="ml20" size="mini">上传文件</el-button>-->
							<el-upload class="filebtn ml20" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
							 :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed"
							 :file-list="fileList">
								<el-button size="small">上传文件</el-button>
							</el-upload>
						</h1>
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
	import moment from 'moment'
	import {
		newclientApi,
		servicemanApi,
	} from '@/api/api'
	import {
		country
	} from '@/components/country'
	export default {
		name: 'new',
		data() {
			return {
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
			getdownFn() {
				// 				let params = {}
				// 				newdownApi(params).then(res => {
				// 					this.down = res.body.resultdata;
				// 				})
			},
			newFn() {
				let params = {
					custatt: this.ruleForm.custatt,
					custname: this.ruleForm.custname,
					custcode: this.ruleForm.custcode,
					custsimpname: this.ruleForm.custsimpname,
					country: this.ruleForm.country,
					adress: this.ruleForm.adress,
					serviceman: this.ruleForm.serviceman,
					linkerlist: JSON.stringify(this.contactTb),
				}
				newclientApi(params).then(res => {
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
			newidFn() {
				let params = {}
				// 				newidApi(params).then(res => {
				// 				})
			},


			transwayFn(state) {
				let params = {
					orderId: this.$route.params.id,
					transway: state,
				}
				transwayApi(params).then(res => {

				})
			}
		},
		mounted() {
			this.getdownFn();
			this.newidFn();
		}
	}
</script>

<style>

</style>
