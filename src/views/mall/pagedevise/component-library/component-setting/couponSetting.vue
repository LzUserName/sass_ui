<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!--商品分类标签-->
<template>
  <div class="pageSetting">
    <settingSlot @confirm="confirm" @cancel="cancel" @reset="reset" :showReset="true">
      <p slot="dialogTitle">优惠券</p>
      <div slot="hint">
        <div class="tips-class">
          提示：优惠券会自动获取{{ formData.loadNumber }}张系统已有的优惠券,左侧为示例数据。点击单个可领取优惠券，点击更多会跳转至优惠券列表。有背景图优先显示背景图。
        </div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="110px" :model="formData">
          <div style="margin-top: -10px;">
            <el-form-item label="页面下边距">
              <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面下边距">
                <template slot="append">px</template>
              </el-input>
            </el-form-item>
            <el-form-item label="背景颜色">
              <bg-color-select :thememobile="thememobile" :bgValue="formData.background" @onChange="formData.background = $event"></bg-color-select>
            </el-form-item>
            <el-form-item label="代金券颜色">
              <bg-color-select :thememobile="thememobile" :bgValue="formData.themeColor" @onChange="formData.themeColor = $event"></bg-color-select>
            </el-form-item>
            <el-form-item label="代金券文字颜色">
              <el-input v-model="formData.textColor1" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.textColor1"></el-color-picker>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="代金券背景">
              <MaterialList
                :value="formData.couponImage1?[formData.couponImage1]:[]"
                @sureSuccess="formData.couponImage1 = $event?$event[0]:''"
                @deleteMaterial="formData.couponImage1 = ''"
                type="image" shopId="-1"  :num=1 :width="127" :height="64"></MaterialList>
            </el-form-item>
            <el-form-item label="折扣券颜色">
              <bg-color-select :thememobile="thememobile" :bgValue="formData.themeColor2" @onChange="formData.themeColor2 = $event"></bg-color-select>
            </el-form-item>
            <el-form-item label="折扣券文字颜色">
              <el-input v-model="formData.textColor2" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.textColor2"></el-color-picker>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="折扣券背景">
              <MaterialList
                :value="formData.couponImage2?[formData.couponImage2]:[]"
                @sureSuccess="formData.couponImage2 = $event?$event[0]:''"
                @deleteMaterial="formData.couponImage2 = ''"
                type="image" shopId="-1"  :num=1 :width="127" :height="64"></MaterialList>
            </el-form-item>
            <el-form-item label="加载数量">
              <el-input v-model="formData.loadNumber" size="mini" type="number" placeholder="优惠券加载数量">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </settingSlot>
<!--    <p style="display:none">{{getData}}</p>-->
  </div>
</template>

<script>
  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import settingSlot from './settingSlot'
  import bgColorSelect from "../pages/page-components/bgColorSelect";
  import MaterialList from '@/components/material/list.vue'

  export default {
    components: { settingSlot, bgColorSelect, MaterialList },
    data() {
      return {
        formDataCopy : {
          background: ``,
          themeColor: `bg-gradual-scarlet`,
          textColor1: `#ffffff`,
          themeColor2: `bg-gradual-scarlet`,
          textColor2: `#ffffff`,
          couponImage1: ``,
          couponImage2: ``,
          loadNumber: 3,
          pageSpacing: 0,
        },
        formData : {}
      };
    },
    props: {
      thememobile : { type: Object | Array },
      showData:{
        type: Object,
        default: ()=> {}
      },
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
      showData: {
        handler(newVal, oldVal) {
          this.formData = newVal ? newVal : this.formData;
        },
        deep: true
      },
      thememobile(){},
    }
  };
</script>
<style lang='less' scoped>

  .el-form-item{
    margin-bottom: 0;
  }
</style>
