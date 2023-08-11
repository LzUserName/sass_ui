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
      <p slot="dialogTitle">首页顶部导航栏设置</p>
      <div slot="hint">
        <div class="tips-class">提示：顶部导航栏设置。</div>
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
          <el-form-item label="标题" >
            <el-input v-model="formData.title" size="mini" placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item label="文字颜色">
            <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
              <el-input v-model="formData.titleColor" size="small" style="margin-top: 5px">
                <template slot="append">
                  <el-color-picker size="mini" v-model="formData.titleColor"></el-color-picker>
                </template>
              </el-input>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="左侧图片">
            <el-radio-group v-model="formData.leftImageShow">
              <el-radio label="0">关闭</el-radio>
              <el-radio label="1">开启</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="图片尺寸" v-show="formData.leftImageShow==1">
            <div class="text-black">建议宽高为110px*40px</div>
          </el-form-item>
          <el-form-item label="图片" v-show="formData.leftImageShow==1">
            <MaterialList
              :value="formData.leftImageUrl?[formData.leftImageUrl]:[]"
              @sureSuccess="formData.leftImageUrl = $event?$event[0]:''"
              @deleteMaterial="formData.leftImageUrl = ''"
              type="image" shopId="-1" :num=1 :width="80" :height="48"></MaterialList>
          </el-form-item>
          <el-form-item label="图片宽度" v-show="formData.leftImageShow==1">
            <el-input v-model="formData.leftImageWidth" size="mini"  type="number" placeholder="宽度">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="图片高度" v-show="formData.leftImageShow==1">
            <el-input v-model="formData.leftImageHeight" size="mini" type="number" placeholder="高度">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="左边距" v-show="formData.leftImageShow==1">
            <el-input v-model="formData.leftImageMarginLeft" size="mini" type="number" min="0" style="margin-top: 5px" placeholder="图片左边距">
              <template slot="append" >px</template>
            </el-input>
          </el-form-item>

          <el-form-item label="跳转链接"  v-show="formData.leftImageShow==1">
          </el-form-item>
          <div style="padding: 0 0 5px 20px"  v-if="formData.leftImageShow==1">
            <app-page-select :clientType="clientType" :page="formData.leftImagePageUrl" @change="formData.leftImagePageUrl=$event"></app-page-select>
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

  export default {
    components: { settingSlot, MaterialList,AppPageSelect  },
    data() {
      return {
        formDataCopy : {
          leftImageShow: "0",
          leftImagePageUrl: "",
          leftImageUrl: "",
          leftImageHeight: 40,
          leftImageWidth: 110,
          leftImageMarginLeft: 10,
          title: '首页',
          titleColor: '#FFFFFF',
        },
        formData : {
          leftImageShow: "0",
          leftImagePageUrl: "",
          leftImageUrl: "",
          leftImageHeight: 40,
          leftImageWidth: 110,
          leftImageMarginLeft: 10,
          title: '首页',
          titleColor: '#FFFFFF',
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
      that.$emit('changeCompData', 'topNavConfig',this.formData)
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
          this.$emit('changeCompData', 'topNavConfig', this.formData)
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
          this.$emit('changeCompData', 'topNavConfig',this.formData)
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
