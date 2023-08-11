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
      <p slot="dialogTitle">首页顶部标题设置</p>
      <div slot="hint">
        <div class="tips-class " >提示：动态设置最上方文字及跳转。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="40px" :model="formData">
          <div v-for="(item,index) in formData.titles" :key="index" style="margin-top: 10px">
            <el-form-item label="名称">
                <el-input v-model="item.navName" size="mini" placeholder="名称" ></el-input>
            </el-form-item>
            <div style="margin-top: -5px">
              <app-page-select :clientType="clientType" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select>
            </div>
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
  import MaterialList from '@/components/material/list.vue'
  import AppPageSelect from '@/components/app-page-select/Index.vue'
  import draggable from "vuedraggable";


  export default {
    components: { draggable,settingSlot, MaterialList, AppPageSelect  },
    data() {
      return {
        formDataCopy : {
          titles: [
            {
              id       : Math.random(),
              pageUrl : '/pages/home/index',
              navName : '首页',
            },{
              id       : Math.random(),
              pageUrl : '/pages/bargain/bargain-list/index',
              navName : '全民砍价',
            },{
              id       : Math.random(),
              pageUrl : '/pages/seckill/seckill-list/index',
              navName : '限时秒杀',
            },{
              id       : Math.random(),
              pageUrl : '/pages/groupon/groupon-list/index',
              navName : '一起拼团',
            },{
              id       : Math.random(),
              pageUrl : '/pages/article/article-list/index',
              navName : '新闻资讯',
            }]
        },
        formData : {}
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
      that.$emit('changeCompData', 'indexTitleConfig',this.formData)
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
          this.$emit('changeCompData', 'indexTitleConfig', this.formData)
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
