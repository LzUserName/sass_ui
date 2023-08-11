<!--
  - Copyright (C) 2018-2021
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 多种样式图片展示 -->

<template>
    <div class="imageMultiComponent" v-if="setData.styleType">
      <div v-show="setData.styleType==='样式一'"
           :style="{ margin: `${setData.pageSpacingOut}px`, padding: `${setData.pageSpacingIn}px`, backgroundColor: setData.background,borderRadius: `${setData.borderRadius==1?10:0}px`,}"
           :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="flex">
<!--          左边-->
          <div class="flex-sub flex "
               :style="{height: `${(Number(setData.height)+Number(setData.imageSpacing))}px`,
               margin:`${setData.imageSpacing}px`,marginRight:`${setData.imageSpacing/2}px`,marginBottom:`0px`, }">
            <div class="image-multi-left"
                 :style="{height: `${(Number(setData.height)+Number(setData.imageSpacing))}px`,
                    background: setData.imageItems[0].imageUrl?`url(${setData.imageItems[0].imageUrl}) round`:''}" ></div>
          </div>
<!--          右边-->
          <div class="flex-sub"
               :style="{margin:`${setData.imageSpacing}px`,marginLeft:`${setData.imageSpacing/2}px`, }">
            <div class="image-multi-right2"
                 :style="{height: `${setData.height/2}px`,
                    background: setData.imageItems[1].imageUrl?`url(${setData.imageItems[1].imageUrl}) round`:''}" ></div>
            <div class="flex image-multi-right"
                 :style="{marginTop:`${setData.imageSpacing}px`, }">
              <div class="flex-sub" :style="{marginRight: `${setData.imageSpacing/2}px`,}">
                <div class="image-multi-class"
                     :style="{height: `${setData.height/2}px`,
                        background: setData.imageItems[2].imageUrl?`url(${setData.imageItems[2].imageUrl}) round`:''}" ></div>
              </div>
              <div class="flex-sub" :style="{marginLeft: `${setData.imageSpacing/2}px`,}">
                <div class="image-multi-class"
                     :style="{height: `${setData.height/2}px`,
                        background: setData.imageItems[3].imageUrl?`url(${setData.imageItems[3].imageUrl}) round`:''}" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-show="setData.styleType==='样式二'"
             :style="{ margin: `${setData.pageSpacingOut}px`, padding: `${setData.pageSpacingIn}px`, backgroundColor: setData.background,borderRadius: `${setData.borderRadius==1?10:0}px`,}"
             :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="flex ">
          <div class="flex-sub"
               :style="{height: `${(Number(setData.height))/2}px`,
               marginTop:`${setData.imageSpacing}px`,
               marginLeft:`${setData.imageSpacing}px`,
               marginRight:`${setData.imageSpacing/2}px`,
               marginBottom:`${setData.imageSpacing/2}px`, }">
            <div class="image-multi-class"
                 :style="{height: `${setData.height/2}px`,background: setData.imageItems[0].imageUrl?`url(${setData.imageItems[0].imageUrl}) round`:''}" ></div>
          </div>
          <div class="flex-sub"
               :style="{height: `${(Number(setData.height))/2}px`,
               marginTop:`${setData.imageSpacing}px`,
               marginRight:`${setData.imageSpacing}px`,
               marginLeft:`${setData.imageSpacing/2}px`,
               marginBottom:`${setData.imageSpacing/2}px`, }">
            <div class="image-multi-class"
                 :style="{height: `${setData.height/2}px`,background: setData.imageItems[1].imageUrl?`url(${setData.imageItems[1].imageUrl}) round`:''}" ></div>
          </div>
        </div>
        <div class="flex">
          <div class="flex-sub"
               :style="{height: `${(Number(setData.height))/2}px`,
               marginTop:`${setData.imageSpacing/2}px`,
               marginRight:`${setData.imageSpacing/2}px`,
               marginLeft:`${setData.imageSpacing}px`,
               marginBottom:`${setData.imageSpacing}px`,}">
            <div class="image-multi-class"
                 :style="{height: `${setData.height/2}px`,background: setData.imageItems[2].imageUrl?`url(${setData.imageItems[2].imageUrl}) round`:''}" ></div>
          </div>
          <div class="flex-sub"
               :style="{height: `${(Number(setData.height))/2}px`,
               marginTop:`${setData.imageSpacing/2}px`,
               marginRight:`${setData.imageSpacing/2}px`,
               marginLeft:`${setData.imageSpacing/2}px`,
               marginBottom:`${setData.imageSpacing}px`,}">
            <div class="image-multi-class"
                 :style="{height: `${setData.height/2}px`,background: setData.imageItems[3].imageUrl?`url(${setData.imageItems[3].imageUrl}) round`:''}" ></div>
          </div>
          <div class="flex-sub"
               :style="{height: `${(Number(setData.height))/2}px`,
               marginTop:`${setData.imageSpacing/2}px`,
               marginRight:`${setData.imageSpacing}px`,
               marginLeft:`${setData.imageSpacing/2}px`,
               marginBottom:`${setData.imageSpacing}px`,}">
            <div class="image-multi-class"
                 :style="{height: `${setData.height/2}px`,background: setData.imageItems[4].imageUrl?`url(${setData.imageItems[4].imageUrl}) round`:''}" ></div>
          </div>
        </div>
      </div>

      <div v-show="setData.styleType==='样式三'"
         :style="{ margin: `${setData.pageSpacingOut}px`, padding: `${setData.pageSpacingIn}px`, backgroundColor: setData.background,borderRadius: `${setData.borderRadius==1?10:0}px`,}"
         :class="setData.background && setData.background.indexOf('bg-') != -1 ? setData.background : '' ">
        <div class="flex">
          <!--左边-->
          <div class="flex-sub flex  "
               :style="{height: `${(Number(setData.height)+Number(setData.imageSpacing))}px`,
               marginTop:`${setData.imageSpacing}px`,
               marginRight:`0px`,
               paddingRight:`${setData.imageSpacing/2}px`,
               marginLeft:`${setData.imageSpacing}px`,
               marginBottom:`${setData.imageSpacing}px`,}">
            <div class="image-multi-left"
                 :style="{height: `${(Number(setData.height)+Number(setData.imageSpacing))}px`,
                    background: setData.imageItems[0].imageUrl?`url(${setData.imageItems[0].imageUrl}) round`:''}" ></div>
          </div>
          <!--右边-->
          <div class="flex-sub"
               :style="{height: `${setData.height}px`,
                    marginTop:`${setData.imageSpacing}px`,
                    marginRight:`${setData.imageSpacing}px`,
                    marginLeft:`${setData.imageSpacing/2}px`,
                    marginBottom:`${setData.imageSpacing}px`,}">
            <div class="image-multi-right2"
                 :style="{height: `${setData.height/3}px`,
                    marginBottom:`${setData.imageSpacing/2}px`,
                    background: setData.imageItems[1].imageUrl?`url(${setData.imageItems[1].imageUrl}) round`:''}" ></div>
            <div class="image-multi-right2"
                 :style="{height: `${setData.height/3}px`,
                   marginTop:`${setData.imageSpacing/2}px`,
                   marginBottom:`${setData.imageSpacing/2}px`,
                    background: setData.imageItems[2].imageUrl?`url(${setData.imageItems[2].imageUrl}) round`:''}" ></div>
            <div class="image-multi-right2"
                 :style="{height: `${setData.height/3}px`,
                   marginTop:`${setData.imageSpacing/2}px`,
                    background: setData.imageItems[3].imageUrl?`url(${setData.imageItems[3].imageUrl}) round`:''}" ></div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
import placeholderImg from "../pages/page-components/placeholderImg";

export default {
    data() {
        return {
          defaultImage: require('../assets/images/icon/img_pic@2x.png')
        };
    },
    components: { placeholderImg },
    props: {
        theme : { type: Object | Array },
        setData : {
          type: Object,
          default: () => {
            return {
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
            };
          }
        },
        cId     : { type: Number },
        noEditor: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        ...mapState({
            componentsList: state => state.divpage.componentsList,
        })
    },
    created() {},
    mounted() {},
    methods: {
        ...mapMutations([
            'updateData'
        ]),
    },
    watch:{
        componentsList(newVal, oldVal){          //添加的时候触发（解决没有移动的时候不emit数据）
            let that = this;
            that.updateData({componentsList: that.componentsList})
        },
        setData(){}
    }
};
</script>
<style lang='less' scoped>
@import '../colorui/main.css';
@import '../colorui/icon.css';
.imageMultiComponent{
    position: relative;

  .image-multi-class{
    background: url("../assets/images/icon/img_pic@2x.png") round;
    width: 100%;
  }

  .image-multi-left{
    background: url("../assets/images/icon/img_pic@2x.png") round;
    width: 80%;
  }

  .image-multi-right2{
    background: url("../assets/images/icon/img_pic@2x.png") round;
    width: 120%;
  	margin-left: -35px !important;
  }
  .image-multi-right{
    background: url("") round;
    width: 120%;
  	margin-left: -35px !important;
  }

    .imgBlock{
        text-align: center;
        .el-image{
            display: block;
            width: 100%;
            .el-image__error{
                line-height: 120px;
            }
        }
    }
    .noEditor{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0);
        z-index: 201;
    }
}
</style>
