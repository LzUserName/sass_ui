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
                <el-col :span="5">
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
                <el-col :span="19">
                    <avue-crud ref="crud"
                               :page.sync="page"
                               :data="tableData"
                               :permission="permissionList"
                               :table-loading="tableLoading"
                               :option="tableOption"
                               v-model="form"
                               @on-load="getPage"
                               @refresh-change="refreshChange"
                               @row-update="handleUpdate"
                               @row-save="handleSave"
                               @row-del="handleDel"
                               @sort-change="sortChange"
                               @search-change="searchChange">
                      <template slot="menuLeft">
                        <el-button type="primary"
                                   size="small"
                                   icon="el-icon-plus"
                                   @click.stop="$refs.crud.rowAdd()"
                                   v-if="permissions['wxmp:wxtemplatemsg:add'] && this.tableData.length < 3">新增</el-button>
                      </template>
                      <template slot="menuLeft">
                        <el-button type="warning"
                                   size="small"
                                   icon="el-icon-s-promotion"
                                   v-if="permissions['wxmp:wxtemplatemsg:send']"
                                   @click="openSend">发送模板消息</el-button>
                      </template>
                      <template slot="useTypeForm"
                                slot-scope="scope">
                        <el-radio-group v-model="form.useType" size="small">
                          <el-radio border
                                    v-for="item in dicDataUseType"
                                    :key="item.value"
                                    :label="item.value"
                                    :disabled="item.disabled">
                            {{item.label}}
                          </el-radio>
                        </el-radio-group>
                      </template>
                      <template slot="previewForm" slot-scope="scope">
                        <div>
                          <div class="preview">
                            <div class="screen">
                              <div class="notch"></div>
                              <div class="status-bar">{{ form.$maAppId }}</div>
                              <div class="message-time">12:56</div>
                              <div class="message">
                                <div class="message-tittle">
                                  <span >{{ form.title }}</span>
                                  <span style="line-height: 20px;">...</span>
                                </div>
                                <div class="message-tittle-1">
                                 <div v-for="(item,index) in form.content" :key="index">
                                   <div v-if="item.name=='first'">{{item.attribute}}</div>
                                   <div v-else class="message-tittle-2">
                                     <span>{{ item.name }}：</span>
                                     <span :style="{color: item.color||'#333333'}">{{ item.name }}</span>
                                   </div>
                                 </div>
                                  <div class="message-tittle-3" v-show="form.$maAppId">
                                    <span>{{ form.$maAppId }}</span>
                                    <span>小程序</span>
                                  </div>
                                </div>
                              </div>
                              <div class="screen-bottom"></div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </avue-crud>
                </el-col>
            </el-row>
          <el-dialog title="发送模板消息" :visible.sync="dialogVisible" width="50%">
            <avue-form :option="tableOption3" v-model="sendObj" @submit="handleSubmit">
              <template slot="toUser" slot-scope="scope" >
                <el-button type="primary" size="mini" icon="el-icon-plus" @click="showWxUserList">选择用户</el-button><p></p>
                <el-tag v-for="(item, index) in wxUserList" :key="item.id" effect="plain" style="margin: 5px; height: unset; padding-top: 5px;" closable @close="removeWxUser(index)">
                  <el-avatar :src="item.headimgUrl"></el-avatar>
                  <div class="title">{{item.nickName}}</div>
                </el-tag>
              </template>
            </avue-form>
          </el-dialog>
          <el-dialog title="请选择用户" :visible.sync="dialogVisibleUser" width="80%">
            <avue-crud ref="crud2"
                       :page.sync="page2"
                       :data="tableData2"
                       :table-loading="tableLoading2"
                       :option="tableOption2"
                       @on-load="getPage2"
                       @refresh-change="refreshChange2"
                       @sort-change="sortChange2"
                       @search-change="searchChange2"
                       @selection-change="selectionChange2">
              <template slot="sex" slot-scope="scope" >
                <el-tag size="mini" effect="light" :type="scope.row.sex == '1' ? '' : scope.row.sex == '2' ? 'danger' : 'warning'">{{scope.row.$sex}}</el-tag>
              </template>
            </avue-crud>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleUser = false">取 消</el-button>
              <el-button type="primary" @click="subUser">确 定</el-button>
            </span>
          </el-dialog>
        </basic-container>
    </div>
</template>

<script>
    import {getPage, getObj, addObj, putObj, delObj, sendTemplateMsg} from '@/api/wxma/wxtemplatemsg'
    import { getList as getWxAppList } from '@/api/wxmp/wxapp'
    import {tableOption, tableOption2 as tableOption3} from '@/const/crud/wxmp/wxtemplatemsg'
    import { getPage as getPage2 } from '@/api/wxmp/wxuser'
    import { tableOption2 } from '@/const/crud/wxmp/wxuser'
    import {mapGetters} from 'vuex'
    import { unique } from "@/util/util"

    export default {
        name: 'wxtemplatemsg',
        data() {
            return {
                filterText: '',
                treeWxAppProps: {
                    label: 'name',
                    value: 'id'
                },
                treeWxAppData: [],
                appId: null,
                form: {},
                tableData: [],
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20, // 每页显示多少条
                    ascs: [],//升序字段
                    descs: []//降序字段
                },
                paramsSearch: {},
                tableLoading: false,
                tableOption: tableOption,
                dicDataUseType: [],
                dialogVisible: false,
                wxUserList: [],
                selectionData: [],
                dialogVisibleUser: false,
                tableOption2: tableOption2,
                tableData2: [],
                page2: {
                  total: 0, // 总页数
                  currentPage: 1, // 当前页数
                  pageSize: 10, // 每页显示多少条
                  ascs:[],//升序字段
                  descs:'subscribe_time'//降序字段
                },
                tableLoading2: false,
                paramsSearch2:{},
                tableOption3: tableOption3,
                sendObj: {},
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val)
            }
        },
        created() {
            this.getWxAppList()
        },
        mounted: function () {
          this.dicDataUseType = this.$refs.crud.DIC.useType
        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
                return {
                    addBtn: this.permissions['wxmp:wxtemplatemsg:add'] ? true : false,
                    delBtn: this.permissions['wxmp:wxtemplatemsg:del'] ? true : false,
                    editBtn: this.permissions['wxmp:wxtemplatemsg:edit'] ? true : false,
                    viewBtn: this.permissions['wxmp:wxtemplatemsg:get'] ? true : false
                };
            }
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
                        //默认加载第一个小程序的数据
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
                        this.$refs.tree.setCurrentKey(data.id)
                    })
                    this.tableData = []
                    this.page.total = 0
                    this.page.currentPage = 1
                    this.appId = data.id
                    this.paramsSearch = {}
                    this.$refs.crud.searchReset()
                    this.getPage(this.page)
                }
            },
            searchChange(params,done) {
                params = this.filterForm(params)
                this.paramsSearch = params
                this.page.currentPage = 1
                this.getPage(this.page, params)
                done()
            },
            sortChange(val) {
                let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : ''
                if (val.order == 'ascending') {
                    this.page.descs = []
                    this.page.ascs = prop
                } else if (val.order == 'descending') {
                    this.page.ascs = []
                    this.page.descs = prop
                } else {
                    this.page.ascs = []
                    this.page.descs = []
                }
                this.getPage(this.page)
            },
            getPage(page, params) {
                if(this.appId){
                    this.tableLoading = true
                    getPage(Object.assign({
                        current: page.currentPage,
                        size: page.pageSize,
                        descs: this.page.descs,
                        ascs: this.page.ascs,
                        appId: this.appId,
                    }, params, this.paramsSearch)).then(response => {
                        this.tableData = response.data.data.records
                        this.page.total = response.data.data.total
                        this.page.currentPage = page.currentPage
                        this.page.pageSize = page.pageSize
                        this.tableLoading = false
                        let dicDataUseType = this.dicDataUseType
                        for (let i=0;i<dicDataUseType.length;i++) {
                          dicDataUseType[i].disabled = false
                          for(let j=0;j<this.tableData.length;j++){
                            if(dicDataUseType[i].value == this.tableData[j].useType){
                              dicDataUseType[i].disabled = true
                            }
                          }
                        }
                    }).catch(() => {
                        this.tableLoading = false
                    })
                }
            },
            /**
             * @title 数据删除
             * @param row 为当前的数据
             * @param index 为当前删除数据的行数
             *
             **/
            handleDel: function (row, index) {
                let _this = this
                this.$confirm('是否确认删除此数据', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    return delObj(row.id)
                }).then(data => {
                    _this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getPage(this.page)
                }).catch(function (err) {
                })
            },
            /**
             * @title 数据更新
             * @param row 为当前的数据
             * @param index 为当前更新数据的行数
             * @param done 为表单关闭函数
             *
             **/
            handleUpdate: function (row, index, done, loading) {
                putObj(Object.assign({
                    appId: this.appId
                },row)).then(response => {
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                    done()
                    this.getPage(this.page)
                }).catch(() => {
                    loading()
                })
            },
            /**
             * @title 数据添加
             * @param row 为当前的数据
             * @param done 为表单关闭函数
             *
             **/
            handleSave: function (row, done, loading) {
                addObj(Object.assign({
                    appId: this.appId
                },row)).then(response => {
                    this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                    })
                    done()
                    this.getPage(this.page)
                }).catch(() => {
                    loading()
                })
            },
            /**
             * 刷新回调
             */
            refreshChange(page) {
                this.getPage(this.page)
            },
            removeWxUser(index){
              this.wxUserList.splice(index, 1)
            },
            subUser(){
              let wxUserList = this.wxUserList
              wxUserList = [...wxUserList, ...this.selectionData]
              //去重
              this.wxUserList = unique(wxUserList)
              this.dialogVisibleUser = false
            },
            showWxUserList(){
              this.tableData2 = []
              this.dialogVisibleUser = true
              if(this.$refs.crud2){
                this.$refs.crud2.searchReset()
              }
              this.getPage2(this.page2)
            },
            handleSubmit(form,done){
              let wxUserList = this.wxUserList
              if(wxUserList.length > 0){
                let openIds = []
                wxUserList.forEach(function (item, index) {
                  openIds.push(item.openId)
                })
                let toUser = openIds.join(',')
                form = Object.assign(form,{
                  appId: this.appId,
                  toUser: toUser
                })
                sendTemplateMsg(form).then(response => {
                  this.$alert(response.data.data, '提示', {
                    confirmButtonText: '确定',
                  });
                  done()
                }).catch(() => {
                  done()
                })
              }else{
                this.$message({
                  showClose: true,
                  message: '请选择用户',
                  type: 'error'
                })
                done()
              }
            },
            refreshChange2(page) {
              this.getPage2(this.page2)
            },
            sortChange2(val){
              let prop = val.prop ? val.prop.replace(/([A-Z])/g,"_$1").toLowerCase() : '';
              if(val.order=='ascending'){
                this.page2.descs = []
                this.page2.ascs = prop
              }else if(val.order=='descending'){
                this.page2.ascs = []
                this.page2.descs = prop
              }else{
                this.page2.ascs = []
                this.page2.descs = []
              }
              this.getPage2(this.page2)
            },
            selectionChange2(list){
              this.selectionData = list
            },
            searchChange2(params,done){
              params = this.filterForm(params)
              this.paramsSearch2 = params
              this.page2.currentPage = 1
              this.getPage2(this.page2,params)
              done()
            },
            getPage2(page, params) {
              this.tableLoading2 = true
              getPage2(Object.assign({
                current: page.currentPage,
                size: page.pageSize,
                descs: this.page2.descs,
                ascs: this.page2.ascs,
                appId: this.appId,
                subscribe: '1'
              }, params, this.paramsSearch)).then(response => {
                this.tableData2 = response.data.data.records
                this.page2.total = response.data.data.total
                this.page2.currentPage = page.currentPage
                this.page2.pageSize = page.pageSize
                this.tableLoading2 = false
              }).catch(() => {
                this.tableLoading2 = false
              })
            },
            openSend(){
              this.dialogVisible = true
            },
        }
    }
</script>

<style lang="scss" scoped>
  .preview{
    width: 400px;
    height: 800px;
    background-image: url(/img/preview/preview-phone.png);
    background-size: 340px;
    background-repeat: no-repeat;
    position: absolute;
    left: 50px;
    top: -36px;
    font-weight: 300;
    transform: scale(0.7);
    transform-origin: left top;
  }

  .screen{
    width: 316px;
    height: 670px;
    background-color: #f0f0f0;
    margin-top: 8px;
    margin-left:12px;
    border-radius: 46px;
  }

  .notch{
    width: 320px;
    height: 30px;
    background-image: url(/img/preview/preview-notch-2.png);
    background-size: 300px 24px;
    background-repeat: no-repeat;
    position: absolute;
    top:8px;
    left: 18px;
    z-index: 1;
  }

  .status-bar{
    width: 316px;
    background-color: #f0f0f0;
    padding-top: 32px;
    border-radius: 46px 46px 0 0;
    border-bottom: solid 1px #d1d1d1;
    text-align: center;
    font-size: 16px;
  }

  .message-time{
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
    color: #666666;
  }

  .message{
    width: 280px;
    margin: auto;
    margin-top: 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
  }

  .screen-bottom{
    width: 316px;
    height: 72px;
    background-image: url(/img/preview/preview-bottom.png);
    background-size: 320px 72px;
    background-repeat: no-repeat;
    border-radius: 0 0 46px 46px;
    position: absolute;
    top: 608px;
  }

  .message-tittle{
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }

  .message-tittle-1{
    font-size: 14px;
    line-height: 18px;
  }

  .message-tittle-2{
    margin-top: 6px;
  }

  .message-tittle-3{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-top: #F0F0F0 1px solid;
    padding-top: 10px;
  }
</style>
