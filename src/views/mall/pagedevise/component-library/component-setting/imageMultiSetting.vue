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
        <div class="tips-class">提示：图片宽度自适应100%，高度会自动平分图片。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form" label-width="68px" :model="formData">
          <el-form-item label="样式类型">
            <el-radio-group v-model="formData.styleType" size="mini">
              <el-radio-button label="样式一"></el-radio-button>
              <el-radio-button label="样式二"></el-radio-button>
              <el-radio-button label="样式三"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="显示高度" >
                <el-input v-model="formData.height" size="mini" type="number" placeholder="高度" style="margin-top: 5px">
                  <template slot="append">px</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片间隔">
                <el-input v-model="formData.imageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="图片之间的间隔">
                  <template slot="append">px</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="外边距">
                <el-input v-model="formData.pageSpacingOut" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
                  <template slot="append">px</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="内边距">
                <el-input v-model="formData.pageSpacingIn" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
                  <template slot="append" >px</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="组件倒角">
            <el-radio-group v-model="formData.borderRadius">
              <el-radio :label="'1'">圆角</el-radio>
              <el-radio :label="'0'">直角</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="背景颜色">
            <bg-color-select :thememobile="thememobile" :bgValue="formData.background" @onChange="formData.background = $event"></bg-color-select>
          </el-form-item>
          <draggable v-model="formData.imageItems" :options="{animation:500, filter:'.notDraggable', preventOnFilter: false}" >
            <div v-for="(item,index) in formData.imageItems" :key="index" style="margin-top: 8px;" >
              <el-row v-show="index<4||formData.styleType=='样式二'">
                <el-col :span="3" style="text-align: center;margin-top: 10px;" class="canDraggable">
                  <div class="draggable-focus"><i class="el-icon-d-caret"></i></div>
                </el-col>
                <el-col :span="21">
                  <div class="notDraggable">
                    <el-row style="margin-top: 10px;">
                      <el-col :span="12" >
                        <MaterialList
                          :value="item.imageUrl?[item.imageUrl]:[]"
                          @sureSuccess="item.imageUrl = $event?$event[0]:''"
                          @deleteMaterial="item.imageUrl = ''"
                          type="image" shopId="-1"  :num=1 :width="160" :height="80"></MaterialList>
                      </el-col>
                      <el-col :span="12">
                        <div v-if="formData.styleType=='样式一'">
                          <div v-if="index==0">建议尺寸：300x200</div>
                          <div v-else-if="index==1">建议尺寸：410x176</div>
                          <div v-else-if="index==2">建议尺寸：200x176</div>
                          <div v-else-if="index==3">建议尺寸：200x176</div>
                        </div>
                        <div v-else-if="formData.styleType=='样式二'">
                          <div v-if="index==0">建议图片1尺寸：356x176</div>
                          <div v-else-if="index==1">建议尺寸：356x176</div>
                          <div v-else-if="index==2">建议尺寸：234x176</div>
                          <div v-else-if="index==3">建议尺寸：234x176</div>
                          <div v-else-if="index==4">建议尺寸：234x176</div>
                        </div>
                        <div v-else-if="formData.styleType=='样式三'">
                          <div v-if="index==0">建议图片尺寸：300x360</div>
                          <div v-else-if="index==1">建议尺寸：410x114</div>
                          <div v-else-if="index==2">建议尺寸：410x114</div>
                          <div v-else-if="index==3">建议尺寸：410x114</div>
                        </div>
                      </el-col>
                      <el-col :span="24">
                        <div>
                          <div class="notDraggable" style="padding-top: 5px">
                            <app-page-select :is-refresh="true" :clientType="clientType" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select>
                          </div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
            </div>
          </draggable>
        </el-form>
      </div>
    </settingSlot>
    <!--    <p style="display:none">{{getData}}</p>-->
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
          styleType: '样式一',
          height: 275,
          imageSpacing: 0,
          borderRadius: '0',
          pageSpacingIn: 0,
          background: '#FFFFFF',
          pageSpacingOut: 0,
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
      }
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
