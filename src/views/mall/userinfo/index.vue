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
      <el-tabs v-model="appType" type="card" @tab-click="handleClickAppType">
        <el-tab-pane name="-1">
          <span slot="label"><i class="el-icon-s-order"></i> 全部</span>
        </el-tab-pane>
        <el-tab-pane name="MA">
          <span slot="label"><i class="el-icon-paperclip"></i> 小程序</span>
        </el-tab-pane>
        <el-tab-pane name="H5-WX">
          <span slot="label"><i class="el-icon-menu"></i> 公众号</span>
        </el-tab-pane>
        <el-tab-pane name="APP">
          <span slot="label"><i class="el-icon-mobile-phone"></i> APP</span>
        </el-tab-pane>
        <el-tab-pane name="H5-PC">
          <span slot="label"><i class="el-icon-monitor"></i> PC端H5</span>
        </el-tab-pane>
        <el-tab-pane name="H5">
          <span slot="label"><i class="el-icon-document-copy"></i> 移动端H5</span>
        </el-tab-pane>
      </el-tabs>
      <avue-crud ref="crud"
                 v-model="form"
                 :before-open="showUserOnline"
                 :page.sync="page"
                 :data="tableData"
                 :permission="permissionList"
                 :table-loading="tableLoading"
                 :option="tableOption"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange">
        <template slot="menu" slot-scope="scope">
          <el-button type="text"
                     v-if="permissions['mall:userinfo:get']"
                     icon="el-icon-view"
                     size="small"
                     plain
                     @click="showUserRecord(scope.row)">明细详情</el-button>
        </template>
        <template slot-scope="scope" slot="headimgUrl">
          <el-image
            v-if="scope.row.headimgUrl"
            style="width: 50px;height: 50px"
            :src="scope.row.headimgUrl"
            fit="contain"
            :preview-src-list="[scope.row.headimgUrl]"></el-image>
        </template>
        <template slot-scope="scope" slot="pointsCurrent">
          <i class="el-icon-medal" style="color: red">{{scope.row.pointsCurrent}}</i>
        </template>
        <template slot-scope="scope" slot="parentId">
          <div v-if="scope.row.parentUserInfo">
            <el-row>
              <el-col :span="8" style="text-align: right">
                <el-image :src="scope.row.parentUserInfo.headimgUrl" style="width: 50px">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </el-col>
              <el-col :span="16" style="text-align: left; padding-left: 10px">
                <div>昵称：{{scope.row.parentUserInfo.nickName ? scope.row.parentUserInfo.nickName : '匿名'}}</div>
                <div>编号：{{scope.row.parentUserInfo.userCode}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align: center">
                <el-button type="danger" icon="el-icon-delete" v-if="permissions['mall:userinfo:edit']" circle size="mini" @click="delParentId(scope.row)"></el-button>
              </el-col>
            </el-row>
          </div>
          <div v-if="!scope.row.parentUserInfo">
            <el-button type="primary" icon="el-icon-plus" v-if="permissions['mall:userinfo:edit']" circle size="mini" @click="addParentId(scope.row)"></el-button>
          </div>
        </template>
        <template slot-scope="scope" slot="distributionUser">
          <div v-if="scope.row.distributionUser">是</div>
          <div v-if="!scope.row.distributionUser">否</div>
        </template>
        <template slot-scope="{type,disabled}" slot="lastOnlineTimeForm">
          <div v-if="type=='view'">
            <el-tag v-for="item in userOnlineData" :key="item.key">{{item.title}} {{item.lastOnlineTime}}</el-tag>
          </div>
        </template>
      </avue-crud>
      <el-dialog
        title="用户明细记录"
        :visible.sync="dialogVisibleRecord"
        width="85%">
        <el-row :span="24" :gutter="10">
          <el-col :span="4" style="text-align: center">
            <el-image :src="selectUser.headimgUrl" class="jl-img-width"></el-image><br>
            <div style="margin: 5px;">{{selectUser.nickName}}</div>
            <div style="margin: 5px;">用户编码：{{selectUser.userCode}}</div>
          </el-col>
          <el-col :span="20">
            <el-row :span="24">
              <el-col :span="8">当前积分：<span style="font-size: 24px;font-weight: bold;">{{selectUser.pointsCurrent}}</span></el-col>
              <el-col :span="8">总计订单数：<span style="font-size: 24px;font-weight: bold;">{{userRecord.totalOrder}}</span></el-col>
              <el-col :span="8">总消费金额：<span style="font-size: 24px;font-weight: bold;">{{userRecord.totalAmount}}</span></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="10">
          <el-col :xs="24"
                  :sm="24"
                  :md="3">
            <el-menu
              :default-active="menuActive"
              class="el-menu-vertical"
              @select="menuSelect">
              <el-menu-item index="1">
                <i class="el-icon-medal"></i>
                <span slot="title">积分明细</span>
              </el-menu-item>
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
            <div class="display-crud" :style="menuActive == '1'?'display:block':''">
              <avue-crud ref="crud2"
                         :page.sync="page2"
                         :data="tableData2"
                         :table-loading="tableLoading2"
                         :option="tableOption2"
                         @on-load="getPage2"
                         :cell-style="cellStyle">
              </avue-crud>
            </div>
            <div class="display-crud" :style="menuActive == '2'?'display:block':''">
              <avue-crud
                ref="crud3"
                :page.sync="page3"
                :data="tableData3"
                :table-loading="tableLoading3"
                :option="tableOption3"
                @search-change="searchChange3"
                @on-load="getPage3"
                @date-change="dateChange3">
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
  import {getPage, getObj, addObj, putObj, delObj, editParentId} from '@/api/mall/userinfo'
  import {getObj as getUserRecord} from '@/api/mall/userrecord'
  import {tableOption} from '@/const/crud/mall/userinfo'
  import {tableOption2 as tableOption2} from '@/const/crud/mall/pointsrecord'
  import {tableOption2 as tableOption3} from '@/const/crud/mall/orderinfo'
  import {tableOption2 as tableOption4} from '@/const/crud/mall/couponuser'
  import {getPage as getPage4} from '@/api/mall/couponuser'
  import {getPage as getPage3} from '@/api/mall/orderinfo'
  import {getPage as getPage2} from '@/api/mall/pointsrecord'
  import { getCountByUserId } from '@/api/mall/useronline'
  import {mapGetters} from 'vuex'
  import constantMall from "@/const/constantMall";

  export default {
    name: 'userinfo',
    data() {
      return {
        form:{},
        userOnlineData: [],
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
        page2: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 10, // 每页显示多少条
          ascs: [],//升序字段
          descs: 'create_time'//降序字段
        },
        tableData2: [],
        tableLoading2: false,
        tableOption2: tableOption2,
        paramsSearch2: {},
        date3: [],
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
        menuActive: '1',
        selectUser: '',
        userRecord: {},
        appType: '-1'
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
          addBtn: this.permissions['mall:userinfo:add'] ? true : false,
          delBtn: this.permissions['mall:userinfo:del'] ? true : false,
          editBtn: this.permissions['mall:userinfo:edit'] ? true : false,
          viewBtn: this.permissions['mall:userinfo:get'] ? true : false
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
          appType: this.appType != '-1' ? this.appType : null,
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
        var _this = this
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
        addObj(row).then(data => {
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
        if(this.menuActive == '1'){
          this.page2.currentPage = 1
          this.getPage2(this.page2)
        }
        if(this.menuActive == '2'){
          this.page3.currentPage = 1
          this.getPage3(this.page3)
        }
        if(this.menuActive == '3'){
          this.page4.currentPage = 1
          this.getPage4(this.page4)
        }
      },
      cellStyle({row, column, rowIndex, columnIndex}) {
        if (columnIndex == 0) {
          if (row.amount > 0) {
            return {
              color: 'green',
              fontWeight: 'bold',
              fontSize: '20'
            }
          } else {
            return {
              color: 'red',
              fontWeight: 'bold',
              fontSize: '20'
            }
          }
        }
      },

      // 用户登录时间查看
      showUserOnline(done,type) {
        let userId = this.form.id
        this.userOnlineData = []
        if(userId){
          for (const clientType in constantMall.clientType) {
            getCountByUserId(clientType, userId).then(response => {
              if(response.data.data){
                this.userOnlineData.push({
                  ...constantMall.clientType[clientType],
                  name: constantMall.clientType[clientType].title,
                  key: clientType,
                  lastOnlineTime: this.$moment(response.data.data).format('YYYY-MM-DD HH:mm:ss')
                })
              }
            }).catch(() => {})
          }
        }
        done();
      },
      showUserRecord(user) {
        this.userRecord = {}
        this.tableData2 = []
        this.menuActive = '1'
        this.selectUser = user
        this.dialogVisibleRecord = true
        this.getUserRecord(user.id)
        this.getPage2(this.page2)
      },
      getUserRecord(userId){
        getUserRecord(userId).then(response => {
          this.userRecord = response.data.data
        }).catch(() => {

        })
      },
      getPage2(page2, params) {
        if (this.selectUser.id) {
          this.tableLoading2 = true
          getPage2(Object.assign({
            current: page2.currentPage,
            size: page2.pageSize,
            descs: this.page2.descs,
            ascs: this.page2.ascs,
            userId: this.selectUser.id
          }, params)).then(response => {
            this.tableData2 = response.data.data.records
            this.page2.total = response.data.data.total
            this.page2.currentPage = page2.currentPage
            this.page2.pageSize = page2.pageSize
            this.tableLoading2 = false
          }).catch(() => {
            this.tableLoading2 = false
          })
        }
      },
      getPage3(page3, params) {
        if (this.selectUser.id) {
          this.tableLoading3 = true
          getPage3(Object.assign({
            current: page3.currentPage,
            size: page3.pageSize,
            descs: this.page3.descs,
            ascs: this.page3.ascs,
            userId: this.selectUser.id,
            beginTime: this.date3[0],
            endTime: this.date3[1]
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
      dateChange3(date){
        if(date){
          this.date3 = date
        }else{
          this.date3 = []
        }
        this.getPage3(this.page3)
      },
      getPage4(page4, params) {
        if (this.selectUser.id) {
          this.tableLoading4 = true
          getPage4(Object.assign({
            current: page4.currentPage,
            size: page4.pageSize,
            descs: this.page4.descs,
            ascs: this.page4.ascs,
            userId: this.selectUser.id
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
      //删除上级
      delParentId(row){
        let _this = this
        this.$confirm('是否确认删除此用户上级', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this.tableLoading = true
          editParentId({
            parentId: '',
            id: row.id
          }).then(data => {
            _this.$message({
              showClose: true,
              message: '删除上级成功',
              type: 'success'
            })
            _this.tableLoading = false
            _this.getPage(_this.page)
          }).catch(() => {
            _this.tableLoading = false
          })
        })
      },
      //添加用户上级
      addParentId(row){
        let _this = this
        _this.$prompt('请输入用户编码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\S]/,
          inputErrorMessage: '用户编码不能为空'
        }).then(({ value }) => {
          if(value == row.userCode){
            _this.$message({
              showClose: true,
              message: '不能将自己设为上级',
              type: 'error'
            })
          }else{
            _this.tableLoading = true
            getPage({
              userCode: value
            }).then(response => {
              _this.tableLoading = false
              let data = response.data.data.records
              if(data.length > 0){
                _this.$confirm('将【'+data[0].nickName+'】设为上级, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  _this.tableLoading = true
                  editParentId({
                    parentId: data[0].id,
                    id: row.id
                  }).then(data => {
                    _this.$message({
                      showClose: true,
                      message: '添加上级成功',
                      type: 'success'
                    })
                    _this.tableLoading = false
                    _this.getPage(_this.page)
                  }).catch(() => {
                    _this.tableLoading = false
                  })
                }).catch(() => {
                  _this.tableLoading = false
                });
              }else{
                _this.$message({
                  showClose: true,
                  message: '上级用户不存在',
                  type: 'error'
                })
                _this.tableLoading = false
              }
            }).catch(() => {
              _this.tableLoading = false
            })
          }
        }).catch(() => {

        });
      },
      handleClickAppType(tab, event) {
        this.appType = tab.name
        this.page.currentPage = 1
        this.getPage(this.page)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .display-crud{display: none}
</style>
