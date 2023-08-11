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
              <el-button type="success"
                         @click="getAliAuth()"
                         size="small"
                         icon="el-icon-s-promotion">生成授权二维码</el-button>
            </template>
          </avue-crud>
          <el-dialog
            title="用支付宝扫码完成授权"
            :visible.sync="dialogAliAuth"
            @close="authQrCodeClose"
            center
            append-to-body
            width="350px">
            <el-row>
              <el-col :span="24">
                <vue-qr :text="aliAuthQrCodeScene" :size="320" :dotScale = 1></vue-qr>
              </el-col>
              <el-col :span="24">
                <p style="color: black">也可在支付宝中打开以下链接完成授权</p>
                <p style="color: #8c939d">{{aliAuthQrCodeScene}}</p>
              </el-col>
            </el-row>
          </el-dialog>
        </basic-container>
    </div>
</template>

<script>
    import {tableOptionAli as tableOption} from '@/const/crud/payapi/payapplyform'
    import {getPage, getObj, addObj, putObj, delObj, subObj, statusObj} from '@/api/payapi/payapplyform'
    import {getByType as getPayConfig} from '@/api/payapi/payconfig'
    import {mapGetters} from 'vuex'

    export default {
        name: 'payapplyformali',
        props: {
          shopIdSelect : null
        },
        data() {
            return {
              form: {},
              tableData: [],
              page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20, // 每页显示多少条
                ascs: [],//升序字段
                descs: 'create_time'//降序字段
              },
              paramsSearch: {},
              tableLoading: false,
              tableOption: tableOption,
              dialogAliAuth: false,
              aliAuthQrCodeScene: '',
            }
        },
        created() {
        },
        mounted: function () {

        },
        computed: {
            ...mapGetters(['permissions']),
            permissionList() {
              return {
                addBtn: this.permissions['payapi:payapplyform:add'] ? true : false,
                delBtn: this.permissions['payapi:payapplyform:del'] ? true : false,
                editBtn: this.permissions['payapi:payapplyform:edit'] ? true : false,
                viewBtn: this.permissions['payapi:payapplyform:get'] ? true : false
              };
            }
        },
        methods: {
          searchChange(params, done) {
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
            if(this.shopIdSelect){
              this.tableLoading = true
              getPage(Object.assign({
                current: page.currentPage,
                size: page.pageSize,
                descs: this.page.descs,
                ascs: this.page.ascs,
                shopId: this.shopIdSelect,
                payType: '2'
              }, params, this.paramsSearch)).then(response => {
                this.tableData = response.data.data.records
                this.page.total = response.data.data.total
                this.page.currentPage = page.currentPage
                this.page.pageSize = page.pageSize
                this.tableLoading = false
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
            putObj(row).then(response => {
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
            row.payType =  '1'
            addObj(row).then(response => {
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
          //获取支付宝第三方应用授权url
          getAliAuth(row, index){
            this.tableLoading = true
            getPayConfig("2").then(response => {
              this.tableLoading = false
              let payConfig = response.data.data
              if(payConfig == null){
                this.$message({
                  showClose: true,
                  message: '请先配置好支付宝收款信息',
                  type: 'error'
                })
              }else{
                let redirectUri = encodeURIComponent('http://'+window.location.host+'/payapi/aliopenauth/redirect')
                let authUrl = 'https://openauth.alipay.com/oauth2/appToAppAuth.htm?app_id='+payConfig.appId+'&state='+this.shopIdSelect+'&redirect_uri='+redirectUri
                this.dialogAliAuth = true
                this.aliAuthQrCodeScene = authUrl
              }
            })
          },
          authQrCodeClose(){
            this.getPage(this.page)
          }
        }
    }
</script>

<style lang="scss" scoped>

</style>
