<template>
	<section>
		<div class="filebox clearfix" style="margin-bottom:40px;">
			<h2>
			<span>文件</span>
			<el-upload class="upload-demo" :headers="header" :action="actionURL" :on-preview="handlePreview" :on-progress="handleProgress"
			 :on-remove="handleRemove" :on-success="handleSuccess" list-type="picture" :before-upload="beforeAvatarUpload"
			 :show-file-list=false :accept="fileTypes" :file-list="defaultList">
				<el-button size="mini">上传文件</el-button>
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
						<!--<img v-if="item.FileType=='ppt'" src="../../assets/ppt.png" class="type" />
					<img v-if="item.FileType=='doc'||item.FileType=='docx'" src="../../assets/doc.png" class="type" />
					<img v-if="item.FileType=='xls'||item.FileType=='xlsx'" src="../../assets/xls.png" class="type" />
					<img v-if="item.FileType=='pdf'" src="../../assets/pdf.png" class="type" />-->

						<img class="pdfSize" style="width:40%;margin-top:7px;" v-if="imgTypes.indexOf(item.FileType)<=-1&&item.FileType!='folder'" :alt="item.FileName" :FileId="item.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+item.FileType+'.png'" :title="item.FileName" @click="gofileviewFn(item)" />
						<img class="otherSize" v-if="!item.FileType" :alt="item.FileName" :FileId="item.FileId" src="../../assets/file_extension_others.png" />
						<span class="hasnotype" v-if="imgTypes.indexOf(item.FileType)==-1">{{item.FileType}}</span>

						<!--<img v-if="imgTypes.indexOf(item.FileType)==-1&&item.FileType!='ppt'&&item.FileType!='xls'&&item.FileTyp!='xlsx'&&item.FileType!='pdf'"  src="../../assets/file_extension_others.png" width="78px" height="78px" class="type"/>-->

						<template v-if="imgTypes.indexOf(item.FileType)>-1">
							<!--图片后缀文件-->
							<img class="pic" :alt="item.FileName" :src="imgurl+item.FilePath" @click="gobigImgFn(item)" />
						</template>
						<!--<template v-else-if="item.FileType=='ppt'||
						item.FileType=='doc'||item.FileType=='docx'||
						item.FileType=='xls'||item.FileType=='xlsx'||
						item.FileType=='pdf'
						">
						<!--有设计ICON文件-->
						<!--<span class="havetype">
							{{item.FileType}}
						</span>
					</template>
					<template v-else>-->
						<!--非图片和没有设计格式图片的文件-->
						<!--<span class="hasnotype" v-if="imgTypes.indexOf(item.FileType)==-1">{{item.FileType}}</span>
					</template>-->
					</div>
					<div class="link-name">{{FileNameFn(item)}}</div>
					<div class="file-links">
						<a href="javascript:;" @click="RemoveFolderOrFileFn(item)">删除</a>
						<a href="javascript:;" @click="downloadFn(item)">下载</a>
					</div>

				</li>
			</ul>
		</div>

		<el-dialog width="80%" :visible.sync="dialogVisible" :append-to-body=true>
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>

		<!--<el-dialog width="swidth" height="sheight" :modal=false :title="pretitle" :visible.sync="dialogVisiblePreview" :append-to-body=true>
		<iframe :src="predlgurl" width="100%" height="100%">
				
		</iframe>
	</el-dialog>-->

		<div ref="predlg" class="predlg" :class="{'zoombig':zoombig}" v-if="predlgshow">
			<div class="preOprate">
				<div class="pretitle">
					{{pretitle}}
				</div>
				<i class="iconfont icon-guanbi" @click="predlgcloseFn"></i>
				<i class="iconfont icon-fangkuang" @click="zoombigFn"></i>
			</div>
			<iframe :src="predlgurl" frameborder="0"></iframe>
		</div>

	</section>
</template>

<script>
	import Cookies from 'js-cookie'
	import {
		usergetfilesAPI,
		RemoveFolderOrFileAPI,
	} from '@/api/api'
	export default {
		name: 'fileupload',
		props: { //定义传值的类型<br> 
			userid: String,
		},
		data() {
			return {
				pretitle: '',
				zoombig: false,
				fileUrl: 'https://www.jihuobao.net/filecenter/ResourceFile/UploadifyFile?',
				imgurl: 'https://www.jihuobao.net/filecenter',
				header: {
					Authorization: ''
				},
				imgTypes: 'jpg,bmp,ico,gif,jpeg,png,JPG,BMP,ICO,GIF,JPEG,PNG',
				fileTypes: 'avi,mp3,mp4,bmp,ico,gif,jpeg,jpg,png,psd,rar,zip,swf,log,pdf,doc,docx,ppt,pptx,txt,xls,xlsx',
				actionURL: '',
				defaultList: [],
				uploadList: [],
				progress: 0,
				dialogVisible: false,
				dialogImageUrl: '',
				predlgshow: false,
				predlgurl: '',
			}
		},
		methods: {
			setHead() {
				let code = Cookies.get('gihoo_v1.1_token');
				if(code) {
					this.header.Authorization = 'Bearer ' + code;
				}
			},
			predlgcloseFn(){
				this.predlgshow=false;
			},
			gobigImgFn(file) {
				this.dialogVisible = true;
				this.dialogImageUrl = this.imgurl + file.FilePath;
			},
			zoombigFn() {
				this.zoombig = !this.zoombig;
			},
//			gofileviewFn(file) {
//				console.log(file)
//				file.filepath = file.FilePath ? file.FilePath : file.response.FilePath;
//				this.pretitle = file.FileName;
//				this.predlgurl = 'http://192.168.0.125/gihoo/index.php?pluginApp/to/yzOffice/&path=https://jihuobao.net/filecenter/' + file.filepath;
//				this.predlgshow = true;
				//				http://192.168.0.125/gihoo/?api/view&path=https://www.jihuobao.net:11443/Resource/JDG18111435.xls
//								window.open('http://192.168.0.125/gihoo/?api/view&path=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
				//				window.open('http://192.168.0.125/gihoo/index.php?pluginApp/to/yzOffice/&path=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
		
//			},
			gofileviewFn(file) {
				file.filepath = file.FilePath ? file.FilePath : file.response.FilePath;
				window.open('http://dcsapi.com/?k=390747405&url=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
			},
			beforeAvatarUpload(file) {
				console.log(file)
				//				const isJPG = file.type === 'image/jpeg';
				//				const isLt2M = file.size / 1024 / 1024 < 2;
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
					keyvalue: this.userid,
					Module: '6',
				}
				usergetfilesAPI(params).then(res => {
					this.defaultList = res.resultdata;
				})
			},
			handleSuccess(response, file, fileList) {
				file.FileName = file.name;
				this.$message({
					type: 'success',
					message: response.errmsg
				});
				this.progress = 0;
				this.getfilesFn();
			},
			FileNameFn(item) {
				return item.FileName.length > 20 ? item.FileName.slice(0, 20) + '...' + item.FileType : item.FileName;
			},
			downloadFn(file, $event) {
				// console.log(file)
				var token = "";
				token = sessionStorage.getItem('code');
				// console.log('token', token);				
				window.location.href = this.imgurl + "/ResourceFile/downloadfile?keyValue=" + file.FileId +
					'&token=Bearer ' + token;
			},
			RemoveFolderOrFileFn(item) {
				this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						keyValue: item.FileId,
					}
					RemoveFolderOrFileAPI(params).then(res => {
						this.$message({
							type: 'success',
							message: res.message
						});
						if(res.type == 1) {
							this.getfilesFn();
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
		},
		mounted() {
			this.setHead();
			setTimeout(() => {
				this.getfilesFn();
				this.actionURL = this.fileUrl + 'module=6&keyValue=' + this.userid;
			}, 300)

		}
	}
</script>

<style>

</style>