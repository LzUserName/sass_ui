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
      <p slot="dialogTitle">标题</p>
      <div slot="hint">
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="标题文字">
            <el-input v-model="formData.title" type="textarea"  size="mini" style="margin-top: 5px" placeholder="标题文字">
            </el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input v-model="formData.fontSize" type="number" size="mini" style="margin-top: 5px" placeholder="文字大小">
            </el-input>
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.color" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.color"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="文字高度">
            <el-input v-model="formData.height"  type="number" size="mini" style="margin-top: 5px" placeholder="文字高度">
            </el-input>
          </el-form-item>
          <el-form-item label="跳转链接" >
          </el-form-item>
          <div style="padding: 0 0 5px 20px">
            <app-page-select :clientType="clientType" :page="formData.pageUrl" @change="formData.pageUrl=$event"></app-page-select>
          </div>
          <el-form-item label="页面间距">
            <el-input v-model="formData.pageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="与下面元素的间隔">
              <template slot="append">px</template>
            </el-input>
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
  import AppPageSelect from '@/components/app-page-select/Index.vue'

  export default {
    components: { settingSlot, MaterialList, AppPageSelect  },
    data() {
      return {
        formDataCopy : {
          height: 35,
          fontSize: '16',
          color: '#000000',
          pageUrl: '',
          title: '标题',
          pageSpacing: 0
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
      that.$set(that.componentsList[that.clickComIndex], 'data', this.formData)
      // that.updateData({
      //   componentsList: that.componentsList
      // })
    },
    methods: {
      ...mapMutations([
        'updateData'
      ]),

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
        if(that.formData.swiperList.length<=1){
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
  .el-form-item{
    margin-bottom: 0;
  }
</style>
