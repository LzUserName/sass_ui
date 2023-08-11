<template>
  <div>
    <basic-container class="wel-view">
      <!--<iframe src="http://www.joolun.com" class="iframe-home"></iframe>-->
      <el-card class="box-card" style="border: none; border-bottom: #f5f5f5 1px solid; border-radius: 0px;font-size: 18px;">
        <div class="terminal">
          <span style="height:30px;line-height: 30px; ">演示商城端访问：</span>
          <a class="terminal-list" type="primary" @click="showMaCode()">
            <img class="terminal-img"
                 src="../views/mall/pagedevise/component-library/assets/images/icon-2/xiaochengxu.png">
            <span>微信小程序码</span>
          </a>
          <a class="terminal-list" type="primary" @click="showWxH5Code()">
            <img class="terminal-img"
                 src="../views/mall/pagedevise/component-library/assets/images/icon-2/gongzhonghao.png">
            <span>微信公众号页面</span>
          </a>
          <a class="terminal-list" type="primary" @click="showH5Url()">
            <img class="terminal-img"
                 src="../views/mall/pagedevise/component-library/assets/images/icon-2/shoujiliulanqi.png">
            <span>手机普通浏览器页面</span>
          </a>
          <a class="terminal-list" type="primary" @click="showPCUrl()">
            <img class="terminal-img"
                 src="../views/mall/pagedevise/component-library/assets/images/icon-2/liulanqi.png">
            <span>PC端页面</span>
          </a>
          <a class="terminal-list" type="primary" @click="showAppUrl()">
            <img class="terminal-img"
                 src="../views/mall/pagedevise/component-library/assets/images/icon-2/APP.png">
            <span>APP</span>
          </a>
        </div>
      </el-card>
      <el-card class="box-card" style="border: none; border-bottom: #f5f5f5 1px solid; border-radius: 0px;">
        <avue-data-tabs :option="option1"></avue-data-tabs>
        <el-row style="margin-top: 20px;">
          <el-col :span="4">
            <div id="statisticsAppTypeChart" style="float:left;width:100%;height: 300px"></div>
          </el-col>
          <el-col :span="4">
            <div id="statisticsSexChart" style="float:left;width:100%;height: 300px"></div>
          </el-col>
          <el-col :span="4">
            <div id="statisticsAppTypeChart2" style="float:left;width:100%;height: 300px"></div>
          </el-col>
          <el-col :span="4">
            <div id="statisticsOrderTypeChart" style="float:left;width:100%;height: 300px"></div>
          </el-col>
          <el-col :span="8">
            <div id="statisticsProChart" style="width:94%;height: 300px"></div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="box-card"
               style="margin-top: 10px;"
               v-if="userInfo.type == '1' || userInfo.type == '-1'">
        <div slot="header" class="clearfix">
          <span ><i class="el-icon-user-solid" style="margin-right: 5px;"></i>在线总用户数：{{ userOnlineCount }} </span>
          <div style="float: right; padding: 3px 0;font-size: 12px;">{{ userOnlineUpdateDate }}
            <el-tooltip content="点击刷新实时人数" placement="top">
              <i class="el-icon-refresh" style="margin-right: 5px;cursor:pointer;" @click="getUserOnlineStatistics"></i>
            </el-tooltip>
          </div>
        </div>
        <div class="data-view-content">
          <el-row :span="24" :gutter="10">
            <el-col :xs="24" :sm="24" :md="12">
              <div>
                <div>
                  <div id="userOnlineChart" style="width:100%;height: 300px"></div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12">
              <div >
                <div style="text-align: center;margin-bottom: 15px;">各端在线用户数排行</div>
                <el-table
                  :data="userOnlineData"
                  border
                  stripe
                  :default-sort="{prop: 'value', order: 'descending'}"
                  style="width: 100%">
                  <el-table-column
                    label="排行"
                    align="center"
                    type="index"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="title"
                    align="center"
                    label="客户端">
                  </el-table-column>
                  <el-table-column
                    prop="value"
                    align="center"
                    label="数量">
                  </el-table-column>

                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-alert title="Powered by www.joolun.com" type="info" :closable="false" center show-icon>
      </el-alert>
      <el-dialog :title="codeType == '1' ? '选择小程序' : '选择公众号'" :visible.sync="dialogWxApp" width="360px">
        <div class="jl-tips-class">选择需要生成的{{ codeType == '1' ? '选择小程序' : '选择公众号' }}二维码</div>
        <br>
        <el-select v-model="wxApp.id" placeholder="请选择" style="width: 100%" size="small">
          <el-option v-for="item in wxAppData" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogWxApp = false">取 消</el-button>
          <el-button type="primary" @click="getMaCode" v-if="codeType == '1'">确认</el-button>
          <el-button type="primary" @click="getQrCode" v-if="codeType == '2'">确认</el-button>
        </span>
      </el-dialog>
      <el-dialog :title="codeType == '1' ? '小程序码，微信扫码进入该商城首页' : '公众号H5二维码，微信扫码进入该商城首页'" :visible.sync="dialogQrCode"
                 center width="60%">
        <el-row v-if="codeType == '2'">
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="160" :dotScale=1></vue-qr>
            <p>160x160</p>
          </el-col>
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="200" :dotScale=1></vue-qr>
            <p>200x200</p>
          </el-col>
          <el-col :span="8">
            <vue-qr :text="qrCodeScene" :size="320" :dotScale=1></vue-qr>
            <p>320x320</p>
          </el-col>
        </el-row>
        <el-row v-if="codeType == '2'">
          可直接有微信中打开此链接：{{ qrCodeScene }}
        </el-row>
        <div v-if="codeType == '1'" style="text-align: center">
          <img :src="'data:image/jpg;base64,'+qrCodeScene"/>
        </div>
      </el-dialog>
    </basic-container>
  </div>
</template>

<script>


import constantMall from "@/const/constantMall";
import * as echarts from "echarts";
// import chinaMap from "echarts/map/json/china.json";  //中国地图
import chinaMap from "@/util/china.json";  //中国地图
import {mapGetters} from 'vuex'
import {getStatistics as getStatisticsGoodsSpu} from '@/api/mall/goodsspu'
import {
  getStatistics as getStatisticsOrderInfo,
  getStatisticsByColumn as getStatisticsByColumnOrderInfo
} from '@/api/mall/orderinfo'
import {
  getStatistics as getStatisticsUserInfo,
  getStatisticsByColumn as getStatisticsByColumnUserInfo
} from '@/api/mall/userinfo'
import {getStatistics as getStatisticsShopUser} from '@/api/mall/usershop'
import {getList as getWxAppList, getObj as getWxApp} from '@/api/wxmp/wxapp'
import {getMaCode} from '@/api/wxma/wxapp'
import {h5HostMobile, h5HostPC} from '@/config/env.js'
import {getStore} from '@/util/store'


import {getCount as userOnlineCount} from '@/api/mall/useronline'

export default {
  name: 'wel',
  data() {
    return {
      option1: {
        data: [{
          click: function (item) {
            // alert(JSON.stringify(item))
          },
          title: '新增商品',
          subtitle: '今天',
          count: 0,
          allcount: 0,
          text: '当前商品总数量',
          color: '#165dff',
          key: '商'
        },
          {
            click: function (item) {
              // alert(JSON.stringify(item));
            },
            title: '新增用户',
            subtitle: '今天',
            count: 0,
            allcount: 0,
            text: '当前用户总数量',
            color: '#00B42A',
            key: '用'
          },
          {
            click: function (item) {
              // alert(JSON.stringify(item));
            },
            title: '新增订单',
            subtitle: '今天',
            count: 0,
            allcount: 0,
            text: '已付款订单总数量',
            color: '#722ED1',
            key: '订'
          }
        ]
      },
      filterText: '',
      treeWxAppProps: {
        label: 'name',
        value: 'id'
      },
      treeWxAppData: [],
      appId: null,
      startDate: this.$moment().add(-7, 'days').format('YYYY-MM-DD'),
      endDate: this.$moment().add(-1, 'days').format('YYYY-MM-DD'),
      currentDataViewFilter: "",
      xAxisData: [],
      myChart: null,
      wxAppData: [],
      dialogWxApp: false,
      wxApp: {},
      h5HostMobile: h5HostMobile,
      h5HostPC: h5HostPC,
      dialogQrCode: false,
      qrCodeScene: '',
      codeType: '',
      userOnlineCount: 0, //商城在线用户总数，不包括管理用户
      userOnlineData: [], //商城在线用户统计
      userOnlineUpdateDate: this.$moment().format('YYYY-MM-DD hh:mm:ss'), //商城在线用户统计更新时间
      userOnlineLoadData: true, // 避免反复请求数据，引起数据错乱
    }
  },
  computed: {
    ...mapGetters(['website', 'userInfo'])
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getMallSummary()
    if (this.userInfo.type == '1' || this.userInfo.type == '-1') {
      this.getWxAppList()
    }
    this.$notify({
      title: '购买需知',
      dangerouslyUseHTMLString: true,
      duration: 0,
      message: '<div>' +
        '<ul>' +
        '<li style="font-size: 16px">' +
        '* <a href="https://www.joolun.com/uniappddb.html" target="_blank" style="text-decoration: underline;color: green">官网</a>' +
        '为购买源码的唯一渠道，私聊或其他渠道都为<span style="color: red">盗版！</span>' +
        '</li>' +
        '<li>* 盗版无法取得<span style="font-weight: bold">官方授权码</span>是不能合法使用的，支持正版不要给自己或公司带来不必要的法律纠纷！</li>' +
        '</ul>' +
        '</div>'
    })
    // this.$notify({
    //   title: '云服务器抢购',
    //   dangerouslyUseHTMLString: true,
    //   duration: 0,
    //   position: 'bottom-right',
    //   message:
    //     '<el-row :gutter="20">' +
    //     '<el-col :sm="24" :lg="24">' +
    //     '<a href="https://www.aliyun.com/minisite/goods?userCode=wnw8gle1" target="_blank">' +
    //     '<img style="width: 280px" src="https://images.gitee.com/uploads/images/2021/0622/110750_59b42ced_5079715.jpeg">' +
    //     '</a>' +
    //     '<p><a style="color: red" href="https://www.aliyun.com/minisite/goods?userCode=wnw8gle1" type="danger" target="_blank">阿里云领取￥2000红包，服务器低至￥91.80/年</a></p>' +
    //     '</el-col>' +
    //     '</el-row>'
    // })
    var userAgent = navigator.userAgent;
    let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
    let isSafari = userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Safari") > -1;
    if (isIE || isSafari) {
      setTimeout(() => {
        this.$notify({
          title: '浏览器兼容',
          message: '请使用谷歌、火狐、360极速等主流浏览器进行操作，否则页面可能出现未知错误！',
          duration: 0,
          type: 'warning'
        });
      }, 500)
    }
    this.getUserOnlineStatistics()
  },
  methods: {
    //加载公众号列表
    getWxAppList() {
      getWxAppList({
        appType: '2'
      }).then(response => {
        let data = response.data
        this.treeWxAppData = data
      }).catch(() => {

      })
    },
    // 各端用户在线统计
    getUserOnlineStatistics() {
      // 必须得上一次请求完成才能再次请求，避免数据显示错乱
      if(this.userOnlineLoadData){
        this.userOnlineLoadData = false
        this.userOnlineUpdateDate = this.$moment().format('YYYY-MM-DD HH:mm:ss')
        let count = 0
        this.userOnlineCount = 0
        this.userOnlineData = []
        let objLength = Object.keys(constantMall.clientType).length;
        for (const clientType in constantMall.clientType) {
          userOnlineCount(clientType).then(response => {
            let data = response.data.data
            this.userOnlineData.push({
              ...constantMall.clientType[clientType],
              name: constantMall.clientType[clientType].title,
              key: clientType,
              value: data
            })
            this.userOnlineCount = this.userOnlineCount + data;
            count++;
            if (count === objLength) {
              //必须设置一个排序函数 a-b升序  b-a降序
              this.userOnlineData.sort(function (a, b) {
                return b.value - a.value
              })
              this.userOnlineChartShow(this.userOnlineData)
              this.userOnlineLoadData = true
            }
          }).catch(() => {
            this.userOnlineLoadData = true
          })
        }
      }else{
        this.$message.info('数据正在加载中，请稍后...')
      }
    },
    userOnlineChartShow(data) {
      let chartDom = document.getElementById('userOnlineChart');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: '各端用户在线统计',//主标题
          x: 'center',
          textStyle: {
            fontSize: '15'
          },
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          padding: 50
        },

        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '各端用户在线统计',
            type: 'pie',
            top: 20,
            radius: ['40%', '70%'],
            data: data
          }
        ]
      };

      option && myChart.setOption(option);
    },
    // 商城统计
    getMallSummary() {
      getStatisticsGoodsSpu().then(response => {
        let data = response.data.data
        this.option1.data[0].count = data.countToday
        this.option1.data[0].allcount = data.countTotal
      }).catch(() => {

      })
      if (this.userInfo.type == '1' || this.userInfo.type == '-1') {
        getStatisticsUserInfo().then(response => {
          let data = response.data.data
          this.option1.data[1].count = data.countToday
          this.option1.data[1].allcount = data.countTotal
        }).catch(() => {

        })
        // 用户来源端比例
        getStatisticsByColumnUserInfo('app_type', {}).then(response => {
          let data = response.data.data
          data = data.map(item => ({
            name: constantMall.clientType[item.name].title || item.name,
            value: item.value
          }))
          // 基于准备好的dom，初始化echarts实例
          let statisticsAppTypeChart = echarts.init(document.getElementById('statisticsAppTypeChart'))
          // 绘制图表
          statisticsAppTypeChart.setOption({
            title: {
              text: '用户来源端比例',//主标题
              x: 'center',
              textStyle: {
                fontSize: '15'
              },
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '用户来源端比例',
                type: 'pie',
                radius: '50%',
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(() => {

        })
        // 用户性别比例
        getStatisticsByColumnUserInfo('sex', {}).then(response => {
          let data = response.data.data
          data = data.map(item => ({
            name: item.name == '0' ? '未知' : item.name == '1' ? '男' : item.name == '2' ? '女' : !item.name ? '未设置' : item.name,
            value: item.value
          }))
          // 基于准备好的dom，初始化echarts实例
          let statisticsSexChart = echarts.init(document.getElementById('statisticsSexChart'))
          // 绘制图表
          statisticsSexChart.setOption({
            title: {
              text: '用户性别比例',//主标题
              x: 'center',
              textStyle: {
                fontSize: '15'
              },
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '用户性别比例',
                type: 'pie',
                radius: '50%',
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(() => {

        })
        // 用户地区分布
        getStatisticsByColumnUserInfo('province', {}).then(async response => {
          echarts.registerMap("china", chinaMap);
          let data = response.data.data
          data = data.map(item => ({
            name: item.name ? item.name.replace('省', '').replace('市', '') : '未知',
            value: item.value
          }))
          // 基于准备好的dom，初始化echarts实例
          let statisticsProChart = echarts.init(document.getElementById('statisticsProChart'))
          // 绘制图表
          statisticsProChart.setOption({
            title: {
              text: '用户地区分布',//主标题
              x: 'center',
              textStyle: {
                fontSize: '15'
              },
            },
            dataRange: {
              x: 'right',
              min: 0,
              max: 1000,
              text: ['高', '低'],
              splitNumber: 0,
            },
            tooltip: {
              trigger: 'item',
            },
            series: [
              {
                name: '用户地区分布',
                type: 'map',
                roam: false,
                map: 'china',
                selectedMode: 'multiple',
                emphasis: {
                  label: {
                    show: true,
                  },
                },

                data: data,

              }
            ]
          })
        }).catch(() => {

        })
        // 订单来源端比例
        getStatisticsByColumnOrderInfo('app_type', {
          isPay: '1'
        }).then(response => {
          let data = response.data.data
          data = data.map(item => ({
            name: constantMall.clientType[item.name].title || item.name,
            value: item.value
          }))
          // 基于准备好的dom，初始化echarts实例
          let statisticsAppTypeChart = echarts.init(document.getElementById('statisticsAppTypeChart2'))
          // 绘制图表
          statisticsAppTypeChart.setOption({
            title: {
              text: '订单来源端比例',//主标题
              x: 'center',
              textStyle: {
                fontSize: '15'
              },
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '订单来源端比例',
                type: 'pie',
                radius: '50%',
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(() => {

        })
        //订单类型比例
        getStatisticsByColumnOrderInfo('order_type', {
          isPay: '1'
        }).then(response => {
          let data = response.data.data
          data = data.map(item => ({
            name: item.name == '0' ? '普通订单' : item.name == '1' ? '砍价订单' : item.name == '2' ? '拼团订单' : item.name == '3' ? '秒杀订单' : item.name,
            value: item.value
          }))
          // 基于准备好的dom，初始化echarts实例
          let statisticsAppTypeChart = echarts.init(document.getElementById('statisticsOrderTypeChart'))
          // 绘制图表
          statisticsAppTypeChart.setOption({
            title: {
              text: '订单类型比例',//主标题
              x: 'center',
              textStyle: {
                fontSize: '15'
              },
            },
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: '订单类型比例',
                type: 'pie',
                radius: '50%',
                data: data,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          })
        }).catch(() => {

        })
      }
      if (this.userInfo.type == '2') {
        getStatisticsShopUser().then(response => {
          let data = response.data.data
          this.option1.data[1].count = data.countToday
          this.option1.data[1].allcount = data.countTotal
        }).catch(() => {

        })
      }
      getStatisticsOrderInfo({
        isPay: '1'
      }).then(response => {
        let data = response.data.data
        this.option1.data[2].count = data.countToday
        this.option1.data[2].allcount = data.countTotal
      }).catch(() => {

      })
    },
    getQrCode() {
      getWxApp(this.wxApp.id).then(response => {
        this.dialogWxApp = false
        this.wxApp = response.data.data
        let qrUrl = this.h5HostMobile + '?app_id=' + this.wxApp.id + '&tenant_id=' + this.wxApp.tenantId
        //第三方平台托管的需要加上component_appid
        if ('1' == this.wxApp.isComponent) {
          qrUrl = qrUrl + '&component_appid=' + this.wxApp.componentAppId;
        }
        this.dialogQrCode = true
        this.qrCodeScene = qrUrl
      }).catch(() => {

      })
    },
    //获取公众号h5二维码
    showWxH5Code() {
      this.codeType = '2'
      this.wxApp = {}
      this.tableLoading = true
      getWxAppList({
        appType: '2'
      }).then(response => {
        this.tableLoading = false
        let data = response.data
        if (data && data.length > 0) {
          if (data.length == 1) {
            this.wxApp = data[0]
            this.getQrCode()
          } else {
            this.wxAppData = data
            this.dialogWxApp = true
          }
        } else {
          this.$message({
            showClose: true,
            message: '没有可选择的公众号，请先添加',
            type: 'error'
          })
        }
      }).catch(() => {
        this.tableLoading = false
      })
    },
    showH5Url() {
      let tenantId = this.userInfo.tenantId
      if (this.userInfo.type == '-1') {
        tenantId = getStore({name: 'switchTenantId'})
      }
      let url = this.h5HostMobile + '?tenant_id=' + tenantId
      this.$alert(url, '在手机普通浏览器中打开此链接', {
        confirmButtonText: '确定'
      });
    },
    //获取首页PC端页面地址
    showPCUrl() {
      let tenantId = this.userInfo.tenantId
      if (this.userInfo.type == '-1') {
        tenantId = getStore({name: 'switchTenantId'})
      }
      let url = this.h5HostPC + '?tenant_id=' + tenantId
      window.open(url)
    },
    //获取小程序码
    showMaCode() {
      this.codeType = '1'
      this.tableLoading = true
      this.wxApp = {}
      getWxAppList({
        appType: '1'
      }).then(response => {
        this.tableLoading = false
        let data = response.data
        if (data && data.length > 0) {
          if (data.length == 1) {
            this.wxApp = data[0]
            this.getMaCode()
          } else {
            this.wxAppData = data
            this.dialogWxApp = true
          }
        } else {
          this.$message({
            showClose: true,
            message: '没有可选择的小程序，请先添加',
            type: 'error'
          })
        }
      }).catch(() => {
        this.tableLoading = false
      })
    },
    getMaCode() {
      getMaCode({
        appId: this.wxApp.id,
        scene: "scene"
      }).then(response => {
        this.dialogWxApp = false
        this.dialogQrCode = true
        this.qrCodeScene = response.data.data
      })
    },
    showAppUrl() {
      this.$alert('https://www.joolun.com/h-nd-108.html#_jcp=1', '请下载并安装App', {
        confirmButtonText: '确定'
      });
    },
  }
}
</script>

<style lang="scss">
.wel-view {

  .el-card__body {
    padding: 5px;
  }

  .el-card{
    border: none;
    border-radius: 0px;
  }

  .data-view-content {
    padding: 10px;

    .change-layout {
      display: flex;
      flex-direction: row;

      .change-item + .change-item {
        border-left: none;
      }

      .change-item {
        padding: 0 10px;
        border: 1px solid #EEEEEE;
        line-height: 30px;
        font-size: 14px;
        text-decoration: none;
        outline: none;

          &.active {
            background: #44B549;
            color: #FFFFFF;
          }
        }
      }
    }
  }

.terminal {
  padding: 10px;
  display: flex;
}

.terminal-list {
  cursor: pointer;
  align-items: center;
  display: flex;
  margin-right: 40px;
}

.terminal-img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.box-card {
  box-shadow: none !important;
  border-radius: 0px;
  border: none;
  border-bottom: solid #f1f1f1 1px;
}
</style>
