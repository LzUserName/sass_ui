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
                 :before-open="beforeOpen"
                 v-model="form"
                 @on-load="getPage"
                 @refresh-change="refreshChange"
                 @row-update="handleUpdate"
                 @row-save="handleSave"
                 @row-del="handleDel"
                 @sort-change="sortChange"
                 @search-change="searchChange">
        <template slot="enable" slot-scope="scope">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeEnable(scope.row)">
          </el-switch>
        </template>
        <template slot="picUrlForm"
                  slot-scope="scope">
          <MaterialList v-model="form.picUrl" type="image" :num=1 shopId="-1" :width='form.parentId == "0" ? 300 : 150'
                        :height=150></MaterialList>
          <P>推荐尺寸：350px*350px或同比例尺寸图片</P>
        </template>
        <template slot="picUrl" slot-scope="scope">
          <img style="height: 100px"
               :src="scope.row.picUrl">
        </template>
        <template slot="listActiveBorderRelationForm" slot-scope="scope">
          <div>
            <el-button size="mini" icon="el-icon-plus" type="primary" @click="showGoodsList()" v-if="form.suitType == '2'">选择商品
            </el-button>
            <el-row :gutter="4" v-if="form.suitType == '2'">
              <el-col :span="3" v-for="(item, index) in form.listActiveBorderRelation" :key="item.id">
                <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.picUrls[0]" class="image">
                  <div style="padding: 4px;">
                    <el-tooltip effect="dark" :content="item.name" placement="top-start">
                      <span class="overflow_1" style="font-size: 10px">{{ item.name }}</span>
                    </el-tooltip>
                    <div class="bottom clearfix">
                      <el-button type="text" class="button" size="mini" round @click="removeRelation(index)"
                                 style="color: red">移除
                      </el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-cascader v-model="form.listActiveBorderRelation" :options="treeGoodsCategory"
                         :props="{multiple: true, emitPath:false, value:'id', label:'name'}"  :show-all-levels="false" placeholder="请选择分类" v-if="form.suitType == '3'"></el-cascader>
            <el-select v-model="form.listActiveBorderRelation" multiple placeholder="请选择店铺" v-if="form.suitType == '4'">
              <el-option
                v-for="item in listShopInfo"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </template>
      </avue-crud>
      <el-dialog title="请选择商品" :visible.sync="dialogVisibleGoods" width="90%" top="20px">
        <avue-crud ref="crud"
                   v-model="form2"
                   :page.sync="page2"
                   :data="tableData2"
                   :table-loading="tableLoading2"
                   :option="tableOption2"
                   @on-load="getPage2"
                   @refresh-change="refreshChange2"
                   @sort-change="sortChange2"
                   @search-change="searchChange2"
                   @selection-change="selectionChange2">
          <template slot="picUrls" slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.picUrls[0]"
              :preview-src-list="scope.row.picUrls">
            </el-image>
          </template>
          <template slot="price" slot-scope="scope">
            <div style="color: red">￥{{ scope.row.priceDown }}{{
              scope.row.priceUp == scope.row.priceDown ? '' : '~￥' +
              scope.row.priceUp
              }}
            </div>
          </template>
        </avue-crud>
        <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleGoods = false">取 消</el-button>
                  <el-button type="primary" @click="subGoods">确 定</el-button>
                </span>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/activeborder'
  import {getPage as getPage2} from '@/api/mall/goodsspu'
  import {fetchTree as getTreeGoodsCategory} from '@/api/mall/goodscategory'
  import {getList as getListShopInfo} from '@/api/mall/shopinfo'
  import {tableOption} from '@/const/crud/mall/activeborder'
  import {tableOption2} from '@/const/crud/mall/goodsspu'
  import MaterialList from '@/components/material/list.vue'
  import {mapGetters} from 'vuex'
  import {unique} from "@/util/util"

  export default {
    components: {
      MaterialList
    },
    name: 'activeborder',
    data() {
      return {
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
        dialogVisibleGoods: false,
        listShopInfo: [],
        treeGoodsCategory: [],
        form2: {},
        tableData2: [],
        page2: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20, // 每页显示多少条
          ascs: [],//升序字段
          descs: []//降序字段
        },
        paramsSearch2: {},
        tableLoading2: false,
        tableOption2: tableOption2,
        selectionActiveBorderRelation: []
      }
    },
    watch: {
      'form.suitType'() {
        this.form.listActiveBorderRelation = []
        let column = this.tableOption.column[7]
        if (this.form.suitType && this.form.suitType != '1') {
          column.display = true
          if(this.form.suitType == '2'){
            column.label = '关联商品'
          }
          if(this.form.suitType == '3'){
            column.label = '关联分类'
            this.getTreeGoodsCategory()
          }
          if(this.form.suitType == '4'){
            column.label = '关联店铺'
            this.getListShopInfo()
          }
        } else {
          column.display = false
        }
      },
    },
    created() {
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions']),
      permissionList() {
        return {
          addBtn: this.permissions['mall:activeborder:add'] ? true : false,
          delBtn: this.permissions['mall:activeborder:del'] ? true : false,
          editBtn: this.permissions['mall:activeborder:edit'] ? true : false,
          viewBtn: this.permissions['mall:activeborder:get'] ? true : false
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
        let that = this
        row.picUrl = row.picUrl.length > 0 ? row.picUrl[0] : ''
        row.validBeginTime = row.validTime[0]
        row.validEndTime = row.validTime[1]
        let selectionActiveBorderRelation = row.listActiveBorderRelation
        if (selectionActiveBorderRelation && selectionActiveBorderRelation.length > 0) {
          let listActiveBorderRelation = []
          selectionActiveBorderRelation.forEach(function (val, index) {//过滤无用数据
            let relationId
            if(that.form.suitType == '2'){
              relationId = val.id
            }
            if(that.form.suitType == '3' || that.form.suitType == '4'){
              relationId = val
            }
            listActiveBorderRelation.push({
              relationId: relationId
            })
          })
          row.listActiveBorderRelation = listActiveBorderRelation
        } else {
          row.listActiveBorderRelation = null
        }
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
        let that = this;
        row.picUrl = row.picUrl.length > 0 ? row.picUrl[0] : ''
        row.validBeginTime = row.validTime[0]
        row.validEndTime = row.validTime[1]
        let selectionActiveBorderRelation = row.listActiveBorderRelation
        if (selectionActiveBorderRelation && selectionActiveBorderRelation.length > 0) {
          let listActiveBorderRelation = []
          selectionActiveBorderRelation.forEach(function (val, index) {//过滤无用数据
            let relationId
            if(that.form.suitType == '2'){
              relationId = val.id
            }
            if(that.form.suitType == '3' || that.form.suitType == '4'){
              relationId = val
            }
            listActiveBorderRelation.push({
              relationId: relationId
            })
          })
          row.listActiveBorderRelation = listActiveBorderRelation
        } else {
          row.listActiveBorderRelation = null
        }
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
      beforeOpen(done, type) {
        let that = this
        if (type == 'add') {
          this.form.validTime = []
        } else {
          let validTime = []
          validTime.push(this.form.validBeginTime)
          validTime.push(this.form.validEndTime)
          this.form.validTime = validTime
        }
        if (type == 'add') {
          this.form.picUrl = []
        } else {
          this.form.picUrl = [this.form.picUrl]
        }
        if (type == 'edit' || type == 'view') {//如果是修改、查看操作，加载关联商品
          if (this.form.suitType == '2' || this.form.suitType == '3' || this.form.suitType == '4') {
            getObj(this.form.id).then(response => {
              let obj = response.data.data
              let listActiveBorderRelation = []
              obj.listActiveBorderRelation.forEach(i => {
                if(that.form.suitType == '2'){
                  listActiveBorderRelation.push(i.goodsSpu)
                }
                if(that.form.suitType == '3' || that.form.suitType == '4'){
                  listActiveBorderRelation.push(i.relationId)
                }
              })
              this.form.listActiveBorderRelation = listActiveBorderRelation
            }).catch(() => {

            })
          }
        }
        done()
      },
      changeEnable(row) {
        putObj({
          id: row.id,
          enable: row.enable
        }).then(data => {

        })
      },
      showGoodsList() {
        this.tableData2 = []
        this.dialogVisibleGoods = true
        this.getPage2(this.page2)
      },
      getPage2(page, params) {
        this.tableLoading2 = true
        if (this.paramsSearch2.categoryId) {
          this.paramsSearch2.categoryFirst = this.paramsSearch2.categoryId[0]
          this.paramsSearch2.categorySecond = this.paramsSearch2.categoryId[1]
        }
        getPage2(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page2.descs,
          ascs: this.page2.ascs,
          shopId: this.form.shopId
        }, params, this.paramsSearch2)).then(response => {
          let tableData = response.data.data.records
          tableData.forEach(function (item, index) {
            let categoryId = []
            if (item.categoryFirst) {
              categoryId.push(item.categoryFirst)
            }
            if (item.categorySecond) {
              categoryId.push(item.categorySecond)
            }
            item.categoryId = categoryId
          })
          this.tableData2 = tableData
          this.page2.total = response.data.data.total
          this.page2.currentPage = page.currentPage
          this.page2.pageSize = page.pageSize
          this.tableLoading2 = false
          // 加载列表级联数据
          this.$nextTick(() => {
            this.$refs.crud.dicInit('cascader');
          })
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
      refreshChange2(val) {
        this.getPage2(val.page)
      },
      sortChange2(val) {
        let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : '';
        if (val.order == 'ascending') {
          this.page2.descs = []
          this.page2.ascs = prop
        } else if (val.order == 'descending') {
          this.page2.ascs = []
          this.page2.descs = prop
        } else {
          this.page2.ascs = []
          this.page2.descs = []
        }
        this.getPage2(this.page2)
      },
      selectionChange2(list) {
        this.selectionActiveBorderRelation = list
      },
      subGoods() {
        let listActiveBorderRelation = this.form.listActiveBorderRelation
        listActiveBorderRelation = [...listActiveBorderRelation, ...this.selectionActiveBorderRelation]
        //去重
        this.form.listActiveBorderRelation = unique(listActiveBorderRelation)
        this.dialogVisibleGoods = false
      },
      removeRelation(index) {
        this.form.listActiveBorderRelation.splice(index, 1)
      },
      getListShopInfo(){
        if(this.listShopInfo.length <= 0){
          getListShopInfo().then(response => {
            this.listShopInfo = response.data.data
          })
        }
      },
      getTreeGoodsCategory(){
        if(this.treeGoodsCategory.length <= 0){
          getTreeGoodsCategory().then(response => {
            this.treeGoodsCategory = response.data.data
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    height: 120px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
