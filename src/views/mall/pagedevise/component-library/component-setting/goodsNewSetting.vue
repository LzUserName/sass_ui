<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div>
    <settingSlot @confirm="confirm" @cancel="cancel" @reset="reset" :showReset="true">
      <p slot="dialogTitle">商品新荐</p>
      <!-- <div slot="hint">
        提示：建议最少3个，最多10个。
      </div> -->
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="页面下边距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-tabs value="first">
            <el-tab-pane label="商品组一" name="first">
              <div>
                <el-form-item label="背景颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem1.titleBg" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem1.titleBg"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="左标题">
                  <el-input v-model="formData.goodsItem1.title" max-length="6" size="mini" placeholder="标题(做多输入6字)"></el-input>
                </el-form-item>
                <el-form-item label="左标题颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem1.titleColor" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem1.titleColor"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="左文字大小">
                  <el-input type="number" v-model="formData.goodsItem1.titleSize" size="mini" style="margin-top: 5px" placeholder="文字大小">
                  </el-input>
                </el-form-item>

                <el-form-item label="右标题">
                  <el-input v-model="formData.goodsItem1.subtitle" size="mini" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="右标题颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem1.subtitleColor" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem1.subtitleColor"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="右文字大小">
                  <el-input v-model="formData.goodsItem1.subtitleSize" type="number" size="mini" style="margin-top: 5px" placeholder="文字大小">
                  </el-input>
                </el-form-item>
                <el-form-item label="右背景颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem1.subtitleBg" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem1.subtitleBg"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <draggable v-model="formData.goodsItem1.goodsList" :options="{animation:500, filter:'.notDraggable', preventOnFilter: false}" >
                  <div v-for="(item,index) in formData.goodsItem1.goodsList" :key="index" style="margin-top: 8px;" >
                    <el-row>
                      <el-col :span="3" style="text-align: center;margin-top: 10px;" class="canDraggable">
                        <div class="draggable-focus"><i class="el-icon-d-caret"></i></div>
                      </el-col>
                      <el-col :span="21">
                        <div class="notDraggable">
                          <el-row style="margin-top: 10px;" >
                            <el-col :span="5" >
                              <MaterialList
                                :value="item.imageUrl?[item.imageUrl]:[]"
                                @sureSuccess="item.imageUrl = $event?$event[0]:''"
                                @deleteMaterial="item.imageUrl = ''"
                                type="image" shopId="-1"  :num=1 :width="70" :height="90"></MaterialList>
                            </el-col>
                            <el-col :span="19" >
                              <div style="margin-top: -10px;">
                                <el-form-item label="名称">
                                  <el-input v-model="item.name" size="mini" placeholder="名称" style="width:90%;"></el-input>
                                </el-form-item>
                                <el-form-item label="文字颜色">
                                  <el-input v-model="item.color" size="small"  style="width:90%;margin-top: 5px;">
                                    <template slot="append">
                                      <el-color-picker size="mini" v-model="item.color"></el-color-picker>
                                    </template>
                                  </el-input>
                                </el-form-item>
                                <el-form-item label="文字大小" style="margin-top: -0px;">
                                  <el-input v-model="item.size" type="number" size="mini" placeholder="文字大小" style="width:90%;"></el-input>
                                </el-form-item>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="notDraggable" style="padding: 0 0 5px 20px">
                      <app-page-select :clientType="clientType" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select>
                    </div>
                  </div>
                </draggable>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品组二" name="second">
              <div>
                <el-form-item label="背景颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem2.titleBg" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem2.titleBg"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="左标题">
                  <el-input v-model="formData.goodsItem2.title" max-length="6" size="mini" placeholder="标题(做多输入6字)"></el-input>
                </el-form-item>
                <el-form-item label="左标题颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem2.titleColor" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem2.titleColor"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="左文字大小">
                  <el-input type="number" v-model="formData.goodsItem2.titleSize" size="mini" style="margin-top: 5px" placeholder="文字大小">
                  </el-input>
                </el-form-item>
                <el-form-item label="右标题">
                  <el-input v-model="formData.goodsItem2.subtitle" size="mini" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="右标题颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem2.subtitleColor" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem2.subtitleColor"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <el-form-item label="右文字大小">
                  <el-input v-model="formData.goodsItem2.subtitleSize" type="number" size="mini" style="margin-top: 5px" placeholder="文字大小">
                  </el-input>
                </el-form-item>
                <el-form-item label="右背景颜色">
                  <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                    <el-input v-model="formData.goodsItem2.subtitleBg" size="small" style="margin-top: 5px">
                      <template slot="append">
                        <el-color-picker size="mini" v-model="formData.goodsItem2.subtitleBg"></el-color-picker>
                      </template>
                    </el-input>
                  </el-tooltip>
                </el-form-item>
                <draggable v-model="formData.goodsItem2.goodsList" :options="{animation:500, filter:'.notDraggable', preventOnFilter: false}" >
                  <div v-for="(item,index) in formData.goodsItem2.goodsList" :key="index" style="margin-top: 8px;" >
                    <el-row>
                      <el-col :span="3" style="text-align: center;margin-top: 10px;" class="canDraggable">
                        <div class="draggable-focus"><i class="el-icon-d-caret"></i></div>
                      </el-col>
                      <el-col :span="21">
                        <div class="notDraggable">
                          <el-row style="margin-top: 10px;" >
                            <el-col :span="5" >
                              <MaterialList
                                :value="item.imageUrl?[item.imageUrl]:[]"
                                @sureSuccess="item.imageUrl = $event?$event[0]:''"
                                @deleteMaterial="item.imageUrl = ''"
                                type="image" shopId="-1"  :num=1 :width="70" :height="90"></MaterialList>
                            </el-col>
                            <el-col :span="19" >
                              <div style="margin-top: -10px;">
                                <el-form-item label="名称">
                                  <el-input v-model="item.name" size="mini" placeholder="名称" style="width:90%;"></el-input>
                                </el-form-item>
                                <el-form-item label="文字颜色">
                                  <el-input v-model="item.color" size="small"  style="width:90%;margin-top: 5px;">
                                    <template slot="append">
                                      <el-color-picker size="mini" v-model="item.color"></el-color-picker>
                                    </template>
                                  </el-input>
                                </el-form-item>
                                <el-form-item label="文字大小" style="margin-top: -0px;">
                                  <el-input v-model="item.size" type="number" size="mini" placeholder="文字大小" style="width:90%;"></el-input>
                                </el-form-item>
                              </div>
                            </el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                    <div class="notDraggable" style="padding: 0 0 5px 20px">
                      <app-page-select :clientType="clientType" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select>
                    </div>
                  </div>
                </draggable>
              </div>
            </el-tab-pane>
          </el-tabs>

        </el-form>
      </div>
    </settingSlot>

    <el-dialog title="请选择商品" :visible.sync="dialogVisibleGoods" width="83%" top="20px"  append-to-body>
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
        <template slot="shelf" slot-scope="scope">
          <el-switch
            active-value="1"
            inactive-value="0"
            v-model="scope.row.shelf"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
        <template slot="price" slot-scope="scope">
          <div style="color: red">￥{{scope.row.priceDown}}{{scope.row.priceUp == scope.row.priceDown ? '' : '~￥'+
            scope.row.priceUp}}
          </div>
        </template>
      </avue-crud>
      <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisibleGoods = false">取 消</el-button>
                  <el-button type="primary" @click="subGoods">确 定</el-button>
                </span>
    </el-dialog>

  </div>
</template>

<script>

import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

import draggable from "vuedraggable";

import settingSlot from './settingSlot'
import iconSelect from '../pages/page-components/iconSelect.vue'
import MaterialList from '@/components/material/list.vue'
import AppPageSelect from '@/components/app-page-select/Index.vue'

import {getPage as getPage2} from '@/api/mall/goodsspu'
import {tableOption2} from '@/const/crud/mall/goodsspu'

export default {
  components: { draggable, settingSlot,iconSelect,MaterialList, AppPageSelect   },
  data() {
    return {
      dialogVisibleGoods: false,
      shopList: [],
      selectionGoodsSpu: [],
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
      formDataCopy : {
        goodsItem1: {
          title: '热选爆款',
          titleColor: '#333333',
          titleBg: 'red',
          titleSize: '18',
          subtitleColor: '#ffffff',
          subtitle: '低至5元',
          subtitleBg: '#ffb17d',
          subtitleSize: '13',
          goodsList: [
            {
              id       : Math.random(),
              imageUrl : '',
              name : '最新低价',
              pageUrl : '',
              color : '#333333',
              size : 13,
            },
            {
              id       : Math.random(),
              imageUrl : '',
              name : '￥99',
              pageUrl : '',
              color : '#333333',
              size : 13,
            },
          ]
        },
        goodsItem2: {
          title: '会员推荐',
          titleColor: '#333333',
          titleBg: 'red',
          titleSize: '18',
          subtitleColor: '#ffffff',
          subtitle: '会员优惠价',
          subtitleBg: '#FF7D7D',
          subtitleSize: '13',
          goodsList: [
            {
              id       : Math.random(),
              imageUrl : '',
              name : '会员价￥88',
              pageUrl : '',
              color : '#FF3636',
              size : 13,
            },
            {
              id       : Math.random(),
              imageUrl : '',
              name : '￥99',
              pageUrl : '',
              color : '#333333',
              size : 13,
            },
          ]
        },
        pageSpacing: 0,
      },
      formData : {
        goodsItem1:{
          titleBg: 'red',
          goodsList: []
        },
        goodsItem2:{
          titleBg: 'red',
          goodsList: []
        },
      }
    };
  },
  props: {
    clientType: [String],
    showData:{
      type: Object,
      default: ()=> {}
    },
    config   : {
      type: Object,
      default: ()=> {}
    }
  },
  computed: {
    ...mapState({
      componentsList: state => state.divpage.componentsList,
      clickComIndex : state => state.divpage.clickComIndex,
    })
  },
  mounted(){
    let that = this;
    if(that.IsEmptyObj(that.showData)){
      that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
    } else {
      that.formData = that.showData
    }
    that.$set(that.componentsList[that.clickComIndex], 'data', this.formData)
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    addItem(){
      let that = this;
      that.pushItem()
    },
    pushItem(){
      let that = this;
      // if(that.formData.goodsList&&that.formData.goodsList.length >=10){
      //   that.$message.error("项目不能超过10条")
      //   return false;
      // }
      this.formData.goodsList.push({
        id       : Math.random(),
        picUrls : [],
        name  : '商品名',
        sellPoint  : '',
        pointsGiveSwitch  : '',
        freightTemplat  : {},
        saleNum: 0,
        priceDown: '',
      })
    },
    // 删除项目
    delItem(index){
      let that = this;
      if(that.formData.goodsList.length<=1){
        that.$message.error("请至少保留一条项目")
        return false;
      }
      that.$confirm('是否删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText : '取消',
        type : 'warning'
      }).then(()=>{
        that.$delete(that.formData.goodsList, index)
      }).catch(()=>{})
    },
    // 删除按钮
    delBtn(index){
      let that = this;
      that.$confirm('是否删除该组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText : '取消',
        type : 'warning'
      }).then(()=>{
        that.$delete(that.componentsList[that.clickComIndex].data.itemArray, index)
        that.updateData({ componentsList: that.componentsList });
      }).catch(()=>{})
    },
    cancel(){
      this.$emit('cancel')
    },
    reset(){
      let that = this;
      that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
      that.componentsList[that.clickComIndex]['data'] = this.formData;
    },
    confirm(){
      this.$emit('confirm', this.formData)
    },
    delete(){
      this.$emit('delete')
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
      }, params, this.paramsSearch2)).then(response => {
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
        })
        this.tableData2 = tableData
        this.page2.total = response.data.data.total
        this.page2.currentPage = page.currentPage
        this.page2.pageSize = page.pageSize
        this.tableLoading2 = false
      }).catch(() => {
        this.tableLoading2 = false
      })
    },
    searchChange2(params,done) {
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
      this.getPage(this.page)
    },

    selectionChange2(list){
      this.selectionGoodsSpu = list
    },

    showGoodsList(){
      this.tableData2 = []
      this.dialogVisibleGoods = true
      this.getPage2(this.page2)
    },
    subGoods(){

      this.formData.goodsList = [...this.selectionGoodsSpu, ...this.formData.goodsList];
      let that = this;

      that.$set(that.componentsList[that.clickComIndex], 'data', this.formData)
      that.updateData({ componentsList: that.componentsList });
      this.dialogVisibleGoods = false
    },
  },
  watch: {
    showData: {
      handler(newVal, oldVal) {
        this.formData = newVal ? newVal : this.formData;
      },
      deep: true
    },

  }
};
</script>
<style lang='less' scoped>
@import '../colorui/main.css';
@import '../colorui/icon.css';

.tm-select-bg {
  text-align: center;
  cursor: pointer;
  padding: 10px 0;
}

.tm-select-bg:hover {
  background: #efefef;
}
.el-form-item{
  margin-bottom: 0;
}

</style>
