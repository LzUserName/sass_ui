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
      <el-tabs v-model="verifyStatus" type="card" @tab-click="handleClickStatus">
        <el-tab-pane name="-1">
          <span slot="label"><i class="el-icon-s-order"></i> 全部商品</span>
        </el-tab-pane>
        <el-tab-pane name="0">
          <span slot="label"><i class="el-icon-refresh"></i> 待审核商品</span>
        </el-tab-pane>
        <el-tab-pane name="1">
          <span slot="label"><i class="el-icon-folder-checked"></i> 审核通过商品</span>
        </el-tab-pane>
        <el-tab-pane name="2">
          <span slot="label"><i class="el-icon-folder-delete"></i> 审核不通过商品</span>
        </el-tab-pane>
      </el-tabs>
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
                 @search-change="searchChange"
                 @selection-change="selectionChange">
        <template slot="menuLeft">
          <el-button type="success"
                     @click="batchShelf('1')"
                     size="small"
                     icon="el-icon-top"
                     v-if="permissions['mall:goodsspu:edit']">批量上架</el-button>
          <el-button type="danger"
                     @click="batchShelf('0')"
                     size="small"
                     icon="el-icon-bottom"
                     v-if="permissions['mall:goodsspu:edit']">批量下架</el-button>
          <el-button type="warning"
                     @click="batchVerify('1')"
                     size="small"
                     icon="el-icon-check"
                     v-if="permissions['mall:goodsspu:verify']">批量通过审核</el-button>
          <el-button type="warning"
                     @click="batchVerify('2')"
                     size="small"
                     icon="el-icon-close"
                     v-if="permissions['mall:goodsspu:verify']">批量拒绝审核</el-button>
        </template>
        <template slot="picUrls" slot-scope="scope">
          <el-image class="jl-img-width"
            :src="scope.row.picUrls[0]"
            :preview-src-list="scope.row.picUrls">
          </el-image>
        </template>
        <template slot="shelf" slot-scope="scope">
          <el-switch
                  active-value="1"
                  inactive-value="0"
                  v-model="scope.row.shelf"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeShelf(scope.row)">
          </el-switch>
        </template>
        <template slot="priceDown" slot-scope="scope">
          <div style="color: red">￥{{scope.row.priceDown}}{{scope.row.priceUp == scope.row.priceDown ? '' : '~￥'+
            scope.row.priceUp}}
          </div>
        </template>
        <template slot="verifyStatus" slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.verifyStatus == 0" size="small">审核中</el-tag>
            <el-tag v-if="scope.row.verifyStatus == 1" size="small" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.verifyStatus == 2" size="small" type="danger">审核不通过</el-tag>
          </div>
        </template>
        <template slot="descriptionForm" slot-scope="scope">
          <BaseEditor v-model="form.description"/>
        </template>
        <template slot="freightTemplatIdForm" slot-scope="scope">
          <avue-select v-model="form.freightTemplatId" placeholder="请选择运费模板"
                       :dic="dicFreightTemplatId" :props="propsFreightTemplatId"></avue-select>
        </template>
        <template slot="skusForm" slot-scope="scope">
          <SkuForm :specType="form.specType" :goodsSpec="goodsSpec" :goodsSpuSpec="goodsSpuSpec"
                   :goodsSku="goodsSku" :form="form" @getGoodsSku="getGoodsSku"></SkuForm>
        </template>
        <template slot="picUrlsForm" slot-scope="scope">
          <div v-if="form.shopId">
            <MaterialList v-if="reFreshMaterialList" v-model="form.picUrls" type="image" :num=5 :shopId="form.shopId"></MaterialList>
            <p>主图默认第一张</p>
          </div>
        </template>
<!--        <template slot-scope="scope" slot="menu">-->
<!--          <el-button icon="el-icon-chat-dot-square"-->
<!--                     size="small"-->
<!--                     type="text"-->
<!--                     @click="openAppraises(scope.row,scope.index)">商品评价</el-button>-->
<!--        </template>-->
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
    import {getPage, getObj, addObj, putObj, delObj, putObjShelf, putObjVerify} from '@/api/mall/goodsspu'
    import {getList as getList2} from '@/api/mall/freighttemplat'
    import {getList as specList} from '@/api/mall/goodsspec'
    import {fetchTree} from '@/api/mall/goodsspuspec'
    import {getObj2} from '@/api/mall/pointsconfig'
    import { getObj2 as getDistributionConfig } from '@/api/mall/distributionconfig'
    import {tableOption} from '@/const/crud/mall/goodsspu'
    import {mapGetters} from 'vuex'
    import BaseEditor from '@/components/editor/BaseEditor.vue'
    import SkuForm from '@/components/sku/sku-form.vue'
    import MaterialList from '@/components/material/list.vue'

    export default {
        name: 'goodsspu',
        components: {
            BaseEditor,
            SkuForm,
            MaterialList
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
                goodsSpec: null,
                goodsSpuSpec: null,
                goodsSku: null,
                goodsSkuData: [],
                goodsSpuSpecData: [],
                optionAppraises: {
                    props: {
                        avatar: 'nickName',
                        author: 'headimgUrl',
                        body: 'content'
                    }
                },
                selectionData: '',
                pointsConfig: null,
                distributionConfig: null,//返佣配置
                reFreshMaterialList: true,
                dicFreightTemplatId: [],
                propsFreightTemplatId: {
                    label: 'name',
                    value: 'id'
                },
                verifyStatus: '-1'
            }
        },
        watch:{
          'form.shopId'(val, oldVal){
            this.reFreshMaterialList= false
            this.$nextTick(()=>{
              this.reFreshMaterialList = true
            })
            if(oldVal){
              this.form.freightTemplatId = null
            }
            if(val){
              getList2({
                shopId: val
              }).then(data => {
                this.dicFreightTemplatId = data.data
              })
            }
          },
          'form.pointsGiveSwitch'(){
            let column =this.tableOption.group[2].column[1]
            if(this.form.pointsGiveSwitch==='1'){
              column.display = true
            }else{
              column.display = false
            }
          },
          'form.pointsDeductSwitch'(){
            let column =this.tableOption.group[3].column[1]
            let column2 =this.tableOption.group[3].column[2]
            if(this.form.pointsDeductSwitch==='1'){
              column.display = true
              column2.display = true
            }else{
              column.display = false
              column2.display = false
            }
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
                    addBtn: this.permissions['mall:goodsspu:add'] ? true : false,
                    delBtn: this.permissions['mall:goodsspu:del'] ? true : false,
                    editBtn: this.permissions['mall:goodsspu:edit'] ? true : false,
                    viewBtn: this.permissions['mall:goodsspu:get'] ? true : false
                };
            },
        },
        methods: {
            selectionChange(list){
              this.selectionData = list
            },
            batchVerify(verifyStatus){
              if(this.selectionData.length<=0){
                this.$message.error('请选择商品')
                return
              }
              this.$prompt('请输入审核明细', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              }).then(({ value }) => {
                let selectionIds = ''
                this.selectionData.forEach(item => {
                  selectionIds += item.id+ ','
                })
                putObjVerify({
                  ids: selectionIds,
                  verifyStatus: verifyStatus,
                  verifyDetail: value
                }).then(data => {
                  this.getPage(this.page)
                })
              })
            },
            batchShelf(shelf){
              if(this.selectionData.length<=0){
                this.$message.error('请选择商品')
                return
              }
              let selectionIds = ''
              this.selectionData.forEach(item => {
                selectionIds += item.id+ ','
              })
              this.putObjShelf(selectionIds, shelf)
            },
            changeShelf(row){
              this.putObjShelf(row.id, row.shelf)
            },
            putObjShelf(ids, shelf){
                putObjShelf({
                  ids: ids,
                  shelf: shelf
                }).then(data => {
                  this.getPage(this.page)
                })
            },
            // openAppraises(row, index) {
            //   this.$router.push({ path: '/mall/goods/goodsappraises/'+index, query: { spuId: row.id } })
            // },
            getGoodsSku(val, val2) {
                this.goodsSkuData = val
                this.goodsSpuSpecData = val2
            },
            beforeOpen(done,type){
                this.dicFreightTemplatId = []
                if(type == 'add'){
                    this.goodsSpuSpec = []
                    this.goodsSku = []
                    this.specList()
                    done()
                }else if(type == 'edit'){
                    this.tableLoading = true
                    this.goodsSpuSpec = null
                    getObj(this.form.id).then(response => {
                      this.$set(this.form,'description', response.data.data.description)
                      this.$set(this.form,'ensureIds', response.data.data.ensureIds)
                      this.fetchTree({
                        spuId: this.form.id
                      })
                      this.specList()
                      let skus = response.data.data.skus.filter(val => {
                        val.picUrls = val.picUrl ? [val.picUrl] : []
                        return val
                      })
                      this.goodsSku = skus
                      this.tableLoading = false
                      done()
                    })
                }
            },
            fetchTree(params) {
                fetchTree(params).then(data => {
                    this.goodsSpuSpec = data.data.data
                })
            },
            specList() {
                specList().then(data => {
                    this.goodsSpec = data.data.data
                })
                //自动填充默认积分设置
                if(!this.pointsConfig){
                    getObj2().then(response => {
                      this.pointsConfig = response.data.data ? response.data.data : null
                      if(!this.form.pointsDeductScale){
                        this.form.pointsDeductScale = this.pointsConfig.defaultDeductScale
                        this.form.pointsDeductAmount = this.pointsConfig.defaultDeductAmount
                      }
                    })
                }else{
                  if(!this.form.pointsDeductScale){
                    this.form.pointsDeductScale = this.pointsConfig.defaultDeductScale
                    this.form.pointsDeductAmount = this.pointsConfig.defaultDeductAmount
                  }
                }
                //自动填充默认 返佣设置
                if(!this.distributionConfig){
                    getDistributionConfig().then(response => {
                      this.distributionConfig = response.data.data ? response.data.data : null
                      if(!this.form.firstRebate){
                        this.form.firstRebate = this.distributionConfig.firstRebate
                        this.form.secondRebate = this.distributionConfig.secondRebate
                      }
                    })
                }else{
                  if(!this.form.firstRebate){
                    this.form.firstRebate = this.distributionConfig.firstRebate
                    this.form.secondRebate = this.distributionConfig.secondRebate
                  }
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
                if (this.paramsSearch.categoryId) {
                    this.paramsSearch.categoryFirst = this.paramsSearch.categoryId[0]
                    this.paramsSearch.categorySecond = this.paramsSearch.categoryId[1]
                }
                if (this.paramsSearch.categoryShopId) {
                  this.paramsSearch.categoryShopFirst = this.paramsSearch.categoryShopId[0]
                  if(this.paramsSearch.categoryShopId[1]){
                      this.paramsSearch.categoryShopSecond = this.paramsSearch.categoryShopId[1]
                  }
                }
                getPage(Object.assign({
                    current: page.currentPage,
                    size: page.pageSize,
                    descs: this.page.descs,
                    ascs: this.page.ascs,
                    verifyStatus: this.verifyStatus != '-1' ? this.verifyStatus : null,
                }, params, this.paramsSearch)).then(response => {
                    let tableData = response.data.data.records
                    tableData.forEach(function (item, index) {
                        let categoryId = []
                        if(item.categoryFirst){
                          categoryId.push(item.categoryFirst)
                        }
                        if(item.categorySecond){
                          categoryId.push(item.categorySecond)
                        }
                        item.categoryId = categoryId
                        let categoryShopId = []
                        if(item.categoryShopFirst){
                          categoryShopId.push(item.categoryShopFirst)
                        }
                        if(item.categoryShopSecond){
                          categoryShopId.push(item.categoryShopSecond)
                        }
                        item.categoryShopId = categoryShopId
                    })
                    this.tableData = tableData
                    this.page.total = response.data.data.total
                    this.page.currentPage = page.currentPage
                    this.page.pageSize = page.pageSize
                    this.tableLoading = false
                  // 加载列表级联数据
                  this.$nextTick(()=>{
                    this.$refs.crud.dicInit('cascader');
                  })
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
                row.skus = this.goodsSkuData
                row.spuSpec = this.goodsSpuSpecData
                row.categoryFirst = row.categoryId[0]
                row.categorySecond = row.categoryId[1]
                row.categoryShopFirst = row.categoryShopId[0]
                if(row.categoryShopId[1]){
                  row.categoryShopSecond = row.categoryShopId[1]
                }else{
                  row.categoryShopSecond = ''
                }
                let validOk = true

                row.skus.forEach( (val, index) =>{
                  if (val.picUrls && val.picUrls.length > 0) {
                    val.picUrl = val.picUrls[0]
                  }
                  if(!val.firstRebate&&val.firstRebate!==0){
                    validOk = false
                    this.$message({
                      showClose: true,
                      message: '请输入一级分佣',
                      type: 'error'
                    })
                    return
                  }
                  if(!val.secondRebate&&val.secondRebate!==0){
                    validOk = false
                    this.$message({
                      showClose: true,
                      message: '请输入二级分佣',
                      type: 'error'
                    })
                    return
                  }
                })
                if(validOk){
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
                }else{
                  loading()
                  return false
                }
            },
            /**
             * @title 数据添加
             * @param row 为当前的数据
             * @param done 为表单关闭函数
             *
             **/
            handleSave: function (row, done, loading) {

                row.skus = this.goodsSkuData
                row.spuSpec = this.goodsSpuSpecData
                row.categoryFirst = row.categoryId[0]
                row.categorySecond = row.categoryId[1]
                row.categoryShopFirst = row.categoryShopId[0]
                if(row.categoryShopId[1]){
                  row.categoryShopSecond = row.categoryShopId[1]
                }else{
                  row.categoryShopSecond = ''
                }
                let validOk = true
                row.skus.forEach( (val, index) =>{
                    if (val.picUrls && val.picUrls.length > 0) {
                        val.picUrl = val.picUrls[0]
                    }
                    if(!val.firstRebate&&val.firstRebate!==0){
                      validOk = false
                      this.$message({
                        showClose: true,
                        message: '请输入一级分佣',
                        type: 'error'
                      })
                      return
                    }
                    if(!val.secondRebate&&val.secondRebate!==0){
                      validOk = false
                      this.$message({
                        showClose: true,
                        message: '请输入二级分佣',
                        type: 'error'
                      })
                      return
                    }
                })
                if(validOk){
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
                }else{
                  loading()
                  return false
                }

            },
            /**
             * 刷新回调
             */
            refreshChange(page) {
              this.getPage(this.page)
            },
            handleClickStatus(tab, event) {
              this.verifyStatus = tab.name
              this.page.currentPage = 1
              this.getPage(this.page)
            },
        }
    }
</script>
