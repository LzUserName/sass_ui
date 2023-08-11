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
    <basic-container>
      <div class="div-page-index">
        <el-row class="content " style="width: 100%;">
          <!-- 左侧组件 -->
          <el-col :span="5" class="left-class">
            <div v-if="!(id&&id!='null')">
              <!--<div style="padding: 10px;" v-if="(id&&id!='null')">-->
              应用端:
              <el-select style="width: 70%;" v-model="initPageData.clientType" placeholder="请选择" size="mini"
                         :disabled="!!(id&&id!='null')">
                <el-option
                  v-for="item in clientTypeData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
                </el-option>
              </el-select>
              <div v-if="initPageData.clientType === 'MA'" @click="showShareSetting(-12)" class="share-p"><i class="el-icon-share" style="font-size: 16px;"></i>
              </div>
            </div>
            <div v-else-if="initPageData.clientType" style="font-size: 15px;">
              应用端:<span
              style="color: red;margin-left: 10px;">{{
                initPageData.clientType === 'MA' ? '小程序' : initPageData.clientType
              }} 端</span>
              <div v-if="initPageData.clientType === 'MA'" @click="showShareSetting(-12)" class="share-p"><i class="el-icon-share" style="font-size: 16px;"></i>
              </div>
            </div>
            <div style="text-align: center; padding: 5px; margin-top: 10px;">
              <span>组件库</span>
            </div>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="基础组件" name="imageModule">
                <el-row :gutter="10">
                  <el-col :span="8" v-for="item in addCompBtns.baseModule" :key="item.name"
                          style="margin-top: 5px; text-align: center;">
                    <div style="background: #f7f7f7; padding: 10px; border-radius: 10px;"
                         @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                      <img :src="item.img" style="width: 26px; height: 26px; opacity: 0.8;">
                      <p>{{ item.name }}</p>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <!--                  待开发 -->
              <el-collapse-item title="营销模块" name="functionModule">
                <el-row :gutter="10">
                  <el-col :span="8" v-for="item in addCompBtns.functionModule" :key="item.name"
                          style="margin-top: 5px; text-align: center;">
                    <div style="background: #f7f7f7; padding: 10px; border-radius: 10px;"
                         @click="addComponents(item.eventPayload.name, item.eventPayload.payLoad)">
                      <img :src="item.img" style="width: 26px; height: 26px; opacity: 0.8;">
                      <p>{{ item.name }}</p>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <el-button type="primary" style="width: 100%;" size="small" @click.stop="handleSave()">保存</el-button>
          </el-col>
          <!-- 中间页面 -->
          <el-col :span="9" class="showContent">
            <div class="preview">
              <div >
                <div style="border-radius: 50px 50px 0 0; height: 66px;width: 375px;margin-left: 15px;"
                     :style="{background: pageSetData?pageSetData.bgColor:''}"
                     :class="'bg-'+thememobile.backgroundColor">
                  <div style="display: flex;justify-content: center;height: 20px;width: 375px;">
                    <div class="notch"></div>
                  </div>
                  <div style="position: relative;">
                    <div class="pageTopBlock" :class="'bg-'+thememobile.backgroundColor"
                         style="color: #ffffff;font-size: 16px;display: flex;align-items: center;">
                      <img
                        v-if="initPageData.pageComponent.topNavComponent&&initPageData.pageComponent.topNavComponent.leftImageShow==1"
                        :src="initPageData.pageComponent.topNavComponent.leftImageUrl?initPageData.pageComponent.topNavComponent.leftImageUrl:noPic"
                        :style="{
                            width: `${initPageData.pageComponent.topNavComponent.leftImageWidth}px`,
                            height: `${initPageData.pageComponent.topNavComponent.leftImageHeight}px`,
                            marginLeft: `${initPageData.pageComponent.topNavComponent.leftImageMarginLeft}px`,
                         }"
                      />
                      <p class="title" :style="{color: initPageData.pageComponent.topNavComponent&&initPageData.pageComponent.topNavComponent.titleColor?initPageData.pageComponent.topNavComponent.titleColor:''}">
                        {{ initPageData.pageComponent.topNavComponent?initPageData.pageComponent.topNavComponent.title||'首页':'首页' }}
                      </p>
                      <div @click="showTopNavSetting(-13)"
                           style="margin: 15px;cursor:pointer;right: 0;position: absolute"><i class="el-icon-setting"
                                                                                              style="font-size: 16px;cursor:pointer;"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pageContent" :style="{background: pageSetData?pageSetData.bgColor:''}">
                  <div class="componentsList" :style="{overflowY: showModal?'hidden':'auto'}" ref="componentsDiv">
                    <draggable v-model="componentsList" @start="datadragStart" @update="datadragUpdate"
                               @end="datadragEnd" :disabled="!enabled" :move="datadragMove"
                               :options="{animation:500}">
                      <transition-group>
                        <!-- <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item" @mouseenter="mouseEnter($event, index, item.componentName)"> -->
                        <div v-for="(item,index) in componentsList" :key="item.id" class="drag-item "
                             :class="index==clickComIndex?'focus-class':''" :ref="'drag-item-'+item.id"
                             @click="showSetting(index, item.id, item.componentName)">
                          <component :is="item.componentName" :setData="item.data" :config="item.config"
                                     :cId="item.id" :thememobile="thememobile" :theme="thememobile"></component>
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
              </div>
            </div>
          </el-col>
          <!-- 右侧组件设置 -->
          <el-col :span="8">
            <div v-if="showSetBlock" class="settingBlock" ref="settingBlock">
              <component @changeCompData="changeCompData" :is="currentComType+'Setting'" :showData="showData"
                         :config="comConfig" @cancel="settingCancel" @confirm="settingConfirm"
                         :thememobile="thememobile"
                         @setPosition="modifySetPosition(settingPosit.top)" :clientType="initPageData.clientType">
              </component>
            </div>
          </el-col>
        </el-row>
      </div>
    </basic-container>
  </div>
</template>

<script>

// 接口地址
import {getPage, getObj, addObj, putObj, delObj} from '@/api/mall/pagedevise'
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
import goodsNewComponent from "../components/goodsNew.vue";
import goodsNewSetting from "../component-setting/goodsNewSetting.vue";
import imageMultiComponent from "../components/imageMulti.vue";
import imageMultiSetting from "../component-setting/imageMultiSetting.vue";
import shareSetting from "../component-setting/shareSetting.vue";
import topNavSetting from "../component-setting/topNavSetting.vue";

// 组件设置
import pageSetting from "../component-setting/pageSetting.vue";

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
    shareSetting,
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
    goodsNewComponent,
    couponSetting,
    bargainSetting,
    grouponSetting,
    seckillSetting,
    imageMultiSetting,
    goodsNewSetting,
    topNavSetting,
  },
  props: {
    // initPageData:{
    //   type: Object,
    //   default: ()=> {}
    // },
  },
  created() {
    this.initPageData.clientType = ""
    // 用于获取缓存租户的装修id
    let tenantId = this.userInfo.switchTenantId || this.userInfo.tenantId
    this.saveKey = 'divPageId_' + tenantId + this.userInfo.username
    getObj2().then(response => {
      this.thememobile = response.data.data
      // 商城展示模式 1 多店铺版 2 单店铺版，如果是单店铺版去掉店铺装修组件
      if (this.thememobile.showType != '2') {
        this.addCompBtns.baseModule.push({
          name: '店铺甄选',
          img: require('../assets/images/icon/ic_shop.png'),
          eventPayload: {name: 'shopComponent', payLoad: {}}
        })
      }
    });
    // 获取应用类型数据
    getPage(Object.assign({
      current: 0,
      size: 10,
      descs: [],
      ascs: [],
      pageType: '1'
    }, {}, {})).then(response => {
      let tableData = response.data.data.records
      let clientTypeData = this.clientTypeData
      if (clientTypeData && clientTypeData.length > 0) {
        for (let i = 0; i < clientTypeData.length; i++) {
          clientTypeData[i].disabled = false
          for (let j = 0; j < tableData.length; j++) {
            if (clientTypeData[i].value == tableData[j].clientType) {
              clientTypeData[i].disabled = true
            }
          }
        }
      }
    }).catch(() => {

    })
  },
  data() {
    return {

      saveKey: 'divPageId_',

      noPic: require('../assets/images/icon/img_pic@2x.png'),
      thememobile: {
        backgroundColor: ''
      },
      clientTypeData: [{
        label: 'H5',
        value: 'H5',
        disabled: true
      }, {
        label: 'APP',
        value: 'APP',
        disabled: true
      }, {
        label: '小程序',
        value: 'MA',
        disabled: true
      }],
      id: null,
      initPageData: {
        clientType: '',
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
            name: '搜索框',
            img: require('../assets/images/icon/ic_search.png'),
            eventPayload: {name: 'searchComponent', payLoad: {}}
          },
          {
            name: '商品分类',
            img: require('../assets/images/icon/ic_classify.png'),
            eventPayload: {name: 'goodsCategoryComponent', payLoad: {}}
          },
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
            name: '热选爆款',
            img: require('../assets/images/icon/ic_goods_recommend.png'),
            eventPayload: {name: 'goodsNewComponent', payLoad: {}}
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
    window.localStorage.removeItem(this.saveKey);
  },
  methods: {
    ...mapMutations([
      'updateData'
    ]),
    initPage() {
      let that = this;
      if (this.$route.params.id) {
        that.updateData({pageId: this.$route.params.id})
        window.localStorage.setItem(this.saveKey, this.pageId);
      } else {
        let divPageId = window.localStorage.getItem(this.saveKey);
        if (divPageId) {
          that.updateData({pageId: divPageId})
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
    getPageData() {
      if (this.id != 'undefined' && this.id && this.id != 'null') {
        getObj(this.id).then(response => {
          if (response.data) {
            this.initPageData = response.data.data
            this.getComponentsDataById();
            let clientTypeData = this.clientTypeData
            if (clientTypeData && clientTypeData.length > 0) {
              for (let i = 0; i < clientTypeData.length; i++) {
                clientTypeData[i].disabled = false
                for (let j = 0; j < this.tableData.length; j++) {
                  if (clientTypeData[i].value == this.initPageData.clientType) {
                    clientTypeData[i].disabled = true
                  }
                }
              }
            }
          }
        }).catch((e) => {
        })
      } else {

        this.initPageData = {
          clientType: '',
          pageComponent: {
            componentsList: []
          }
        }
        if (this.$route.params.clientType)
          this.initPageData.clientType = this.$route.params.clientType
        this.updateData({
          showModal: false,
          clickComIndex: null,
          componentsList: this.initPageData.pageComponent.componentsList
        })
      }
    },
    handleSave: function () {
      this.initPageData.pageType = '1'
      this.initPageData.pageName = this.initPageData.pageName || '商城首页'
      this.initPageData.pageComponent.componentsList = this.componentsList;
      if (this.initPageData.id) {
        putObj(this.initPageData).then(response => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
        }).catch(() => {
        })
      } else {
        if (!this.initPageData.clientType) {
          this.$message({
            showClose: true,
            message: '请先选择一个应用端！',
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
        // newComponentEle.scrollIntoView({
        //     // behavior: 'smooth',
        //     block   : 'end'
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

    // 展示topNav设置框 -13
    showTopNavSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'topNav';
      let topNavData = {
        leftImageShow: "0",
        leftImagePageUrl: "",
        leftImageUrl: "",
        leftImageHeight: 40,
        leftImageWidth: 110,
        leftImageMarginLeft: 10,
        config: {}
      }
      if (this.initPageData.pageComponent.topNavComponent) {
        topNavData = this.initPageData.pageComponent.topNavComponent
      }
      this.showData = topNavData;
      this.comConfig = topNavData.config;
      this.showSetBtn = true;
    },
    // 展示share设置框 -12
    showShareSetting(index, cid, cName) {
      let that = this;
      if (index != that.clickComIndex || !that.showSetBlock) {
        that.showSetBlock = false;
        that.$nextTick(() => {
          that.showSetBlock = true
        })
      }
      that.updateData({clickComIndex: index})
      this.currentComType = 'share';
      this.initPageData.pageImg = this.initPageData.pageImg || ''
      let shareConfig = {
        pageDesc: this.initPageData.pageDesc || '分享一个好东西给你',
        pageName: this.initPageData.pageName || '购物',
        pageImg: this.initPageData.pageImg || '',
        config: {}
      }
      this.showData = shareConfig;
      this.comConfig = shareConfig.config;
      this.showSetBtn = true;
    },
    // 展示设置框
    changeCompData(type, data) {
      if (type == 'shareConfig') {
        this.initPageData.pageDesc = data.pageDesc
        this.initPageData.pageName = data.pageName
        this.initPageData.pageImg = data.pageImg
      } else if (type == 'topNavConfig') {
        this.initPageData.pageComponent.topNavComponent = data
      }
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


.preview {
  background-image: url(/img/preview/preview-phone.png);
  background-repeat: round;
  height: 790px;
  width: 403px;
  z-index: 999;
  margin-top: 10px;
  margin-left: 10px;
  padding-top: 13px;
}

.notch {
  width: 298px;
  height: 25px;
  background-image: url(/img/preview/preview-notch.png);
  background-size: 298px 25px;
  background-repeat: no-repeat;
  position: absolute;
  top: 18px;
  z-index: 1;
}

</style>
