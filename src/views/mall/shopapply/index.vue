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
                 :before-open="beforeOpen"
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
                     @click="toApply()"
                     size="small"
                     icon="el-icon-link">入驻申请地址</el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button icon="el-icon-s-check"
                     size="small"
                     type="text"
                     v-if="permissions['mall:shopapply:verify'] && scope.row.status == '0'"
                     @click="openVerifyView(scope.row,scope.index)">审核
          </el-button>
        </template>
        <template slot="status" slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status == 0" size="small">审核中</el-tag>
            <el-tag v-if="scope.row.status == 1" size="small" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status == 2" size="small" type="danger">审核不通过</el-tag>
          </div>
        </template>
        <template slot="addressForm" slot-scope="scope">
          <div>
              <avue-input-map v-model="addressInfo" placeholder="请选择地图位置"  style="width:100%"></avue-input-map>
              <div v-show="form.address"><i class="el-icon-location"></i>{{form.address}}</div>
          </div>
        </template>
        <template slot="imgUrlForm" slot-scope="scope">
          <div>
            <MaterialList v-model="form.imgUrl" type="image" shopId="-1" :num=1 :width='100' :height=100></MaterialList>
            <p class="jl-tips-class">推荐尺寸100*100</p>
          </div>
        </template>
        <template slot="userAvatarForm" slot-scope="scope">
          <div>
            <MaterialList v-model="form.userAvatar" type="image" shopId="-1" :num=1 :width='100' :height=100></MaterialList>
            <p class="jl-tips-class">推荐尺寸100*100</p>
          </div>
        </template>
      </avue-crud>
      <el-dialog
        title="审核"
        :visible.sync="dialogShopApply"
        width="550px">
        <el-form :model="applyForm" :rules="applyRules" ref="applyForm" label-width="120px">
          <el-form-item label="审核状态" prop="status">
            <el-select v-model="applyForm.status" placeholder="请选择审核状态" style="width: 100%">
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核细节说明" prop="applyDetail">
            <el-input v-model="applyForm.applyDetail" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button icon="el-icon-check" size="small" type="primary" @click="submitForm('applyForm')" v-loading="tableLoading">提交</el-button>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj, verifyObj} from '@/api/mall/shopapply'
  import {tableOption} from '@/const/crud/mall/shopapply'
  import MaterialList from '@/components/material/list.vue'
  import {mapGetters, mapState} from 'vuex'
  import { getStore } from '@/util/store'

  export default {
    components: {
      MaterialList
    },
    name: 'shopapply',
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
        dialogShopApply: false,
        applyForm: {
          status: '',
          applyDetail: ''
        },
        applyRules: {
          status: [
            { required: true, message: '请选择审核状态', trigger: 'blur' }
          ],
          applyDetail: [

          ]
        },
        verifyRow: '',
        addressInfo: [],
      }
    },
    created() {
    },
    mounted: function () {
    },
    watch: {
      addressInfo: {
        deep: true,
        immediate: true,
        handler(newSkus, oldSkus) {
          this.form.address = newSkus[2]
        }
      }
    },
    computed: {
      ...mapGetters(['permissions']),
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      permissionList() {
        return {
          addBtn: this.permissions['mall:shopapply:add'] ? true : false,
          delBtn: this.permissions['mall:shopapply:del'] ? true : false,
          editBtn: this.permissions['mall:shopapply:edit'] ? true : false,
          viewBtn: this.permissions['mall:shopapply:get'] ? true : false
        };
      }
    },
    methods: {
      toApply(){
        let tenantId = this.userInfo.tenantId
        if(this.userInfo.type == '-1'){
          tenantId = getStore({ name: 'switchTenantId' })
        }
        window.open('#/mall/shop/shopapply/form?tenant_id='+tenantId, '_blank')
      },
      beforeOpen(done,type){
        window.openType = type
        window.tenantId = this.userInfo.tenantId
        if(type == 'add'){
          this.form.imgUrl = []
          this.form.userAvatar = []
        }else{
          this.form.userAvatar = [this.form.userAvatar]
          this.form.imgUrl = [this.form.imgUrl]
          this.addressInfo = [this.form.longitude, this.form.latitude, this.form.address]
        }
        done()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tableLoading = true
            verifyObj(Object.assign({
              id: this.verifyRow.id,
            },this.applyForm)).then(response => {
              this.tableLoading = false
              this.dialogShopApply = false
              this.$message({
                showClose: true,
                message: '审核成功',
                type: 'success'
              })
              this.getPage(this.page)
            }).catch(() => {
              this.tableLoading = false
            })
          } else {
            return false;
          }
        });
      },
      openVerifyView(row, index) {
        this.dialogShopApply = true
        this.verifyRow = row
      },
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
        this.tableLoading = true
        getPage(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page.descs,
          ascs: this.page.ascs,
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
        row.imgUrl = row.imgUrl.length > 0 ? row.imgUrl[0] : ''
        row.userAvatar = row.userAvatar.length > 0 ? row.userAvatar[0] : ''
        let addressInfo = this.addressInfo
        row.longitude = addressInfo[0]
        row.latitude = addressInfo[1]
        row.address = addressInfo[2]
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
        row.imgUrl = row.imgUrl.length > 0 ? row.imgUrl[0] : ''
        row.userAvatar = row.userAvatar.length > 0 ? row.userAvatar[0] : ''
        let addressInfo = this.addressInfo
        row.longitude = addressInfo[0]
        row.latitude = addressInfo[1]
        row.address = addressInfo[2]
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
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
