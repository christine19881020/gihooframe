<template>
	<section class="clearfix" style="width:100%;min-height:300px;position:relative">
		<div class="fileheader">
			<label>文件库</label>

			<el-upload :headers="header" class="filebtn ml20" :action="actionURL" :on-success="fileSuccessFn" multiple :limit="3" :show-file-list="false">
				<el-button size="mini" style="color:#333">上传文件</el-button>
			</el-upload>
		</div>
		<!--列表展示-->
		<div class="listview" v-if="listview">
			<!-- 			<div class="switchHead clearfix">
				<i class="iconfont icon-suolvetu fr" @click="listviewFn"></i>
				<i class="iconfont icon-liebiao active fr"></i>
			</div> -->

			<!--未删除-->
			<el-table :data="uploadList" class="fileTable">
				<el-table-column type="expand">
					<template slot-scope="prop">
						<el-table :data="prop.row.FileInfoList" :show-header="false">
							<el-table-column label="名称" width="180">
								<template slot-scope="scope">
									<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)<=-1&&scope.row.FileType!='folder'" :FileId="scope.row.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+scope.row.FileType+'.png'" @click="gofileviewFn(scope.row)" />
									<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)>-1" :src="imgurl+scope.row.FilePath" @click="gobigImgFn(scope.row)" />
									<img class="fl" width="24px" height="24px" v-if="!scope.row.FileType" :alt="scope.row.FileName" :FileId="scope.row.FileId" src="../../assets/file_extension_others.png" />
									<div class="ellipsis" :title="scope.row.FileName">
										{{ scope.row.FileName }}
										<!-- <template v-if="scope.row.renameshow">
											<el-input size="mini" :placeholder="scope.row.FileName" v-model="renameFile" @keyup.enter.native="renameSubmitFn(scope.row)"></el-input>
										</template>
										<template v-else>{{ scope.row.FileName }}</template> -->
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="CreateUserName" label="创建者" width="180">
							</el-table-column>
							<el-table-column label="时间">
								<template slot-scope="scope">
									<div class="ellipsis">{{scope.row.CreateDate|moment }}</div>
								</template>
							</el-table-column>
							<el-table-column width="180">
								<template slot-scope="scope">
									<div class="oprateCell">
										<i v-show="scope.row.FileType!='folder'" class="iconfont icon-unie122" @click="downloadFn(scope.row,$event)"></i>

										<el-upload style="display:inline-block;" :headers="header" :on-success="uploadSuccess" :on-progress="handleProgress" :show-file-list="false" action="https://www.jihuobao.net:11443/FactoryTrade/BatchTaskFile/TaskUploadifyFile" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="fileList">
											<i class="iconfont icon-shangchuan" @click="uploadfileFn(scope.row)"></i>
										</el-upload>
										<i class="iconfont icon-record" v-popover:popoverRecord @click="recordFn(scope.row,$event)"></i>
										<i class="iconfont icon-yanjing" v-popover:popoverWatch @click="watchFn(scope.row,$event)"></i>
										<i class="iconfont icon-jiantou9" v-popover:popoverOprate @click="oprateFn(scope.row,scope.$index,$event)"></i>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column label="名称" width="180">
					<template slot-scope="scope">
						<img class="fl" width="24px" height="24px" v-if="scope.row.FileType=='folder'" :FileId="scope.row.FileId" src="../../assets/folder.png" @click="goFolderPage(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)<=-1&&scope.row.FileType!='folder'" :FileId="scope.row.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+scope.row.FileType+'.png'" @click="gofileviewFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)>-1" :src="'https://www.jihuobao.net:11443/'+scope.row.FilePath" @click="gobigImgFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="!scope.row.FileType" :alt="scope.row.FileName" :FileId="scope.row.FileId" src="../../assets/file_extension_others.png" />
						<div class="ellipsis" :title="scope.row.FileName">
							<template v-if="scope.row.renameshow">
								<el-input size="mini" :placeholder="scope.row.FileName" v-model="renameFile" @keyup.enter.native="renameSubmitFn(scope.row)"></el-input>
							</template>
							<template v-if="scope.row.renameshow&&scope.row.FileType=='folder'&&newFolderShow">
								<!--新建文件夹-->
								<el-input size="mini" :placeholder="scope.row.FileName" v-model="folder.FileName" @keyup.enter.native="newFloderFn"></el-input>
							</template>

							<template v-if="!scope.row.renameshow">{{ scope.row.FileName }}</template>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="创建者" width="180">
				</el-table-column>
				<el-table-column label="时间">
					<template slot-scope="scope">
						<div class="ellipsis">{{scope.row.CreateDate|moment }}</div>
					</template>
				</el-table-column>
				<el-table-column width="180">
				</el-table-column>
			</el-table>

		</div>
		<ul class="list grid-view clear" v-if="!listview">
			<!--新建文件夹-->
			<div class="switchHead clearfix">
				<i class="iconfont icon-suolvetu active fr"></i>
				<i class="iconfont icon-liebiao  fr" @click="listview=true"></i>
			</div>
			<li class="newFolder" v-if="newFolderShow">
				<a href="#" class="imgbox">
					<img :alt="folder.FileName" src="../../assets/folder.png" :title="folder.FileName" />
				</a>
				<div class="link-name">
					<el-input size="mini" clearable v-model="folder.FileName" type="text" placeholder="新的文件夹"></el-input>
				</div>
				<div class="oprate">
					<span type="text" class="new greenA" @click="newFloderFn">创建</span>
					<span type="text" @click="newFolderShow=false;num=num-1;">取消</span>
				</div>
			</li>
			<li class="demo-upload-list clear" v-if="progress>0&&progress<100">
				<div class="progress">
					<el-progress type="circle" :width=70 :percentage="progress" status="success"></el-progress>
				</div>
			</li>
			<li class="demo-upload-list clear" v-for="(item,index) in uploadList" :key="index">
				<a href="javascript:;" class="imgbox" @click="gobigImgFn(item)">
					<img class="folderSize" v-if="item.FileType=='folder'" :FileId="item.FileId" :alt="item.FileName" src="../../assets/folder.png" @click="goFolderPage(item)" />
					<img class="pdfSize" v-if="imgTypes.indexOf(item.FileType)<=-1&&item.FileType!='folder'" :alt="item.FileName" :FileId="item.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+item.FileType+'.png'" :title="item.FileName" />
					<img class="imgSize" v-if="imgTypes.indexOf(item.FileType)>-1" :alt="item.FileName" :src="'https://www.jihuobao.net:11443/'+item.FilePath" @click="handleView(item)" />
					<img class="otherSize" v-if="!item.FileType" :alt="item.FileName" :FileId="item.FileId" src="../../assets/file_extension_others.png" />
				</a>
				<div class="link-name">
					<a href="javascript:;">
						<template v-if="item.FileType!='folder'">
							{{item.FileName|shortname}}
						</template>
						<template v-else>
							{{item.FileName}}
						</template>
					</a>
				</div>
				<div class="file-links">
					<a v-if="item.FileType!='folder'" href="javascript:;" @click="downloadFn(item)">下载</a>
					<router-link target="_blank" v-if="item.FileType=='folder'&&item.FileId!=item.OrderID" :to="'/download/DownloadFolder/'+item.FileId">下载</router-link>
					<router-link target="_blank" v-if="item.FileType=='folder'&&item.FileId==item.OrderID" :to="'/download/DownloadFolder/order-'+item.FileId">下载</router-link>
					<a href="javascript:;" @click="RemoveFolderOrFileFn(item)">删除</a>
				</div>
				<!--</template>
				<template v-else>
					<el-progress :percent="item.percentage" hide-info></el-progress>
				</template>-->
			</li>
		</ul>
		<el-popover ref="popoverRecord" :open-delay=10 v-model="popoverRecord" placement="bottom" @after-leave="" popper-class="popoverRecord" width="350" trigger="click">
			<div class="rHead">
				<label>操作记录</label>
				<div class="fr">
					<div class="fl">
						<i class="iconfont icon-zhongmingming"></i>
						<span>{{record.editCount}}</span>
					</div>
					<div class="fl">
						<i class="iconfont icon-chakan"></i>
						<span>{{record.lookCount}}</span>
					</div>
					<div class="fl">
						<i class="iconfont icon-unie122"></i>
						<span>{{record.downloadCount}}</span>
					</div>
					<div class="fl">
						<i class="iconfont icon-shanchu-copy red"></i>
						<span>{{record.deleteCount}}</span>
					</div>
				</div>
			</div>
			<ul>
				<li v-for="(item,index) in record.data">
					<table>
						<tr class="fileRecord">
							<td width="140">{{item.operatetime}}</td>
							<td width="80" class="who ellipsis" :title="item.operateaccount">{{item.operateaccount}}</td>
							<td class="dowhat ellipsis" :title="item.executeresultjson">{{item.executeresultjson}}</td>
						</tr>
					</table>
				</li>
			</ul>
		</el-popover>
		<el-popover ref="popoverWatch" :open-delay=10 v-model="popoverWatch" placement="bottom" @after-leave="" title="" popper-class="popoverRecord" width="400" trigger="click">
			<div class="rHead">
				<label>查看记录</label>
				<div class="fr">
					<div class="fl">
						<i class="iconfont icon-chakan"></i>
						<span>{{watch.lookCount}}</span>
					</div>
					<div class="fl">
						<i class="iconfont icon-yanjing"></i>
						<span>{{watch.unwatch}}</span>
					</div>
				</div>
			</div>
			<ul>
				<li v-if="watch.data==[]">
					暂无数据
				</li>
				<li v-else v-for="(item,index) in watch.data">
					<table>
						<tr class="fileRecord">
							<td width="150">{{item.operatetime}}</td>
							<!--<td>{{item.hour}}</td>-->
							<td class="who ellipsis" :title="item.operateaccount">{{item.operateaccount}}</td>
							<td class="dowhat ellipsis" :title="item.executeresultjson">{{item.executeresultjson}}</td>
						</tr>
					</table>
				</li>

			</ul>
		</el-popover>
		<el-popover ref="popoverOprate" :open-delay=10 v-model="popoverOprate" placement="bottom" @after-leave="" title="" popper-class="popoverOprate" width="85" trigger="click">
			<ul>
				<li @click="renameFn(file,index)">
					<i class="iconfont icon-zhongmingming"></i><label>重命名</label>
				</li>
				<li @click="RemoveFolderOrFileFn(file)">
					<i class="iconfont icon-shanchu-copy red"></i>
					<label>删除</label>
				</li>
			</ul>
		</el-popover>

		<el-dialog :visible.sync="dialogVisible" :append-to-body=true>
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>

		<el-dialog title="文件重命名" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="文件名称" label-width="70px">
					<el-input size="small" v-model="form.name" placeholder="请输入文件新名称" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer" style="text-align: right;">
				<el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
				<el-button size="small" type="primary" @click="renameSubmitFn(file)">确 定</el-button>
			</div>
		</el-dialog>
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
	import moment from 'moment'
	import {
		// 		GetListJsonAPI,
		// 		CreateFolderAPI,
		RemoveFolderOrFileAPI,
		TaskListJsonAPI,
		filerecordsAPI,
		// 		deletedfilesAPI,
		// 		restorefileAPI,
		renamefileAPI,
		downloadfolderAPI,
		// 		renamefolderAPI,
		FileLookListAPI,
		// 		UpdateFileAPI,
		filelogApi
	} from '@/api/api'
	export default {
		name: 'file',
		props: { //定义传值的类型<br> 
			dingcangid: String,
			FolderId: String,
			templates: Array,
			towdisplay: Boolean,
			waredisplay: Boolean,
			customdisplay: Boolean,
			transway: String,
		},
		data() {
			return {
				pretitle: '',
				zoombig: false,
				predlgshow: false,
				predlgurl: '',
				cid: this.dingcangid,
				dialogFormVisible: false,
				form: {
					name: '',
				},
				oldFile: {},
				fileUrl: 'https://www.jihuobao.net/filecenter/ResourceFile/UploadifyFile?',
				imgurl: 'https://www.jihuobao.net/filecenter',
				imgTypes: 'jpg,bmp,ico,gif,jpeg,png,JPG,BMP,ICO,GIF,JPEG,PNG',
				dialogImageUrl: '',
				dialogVisible: false,
				renameFile: '',
				//calheight:0,
				deleteShow: false,
				deletedList: [],
				record: {
					edit: '1次',
					watch: '1人',
					download: '4人',
					delete: '1次',
					list: []

				},
				watch: {
					watched: '5人',
					unwatch: '1人',
					list: []
				},
				popoverRecord: false,
				popoverWatch: false,
				popoverOprate: false,
				listview: true,
				tableData: [],
				progress: 0,
				header: {
					Authorization: ''
				},
				currentLocation: [],
				bheight: "",
				folderid: this.FolderId,
				imgTypes: 'jpg,bmp,ico,gif,jpeg,png,JPG,BMP,ICO,GIF,JPEG,PNG',
				dragshow: true,
				actionURL: '',
				fileList: [],
				uploadList: [],
				newFolderShow: false,
				folder: {
					FileType: 'folder',
					FileName: '',
					FilePath: '',
					FileSize: '',
					CreateDate: '',
					status: 'finished'
				},
				num: '',
				delnum: '',
				file: {},
				index: '',
				updatefile: [],
				singleUpload: {},
				moduleList: [],
			}
		},
		methods: {
			predlgcloseFn(){
				this.predlgshow=false;
			},
			zoombigFn() {
				this.zoombig = !this.zoombig;
			},
			gofileviewFn(file) {
				this.filelogFn(file.FileId);
				file.filepath = file.FilePath ? file.FilePath : file.response.FilePath;
				window.open('http://dcsapi.com/?k=390747405&url=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
			},
//			gofileviewFn(file) {
//				console.log(file)
//				this.filelogFn(file.FileId);
//				file.filepath = file.FilePath ? file.FilePath : file.response.FilePath;
//				this.pretitle = file.FileName;
//				this.predlgurl = 'http://192.168.0.125/gihoo/index.php?pluginApp/to/yzOffice/&path=https://jihuobao.net/filecenter/' + file.filepath;
//				this.predlgshow = true;
//				//http://192.168.0.125/gihoo/?api/view&path=https://www.jihuobao.net:11443/Resource/JDG18111435.xls
//				//window.open('http://192.168.0.125/gihoo/?api/view&path=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
//				//window.open('http://192.168.0.125/gihoo/index.php?pluginApp/to/yzOffice/&path=https://jihuobao.net/filecenter/' + file.filepath, 'newwindow');
//			},
			fileSuccessFn(res) {
				if(res.error == 0) {
					this.getFilesFn();
					this.$message({
						message: res.errmsg,
						type: 'success'
					});
				} else {
					this.$message({
						message: res.errmsg,
						type: 'warning'
					});
				}
			},
			filelogFn(FileId) {
				let params = {
					fileid: FileId
				}
				filelogApi(params).then(res => {

				})
			},
			gobigImgFn(file) {
				this.dialogVisible = true;
				this.dialogImageUrl = this.imgurl + file.FilePath;
				this.filelogFn(file.FileId);
			},
			
			uploadfileFn(file) {
				console.log('file', file);
				this.singleUpload.oldfileids = file.FileId;

			},
			uploadSuccess(res, file) {
				console.log('res', res)
				this.singleUpload.newfileids = res.fileid;
				this.updatefile.push(this.singleUpload);
				file.FileName = file.name;
				this.progress = 0;
				let params = {
					updatefile: this.updatefile
				}
				// 				UpdateFileAPI(params).then(res => {
				// 					if(res.type == 1) {
				// 						this.$message({
				// 							type: 'success',
				// 							message: res.message
				// 						})
				// 						this.getFilesFn();
				// 					} else {
				// 						this.$message({
				// 							type: 'info',
				// 							message: res.message
				// 						})
				// 					}
				// 				})
			},

			deleteShowFn() {
				this.deleteShow = true;
				this.deletedfilesFn();
			},
			downloadFn(file, $event) {
				// console.log(file)
				var token = "";
				token = Cookies.get('gihoo_v1.1_token');
				// console.log('token', token);				
				window.location.href = this.imgurl + "/ResourceFile/downloadfile?keyValue=" + file.FileId +
					'&token=Bearer ' + token;
			},
			recordFn(v, $event) {
				this.file = v;
				//console.log('this.file',this.file);
				this.getfileRecords(v.FileId);
				this.popoverRecord = true;
				this.$nextTick(() => {
					var pop = this.$refs['popoverRecord'];
					pop.popperJS._reference = $event.target;
					pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
					pop.popperJS.update();
				})
			},
			getfileRecords(fileid) {
				let params = {
					FileId: fileid,
				}
				filerecordsAPI(params).then(res => {
					this.record = res.resultdata;
				})
			},
			recoverFn(file) {
				let params = {
					FileId: file.FileId,
					fileType: file.FileType
				}
				restorefileAPI(params).then(res => {
					console.log('recover', res)
					this.$message({
						message: res.message,
						type: 'success'
					});
					if(res.type == 1) {
						this.getFilesFn();
						this.deletedfilesFn();
					}
				})
			},
			watchFn(v, $event) {
				this.file = v;
				this.getwatchedFn(v.FileId);
				this.popoverWatch = true;
				this.$nextTick(() => {
					var pop = this.$refs['popoverWatch'];
					pop.popperJS._reference = $event.target;
					pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
					pop.popperJS.update();
				})
			},
			getwatchedFn(fileid) {
				let params = {
					FileId: fileid
				}
				FileLookListAPI(params).then(res => {
					this.watch = res.resultdata;
				})
			},
			deletedfilesFn() {
				let params = {
					FolderId: this.folderid,
					TaskID: this.TaskId
				}
				// 				deletedfilesAPI(params).then(res => {
				// 					this.deletedList = res.resultdata.FileInfoEntity;
				// 					this.delnum = this.deletedList.length;	
				// 					
				// 					if(this.delnum==0){
				// 						this.delnum=1;
				// 					}
				// 					this.num = this.num + this.delnum;
			},
			oprateFn(v, index, $event) {
				console.log('x', v, index, $event);
				this.file = v;
				this.index = index;
				this.popoverOprate = true;
				this.$nextTick(() => {
					var pop = this.$refs['popoverOprate'];
					pop.popperJS._reference = $event.target;
					pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
					pop.popperJS.update();
				})
			},
			renameFn(file, index) {
				console.log('file', file);
				this.oldFile = file;
				this.form.name = file.FileName;
				this.dialogFormVisible = true;
			},
			renameFolderFn(file) {
				let params = {
					FileId: file.FileId,
					fileName: this.renameFile,
				}
				// 				renamefolderAPI(params).then(res => {
				// 					if(res.type == 1) {
				// 						this.$message({
				// 							message: res.message,
				// 							type: 'success'
				// 						});
				// 						file.renameshow = false;
				// 						file.FileName = this.renameFile;
				// 					} else {
				// 						this.$message({
				// 							message: res.message,
				// 							type: 'warning'
				// 						})
				// 					}
				// 				})
			},
			renameSubmitFn(file) {
				let params = {
					keyValue: file.FileId,
					fileName: this.form.name,
				}
				renamefileAPI(params).then(res => {
					if(res.type == 1) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						this.dialogFormVisible = false;
						file.FileName = this.form.name;
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}

				})
			},
			setHead() {
				let code = Cookies.get('gihoo_v1.1_token');
				if(code) {
					this.header.Authorization = 'Bearer ' + code;
				}
			},
			handleProgress(event, file, fileList) {
				console.log(event, file, fileList);
				this.progress = this.progress + 15;
			},
			beforeUpload(file) {
				//if(this.PageType && this.CustomID && this.FolderId) {
				//	 this.actionURL = "http://121.40.217.143:8585/FactoryTrade/ResourceFile/UploadifyFileNoId?PageType=" + this.PageType + "&CustomID=" + this.CustomID + "&FolderId=" + this.FolderId;
				//};
				//this.actionURL = 'http://121.40.217.143:8585/FactoryTrade/ResourceFile/UploadifyFileNoId?PageType=' + this.PageType + '&CustomID=' + this.CustomID + '&FolderId=0'
			},

			handlePreview() {},
			handleRemove() {},
			beforeRemove() {},
			handleExceed() {},
			handleSuccess(res, file) {
				file.FileName = file.name;
				this.$message({
					message: res.errmsg,
					type: 'success'
				});
				this.progress = 0;
				this.getFilesFn();
			},
			getFilesFn() {
				let params = {
					keyvalue: this.dingcangid
				}
				TaskListJsonAPI(params).then(res => {
					this.moduleList = res.resultdata;
					this.uploadList = [];
					res.resultdata.FileInfoEntity.forEach((item, index) => {
						console.log('tran', this.transway)
						if(item.FileName == '海运订舱') {
							if(this.transway == '1' || this.transway == '2') {
								this.uploadList.push(item);
							}
						}
						if(item.FileName == '空运订舱') {
							if(this.transway == '3') {
								this.uploadList.push(item);
							}
						}
						if(this.towdisplay && item.FileName == '拖车') {
							this.uploadList.push(item);
						}
						if(this.waredisplay && item.FileName == '仓库') {
							this.uploadList.push(item);
						}
						if(this.customdisplay && item.FileName == '报关') {
							this.uploadList.push(item);
						}
						if(item.FileName == '通用') {
							this.uploadList.push(item);
						}
						console.log('xxx', item.FileName, this.towdisplay, this.waredisplay, this.customdisplay);
					});
					console.log('upload', this.uploadList);
				})
			},
			newFloderFn() {
				//创建文件夹
				if(this.folder.FileName == "") {
					this.folder.FileName = "新的文件夹";
				}
				let params = {
					ContractNumberID: this.contractnumberid,
					ParentId: this.folderid,
					FolderName: this.folder.FileName,
					OrderID: "",
					TaskID: this.TaskId,
				}
				CreateFolderAPI(params).then((res) => {
					this.$message({
						message: res.message,
						type: 'success'
					});
					this.getFilesFn();
					this.newFolderShow = false;
					this.folder = {
						FileType: 'folder',
						FileName: '',
						FilePath: '',
						FileSize: '',
						CreateDate: '',
						status: 'finished'
					}
				})
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
							this.getFilesFn();
							this.deleteShow = false;
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			goFolderPage(item) {
				//PageType 【新建1】 【订单2】【任务3】
				this.folderid = item.FileId;
				this.getFilesFn();
			},
			gofolderpageFn(folderid) {
				console.log(folderid)
				this.folderid = folderid;
				this.getFilesFn();
			}
		},
		computed: {},
		watch: {
			'towdisplay': function(val, oldval) {
				console.log('towdisplay', val, oldval);
			}
		},
		mounted() {
			console.log('fileid', this.dingCangId)
			this.setHead();
			setTimeout(() => {
				this.actionURL = this.fileUrl + 'module=5&keyValue=' + this.dingcangid;
				console.log('templates', this.templates);
			}, 300)
			setTimeout(() => {
				this.getFilesFn();
			}, 1000)

		}
	}
</script>

<style lang="scss" scoped>
	.grid-view {
		margin-top: 20px;
		position: absolute;
		top: 50px;
		left: 10px;
		right: 10px;
		bottom: 60px;
		z-index: 1;
		.switchHead {
			height: 35px;
			line-height: 35px;
			border-bottom: 1px solid #ededed;
			margin-bottom: 20px;
			.iconfont {
				color: #d9d9d9;
				margin-right: 10px;
				cursor: pointer;
			}
			.iconfont.active {
				color: #525252;
			}
		}
		li {
			width: 140px;
			text-align: center;
			min-height: 187px;
			display: block;
			float: left;
			vertical-align: top;
			margin: 0 5px 15px;
			text-align: center;
			.imgbox {
				.imgSize {
					width: 106px;
					height: 78px;
				}
				.pdfSize {
					width: 64px;
					height: 88px;
				}
				.folderSize {
					width: 106px;
					height: 78px;
				}
				.otherSize {
					width: 64px;
					height: 88px;
				}
				a {
					vertical-align: bottom;
				}
			}
			.link-name {
				width: 140px;
				font-size: 14px;
				margin: 15px 0 8px;
				line-height: 16px;
				text-align: center;
				font-weight: normal;
				a {
					width: 140px;
					word-break: break-all;
					white-space: normal;
					color: #333333;
				}
				:hover {
					color: #4ea5ad;
				}
			}
			.file-links {
				font-size: 12px;
				text-align: center;
				visibility: hidden;
				a {
					color: #84a099;
				}
				:hover {
					color: #4ea5ad;
				}
			}
		}
		li:hover {
			.file-links {
				visibility: visible;
			}
		}
	}
	
	.nofile {
		margin-top: 50px;
		text-align: center;
	}
	
	.fileTable {
		width: 100%;
		margin-bottom: 20px;
		color: #707070;
		img {
			margin-right: 10px;
		}
		.oprateCell {
			.iconfont {
				margin-right: 10px;
				cursor: pointer;
				font-size: 16px;
				&:last-child {
					margin-right: 0;
				}
			}
		}
	}
	
	.listview {
		position: relative;
		.switchHead {
			position: absolute;
			right: 10px;
			top: 10px;
			width: 100px;
			z-index: 100;
			.iconfont {
				color: #d9d9d9;
				margin-right: 10px;
				cursor: pointer;
			}
			.iconfont.active {
				color: #525252;
			}
		}
	}
	
	.popoverRecord {
		.rHead {
			height: 30px;
			border-bottom: 1px solid #ededed;
			label {
				font-size: 14px;
				color: #707070;
			}
			.fr {
				.fl {
					margin-right: 15px;
				}
			}
		}
		.fileRecord {
			td {
				padding: 6px;
				font-size: 14px;
				white-space: nowrap;
				&.who {
					width: 50px;
				}
				&.dowhat {
					width: 120px;
				}
			}
		}
	}
	
	.popoverOprate {
		min-width: 85px !important;
		ul {
			li {
				padding: 6px;
				.iconfont {
					margin-right: 5px;
				}
				&:hover {
					background: #f1f1f1;
				}
			}
		}
	}
	
	.recover {
		text-align: right;
		color: #68AFFF;
		cursor: pointer;
		float: right;
		margin-right: 10px;
	}
	
	.deletedTitle {
		color: #68AFFF;
		font-size: 14px;
		margin-left: 30px;
		cursor: pointer;
	}
</style>