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
    <div class="pc-div-page-index-shop">


      <div class="top " v-show="showPreview" @click="handlePreview()">
        <span style="width: 20px">展开</span><i class="el-icon-arrow-right"></i>
      </div>
      <div v-show="!showPreview" class="left-div">
        <div style="font-size: 14px;margin-top: 10px;">
          应用端:<span style="color: red;margin-left: 5px;">PC端</span>
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
      <div class="content bg-gray">
        <div class="showContent bg-gray">
          <div class="pageContent " :style="{background: pageSetData?pageSetData.bgColor:''}">
            <div class="pageTopBlock ">
              <div class="header ">
                <div class="nav-topbar">
                  <div class="container">
                    <div class="topbar-menu flex">
                      <span>商城名称</span>
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
              <!-- 轮播图 -->
              <!--                <div @click="showIndexBannerImagesSetting()" ref="indexBannerRef">-->
              <!--                  <component :is="'swiperComponent'" :setData="initPageData.pageComponent.indexBanner.images"-->
              <!--                             :config="initPageData.pageComponent.indexBanner.config"-->
              <!--                             :cId="'indexBanner'"-->
              <!--                             :thememobile="thememobile" ></component>-->
              <!--                </div>-->
            </div>
            <!--  tabbar -->
            <div class="fixed-tabbar">
              <shop-tabbar :shopId="id" :thememobile="thememobile"></shop-tabbar>
            </div>
            <div class="bg-white" style="margin-top: 40px;">
              <div class="container ">
                <shop-info-component :shopId="id" :thememobile="thememobile"></shop-info-component>
              </div>
            </div>
            <div class=" componentsList " :style="{overflowY: showModal?'hidden':'auto'}" ref="componentsDiv">
              <draggable v-model="componentsList" @start="datadragStart" @update="datadragUpdate" @end="datadragEnd"
                         :disabled="!enabled" :move="datadragMove" :options="{animation:500}">
                <transition-group>
                  <!-- <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" @mouseenter="mouseEnter($event, index, item.componentName)"> -->
                  <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item "
                       :class="{'container':item.componentName!='swiperComponent','focus-class':index==clickComIndex}"
                       :style="{backgroundColor: item.componentName=='swiperComponent'?'#f1f1f1':''}"
                       :ref="'drag-item-'+item.id"
                       @click="showSetting(index, item.id, item.componentName)">
                    <component :shopId="id" :is="item.componentName" :setData="item.data" :config="item.config"
                               :cId="item.id"
                               :thememobile="thememobile"></component>
                    <div v-if="showSetBtn && index === clickComIndex&& clickComIndex!=null"
                         class="funBlock">
                      <i class="icon el-icon-arrow-up" @click="componentSort('up')"></i>
                      <i class="icon el-icon-arrow-down" @click="componentSort('dowm')"></i>
                      <i class="icon el-icon-delete" @click="deleteComponent"></i>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
          </div>
        </div>
        <div class="cu-load bg-gray over"></div>
      </div>
      <!-- 右侧组件设置 -->
      <div v-if="showSetBlock" class="settingBlock" ref="settingBlock">
        <el-button type="text" style="right: 10px;position:absolute;z-index: 999;font-size: 18px;"
                   @click="showSetBlock=false" icon="el-icon-close"></el-button>
        <component :shopId="initPageData.shopId" :is="currentComType+'Setting'" :showData="showData" :config="comConfig"
                   @cancel="settingCancel" @confirm="settingConfirm" :thememobile="thememobile"
                   @setPosition="modifySetPosition(settingPosit.top)" :clientType="initPageData.clientType">
        </component>
      </div>
    </div>
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';
// 组件
import swiperComponent from "../components/swiper.vue";
import imageComponent from "../components/image.vue";
import imageMultiComponent from "../components/imageMulti.vue";
import imageMultiSetting from "../component-setting/imageMultiSetting";

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

import goodsRowComponent from "../components/goodsRow.vue";
import goodsRowSetting from "../component-setting/goodsRowSetting.vue";

import tabbarComponent from "../components/tabbar.vue";
import shopTabbar from "../components/tabbar.vue";
import tabbarSetting from "../component-setting/tabbarSetting.vue";
import shopInfoComponent from "../components/shopInfo.vue";
import shopInfoSetting from "../component-setting/shopInfoSetting.vue";

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
    shopTabbar,
    imageComponent,
    swiperComponent,
    navButtonComponent,
    noticeComponent,
    titleTextComponent,
    goodsComponent,
    goodsRowComponent,
    tabbarComponent,
    shopInfoComponent,
    pageSetting,
    imageSetting,
    swiperSetting,
    navButtonSetting,
    noticeSetting,
    titleTextSetting,
    goodsSetting,
    goodsRowSetting,
    tabbarSetting,
    shopInfoSetting,
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
  props: {},
  created() {
    if (this.$route.query.shopId) {
      this.id = this.$route.query.shopId
      this.initPageData.pageName = this.$route.query.shopName
      this.initPageData.shopId = this.$route.query.shopId
    }
    getObj2().then(response => {
      this.thememobile = response.data.data
    });
  },
  data() {
    return {
      noPic: require('../assets/images/icon/img_pic@2x.png'),
      thememobile: {
        backgroundColor: ''
      },
      shopList: [],
      id: null,// 注意：这个ID为shopId
      showPreview: false,
      shopInfo: {
        imgUrl: '',
        address: '',
        phone: '',
        name: '',
        collectCount: '',
      },
      initPageData: {
        shopId: '',
        clientType: 'H5-PC',
        pageName: '店铺首页',
        pageType: '2',
        pageComponent: {
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
            name: '单图',
            img: require('../assets/images/icon/ic_pic.png'),
            eventPayload: {name: 'imageComponent', payLoad: {singleImg: true}}
          }, {
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
          // {name: 'TAB分类页签', img: require('../assets/images/icon/ic_recommend.png'), eventPayload: {name: 'tabbarComponent', payLoad: {}}},
          // {name: '店铺信息', img: require('../assets/images/icon/ic_recommend.png'), eventPayload: {name: 'shopInfoComponent', payLoad: {}}},
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

    };
  },
  computed: {
    ...mapState({
      pageSetData: state => state.divpageShop.pageSetData,
      clickComIndex: state => state.divpageShop.clickComIndex,
      showModal: state => state.divpageShop.showModal,
      pageId: state => state.divpageShop.pageId,//页面ID（店铺装修暂时忽略不用）
      shopId: state => state.divpageShop.shopId,//店铺ID
    }),
    componentsList: {
      get() {
        return this.$store.state.divpageShop.componentsList
      },
      set(newVal) {
        this.$store.commit('updateData', {componentsList: newVal})
      }
    },
  },
  mounted() {
    let that = this;
    // 滑动监听
    // that.$refs.componentsDiv.addEventListener("scroll", that.componentDivScroll);
    //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.initPage();
  },
  destroyed() {
    window.localStorage.removeItem('PCdivPageShopId');
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),

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
    getShopInfo() {
      shopinfo.getObj(this.initPageData.shopId).then(response => {
        let curShop = response.data.data;
        this.initPageData.shopId = curShop.id;
        this.initPageData.pageName = curShop.name;
        this.shopInfo = curShop;
        this.id = this.initPageData.shopId;
        this.getPageData();
      })
    },
    shopChange(value) {
      if (value) {
        let curShop = null
        this.shopList.map((item) => {
          if (item.id == value) {
            curShop = item;
            return;
          }
        })
        if (curShop) {
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
    initPage() {
      let that = this;
      if (this.$route.query.shopId) {
        that.updateData({shopId: this.$route.query.shopId})
        window.localStorage.setItem('PCdivPageShopId', this.shopId);
      } else {
        let divPageShopId = window.localStorage.getItem('PCdivPageShopId');
        if (divPageShopId) {
          that.updateData({shopId: divPageShopId})
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
        window.localStorage.setItem('PCdivPageShopId', this.shopId);
      });
    },
    getPageData() {
      if (this.id && this.id != 'null') {
        getPageByShop({shopId: this.initPageData.shopId, clientType: 'H5-PC', pageType: 2}).then(response => {
          if (response.data.data.records) {
            if (response.data.data.records.length > 0) {
              this.initPageData = response.data.data.records[0];
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
            // 如果装修组件数量为0，那么表示没有进行装修过
            // if (response.data.data.records.length === 0) {

            // }
          } else {
            this.initShop();
          }
        }).catch((e) => {
        })
      } else {
        this.initShop();
      }
    },
    initShop() {
      this.initPageData = {
        shopId: this.id,
        clientType: 'H5-PC',
        pageName: '店铺首页',
        pageType: '2',
        pageComponent: {
          componentsList: []
        }
      }
      this.updateData({
        showModal: false,
        clickComIndex: null,
        componentsList: this.initPageData.pageComponent.componentsList
      })
      this.addComponents('tabbarComponent', {})
    },
    handleSave: function () {
      this.initPageData.pageType = '2';
      this.initPageData.clientType = 'H5-PC';
      // this.initPageData.shopId = '';
      // this.initPageData.pageName = 'd首页';
      this.initPageData.pageComponent.componentsList = this.componentsList;
      if (this.initPageData.id) {
        putObj(this.initPageData).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
            offset: 50
          })
        }).catch(() => {
        })
      } else {
        if (!this.initPageData.shopId) {
          this.$message({
            showClose: true,
            message: '请先选择一个店铺！',
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
            window.localStorage.setItem('PCdivPageShopId', this.pageId);
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
      if (!this.initPageData.shopId) {
        this.$message({
          showClose: true,
          message: '请先选择一个店铺！',
          type: 'info',
          offset: 50
        })
        return;
      }
      let that = this;
      //计算动态的id值
      let componentsLen = this.componentsList ? this.componentsList.length : 0;
      let dynamicID = componentsLen ? that.componentsList.reduce((item1, item2) => (item1.id > item2.id ? item1 : item2)).id + 1 : 1;

      that.componentsList.push({
        componentName: cName,
        id: dynamicID,
        data: {},
        config: config
      });
      that.updateData({componentsList: that.componentsList});
      // 显示最新添加的模块
      that.$nextTick(() => {
        let newComponentEle = that.$refs['drag-item-' + dynamicID][0];
        // newComponentEle.scrollIntoView({
        //   // behavior: 'smooth',
        //   block   : 'end'
        // })
        setTimeout(() => {
          var event = new MouseEvent("click");
          newComponentEle.dispatchEvent(event);
        }, 100)
      })
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
      this.showData = that.componentsList[that.clickComIndex]['data'];
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
        // activeComponenttEle.scrollIntoView({block: 'center'});
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

.fixed-tabbar {
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 100;
}

.cu-bar {
  display: flex;
  position: relative;
  align-items: center;
  min-height: 50px;
  justify-content: space-between;
}

.search {
  top: unset !important;
}

.cu-bar.fixed {
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

<style lang="scss" scoped>

@import '../colorui/config.scss';
@import '../colorui/mixin.scss';
@import '../colorui/base.scss';


.pc-div-page-index-shop {

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
    height: 560px;
    z-index: 5;
    padding: 26px 0;
    // 带透明度的背景色
    background-color: rgba(85, 88, 90, 0.48);
    box-sizing: border-box;

    .menu-wrap {
      height: 500px;
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
          height: 560px;
          background-color: $colorD;
          position: absolute;
          top: 0;
          left: 220px;

          .image-class {
            width: 68px;
            height: 68px;
            vertical-align: middle;
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

    .cu-bar {
      height: 50px;
    }

    .back {
      cursor: pointer;
    }

    .nav-topbar {
      height: 39px;
      line-height: 39px;
      background-color: #e3e4e5;
      color: #333333;
      z-index: 9999;
      position: fixed;
      top: 0;
      width: 100%;
      left: 0;
      box-shadow: 0 1px 2px $colorC;

      .container {
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
      margin-top: 40px;

      .container {
        width: 1256px;
        position: relative;
        height: 112px;
        // scss语法，@include 方法名() , 即调用xx.scss种定义的那个方法
        display: flex;
        justify-content: space-between; //水平方向，默认两边放置
        align-items: center; //垂直方向，默认居中

        .header-logo {
          display: inline-block;
          width: 55px;
          height: 55px;
          background-color: #FFFFFF;

          .logo {
            display: inline-block;
            width: 110px;
            height: 55px;
          }
        }

        .header-logo-title {
          color: $colorB;
          font-weight: bold;
          font-size: 20px;
        }

        .header-menu {
          display: inline-block;
          width: 643px;
          padding-left: 20px;

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
          width: 300px;
          padding-right: 10px;

          .wapper {
            background: #e5e5e5;
            height: 40px;
            display: flex;
            align-items: center;
            font-weight: 300;

            .select-class {
              width: 50px;
              color: #555555;
              font-size: 14px;
            }

            .input-class {
              margin-left: 5px;
              color: #777777;
              width: 250px;
              font-size: 14px;
            }

            .search-icon-class {
              margin-left: 17px;
              color: #555555;
            }
          }
        }
      }
    }
  }
}
</style>
