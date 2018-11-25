<template>
	<div class="simple-stack">
		<div class="page">
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
							<i class="fa fa-cog"></i>
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
								<span>(自动生成，是集货系统唯一码，阿拉伯数字，7位数的一个随机号)</span>
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
					
				</div>
			</div>
		</div>
	</div>
	</div>

</template>

<script>
	import {
		contactDetailApi
	} from '@/api/api'
	export default {
		data() {
			return {
				detail: {},
				contactTb:[],
				fileList:[],
			};
		},
		methods: {
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
