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
            <div slot="header" class="clearfix">
              <span>机构名称</span>
            </div>
            <avue-tree :option="treeOption"
                       :data="treeOrganData"
                       @node-click="nodeClick"></avue-tree>
          </el-card>
        </el-col>
        <el-col :span="19"
                class="user__main">
          <avue-crud ref="crud"
                     v-model="form"
                     :page.sync="page"
                     :data="tableData"
                     :table-loading="tableLoading"
                     :option="tableOption"
                     :permission="permissionList"
                     :before-open="beforeOpen"
                     @on-load="getPage"
                     @refresh-change="refreshChange"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="handleDel"
                     @sort-change="sortChange"
                     @search-change="searchChange">
            <template slot="menuLeft">
              <el-button type="warning" size="small" icon="el-icon-connection" v-if="permissions['wxmp:wxapp:add']"
                         @click="toAuth">
                一键授权添加
              </el-button>
            </template>
            <template slot="keyPathForm"
                      slot-scope="scope">
              <div v-if="scope.row.keyPath">
                <el-tag closable @close="keyPathRemove">
                  {{scope.row.keyPath}}
                </el-tag>
              </div>
              <el-upload
                v-if="!scope.row.keyPath"
                :action="'/weixin/wxapp/cert/upload?appId='+form.id"
                :headers="headers"
                :limit="1"
                :on-success="uploadCertSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">请上传apiclient_cert.p12</div>
              </el-upload>
            </template>
            <template slot="name" slot-scope="scope">
              <div style="font-weight: bolder">
                <i class="el-icon-s-cooperation"></i> {{scope.row.name}}
              </div>
            </template>
            <template slot-scope="props" slot="expand">
              <el-row :span="24" :gutter="10">
                <el-col :span="14" style="text-align: center" v-if="props.row.isComponent == '0'">
                  <el-image
                    style="width: 160px; height: 160px"
                    :src="props.row.qrCode"></el-image>
                  <p/>
                </el-col>
                <el-col :span="14" style="text-align: center" v-if="props.row.isComponent == '1'">
                  <el-image
                    style="width: 160px; height: 160px"
                    :src="props.row.qrCode"></el-image>
                  <p/>
                  <el-button type="text" size="mini" icon="el-icon-info" @click="getAuthorizerInfo(props.row.id)">
                    授权信息
                  </el-button>
                  <el-button type="text"
                             icon="el-icon-key"
                             size="small"
                             @click="getAccessToken(props.row.id)">查看access-token
                  </el-button>
                  <el-button type="text"
                             icon="el-icon-refresh"
                             size="small"
                             class="mag_left"
                             @click="clearQuota(props.row.id)">api次数清零
                  </el-button>
                  <el-button type="text" size="mini" icon="el-icon-link" v-if="permissions['wxma:serveraddress:index']"
                             @click="getServerAddressView(props.row.id)">
                    服务器域名
                  </el-button>
                  <el-button type="text" size="mini" icon="el-icon-s-opportunity" v-if="permissions['wxma:privacysetting:index']"
                             @click="getPrivacySettingView(props.row.id)">
                    用户隐私保护指引
                  </el-button>
                </el-col>
                <el-col :span="10">
                  <div style="font-size: 16px;font-weight: bold;">
                    <i class="el-icon-office-building"></i> {{props.row.principalName}}
                  </div>
                  <div>
                    AppID：{{props.row.id}}
                  </div>
                  <div>
                    创建时间：{{props.row.createTime}}
                  </div>
                  <div>
                    <el-button type="text" size="mini" icon="el-icon-connection" v-if="permissions['wxmp:wxapp:add']"
                               @click="toAuth">
                      重新授权
                    </el-button>
                    <el-button type="text" size="mini" icon="el-icon-connection" v-if="permissions['wxma:code:index']"
                               @click="getCodeView(props.row.id)">
                      代码管理
                    </el-button>
                  </div>
                </el-col>
              </el-row>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
      <el-dialog
        title="查看权限集"
        :visible.sync="dialogAuthorizerInfo"
        width="30%">
        <el-checkbox-group v-model="authorizerList">
          <el-checkbox label="1" disabled>消息管理权限</el-checkbox>
          <el-checkbox label="2" disabled>用户管理权限</el-checkbox>
          <el-checkbox label="3" disabled>帐号服务权限</el-checkbox>
          <el-checkbox label="4" disabled>网页服务权限</el-checkbox>
          <el-checkbox label="5" disabled>微信小店权限</el-checkbox>
          <el-checkbox label="6" disabled>微信多客服权限</el-checkbox>
          <el-checkbox label="7" disabled>群发与通知权限</el-checkbox>
          <el-checkbox label="8" disabled>微信卡券权限</el-checkbox>
          <el-checkbox label="9" disabled>微信扫一扫权限</el-checkbox>
          <el-checkbox label="10" disabled>微信连 WI-FI 权限</el-checkbox>
          <el-checkbox label="11" disabled>素材管理权限</el-checkbox>
          <el-checkbox label="12" disabled>微信摇周边权限</el-checkbox>
          <el-checkbox label="13" disabled>微信门店权限</el-checkbox>
          <el-checkbox label="15" disabled>自定义菜单权限</el-checkbox>
          <el-checkbox label="22" disabled>城市服务接口权限</el-checkbox>
          <el-checkbox label="26" disabled>微信电子发票权限</el-checkbox>
          <el-checkbox label="24" disabled>微信开放平台帐号管理权限</el-checkbox>
          <el-checkbox label="17" disabled>帐号管理权限</el-checkbox>
          <el-checkbox label="18" disabled>开发管理与数据分析权限</el-checkbox>
          <el-checkbox label="19" disabled>客服消息管理权限</el-checkbox>
          <el-checkbox label="24" disabled>微信开放平台帐号管理权限</el-checkbox>
          <el-checkbox label="30" disabled>小程序基本信息设置权限</el-checkbox>
          <el-checkbox label="37" disabled>小程序附近地点权限集</el-checkbox>
          <el-checkbox label="40" disabled>小程序插件管理权限集</el-checkbox>
        </el-checkbox-group>
      </el-dialog>
      <el-dialog
        title="版本管理"
        :visible.sync="dialogCodeTemplate"
        width="60%">
        <el-card class="box-card">
          <div slot="header">
            <span>审核版本</span>
          </div>
          <el-table
            :data="[codeAudit]"
            border
            style="width: 100%"
            v-if="codeAudit.status != null">
            <el-table-column
              align="center"
              prop="auditId"
              label="审核ID">
            </el-table-column>
            <el-table-column
              align="center"
              prop="status"
              label="审核状态">
              <template slot-scope="scope">
                {{codeAudit.status == 0 ? '审核成功' : codeAudit.status == 1 ? '审核被拒绝' : codeAudit.status == 2 ? '审核中' : codeAudit.status == 3 ? '已撤回' : ''}}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="reason"
              label="拒绝原因"
              v-if="codeAudit.status == 1">
            </el-table-column>
            <el-table-column
              align="center"
              prop="screenShot"
              label="截图示例"
              v-if="codeAudit.status == 1">
              <template slot-scope="scope" v-if="codeAudit.screenShot">
                <el-link type="primary" class="el-icon-picture" v-for="(item, index) in codeAudit.screenShot.split('|')" :key="index" style="margin-right: 10px"
                         @click="getScreenShot(item)">截图{{index+1}}</el-link>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button type="info" size="mini" icon="el-icon-close"
                           @click="undoCodeAudit()" :loading="tableLoading" v-if="scope.row.status == 2">
                  撤回审核
                </el-button>
                <el-button type="success" size="mini" icon="el-icon-connection"
                           @click="releaseCode(scope.row.auditId)" :loading="tableLoading" v-if="scope.row.status == 0 && scope.row.havRelease != '1'">
                  发布版本
                </el-button>
                <el-button type="info" size="mini" icon="el-icon-check"
                           v-if="scope.row.status == 0 && scope.row.havRelease == '1'">
                  已发布
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-alert
            title="你暂无提交审核的版本或者版本已发布上线"
            type="info"
            :closable="false"
            v-if="codeAudit.status == null">
          </el-alert>
        </el-card>
        <el-card class="box-card" v-if="maPages.length > 0">
          <div slot="header">
            <span>已上传代码</span>
          </div>
          <el-row :span="24">
            <el-col :span="18">
              <el-collapse>
                <el-collapse-item title="所有页面">
                  <div>{{maPages}}</div>
                </el-collapse-item>
              </el-collapse>
            </el-col>
            <el-col :span="6" style="text-align: center">
              <el-button size="mini" icon="el-icon-s-grid"
                         @click="getQrCode" :loading="tableLoading">
                体验版二维码
              </el-button>
              <br><br>
              <el-button icon="el-icon-s-promotion" @click="submitCode()" type="success" size="mini" :loading="tableLoading">
                提交审核
              </el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card class="box-card">
          <div slot="header">
            <span>模板库</span>
          </div>
          <el-table
            :data="listCodeTemplate"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="userVersion"
              label="模板版本号">
            </el-table-column>
            <el-table-column
              align="center"
              prop="createTime"
              label="添加时间">
              <template slot-scope="scope">
                {{ $moment(scope.row.createTime*1000).format('YYYY-MM-DD hh:mm:ss') }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="userDesc"
              label="模板描述">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button @click="commitCode(scope.row)" type="success" size="mini" :loading="tableLoading" icon="el-icon-upload">上传代码</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-dialog>
      <el-dialog
        title="设置服务器域名"
        :visible.sync="dialogServerAddress"
        width="60%">
        <el-alert
          title="请确保填写的域名已经在微信第三方平台配置"
          type="warning"
          center
          :closable="false">
        </el-alert>
        <el-divider></el-divider>
        <el-row :span="24">
          <el-col :span="6">
            request合法域名
          </el-col>
          <el-col :span="18">
            <avue-array v-model="serverAddress.requestDomain" placeholder="请输入request合法域名"></avue-array>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :span="24">
          <el-col :span="6">
            socket合法域名
          </el-col>
          <el-col :span="18">
            <avue-array v-model="serverAddress.wsRequestDomain" placeholder="请输入socket合法域名"></avue-array>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :span="24">
          <el-col :span="6">
            uploadFile合法域名
          </el-col>
          <el-col :span="18">
            <avue-array v-model="serverAddress.uploadDomain" placeholder="请输入uploadFile合法域名"></avue-array>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :span="24">
          <el-col :span="6">
            downloadFile合法域名
          </el-col>
          <el-col :span="18">
            <avue-array v-model="serverAddress.downloadDomain" placeholder="请输入downloadFile合法域名"></avue-array>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div style="text-align: center">
          <el-button @click="serverAddressSet()" type="success" :loading="tableLoading">确认提交</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="用户隐私保护指引"
        :visible.sync="dialogPrivacySetting"
        width="60%">
        <avue-form v-model="privacySetting" :option="optionPrivacySetting" @submit="submitPrivacySetting">
          <template slot-scope="scope" slot="privacy_key">
            <el-select v-model="scope.row.privacy_key" placeholder="请选择">
              <el-option
                v-for="item in privacy_desc_list"
                :key="item.privacy_key"
                :label="item.privacy_desc"
                :value="item.privacy_key">
              </el-option>
            </el-select>
          </template>
        </avue-form>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {
    getPage,
    getObj,
    addObj,
    putObj,
    delObj,
    createQrCode,
    clearQuota,
    getAccessToken,
    getAuthorizerInfo,
    getCodeTemplateList,
    commitCode,
    getMaPage,
    submitCode,
    getLatestAuditstatus,
    undoCodeAudit,
    releaseCode,
    serverAddressGet,
    serverAddressSet,
    getScreenShot,
    getQrCode,
    getWxMaCodeAudit,
    privacySettingGet,
    privacySettingSet
  } from '@/api/wxma/wxapp'
  import {tableOption} from '@/const/crud/wxma/wxapp'
  import {tableOption as optionPrivacySetting} from '@/const/crud/wxma/wxprivacysetting'
  import {fetchTree} from "@/api/upms/organ"
  import { maLivePluginVersion, maLivePluginProvider } from '@/config/env.js'
  import {mapGetters, mapState} from 'vuex'
  import store from "@/store"
  import { getStore } from '@/util/store'

  export default {
    name: 'wxapp',
    data() {
      return {
        headers: {
          Authorization: 'Bearer ' + store.getters.access_token
        },
        treeOption: {
          nodeKey: 'id',
          addBtn: false,
          menu: false,
          defaultExpandAll: true,
          props: {
            label: 'name',
            value: 'id'
          }
        },
        form: {},
        authorizerList: [],
        dialogAuthorizerInfo: false,
        host: window.location.href.split('#')[0],
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],
          descs: 'create_time'
        },
        paramsSearch: {},
        tableLoading: false,
        tableOption: tableOption,
        treeOrganData: [],
        organProps: {
          label: 'name',
          value: 'id',
        },
        dialogCodeTemplate: false,
        listCodeTemplate: [],
        openAppId: '',
        codeAudit: {},
        maPages: [],
        dialogServerAddress: false,
        serverAddress: {},
        dialogPrivacySetting: false,
        privacySetting: {},
        optionPrivacySetting: optionPrivacySetting,
        // privacy_ver: 2,
        privacy_desc_list: []
      }
    },
    watch:{
      // 'privacySetting.privacy_ver'(val,oldVal){
      //   let column3 = this.optionPrivacySetting.column[3]
      //   if(val === 2){
      //     column3.display = true
      //   }
      //   if(val === 1){
      //     column3.display = false
      //   }
      //   if(val != oldVal && val){
      //     this.privacy_ver = val
      //     this.privacySettingGet(this.privacy_ver)
      //   }
      // }
    },
    created() {
      if(this.userInfo.type == '-1'){
        let switchTenantId = getStore({ name: 'switchTenantId' })
        if(switchTenantId){
          this.headers['switch-tenant-id'] = switchTenantId
        }
      }
      this.handleOrgan()
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions', 'userInfo']),
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      permissionList() {
        return {
          addBtn: this.permissions['wxmp:wxapp:add'] ? true : false,
          delBtn: this.permissions['wxmp:wxapp:del'] ? true : false,
          editBtn: this.permissions['wxmp:wxapp:edit'] ? true : false,
          viewBtn: this.permissions['wxmp:wxapp:get'] ? true : false
        }
      }
    },
    methods: {
      keyPathRemove() {
        this.form.keyPath = ''
      },
      uploadCertSuccess(response, file, fileList) {
        this.form.keyPath = response.link
      },
      nodeClick(data) {
        this.page.currentPage = 1
        this.getPage(this.page, {organId: data.id})
      },
      handleOrgan() {
        fetchTree().then(response => {
          this.treeOrganData = response.data.data;
        });
      },
      getAuthorizerInfo(appId) {
        this.tableLoading = true
        getAuthorizerInfo(appId)
          .then(response => {
            this.tableLoading = false
            this.dialogAuthorizerInfo = true
            let funcInfo = response.data.data.authorizationInfo.funcInfo
            funcInfo.forEach(function (val, index) {
              funcInfo[index] = val + ''
            })
            this.authorizerList = funcInfo
          }).catch(() => {
          this.tableLoading = false
        })
      },
      toAuth() {
        let userInfo = this.userInfo
        let tenantId = userInfo.type == '-1' ? this.treeOrganData[0].id : userInfo.tenantId
        let organId = userInfo.type == '-1' ? this.treeOrganData[0].id : userInfo.organId
        let url = 'view/wxopen/auth.html?authType=2&tenantId=' + tenantId + '&organId=' + organId + '&host=' + this.host
        window.location.href = url
      },
      toAccess(row) {
        this.$alert('<textarea rows="3" style="width: 100%">' + this.host + 'wxma/portal/' + row.id + '</textarea>', '接入地址', {
          dangerouslyUseHTMLString: true
        })
      },
      clearQuota(val) {
        let _this = this
        this.$confirm('是否确认要清零微信接口次数', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this.tableLoading = true
          clearQuota({
            id: val
          }).then(response => {
            _this.tableLoading = false
            if (response.data.code == '0') {
              _this.$message({
                showClose: true,
                message: '清零成功',
                type: 'success'
              })
            }
          }).catch(() => {
            _this.tableLoading = false
          })
        })
      },
      createQrCode(val) {
        this.tableLoading = true
        createQrCode({
          id: val,
          sceneStr: '1'//默认场景值
        }).then(response => {
          this.tableLoading = false
          this.getPage(this.page)
        }).catch(() => {
          this.tableLoading = false
        })
      },
      searchChange(params, done) {
        params = this.filterForm(params)
        this.paramsSearch = params
        this.page.currentPage = 1
        this.getPage(this.page, params)
        done()
      },
      sortChange(val) {
        let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : '';
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
        this.tableLoading = true
        getPage(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page.descs,
          ascs: this.page.ascs,
          appType: '1'
        }, params, this.paramsSearch)).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.page.currentPage = page.currentPage
          this.page.pageSize = page.pageSize
          this.tableLoading = false
        }).catch(() => {
          this.tableLoading = false
        })
      },
      beforeOpen(done, type) {
        window.openType = type
        done()
      },
      handleDel: function (row, index) {
        var _this = this
        this.$confirm('是否确认删除【' + row.name + '】', '提示', {
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
        row.id = row.id.trim();
        row.secret = row.secret.trim();
        putObj(row).then(data => {
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
        row.id = row.id.trim();
        row.secret = row.secret.trim();
        addObj(Object.assign(row, {
          isComponent: '0',
          appType: '1'
        })).then(data => {
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
      getAccessToken(appId) {
        this.tableLoading = true
        getAccessToken({
          id: appId
        }).then(response => {
          this.tableLoading = false
          const h = this.$createElement
          this.$alert('<textarea rows="5" style="width: 100%">' + response.data.data + '</textarea>', 'AccessToken', {
            dangerouslyUseHTMLString: true
          })
        }).catch(() => {
          this.tableLoading = false
        })
      },
      getCodeView(id){
        this.codeAudit = {}
        this.listCodeTemplate = []
        this.openAppId = id
        this.tableLoading = true
        this.dialogCodeTemplate = true
        this.getMaPage()
        this.getCodeTemplateList()
        this.getLatestAuditstatus()
      },
      getServerAddressView(id){
        this.openAppId = id
        this.serverAddressGet()
      },
      getPrivacySettingView(id){
        this.openAppId = id
        this.privacySettingGet()
      },
      privacySettingGet(){
        this.tableLoading = true
        privacySettingGet({
          appId: this.openAppId
        }).then(response => {
          this.tableLoading = false
          this.dialogPrivacySetting = true
          let data = response.data.data
          if(data.errcode == 0){
            this.privacySetting = data
            this.privacy_desc_list = data.privacy_desc.privacy_desc_list
          }else{
            this.$message({
              showClose: true,
              message: data.errmsg,
              type: 'error'
            })
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },
      submitPrivacySetting(row, done, loading){
        privacySettingSet(Object.assign({
          appId: this.openAppId
        },row)).then(data => {
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })
          this.dialogPrivacySetting = false
          done()
        }).catch(() => {
          done()
        })
      },
      /**
       * 获取服务器域名
       * */
      serverAddressGet(){
        this.tableLoading = true
        serverAddressGet({
          appId: this.openAppId
        }).then(response => {
          this.tableLoading = false
          let serverAddress = response.data.data
          if(serverAddress.downloadDomain.length <= 0){
            serverAddress.downloadDomain = ['']
          }
          if(serverAddress.requestDomain.length <= 0){
            serverAddress.requestDomain = ['']
          }
          if(serverAddress.uploadDomain.length <= 0){
            serverAddress.uploadDomain = ['']
          }
          if(serverAddress.wsRequestDomain.length <= 0){
            serverAddress.wsRequestDomain = ['']
          }
          this.serverAddress = serverAddress
          this.dialogServerAddress = true
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 设置服务器域名
       * */
      serverAddressSet(){
        this.tableLoading = true
        serverAddressSet(Object.assign(this.serverAddress,{
          appId: this.openAppId,
        })).then(response => {
          this.tableLoading = false
          this.$message({
            showClose: true,
            message: '设置成功',
            type: 'success'
          })
          this.serverAddressGet()
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 获取代码模板列表
       * */
      getCodeTemplateList() {
        getCodeTemplateList().then(response => {
          this.tableLoading = false
          this.listCodeTemplate = response.data.data
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 查询最新一次提交的审核状态
       * */
      getLatestAuditstatus(){
        getLatestAuditstatus(this.openAppId).then(response => {
          this.tableLoading = false
          let codeAudit = response.data.data
          if(codeAudit.auditId){
            getWxMaCodeAudit({
              auditId: codeAudit.auditId
            }).then(response2 => {
              if(response2.data.data != null){
                codeAudit.havRelease = '1'
              }
              this.codeAudit = codeAudit
            })
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 获取已上传的代码的页面列表
       */
      getMaPage(){
        getMaPage(this.openAppId).then(response => {
          this.tableLoading = false
          this.maPages = response.data.data
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 上传小程序代码
       */
      commitCode(codeTemplate){
        codeTemplate.extJson = {
          extEnable: false
        }
        this.$confirm("小程序是否已经开通直播功能？", "提示", {
          confirmButtonText: "已经开通",
          cancelButtonText: "未开通",
          type: "warning"
        }).then(() => {
          codeTemplate.extJson = {
            extEnable: true,
            plugins : {
              "live-player-plugin" : {
                "version" : maLivePluginVersion,
                "provider" : maLivePluginProvider
              }
            }
          }
          this.commitCodePost(codeTemplate)
        }).catch(() => {
          this.commitCodePost(codeTemplate)
        })
      },
      commitCodePost(codeTemplate){
        codeTemplate.extJson = JSON.stringify(codeTemplate.extJson)
        console.log(codeTemplate)
        this.tableLoading = true
        commitCode(Object.assign(codeTemplate,{
          appId: this.openAppId
        })).then(response => {
          this.tableLoading = false
          this.$message({
            showClose: true,
            message: '小程序代码上传成功',
            type: 'success'
          })
          this.getCodeView(this.openAppId)
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 提交审核
       */
      submitCode(){
        this.$confirm("是否确认提交审核？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableLoading = true
          submitCode({
            appId: this.openAppId
          }).then(response => {
            this.tableLoading = false
            this.$message({
              showClose: true,
              message: '提交审核成功',
              type: 'success'
            })
            this.getCodeView(this.openAppId)
          }).catch(() => {
            this.tableLoading = false
          })
        })
      },

      /**
       * 审核撤回
       */
      undoCodeAudit(){
        this.$confirm("每天审核撤回次数最多不超过 5 次（每天的额度从0点开始生效），一个月不超过 10 次，是否确认撤回审核?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableLoading = true
          undoCodeAudit(this.openAppId).then(response => {
            this.tableLoading = false
            this.$message({
              showClose: true,
              message: '审核撤回成功',
              type: 'success'
            })
            this.getCodeView(this.openAppId)
          }).catch(() => {
            this.tableLoading = false
          })
        });
      },
      /**
       * 获取体验版二维码
       */
      getQrCode(){
        this.tableLoading = true
        getQrCode(this.openAppId).then(response => {
          this.tableLoading = false
          let qrCode = response.data.data
          this.$alert('<img style="width: 100%" src="data:image/jpg;base64,'+qrCode+'" />', '体验版二维码', {
            dangerouslyUseHTMLString: true
          })
        }).catch(() => {
          this.tableLoading = false
        })
      },
      /**
       * 获取截图示例
       */
      getScreenShot(mediaId){
        getScreenShot(this.openAppId, mediaId).then(response => {
          let screenShot = response.data.data
          this.$alert('<img style="width: 100%" src="data:image/jpg;base64,'+screenShot+'" />', '截图示例', {
            dangerouslyUseHTMLString: true
          })
        }).catch(() => {

        })
      },
      /**
       * 发布已通过审核的小程序
       */
      releaseCode(auditId){
        this.$confirm("是否确认发布版本?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.tableLoading = true
          releaseCode(this.openAppId,auditId).then(response => {
            this.tableLoading = false
            this.$message({
              showClose: true,
              message: '发布成功',
              type: 'success'
            })
            this.getCodeView(this.openAppId)
          }).catch(() => {
            this.getCodeView(this.openAppId)
            this.tableLoading = false
          })
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mag_left {
    margin-left: 10px
  }

  .expand-left {
    margin-left: 50px
  }

  .el-form-item {
    margin-bottom: 10px;
  }

  img {
    width: unset;
  }
</style>
