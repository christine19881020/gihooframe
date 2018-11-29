<template>
	<ul class="vertifybox">
		<li v-for="(item,index) in verifylist" :key="index" :class="'nth'+index" v-if="item.show">
			<div class="licontent">
				<span>{{item.who}}</span>
				申请出口
				<span>{{item.contactno}}</span>
				合同的货物
				<div class="fr">
					<el-button size="mini" type="success" @click="godetailFn(item,index)">审核</el-button>
					<el-button size="mini" type="text" class="grey" @click="laterFn(index)">稍后处理</el-button>
				</div>
			</div>		
		</li>
	</ul>
</template>

<script>
	import {
		verifyListApi,
	} from '@/api/api'
	export default {
		name:'vertify',
		data(){
			return{
			  verifylist:[],
			}
		},
		methods:{
			initFn(){
				let params={
				   	
				}
				verifyListApi(params).then(res=>{
					this.verifylist=[];
					res.body.resultdata.forEach(item=>{
						item.show=true;
						this.verifylist.push(item);
					})
				})
			},
			laterFn(index){
				this.verifylist.splice(index,1)
			},
			godetailFn(item,index){
				this.verifylist.splice(index,1)
				this.$router.push('/ontime/verifyDetail/'+item.id);
				
			}
		},
		mounted(){
			this.initFn()
		}
	}
</script>

<style lang="scss" scoped>
.vertifybox{
	width:100%;
	li{
		width:100%;
		font-size:18px;		
		background:#F8FBE5;
		border:1px solid #DFDFDF;
		color:#666666;
		.licontent{
			width:1024px;
			margin:0 auto;
			height:30px;
			padding:15px 0;
			.grey{
				&.el-button--text{
					color:#666666 ;
				}
			}
			span{
				margin-right:10px;
			}
		}
		&.nth0{
			top:0;left:0;z-index:100;
		    width:100%;
		}
		&.nth1{
			top:10px;z-index:99;
			width:98%;left:1%;
		}
		&.nth2{
			top:20px;z-index:98;
			width:96%;left:2%;
		}
		
	}
}
</style>
