<!--
  - Copyright (C) 2022-2025
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="home-container">
    <div class="wrap"  ref="editor">
      <header>
        <h2>商城数据监控大屏</h2>
        <div class="showTime">
          <span class="time">{{ date }}</span>
          <span class="date">
            <span>{{ week }}</span>
            <span>{{ nowTime }}</span>
          </span>
        </div>
        <div  @click="onFullScreen" style="right: 50px; position: absolute;top: 10px;cursor: pointer;" title="全屏">
          <i style="color: #e2b353;font-size: 22px;" :class="'el-icon-full-screen'" ></i>
        </div>
      </header>
      <div>
        <top-item :vData="topData1" ></top-item>
        <top-item @loadData="loadData" :queryType="1" :class="curQueryType==1?'cur-query':''" :vData="topData2" style="left: 512px"></top-item>
        <top-item @loadData="loadData"  :queryType="2" :class="curQueryType==2?'cur-query':''" :vData="topData3" style="left: 974px"></top-item>
        <top-item @loadData="loadData"  :queryType="3" :class="curQueryType==3?'cur-query':''" :vData="topData4" style="left: 1436px"></top-item>

        <transition name="el-zoom-in-top">
          <div v-show="showTitle"  style="top:310px;position:absolute;text-align: center;width: 100%;
          font-weight: bold;font-size: 22px;color: #e0b081">{{curQueryType | queryTypeFilter}}</div>
        </transition>


        <order-count-chart :vData="centerData1" ></order-count-chart>
        <spusale-chart :vData="centerData2" style="left: 666px"></spusale-chart>
        <saleamont-chart :vData="centerData3" style="left: 1282px"></saleamont-chart>

        <order-count-bottom  :vData="bottomData1"></order-count-bottom>
        <spusale-bottom :vData="bottomData2" style="left: 666px"></spusale-bottom>
        <saleamount-bottom :vData="bottomData3" style="left: 1282px"></saleamount-bottom>
      </div>
    </div>
  </div>
</template>

<script>

import {exitFullScreen, reqFullScreen} from "./js/utils";
import { statistics,ordercount,saleamount,spusale } from '@/api/mall/largescreen'
import countTo from 'vue-count-to'
import {screenSize} from "./js/utils";
import {mapGetters} from "vuex";

import TopItem from "./components/topItem";
import orderCountChart from "./components/orderCountChart";
import saleamontChart from "./components/saleamountChart";
import spusaleChart from "./components/spusaleChart";
import orderCountBottom from "./components/orderCountBottom";
import saleamountBottom from "./components/saleamountBottom";
import spusaleBottom from "./components/spusaleBottom";

export default {
  props:['isFullScreen'],
  filters:{
    queryTypeFilter(val){
      if(val==1){
        return '最近7日数据统计分析'
      }else if(val==2){
        return '当月数据统计分析'
      }else if(val==3){
        return '今年数据统计分析'
      }
      return '今年数据统计分析'
    }
  },
  components: {
    countTo,
    TopItem,
    orderCountChart,
    saleamontChart,
    spusaleChart,
    orderCountBottom,
    spusaleBottom,
    saleamountBottom,
  },
  data() {
    return {
      isSpa: false,//如果是单个标签页面的那么就可以进行全屏和退出全屏
      nowTime: '',
      week: '',
      date: '',
      timer: null,
      showTitle: true,
      curQueryType: '3',//当前统计的数据类型 1 最近7日，2 当月，3 当年
      bottomData1:{
        title: '订单量商品排行TOP10',
        data: [],
      },
      bottomData2:{
        title: '商品销量排行TOP10',
        data: [],
      },
      bottomData3:{
        title: '金额商品排行TOP10',
        data: [],
      },
      centerData1:{
        title: '订单数量分析',
        subtitle1: '订单量品牌排行',
        subtitle2: '订单量门店排行',
        data: [],
        data2: [],
      },
      centerData2:{
        title: '商品销量分析',
        subtitle1: '商品销量品牌排行',
        subtitle2: '商品销量门店排行',
        data: [],
        data2: [],
      },
      centerData3:{
        title: '销售金额分析',
        subtitle1: '金额品牌排行',
        subtitle2: '金额门店排行',
        data: [],
        data2: [],
      },
      topData1: {
        title: '昨日',
        count: '',
        sum: 0,
      },
      topData2: {
        title: '最近7日',
        count: '',
        sum: 0,
      },
      topData3: {
        title: '当月',
        count: '',
        sum: 0,
      },
      topData4: {
        title: '今年',
        count: '',
        sum: 0,
      },
    }
  },
  computed: {
    ...mapGetters([
      "isFullScren",
    ]),
  },
  created() {
    if(this.isFullScreen)
      this.isSpa = true
  },
  mounted() {
    this.initData()
    this.nowTimes();
    screenSize(this.$refs.editor, !this.isFullScreen);
  },
  methods: {
    loadData(curQueryType){
      this.showTitle = false
      setTimeout(()=>{
        this.showTitle = true
      },200)
      this.curQueryType = curQueryType

      let params1 = { beginTime: this.$moment().add(-1,'day').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') }
      let params2 = { beginTime: this.$moment().add(-6,'day').format('YYYY-MM-DD 00:00:00'), endTime: this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss') }
      let params3 = { beginTime: this.$moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') }
      let params4 = { beginTime: this.$moment().startOf('years').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().endOf('years').format('YYYY-MM-DD HH:mm:ss') }

      let queryParams = params4
      if(this.curQueryType==1){
        queryParams = params2
      }else if(this.curQueryType==2){
        queryParams = params3
      }else if(this.curQueryType==3){
        queryParams = params4
      }

      this.getOrdercount(queryParams)
      this.getSpusale(queryParams)
      this.getSaleamount(queryParams)

    },
    initData(){
      let params1 = { beginTime: this.$moment().add(-1,'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss') }
      this.getStatistics(params1, this.topData1)
      let params2 = { beginTime: this.$moment().add(-6,'day').format('YYYY-MM-DD 00:00:00'), endTime: this.$moment().endOf('day').format('YYYY-MM-DD HH:mm:ss') }
      this.getStatistics(params2, this.topData2)
      let params3 = { beginTime: this.$moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().endOf('month').format('YYYY-MM-DD HH:mm:ss') }
      this.getStatistics(params3, this.topData3)
      let params4 = { beginTime: this.$moment().startOf('years').format('YYYY-MM-DD HH:mm:ss'), endTime: this.$moment().endOf('years').format('YYYY-MM-DD HH:mm:ss') }
      this.getStatistics(params4, this.topData4)
      this.loadData(3)
    },
    //
    getOrdercount(queryParams){
      ordercount(queryParams).then(response => {
        this.centerData1.data = response.data.data.category
        this.centerData1.data2 = response.data.data.shopInfo
        this.bottomData1.data = response.data.data.spu
      }).catch(() => {
      })
    },
    //销售数量
    getSpusale(queryParams){
      spusale(queryParams).then(response => {
        this.centerData2.data = response.data.data.category
        this.centerData2.data2 = response.data.data.shopInfo
        this.bottomData2.data = response.data.data.spu
      }).catch(() => {
      })
    },
    //销售金额
    getSaleamount(queryParams){
      saleamount(queryParams).then(response => {
        this.centerData3.data = response.data.data.category
        this.centerData3.data2 = response.data.data.shopInfo
        this.bottomData3.data = response.data.data.spu
      }).catch(() => {
      })
    },
    //大屏上部分数据
    getStatistics(params, data) {
      statistics(params).then(response => {
        data.count = response.data.data.count
        data.sum = response.data.data.sum
      }).catch(() => {
      })
    },
    onFullScreen(){//全屏
      if(this.isFullScreen){
        reqFullScreen()
        this.isFullScreen = false
      }else{
        if(this.isSpa){
          this.isFullScreen = true
          exitFullScreen()
        }else{
          window.open('/#/mall/bigscreen/fullscreen');
        }
      }
    },
    timeFormate(timeStamp) { //显示当前时间
      let newDate = new Date(timeStamp);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      let date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      let hh = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
      let mm = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();
      let ss = newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds();
      let week = newDate.getDay();
      let weeks = ['日', '一', '二', '三', '四', '五', '六'];
      let getWeek = '星期' + weeks[week];
      this.week = getWeek;
      this.date = year + '.' + month + '.' + date;
      this.nowTime = hh + ':' + mm + ':' + ss;
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes)
      this.nowTimes = null;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
<style lange="scss" scoped>
@import "./assets/styles/common.scss";
</style>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .wrap {
    transform-origin: 0px 0px 0px;
    background: url(./assets/img/bg.png) no-repeat ;
    background-size: contain;
    background-position: 50% 0;
    background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: auto;
    header {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 80px;
      background: url(./assets/img/head_bg.png) no-repeat top center;
      background-size: 100% 100%;
      h2 {
        color: #e0b081;
        font-size: 35px;
        text-align: center;
        margin-top: 10px;
        letter-spacing: 1px;
        text-shadow: 0 1px 3px #e0b081;  /*设置文字阴影*/
        font-weight: bolder;  /*设置文字宽度*/

      }
      .showTime {
        position: absolute;
        left: 55px;
        top: 10px;
        color: rgba(255, 221, 150, .8);
        //color: rgba(248, 195, 88, .7);
        display: flex;
        .time {
          font-size: 28px;
        }
        .date {
          span {
            &:nth-child(1) {
              font-size: 24px;
              margin-left: 10px;
              text-align: right;
            }
            &:nth-child(2) {
              text-align: center;
              font-size: 26px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}

</style>
