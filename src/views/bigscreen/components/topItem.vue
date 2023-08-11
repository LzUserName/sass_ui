<template>
  <div class="chart-item sub-chart-item">
    <div class="sub-content">
      <div class="sub-title ">
        {{ vData.title }}
        <div v-if="queryType" @click="$emit('loadData',queryType)"
             style="float:right;font-size: 14px;cursor:pointer;">查看
        </div>
      </div>
      <div class=" sub-body sub-card">
        <div class="sub-with-order">
          <div class="sub-money">
            {{ vData.count ? vData.count : 0 }}
          </div>
          <div class="sub-name">订单量</div>
        </div>
        <div class="sub-with-money ">
          <div class="sub-money">
            <countTo :decimals="1" :startVal='moneyMounted(vData.sum)' :endVal='moneyMounted(vData.sum)'
                     :duration='3000' separator=""></countTo>
          </div>
          <div class="sub-name">
            金额
            <span class="amount-unit">({{ moneyUnit(vData.sum) }})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {moneyUnit} from "../js/utils";
import countTo from 'vue-count-to'

export default {
  props: {
    vData: {
      type: Object,
      default: () => {
        return {
          sum: 0
        }
      }
    },
    queryType: {
      type: String | Number,
    }
  },
  watch: {
    vData(val) {

    }
  },
  components: {
    countTo
  },
  data() {
    return {
      option: null,
      moneyData: {
        money: 0,
        unit: '元'
      }
    }
  },
  mounted() {
  },
  methods: {
    moneyUnit(money) {
      return moneyUnit(money).unit
    },
    moneyMounted(money) {
      let moneyVal = moneyUnit(money).money
      return Number(moneyVal)
    }
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
  width: 10px;
  height: 10px;
  border-color: #e2b353;
  border-style: solid;
  border-top-width: 2px;
  border-bottom-width: 0;
}

.sub-chart-item {
  position: absolute;
  width: 500px;
  height: 550px;
  border: 2px solid rgba(255, 179, 92, 0.1);
  background: rgba(230, 162, 69, 0.03) url(../assets/img/wg.png) repeat 50% 50% !important;
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
    width: 10px;
    height: 10px;
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
      color: #f3ba82;
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
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;

    }

  }
}
</style>

<style lang="scss" scoped>
.sub-card{
  display: flex;
}
.sub-with-order {
  width: 40%;
  .sub-money{
    height: 55px;
    font-size: 38px;
    font-weight: bold;
    color: #f3ba82;
    text-align: center;
  }
  .sub-name{
    font-size: 23px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }
}
.sub-with-money {
  width: 60%;
  .sub-money{
    font-weight: bold;
    color: #f3ba82;
    position: relative;
    text-align: center;
    height: 55px;
    font-size: 38px;
    font-family: 'DIGITALDREAMFAT';
    font-weight: bold;
  }
  .sub-name{
    font-size: 23px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
  }
}

.sub-chart-item {
  left: 50px;
  top: 110px;
  width: 432px;
  height: 180px;

  .order-qty {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    margin-top: 10px;

    span {
      font-size: 26px;
      margin-left: 10px;
    }
  }

  .amount-text {
    width: 125px;
    color: #FFFFFF;
    margin-left: 20px;
    margin-top: 20px;
    font-size: 23px;
    margin-right: 10px;
    font-weight: 600;
  }

  .amount-unit {
    color: #FFFFFF;
    margin-left: 10px;
    font-size: 18px;
    width: 100px;
    text-align: center;
    margin-top: 10px;
    font-weight: 600;
  }
}


</style>
