<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="compSetting">
    <settingSlot @confirm="confirm" @cancel="cancel" @reset="reset" :showReset="true">
      <p slot="dialogTitle">多图</p>
      <div slot="hint">
        <div class="tips-class">提示：1行5张图片。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form" label-width="88px" :model="formData">
          <el-form-item label="背景图片">
            <MaterialList :value="formData.backgroundImg?[formData.backgroundImg]:[]"
                          @sureSuccess="formData.backgroundImg = $event?$event[0]:''"
                          @deleteMaterial="formData.backgroundImg = ''"
                          type="image" shopId="-1"
                          :divStyle="'width:100%;margin-bottom:0px;height:100px;line-height: 100px;'"
                          :num=1></MaterialList>
          </el-form-item>
          <el-form-item label="组件高度" >
            <el-input v-model="formData.height" size="mini" type="number" placeholder="高度" style="margin-top: 5px">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="图片行数">
            <el-radio-group v-model="formData.rowNum" @change="rowNumChange">
              <el-radio :label="5">一行</el-radio>
              <el-radio :label="10">两行</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片高度" >
            <el-input v-model="formData.imageHeight" size="mini" type="number" placeholder="高度" style="margin-top: 5px">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="页面下边距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <draggable v-model="formData.imageItems" :options="{animation:500, filter:'.notDraggable', preventOnFilter: false}" >
            <div v-for="(item,index) in formData.imageItems" :key="index" style="margin-top: 8px;" class="border">
              <el-row >
                <el-col :span="3" style="text-align: center;margin-top: 10px;" class="canDraggable">
                  <div class="draggable-focus"><i class="el-icon-d-caret"></i></div>
                </el-col>
                <el-col :span="21">
                  <div class="notDraggable ">
                    <el-row style="margin-top: 10px;" >
                      <el-col :span="5" >
                        <MaterialList
                          :value="item.imageUrl?[item.imageUrl]:[]"
                          @sureSuccess="item.imageUrl = $event?$event[0]:''"
                          @deleteMaterial="item.imageUrl = ''"
                          type="image" shopId="-1"  :num=1 :width="70" :height="70"></MaterialList>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
              <div class="notDraggable " style="padding: 10px 0 5px 20px">
                <app-page-select  :isRefresh="true" :clientType="clientType" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select>
              </div>
            </div>
          </draggable>
        </el-form>
      </div>
    </settingSlot>
  </div>
</template>

<script>

  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import settingSlot from './settingSlot'
  import MaterialList from '@/components/material/list.vue'
  import AppPageSelect from '@/components/app-page-select/Index.vue'
  import bgColorSelect from "../pages/page-components/bgColorSelect";
  import draggable from "vuedraggable";

  export default {
    components: { draggable,settingSlot, MaterialList, AppPageSelect, bgColorSelect  },
    data() {
      return {
        formDataCopy : {
          backgroundImg: '',
          height: 408,
          rowNum: 5,
          imageHeight: 180,
          pageSpacing: 0,
          imageItems: [{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },]
        },
        formData : {
          backgroundImg: '',
          height: 408,
          rowNum: 10,
          imageHeight: 180,
          pageSpacing: 0,
          imageItems: [{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },{
            id       : Math.random(),
            imageUrl : '',
            pageUrl : '',
          },]
        }
      };
    },
    props: {
      thememobile : { type: Object | Array },
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
      // that.updateData({
      //   componentsList: that.componentsList
      // })
    },
    methods: {
      ...mapMutations([
        'updateData'
      ]),
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
      // 更改每行个数
      rowNumChange(){
        if(this.formData.rowNum===5){
          if(this.formData.imageItems.length!==5){
            this.formData.imageItems.splice(5,5)
          }
        }else{
          if(this.formData.imageItems.length!==10){
            for (let i = 0; i < 5; i++) {
              this.formData.imageItems.push({
                id      : Math.random(),
                imageUrl: '',
                pageUrl : '',
              })
            }
          }
        }
      },
    },
    watch: {
      shopId(){},
      showData: {
        handler(newVal, oldVal) {
          this.formData = newVal ? newVal : this.formData;
        },
        deep: true
      },

      thememobile(){},
      clientType(){}
    }
  };
</script>
<style lang='less' scoped>
  .compSetting{
    /deep/ .el-form .el-form-item{
      margin-bottom: 8px;
    }

  }
  .el-form-item{
    margin-bottom: 0;
  }
</style>
