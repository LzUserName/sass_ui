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
      <p slot="dialogTitle">首页导航标签</p>
      <div slot="hint">
        <div class="padding-top-xs">提示：店铺首页分类页签组件。</div>
      </div>
      <div slot="mainContent" style="height: 50px;">
        <el-form ref="form"  label-width="90px" :model="formData">
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
        </el-form>
      </div>
    </settingSlot>
  </div>
</template>

<script>

  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import settingSlot from './settingSlot'
  import MaterialList from '@/components/material/list.vue'
  import AppPageSelectShop from '@/components/app-page-select/IndexShop.vue'
  import draggable from "vuedraggable";

  export default {
    components: { draggable,settingSlot, MaterialList, AppPageSelectShop  },
    data() {
      return {
        formDataCopy : {
          rowNum: 4,
          textColor: '#e54d42',
          pageSpacing: 0
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
      // 更改每行个数
      rowNumChange(){
        if(this.formData.rowNum===4){
          if(this.formData.navButtons.length===5){
            this.formData.navButtons.splice(4,1)
          }
        }else{
          if(this.formData.navButtons.length===4){
            this.formData.navButtons.push({
              id      : Math.random(),
              imageUrl: '',
              pageUrl : '',
              navName : '标题5',
            })
          }
        }
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
  .el-form-item{
    margin-bottom: 0!important;
  }
</style>
