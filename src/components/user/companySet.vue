<template>
	<section>
		<div class="simple-stack">
			<div class="page page-root">
				
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="120px" class="pform">
					<h1 class="font30">公司设置</h1>
					<el-form-item label="公司简称" prop="easyname">
						<el-input size="small" type="text" v-model="ruleForm2.easyname"></el-input>
					</el-form-item>
					<el-form-item label="公司全称" prop="fullname">
						<el-input size="small" type="text" v-model="ruleForm2.fullname" @blur="gcompanynameFn"></el-input>
					</el-form-item>
					<el-form-item label="信用统一码" prop="code">
						<el-input size="small" type="text" v-model="ruleForm2.code" @blur="gcompanycreditFn"></el-input>
					</el-form-item>
					<el-form-item label="海关十位数编码" prop="customscode">
						<el-input size="small" type="text" v-model="ruleForm2.customscode" @blur="gcompanycodeFn"></el-input>
					</el-form-item>
					<el-form-item label="征免性质">
						<label>{{taxStatus}}</label>
					</el-form-item>
					<el-form-item label="海关状态">
						<label>{{customsStatus}}</label>
					</el-form-item>
					<!--<div class="uploadCombine clearfix">
						<h1 class="clearfix">
						  <label>上传产品照片</label>
						  <el-upload							  
							  action="https://jsonplaceholder.typicode.com/posts/"
							  :on-preview="handlePreview"
							  :on-remove="handleRemove"
							  :before-remove="beforeRemove"
							   multiple
							  :limit="3"
							  :show-file-list=false
							  :file-list="fileList">
							  <el-button size="small">上传照片</el-button>
							</el-upload>
						</h1>
						<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
							<div class="el-upload__tip" slot="tip">（上传照片有助于顺利通关）</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</div>-->
					<el-form-item>
						<button class="saveBtn" @click="submitForm('ruleForm2')">保存</button>
						<button class="cancelBtn" @click="$router.go(-1)">取消</button>
					</el-form-item>
				</el-form>

			</div>
		</div>
	</section>
</template>

<script>
	import {
		companyinfoApi,
		companyupdateApi,
		gcompanycreditApi,
		gcompanynameApi,
		gcompanycodeApi
	} from '@/api/api'
	export default {
		name: 'changePassword',
		data() {
			return {
				taxStatus: '',
				customsStatus: '',
				ruleForm2: {
					easyname: '',
					fullname: '',
					code: '',
					customscode: ''
				},
				rules2: {
					easyname: [{
						required: true,
						message: '请输入公司简称',
						trigger: 'blur'
					}],
					fullname: [{
						required: true,
						message: '请输入公司全称',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入信用统一码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.teamModifyFn();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			gcompanycreditFn() {
				let params = {
					creditcode: this.ruleForm2.code,
				}
				gcompanycreditApi(params).then(res => {

				})
			},
			gcompanynameFn(){
				let params = {
					copname: this.ruleForm2.fullname,
				}
				gcompanynameApi(params).then(res => {

				})
			},
			gcompanycodeFn(){
				let params = {
					copcode: this.ruleForm2.customscode,
				}
				gcompanycodeApi(params).then(res => {

				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			initFn() {
				let params = {}
				companyinfoApi(params).then(res => {
					this.ruleForm2.easyname = res.body.data.data.CompanyInfo.NAME_CN_EN;
					this.ruleForm2.fullname = res.body.data.data.CompanyInfo.NAME_CN;
					this.ruleForm2.code = res.body.data.data.CompanyInfo.OrganizationCode;
					this.ruleForm2.customscode = res.body.data.data.CompanyInfo.CustomsRegistrationCode;
					this.taxStatus = res.body.data.data.CompanyInfo.ExemptFromNature;
					this.customsStatus = res.body.data.data.CompanyInfo.CustomsState;
				})
			},
			teamModifyFn() {
				let params = {
					//id 团队ID
					//name_CN 全称
					//name_CN_EN 简称
					//ITIN 税号
					ID: this.$route.params.id,
					NAME_CN: this.ruleForm2.fullname,
					NAME_CN_EN: this.ruleForm2.easyname,
					OrganizationCode: this.ruleForm2.code,
					CustomsRegistrationCode: this.ruleForm2.customscode,
					ExemptFromNature: this.taxStatus,
					CustomsState: this.customsStatus,
				}
				companyupdateApi(params).then(res => {
					if(res.is_error) {
						this.$message({
							message: res.message,
							type: 'success'
						});
					} else {
						this.$message({
							message: res.body.msg,
							type: 'error'
						});
					}
				})
			}
		},
		watch: {
			'$route.params.id': function(val) {
				this.initFn();
			}
		},
		mounted() {
			this.initFn();
		}
	}
</script>

<style lang="scss" scoped>
	.pform {
		width: 462px;
		.desc {
			color: #8E8E8E;
			font-size: 12px;
		}
	}
</style>