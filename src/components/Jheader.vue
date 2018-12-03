<template>
	<section>
		<div class="Jheader">
			<span class="name">华甬</span>
			<Jnav></Jnav>
			<el-dropdown class="fr headDrop" trigger="click" placement="bottom-end">
				<span class="el-dropdown-link">
					<i class="iconfont icon-sanjiaoxing"></i><img src="../assets/erha.jpg" class="headImg" />
				</span>
				<el-dropdown-menu class="userDrop" slot="dropdown">
					<el-dropdown-item class="user" @click.native="">
						<label>{{user.CName}}</label>
						<p>{{user.MobilePhone}}</p>
					</el-dropdown-item>
					<el-dropdown-item @click.native="$router.push('')">
						<label>个人设置</label>
						<p>头像、名字、密码等</p>
					</el-dropdown-item>
					<el-dropdown-item @click.native="">
						<label>分享＆伙伴</label>
						<p>分享邀请伙伴</p>
					</el-dropdown-item>
					<el-dropdown-item class="team divided">
						<el-row>
							<el-col :span="12">
								<div class="ellipsis" @click="">华甬</div>
							</el-col>
							<el-col :span="12" class="center" @click.native="">
								<span class="set">
									设置
								</span>
							</el-col>
						</el-row>
					</el-dropdown-item>
					<el-dropdown-item class="divided quit" @click.native="loginOutFn">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<label class="headName">{{user.CName}}</label>
		</div>
		</div>
	</section>
</template>

<script>
	import Jnav from '@/components/Jnav'
	export default {
		name: 'Jheader',
		components: {
			Jnav
		},
		data() {
			return {
				company: '华甬',
				user: {}
			}
		},
		methods: {
			loginOutFn() {
				this.$store.dispatch('LogOut').then(res => {
					window.location.href = _loginHref;
				}).catch(err => {
					console.log('cuowu', err);
				})
			},
			userFn() {
				this.user = JSON.parse(sessionStorage.getItem('user'));
				
			},
		},
		mounted() {
			this.userFn();
		}
	}
</script>

<style lang="scss" scoped>
	.Jheader {
		height: 28px;
		line-height: 28px;
		font-size: 1em;
		text-align: center;
		padding: 16px 20px;
		box-sizing: content-box;
		width: 1000px;
		margin: 0 auto;

		.name {
			color: #1F9AA5;
			font-size: 20px;
			float: left;
		}

		.logoImg {
			float: left;
		}

		.headDrop {
			.headImg {
				width: 25px;
				height: 25px;
				border-radius: 50%;
			}

			.icon-sanjiaoxing{
				color: #848486;
				font-size: .78em;
				margin-right:5px;
				float: left;
			}

			.el-dropdown-link {
				cursor: pointer;
			}
		}
		.registerA {
			margin-right: 22px;
		}
		.bBtn {
			width: 92px;
			height: 40px;
			font-size: 18px;
			background: none;
		}

		.headName {
			float: right;
			color: #1F9AA5;
			margin-right: 10px;
			font-size: .89em;
		}
	}
</style>
