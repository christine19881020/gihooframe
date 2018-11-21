<template>
	<section>
		<div class="searchResult" style="border-top:none;margin-top:48px;">
			<div class="result">
				<el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
					<el-tab-pane label="订单共享" name="first">
						<div class="chooseMulti">
							<div class="ownDrop">
								<div @click.stop="dropshowFn" class="select-result" :class="{'active':dropshow}" v-model="selectmen">点击添加成员</div>
								<ul class="dropdown" v-if="dropshow">
									<li v-for="(item,index) in users" :key="index" v-if="searchFn(item)" class="clearfix" @click.stop="chooseFn(item)">
										<img :src="item.img" class="selectImg" />
										<span>{{item.name}}</span>
									</li>
								</ul>
							</div>
							<div class="group-select">
								<span class="all" :class="{'selected':Allchoosed}" @click="allFn">所有人</span>
							</div>
							<div class="clear"></div>
								<div id="wrapper">
									<ul class="manshow clearfix">
										<li v-for="(item,index) in users" :key="index" :class="{'choosed':item.selected}">
											<input class="check" type="checkbox" :checked="item.selected" @click="chooseFn(item)" />
											<span>{{item.name}}</span>
										</li>
									</ul>
								</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="微信邀请" name="second">
						<div class="wechatShare">
							<div class="wechatBox clearfix">
								<img class="fl" src='../../assets/erweima.jpg' />

								<div class="sBottom">
									<p class="">
										扫码邀请
									</p>
									<p class="">
										用微信扫描二维码获取邀请函，
									</p>
									<p>
										转发给微信好友，即可邀请他们加入你的项目
									</p>
								</div>

							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

	</section>
</template>

<script>
	import { users } from '@/components/searchLists'
	export default {
		name: '',
		data() {
			return {
				users: users,
				activeName: 'first',
				selectmen: '',
				Allchoosed: true,
				dropshow: false,
			}
		},
		methods: {
			searchFn() {
				alert("回车")
			},
			handleClick(tab, event) {
				console.log(tab, event);
			},
			chooseFn(item) {
				item.selected = !item.selected;
				this.dropshow = false;
			},
			allFn() {
				if(this.Allchoosed) {
					this.users.forEach(item => {
						item.selected = false;
						this.Allchoosed = false;
					})
				} else {
					this.users.forEach(item => {
						item.selected = true;
						this.Allchoosed = true;
					})
				}

			},
			dropshowFn() {
				this.dropshow = true;
				//				console.log(event.currentTarget);
				//				console.log(event.target);
			},
			searchFn(item) {
				if(
					item.name.indexOf(this.selectmen.trim()) > -1
				) {
					return true;
				}
				return false;
			}
		},
		mounted(){
			document.onclick=()=>{
				this.dropshow=false;
			}
		}
	}
</script>

<style>

</style>