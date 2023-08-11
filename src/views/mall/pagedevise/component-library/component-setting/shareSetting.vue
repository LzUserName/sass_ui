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
      <p slot="dialogTitle">商城首页分享设置</p>
      <div slot="hint">
        <div class="tips-class " >提示：商城首页分享设置。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="图片">
            <MaterialList :value="formData.pageImg?[formData.pageImg]:[]"  @sureSuccess="formData.pageImg = $event?$event[0]:''"
                          @deleteMaterial="formData.pageImg = ''" type="image" shopId="-1"
                          :num=1 :width="170" :height="90"></MaterialList>
          </el-form-item>
          <el-form-item label="分享标题" >
            <el-input v-model="formData.pageName" clearable size="mini" type="text" placeholder="分享标题" style="margin-top: 5px"></el-input>
          </el-form-item>
          <el-form-item label="分享描述">
            <el-input  v-model="formData.pageDesc" clearable size="mini" type="textarea" placeholder="分享描述" style="margin-top: 5px"></el-input>
          </el-form-item>
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

  export default {
    components: { settingSlot, MaterialList  },
    data() {
      return {
        formDataCopy : {
          pageImg: "",
          pageName: '商城',
          pageDesc: '分享一个好东西给你'
        },
        formData : {
          pageImg: ''
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
      that.$emit('changeCompData', 'shareConfig',this.formData)
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
          this.$emit('changeCompData', 'shareConfig', this.formData)
          // that.$delete(that.componentsList[that.clickComIndex].data.itemArray, index)
          // that.updateData({ componentsList: that.componentsList });
        }).catch(()=>{})
      },
      cancel(){
        this.$emit('cancel')
      },
      reset(){
        let that = this;
        that.formData = JSON.parse(JSON.stringify(that.formDataCopy))
        // that.componentsList[that.clickComIndex]['data'] = this.formData;
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
          this.$emit('changeCompData', 'shareConfig',this.formData)
        },
        deep: true
      },
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
