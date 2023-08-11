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
      <p slot="dialogTitle">商品甑选</p>
      <!-- <div slot="hint">
        提示：建议最少3个，最多10个。
      </div> -->
      <div slot="mainContent">
        <el-form ref="form" label-width="90px" :model="formData">
          <el-form-item label="标题">
            <el-input v-model="formData.title" size="mini" placeholder="标题"></el-input>
          </el-form-item>

          <el-form-item label="背景图片">
            <MaterialList :value="formData.backgroundImg?[formData.backgroundImg]:[]"
                          @sureSuccess="formData.backgroundImg = $event?$event[0]:''"
                          @deleteMaterial="formData.backgroundImg = ''"
                          type="image" shopId="-1"
                          :divStyle="'width:100%;margin-bottom:0px;height:100px;line-height: 100px;'"
                          :num=1></MaterialList>
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.titleColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.titleColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="标题图标">
            <icon-select style="float:left;margin-right: 10px;"
                         @onChangeIcon="formData.titleIcon = $event"></icon-select>
            <div :style="{color: `${formData.titleColor}`}" :class="formData.titleIcon"></div>
          </el-form-item>
          <!--          <el-form-item label="标题图标">-->
          <!--            <icon-select style="float:left;margin-right: 10px;"  @onChangeIcon="formData.titleIcon = $event"></icon-select>-->
          <!--            <div :style="{color: `${formData.titleColor}`}" :class="formData.titleIcon"></div>-->
          <!--          </el-form-item>-->
          <el-form-item label="页面下边距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px"
                      placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品">
            <div>
              <el-button class="addBtn" type="primary" icon="el-icon-circle-plus" plain size="mini"
                         @click="showGoodsList">选择商品
              </el-button>
            </div>
          </el-form-item>
          <div>
            <draggable v-model="formData.goodsList"
                       :options="{filter:'.notDraggable', preventOnFilter: false, animation:500}">
              <div v-for="(item,index) in formData.goodsList" :key="index" style="margin-top: 8px;">
                <el-row v-if="item">
                  <el-col :span="3" style="text-align: center;">
                    <div class="draggable-focus"><i class=" el-icon-d-caret"></i></div>
                    <div @click="delItem(index)" class="del-focus"><i class="delIcon el-icon-delete"></i></div>
                  </el-col>
                  <el-col :span="21">
                    <div class="notDraggable border solid padding-xs">
                      <img :src="item.picUrls&&item.picUrls[0]" width="70" height="70" style="float:left;">
                      <el-form-item label="" label-width="0px"
                                    style="margin-left:20px;padding-top: 8px;padding-left: 10px;">
                        <div class="text-cut padding-xs" :title="item.name">{{ item.name }}</div>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </draggable>

          </div>
        </el-form>
      </div>
    </settingSlot>

    <el-dialog title="请选择商品" :visible.sync="dialogVisibleGoods" width="83%" top="20px" append-to-body>
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

  </div>
</template>

<script>

import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

import draggable from "vuedraggable";

import settingSlot from './settingSlot'
import iconSelect from '../pages/page-components/iconSelect.vue'
import MaterialList from '@/components/material/list.vue'

import {getListByIds, getPage as getPage2} from '@/api/mall/goodsspu'
import {tableOption2} from '@/const/crud/mall/goodsspu'

export default {
  components: {draggable, settingSlot, iconSelect, MaterialList},
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
      formDataCopy: {
        title: '商品甄选',
        titleColor: 'red',
        backgroundImg: '',
        titleIcon: 'cuIcon-message',
        pageSpacing: 0,
        goodsIds: [],//用来动态获取商品数据
        goodsList: []
      },
      formData: {
        goodsIds: [],//用来动态获取商品数据
      }
    };
  },
  props: {
    showData: {
      type: Object,
      default: () => {
      }
    },
    config: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    ...mapState({
      componentsList: state => state.divpage.componentsList,
      clickComIndex: state => state.divpage.clickComIndex,
    })
  },
  mounted() {
    let that = this;
    if (that.IsEmptyObj(that.showData)) {
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
    addItem() {
      let that = this;
      that.pushItem()
    },
    pushItem() {
      let that = this;
      // if(that.formData.goodsList&&that.formData.goodsList.length >=10){
      //   that.$message.error("项目不能超过10条")
      //   return false;
      // }
      this.formData.goodsList.push({
        id: Math.random(),
        picUrls: [],
        name: '商品名',
        sellPoint: '',
        pointsGiveSwitch: '',
        freightTemplat: {},
        saleNum: 0,
        priceDown: '',
      })
    },
    // 删除项目
    delItem(index) {
      let that = this;
      if (that.formData.goodsList.length <= 1) {
        that.$message.error("请至少保留一条项目")
        return false;
      }
      that.$confirm('是否删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$delete(that.formData.goodsIds, index)
        that.$delete(that.formData.goodsList, index)
      }).catch(() => {
      })
    },
    // 删除按钮
    delBtn(index) {
      let that = this;
      that.$confirm('是否删除该组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$delete(that.componentsList[that.clickComIndex].data.itemArray, index)
        that.updateData({componentsList: that.componentsList});
      }).catch(() => {
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    reset() {
      let that = this;
      that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
      that.componentsList[that.clickComIndex]['data'] = this.formData;
    },
    confirm() {
      this.$emit('confirm', this.formData)
    },
    delete() {
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
      this.getPage(this.page)
    },

    selectionChange2(list) {
      this.selectionGoodsSpu = list
    },

    showGoodsList() {
      this.tableData2 = []
      this.dialogVisibleGoods = true
      this.getPage2(this.page2)
    },
    refreshFormData() {//同步数据
      let that = this;
      that.$set(that.componentsList[that.clickComIndex], 'data', this.formData)
      that.updateData({componentsList: that.componentsList});
      this.dialogVisibleGoods = false
    },
    subGoods() {
      let goodsIds = this.selectionGoodsSpu.map(item => item.id)
      let goodsList = []// 去重
      this.formData.goodsList.map(item => {
        if (item && goodsIds.indexOf(item.id) === -1) {
          goodsIds.push(item.id)
          goodsList.push(item)
        }
      })
      this.formData.goodsList = [...this.selectionGoodsSpu, ...goodsList];
      this.formData.goodsIds = goodsIds
      this.dialogVisibleGoods = false
    },
    getGoodsListByIds() {//根据ids获取商品
      if (this.formData.goodsIds && this.formData.goodsIds.length)
        getListByIds(this.formData.goodsIds).then(response => {
          //如果之前的商品被删除了，那么需要自动删掉处理
          let hasGoodsIds = response.data.data.map(item=>item.id)
          let goodsIds = JSON.parse(JSON.stringify(this.formData.goodsIds))
          goodsIds.map((item,index)=>{
            let hasIndex = hasGoodsIds.indexOf(item);
            if(hasIndex===-1){
              this.formData.goodsIds.splice(index,1)
            }
          })
          let goods = new Array(this.formData.goodsIds.length)
          response.data.data.map(item => {
            let index = this.formData.goodsIds.indexOf(item.id);
            goods[index] = item
          })
          this.formData.goodsList = goods
          this.refreshFormData()
        }).catch(() => {

        })
      else {
        this.formData.goodsList = []
        this.refreshFormData()
      }
    }

  },
  watch: {
    showData: {
      handler(newVal, oldVal) {
        this.formData = newVal ? newVal : this.formData;
      },
      deep: true
    },
    'formData.goodsIds': {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > oldVal.length) {//只有在新增商品时才同步商品信息，删除或位置更换时不去请求接口
          if (newVal != oldVal) {
            this.getGoodsListByIds();
          }
        } else {
          // this.refreshFormData()
        }
      },
      deep: true
    },
    'formData.goodsList'(val) {
      if (val) {
        this.formData.goodsIds = val.map(item => {
          return item.id
        })
      } else {
        this.formData.goodsIds = []
      }
    }
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

.el-form-item {
  margin-bottom: 0;
}

</style>
