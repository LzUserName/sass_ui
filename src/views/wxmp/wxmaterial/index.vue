<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <el-row :span="24" :gutter="10">
        <el-col  :span="5">
          <el-card shadow="never">
            <div slot="header">
              <span>公众号名称</span>
            </div>
            <el-input
                    placeholder="输入关键字进行过滤"
                    size="mini"
                    v-model="filterText">
            </el-input>
            <el-tree
                    style="margin-top: 5px"
                    :data="treeWxAppData"
                    :props="treeWxAppProps"
                    :filter-node-method="filterNode"
                    node-key="id"
                    default-expand-all
                    ref="tree"
                    @node-click="nodeClick">
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="19"
                class="user__main">
          <el-tabs v-model="materialType" @tab-click="handleClick" v-if="appId">
            <el-tab-pane name="image">
              <span slot="label"><i class="el-icon-picture"></i> 图片</span>
              <div class="add_but">
                <el-upload
                        :action="actionUrl"
                        :headers="headers"
                        multiple
                        :limit="1"
                        :on-success="handleUploadSuccess"
                        :file-list="fileList"
                        :before-upload="beforeImageUpload"
                        :data="uploadData">
                  <el-button size="small" type="primary" v-if="permissions['wxmp:wxmaterial:add']">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    支持bmp/png/jpeg/jpg/gif格式，大小不超过2M
                  </div>
                </el-upload>
              </div>
              <div class="waterfall" v-loading="tableLoading">
                <div class="waterfall-item" v-for="item in tableData" :key='item.id'>
                  <a target="_blank" :href="item.url">
                    <img class="material-img" :src="item.url">
                    <div class="item-name">{{item.name}}</div>
                  </a>
                  <el-row class="ope-row">
                    <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="delMaterial(item)"></el-button>
                  </el-row>
                </div>
              </div>
              <div v-if="tableData.length <=0 && !tableLoading" class="el-table__empty-block">
                <span class="el-table__empty-text">暂无数据</span>
              </div>
              <el-pagination
                      @size-change="sizeChange"
                      @current-change="currentChange"
                      :current-page.sync="page.currentPage"
                      :page-sizes="[10, 20]"
                      :page-size="page.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.total"
                      class="pagination"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane name="voice">
              <span slot="label"><i class="el-icon-microphone"></i> 语音</span>
              <div class="add_but">
                <el-upload
                        :action="actionUrl"
                        :headers="headers"
                        multiple
                        :limit="1"
                        :on-success="handleUploadSuccess"
                        :file-list="fileList"
                        :before-upload="beforeVoiceUpload"
                        :data="uploadData">
                  <el-button size="small" type="primary" v-if="permissions['wxmp:wxmaterial:add']">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    格式支持mp3/wma/wav/amr，文件大小不超过2M，播放长度不超过60s
                  </div>
                </el-upload>
              </div>
              <el-table
                      :data="tableData"
                      stripe
                      border
                      v-loading="tableLoading">
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                  prop="mediaId"
                  label="media_id">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="更新时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                  <template slot-scope="scope">
                    <el-button type="text"
                               v-if="permissions['wxmp:wxmaterial:get']"
                               icon="el-icon-download"
                               size="small"
                               plain
                               @click="handleDown(scope.row)">下载</el-button>
                    <el-button type="text"
                               v-if="permissions['wxmp:wxmaterial:del']"
                               icon="el-icon-delete"
                               size="small"
                               plain
                               @click="delMaterial(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                      @size-change="sizeChange"
                      @current-change="currentChange"
                      :current-page.sync="page.currentPage"
                      :page-sizes="[10, 20]"
                      :page-size="page.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.total"
                      class="pagination"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane name="video">
              <span slot="label"><i class="el-icon-video-play"></i> 视频</span>
              <div class="add_but">
                <el-button size="small" type="primary" v-if="permissions['wxmp:wxmaterial:add']" @click="handleAddVideo">新建</el-button>
              </div>
              <el-dialog title="新建视频" :visible.sync="dialogVideoVisible" v-loading="addMaterialLoading">
                <el-upload
                        ref="uploadVideo"
                        :action="actionUrl"
                        :headers="headers"
                        multiple
                        :limit="1"
                        :on-success="handleUploadSuccess"
                        :file-list="fileList"
                        :before-upload="beforeVideoUpload"
                        :auto-upload="false"
                        :data="uploadData">
                  <el-button slot="trigger" size="mini" type="primary" v-if="permissions['wxmp:wxmaterial:add']">选择视频</el-button>
                  <div class="el-upload__tip">
                    格式支持MP4，文件大小不超过10MB
                  </div>
                </el-upload>
                <el-form :model="uploadData"
                         :rules="uploadRules"
                         ref="uploadForm">
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="uploadData.title" placeholder="标题将展示在相关播放页面，建议填写清晰、准确、生动的标题"></el-input>
                  </el-form-item>
                  <el-form-item label="描述" prop="introduction">
                    <el-input :rows="3" type="textarea" v-model="uploadData.introduction" placeholder="介绍语将展示在相关播放页面，建议填写简洁明确、有信息量的内容"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVideoVisible = false">取 消</el-button>
                  <el-button type="primary" @click="subVideo">提 交</el-button>
                </div>
              </el-dialog>
              <el-table
                      :data="tableData"
                      stripe
                      border
                      v-loading="tableLoading">
                <el-table-column
                        prop="name"
                        label="名称">
                </el-table-column>
                <el-table-column
                  prop="mediaId"
                  label="media_id">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="更新时间">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                  <template slot-scope="scope">
                    <el-button type="text"
                               v-if="permissions['wxmp:wxmaterial:get']"
                               icon="el-icon-view"
                               size="small"
                               plain
                               @click="handleInfo(scope.row)">查看</el-button>
                    <el-button type="text"
                               v-if="permissions['wxmp:wxmaterial:del']"
                               icon="el-icon-delete"
                               size="small"
                               plain
                               @click="delMaterial(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                      @size-change="sizeChange"
                      @current-change="currentChange"
                      :current-page.sync="page.currentPage"
                      :page-sizes="[10, 20]"
                      :page-size="page.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="page.total"
                      class="pagination"
              >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
  import { getPage, addObj, delObj,getMaterialOther,getMaterialVideo } from '@/api/wxmp/wxmaterial'
  import { getList as getWxAppList } from '@/api/wxmp/wxapp'
  import { mapGetters } from 'vuex'
  import WxEditor from '@/components/editor/WxEditor.vue'
  import WxMaterialSelect from '@/components/wx-material-select/main.vue'
  import store from "@/store"
  import { getStore } from '@/util/store'

  export default {
    name: 'wxmaterial',
    components: {
      WxEditor,
      WxMaterialSelect
    },
    data() {
      return {
        filterText: '',
        treeWxAppProps: {
          label: 'name',
          value: 'id'
        },
        treeWxAppData: [],
        appId: null,
        materialType:'image',
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        page1: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10 // 每页显示多少条
        },
        tableLoading: false,
        actionUrl: '/weixin/wxmaterial/materialFileUpload',
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        },
        fileList:[],
        dialogVideoVisible:false,
        addMaterialLoading:false,
        uploadData:{
          "appId": '',
          "mediaType":'image',
          "title":'',
          "introduction":''
        },
        uploadRules:{
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          introduction: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
        },
        dialogImageVisible:false,
        imageListData:[],
        tableLoading1:false,
        operateMaterial:'add',
        hackResetEditor:false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    created() {
      if(this.userInfo.type == '-1'){
        let switchTenantId = getStore({ name: 'switchTenantId' })
        if(switchTenantId){
          this.headers['switch-tenant-id'] = switchTenantId
        }
      }
    },
    mounted: function() {
      this.getWxAppList()
    },
    computed: {
      ...mapGetters(['permissions', 'userInfo'])
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      //加载公众号列表
      getWxAppList(){
        getWxAppList({
          appType: '2'
        }).then(response => {
          let data = response.data
          this.treeWxAppData = data
          if(data && data.length > 0){
            //默认加载第一个公众号的素材
            this.nodeClick({
              id: data[0].id
            })
          }
        }).catch(() => {

        })
      },
      nodeClick(data) {
        if(this.appId != data.id){
          this.$nextTick(() => {
            if(this.$refs.tree){
              this.$refs.tree.setCurrentKey(data.id)
            }
          })
          this.tableData = []
          this.page.total = 0
          this.page.currentPage = 1
          this.appId = data.id
          this.uploadData.appId = this.appId
          this.getPage(this.page)
        }
      },
      handleInfo(row){
        this.tableLoading = true
        getMaterialVideo({
          mediaId:row.mediaId,
          appId:this.appId
        }).then((response) => {
          this.tableLoading = false
          if(response.data.code == '0'){
            let downUrl = response.data.data.downUrl
            window.open(downUrl, '_blank');
          }else{
            this.$message.error('获取微信视频素材出错：' + response.data.msg)
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },
      handleDown(row){
        this.tableLoading = true
        getMaterialOther({
          mediaId:row.mediaId,
          fileName:row.name,
          appId:this.appId
        }).then(response => {
          this.tableLoading = false
          let url = window.URL.createObjectURL(new Blob([response.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', row.name)
          document.body.appendChild(link)
          link.click()
        }).catch(() => {
          this.tableLoading = false
        })
      },
      subVideo(){
        this.$refs['uploadForm'].validate((valid) => {
          if (valid) {
            this.$refs.uploadVideo.submit()
          } else {
            return false
          }
        })
      },
      handleAddVideo(){
        this.dialogVideoVisible = true
      },
      beforeImageUpload(file){
        this.tableLoading = true
        const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/bmp' || file.type === 'image/jpg';
        const isLt = file.size / 1024 / 1024 < 2
        if (!isType) {
          this.$message.error('上传图片格式不对!')
        }
        if (!isLt) {
          this.$message.error('上传图片大小不能超过2M!')
        }
        this.tableLoading = false
        return isType && isLt;
      },
      beforeVoiceUpload(file){
        this.tableLoading = true
        const isType = file.type === 'audio/mp3' || file.type === 'audio/wma' || file.type === 'audio/wav' || file.type === 'audio/amr' || file.type === 'audio/mpeg';
        const isLt = file.size / 1024 / 1024 < 2
        if (!isType) {
          this.$message.error('上传语音格式不对!')
        }
        if (!isLt) {
          this.$message.error('上传语音大小不能超过2M!')
        }
        this.tableLoading = false
        return isType && isLt;
      },
      beforeVideoUpload(file){
        this.addMaterialLoading = true
        const isType = file.type === 'video/mp4'
        const isLt = file.size / 1024 / 1024 < 10
        if (!isType) {
          this.$message.error('上传视频格式不对!')
        }
        if (!isLt) {
          this.$message.error('上传视频大小不能超过10M!')
        }
        this.addMaterialLoading = false
        return isType && isLt;
      },
      delMaterial(item){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableLoading = true
          delObj({
            id:item.mediaId,
            appId:this.appId
          }).then(response => {
            this.tableLoading = false
            if(response.data.code == '0'){
              this.getPage(this.page)
            }else{
              this.tableLoading = false
              this.$message.error('删除出错：' + response.data.msg)
            }
          }).catch(() => {
            this.tableLoading = false
          })
        })
      },
      handleUploadSuccess(response, file, fileList){
        this.tableLoading = false
        this.addMaterialLoading = false
        if(response.code == '0'){
          this.dialogVideoVisible = false
          this.fileList = []
          this.uploadData.title = ''
          this.uploadData.introduction = ''
          this.page.currentPage = 1
          this.getPage(this.page)
        }else{
          this.$message.error('上传出错：' + response.msg)
        }
      },
      handleClick(tab, event){
        let materialType = tab.name
        this.page.currentPage = 1
        this.materialType = materialType
        this.getPage(this.page)
        this.uploadData.mediaType = materialType
      },
      getPage(page, params) {
        this.tableData = []
        this.tableLoading = true
        getPage(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          appId:this.appId,
          type:this.materialType
        }, params)).then(response => {
          this.tableData = response.data.data.items
          this.page.total = response.data.data.totalCount
          this.page.currentPage = page.currentPage
          this.page.pageSize = page.pageSize
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      sizeChange(val) {
        this.page.currentPage = 1
        this.page.pageSize = val
        this.getPage(this.page)
      },
      currentChange(val) {
        this.page.currentPage = val
        this.getPage(this.page)
      },
      /**
       * 刷新回调
       */
      refreshChange(page) {
        this.getPage(this.page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination{
    float: right;
    margin-right: 25px;
  }
  .add_but{
    padding-bottom: 10px;
  }
  .ope-row{
    margin-top: 5px;
    text-align: center;
    border-top: 1px solid #eaeaea;
    padding-top: 5px;
  }
  .item-name{
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  .el-upload__tip{
    margin-left: 5px;
    color: #7f7f7f;
  }

  /*瀑布流样式*/
  .waterfall {
    width: 100%;
    column-gap:10px;
    column-count: 5;
    margin: 0 auto;
  }
  .waterfall-item {
    padding: 10px;
    margin-bottom: 10px;
    break-inside: avoid;
    border: 1px solid #eaeaea;
  }
  p {
    line-height: 30px;
  }
  @media (min-width: 992px) and (max-width: 1300px) {
    .waterfall {
      column-count: 3;
    }
    p {
      color:red;
    }
  }
  @media (min-width: 768px) and (max-width: 991px) {
    .waterfall {
      column-count: 2;
    }
    p {
      color: orange;
    }
  }
  @media (max-width: 767px) {
    .waterfall {
      column-count: 1;
    }
  }
  .material-img {
    width: 100%;
    height: 100%;
  }
</style>
