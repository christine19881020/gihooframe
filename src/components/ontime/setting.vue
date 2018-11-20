<template>
	<div class="simple-stack">
		<div class="page page-root page-behind" @click="$router.push('/ontime/list')">
			<a> 返回海运列表</a>
		</div>
		<div class="page page-1 page-behind" @click="$router.push('/ontime/list')">
			<a> 返回订单标题</a>
		</div>
		<div class="page page-2">
			<div class="INdetail">
				<div class="dhead clearfix">
					<div class="fl">
						<span class="name">设置</span>
						<p class="desc"></p>
					</div>
					<ul class="set">
						<li @click="">
							<i class="iconfont icon-chuan"></i>
							<label>已出运</label>
						</li>
					</ul>
				</div>
				<div class="hr-4"></div>
				<div class="hr-1"></div>
				<div class="neworder pform w600">
					<el-form :model="ruleForm" label-width="100px" :rules="rules" ref="ruleForm">
						<div class="block">
							<h1>选择运输方式</h1>
							<el-form-item prop="transway" style="margin-left:-80px;">
								<el-radio-group v-model="ruleForm.transway">
									<el-radio label="1">海运</el-radio>
									<el-radio label="2">空运</el-radio>
									<el-radio label="3">铁路</el-radio>
									<el-radio label="4">快递</el-radio>
									<el-radio label="5">拖车</el-radio>
								</el-radio-group>
							</el-form-item>
						</div>
					</el-form>
					<div class="block">
						<h1 class="mgb10">选择业务类型</h1>
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
	import { setInitApi,setApi } from '@/api/api'
	import draggable from 'vuedraggable'
	export default {
		name: 'setting',
		components: {
			draggable,
		},
		data() {
			return {
				ruleForm: {
					transway: '1'
				},
				templates: [{
					name: '拖车',
					value: 'towdisplay',
					show: false
				}, {
					name: '报关',
					value: 'customdisplay',
					show: true
				}, {
					name: '仓库',
					value: 'waredisplay',
					show: true
				}],
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
					orderId: this.$route.params.id
				}
				setInitApi(params).then(res => {
					var display = res.body.resultdata;
                    
					if(display.towdisplay == '0') {
						this.templates[0].show = false;
					} else {
						this.templates[0].show = true;
					}

					if(display.customdisplay == '0') {
						this.templates[1].show = false;
					} else {
						this.templates[1].show = true;
					}

					if(display.waredisplay == '0') {
						this.templates[2].show = false;
					} else {
						this.templates[2].show = true;
					}

				})
			},
			setFn(){								
				let params={
					orderId:this.$route.params.id,
					waredisplay:this.templates[2].show?'1':'0',
					towdisplay:this.templates[0].show?'1':'0',
					customdisplay:this.templates[1].show?'1':'0',
				}
				setApi(params).then(res=>{
					if(res.body.type==1){
                     	this.$message({
                     		type:'success',
                     		message:res.body.message
                     	})
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