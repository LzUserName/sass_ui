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
      <p slot="dialogTitle">轮播图</p>
      <div slot="hint">
      </div>
      <div slot="mainContent">
        <el-form ref="form"  label-width="90px" :model="formData">
<!--          修改样式 -->
<!--          <el-form-item label="轮播样式">-->
<!--            <el-radio-group v-model="formData.swiperType" >-->
<!--              <el-radio :label="'screen-swiper'">全屏限高轮播</el-radio>-->
<!--              <el-radio :label="'card-swiper'">卡片式轮播</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="图片倒角">-->
<!--            <el-radio-group v-model="formData.borderRadius" >-->
<!--              <el-radio :label="'1'">圆角</el-radio>-->
<!--              <el-radio :label="'0'">直角</el-radio>-->
<!--            </el-radio-group>-->
<!--          </el-form-item>-->
          <el-form-item label="轮播点样式">
            <el-radio-group v-model="formData.dotStyle" >
              <el-radio :label="'square-dot'">横条</el-radio>
              <el-radio :label="'round-dot'">圆点</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="总高度">
            <el-input v-model="formData.height" size="mini" type="number" style="margin-top: 5px" placeholder="轮播图片高度">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
<!--          <el-form-item label="页面边距">-->
<!--            <el-input v-model="formData.imageSpacing" size="mini" type="number" style="margin-top: 5px" placeholder="页面边距">-->
<!--              <template slot="append">px</template>-->
<!--            </el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="切换时间">
            <el-input v-model="formData.interval" size="mini" type="number" style="margin-top: 5px" placeholder="自动切换的时间间隔">
              <template slot="append">毫秒</template>
            </el-input>
          </el-form-item>
<!--          <el-form-item label="背景颜色">-->
<!--            <bg-color-select :thememobile="thememobile" :bgValue="formData.background" @onChange="formData.background = $event"></bg-color-select>-->
<!--          </el-form-item>-->
          <el-form-item label="图片">
            <el-button class="addBtn" type="primary" icon="el-icon-circle-plus" plain size="mini" @click="addCarouselItem">添加轮播</el-button>
          </el-form-item>
          <draggable v-model="formData.swiperList" :options="{filter:'.notDraggable', preventOnFilter: false, animation:500}" >
            <div v-for="(item,index) in formData.swiperList" :key="index" style="margin-top: 8px;">
              <el-row>
                <el-col :span="3" style="text-align: center;">
                  <div class="draggable-focus"><i class="el-icon-d-caret"></i></div>
                  <div @click="delCarouselItem(index)" class="del-focus" ><i class="delIcon el-icon-delete" ></i></div>
                </el-col>
                <el-col :span="21"  class="notDraggable">
                  <MaterialList :value="item.imageUrl?[item.imageUrl]:[]"
                                @sureSuccess="item.imageUrl = $event?$event[0]:''"
                                @deleteMaterial="item.imageUrl = ''"
                                type="image" :shopId="shopId"
                                :num=1
                                :divStyle="'width:100%;height:95px;margin-bottom:8px;line-height: 100px;'"></MaterialList>

                </el-col>
              </el-row>
              <div class="notDraggable" style="padding: 0 0 5px 20px">
                <app-page-select-shop  :shopId="shopId" :page="item.pageUrl" @change="item.pageUrl=$event"></app-page-select-shop>
              </div>
            </div>
          </draggable>
        </el-form>
      </div>
    </settingSlot>

    <el-dialog title="背景颜色" :visible.sync="showBgDialog" width="40%"   append-to-body>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in colorList" :key="index" class="tm-select-bg">
          <div @click="onBgColor(item)">
            <div :class="'bg-' + item.name" style="width: 30px;height: 30px;margin: 0 auto;"></div>
            <div style="margin-top: 5px;">{{item.title}}&nbsp;{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';

  import settingSlot from './settingSlot'
  import MaterialList from '@/components/material/list.vue'
  import AppPageSelectShop from '@/components/app-page-select/IndexShop.vue'
  import bgColorSelect from "../pages/page-components/bgColorSelect";

  import draggable from "vuedraggable";
  export default {
    components: { draggable,settingSlot, MaterialList, AppPageSelectShop,bgColorSelect  },
    data() {
      return {
        formDataCopy : {
          swiperType: 'screen-swiper',
          dotStyle: 'square-dot',
          background: 'red',
          height: 100,
          interval: 3000,
          borderRadius: 0,
          imageSpacing: 0,
          swiperList: [{
            id       : Math.random(),
            imageUrl : '',
            imgWidth : 0,
            imgHeight: 0,
            pageUrl  : '',
            itemTitle: ''
          }]
        },
        formData : {
          background:''
        },
        showBgDialog:false,
        colorList: [
          {
            title: '默认',
            name: 'gradual-scarlet',
            color: '#ffffff'
          },{
            title: '嫣红',
            name: 'red',
            color: '#e54d42'
          },
          {
            title: '桔橙',
            name: 'orange',
            color: '#f37b1d'
          },
          {
            title: '明黄',
            name: 'yellow',
            color: '#fbbd08'
          },
          {
            title: '橄榄',
            name: 'olive',
            color: '#8dc63f'
          },
          {
            title: '森绿',
            name: 'green',
            color: '#39b54a'
          },
          {
            title: '天青',
            name: 'cyan',
            color: '#1cbbb4'
          },
          {
            title: '海蓝',
            name: 'blue',
            color: '#0081ff'
          },
          {
            title: '深蓝',
            name: 'darkblue',
            color: '#0055ff'
          },
          {
            title: '姹紫',
            name: 'purple',
            color: '#6739b6'
          },
          {
            title: '木槿',
            name: 'mauve',
            color: '#9c26b0'
          },
          {
            title: '桃粉',
            name: 'pink',
            color: '#e03997'
          },
          {
            title: '棕褐',
            name: 'brown',
            color: '#a5673f'
          },
          {
            title: '玄灰',
            name: 'grey',
            color: '#8799a3'
          },
          {
            title: '草灰',
            name: 'gray',
            color: '#aaaaaa'
          },
          {
            title: '墨黑',
            name: 'black',
            color: '#333333'
          },
          {
            title: '雅白',
            name: 'white',
            color: '#ffffff'
          },
          {
            title: '粉红',
            name: 'gradual-red',
            color: '#ffffff'
          },
          {
            title: '橙红',
            name: 'gradual-orange',
            color: '#ffffff'
          },
          {
            title: '绿青',
            name: 'gradual-green',
            color: '#ffffff'
          },
          {
            title: '紫红',
            name: 'gradual-purple',
            color: '#ffffff'
          },
          {
            title: '粉紫',
            name: 'gradual-pink',
            color: '#ffffff'
          },
          {
            title: '蓝绿',
            name: 'gradual-blue',
            color: '#ffffff'
          },
          {
            title: '黑灰',
            name: 'gradual-gray',
            color: '#ffffff'
          },
          {
            title: '淡蓝',
            name: 'gradual-darkblue',
            color: '#ffffff'
          },

          {
            title: '默认',
            name: 'scarlet',
            color: '#ffffff'
          },
        ],
      };
    },
    props: {
      clientType: [String],
      thememobile : { type: Object | Array },
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

      onBgColor(item) {
        this.formData.background = 'bg-'+item.name;
        this.showBgDialog = false;
      },
      // 添加图片
      addCarouselItem(){
        let that = this;
        that.pushImgs()
      },
      pushImgs(){
        let that = this;
        if(that.formData.swiperList.length >=10){
          that.$message.error("图片不能超过10张")
          return false;
        }
        that.formData.swiperList.push({
          id       : Math.random(),
          imageUrl : '',
          imgWidth : 0,
          imgHeight: 0,
          pageUrl  : '',
          itemTitle: ''
        })
      },
      // 删除轮播图片
      delCarouselItem(index){
        let that = this;
        if(that.formData.swiperList.length<=1){
          that.$message.error("请至少保留一张图片")
          return false;
        }
        that.$confirm('是否删除该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type : 'warning'
        }).then(()=>{
          that.$delete(that.formData.swiperList, index)
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

  .el-form-item{
    margin-bottom: 0!important;
  }
  @import '../colorui/main.css';
</style>
