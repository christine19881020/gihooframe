<template>
	<section>
		<el-dialog width="500px" :visible.sync="dlgloginshow" @close="closeFn">
		<div class="logindlg">
			<img src="@/assets/logo2.png" class="logo" />
			<el-row class="tabs">
				<el-col :span="6" class="tab" :class="{'active':accountShow}" @click.native="accountFn">
					<i class="fa fa-user"></i>
					<span>账户登录</span>
					<div class="triangle-up" v-if="accountShow" style="margin-left:48px;">
						<div class="triangle-up-inner">
						</div>
					</div>
				</el-col>
				<el-col :span="6" class="tab" :class="{'active':mobileShow}" @click.native="mobileFn">
					<i class="iconfont icon-iPhone"></i>
					<span>手机登录</span>
					<div class="triangle-up" v-if="mobileShow">
						<div class="triangle-up-inner">
						</div>
					</div>
				</el-col>
				<!--<el-col :span="6" class="tab" :class="{'active':wechatShow}" @click.native="wechatFn">-->
				<el-col :span="6" class="tab" :class="{'active':wechatShow}" style="cursor: not-allowed;">
					<i class="fa fa-wechat"></i>
					<span>微信登录</span>
					<div class="triangle-up" v-if="wechatShow">
						<div class="triangle-up-inner">
						</div>
					</div>
				</el-col>
				<!--<el-col :span="6" class="tab" :class="{'active':dingTalkShow}" @click.native="dingTalkFn">-->
				<el-col :span="6" class="tab" :class="{'active':dingTalkShow}" style="cursor: not-allowed;">
					<i class="iconfont icon-pinpaibiaoshi-dingding"></i>
					<span>钉钉登录</span>
					<div class="triangle-up" v-if="dingTalkShow">
						<div class="triangle-up-inner">
						</div>
					</div>
				</el-col>
			</el-row>

			<div class="loginBox">
				<!--账号登录-->
				<el-form v-if="accountShow" :model="ruleFormAccount" :rules="rulesAccount" ref="ruleFormAccount" class="demo-ruleForm">
					<el-form-item prop="mobile">
						<el-input clearable v-model="ruleFormAccount.mobile" placeholder="你的手机号码"></el-input>
					</el-form-item>

					<el-form-item prop="pass">
						<el-input clearable v-model="ruleFormAccount.pass" type="password" placeholder="密码,至少6位字符"></el-input>
					</el-form-item>

					<p class="next-login clearfix">
						<el-checkbox v-model="ruleFormAccount.checked">下次自动登录</el-checkbox>
						<router-link to="/forgetPassword" class="forget-pass">忘记密码？</router-link>
					</p>
					<el-button class="registerBtn" style="width:100%" @click="submitForm('ruleFormAccount')" type="registerBtn">登录</el-button>
					<!--<p class="text-center accounted">没有账号？
						<router-link to="/register" class="green-a">立即注册 →</router-link>
					</p>-->
					<div style="height:20px;"></div>
				</el-form>

				<!--手机号登录-->
				<el-form v-if="mobileShow" :model="ruleFormMobile" :rules="rulesMobile" ref="ruleFormMobile" class="demo-ruleForm">
					<el-form-item prop="mobile">
						<el-input clearable v-model="ruleFormMobile.mobile" placeholder="你的手机号码"></el-input>
					</el-form-item>
					<el-form-item prop="code">
						<el-row>
							<el-col :span="16">
								<el-input clearable v-model="ruleFormMobile.code" placeholder="验证码"></el-input>
							</el-col>
							<el-col :span="1">&nbsp;</el-col>
							<el-col :span="7" class='text-right'>
								<el-button class="gBtn" @click="sendCodeFn">获取验证码</el-button>
							</el-col>
						</el-row>
					</el-form-item>
					<p class="next-login clearfix">
						<el-checkbox v-model="ruleFormMobile.checked">下次自动登录</el-checkbox>
						<router-link to="/forgetPassword" class="forget-pass">忘记密码？</router-link>
					</p>

					<el-button class="registerBtn" style="width:100%" @click="submitForm('ruleFormMobile')" type="registerBtn">登录</el-button>
					<!--<p class="text-center accounted">没有账号？
						<router-link to="/register" class="green-a">立即注册 →</router-link>
					</p>-->
					<div style="height:20px;"></div>
				</el-form>
				<!--微信登录-->
				<div v-if="wechatShow" class="wechat-login">
					<img src="@/assets/erweima.jpg" />
					<p>请使用微信扫描二维码登录</p>
				</div>

				<!--钉钉登录-->
				<div v-if="dingTalkShow" class="wechat-login">
					<img src="@/assets/erweima.jpg" />
					<p>请使用钉钉扫描二维码登录</p>
				</div>

			</div>
		</div>
		</el-dialog>
	</section>
</template>

<script>
	import Cookies from 'js-cookie'
	import { sendcode, mobilelogin } from '@/api/api'
	export default {
		name: 'login',
		data() {
			return {
//				dlgloginshow:true,
				accountShow: true,
				mobileShow: false,
				wechatShow: false,
				dingTalkShow: false,
				ruleFormAccount: {
					mobile: '',
					pass: '',
					code: "",
					checked: true
				},
				rulesAccount: {
					mobile: [{
						required: true,
						message: '请输入你的手机号码',
						trigger: 'blur'
					}],
					pass: [{
						required: true,
						message: '请输入你的密码',
						trigger: 'blur'
					}]
				},

				ruleFormMobile: {
					mobile: '',
					code: '',
					checked: true
				},
				rulesMobile: {
					mobile: [{
						required: true,
						message: '请输入你的手机号码',
						trigger: 'blur'
					}],
					code: [{
						required: true,
						message: '请输入你的验证码',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			closeFn(){
				this.$store.dispatch('logincloseFn',false);
			},
			submitForm(formName) {
				console.log(formName)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(formName == "ruleFormAccount") {
							this.loginAccount();
						} else if(formName == "ruleFormMobile") {
							this.loginMobile();
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			loginAccount() {
				let params = {
					accountname: this.ruleFormAccount.mobile,
					accountpassword: this.ruleFormAccount.pass,
					autologin: this.ruleFormAccount.checked ? 1 : 0
				}
				this.$store.dispatch('login', params).then(res => {
					if(res.type == 1) {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'success'
						});
						sessionStorage.setItem('usertype', 0);
						//下次自动登录
						if(this.ruleFormAccount.checked) {
							Cookies.set('ruleFormAccountmobile', this.ruleFormAccount.mobile);
							Cookies.set('ruleFormAccountpass', this.ruleFormAccount.pass);
						} else {
							Cookies.remove('ruleFormAccountmobile');
							Cookies.remove('ruleFormAccountpass');
						}
						sessionStorage.setItem('user', JSON.stringify(res.resultdata));
						console.log(res.resultdata)
						if(res.resultdata.company == "汇浮") {
							console.log('huifu')
							this.$router.push('/task/list');
						} else {
//							window.location.href = 'https://www.gihoo.work/#/ontime/map';
						}
					}
				}).catch(res => {})
			},
			loginMobile() {
				let params = {
					mobile: this.ruleFormMobile.mobile,
					code: this.ruleFormMobile.code
				}
				this.$store.dispatch('mobilelogin', params).then(res => {
					this.$message({
						showClose: true,
						message: res.message,
						type: 'success'
					});
					sessionStorage.setItem('usertype', 0);
					if(this.ruleFormMobile.checked) {
						Cookies.set('ruleFormMobilemobile', this.ruleFormMobile.mobile);
					} else {
						Cookies.remove('ruleFormMobilemobile');
					}
					sessionStorage.setItem('user', JSON.stringify(res.resultdata));
					//					this.$router.push('/ontime/map');
					if(res.resultdata.company == "汇浮") {
						console.log('huifu')
						window.location.href = 'https://www.gihoo.work/trail/#/task/list';
					} else {
//						window.location.href = 'https://www.gihoo.work/#/ontime/map';
					}
				}).catch(err => {
					console.log('cuowu', err);
				})
			},
			sendCodeFn() {
				if(this.ruleFormMobile.mobile.length != 11) {
					return false;
				}
				let params = {
					mobile: this.ruleFormMobile.mobile
				}
				sendcode(params).then(res => {
					if(!res.is_error) {
						this.$message({
							showClose: true,
							message: '发送成功！',
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: res.err_msg,
							type: 'error'
						});
					}

				})
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			accountFn() {
				this.accountShow = true;
				this.mobileShow = false;
				this.wechatShow = false;
				this.dingTalkShow = false;
			},
			mobileFn() {
				this.accountShow = false;
				this.mobileShow = true;
				this.wechatShow = false;
				this.dingTalkShow = false;
			},
			wechatFn() {
				this.accountShow = false;
				this.mobileShow = false;
				this.wechatShow = true;
				this.dingTalkShow = false;
			},
			dingTalkFn() {
				this.accountShow = false;
				this.mobileShow = false;
				this.wechatShow = false;
				this.dingTalkShow = true;
			},
			loginFn() {
				//this.$router.push('/INeye')
			}
		},
		watch: {},
		computed:{
			dlgloginshow:{
				get(){
					console.log(this.$store.state)
					return this.$store.state.loginvuex.show;
				},
				set(value){
					this.$store.commit('loginclose',value)
				}
				
			}
		},
		mounted() {	
			console.log(this.$store.state.loginvuex);
			if(this.ruleFormAccount.checked) {
				this.ruleFormAccount.mobile = Cookies.get('ruleFormAccountmobile');
				this.ruleFormAccount.pass = Cookies.get('ruleFormAccountpass');
			}
			if(this.ruleFormMobile.checked) {
				this.ruleFormMobile.mobile = Cookies.get('ruleFormMobilemobile');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.logindlg{
		 /*width:460px;height:422px;position:absolute;z-index:1000;
		 top:50%;left:50%;margin-top:-211px;margin-left:-230px;*/
		.logo{width:304px;display:block;margin:0 auto;}
		.tabs {
			width: 460px;
			margin: 42px auto -6px;
			font-size: 1em;
			border-bottom: none;
			.tab {
				color: #64D8E4;
				cursor: pointer;
				i {
					margin-right: .3em;
				}
				i.icon-iPhone,
				i.icon-pinpaibiaoshi-dingding {
					font-size: 1.1em;
				}
			}
			.tab.active {
				color: #1F9AA5;
			}
		}
		.tabs-triangle {
			width: 460px;
			margin: 0 auto;
			text-align: center;
		}
		.triangle-up {
			display: inline-block;
			width: 0;
			height: 0;
			border-right: 10px solid transparent;
			border-bottom: 10px solid #D8D7D7;
			border-left: 10px solid transparent;
			margin-left: 58px;
			margin-top: 10px;
			.triangle-up-inner {
				width: 0;
				height: 0;
				border-right: 10px solid transparent;
				border-bottom: 10px solid #fff;
				border-left: 10px solid transparent;
				margin-left: -10px;
				margin-top: 1px;
			}
		}
		.next-login {
			margin: 1.1em 0;
			.forget-pass {
				color: #999;
				float: right;
				font-size: .78em;
			}
		}
		.wechat-login {
			text-align: center;
			img {}
			p {
				color: #000;
				font-size: .89em;
				margin-top: 14px;
			}
		}
	}
	
	.el-button--registerBtn {
		color: #fff;
		background-color: #2FB9C6;
		border-color: #2FB9C6;
		font-size: 0.89em;
	}
	
	.el-button--registerBtn:hover {
		background-color: #1F9AA5;
		color: #fff;
	}
	
	.el-button--registerBtn:active {
		background-color: #6ADEE8;
		color: #fff;
	}
	/*//登录框*/
.loginBox {
    width: 460px;
    padding: 34px 35px 26px;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    margin: 0 auto;
    border: 1px solid #D8D7D7;
    .accounted {
        font-size: .67em;
        padding: 2.25em 0 0;
        color: #999;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
    }
}
</style>