<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 注：此页面为商铺首页自定义装修页面，所有的数据和页面都自动加上了店铺ID查询，其他基本与首页装修差不多，仅减少 店铺组件、分类组件、搜索组件。 -->
<!-- 注：如需开发新的组件请参考 搜索组件（searchSetting.vue和search.vue)两个文件或其他已有的组件。 -->
<!-- 组件开发需要有显示组件 components 目录下和组件设置 components-setting 目录下-->
<template>
  <div class="execution">
    <basic-container>
      <div class="div-page-index">
        <el-row class="content " style="width: 100%;">
          <!-- 左侧组件 -->
          <el-col :span="5" class="left-class">
            <div>
              <div style="font-size: 15px;">
                店铺:<span style="margin-left: 10px;"><el-tag>{{initPageData.pageName}}</el-tag> </span>
              </div>
<!--              店铺:-->
<!--              <el-select style="width: 76%;" v-model="initPageData.shopId" placeholder="请选择" size="mini" @change="shopChange">-->
<!--                <el-option v-for="(item, index) in shopList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--              </el-select>-->
            </div>
            <div style="text-align: center; padding: 5px">
              <div>组件库</div>
            </div>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="基础组件" name="imageModule">
                <el-row :gutter="10">
                  <el-col :span="8" v-for="item in addCompBtns.baseModule" :key="item.name"
                          style="margin-top: 5px; text-align: center;">
                    <div style="background: #f7f7f7; padding: 10px; border-radius: 10px;" @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                      <img :src="item.img" style="width: 26px; height: 26px; opacity: 0.8;">
                      <p>{{item.name}}</p>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!--  待开发 -->
              <el-collapse-item title="营销模块" name="functionModule">
                <el-row :gutter="20">
                  <el-col :span="8" v-for="item in addCompBtns.functionModule" :key="item.name"
                          style="margin-top: 10px; text-align: center;">
                    <div style="background: #f7f7f7; padding: 10px; border-radius: 10px;" @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                      <img :src="item.img" style="width: 26px; height: 26px; opacity: 0.8;">
                      <p>{{item.name}}</p>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <el-button type="primary" style="width: 100%;" size="small"  @click.stop="handleSave()">保存</el-button>
          </el-col>
          <!-- 中间页面 -->
          <el-col  :span="9" class="showContent" >
            <div class="pageContent" :style="{background: pageSetData?pageSetData.bgColor:''}" >
              <div class="pageTopBlock "
                   :style="{backgroundColor: initPageData.pageComponent.backgroundColor
                   && initPageData.pageComponent.backgroundColor.indexOf('bg-') == -1 ?initPageData.pageComponent.backgroundColor:''}"
                   :class="[initPageData.pageComponent.backgroundColor] "
                   style="color: #ffffff;font-size: 16px;">
                <p class="title" :style="{color: initPageData.pageComponent.textColor}">{{initPageData.pageName}}</p>
                <el-button size="small" @click="onPageSet" title="页面设置" style="font-size:18px;right: -50px;position: absolute" circle icon="el-icon-s-tools" ></el-button>
              </div>
              <div class="componentsList" :style="{overflowY: showModal?'hidden':'auto'}"  ref="componentsDiv">
                <draggable v-model="componentsList" @start="datadragStart" @update="datadragUpdate" @end="datadragEnd" :disabled="!enabled" :move="datadragMove" :options="{animation:500}" >
                  <transition-group>
                    <!-- <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" @mouseenter="mouseEnter($event, index, item.componentName)"> -->
                    <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item " :class="index==clickComIndex?'focus-class':''" :ref="'drag-item-'+item.id"
                         @click="showSetting(index, item.id, item.componentName)">
                      <component :is="item.componentName" :setData="item.data" :config="item.config" :cId="item.id"
                                 :thememobile="thememobile"  :theme="thememobile" :shopId="initPageData.shopId"></component>
                      <div v-if="showSetBtn && index === clickComIndex&& clickComIndex!=null" class="funBlock">
                        <i class="icon el-icon-arrow-up" @click="componentSort('up')"></i>
                        <i class="icon el-icon-arrow-down" @click="componentSort('dowm')"></i>
                        <i class="icon el-icon-delete" @click="deleteComponent"></i>
                      </div>
                    </div>
                  </transition-group>
                </draggable>
                <div class="cu-load bg-gray over"></div>
              </div>
            </div>
          </el-col>
          <!-- 右侧组件设置 -->
          <el-col  :span="8" >
            <div v-if="showSetBlock" class="settingBlock" ref="settingBlock">
              <component :shopId="id" :is="currentComType+'Setting'" :showData="showData"
                         :config="comConfig" @cancel="settingCancel" @confirm="settingConfirm"  :thememobile="thememobile" :theme="thememobile"
                         @setPosition="modifySetPosition(settingPosit.top)">
              </component>
            </div>
            <div v-if="showPageSet" style="margin-left: 2px;margin-top: 2px;">
              <settingSlot @confirm="confirmPageSet" @cancel="showPageSet=false" :showReset="false">
                <p slot="dialogTitle">页面设置</p>
                <div slot="hint">
                  <div class="padding-top-xs">提示：店铺首页页面基本设置。</div>
                </div>
                <div slot="mainContent" style="height: 50px;">
                  <el-form ref="form" labelPosition="top" label-width="90px" :model="initPageData.pageComponent">
                    <el-form-item label="菜单背景颜色">
                      <bg-color-select :thememobile="thememobile" :bgValue="initPageData.pageComponent.backgroundColor"
                                       @onChange="changeShopBg"></bg-color-select>
                    </el-form-item>
                    <el-form-item label="菜单文字颜色">
                      <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                        <el-input v-model="initPageData.pageComponent.textColor" size="small" style="margin-top: 5px">
                          <template slot="append">
                            <el-color-picker size="mini" v-model="initPageData.pageComponent.textColor"></el-color-picker>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                    <el-form-item label="底部tab文字颜色">
                      <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                        <el-input v-model="initPageData.pageComponent.tabTextColor" size="small" style="margin-top: 5px">
                          <template slot="append">
                            <el-color-picker size="mini" v-model="initPageData.pageComponent.tabTextColor"></el-color-picker>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-form>
                </div>
              </settingSlot>
            </div>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>

  // 接口地址
  import * as shopinfo from '@/api/mall/shopinfo'
  import {getPage, getPageByShop, addObj, putObj, delObj} from '@/api/mall/pagedevise'
  import {getObj2} from '@/api/mall/thememobile'
  // 商城页面装修必须引入 ----- 开始 -----
  // 商城装修为单独模块，可提供按需购买方式
  // 全局搜【todo divpageShop】可查看所有关联到的文件
  import Vue from 'vue'
  import '@/views/mall/pagedevise/component-library/plugins/index';
  // 图片轮播组件 swiper组件 npm i vue-awesome-swiper
  import VueAwesomeSwiper from 'vue-awesome-swiper';
  // import 'swiper/dist/css/swiper.css';
  Vue.use(VueAwesomeSwiper, /* { default global options } */);
  import '@/views/mall/pagedevise/component-library/directive'//自定义事件引入
  import '@/views/mall/pagedevise/component-library/libs/utils';//引入property 方法
  import '../assets/iconfont/iconfont.css';// 字体
  import VueClipboard from 'vue-clipboard2'; // 剪贴板组件
  Vue.use(VueClipboard)
  // 商城页面装修必须引入 ----- 结束 -----

  import draggable from "vuedraggable";
  import { mapState , mapGetters , mapMutations , mapActions } from 'vuex';
  // 组件
  import swiperComponent from "../components/swiper.vue";
  import imageComponent from "../components/image.vue";
  import settingSlot from '../component-setting/settingSlot'
  import bgColorSelect from "../pages/page-components/bgColorSelect";


  // 组件设置
  import pageSetting from "../component-setting/pageSetting.vue";

  import swiperSetting from "../component-setting/swiperSetting.vue";
  import imageSetting from "../component-setting/imageSetting.vue";

  import navButtonComponent from "../components/navButton.vue";
  import navButtonSetting from "../component-setting/navButtonSetting.vue";
  import noticeComponent from "../components/notice.vue";
  import noticeSetting from "../component-setting/noticeSetting.vue";
  import titleTextComponent from "../components/titleText.vue";
  import titleTextSetting from "../component-setting/titleTextSetting.vue";

  import goodsComponent from "../components/goods.vue";
  import goodsSetting from "../component-setting/goodsSetting.vue";
  import shopInfoComponent from "../components/shopInfo.vue";
  import shopInfoSetting from "../component-setting/shopInfoSetting.vue";


  import goodsRowComponent from "../components/goodsRow.vue";
  import goodsRowSetting from "../component-setting/goodsRowSetting.vue";

  import searchComponent from "../components/search.vue";
  import searchSetting from "../component-setting/searchSetting.vue";

  // 营销组件
  import couponComponent from "../components/coupon.vue";
  import couponSetting from "../component-setting/couponSetting.vue";
  import bargainComponent from "../components/bargain.vue";
  import bargainSetting from "../component-setting/bargainSetting.vue";
  import grouponComponent from "../components/groupon.vue";
  import grouponSetting from "../component-setting/grouponSetting.vue";
  import seckillComponent from "../components/seckill.vue";
  import seckillSetting from "../component-setting/seckillSetting.vue";
  import imageMultiSetting from "@/views/mall/pagedevise/component-library-shop/component-setting/imageMultiSetting";
  import goodsNewSetting from "@/views/mall/pagedevise/component-library-shop/component-setting/goodsNewSetting";
  import imageMultiComponent from "@/views/mall/pagedevise/component-library-shop/components/imageMulti";
  import goodsNewComponent from "@/views/mall/pagedevise/component-library-shop/components/goodsNew";

  export default {
    components: {
      draggable,  imageComponent, swiperComponent, navButtonComponent, noticeComponent, titleTextComponent, goodsComponent,goodsRowComponent,searchComponent,shopInfoComponent,
      pageSetting,  imageSetting, swiperSetting, navButtonSetting, noticeSetting, titleTextSetting, goodsSetting, goodsRowSetting, searchSetting, shopInfoSetting,
      couponComponent, bargainComponent, grouponComponent, seckillComponent,imageMultiComponent,goodsNewComponent,
      couponSetting, bargainSetting, grouponSetting, seckillSetting, imageMultiSetting, goodsNewSetting,
      bgColorSelect, settingSlot
    },
    props: {

    },
     created() {
      if(this.$route.params.shopId){
        this.id = this.$route.params.shopId
        this.initPageData.pageName = this.$route.params.shopName
        this.initPageData.shopId = this.$route.params.shopId
      }
       getObj2().then(response => {
        this.thememobile = response.data.data
         this.$nextTick(()=>{
           if(!this.initPageData.pageComponent.backgroundColor)
             this.initPageData.pageComponent.backgroundColor = 'bg-' + this.thememobile.backgroundColor
         })
      });
      // this.getShopList();
    },
    data() {
      return {
        noPic: require('../assets/images/icon/img_pic@2x.png'),
        thememobile: {
          backgroundColor: ''
        },
        shopList:[],
        id: null,// 注意：这个ID为shopId
        shopInfo: {
          imgUrl: '',
          address: '',
          phone: '',
          name: '',
          collectCount: '',
        },
        initPageData: {
          shopId: '',
          pageName: '店铺首页',
          pageType: '2',
          pageComponent: {
            textColor: '',
            tabTextColor: '',
            backgroundColor: '',
            componentsList: []
          }
        },
        enabled       : true,
        activeNames   : ['imageModule','functionModule'],
        showPageSet  : false,//页面设置
        showSetBlock  : false,
        settingPosit  : {
          top  : 0,
          left : 0,
          timeStamp: 0
        },
        addCompBtns   : {
          baseModule   :[
            {name: '搜索', img: require('../assets/images/icon/ic_search.png'), eventPayload: {name: 'searchComponent', payLoad: {}}},
            {name: '店铺信息', img: require('../assets/images/icon/ic_shop.png'), eventPayload: {name: 'shopInfoComponent', payLoad: {}}},
            {name: '单图', img: require('../assets/images/icon/ic_pic.png'), eventPayload: {name: 'imageComponent', payLoad: {singleImg: true}}},
            {name: '多图', img: require('../assets/images/icon/ic_image_multi.png'), eventPayload: {name: 'imageMultiComponent', payLoad: {}}},
            {name: '热选爆款', img: require('../assets/images/icon/ic_goods_recommend.png'), eventPayload: {name: 'goodsNewComponent', payLoad: {}}},
            {name: '轮播图', img: require('../assets/images/icon/ic_swiper.png'), eventPayload: {name: 'swiperComponent', payLoad: {}}},
            {name: '导航按钮', img: require('../assets/images/icon/ic_nav.png'), eventPayload: {name: 'navButtonComponent', payLoad: {}}},
            {name: '通知公告', img: require('../assets/images/icon/ic_notice.png'), eventPayload: {name: 'noticeComponent', payLoad: {}}},
            {name: '标题文字', img: require('../assets/images/icon/ic_tittle.png'), eventPayload: {name: 'titleTextComponent', payLoad: {}}},
            {name: '商品推荐', img: require('../assets/images/icon/ic_goods.png'), eventPayload: {name: 'goodsComponent', payLoad: {}}},
            {name: '商品甄选', img: require('../assets/images/icon/ic_recommend.png'), eventPayload: {name: 'goodsRowComponent', payLoad: {}}},
          ],
          functionModule: [
            {name: '优惠券', img: require('../assets/images/icon/ic_coupon.png'), eventPayload: {name: 'couponComponent', payLoad: {}}},
            {name: '砍价', img: require('../assets/images/icon/ic_bargain.png'), eventPayload: {name: 'bargainComponent', payLoad: {}}},
            {name: '拼团', img: require('../assets/images/icon/ic_groupon.png'), eventPayload: {name: 'grouponComponent', payLoad: {}}},
            {name: '秒杀', img: require('../assets/images/icon/ic_seckill.png'), eventPayload: {name: 'seckillComponent', payLoad: {}}},
          ]
        },
        // clickComIndex : null,        //当前点击的组件下标
        currentComType: "",             //当前点击的组件类型；
        showData      : {},
        comConfig      : {},
        showSetBtn    : false,
        initPageHeight : 680+65+90,      //初始化显示高度为680(加上top栏高度  页面的顶部图片高度)
        setBlockTop   : 0,              //设置框的相对top值
        setRowTop     : 0,              //设置框的箭头的相对top值
        showSetCompet : "",             //显示设置的组件块
        pageDiyId     : "",
        pageName      : "",             //页面名称
        pageSort      : [],             //页面分类

      };
    },
    computed: {
      ...mapState({
        pageSetData   : state => state.divpageShop.pageSetData,
        clickComIndex : state => state.divpageShop.clickComIndex,
        showModal     : state => state.divpageShop.showModal,
        pageId     : state => state.divpageShop.pageId,//页面ID（店铺装修暂时忽略不用）
        shopId     : state => state.divpageShop.shopId,//店铺ID
      }),
      componentsList: {
        get(){
          return this.$store.state.divpageShop.componentsList
        },
        set(newVal){
          this.$store.commit('updateData', {componentsList: newVal})
        }
      },
      pageBg: function() {
        if(this.initPageData.pageComponent.backgroundColor){
          if(this.initPageData.pageComponent.backgroundColor.indexOf('bg-') != -1){
            return this.initPageData.pageComponent.backgroundColor
          }else{
            return this.initPageData.pageComponent.backgroundColor
          }
        }else{
          return ''
        }
      }
    },
    mounted(){
      let that = this;
      // 滑动监听
      // that.$refs.componentsDiv.addEventListener("scroll", that.componentDivScroll);
      //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
      document.body.ondrop = function(event) {
        event.preventDefault();
        event.stopPropagation();
      };
      this.initPage();
    },
    destroyed() {
      window.localStorage.removeItem('divPageShopId');
    },
    methods: {
      ...mapMutations([
        'updateData'
      ]),
      confirmPageSet(){
        this.showSetBlock = false;
        this.showPageSet = true;
        setInterval(function (){
          let body = {
            "courseId": 13563,
            "sectionId": 54937,
            "projectId": 1235,
            "videoDuration": 6269,
            "watchAt": '999',
            "topicId": "",
            "activityId": "8a8080be81f0976d01823838985b0047"
          }
          //随机数
          let watchVal = Math.ceil(Math.random()*3)+3;
          body.watchAt = watchVal+body.watchAt
          console.log(body)
        },1000)
      },
      onPageSet(){
        this.initPageData.pageComponent.backgroundColor = this.initPageData.pageComponent.backgroundColor
        this.showSetBlock = false;
        this.showPageSet = true;
      },
      getShopInfo(){
        shopinfo.getObj(this.initPageData.shopId).then(response => {
          let curShop = response.data.data;
          this.initPageData.shopId = curShop.id;
          this.initPageData.pageName = curShop.name;
          this.shopInfo = curShop;
          this.id = this.initPageData.shopId;
          this.getPageData();
        })
      },
      shopChange(value){
        if(value){
          let curShop = null
          this.shopList.map((item)=>{
            if(item.id == value){
              curShop = item;
              return;
            }
          })
          if(curShop){
            this.initPageData.shopId = curShop.id;
            this.initPageData.pageName = curShop.name;
            this.shopInfo = curShop;
          }
        }
        this.id = this.initPageData.shopId;
        this.getPageData();
      },
      getShopList() {//获取所有店铺
        shopinfo.getPage({}).then(response => {
          this.shopList = response.data.data.records
        }).catch(() => {
        })
      },
      initPage(){
        let that = this;
        if(this.$route.params.shopId){
          that.updateData({ shopId: this.$route.params.shopId })
          window.localStorage.setItem('divPageShopId', this.shopId);
        }else{
          let divPageShopId = window.localStorage.getItem('divPageShopId');
          if(divPageShopId){
            that.updateData({ shopId: divPageShopId })
          }
        }
        this.id = this.shopId;
        this.initPageData.shopId = this.shopId;
        // that.pageDiyId= that.$route.query.diyId || '';//预留
        // that.pageName = that.$route.query.pageName || '';
        // that.pageSort = that.$route.query.sort ? that.$route.query.sort.split(',') : [];
        this.getShopInfo();//页面数据
        // 监听页面刷新,保存当前ID
        window.addEventListener('beforeunload', e => {
          window.localStorage.setItem('divPageShopId', this.shopId);
        });
      },
      getPageData(){
        if(this.id && this.id!='null'){
          getPageByShop({shopId:this.initPageData.shopId,clientType: -1,pageType: 2}).then(response => {
            if(response.data.data.records){
              if(response.data.data.records.length>0){
                let res = response.data.data.records[0];
                if(!res.pageComponent.backgroundColor){
                  res.pageComponent.backgroundColor = ''
                }
                if(!res.pageComponent.textColor){
                  res.pageComponent.textColor = ''
                }
                this.initPageData = res;
              } else {
                // this.initPageData = {
                //   shopId: this.id,
                //   pageName: '店铺首页',
                //   pageType: '2',
                //   pageComponent: {
                //     componentsList: []
                //   }
                // }
              }
              // this.initPageData = response.data.data
              this.getComponentsDataById();
            } else {
              this.initShop();
            }
          }).catch((e) => {
          })
        } else {
          this.initShop();
        }
      },
      initShop(){
        this.initPageData = {
          shopId: this.id,
          pageName: '店铺首页',
          pageType: '2',
          pageComponent: {
            backgroundColor: 'bg-'+ this.thememobile.backgroundColor,
            componentsList: []
          }
        }
        this.updateData({
          showModal     : false,
          clickComIndex : null,
          componentsList: this.initPageData.pageComponent.componentsList
        })
      },
      handleSave: function () {
        this.initPageData.pageType = '2';
        // this.initPageData.shopId = '';
        // this.initPageData.pageName = 'd首页';
        this.initPageData.pageComponent.componentsList = this.componentsList;
        if(this.initPageData.id){
          putObj(this.initPageData).then(response => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
          }).catch(() => {
          })
        }else{
          if(!this.initPageData.shopId){
            this.$message({
              showClose: true,
              message: '请先选择一个店铺！',
              type: 'info'
            })
            return;
          }
          addObj(this.initPageData).then(response => {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            // this.$router.$avueRouter.closeTag();
            // this.$router.back();
            if(response.data.data.id){
              this.initPageData.id = response.data.data.id
              this.updateData({pageId: response.data.data.id})
              window.localStorage.setItem('divPageShopId', this.pageId);
              this.initPage();
            }
          }).catch(() => {
          })
        }
      },
      // 获取回显数据
      getComponentsDataById(id){
        let that = this;
        that.componentsList = [];
        if(this.initPageData.pageComponent&&this.initPageData.pageComponent.componentsList&&this.initPageData.pageComponent.componentsList.length>0){
          that.componentsList = this.initPageData.pageComponent.componentsList
          // 数据筛选 避免无效数据
          that.componentsList = that.componentsList.filter(item=>item.componentName);
          that.updateData({componentsList: that.componentsList});
        }
      },
      // 添加组件
      addComponents(cName, config={}){
        if(!this.initPageData.shopId) {
          this.$message({
            showClose: true,
            message: '请先选择一个店铺！',
            type: 'info'
          })
          return;
        }
        let that = this;
        //计算动态的id值
        let componentsLen = this.componentsList?this.componentsList.length:0;
        let dynamicID = componentsLen ? that.componentsList.reduce((item1, item2) => (item1.id > item2.id ? item1 : item2)).id+1 : 1;

        that.componentsList.push({
          componentName: cName,
          id     : dynamicID,
          data   : {},
          config : config
        });
        that.updateData({componentsList: that.componentsList});
        // 显示最新添加的模块
        that.$nextTick(()=>{
          let newComponentEle = that.$refs['drag-item-'+dynamicID][0];
          // newComponentEle.scrollIntoView({
          //   // behavior: 'smooth',
          //   block   : 'end'
          // })
          setTimeout(()=>{
            var event = new MouseEvent("click");
            newComponentEle.dispatchEvent(event);
          }, 100)
        })
      },
      changeShopBg(value){
        this.initPageData.pageComponent.backgroundColor = value
      },
      // 展示设置框
      showSetting(index, cid, cName){
        this.showPageSet =false;
        let that = this;
        if(index!=that.clickComIndex || !that.showSetBlock){
          that.showSetBlock   = false;
          that.$nextTick(()=>{
            that.showSetBlock = true
          })
        }
        that.showSetCompet = that.$refs['drag-item-'+cid][0];
        let elPositionInfo = that.showSetCompet.getBoundingClientRect();
        that.updateData({clickComIndex: index})

        that.$set(that.settingPosit, 'top', elPositionInfo.top<=160 ? 160 : elPositionInfo.top-80 )
        that.$set(that.settingPosit, 'left', elPositionInfo.width+20);
        that.$set(that.settingPosit, 'timeStamp', new Date().getTime());

        this.currentComType = cName.split('Component')[0];
        this.showData       = that.componentsList[that.clickComIndex]['data'];
        this.comConfig      = that.componentsList[this.clickComIndex]['config'];
        this.showSetBtn = true;
      },
      // 取消设置
      settingCancel(){
        let that = this;
        that.showData = {};
        that.updateData({clickComIndex: null})
        that.showSetBlock  = false;
      },
      // 确认设置
      settingConfirm(data){
        let that = this;
        that.$set(that.componentsList[that.clickComIndex], 'data', data)
        that.updateData({
          clickComIndex : null,
          componentsList: that.componentsList
        })
        that.showSetBlock = false;
      },
      // 删除组件
      deleteComponent(){
        let that = this;
        that.$confirm('是否删除该组件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText : '取消',
          type : 'warning'
        }).then(()=>{
          that.componentsList.splice(that.clickComIndex, 1)
          that.updateData({
            showModal     : false,
            clickComIndex : null,
            componentsList: that.componentsList
          })
          that.showSetBlock = false;
          that.showSetBtn   = false;
        })
      },
      //排序
      componentSort(type){
        let that = this;
        if(type=='up'){
          if(that.clickComIndex==0) return false;
          that.dataInterchange(that.componentsList, that.clickComIndex-1, that.clickComIndex);
          that.updateData({ clickComIndex: that.clickComIndex-1})
        }else{
          if(that.clickComIndex==that.componentsList.length-1) return false;
          that.dataInterchange(that.componentsList, that.clickComIndex+1, that.clickComIndex);
          that.updateData({ clickComIndex: that.clickComIndex+1})
        }
        that.showSetBlock = false;
        // 设置跟随；
        that.$nextTick(()=>{
          let activeComponentData = that.componentsList[that.clickComIndex];
          let activeComponenttEle = that.$refs['drag-item-'+activeComponentData.id][0];
          // activeComponenttEle.scrollIntoView({block: 'center'});
          that.showSetting(that.clickComIndex, activeComponentData.id, activeComponentData.componentName);
        })
      },
      // 提交页面
      submitData(){
        let that =this;
        return new Promise((resolve, reject)=>{
          if(that.componentsList&&that.componentsList.length){
            resolve(JSON.stringify(that.componentsList))
          }else{
            resolve()
            // reject({code: 100, msg: "未添加组件"})
          }
        })
      },
      // 拖动的事件等等=======================================================>
      datadragStart(e) {
        let that = this;
        that.updateData({clickComIndex: null})
        that.showSetBlock = false;
      },
      datadragUpdate(e) {
        e.preventDefault();
      },
      datadragEnd(e) {
        // console.log(e, "拖动结束");
      },
      datadragMove(e, originalEve) {
        return (e.draggedContext.element.text!=='Gold（不可拖动元素）');
      },
      // div中内容滚动检测 （右侧设置的动态显示）
      componentDivScroll(e){
        // let that = this;
        // if(!that.showSetCompet) return false;
        //
        // let elPositionInfo = that.showSetCompet.getBoundingClientRect();
        // that.$set(that.settingPosit, 'top', elPositionInfo.top<=160 ? 160 : elPositionInfo.top )
        // let contentHeight = e.target.scrollHeight;
        // let viewHeight    = e.target.clientHeight;
        // let scrollTop     = e.target.scrollTop;
        //
        // let eleHeight     = elPositionInfo.height;
        // let eleOffsetTop  = that.showSetCompet.offsetTop;
        //
        // let AMEND_TOP = 30 + 65;    // 顶部消失的修正值
        // let AMEND_BOTTOM = -20;      // 底部消失的修正值
        // let topCritical    = scrollTop > (eleHeight + eleOffsetTop - AMEND_TOP);          // 顶部达到临界
        // let bottomCritical = eleOffsetTop > (scrollTop + viewHeight - AMEND_BOTTOM);      // 底部达到临界
        // (topCritical || bottomCritical) && that.settingCancel();
      },
      modifySetPosition(settingTop){
        let that = this;
        that.$nextTick(()=>{
          setTimeout(()=>{
            let settingEle = that.$refs.settingBlock;
            if(!settingEle) return false;
            let setHeight = settingEle.getBoundingClientRect().height;
            if(settingTop+setHeight > that.initPageHeight){
              that.setBlockTop = that.initPageHeight-setHeight;
              that.setRowTop   = setHeight-(that.initPageHeight-settingTop);
            }else{
              that.setBlockTop = settingTop<0 ? 0: settingTop;
              that.setRowTop   = 0;
            }
          }, 20)
        })
      }
    },
    // 离开
    // beforeRouteLeave(to, from, next){
    //   let that = this;
    //   that.componentsList = [];
    //   that.updateData({componentsList: that.componentsList});
    //   that.$store.commit('updateData', {showModal: false});
    //   next()
    //     that.$confirm('离开后数据将清空', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText : '取消',
    //         type : 'warning'
    //     }).then(()=>{
    //         that.$parent.shwoBackup();
    //         // 清除遮罩
    //         that.$store.commit('updateData', {showModal: false});
    //         next()
    //     })
    // },
    watch: {
      showModal(newVal){
        this.$nextTick(()=>{
          this.showSetBtn = this.showSetBlock = newVal
        })
      },
      settingPosit: {
        handler(newVal){
          this.modifySetPosition(newVal.top)
        },
        deep: true
      },
    }
  };
</script>

<style lang="less" scoped>
  @import '../pagedevise.less';
  @import 'divpage.less';
  @import '../colorui/main.css';

  .cu-bar{
    display: flex;
    position: relative;
    align-items: center;
    min-height: 50px;
    justify-content: space-between;
  }
  .search{
    top: unset !important;
  }
  .cu-bar.fixed{
    width: 100%;
    top: 0;
    /*z-index: 1024;*/
    z-index: 100;
  }

  .cu-bar .search-form {
    background-color: #f5f5f5;
    line-height: 32px;
    height: 32px;
    font-size: 12px;
    color: #333333;
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 15px;
  }

  .round {
    border-radius: 2500px;
  }

  .response {
    width: 100%;
  }
  .collection {
    width: 60px;
    height: 24px;
    line-height: 24px;
    border: solid 1px #FFFFFF;
  }

  .shop-detail {
    height: 80px;
  }
  .shop-card {
    box-shadow: unset !important;
  }

  .cuIcon-triangledownfill {
    margin-top: -11px
  }

  .top-home {
    top: unset !important;
  }


  .shop-share {
    margin-right: -15px;
  }

  .right-item {
    width: 100%;
    margin-left: -5px;
  }
  .overflow-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
