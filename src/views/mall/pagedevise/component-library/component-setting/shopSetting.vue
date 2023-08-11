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
      <p slot="dialogTitle">店铺推荐</p>
      <div slot="hint" class="tips-class">
        提示：建议最少3个，最多10个。
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="标题">
            <el-input v-model="formData.title" size="mini" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="标题颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.titleColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.titleColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="标题图片">
            <MaterialList
              :value="formData.titleImage?[formData.titleImage]:[]"
              @sureSuccess="formData.titleImage = $event?$event[0]:''"
              @deleteMaterial="formData.titleImage = ''"
              type="image" shopId="-1"  :num=1 :width="120" :height="48"></MaterialList>
          </el-form-item>
<!--          <el-form-item label="标题图标">-->
<!--            <icon-select style="float:left;margin-right: 10px;"  @onChangeIcon="formData.titleIcon = $event"></icon-select>-->
<!--            <div  :style="{color: `${formData.titleColor}`}" :class="formData.titleIcon"></div>-->
<!--          </el-form-item>-->
          <el-form-item label="页面下边距" >
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="店铺">
            <div >
              <el-button class="addBtn" type="primary" icon="el-icon-circle-plus" plain size="mini" @click="addItem">添加店铺</el-button>
            </div>
          </el-form-item>
          <div>
            <draggable v-model="formData.shopInfoData" :options="{filter:'.notDraggable', preventOnFilter: false, animation:500}" >
            <div v-for="(item,index) in formData.shopInfoData" :key="index" style="margin-top: 8px;">
              <el-row>
                <el-col :span="3" style="text-align: center;padding-left: 5px;">
                  <div class="draggable-focus"><i class=" el-icon-d-caret" ></i></div>
                  <div @click="delItem(index)" class="del-focus" ><i class="delIcon el-icon-delete" ></i></div>
                </el-col>
                <el-col :span="21">
                  <div  class="notDraggable" style="margin: 5px 0;">
                    <el-row >
                      <el-col :span="6" >
                        <img :src="item.imgUrl" style="width: 70px;height: 70px;margin:0px 20px 0px 10px;" >
                      </el-col>
                      <el-col :span="17" :offset="1">
                        <el-form-item label="" label-width="0px" style="padding-top: 8px;width: 100%;">
                          <el-select style="width: 100%;" size="mini" filterable v-model="item.id" placeholder="请选择店铺" @change="onChangeShop($event,item)">
                            <el-option style="width: 100%;" v-for="(item2, index) in shopList" :key="index" :label="item2.name" :value="item2.id"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div >
                </el-col>
              </el-row>
            </div>
            </draggable>

          </div>
        </el-form>
      </div>
    </settingSlot>

  </div>
</template>

<script>

  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import draggable from "vuedraggable";

  import settingSlot from './settingSlot'
  import * as shopinfo from '@/api/mall/shopinfo'

  import iconSelect from '../pages/page-components/iconSelect.vue'
  import MaterialList from '@/components/material/list.vue'

  export default {
    components: { draggable, settingSlot ,iconSelect,MaterialList },
    data() {
      return {
        dialogVisibleGoods: false,
        shopList: [],
        selectionGoodsSpu: [],
        formDataCopy : {
          title: '店铺甄选',
          titleColor: 'red',
          titleIcon: 'cuIcon-shop',
          pageSpacing: 0,
          shopInfoData: [{
            id       : '',
            imgUrl : '',
            name  : '店铺名',
          }]
        },
        formData : {}
      };
    },
    props: {
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

      this.getShopList(); // 加载所有店铺数据
      let that = this;
      if(that.IsEmptyObj(that.showData)){
        that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
      } else {
        that.formData = that.showData
      }
      that.$set(that.componentsList[that.clickComIndex], 'data', this.formData)
      // that.updateData({
      //   componentsList: that.componentsList
      // })
    },
    methods: {
      getShopList() {//获取所有店铺
        shopinfo.getPage().then(response => {
          this.shopList = response.data.data.records
        }).catch(() => {
        })
      },
      onChangeShop(value,itemShop){//更改店铺
        if(value){
          this.shopList.map((item)=>{
            if(item.id==value){
              itemShop.id = item.id
              itemShop.name = item.name
              itemShop.imgUrl = item.imgUrl
            }
          })
        }else{
          itemShop.id = ''
          itemShop.name = ''
          itemShop.imgUrl = ''
        }
      },
      ...mapMutations([
        'updateData'
      ]),
      // 拖动的事件等等=======================================================>
      datadragStart(e) {
        let that = this;
      },
      datadragUpdate(e) {
        e.preventDefault();
      },
      datadragEnd(e) {
        // console.log(e, "拖动结束");
      },
      datadragMove(e, originalEve) {
        return (e.draggedContext.element.text!=='Gold（不可拖动元素）');
      },
      addItem(){
        let that = this;
        that.pushItem()
      },
      pushItem(){
        let that = this;
        if(that.formData.shopInfoData&&that.formData.shopInfoData.length >=10){
          that.$message.error("项目不能超过10条")
          return false;
        }
        this.formData.shopInfoData.push({
          id       : '',
          imgUrl : '',
          name  : '店铺名',
        })
      },
      // 删除项目
      delItem(index){
        let that = this;
        if(that.formData.shopInfoData.length<=1){
          that.$message.error("请至少保留一条项目")
          return false;
        }
        that.$confirm('是否删除该项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type : 'warning'
        }).then(()=>{
          that.$delete(that.formData.shopInfoData, index)
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
    },
    watch: {
      showData: {
        handler(newVal, oldVal) {
          this.formData = newVal ? newVal : this.formData;
        },
        deep: true
      },
      formData(){},
    }
  };
</script>
<style lang='less' scoped>
  @import '../colorui/main.css';
  @import '../colorui/icon.css';

  .el-form-item{
    margin-bottom: 0;
  }

</style>
