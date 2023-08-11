
<template>
  <div class="chart-item sub-chart-item">
    <div class="sub-content">
      <div class="sub-title">{{ vData.title }}</div>
      <div class="sub-body">
        <div class="chart-item">
          <div class="chart" id="chart_id2"></div>
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
          title: ''
        }
      }
    }
  },
  watch:{
    'vData.data':{
      handler: function (){
        this.$nextTick(()=>{
          this.initChart();
        })
      },
      deep: true
    }
  },
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {
    initChart() {
      // 实例化对象
      let myChart = echarts.init(document.getElementById('chart_id2'));
      let charts = { // 按顺序排列从大到小
        nameList: [],
        dataList: []
      }
      if(this.vData.data){
        this.vData.data.map(item=>{
          charts.nameList.push(item.spu_name)
          charts.dataList.push(item.ct)
        })
      }
      let top10nameList = charts.nameList;
      let top10dataList = charts.dataList;
      let lineY = [];
      for (let i = 0; i < charts.nameList.length; i++) {
        let data = {
          name: charts.nameList[i],
          color: 'rgb(243,186,130)',
          value: top10dataList[i],
          itemStyle: {
            normal: {
              show: true,
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
        color: 'rgb(243,186,130)',
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
            formatter:function(value){
              var texts=value;
              if(texts.length>15){ // 具体多少字就看自己了
                texts=texts.substr(0,15)+'...';
              }
              return texts;
            }
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
            formatter: (val) => {
              return `${val}`
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
          barWidth: '13px',
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
  top: 710px;
  width: 586px;
  height: 320px;
  .chart {
    height: 280px;
  }
}
</style>
