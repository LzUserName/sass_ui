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
      <p slot="dialogTitle">秒杀</p>
      <div slot="hint">
        <div class="tips-class " >
<!--          提示：背景颜色与背景图可同时存在，或者二选一。图片层级会高于背景颜色，图片建议高度260px。-->
<!--          <br>-->
          提示：秒杀组件会自动加载当前时间的秒杀商品。请确保已添加秒杀商品！
        </div>
      </div>
      <!-- <div slot="hint">
        提示：建议最少3个，最多10个。
      </div> -->
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
<!--          <el-form-item label="标题">-->
<!--            <el-input v-model="formData.title" size="small" placeholder="标题(可选)" style="margin-top: 5px">-->
<!--              <template slot="append">-->
<!--                <el-color-picker size="mini" v-model="formData.titleColor"></el-color-picker>-->
<!--              </template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="标题图片">
            <MaterialList
              :value="formData.titleImage?[formData.titleImage]:[]"
              @sureSuccess="formData.titleImage = $event?$event[0]:''"
              @deleteMaterial="formData.titleImage = ''"
              type="image" :shopId="shopId"  :num=1 :width="120" :height="48"></MaterialList>
          </el-form-item>
          <el-form-item label="时间背景" style="margin-top: 10px;">
            <MaterialList
              :value="formData.seckillTimeImage?[formData.seckillTimeImage]:[]"
              @sureSuccess="formData.seckillTimeImage = $event?$event[0]:''"
              @deleteMaterial="formData.seckillTimeImage = ''"
              type="image" :shopId="shopId"  :num=1 :width="120" :height="48"></MaterialList>
          </el-form-item>
          <el-form-item label="标题描述">
            <el-input v-model="formData.subtitle" size="small" placeholder="副标题" style="margin-top: 5px">
              <template slot="append">
                <el-color-picker size="mini" v-model="formData.subtitleColor"></el-color-picker>
              </template>
            </el-input>
          </el-form-item>

<!--          <el-form-item label="背景颜色">-->
<!--            <bg-color-select :thememobile="thememobile" :bgValue="formData.background" @onChange="formData.background = $event"></bg-color-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="背景图片" style="margin: 5px 0;">-->
<!--            <MaterialList :value="formData.backgroundImg?[formData.backgroundImg]:[]"  @sureSuccess="formData.backgroundImg = $event?$event[0]:''" @deleteMaterial="formData.backgroundImg = ''"-->
<!--                          type="image" shopId="-1" :divStyle="'width:100%;margin-bottom:0px;height:100px;line-height: 100px;'" :num=1 ></MaterialList>-->
<!--          </el-form-item>-->
          <el-form-item label="页面下边距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goodsQty" size="mini" type="number" :min="1" placeholder="显示秒杀商品数量">
            </el-input>
          </el-form-item>
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
        <template slot="picUrl" slot-scope="scope">
          <img style="height: 100px"
               :src="scope.row.picUrl">
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
  import bgColorSelect from "../pages/page-components/bgColorSelect";
  import MaterialList from '@/components/material/list.vue'

  import {getPage as getPage2, getObj, addObj, putObj, delObj} from '@/api/mall/seckillinfo'
  import {tableOption3} from '@/const/crud/mall/seckillinfo'

  export default {
    components: { draggable, settingSlot, iconSelect, bgColorSelect, MaterialList  },
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
        tableOption2: tableOption3,
        formDataCopy : {
          background: 'bg-gradual-orange',
          backgroundImg: '',
          titleImage: '',
          seckillTimeImage: '',
          title: '限时秒杀',
          titleColor: '#FFFFFF',
          subtitle: '秒杀折上折，限量开抢',
          subtitleColor: '#FFFFFF',
          titleIcon: 'cuIcon-message',
          pageSpacing: 0,
          goodsQty: 5,
          goodsList: []
        },
        formData : {}
      };
    },
    props: {
      shopId: {
        type: String
      },
      showData:{
        type: Object,
        default: ()=> {}
      },
      config   : {
        type: Object,
        default: ()=> {}
      },
      thememobile : { type: Object | Array },
    },
    computed: {
      ...mapState({
        componentsList: state => state.divpageShop.componentsList,
        clickComIndex : state => state.divpageShop.clickComIndex,
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
        this.paramsSearch2.shopId = this.shopId;
        getPage2(Object.assign({
          current: page.currentPage,
          size: page.pageSize,
          descs: this.page2.descs,
          ascs: this.page2.ascs,
        }, params, this.paramsSearch2)).then(response => {
          let tableData = response.data.data.records
          this.tableData2 = tableData
          this.page2.total = response.data.data.total
          this.page2.currentPage = page.currentPage
          this.page2.pageSize = page.pageSize
          this.tableLoading2 = false
          // 加载列表级联数据
          this.$nextTick(()=>{
            this.$refs.crud.dicInit('cascader');
          })
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
