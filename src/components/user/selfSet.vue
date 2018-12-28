<template>
	<section>
		<div class="simple-stack">
			<div class="page">
				<h1>个人设置</h1>
				<div class="headImgUpload clearfix">
					<el-upload class="avatar-uploader" :headers="header" action="https://www.jihuobao.net/Gihoo/punctuality/user/upload/headimg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="imageUrl" :src="imageUrl" class="avatar big">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="chooseNewHead">
						<a>选择新头像</a>
						<p>你可以选择jpg/png图片作为头像</p>
					</div>
				</div>
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="名字" required>
						<el-input v-model="ruleForm.CName"></el-input>
					</el-form-item>
					<el-form-item label="手机号码" prop="MobilePhone">
						<el-input v-model="ruleForm.MobilePhone" disabled></el-input>
					</el-form-item>
					<el-form-item label="邮箱">
						<!--<el-input v-model="ruleForm.Email"></el-input>-->
						<ul>
							<li v-for="(item,index) in emailList" :key="index"><span>{{item.mailserverusername}}</span><button class="tieA" @click="setEmail(item)">设置</button></li>
							<!--<li><span>lingzhiwen@qq.com</span><el-button class="ebtn" size="mini" type="info">未验证</el-button></li>-->
							<!--<li><span>lingzhiwen@qq.com</span><el-button class="ebtn" size="mini" type="success">通过</el-button></li>
							    <li><span>lingzhiwen@qq.com</span><el-button class="ebtn" size="mini" type="danger">不通过</el-button></li>-->
						</ul>
						<router-link v-if="emailList.length==0" to="/user/newEmail" type="text" class="cyan-a">添加新邮箱</router-link>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<router-link to="/user/changePassword" class="cyan-a">修改密码</router-link>
					</el-form-item>
					<el-form-item label="微信">
						<button class="untieBtn">未绑定</button>
						<button class="tieA" @click="popshow=true">绑定</button>
						<p class="desc">绑定后，可直接使用微信登录 集货宝</p>
					</el-form-item>
					<el-form-item>
						<button class="saveBtn" @click="submitForm('ruleForm')">保存</button>
					</el-form-item>
				</el-form>
			</div>
		</div>
		<div class="erweimaPOP" v-if="popshow">
			<i class="fa fa-times-circle" @click="popshow=false"></i>
			<img src="../../assets/wema.png" />
			<p>关注并绑定集货宝</p>
		</div>
	</section>
</template>

<script>
	import changepassword from '@/components/user/changePassword'
	import { userInfoApi, userInfoModifyApi,userEmailApi } from '@/api/api'
	export default {
		name: 'changePassword',
		components: {
			changepassword
		},
		data() {
			return {
				header: {
					Authorization: ''
				},
				usertype:Number,
				emailList:[],
				popshow: false,
				userDetail: {},
				imageUrl: '',
				ruleForm: {
					CName: '',
					MobilePhone: '',
					Email: '',

				},
				rules: {
					MobilePhone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					Email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}, {
						type: 'email',
						message: '输入邮箱格式不正确',
						trigger: 'blur'
					}]

				}
			}
		},
		methods: {
			setHead() {
				let token = sessionStorage.getItem('code');
				if(token) {
					this.header.Authorization = "Bearer " + token;
				}
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.headIcon = res.filename;
				console.log(this.imageUrl, this.headIcon)
			},
			beforeAvatarUpload(file) {
				this.setHead();
				var typelist = "image/jpeg,image/png,image/jpg";
				var isIMG = false;
				if(typelist.indexOf(file.type) > -1) {
					isIMG = true
				}
				const isLt1M = file.size / 1024 / 1024 < 1;
				if(!isIMG) {
					this.$message.error('上传头像图片只能是 JPG,png 格式!');
				}
				if(!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isIMG && isLt1M;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.saveFn();
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		    initFn() {
				return new Promise((resolve,reject)=>{
					this.ruleForm = JSON.parse(sessionStorage.getItem('user'));
				    this.imageUrl=this.ruleForm.HeadImg;
				})
				
				//				console.log(this.ruleForm)
				//				let params={}
				//				userInfoApi(params).then(res=>{
				//					console.log(res)
				//					this.imageUrl=res.resultdata.HeadImg;
				//					this.ruleForm.CName=res.resultdata.CName;
				//					this.ruleForm.MobilePhone=res.resultdata.MobilePhone;
				//					this.ruleForm.Email=res.resultdata.Email;					
				//				})
			},
			saveFn() {				
				let params = {
					RealName: this.ruleForm.CName,
					HeadIcon: this.headIcon,
					Email:this.emailList[0].mailserverusername,
				}
				userInfoModifyApi(params).then(res => {
					if(res.type == 1) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.userFn();
					}
				})
			},
			userFn() {
				this.user=JSON.parse(sessionStorage.getItem('user'));
				this.usernav = this.user.usernav;
				this.listnav = this.user.listnav;
                if(this.user.CompanyId){
                	//该角色 个人 有公司
                	this.usertype=1;
                	this.$router.push('/ontime/list');
                }else{
                	this.usertype=0;
                }
			},
			getEmailFn(){
				let params={}
				userEmailApi(params).then(res=>{
					this.emailList=res.body.resultdata;
				})
			},
			setEmail(item){
//				console.log(item)
				this.$router.push('/user/setEmail/'+item.id)
			}

		},
		mounted() {
			this.initFn();
			this.getEmailFn();
		}
	}
</script>

<style lang="scss" scoped>
	.demo-ruleForm {
		width: 462px;
	}
</style>