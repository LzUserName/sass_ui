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
      <p slot="dialogTitle">通知</p>
      <div slot="hint">
        图片建议宽度 40 * 24 。
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="切换时间">
            <el-input v-model="formData.interval" size="mini" type="number" style="margin-top: 5px" placeholder="自动切换的时间间隔">
              <template slot="append">毫秒</template>
            </el-input>
          </el-form-item>
          <el-form-item label="页面下边距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.textColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.textColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="公告">
            <div >
              <el-button class="addBtn" type="primary" icon="el-icon-circle-plus" plain size="mini" @click="addItem">添加公告</el-button>
            </div>
          </el-form-item>
          <div>
            <draggable v-model="formData.noticeList" :options="{filter:'.notDraggable', preventOnFilter: false, animation:500}" >
              <div v-for="(item,index) in formData.noticeList" :key="index" style="margin-top: 8px;">
                <el-row>
                  <el-col :span="3" style="text-align: center;">
                    <div class="draggable-focus"><i class=" el-icon-d-caret" ></i></div>
                    <div @click="delItem(index)" class="del-focus" ><i class="delIcon el-icon-delete" ></i></div>
                  </el-col>
                  <el-col :span="21"  class="notDraggable">

                    <el-form-item label="通知Icon" label-width="70px">
                      <MaterialList
                        :value="item.imageUrl?[item.imageUrl]:[]"
                        @sureSuccess="item.imageUrl = $event?$event[0]:''"
                        @deleteMaterial="item.imageUrl = ''"
                        type="image" :shopId="shopId"  :num=1 :width="80" :height="48"></MaterialList>
                      <!--                      <el-input v-model="item.tag" size="mini" placeholder="通知标签类型"></el-input>-->
                    </el-form-item>
                    <el-form-item label="通知内容" label-width="70px">
                      <el-input v-model="item.content" type="textarea" size="mini" placeholder="通知内容" ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="notDraggable" style="padding: 10px 0 5px 20px">
                  <app-page-select-shop :shopId="shopId" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select-shop>
                </div>
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
import MaterialList from '@/components/material/list.vue'
import AppPageSelectShop from '@/components/app-page-select/IndexShop.vue'

export default {
  components: { draggable, settingSlot, MaterialList, AppPageSelectShop  },
  data() {
    return {
      formDataCopy : {
        height: 35,
        interval: 5000,
        pageSpacing: 0,
        textColor: '#333333',
        noticeList: [{
          id       : Math.random(),
          imageUrl : '',
          imgWidth : 0,
          imgHeight: 0,
          pageUrl  : '',
          content  : '',
          tag: '通知'
        }]
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
    }
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
    // that.updateData({
    //   componentsList: that.componentsList
    // })
  },
  methods: {
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
    // 添加项目
    addItem(){
      let that = this;
      that.pushItem()
    },
    pushItem(){
      let that = this;
      if(that.formData.noticeList.length >=10){
        that.$message.error("项目不能超过10条")
        return false;
      }
      that.formData.noticeList.push({
        id       : Math.random(),
        imageUrl : '',
        imgWidth : 0,
        imgHeight: 0,
        pageUrl  : '',
        content  : '',
        tag: ''
      })
    },
    // 删除项目
    delItem(index){
      let that = this;
      if(that.formData.noticeList.length<=1){
        that.$message.error("请至少保留一条项目")
        return false;
      }
      that.$confirm('是否删除该项目?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText : '取消',
        type : 'warning'
      }).then(()=>{
        that.$delete(that.formData.noticeList, index)
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
    }
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
.el-form-item {
  margin-bottom: 0;
}
</style>
