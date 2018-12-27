<template>
	<section>
		<div class="simple-stack">
			<div class="page page-behind" @click="$router.push('/user/selfSet')">
				<a href="javascript:;" >
					个人设置
				</a>
			</div>
			<div class="page page-1">
				<h1>修改密码</h1>
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm mrt40">
					<el-form-item label="当前密码" prop="pass">
						<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item>
						<button class="saveBtn" @click="submitForm('ruleForm2')">保存</button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'changePassword',
		data() {			
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value == this.ruleForm2.pass) {
					callback(new Error('新密码与当前密码相同!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm2: {
					pass: '',
					checkPass: '',
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						alert('submit!');
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			initFn(){
				
			}
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    width: 462px;
    .desc {
        color: #8E8E8E;
        font-size: 12px;
    }
}
</style>