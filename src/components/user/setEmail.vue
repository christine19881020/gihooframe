<template>
	<section>
	   	<div class="simple-stack">
			<div class="page page-behind" @click="$router.push('/user/selfSet')">
				<a href="javascript:;" >
					个人设置
				</a>
			</div>
			<div class="page page-1">
				<h1>设置账户</h1>
				<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm mrt40">
					<el-form-item label="邮件地址" prop="email">
						<el-input class="fl" type="text" v-model="ruleForm2.email" auto-complete="off"></el-input>
						<el-button class="fl cyanText" type="text">重新激活邮件</el-button>
					</el-form-item>
					<el-form-item label="密码" prop="pass">
						<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="名称" prop="name">
						<el-input  v-model="ruleForm2.name" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="smtp服务器" prop="stmp">
						<el-input  v-model="ruleForm2.stmp" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="端口" prop="port">
						<el-input  v-model="ruleForm2.port" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="签名" prop="sign">
						<el-input  :autosize="{ minRows: 2, maxRows: 6}" type="textarea" v-model="ruleForm2.sign"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button size="small" type="danger" @click="submitForm('ruleForm2')">删除</el-button>
						<el-button size="small" type="success" @click="submitForm('ruleForm2')">保存</el-button>
						<el-button size="small" type="text" @click="submitForm('ruleForm2')">取消</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: 'newEmail',
		data() {					
			return {
				ruleForm2: {
					email:'',
					pass: '',
					name:'',
					stmp:'',
					port:'25',
					sign: '',
				},
				rules2: {
					email: [
					  { required: true, message: '请输入邮箱', trigger: 'blur' },
					  { type:'email', message: '请输入正确邮箱', trigger: 'blur' },
					],
					pass: [
					  { required: true, message: '请输入密码', trigger: 'blur' },
					],
					name: [
					  { required: true, message: '请输入名称', trigger: 'blur' },
					],
					stmp: [
					  { required: true, message: '请输入stmp服务器', trigger: 'blur' },
					],
					port: [
					  { required: true, message: '请输入端口', trigger: 'blur' },
					],
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
	.el-input,.el-textarea{
		width: 462px;
	}
    
    .desc {
        color: #8E8E8E;
        font-size: 12px;
    }
}
</style>