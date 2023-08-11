<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 注：如需开发新的组件请参考 搜索组件（searchSetting.vue和search.vue)两个文件或其他已有的组件。 -->
<!-- 组件开发需要有显示组件 components 目录下和组件设置 components-setting 目录下-->
<template>
  <div class="execution">
    <div class="pc-div-page-index">
      <div class="top " v-show="showPreview" @click="handlePreview()">
        <span style="width: 20px">展开</span><i class="el-icon-arrow-right"></i>
      </div>

      <!-- 左侧组件 -->
      <div v-show="!showPreview" class="left-div">
        <div style="font-size: 14px;margin-top: 10px;">
          应用端:<span style="color: red;margin-left: 5px;">PC 端</span>
        </div>
        <div style="text-align: center; padding: 5px; ">
          <span>组件库</span>
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基础组件" name="imageModule">
            <el-row :gutter="5">
              <el-col :span="12" v-for="item in addCompBtns.baseModule" :key="item.name"
                      style="text-align: center;margin-bottom: 5px;">
                <div style="background: #f7f7f7;padding-top: 10px;"
                     @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                  <img :src="item.img" width="16px">
                  <p style="font-size: 12px;">{{ item.name }}</p>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item title="营销模块" name="functionModule">
            <el-row :gutter="5">
              <el-col :span="12" v-for="item in addCompBtns.functionModule" :key="item.name"
                      style="text-align: center;margin-bottom: 5px;">
                <div style="background: #f7f7f7;padding-top: 10px;"
                     @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                  <img :src="item.img" width="16px">
                  <p style="font-size: 12px;">{{ item.name }}</p>
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <div class="text-center margin-top-sm">
          <el-button type="primary" size="mini" @click.stop="handleSave()">保存</el-button>
          <el-button type="primary" size="mini" @click.stop="handlePreview()">预览</el-button>
        </div>

      </div>

      <!-- 中间页面 -->

      <div style="width: 100%; height: 618px;left: 0;position: absolute;margin-top: 152px;">
        <img style="width: 100%; height: 618px;" v-if="initPageData.pageComponent.logoConfig.bgImage"
             :src="initPageData.pageComponent.logoConfig.bgImage"/>
      </div>
      <div class="content">
        <div class="showContent">
          <div class="pageContent">
            <div class="pageTopBlock ">
              <div class="header">
                <div class="top-image-box"
                     @click="showTopImageSetting(-4, 'drag-item-pc-top-image', 'topImageSetting')">
                  <div>
                    <img class="flex top-image"
                         v-if="initPageData.pageComponent.topImageConfig&&initPageData.pageComponent.topImageConfig.show=='show'"
                         :src="initPageData.pageComponent.topImageConfig?initPageData.pageComponent.topImageConfig.imgUrl: ''">
                    <div v-else style="padding-top: 30px;" class="flex justify-center text-gray">
                      顶部图片广告已隐藏
                    </div>
                  </div>
                  <div class="close-img-shade">
                  </div>
                  <div class="top-image-edit">
                    <i class="icon el-icon-edit" style="color: #165dff;font-size: 14px;font-weight: bold;"></i>
                  </div>
                </div>
                <div v-if="topFixed" style="height: 39px;"></div>
                <div class="nav-topbar" :style="{position: topFixed?'fixed':'inherit'}">
                  <div class="container">
                    <div class="topbar-menu flex">
                      <span>{{ initPageData.pageComponent.logoConfig.mallName || defaultMallName }}</span>
                    </div>
                    <div class="topbar-user flex">
                      <span>昵称</span>
                      <span class="margin-left">我的订单</span>
                      <span class="margin-left">个人中心</span>
                      <span class="margin-left">
                              <span class="cuIcon-cart"></span>
                              <span class="margin-left-xs">购物车(0)</span>
                            </span>
                      <span class="margin-left">
                              <span class="cuIcon-message"></span>
                              <span class="margin-left-xs">消息(0)</span>
                            </span>

                      <span class="margin-left-xl">
                              <span class="margin-left-xs">商家服务</span>
                              <span class="cuIcon-unfold"></span>
                            </span>
                      <span class="btn margin-left">退出</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="header">
                <div class="nav-header">
                  <div class="container">
                    <div class="header-logo-div" @click="showLogoSetting(-2, 'drag-item-pc-logo', 'logoSetting')">
                      <div class="header-logo">
                        <!-- 相当于：localhost:8080/#/index -->
                        <span class="logo" :style="initPageData.pageComponent.logoConfig.logoUrl?
                                'background:url('+initPageData.pageComponent.logoConfig.logoUrl+') no-repeat;background-size:cover;':''"></span>
                      </div>
                      <div class="header-logo-title ">
                        {{ initPageData.pageComponent.logoConfig.mallName || defaultMallName }}
                        <i class="icon el-icon-edit" style="color: #165dff;font-size: 14px;font-weight: bold;"></i>
                      </div>
                    </div>
                    <div class="flex padding-right">
                      <div class="header-search">
                        <div class="wapper">
                          <span class="padding-sm">商品<i class="el-icon-arrow-down"></i></span>
                          <span class="input">输入关键字搜索</span>
                          <div class="search-icon-class cuIcon-search "
                               style="line-height: 40px; background-color: #fb2d1a; color: #fff;padding: 0 20px"></div>
                        </div>
                      </div>
                      <div class="margin-left-sm text-center cuIcon-cart shop-cart"
                           style="width: 80px; height: 40px; border: 1px solid #fb2d1a; color: #fb2d1a; line-height: 40px;">
                        购物车
                      </div>
                    </div>
                  </div>
                  <div class="container" style="height: 48px;justify-content: start">
                    <div class="text-white text-lg text-center text-bold"
                         style="width: 220px; height: 48px; background-color: #fb2d1a; line-height: 48px;">
                      <span>全部商品分类</span>
                    </div>
                    <div class="header-menu"
                         @click="showIndexTitleSetting(-3, 'drag-item-index-title', 'indexTitleSetting')">
                      <div class="item-menu " style="width: 100px;text-align: center;"
                           v-for="(item,index) in initPageData.pageComponent.indexTitleConfig.titles" :key="index">
                          <span v-if="index==0" :url="item.pageUrl" class="active">{{ item.navName }}
                          </span>
                        <span v-else>{{ item.navName }}</span>
                      </div>
                      <i class="icon el-icon-edit" style="color: #165dff;font-size: 14px;font-weight: bold;"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div class="container">
                  <div class="nav-menu " style="z-index: 5;">
                    <div class="menu-wrap">
                      <div class="menu-item" v-for="(category,index) in goodsCategory" :key="index">
                        <div class="item-text">{{ category.name }}</div>
                        <div class="children">
                          <!-- 分类横向展示5个 -->
                          <div class="cu-list grid col-5 no-border">
                            <div class="cu-item text-center " v-for="(item,index) in category.children"
                                 :key="index">
                              <a target="_blank"
                                 class="category-name"
                                 :href="'/pages/goods/goods-list/index?categorySecond=' + item.id + '&title=' + item.name">
                                <div>
                                  <img class="image-class" :src="item.picUrl">
                                </div>
                                {{ item.name }}
                              </a>
                            </div>
                          </div>
                          <div v-if="!category.children||category.children==0" class="text-gray text-center">暂无数据</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 轮播图 -->
                <div @click="showIndexBannerImagesSetting()" ref="indexBannerRef">
                  <component :is="'swiperComponent'" :setData="initPageData.pageComponent.indexBanner.images"
                             :config="initPageData.pageComponent.indexBanner.config"
                             :cId="'indexBanner'"
                             :thememobile="thememobile"></component>
                </div>
              </div>
            </div>
            <div class="componentsList container" :style="{overflowY: showModal?'hidden':'auto'}" ref="componentsDiv">
              <draggable v-model="componentsList" @start="datadragStart" @update="datadragUpdate" @end="datadragEnd"
                         :disabled="!enabled" :move="datadragMove" :options="{animation:500}">
                <transition-group>
                  <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item "
                       :class="{'container': item.componentName!='swiperComponent','focus-class':index==clickComIndex}"
                       :style="{backgroundColor: item.componentName=='swiperComponent'?'#f1f1f1':''}"
                       :ref="'drag-item-'+item.id"
                       @click="showSetting(index, item.id, item.componentName)">
                    <component :is="item.componentName" :setData="item.data" :config="item.config" :cId="item.id"
                               :thememobile="thememobile"></component>
                    <div
                      v-if="showSetBtn && index === clickComIndex&& clickComIndex!=null && clickComIndex!='indexBanner'"
                      class="funBlock">
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

        </div>
      </div>
      <div>
        <page-div-footer
          @onShowSet="showPageFooterSetting(-3, 'drag-item-pc-footer', 'pageDivFooterSetting')"
          :showData="initPageData.pageComponent.pageFooterConfig"></page-div-footer>
      </div>
      <!-- 右侧组件设置 -->
      <div v-if="showSetBlock" class="settingBlock" ref="settingBlock">
        <el-button type="text" style="right: 10px;position:absolute;z-index: 999;font-size: 18px;"
                   @click="showSetBlock=false" icon="el-icon-close"></el-button>
        <component @changeCompData="changeCompData" :is="currentComType+'Setting'" :showData="showData"
                   :config="comConfig" @cancel="settingCancel"
                   @confirm="settingConfirm" :thememobile="thememobile"
                   @setPosition="modifySetPosition(settingPosit.top)" :clientType="initPageData.clientType">
        </component>
      </div>
    </div>
  </div>
</template>

<script>

// 接口地址
import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/pagedevise'
import {fetchTree} from '@/api/mall/goodscategory'
import {getObj2} from '@/api/mall/thememobile'
// 商城页面装修必须引入 ----- 开始 -----
// 商城装修为单独模块，可提供按需购买方式
// 全局搜【todo divpage】可查看所有关联到的文件
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
// 组件
import searchComponent from "../components/search.vue";
import swiperComponent from "../components/swiper.vue";
import imageComponent from "../components/image.vue";
import imageMultiComponent from "../components/imageMulti.vue";
import imageMultiSetting from "../component-setting/imageMultiSetting";

// 组件设置
import pageSetting from "../component-setting/pageSetting.vue";
import pageDivFooter from "../components/pageDivFooter.vue";
import pageDivFooterSetting from "../component-setting/pageDivFooterSetting.vue";
import logoSetting from "../component-setting/logoSetting.vue";
import indexTitleSetting from "../component-setting/indexTitleSetting.vue";
import topImageSetting from "../component-setting/topImageSetting.vue";

import searchSetting from "../component-setting/searchSetting.vue";
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

import shopComponent from "../components/shop.vue";
import shopSetting from "../component-setting/shopSetting.vue";

import goodsRowComponent from "../components/goodsRow.vue";
import goodsRowSetting from "../component-setting/goodsRowSetting.vue";
import goodsCategoryComponent from "../components/goodsCategory.vue";
import goodsCategorySetting from "../component-setting/goodsCategorySetting.vue";
// 营销组件
import couponComponent from "../components/coupon.vue";
import couponSetting from "../component-setting/couponSetting.vue";
import bargainComponent from "../components/bargain.vue";
import bargainSetting from "../component-setting/bargainSetting.vue";
import grouponComponent from "../components/groupon.vue";
import grouponSetting from "../component-setting/grouponSetting.vue";
import seckillComponent from "../components/seckill.vue";
import seckillSetting from "../component-setting/seckillSetting.vue";

export default {
  components: {
    draggable,
    logoSetting,
    indexTitleSetting,
    topImageSetting,
    pageDivFooter,
    pageDivFooterSetting,
    searchComponent,
    imageComponent,
    swiperComponent,
    navButtonComponent,
    noticeComponent,
    titleTextComponent,
    goodsComponent,
    shopComponent,
    goodsRowComponent,
    goodsCategoryComponent,
    pageSetting,
    searchSetting,
    imageSetting,
    swiperSetting,
    navButtonSetting,
    noticeSetting,
    titleTextSetting,
    goodsSetting,
    shopSetting,
    goodsRowSetting,
    goodsCategorySetting,
    couponComponent,
    bargainComponent,
    grouponComponent,
    seckillComponent,
    imageMultiComponent,
    couponSetting,
    bargainSetting,
    grouponSetting,
    seckillSetting,
    imageMultiSetting
  },
  props: {
    // initPageData:{
    //   type: Object,
    //   default: ()=> {}
    // },
  },
  created() {
    // 用于获取缓存租户的装修id
    let tenantId = this.userInfo.switchTenantId || this.userInfo.tenantId
    this.saveKey = 'PCdivPageId_' + tenantId + this.userInfo.username
    getObj2().then(response => {
      this.thememobile = response.data.data
    });
    fetchTree().then(response => {
      this.goodsCategory = response.data.data
    });
  },
  data() {
    return {
      saveKey: "PCdivPageId_",
      scrollTop: 0,
      topFixed: false,
      thememobile: {
        backgroundColor: ''
      },
      id: null,
      showPreview: false,
      defaultImage: require('../assets/images/icon/img_pic@2x.png'),
      defaultMallName: 'JooLun商城-PC端',
      initPageData: {
        clientType: 'H5-PC',
        pageComponent: {
          logoConfig: {
            mallName: 'JooLun商城-PC端',
            logoUrl: '',
            bgImage: '',
            config: {}
          },
          topImageConfig: {
            show: 'show',//是否显示
            imgUrl: '',
            pageUrl: '',
            height: 40
          },
          indexTitleConfig: {
            titles: [
              {
                id: Math.random(),
                pageUrl: '/pages/home/index',
                navName: '首页',
              }, {
                id: Math.random(),
                pageUrl: '/pages/bargain/bargain-list/index',
                navName: '全民砍价',
              }, {
                id: Math.random(),
                pageUrl: '/pages/seckill/seckill-list/index',
                navName: '限时秒杀',
              }, {
                id: Math.random(),
                pageUrl: '/pages/groupon/groupon-list/index',
                navName: '一起拼团',
              }, {
                id: Math.random(),
                pageUrl: '/pages/article/article-list/index',
                navName: '新闻资讯',
              }
            ]
          },
          pageFooterConfig: {
            bgColor: '#333333',
            textColor: '#999999',
            contactInfo: {
              tel: '',
              email: '',
              address: '',
            },
            col1: {
              title: '',
              row1: {name: '', url: ''},
              row2: {name: '', url: ''},
            },
            col2: {
              title: '',
              row1: {name: '', url: ''},
              row2: {name: '', url: ''},
            },
            col3: {
              title: '',
              row1: {name: '', url: ''},
              row2: {name: '', url: ''},
            },
            col4: {
              title: '',
              row1: {name: '', url: ''},
              row2: {name: '', url: ''},
            },
            userAgreementConfig: {
              row1: {name: '', url: ''},
              row2: {name: '', url: ''},
              row3: {name: '', url: ''},
              row4: {name: '', url: ''},
            },
            copyrightConfig: {
              name: ''
            },
            recordNoConfig: {
              name: ''
            },
          },
          indexBanner: {//首页轮播图配置
            pageSpacing: 0,
            images: {
              swiperType: 'screen-swiper',
              dotStyle: 'square-dot',
              background: 'red',
              height: 560,
              interval: 3000,
              borderRadius: 0,
              imageSpacing: 0,
              swiperList: [{
                id: Math.random(),
                imageUrl: '',
                imgWidth: 0,
                imgHeight: 0,
                pageUrl: '',
                itemTitle: ''
              }]
            },
            config: {}
          },
          componentsList: []
        }
      },
      enabled: true,
      activeNames: ['imageModule', 'functionModule'],
      showSetBlock: false,
      settingPosit: {
        top: 0,
        left: 0,
        timeStamp: 0
      },
      addCompBtns: {
        baseModule: [
          {
            name: '搜索框',
            img: require('../assets/images/icon/ic_search.png'),
            eventPayload: {name: 'searchComponent', payLoad: {}}
          },
          // {name: '商品分类', img: require('../assets/images/icon/ic_classify.png'), eventPayload: {name: 'goodsCategoryComponent', payLoad: {}}},
          {
            name: '单图',
            img: require('../assets/images/icon/ic_pic.png'),
            eventPayload: {name: 'imageComponent', payLoad: {singleImg: true}}
          },
          {
            name: '多图',
            img: require('../assets/images/icon/ic_image_multi.png'),
            eventPayload: {name: 'imageMultiComponent', payLoad: {}}
          },
          {
            name: '轮播图',
            img: require('../assets/images/icon/ic_swiper.png'),
            eventPayload: {name: 'swiperComponent', payLoad: {}}
          },
          {
            name: '导航按钮',
            img: require('../assets/images/icon/ic_nav.png'),
            eventPayload: {name: 'navButtonComponent', payLoad: {}}
          },
          {
            name: '通知公告',
            img: require('../assets/images/icon/ic_notice.png'),
            eventPayload: {name: 'noticeComponent', payLoad: {}}
          },
          {
            name: '标题文字',
            img: require('../assets/images/icon/ic_tittle.png'),
            eventPayload: {name: 'titleTextComponent', payLoad: {}}
          },
          {
            name: '商品推荐',
            img: require('../assets/images/icon/ic_goods.png'),
            eventPayload: {name: 'goodsComponent', payLoad: {}}
          },
          {
            name: '商品甄选',
            img: require('../assets/images/icon/ic_recommend.png'),
            eventPayload: {name: 'goodsRowComponent', payLoad: {}}
          },
          {
            name: '店铺甄选',
            img: require('../assets/images/icon/ic_shop.png'),
            eventPayload: {name: 'shopComponent', payLoad: {}}
          },
        ],
        functionModule: [
          {
            name: '优惠券',
            img: require('../assets/images/icon/ic_coupon.png'),
            eventPayload: {name: 'couponComponent', payLoad: {}}
          },
          {
            name: '砍价',
            img: require('../assets/images/icon/ic_bargain.png'),
            eventPayload: {name: 'bargainComponent', payLoad: {}}
          },
          {
            name: '拼团',
            img: require('../assets/images/icon/ic_groupon.png'),
            eventPayload: {name: 'grouponComponent', payLoad: {}}
          },
          {
            name: '秒杀',
            img: require('../assets/images/icon/ic_seckill.png'),
            eventPayload: {name: 'seckillComponent', payLoad: {}}
          },
        ]
      },
      // clickComIndex : null,        //当前点击的组件下标
      currentComType: "",             //当前点击的组件类型；
      showData: {},
      comConfig: {},
      showSetBtn: false,
      initPageHeight: 680 + 65 + 90,      //初始化显示高度为680(加上top栏高度  页面的顶部图片高度)
      setBlockTop: 0,              //设置框的相对top值
      setRowTop: 0,              //设置框的箭头的相对top值
      showSetCompet: "",             //显示设置的组件块
      pageDiyId: "",
      pageName: "",             //页面名称
      pageSort: [],             //页面分类
      goodsCategory: [],//分类
      bannerImgs: [],//banner图

    };
  },
  computed: {
    ...mapState({
      pageSetData: state => state.divpage.pageSetData,
      clickComIndex: state => state.divpage.clickComIndex,
      showModal: state => state.divpage.showModal,
      pageId: state => state.divpage.pageId,//页面ID
      userInfo: state => state.user.userInfo,
    }),
    componentsList: {
      get() {
        return this.$store.state.divpage.componentsList
      },
      set(newVal) {
        this.$store.commit('updateData', {componentsList: newVal})
      }
    },
  },
  mounted() {
    let that = this;
    //滑动监听
    window.addEventListener('scroll', () => {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body
        .scrollTop
      // 当垂直滚动距离大于 300 返回true，则this.isFixed = true，添加is_fixed类名
      this.topFixed = this.scrollTop > 100
    })
    // that.$refs.componentsDiv.addEventListener("scroll", that.componentDivScroll);
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.initPage();
  },
  destroyed() {
    window.localStorage.removeItem(this.saveKey);
    window.localStorage.removeItem("PCdivPageId");
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    initPage() {
      let that = this;
      if (this.$route.query.id) {
        that.updateData({pageId: this.$route.query.id})
        window.localStorage.setItem(this.saveKey, this.pageId);
      } else {
        let PCdivPageId = window.localStorage.getItem(this.saveKey);
        if (PCdivPageId) {
          that.updateData({pageId: PCdivPageId})
        }
      }
      this.id = this.pageId;
      // that.pageDiyId= that.$route.query.diyId || '';//预留
      // that.pageName = that.$route.query.pageName || '';
      // that.pageSort = that.$route.query.sort ? that.$route.query.sort.split(',') : [];
      this.getPageData();//页面数据
      // 监听页面刷新,保存当前ID
      window.addEventListener('beforeunload', e => {
        window.localStorage.setItem(this.saveKey, this.pageId);
      });
    },
    setPageDivInitData(resData) {// 初始化或兼容以前数据
      if (!resData.pageComponent.logoConfig) {
        resData.pageComponent.logoConfig = {
          mallName: this.defaultMallName,
          logoUrl: '',
          bgImage: '',
        }
      }
      if (!resData.pageComponent.topImageConfig) {
        resData.pageComponent.topImageConfig= {
            show: 'show',//是否显示
            imgUrl: '',
            pageUrl: '',
            height: 40
        }
      }
      if (!resData.pageComponent.pageFooterConfig) {
        resData.pageComponent.pageFooterConfig = {
          bgColor: '#333333',
          textColor: '#999999',
          contactInfo: {
            tel: '',
            email: '',
            address: '',
          },
          col1: {
            title: '',
            row1: {name: '', url: ''},
            row2: {name: '', url: ''},
          },
          col2: {
            title: '',
            row1: {name: '', url: ''},
            row2: {name: '', url: ''},
          },
          col3: {
            title: '',
            row1: {name: '', url: ''},
            row2: {name: '', url: ''},
          },
          col4: {
            title: '',
            row1: {name: '', url: ''},
            row2: {name: '', url: ''},
          },
          userAgreementConfig: {
            row1: {name: '', url: ''},
            row2: {name: '', url: ''},
            row3: {name: '', url: ''},
            row4: {name: '', url: ''},
          },
          copyrightConfig: {
            name: ''
          },
          recordNoConfig: {
            name: ''
          },
        }
      }

      if (!resData.pageComponent.indexTitleConfig) {
        resData.pageComponent.indexTitleConfig = {
          titles: [
            {
              id: Math.random(),
              pageUrl: '/pages/home/index',
              navName: '首页',
            }, {
              id: Math.random(),
              pageUrl: '/pages/bargain/bargain-list/index',
              navName: '全民砍价',
            }, {
              id: Math.random(),
              pageUrl: '/pages/seckill/seckill-list/index',
              navName: '限时秒杀',
            }, {
              id: Math.random(),
              pageUrl: '/pages/groupon/groupon-list/index',
              navName: '一起拼团',
            }, {
              id: Math.random(),
              pageUrl: '/pages/article/article-list/index',
              navName: '新闻资讯',
            }
          ]
        }
      }
      return resData
    },
    getPageData() {
      if (this.id != 'undefined' && this.id && this.id != 'null') {
        getObj(this.id).then(response => {
          if (response.data) {
            this.initPageData = this.setPageDivInitData(response.data.data)
            this.getComponentsDataById();
          }
        }).catch((e) => {
        })
      } else {
        let initPageData = {
          clientType: 'H5-PC',
          pageComponent: {
            indexBanner: {//首页轮播图配置
              images: {
                swiperType: 'screen-swiper',
                dotStyle: 'square-dot',
                background: 'red',
                height: 560,
                interval: 3000,
                borderRadius: 0,
                imageSpacing: 0,
                swiperList: [{
                  id: Math.random(),
                  imageUrl: '',
                  imgWidth: 0,
                  imgHeight: 0,
                  pageUrl: '',
                  itemTitle: ''
                }]
              },
              config: {}
            },
            componentsList: []
          }
        }
        this.initPageData = this.setPageDivInitData(initPageData)
        this.updateData({
          showModal: false,
          clickComIndex: null,
          componentsList: this.initPageData.pageComponent.componentsList
        })
      }
    },
    closePage: function () {
      window.opener = null;
      window.open("about:blank", "_top").close()
    },
    handlePreview() {
      this.showPreview = !this.showPreview
      if (this.showPreview) {
        this.showSetBlock = false
      }
    },
    handleSave() {
      this.initPageData.pageType = '1'
      this.initPageData.pageName = '商城首页'
      this.initPageData.pageComponent.componentsList = this.componentsList;
      if (this.initPageData.id) {
        putObj(this.initPageData).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
            offset: 50
          })
          // this.closePage()
        }).catch(() => {
        })
      } else {
        if (!this.initPageData.clientType) {
          this.$message({
            showClose: true,
            message: '请先选择一个应用端！',
            type: 'info',
            offset: 50
          })
          return;
        }
        addObj(this.initPageData).then(response => {
          this.$message({
            showClose: true,
            message: '添加成功',
            type: 'success',
            offset: 50
          })
          // this.$router.$avueRouter.closeTag();
          // this.$router.back();
          if (response.data.data.id) {
            this.initPageData.id = response.data.data.id
            this.updateData({pageId: response.data.data.id})
            window.localStorage.setItem(this.saveKey, this.pageId);
            this.initPage();
          }
        }).catch(() => {
        })
      }
    },
    // 获取回显数据
    getComponentsDataById(id) {
      let that = this;
      that.componentsList = [];
      if (this.initPageData.pageComponent && this.initPageData.pageComponent.componentsList && this.initPageData.pageComponent.componentsList.length > 0) {
        that.componentsList = this.initPageData.pageComponent.componentsList
        // 数据筛选 避免无效数据
        that.componentsList = that.componentsList.filter(item => item.componentName);
        that.updateData({componentsList: that.componentsList});
      }
    },
    // 添加组件
    addComponents(cName, config = {}) {
      let that = this;
      //计算动态的id值
      let componentsLen = this.componentsList ? this.componentsList.length : 0;
      let dynamicID = componentsLen ? that.componentsList.reduce((item1, item2) => (item1.id > item2.id ? item1 : item2)).id + 1 : 1;

      that.componentsList.push({
        componentName: cName,
        id: dynamicID,
        data: {},
        config: config
      })
      that.updateData({componentsList: that.componentsList});
      // 显示最新添加的模块
      that.$nextTick(() => {
        let newComponentEle = that.$refs['drag-item-' + dynamicID][0];
        // newComponentEle.scrollIntodiv({
        //     // behavior: 'smooth',
        //     block   : 'end'
        // })
        setTimeout(() => {
          var event = new MouseEvent("click");
          newComponentEle.dispatchEvent(event);
        }, 100)
      })
    },
    // 展示首页轮播图设置框
    changeCompData(type, data) {
      if (type == 'swiper') {
        this.initPageData.pageComponent.indexBanner['images'] = data
      } else if (type == 'logoConfig') {
        this.initPageData.pageComponent.logoConfig = data
      } else if (type == 'pageFooterConfig') {
        this.initPageData.pageComponent.pageFooterConfig = data
      }
    },
    showIndexBannerImagesSetting() {
      let index = 'indexBanner'
      let cid = 'indexBanner'
      let cName = 'swiperComponent'

      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.showSetCompet = that.$refs['indexBannerRef'];
      let elPositionInfo = that.showSetCompet.getBoundingClientRect();
      that.updateData({clickComIndex: index})

      that.$set(that.settingPosit, 'top', elPositionInfo.top)
      that.$set(that.settingPosit, 'left', elPositionInfo.width + 20);
      that.$set(that.settingPosit, 'timeStamp', new Date().getTime());

      this.currentComType = cName.split('Component')[0];
      this.showData = this.initPageData.pageComponent.indexBanner['images'];
      this.comConfig = this.initPageData.pageComponent.indexBanner['config'];

      this.showSetBtn = true;
    },
    // 展示页面底部设置框 -3
    showPageFooterSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'pageDivFooter';
      this.showData = this.initPageData.pageComponent.pageFooterConfig;
      this.comConfig = this.initPageData.pageComponent.pageFooterConfig.config;
      this.showSetBtn = true;
    },
    // 展示logo设置框 -2
    showLogoSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'logo';
      this.showData = this.initPageData.pageComponent.logoConfig;
      this.comConfig = this.initPageData.pageComponent.logoConfig.config;
      this.showSetBtn = true;
    },
    // 展示首页标题设置框 -3
    showIndexTitleSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'indexTitle';
      this.showData = this.initPageData.pageComponent.indexTitleConfig;
      this.comConfig = this.initPageData.pageComponent.indexTitleConfig.config;
      this.showSetBtn = true;
    },
    // 展示 首页顶部广告图片 -4
    showTopImageSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'topImage';
      this.showData = this.initPageData.pageComponent.topImageConfig;
      this.comConfig = this.initPageData.pageComponent.topImageConfig ? this.initPageData.pageComponent.topImageConfig.config : {};
      this.showSetBtn = true;
    },
    // 展示设置框
    showSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.showSetCompet = that.$refs['drag-item-' + cid][0];
      let elPositionInfo = that.showSetCompet.getBoundingClientRect();
      that.updateData({clickComIndex: index})

      that.$set(that.settingPosit, 'top', elPositionInfo.top <= 160 ? 160 : elPositionInfo.top - 80)
      that.$set(that.settingPosit, 'left', elPositionInfo.width + 20);
      that.$set(that.settingPosit, 'timeStamp', new Date().getTime());

      this.currentComType = cName.split('Component')[0];
      this.showData = that.componentsList[this.clickComIndex]['data'];
      this.comConfig = that.componentsList[this.clickComIndex]['config'];
      this.showSetBtn = true;
    },
    // 取消设置
    settingCancel() {
      let that = this;
      that.showData = {};
      that.updateData({clickComIndex: null})
      that.showSetBlock = false;
    },
    // 确认设置
    settingConfirm(data) {
      let that = this;
      that.$set(that.componentsList[that.clickComIndex], 'data', data)
      that.updateData({
        clickComIndex: null,
        componentsList: that.componentsList
      })
      that.showSetBlock = false;
    },
    // 删除组件
    deleteComponent() {
      let that = this;
      that.$confirm('是否删除该组件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.componentsList.splice(that.clickComIndex, 1)
        that.updateData({
          showModal: false,
          clickComIndex: null,
          componentsList: that.componentsList
        })
        that.showSetBlock = false;
        that.showSetBtn = false;
      })
    },
    //排序
    componentSort(type) {
      let that = this;
      if (type == 'up') {
        if (that.clickComIndex == 0) return false;
        that.dataInterchange(that.componentsList, that.clickComIndex - 1, that.clickComIndex);
        that.updateData({clickComIndex: that.clickComIndex - 1})
      } else {
        if (that.clickComIndex == that.componentsList.length - 1) return false;
        that.dataInterchange(that.componentsList, that.clickComIndex + 1, that.clickComIndex);
        that.updateData({clickComIndex: that.clickComIndex + 1})
      }
      that.showSetBlock = false;
      // 设置跟随；
      that.$nextTick(() => {
        let activeComponentData = that.componentsList[that.clickComIndex];
        let activeComponenttEle = that.$refs['drag-item-' + activeComponentData.id][0];
        // activeComponenttEle.scrollIntodiv({block: 'center'});
        that.showSetting(that.clickComIndex, activeComponentData.id, activeComponentData.componentName);
      })
    },
    // 提交页面
    submitData() {
      let that = this;
      return new Promise((resolve, reject) => {
        if (that.componentsList && that.componentsList.length) {
          resolve(JSON.stringify(that.componentsList))
        } else {
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
      return (e.draggedContext.element.text !== 'Gold（不可拖动元素）');
    },
    // div中内容滚动检测 （右侧设置的动态显示）
    componentDivScroll(e) {

      // let that = this;
      // if(!that.showSetCompet) return false;
      //
      // let elPositionInfo = that.showSetCompet.getBoundingClientRect();
      // that.$set(that.settingPosit, 'top', elPositionInfo.top<=160 ? 160 : elPositionInfo.top )
      // let contentHeight = e.target.scrollHeight;
      // let divHeight    = e.target.clientHeight;
      // let scrollTop     = e.target.scrollTop;
      //
      // let eleHeight     = elPositionInfo.height;
      // let eleOffsetTop  = that.showSetCompet.offsetTop;
      //
      // let AMEND_TOP = 30 + 65;    // 顶部消失的修正值
      // let AMEND_BOTTOM = -20;      // 底部消失的修正值
      // let topCritical    = scrollTop > (eleHeight + eleOffsetTop - AMEND_TOP);          // 顶部达到临界
      // let bottomCritical = eleOffsetTop > (scrollTop + divHeight - AMEND_BOTTOM);      // 底部达到临界
      // (topCritical || bottomCritical) && that.settingCancel();
    },
    modifySetPosition(settingTop) {
      let that = this;
      that.$nextTick(() => {
        setTimeout(() => {
          let settingEle = that.$refs.settingBlock;
          if (!settingEle) return false;

          let setHeight = settingEle.getBoundingClientRect().height;
          if (settingTop + setHeight > that.initPageHeight) {
            that.setBlockTop = that.initPageHeight - setHeight;
            that.setRowTop = setHeight - (that.initPageHeight - settingTop);
          } else {
            that.setBlockTop = settingTop < 0 ? 0 : settingTop;
            that.setRowTop = 0;
          }
        }, 20)
      })
    }
  },
  // 离开
  // beforeRouteLeave(to, from, next){
  //     let that = this;
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
    showModal(newVal) {
      this.$nextTick(() => {
        this.showSetBtn = this.showSetBlock = newVal
      })
    },
    settingPosit: {
      handler(newVal) {
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
</style>

<style lang="scss" scoped>

@import '../colorui/config.scss';
@import '../colorui/mixin.scss';
@import '../colorui/base.scss';

.body {
  background-color: #000000;
}

.pc-div-page-index {

  .dm-container-swiper {
    width: 1226px;
    display: flex;
    justify-content: space-between; //水平方向，默认两边放置
    align-items: center; //垂直方向，默认居中
    margin: 0 auto;
  }

  .nav-menu {
    position: absolute;
    width: 220px;
    height: 500px;
    z-index: 5;
    padding: 26px 0;
    // 带透明度的背景色
    background-color: rgba(85, 88, 90, 0.48);
    box-sizing: border-box;

    .menu-wrap {
      height: 440px;
      overflow: scroll;
      overflow-x: hidden;
      overflow-y: auto;

      .menu-item {
        height: 40px;
        line-height: 40px;

        .item-text {
          position: relative;
          display: block;
          font-size: 14px;
          color: #ffffff;
          padding-left: 30px;

          &:after {
            position: absolute;
            right: 30px;
            top: 17.5px;
            content: ' ';
          }
        }

        &:hover {
          background-color: $colorA;

          .children {
            display: block;

          }

          &:hover {
            color: $colorA;
          }
        }

        .children {
          display: none;
          width: 1006px;
          height: 500px;
          background-color: $colorD;
          position: absolute;
          top: 0;
          left: 220px;
          z-index: 1024;

          .image-class {
            width: 68px;
            height: 68px;
            vertical-align: middle;
            z-index: 1024;
          }

          .category-name {
            color: #888;

            &:hover {
              color: $colorA;
            }
          }

        }
      }
    }

  }

  .header {
    font-size: 14px;
    z-index: 9999;

    &.is-fixed {
      position: fixed;
      top: 0;
      width: 100%;
      box-shadow: 0 1px 2px $colorC;
    }

    .topbar-menu {
      margin-left: 5px;
    }

    .topbar-user {
      margin-right: 5px;
    }

    .top-title-bar {
      position: relative;
      width: 1226px;
      margin-right: auto;
      margin-left: auto;
    }


    .nav-topbar {
      height: 39px;
      line-height: 39px;
      background-color: #e3e4e5;
      color: #333333;
      z-index: 99;
      //position: fixed;
      top: 0;
      width: 100%;
      left: 0;
      box-shadow: 0 1px 2px $colorC;
      font-size: 12px !important;

      .container {
        width: 1256px;
        font-weight: 300;
        // flex弹性布局，水平、垂直居中
        display: flex;
        justify-content: space-between; //水平方向，默认两边放置
        align-items: center; //垂直方向，默认居中

        a {
          display: inline-block;
          // .nav-topbar中的color对a标签内的字体颜色不起作用，再设置一次(这里的优先级最高)
          color: #B0B0B0;
          margin-right: 17px;
        }

        .my-cart {
          width: 110px;
          text-align: center;
          color: #ffffff;
          margin-right: 0;

          .icon-cart {
            margin-right: 4px;
          }
        }
      }
    }

    .nav-header {
      //margin-top: 80px;//40px
      background: #ffffff;
      width: 100%;

      .container {
        position: relative;
        height: 112px;
        // scss语法，@include 方法名() , 即调用xx.scss种定义的那个方法
        display: flex;
        justify-content: space-between; //水平方向，默认两边放置
        align-items: center; //垂直方向，默认居中


        .header-logo-div {
          display: flex;

          &:hover {
            cursor: move;
            border: 1px dashed #165dff;
          }
        }

        .header-logo {
          display: inline-block;
          padding-left: 5px;
          width: 55px;
          height: 55px;
          background-color: #FFFFFF;
          float: left;

          .logo {
            display: inline-block;
            width: 110px;
            height: 55px;
            @include bgImg(55px, 55px, '../assets/logo-2.png', 55px);
          }
        }

        .header-logo-title {
          color: $colorB;
          font-weight: bold;
          font-size: 20px;
          width: 200px;
          float: left;
          margin-left: 11px;
          align-self: center;
        }

        .header-menu {
          display: inline-block;
          width: 643px;
          padding-left: 20px;

          &:hover {
            cursor: move;
            border: 1px dashed #165dff;
          }

          .item-menu {
            display: inline-block;
            color: $colorB;
            font-weight: bold;
            font-size: 16px;
            margin-right: 20px;

            span {
              cursor: pointer;
            }

            .active {
              color: $colorA;
            }

            &:hover {
              color: $colorA;

              // 鼠标悬停到菜单上，显示对应菜单的下拉框，高度从0->220,透明度从0->1
              .children {
                height: 220px;
                opacity: 1;
              }
            }

            .children {
              //.nav-header下的.container设置了相对定位，以这个位置为基准
              position: absolute;
              top: 112px;
              left: 0;
              width: 1226px;
              height: 0;
              opacity: 0;
              overflow: hidden;
              border-top: 1px solid #E5E5E5;
              box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
              z-index: 10;
              transition: all 0.5s;
              background-color: #ffffff;

              .product {
                position: relative;
                float: left;
                width: 16.6%;
                height: 220px;
                font-size: 12px;
                line-height: 12px;
                text-align: center;

                a {
                  // a是行内标签，要设置成块级，这样a包括的内容会撑开a，易于检查
                  display: inline-block;
                }

                img {
                  width: auto;
                  height: 111px;
                  margin-top: 26px;
                }

                .pro-img {
                  height: 137px;
                }

                .pro-name {
                  font-weight: bold;
                  margin-top: 19px;
                  margin-bottom: 8px;
                  color: $colorB;
                }

                .pro-price {
                  color: $colorA;
                }

                &:before {
                  // 当前.product设置了相对定位，.product的伪类以这个位置为基准
                  content: '';
                  position: absolute;
                  top: 28px;
                  right: 0;
                  border-left: 1px solid $colorC;
                  height: 100px;
                  width: 1px;
                }

                // 最后一个<li class=product>的伪类:before去掉(不显示)
                &:last-child:before {
                  display: none;
                }
              }
            }
          }
        }

        .el-select .el-input__inner {
          border: #ffffff 1px solid !important;
        }

        .header-search {
          width: 500px;

          .search-icon-class {
            line-height: 40px;
            background-color: #fb2d1a;
            color: #fff;
          }

          .shop-cart {
            width: 100px;
            height: 40px;
            border: 2px solid #fb2d1a;
            color: #fb2d1a;
            line-height: 40px;
            margin-right: 20px;
          }

          .wapper {
            height: 40px;
            background-color: #fff;
            font-weight: 300;
            border: 2px solid #fb2d1a;
            display: flex;
            align-items: center;

            .input {
              // 去除浏览器内置的边框样式
              border: none;
              // 设置了box-sizing则整个input宽度总和是264px(包括了padding值)，否则padding而外算，叠加了！
              box-sizing: border-box;
              width: 380px;
              height: 40px;
              padding-left: 10px;
              line-height: 40px;
            }

          }
        }
      }
    }
  }
}
</style>
