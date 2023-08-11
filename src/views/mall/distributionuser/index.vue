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
                 :page="page"
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
        <template slot-scope="scope" slot="menuLeft">
          <el-button icon="el-icon-plus" size="small" type="primary" @click="selectUser()">新增分销员</el-button>
        </template>
        <template slot-scope="scope" slot="menu">
          <el-button icon="el-icon-s-custom" size="small" type="text" @click="showPromoters(scope.row,scope.index)">推广人</el-button>
          <el-button icon="el-icon-s-order" size="small" type="text" @click="showDistributionOrder(scope.row,scope.index)">推广订单</el-button>
        </template>
        <template slot-scope="scope" slot="userId">
          <el-row v-if="scope.row.userInfo">
            <el-col :span="8" style="text-align: right">
              <el-image :src="scope.row.userInfo.headimgUrl" style="width: 50px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-col>
            <el-col :span="16" style="text-align: left; padding-left: 10px">
              <div>昵称：{{scope.row.userInfo.nickName ? scope.row.userInfo.nickName : '匿名'}}</div>
              <div>编号：{{scope.row.userInfo.userCode}}</div>
              <div>电话：{{scope.row.userInfo.phone}}</div>
            </el-col>
          </el-row>
        </template>
      </avue-crud>
      <el-dialog
        title="推广人列表"
        :visible.sync="dialogVisiblePromoters"
        width="60%">
        <div style="text-align: center;margin-bottom: 20px">
          <el-radio-group v-model="promotGrade" size="mini" @change="promotGradeChange">
            <el-radio-button label="1">一级推广人</el-radio-button>
            <el-radio-button label="2">二级推广人</el-radio-button>
          </el-radio-group>
        </div>
        <avue-crud ref="crud2"
                   :page.sync="page2"
                   :data="tableData2"
                   :table-loading="tableLoading2"
                   :option="tableOption2"
                   @search-change="searchChange2">
          <template slot-scope="scope" slot="userId">
            <el-row>
              <el-col :span="8" style="text-align: right">
                <el-image :src="scope.row.headimgUrl" style="width: 50px">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="16" style="text-align: left; padding-left: 10px">
                <div>昵称：{{scope.row.nickName ? scope.row.nickName : '匿名'}}</div>
                <div>编号：{{scope.row.userCode}}</div>
                <div>电话：{{scope.row.phone}}</div>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope" slot="distributionUser">
            <div v-if="scope.row.distributionUser">是</div>
            <div v-if="!scope.row.distributionUser">否</div>
          </template>
          <template slot-scope="scope" slot="commissionTotal">
            <div v-if="scope.row.distributionUser">{{scope.row.distributionUser.commissionTotal}}</div>
          </template>
        </avue-crud>
      </el-dialog>
      <el-dialog
        title="推广订单列表"
        :visible.sync="dialogVisibleDistributionOrder"
        width="60%">
        <div style="text-align: center;margin-bottom: 20px">
          <el-radio-group v-model="orderGrade" size="mini" @change="orderGradeChange">
            <el-radio-button label="1">一级推广订单</el-radio-button>
            <el-radio-button label="2">二级推广订单</el-radio-button>
          </el-radio-group>
        </div>
        <avue-crud ref="crud3"
                   :page.sync="page3"
                   :data="tableData3"
                   :table-loading="tableLoading3"
                   :option="tableOption3"
                   @search-change="searchChange3"
                   @date-change="dateChange3"
                   @row-update="handleUpdate3">
          <template slot-scope="scope" slot="userId">
            <el-row v-if="scope.row.userInfo">
              <el-col :span="8" style="text-align: right">
                <el-image :src="scope.row.userInfo.headimgUrl" style="width: 50px">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="16" style="text-align: left; padding-left: 10px">
                <div>昵称：{{scope.row.userInfo.nickName ? scope.row.userInfo.nickName : '匿名'}}</div>
                <div>编号：{{scope.row.userInfo.userCode}}</div>
                <div>电话：{{scope.row.userInfo.phone}}</div>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="scope" slot="orderId">
            <div>{{scope.row.orderInfo.orderNo}}</div>
          </template>
        </avue-crud>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/distributionuser'
  import {getPage as getPage2} from '@/api/mall/userinfo'
  import {getPage as getPage3, putObj as putObj3} from '@/api/mall/distributionorder'
  import {tableOption} from '@/const/crud/mall/distributionuser'
  import {tableOption2 as tableOption2} from '@/const/crud/mall/userinfo'
  import {tableOption2 as tableOption3} from '@/const/crud/mall/distributionorder'
  import {mapGetters} from 'vuex'

  export default {
    name: 'distributionuser',
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
        selectedDistributionUser: {},
        dialogVisiblePromoters: false,
        promotGrade: '1',
        form2: {},
        tableData2: [],
        page2: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        paramsSearch2: {},
        tableLoading2: false,
        tableOption2: tableOption2,
        dialogVisibleDistributionOrder: false,
        orderGrade: '1',
        form3: {},
        tableData3: [],
        page3: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        paramsSearch3: {},
        tableLoading3: false,
        tableOption3: tableOption3,
        date3: []
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
          addBtn: this.permissions['mall:distributionuser:add'] ? true : false,
          delBtn: this.permissions['mall:distributionuser:del'] ? true : false,
          editBtn: this.permissions['mall:distributionuser:edit'] ? true : false,
          viewBtn: this.permissions['mall:distributionuser:get'] ? true : false
        };
      }
    },
    methods: {
      selectUser(){
        let _this = this
        _this.$prompt('请输入用户编码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\S]/,
          inputErrorMessage: '用户编码不能为空'
        }).then(({ value }) => {
          _this.tableLoading = true
          getPage2({
            userCode: value
          }).then(response => {
            _this.tableLoading = false
            let data = response.data.data.records
            if(data.length > 0){
              _this.tableLoading = true
              //判断是否已经是分销员
              getPage({
                userId: data[0].id
              }).then(response2 => {
                let data2 = response2.data.data.records
                if(data2.length > 0){
                  _this.$message({
                    showClose: true,
                    message: '该用户已经是分销员',
                    type: 'error'
                  })
                  _this.tableLoading = false
                }else{
                  _this.$confirm('将【'+data[0].nickName+'】设为分销员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    let userId = data[0].id
                    addObj({userId: userId}).then(response => {
                      _this.$message({
                        showClose: true,
                        message: '添加成功',
                        type: 'success'
                      })
                      _this.getPage(_this.page)
                      _this.tableLoading = false
                    }).catch(() => {
                      _this.tableLoading = false
                    });
                  }).catch(() => {
                    _this.tableLoading = false
                  });
                }
              }).catch(() => {
                _this.tableLthisoading = false
              })
            }else{
              _this.$message({
                showClose: true,
                message: '用户不存在',
                type: 'error'
              })
              _this.tableLoading = false
            }
          }).catch(() => {
            _this.tableLoading = false
          })
        }).catch(() => {

        });
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
          return delObj(row.userId)
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
      /**
       * 展示推广人
       */
      showPromoters(row,index){
        this.selectedDistributionUser = row
        this.promotGrade = '1',
        this.tableData2 = [],
        this.dialogVisiblePromoters = true
        this.getPage2(this.page2)
      },
      getPage2(page, params) {
        this.tableLoading2 = true
        if('1' == this.promotGrade){
          params =  Object.assign({
            parentId: this.selectedDistributionUser.userId
          }, params)
        }
        if('2' == this.promotGrade){
          params =  Object.assign({
            parentSecondId: this.selectedDistributionUser.userId
          }, params)
        }
        getPage2(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page2.descs,
          ascs: this.page2.ascs,
        }, params, this.paramsSearch2)).then(response => {
          this.tableData2 = response.data.data.records
          this.page2.total = response.data.data.total
          this.page2.currentPage = page.currentPage
          this.page2.pageSize = page.pageSize
          this.tableLoading2 = false
        }).catch(() => {
          this.tableLoading2 = false
        })
      },
      searchChange2(params, done) {
        params = this.filterForm(params)
        this.paramsSearch2 = params
        this.page2.currentPage = 1
        this.getPage2(this.page2, params)
        done()
      },
      promotGradeChange(value){
        this.promotGrade = value
        this.getPage2(this.page2)
      },
      /**
       * 展示推广订单
       * @param row
       * @param index
       */
      showDistributionOrder(row,index){
        this.selectedDistributionUser = row
        this.orderGrade = '1',
        this.tableData3 = [],
        this.dialogVisibleDistributionOrder = true
        this.getPage3(this.page3)
      },
      getPage3(page, params) {
        this.tableLoading3 = true
        getPage3(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page3.descs,
          ascs: this.page3.ascs,
          distributionUserId: this.selectedDistributionUser.userId,
          distributionLevel: this.orderGrade,
          beginTime: this.date3[0],
          endTime: this.date3[1]
        }, params, this.paramsSearch3)).then(response => {
          this.tableData3 = response.data.data.records
          this.page3.total = response.data.data.total
          this.page3.currentPage = page.currentPage
          this.page3.pageSize = page.pageSize
          this.tableLoading3 = false
        }).catch(() => {
          this.tableLoading3 = false
        })
      },
      searchChange3(params, done) {
        params = this.filterForm(params)
        this.paramsSearch3 = params
        this.page3.currentPage = 1
        this.getPage3(this.page3, params)
        done()
      },
      orderGradeChange(value){
        this.orderGrade = value
        this.getPage3(this.page3)
      },
      dateChange3(date){
        if(date){
          this.date3 = date
        }else{
          this.date3 = []
        }
        this.getPage3(this.page3)
      },
      handleUpdate3: function (row, index, done, loading) {
        putObj3(row).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          done()
          this.getPage3(this.page3)
        }).catch(() => {
          loading()
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
</style>
