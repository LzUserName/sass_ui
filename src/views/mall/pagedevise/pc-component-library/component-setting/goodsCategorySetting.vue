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
      <p slot="dialogTitle">分类标签</p>
      <div slot="hint">
        <div class="tips-class">
          提示：分类标签会自动加载系统已有的分类,左侧为示例数据。点击具体的分类会跳转到分类tab页面的相应分类页签。
        </div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <div style="margin-top: -10px;">
            <el-form-item label="背景颜色">
              <bg-color-select :thememobile="thememobile" :bgValue="formData.background" @onChange="formData.background = $event"></bg-color-select>
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

  import settingSlot from './settingSlot';
  import bgColorSelect from "../pages/page-components/bgColorSelect";

  export default {
    components: { settingSlot, bgColorSelect },
    data() {
      return {
        formDataCopy : {
          background: `red`,
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
