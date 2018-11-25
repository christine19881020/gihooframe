<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/addbook/list')">
			<a> 返回通讯录列表</a>
		</div>
		<div class="page page-1 page-behind" @click="$router.push('/addbook/list')">
			<a> 返回订单标题</a>
		</div>
		<div class="page page-2">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">设置</span>
						<p class="desc"></p>
					</div>
					<!-- <ul class="set">
						<li @click="">
							<i class="iconfont icon-chuan"></i>
							<label>已出运</label>
						</li>
					</ul> -->
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>
				<div class="neworder pform w600">
					<el-form :model="ruleForm" label-width="100px"  ref="ruleForm">
						<div class="block">
							<h1>选择公司性质</h1>
							<el-form-item prop="transway" style="margin-left:-80px;">
								<el-radio-group v-model="ruleForm.custatt">
									<el-radio label="1">客户</el-radio>
									<el-radio label="2">供应商</el-radio>
									<el-radio label="3">客户/供应商</el-radio>
								</el-radio-group>
							</el-form-item>
						</div>
					</el-form>
					<div class="block">
						<h1 class="mgb10">选择通讯录模块</h1>
						<h5 class="hdesc">你可以拖动模块调整位置，隐藏的模块可随时恢复。</h5>
						<!--<ul class="funTem">-->
						<!--<li v-for="(item,index) in templates" :class="{'show':!item.show,'hide':item.show}" :key="index" class="clearfix" @click="templateFn(item)">
								<span>{{item.name}}</span>
								<label class="fr" v-if="item.show">显示</label>
								<label class="fr" v-else>隐藏</label>
							</li>
						</ul>-->

						<draggable class="funTem" v-model="templates" :options="dragOptions" :move="getdata" @update="datadragEnd">
							<transition-group>
								<div v-for="(item,index) in templates" :class="{'show':!item.show,'hide':item.show}" :key="index" class="clearfix" @click="templateFn(item)">
									<span>{{item.name}}</span>
									<label class="fr" v-if="item.show">显示</label>
									<label class="fr" v-else>隐藏</label>
								</div>
							</transition-group>
						</draggable>
					</div>
					
					<el-button type="success" size="mini" @click="setFn">保存设置</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { cusSetInitApi,cusSetSaveApi } from '@/api/api'
	import draggable from 'vuedraggable'
	export default {
		name: 'setting',
		components: {
			draggable,
		},
		data() {
			return {
				ruleForm: {
					custatt: '1'
				},
				templates: [],
				transitstatus:'',
			}
		},
		methods: {
			templateFn(item) {
				item.show = !item.show;
			},
			getdata(evt) {
				console.log(evt.draggedContext.element.id)
			},
			datadragEnd(evt) {
				console.log('拖动前的索引 :' + evt.oldIndex)
				console.log('拖动后的索引 :' + evt.newIndex)
				console.log(this.tags)
			},
			initFn() {
				let params = {
					customerId: this.$route.params.id
				}
				cusSetInitApi(params).then(res => {
					this.templates=res.body.resultdata;
					this.ruleForm.custatt=res.body.returnValue;
				})
			},
			setFn(){								
				let params={
					customerId:this.$route.params.id,
					data:JSON.stringify(this.templates),
					data2:this.ruleForm.custatt,
					
				}
				cusSetSaveApi(params).then(res=>{
					if(res.body.type==1){
                     	this.$message({
                     		type:'success',
                     		message:res.body.message
                     	})
                     	this.$router.push('/addbook/detail/'+this.$route.params.id)
                     }else{
                     	this.$message({
                     		type:'warning',
                     		message:res.body.message
                     	})
                     }
				})
			}

		},
		computed: {
			dragOptions() {
				return {
					animation: 300,
					group: 'description',
					disabled: false,
				}
			},
		},
		mounted() {
			this.initFn();
		}
	}
</script>

<style>

</style>