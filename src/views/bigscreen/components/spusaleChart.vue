<template>
  <div class="chart-item sub-chart-item">
    <div class="sub-content">
      <div class="sub-title">{{ vData.title }}</div>
      <div class="sub-body">
        <div class="chart-item" style="display: flex;">
          <div >
            <div class="chart-title">{{vData.subtitle1}}</div>
            <div id="chart_left3"></div>
          </div>
          <div >
            <div class="chart-title">{{vData.subtitle2}}</div>
            <div id="chart_right3" ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props:{
    vData: {
      type: Object,
      default: ()=>{
        return {
          data: [],
          data2: [],
          title: ''
        }
      }
    }
  },
  watch:{
    'vData.data':{
      handler: function (){
        this.$nextTick(()=>{
          this.initChart1();
          this.initChart2();
        })
      },
      deep: true
    }
  },
  data() {
    return {
      option: null,
    }
  },
  mounted() {
  },
  methods: {
    initChart1(){
      // 实例化对象
      let myChart = echarts.init(document.getElementById('chart_left3'));
      let scaleData = this.vData.data||[];
      let rich = {
        white: {
          color: '#ddd',
          align: 'center',
          padding: [0, 0]
        }
      };
      let placeHolderStyle = {
        normal: {
          label: {
            show: true
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      };
      let data = [];
      let color=[ '#ff004d', '#006ced', '#ffe000', '#f3ba82','#ffa800', '#ff5b00', '#ff3000']

      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].ct,
          name: scaleData[i].name||'未知',
          itemStyle: {
            normal: {
              borderWidth: 22,
              shadowBlur: 2,
              borderColor: color[i],
              shadowColor: color[i]
            }
          }
        }, {
          value: 0,
          name: '',
          itemStyle: placeHolderStyle
        });
      }

      let option = {

        // title: {
        //   text:this.vData.subtitle1,
        // },
        color,
        tooltip: {
          trigger: 'item',
        },
        series: [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: ['50%', '50%'],
          center: ['50%', '50%'],
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                formatter: (params) => {
                  let percent = 0;
                  let total = 0;
                  for (let i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].ct;
                  }
                  percent = ((params.value / total) * 100).toFixed(0);
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}';
                  } else {
                    return '';
                  }
                },
                rich: rich
              },
              labelLine: {
                length: 10,
                length2: 30,
                show: true,
                color: '#e6a245'
              }
            }
          },
          data: data
        }]
      }

      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },
    initChart2() {
      // 实例化对象
      let myChart = echarts.init(document.getElementById('chart_right3'));
      let charts = { // 按顺序排列从大到小
        nameList: [],
        dataList: []
      }
      if(this.vData.data2){
        this.vData.data2.map(item=>{
          charts.nameList.push(item.name)
          charts.dataList.push(item.ct)
        })

      }
      let top10nameList = charts.nameList;
      let top10dataList = charts.dataList;
      let lineY = [];
      for (let i = 0; i < charts.nameList.length; i++) {
        let data = {
          name: charts.nameList[i],
          color: '#e6a245',
          value: top10dataList[i],
          itemStyle: {
            normal: {
              show: true,
              color: '#e6a245',
              barBorderRadius: 10
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          }
        }
        lineY.push(data)
      }

      // 指定配置和数据
      let option = {
        //
        // title: {
        //   text:this.vData.subtitle2,
        // },
        dataZoom:[
          {
            type: "slider", //滑动条
            show: charts.dataList.length>10, //开启
            yAxisIndex: [0],
            left: "96%", //滑动条位置
          },
          {
            type: "inside", //内置滑动，随鼠标滚轮展示
            yAxisIndex: [0],
          },
        ],
        tooltip: {
          trigger: 'item',
        },
        grid: {
          borderWidth: 0,
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          }
        }],
        yAxis: [{
          grid: {
            height: 100,
          },
          type: 'category',
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 13
            },
          },
          data: top10nameList
        }, {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 13
            },
            formatter: function (value) {
              var texts = value;
              if (texts.length > 10) {
                texts = texts.substr(0, 10) + '...';
              }
              return texts;
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: top10dataList.reverse()
        }],
        series: [{
          name: '',
          type: 'bar',
          zlevel: 2,
          barWidth: '10px',
          data: lineY,
          animationDuration: 1500,
          label: {
            normal: {
              color: '#b3ccf8',
              show: false,
              position: [0, '-15px'],
              textStyle: {
                fontSize: 13
              },
              formatter: (a, b) => {
                return a.name;
              }
            }
          }
        }]
      };

      // 把配置给实例对象
      myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        myChart.resize();
      });
    },

  },
  beforeDestroy() {

  }
};
</script>

<style lang="scss" scoped>

%sub-chart-item-before {
  content: "";
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  border-color: #e2b353;
  border-style: solid;
  border-top-width: 2px;
  border-bottom-width: 0;
}
.sub-chart-item {
  position: absolute;
  width: 500px;
  height: 550px;
  border: 2px solid rgba(255, 179, 92,0.1);
  background: rgba(230,162,69,0.03) url(../assets/img/wg.png) repeat 50% 50% !important;
  background-blend-mode: screen;
  overflow: visible;
  &:before {
    @extend %sub-chart-item-before;
    left: -2px;
    border-left-width: 2px;
    border-right-width: 0;
  }
  &:after {
    @extend %sub-chart-item-before;
    right: -2px;
    border-left-width: 0;
    border-right-width: 2px;
  }

  %sub-content-before {
    content: "";
    position: absolute;
    bottom: -2px;
    width: 5px;
    height: 5px;
    border-color: #e2b353;
    border-style: solid;
    border-top-width: 0;
    border-bottom-width: 2px;
  }
  .sub-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .sub-title {
      position: absolute;
      height: 26px;
      font-size: 20px;
      color: #ffffff;
      line-height: 26px;
      padding: 0 0 0 20px;
      left: 10px;
      right: 10px;
      top: 10px;
      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -7px;
        width: 14px;
        height: 14px;
        background: url(../assets/img/sub-title.png) no-repeat 0% 0%;
      }
    }
    &:before {
      @extend %sub-content-before;
      left: -2px;
      border-left-width: 2px;
      border-right-width: 0;
    }
    &:after {
      @extend %sub-content-before;
      right: -2px;
      border-left-width: 0;
      border-right-width: 2px;
    }

    .sub-body {
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      bottom: 0;

    }

  }
}
</style>
<style lang="scss" scoped>
.sub-chart-item {
  left: 50px;
  top: 350px;
  width: 586px;
  height: 320px;
  .chartsdom {
    width: 100%;
    height: 100%;
  }

  #chart_left3{
    width: 240px;
    height: 200px;
    margin: auto;
  }
  #chart_right3{
    width: 290px;
    height: 200px;
    margin: auto;
  }
}
</style>
