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
        <template slot-scope="scope" slot="expand">
          <el-row type="flex" justify="center" v-if="scope.row.userInfo">
            <el-col :span="6">
              <div>手机号：{{scope.row.userInfo.phone}}</div>
              <div>商城用户编号：{{scope.row.userInfo.userCode}}</div>
            </el-col>
            <el-col :span="6">
              <div>省份：{{scope.row.userInfo.province}}</div>
              <div>城市：{{scope.row.userInfo.city}}</div>
            </el-col>
            <el-col :span="6">
              <div>性别：{{scope.row.userInfo.sex == '1' ? '男' : scope.row.userInfo.sex == '2' ? '女' : '未知'}}</div>
<!--              <div>国家：{{scope.row.userInfo.country}}</div>-->
            </el-col>
          </el-row>
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button type="text"
                     v-if="permissions['mall:usershop:get']"
                     icon="el-icon-view"
                     size="small"
                     plain
                     @click="showUserRecord(scope.row.userInfo.id,scope.row.shopId)">明细详情</el-button>
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
              <div>{{scope.row.userInfo.nickName ? scope.row.userInfo.nickName : '匿名'}}</div>
            </el-col>
          </el-row>
        </template>
      </avue-crud>
      <el-dialog
        title="用户明细记录"
        :visible.sync="dialogVisibleRecord"
        width="85%">
        <el-row :span="24" :gutter="10">
          <el-col :xs="24"
                  :sm="24"
                  :md="3">
            <el-menu
              :default-active="menuActive"
              class="el-menu-vertical"
              @select="menuSelect">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">消费记录</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-s-ticket"></i>
                <span slot="title">领券记录</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :xs="24"
                  :sm="24"
                  :md="21">
            <div class="display-crud" :style="menuActive == '2'?'display:block':''">
              <avue-crud
                ref="crud3"
                :page.sync="page3"
                :data="tableData3"
                :table-loading="tableLoading3"
                :option="tableOption3"
                @search-change="searchChange3"
                @on-load="getPage3">
                <template slot-scope="scope" slot="name">
                  <el-row :gutter="10" v-for="(item, index) in scope.row.listOrderItem" :key="index"
                          style="border:1px solid #eaeaea;padding: 5px">
                    <el-col :span="3">
                      <img :src="item.picUrl" width="100%"/>
                    </el-col>
                    <el-col :span="13" style="text-align: left">
                      <div class="spu-name"><el-tag type="danger" v-if="scope.row.orderType != '0'">{{scope.row.orderType == '1' ? '砍价' : scope.row.orderType == '2' ? '拼团' : scope.row.orderType == '3' ? '秒杀' : ''}}</el-tag> {{item.spuName}}</div>
                      <div class="spec-info">{{item.specInfo}}</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content" style="color:red;">￥{{item.paymentPrice}}{{item.paymentCouponPrice ? ' + 优惠券￥'+item.paymentCouponPrice : ''}}{{item.paymentPoints ? ' + 积分'+item.paymentPoints : ''}}</div>
                      <div class="grid-content">×{{item.quantity}}件</div>
                      <div class="grid-content" v-if="item.status != '0'">
                        <el-tag type="danger" @click="handleOrderItemStatus(item)">{{item.statusDesc}}</el-tag>
                      </div>
                      <div class="grid-content" v-if="item.status == '0' && scope.row.isPay == '0' && !scope.row.status">
                        <el-tag type="danger" @click="handleEditPrice(item)">改价</el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </template>
                <template slot-scope="scope" slot="createTime">
                  <div>
                    <div class="grid-content">{{scope.row.createTime}}</div>
                    <div class="grid-content">{{scope.row.orderNo}}</div>
                  </div>
                </template>
                <template slot-scope="scope" slot="salesPrice">
                  <div style="text-align: left">
                    <div class="grid-content">订单金额：￥{{scope.row.salesPrice}}</div>
                    <div class="grid-content">运费金额：+ ￥{{scope.row.freightPrice}}</div>
                    <div class="grid-content">优惠券抵扣金额：- ￥{{scope.row.paymentCouponPrice}}</div>
                    <div class="grid-content">积分抵扣金额：- ￥{{scope.row.paymentPointsPrice}}</div>
                    <div class="grid-content" style="color: red">支付金额：￥{{scope.row.paymentPrice}}</div>
                    <div class="grid-content" style="color: red">支付积分：{{scope.row.paymentPoints}}</div>
                  </div>
                </template>
                <template slot-scope="scope" slot="status">
                  <div style="text-align: left">
                    <div class="grid-content">订单状态：
                      <el-tag :type="scope.row.status=='2' ||scope.row.status=='3' || scope.row.status=='4' ? 'success' : 'danger'"
                              effect="dark" size="mini"> {{ scope.row.statusDesc}}
                      </el-tag>
                    </div>
                    <div class="grid-content">支付状态：
                      <el-tag :type="scope.row.isPay=='1' ? 'success' : 'danger'"
                              effect="dark" size="mini">{{scope.row.isPay == '1' ? '已支付' : '未支付'}}
                      </el-tag>
                    </div>
                    <div class="grid-content" v-if="scope.row.appraisesStatus">评价状态：
                      <el-tag :type="scope.row.appraisesStatus != '0' ? 'success' : 'danger'"
                              effect="dark" size="mini">{{scope.row.appraisesStatus == '0' ? '未评价' :
                        scope.row.appraisesStatus == '1' ? '已评价' : scope.row.appraisesStatus == '2' ? '已追评' :
                        ''}}
                      </el-tag>
                    </div>
                  </div>
                </template>
              </avue-crud>
            </div>
            <div class="display-crud" :style="menuActive == '3'?'display:block':''">
              <avue-crud ref="crud4"
                         :page.sync="page4"
                         :data="tableData4"
                         :table-loading="tableLoading4"
                         :option="tableOption4"
                         @search-change="searchChange4"
                         @on-load="getPage4">
                <template slot-scope="scope" slot="couponId">
                  <div>{{scope.row.type == '1' ? '代金券' : scope.row.type == '2' ? '折扣券' : ''}}</div>
                  <div>{{scope.row.name}}</div>
                  <div>订单满{{scope.row.premiseAmount}}元可使用</div>
                </template>
                <template slot-scope="scope" slot="validEndTime">
                  <div>
                    {{scope.row.validBeginTime}}
                  </div>
                  <div>
                    至{{scope.row.validEndTime}}
                  </div>
                </template>
              </avue-crud>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/usershop'
  import {tableOption} from '@/const/crud/mall/usershop'
  import {tableOption3 as tableOption3} from '@/const/crud/mall/orderinfo'
  import {tableOption3 as tableOption4} from '@/const/crud/mall/couponuser'
  import {getPage as getPage4} from '@/api/mall/couponuser'
  import {getPage as getPage3} from '@/api/mall/orderinfo'
  import {mapGetters} from 'vuex'

  export default {
    name: 'usershop',
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
        dialogVisibleRecord: false,
        page3: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        tableData3: [],
        tableLoading3: false,
        tableOption3: tableOption3,
        paramsSearch3: {},
        page4: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        tableData4: [],
        tableLoading4: false,
        tableOption4: tableOption4,
        paramsSearch4: {},
        menuActive: '2',
        selectUserId: '',
        selectShopId: ''
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
          addBtn: this.permissions['mall:usershop:add'] ? true : false,
          delBtn: this.permissions['mall:usershop:del'] ? true : false,
          editBtn: this.permissions['mall:usershop:edit'] ? true : false,
          viewBtn: this.permissions['mall:usershop:get'] ? true : false
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
      menuSelect(key, keyPath) {
        this.menuActive = key
        if(this.menuActive == '2'){
          this.page3.currentPage = 1
          this.getPage3(this.page3)
        }
        if(this.menuActive == '3'){
          this.page4.currentPage = 1
          this.getPage4(this.page4)
        }
      },
      showUserRecord(userId,shopId) {
        this.tableData3 = []
        this.menuActive = '2'
        this.selectUserId = userId
        this.selectShopId = shopId
        this.dialogVisibleRecord = true
        this.getPage3(this.page3)
      },
      getPage3(page3, params) {
        if (this.selectUserId) {
          this.tableLoading3 = true
          getPage3(Object.assign({
            current: page3.currentPage,
            size: page3.pageSize,
            descs: this.page3.descs,
            ascs: this.page3.ascs,
            userId: this.selectUserId,
            shopId: this.selectShopId
          }, params)).then(response => {
            this.tableData3 = response.data.data.records
            this.page3.total = response.data.data.total
            this.page3.currentPage = page3.currentPage
            this.page3.pageSize = page3.pageSize
            this.tableLoading3 = false
          }).catch(() => {
            this.tableLoading3 = false
          })
        }
      },
      getPage4(page4, params) {
        if (this.selectUserId) {
          this.tableLoading4 = true
          getPage4(Object.assign({
            current: page4.currentPage,
            size: page4.pageSize,
            descs: this.page4.descs,
            ascs: this.page4.ascs,
            userId: this.selectUserId,
            shopId: this.selectShopId
          }, params)).then(response => {
            this.tableData4 = response.data.data.records
            this.page4.total = response.data.data.total
            this.page4.currentPage = page4.currentPage
            this.page4.pageSize = page4.pageSize
            this.tableLoading4 = false
          }).catch(() => {
            this.tableLoading4 = false
          })
        }
      },
      searchChange3(params, done) {
        params = this.filterForm(params)
        this.paramsSearch3 = params
        this.page3.currentPage = 1
        this.getPage3(this.page3, params)
        done()
      },
      searchChange4(params, done) {
        params = this.filterForm(params)
        this.paramsSearch4 = params
        this.page4.currentPage = 1
        this.getPage4(this.page4, params)
        done()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .display-crud{display: none}
</style>
