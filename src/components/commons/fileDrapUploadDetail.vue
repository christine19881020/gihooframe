<template>
	<section class="clearfix" style="width:100%;min-height:300px;position:relative" :style="{'height':calheight+100+'px'}">
		<div class="fileheader">
			<label>文件库</label>
			<el-dropdown>
				<el-button size="small">
					上传文件<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<el-upload :headers="header" :on-success="handleSuccess" :on-progress="handleProgress" :show-file-list="false" :action="actionURL" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :before-remove="beforeRemove" multiple :on-exceed="handleExceed" :file-list="fileList">
							<el-button size="small" class="filebtn" type="text" @click="">点击上传</el-button>
						</el-upload>
					</el-dropdown-item>
					<el-dropdown-item>
						<el-button size="small" class="filebtn" type="text" @click.native="newfoldershowFn">创建文件夹</el-button>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<el-breadcrumb class="breadlist" separator="/">
				<el-breadcrumb-item @click.native="gofolderpageFn('0')">文件</el-breadcrumb-item>
				<el-breadcrumb-item @click.native="gofolderpageFn(item.FolderId)" v-for="(item,index) in currentLocation" :key="index">{{item.FolderName}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="fileDrapUpload filedetaildrag" :style="{'height':calheight+40+'px'}">
			<el-upload class="upload-demo" :headers="header" drag :on-progress="handleProgress" :on-success="handleSuccess" :show-file-list="false" :action="actionURL" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :before-remove="beforeRemove" multiple :on-exceed="handleExceed" :file-list="fileList">
				<template v-if="uploadList.length==0&&!listview">
					<div class="nofile">
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">暂无添加文件<br/><em>(文件拖放至此处即可上传)</em></div>
					</div>
				</template>
			</el-upload>
		</div>

		<!--列表展示-->
		<div class="listview" v-if="listview">
			<div class="switchHead clearfix">
				<i class="iconfont icon-suolvetu fr" @click="listviewFn"></i>
				<i class="iconfont icon-liebiao active fr"></i>
			</div>

			<!--未删除-->
			<el-table :data="uploadList" class="fileTable">
				<el-table-column label="名称" width="180">
					<template slot-scope="scope">
						<!--<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)<=-1&&scope.row.FileType!='folder'" :alt="scope.row.FileName" :FileId="scope.row.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+scope.row.FileType+'.png'" :title="scope.row.FileName" />
						<img class="fl" width="24px" height="24px" v-if="scope.row.FileType=='folder'" :FileId="scope.row.FileId" src="../../assets/folder.png" @click="goFolderPage(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="scope.row.FileType!='folder'" :src="'https://www.jihuobao.net:11443//'+scope.row.FilePath" @click="gobigImgFn(scope.row)" />-->

						<img class="fl" width="24px" height="24px" v-if="scope.row.FileType=='folder'" :FileId="scope.row.FileId" src="../../assets/folder.png" @click="goFolderPage(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)<=-1&&scope.row.FileType!='folder'" :FileId="scope.row.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+scope.row.FileType+'.png'" @click="gofileviewFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)>-1" :src="'https://www.jihuobao.net:11443/'+scope.row.FilePath" @click="gobigImgFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="!scope.row.FileType" :alt="scope.row.FileName" :FileId="scope.row.FileId" src="../../assets/file_extension_others.png" />

						<div class="ellipsis" :title="scope.row.FileName">
							<template v-if="scope.row.renameshow&&scope.row.FileType!='folder'">
								<el-input size="mini" :placeholder="scope.row.FileName" v-model="renameFile" @keyup.enter.native="renameSubmitFn(scope.row)"></el-input>
							</template>
							<template v-if="scope.row.renameshow&&scope.row.FileType=='folder'&&!newFolderShow">
								<!--文件夹重命名-->
								<el-input size="mini" :placeholder="scope.row.FileName" v-model="renameFile" @keyup.enter.native="renameFolderFn(scope.row)"></el-input>
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
					<template slot-scope="scope">
						<div class="oprateCell">
							<i v-show="scope.row.FileType!='folder'" class="iconfont icon-unie122" @click="downloadFn(scope.row,$event)"></i>

							<el-upload style="display:inline-block;" :headers="header" :on-success="uploadSuccess" :on-progress="handleProgress" :show-file-list="false" action="https://www.jihuobao.net:11443/FactoryTrade/BatchTaskFile/TaskUploadifyFile" :on-preview="handlePreview" :on-remove="handleRemove" :before-upload="beforeUpload" :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="fileList">
								<i class="iconfont icon-shangchuan" @click="uploadfileFn(scope.row)"></i>
							</el-upload>
							<i class="iconfont icon-record" v-popover:popoverRecord @click="recordFn(scope.row,$event)"></i>
							<i class="iconfont icon-yanjing" v-popover:popoverWatch @click="watchFn(scope.row,$event)"></i>
							<i class="iconfont icon-jiantou9" v-popover:popoverOprate @click="oprateFn(scope.row,$event)"></i>
						</div>
					</template>
				</el-table-column>
			</el-table>

			<a class="deletedTitle" v-if="!deleteShow" @click="deleteShowFn">显示已删除</a>
			<a class="deletedTitle" v-else @click="deleteShow=false"> 隐藏已删除</a>

			<!--已删除-->
			<el-table v-if="deleteShow" :data="deletedList" class="fileTable" style="margin-top:0;">
				<el-table-column label="名称" width="180">
					<template slot-scope="scope">
						<img class="fl" width="24px" height="24px" v-if="scope.row.FileType=='folder'" :FileId="scope.row.FileId" src="../../assets/folder.png" @click="goFolderPage(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)<=-1&&scope.row.FileType!='folder'" :FileId="scope.row.FileId" :src="'https://tower.im/assets/file_icons/file_extension_'+scope.row.FileType+'.png'" @click="gofileviewFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="imgTypes.indexOf(scope.row.FileType)>-1" :src="'https://www.jihuobao.net:11443/'+scope.row.FilePath" @click="gobigImgFn(scope.row)" />
						<img class="fl" width="24px" height="24px" v-if="!scope.row.FileType" :alt="scope.row.FileName" :FileId="scope.row.FileId" src="../../assets/file_extension_others.png" />
						<div class="ellipsis" :title="scope.row.FileName">
							{{ scope.row.FileName }}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="Creater" label="创建者" width="180">
				</el-table-column>
				<el-table-column label="时间">
					<template slot-scope="scope">
						<div class="ellipsis">{{ scope.row.CreateDate|moment }}</div>
					</template>
				</el-table-column>
				<el-table-column width="180">
					<template slot-scope="scope">
						<a class="recover" @click="recoverFn(scope.row)">恢复</a>
					</template>
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
			<li class="demo-upload-list clear" v-for="item in uploadList">
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
		<el-popover ref="popoverWatch" :open-delay=10 v-model="popoverWatch" placement="bottom" @after-leave="" title="" popper-class="popoverRecord" width="360" trigger="click">
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
				<li v-for="(item,index) in watch.data">
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
				<li @click="renameFn(file)">
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

	</section>
</template>

<script>
	import moment from 'moment'
	import {
		GetListJsonAPI,
		CreateFolderAPI,
		RemoveFolderOrFileAPI,
		TaskListJsonAPI,
		filerecordsAPI,
		deletedfilesAPI,
		restorefileAPI,
		renamefileAPI,
		downloadfolderAPI,
		renamefolderAPI,
		FileLookListAPI,
		UpdateFileAPI,
		filelogApi
	} from '@/api/api'
	export default {
		name: 'file',
		props: { //定义传值的类型<br> 
			TaskId: String,
			FolderId: String,
			contractnumberid: String,
		},
		data() {
			return {
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
				updatefile: [],
				singleUpload: {}
			}
		},
		methods: {
			filelogFn(FileId) {
				let params = {
					fileid: FileId
				}
				filelogApi(params).then(res => {
                    
				})
			},
			gobigImgFn(file) {
				this.dialogVisible = true;
				this.dialogImageUrl = 'https://www.jihuobao.net:11443//' + file.FilePath;
				this.filelogFn(file.FileId);
			},
			gofileviewFn(file) {
				this.filelogFn(file.FileId);
				file.filepath = file.FilePath ? file.FilePath : file.response.FilePath;
				window.open('http://dcsapi.com/?k=390747405&url=https://jihuobao.net:11443/' + file.filepath, 'newwindow');
			},
			uploadfileFn(file) {
				console.log('file', file)
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
				UpdateFileAPI(params).then(res => {
					if(res.type == 1) {
						this.$message({
							type: 'success',
							message: res.message
						})
						this.getFilesFn();
					} else {
						this.$message({
							type: 'info',
							message: res.message
						})
					}
				})
			},
			newfoldershowFn() {
				this.newFolderShow = true;
				this.num = this.num + 1;
				//列表
				if(this.listview) {
					var newfolder = {
						FileType: "folder",
						FileName: '新建文件夹',
						renameshow: true,
					}
					this.uploadList.unshift(newfolder);
				}

			},
			listviewFn() {
				this.listview = false;
				this.calheight = this.uploadList.length * 50 + 80;
			},
			deleteShowFn() {
				this.deleteShow = true;
				this.deletedfilesFn();
			},
			downloadFn(file, $event) {
				console.log(file)
				var token = "";
				token = JSON.parse(sessionStorage.getItem('user')).Token;
				console.log('token', token);
				//				<a v-if="item.FileType!='folder'" :href="'https://www.jihuobao.net:11443/FactoryTrade/ResourceFile/DownloadFile?keyValue='+item.FileId">下载</a>
				//					<router-link target="_blank" v-if="item.FileType=='folder'&&item.FileId!=item.OrderID" :to="'/download/DownloadFolder/'+item.FileId">下载</router-link>
				//					<router-link target="_blank" v-if="item.FileType=='folder'&&item.FileId==item.OrderID" :to="'/download/DownloadFolder/order-'+item.FileId">下载</router-link>
				if(file.FileType != 'folder') {
					window.location.href = 'https://www.jihuobao.net:11443/FactoryTrade/ResourceFile/DownloadFile?keyValue=' + file.FileId + '&token=' + token;
				}
			},

			//			downFileFn(file){
			//				let params={
			//					FileId:file.FileId,
			//				}
			//				downloadfolderAPI(params).then(res=>{
			//					
			//				})
			//			},
			recordFn(v, $event) {
				this.file = v;
				//				console.log('this.file',this.file);
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
				deletedfilesAPI(params).then(res => {
					this.deletedList = res.resultdata.FileInfoEntity;
					this.delnum = this.deletedList.length;	
					
					if(this.delnum==0){
						this.delnum=1;
					}
					this.num = this.num + this.delnum;
				})
			},
			oprateFn(v, $event) {
				this.file = v;
				this.popoverOprate = true;
				this.$nextTick(() => {
					var pop = this.$refs['popoverOprate'];
					pop.popperJS._reference = $event.target;
					pop.popperJS.state.position = pop.popperJS._getPosition(pop.popperJS._popper, pop.popperJS._reference);
					pop.popperJS.update();
				})
			},
			renameFn(file) {
				file.renameshow = true;
				//				console.log('rename',file)
				this.renameFile = file.FileName
				//				if(file.FileType=='folder'){
				//					this.renameFile = file.FileName
				//				}else{
				//					this.renameFile = file.FileName+"."+file.FileType;
				//				}

			},
			renameFolderFn(file) {
				let params = {
					FileId: file.FileId,
					fileName: this.renameFile,
				}
				renamefolderAPI(params).then(res => {
					if(res.type == 1) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						file.renameshow = false;
						file.FileName = this.renameFile;
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}
				})
			},
			renameSubmitFn(file) {
				let params = {
					FileId: file.FileId,
					fileName: this.renameFile,
				}
				renamefileAPI(params).then(res => {
					if(res.type == 1) {
						this.$message({
							message: res.message,
							type: 'success'
						});
						file.renameshow = false;
						file.FileName = this.renameFile;
					} else {
						this.$message({
							message: res.message,
							type: 'warning'
						})
					}

				})
			},
			setHead() {
				let user = JSON.parse(sessionStorage.getItem('user'));
				if(user) {
					this.header.Authorization = `${user.Token}`;
				}
			},
			handleProgress(event, file, fileList) {
				console.log(event, file, fileList);
				this.progress = this.progress + 15;

			},
			beforeUpload(file) {
				//				if(this.PageType && this.CustomID && this.FolderId) {
				//					this.actionURL = "http://121.40.217.143:8585/FactoryTrade/ResourceFile/UploadifyFileNoId?PageType=" + this.PageType + "&CustomID=" + this.CustomID + "&FolderId=" + this.FolderId;
				//				}
				//				this.actionURL = 'http://121.40.217.143:8585/FactoryTrade/ResourceFile/UploadifyFileNoId?PageType=' + this.PageType + '&CustomID=' + this.CustomID + '&FolderId=0'
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
					FolderId: this.folderid,
					TaskID: this.TaskId
				}
				TaskListJsonAPI(params).then(res => {
					this.uploadList = [];
					res.resultdata.FileInfoEntity.forEach(item => {
						item.renameshow = false;
						this.uploadList.push(item);
					});
					this.currentLocation = res.resultdata.CurrentLocation;

					if(this.uploadList.length < 4) {
						this.num = 1
					} else {
						this.num = Math.ceil(this.uploadList.length / 4);
					}
					console.log(this.num)
					//					if(this.listview){
					//						this.calheight=this.uploadList.length*50+80;
					//					}else{
					//						this.calheight=this.num*220+80;
					//					}

					sessionStorage.setItem('detailFileNo', this.uploadList.length);
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
						FileId: item.FileId,
						FileType: (item.FileType == "folder") ? 'folder' : 'file',
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
		computed: {
			calheight: function() {
				if(this.listview) {
					if(!this.deleteShow) {
						if(this.uploadList.length == 0) {
							return 180
						} else {
							return this.uploadList.length * 50 + 80;
						}

					} else {
						return 60 * (this.uploadList.length + this.delnum) + 140;
					}
				} else {
					if(this.uploadList.length / 4 == 0) {
						return 250
					} else {
						return 220 * Math.ceil(this.uploadList.length / 4);
					}

				}

			}

		},
		watch: {
			'folderid': function(val) {
				this.getFilesFn();
				this.actionURL = "https://www.jihuobao.net:11443/FactoryTrade/ResourceFile/UploadifyTaskFile?FolderId=" + val + "&TaskId=" + this.TaskId;
			},
			"TaskId": function(val) {
				this.getFilesFn();
				this.actionURL = "https://www.jihuobao.net:11443/FactoryTrade/ResourceFile/UploadifyTaskFile?FolderId=" + this.folderid + "&TaskId=" + val;
			}
		},
		mounted() {
			this.setHead();
			this.getFilesFn();

			this.actionURL = "https://www.jihuobao.net:11443/FactoryTrade/ResourceFile/UploadifyTaskFile?FolderId=" + this.folderid + "&TaskId=" + this.TaskId;

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
		width: 95%;
		margin: 20px auto;
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
				&.who {
					width: 50px;
					display: inline-block;
				}
				&.dowhat {
					width: 120px;
					display: inline-block;
				}
			}
		}
	}
	
	.popoverOprate {
		min-width: 85px!important;
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