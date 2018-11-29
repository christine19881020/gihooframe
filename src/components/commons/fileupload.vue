<template>
	<div class="filebox clearfix" style="margin-bottom:40px;">
		<h2>
			<span>文件</span>
			<el-upload class="upload-demo" :headers="header" :action="'https://www.jihuobao.net/Gihoo/punctuality/resourceFile/uploadifyfile?orderid=' +orderid"
			 :on-preview="handlePreview" :on-progress="handleProgress" :on-remove="handleRemove" :on-success="handleSuccess"
			 list-type="picture" :before-upload="beforeAvatarUpload" :show-file-list=false :accept="fileTypes" :file-list="defaultList">
				<el-button class='uploadBtn' size="small">上传文件</el-button>
			</el-upload>
		</h2>
		<ul>
			<li v-if="progress>0&&progress<100">
				<div class="filetype">
					<el-progress style="margin-top:5px;" type="circle" :width=70 :percentage="progress" status="success"></el-progress>
				</div>
			</li>
			<li v-for="(item,index) in defaultList" :key="index">
				<div class="filetype">
					<img v-if="item.FileType=='ppt'" src="../../assets/ppt.png" class="type" />
					<img v-if="item.FileType=='doc'||item.FileType=='docx'" src="../../assets/doc.png" class="type" />
					<img v-if="item.FileType=='xls'||item.FileType=='xlsx'" src="../../assets/xls.png" class="type" />
					<img v-if="item.FileType=='pdf'" src="../../assets/pdf.png" class="type" />
					<!--<img v-if="imgTypes.indexOf(item.FileType)==-1&&item.FileType!='ppt'&&item.FileType!='xls'&&item.FileTyp!='xlsx'&&item.FileType!='pdf'"  src="../../assets/file_extension_others.png" width="78px" height="78px" class="type"/>-->
					<template v-if="imgTypes.indexOf(item.FileType)>-1">
						<!--图片后缀文件-->
						<img :src="'https://www.jihuobao.net/Gihoo'+item.FilePath" class="pic" />
					</template>
					<template v-else-if="item.FileType=='ppt'||
						item.FileType=='doc'||item.FileType=='docx'||
						item.FileType=='xls'||item.FileType=='xlsx'||
						item.FileType=='pdf'
						">
						<!--有设计ICON文件-->
						<span class="havetype">
							{{item.FileType}}
						</span>
					</template>
					<template v-else>
						<!--非图片和没有设计格式图片的文件-->
						<span class="hasnotype" v-if="imgTypes.indexOf(item.FileType)==-1">{{item.FileType}}</span>
					</template>
				</div>
				<div class="link-name">{{FileNameFn(item)}}</div>
				<div class="file-links">
					<a href="javascript:;" @click="deleteSureFn(item)">删除</a>
					<a :href="'https://www.jihuobao.net/gihoo/punctuality/ResourceFile/DownloadFile?keyValue='+item.FileId">下载</a>
				</div>

			</li>
		</ul>
	</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import {
		getfiles,
		removefileApi
	} from '@/api/api'
	export default {
		name: 'fileupload',
		props: { //定义传值的类型<br> 
			orderid: String,
		},
		data() {
			return {
				header: {
					Authorization: ''
				},
				imgTypes: 'jpg,bmp,ico,gif,jpeg,png,JPG,BMP,ICO,GIF,JPEG,PNG',
				fileTypes: 'avi,mp3,mp4,bmp,ico,gif,jpeg,jpg,png,psd,rar,zip,swf,log,pdf,doc,docx,ppt,pptx,txt,xls,xlsx',
				actionURL: '',
				defaultList: [],
				uploadList: [],
				progress: 0,
			}
		},
		methods: {
			setHead() {
				let token = sessionStorage.getItem('code');
				if (token) {
					this.header.Authorization = "Bearer " + token;
				}
			},
			deleteSureFn(item) {
				this.$alert('确认删除？', '删除', {
					confirmButtonText: '确定',
					callback: action => {
						this.handleRemove(item);

					}
				});

			},
			beforeAvatarUpload(file) {
				console.log(file)
				//				const isJPG = file.type === 'image/jpeg';
				//				const isLt2M = file.size / 1024 / 1024 < 2;
				//
				//				if(!isJPG) {
				//					this.$message.error('上传头像图片只能是 JPG 格式!');
				//				}
				//				if(!isLt2M) {
				//					this.$message.error('上传头像图片大小不能超过 2MB!');
				//				}
				//				return isJPG && isLt2M;
			},
			handleRemove(item) {
				let params = {}
				removefileApi(params, item.FileId).then((res) => {
					//					this.$Message.success(res.data.message);
					this.$message({
						type: 'success',
						message: res.message
					});
					this.getfilesFn();
				})
			},
			handleProgress(event, file, fileList) {
				console.log(event, file, fileList);
				this.progress = this.progress + 15;

			},
			handlePreview(file) {
				//				console.log(file);
			},
			getfilesFn() {
				let params = {
					orderid: this.orderid
				}
				getfiles(params).then(res => {
					if (res.type == 1) {
						//						this.$message({
						//							showClose: true,
						//							message: res.message,
						//							type: 'success'
						//						});
						this.defaultList = res.resultdata.FileInfoEntity;
					} else {
						this.$message({
							showClose: true,
							message: res.errmsg,
							type: 'error'
						});
					}

				})
			},
			handleSuccess(response, file, fileList) {
				file.FileName = file.name;
				this.$message(response.errmsg);
				this.progress = 0;
				this.getfilesFn();
			},
			FileNameFn(item) {
				return item.FileName.length > 20 ? item.FileName.slice(0, 20) + '...' + item.FileType : item.FileName;
			}

		},
		mounted() {
			this.setHead();
			if (this.orderid) {
				this.getfilesFn();
			}

		}
	}
</script>

<style>

</style>
