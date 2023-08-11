<!--
  - Copyright (C) 2018-2020
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 背景颜色 选择组件 -->
<template>
  <div>
    <el-tooltip effect="dark" content="色值代码，如#ffffff;也可以使用ColorUI的背景颜色class名" placement="top">
      {{background}}
      <el-input v-model="background" size="small" style="margin-top: 5px">
        <template slot="append">
          <div style="width: 160px;">
            <div :class="'bg-'+thememobile.backgroundColor"
                 @click="onThemeBg"
                 style="margin-top: 5px; padding: 2px 3px;float:left;margin-right: 5px;cursor: pointer;border-radius: 3px;">主题色</div>
            <div
              @click="showBgDialog=true"
              style="margin-top: 5px; padding: 2px 3px;float:left;margin-right: 5px;cursor: pointer;border-radius: 3px;" :class="background">选择背景色</div>
            <div style="float:right;"><el-color-picker size="mini" v-model="background" ></el-color-picker></div>
          </div>
        </template>
      </el-input>
    </el-tooltip>
    <el-dialog title="背景颜色" :visible.sync="showBgDialog" width="40%" append-to-body>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item,index) in colorList" :key="index" class="tm-select-bg">
          <div @click="onBgColor(item)">
            <div :class="'bg-' + item.name" style="width: 30px;height: 30px;margin: 0 auto;"></div>
            <div style="margin-top: 5px;">{{item.title}}&nbsp;{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    props: {
      thememobile: {
        type: Object,
        default: ()=> {
          backgroundColor: ''
        }
      },
      bgValue:{
        type: String
      }
    },
    watch: {
      background(val, oldVal){
        if(val!=oldVal){
          this.$emit('onChange', val)
        }
      },
      bgValue(val, oldVal){
        if(this.bgValue){
          this.background = this.bgValue;
        }
      }
    },
    mounted() { },
    methods: {
      onThemeBg(item){
        this.background = 'bg-'+this.thememobile.backgroundColor;
        this.$emit('onChange', this.background )
      },
      onBgColor(item){
        this.background = 'bg-'+item.name;
        this.$emit('onChange', this.background )
        this.showBgDialog = false
      }
    },
    components: {},
    data() {
      return {
        background: '',
        showBgDialog:false,
        colorList: [
          {
            title: '默认',
            name: 'gradual-scarlet',
            color: '#ffffff'
          },{
            title: '嫣红',
            name: 'red',
            color: '#e54d42'
          },
          {
            title: '桔橙',
            name: 'orange',
            color: '#f37b1d'
          },
          {
            title: '明黄',
            name: 'yellow',
            color: '#fbbd08'
          },
          {
            title: '橄榄',
            name: 'olive',
            color: '#8dc63f'
          },
          {
            title: '森绿',
            name: 'green',
            color: '#39b54a'
          },
          {
            title: '天青',
            name: 'cyan',
            color: '#1cbbb4'
          },
          {
            title: '海蓝',
            name: 'blue',
            color: '#0081ff'
          },
          {
            title: '深蓝',
            name: 'darkblue',
            color: '#0055ff'
          },
          {
            title: '姹紫',
            name: 'purple',
            color: '#6739b6'
          },
          {
            title: '木槿',
            name: 'mauve',
            color: '#9c26b0'
          },
          {
            title: '桃粉',
            name: 'pink',
            color: '#e03997'
          },
          {
            title: '棕褐',
            name: 'brown',
            color: '#a5673f'
          },
          {
            title: '玄灰',
            name: 'grey',
            color: '#8799a3'
          },
          {
            title: '草灰',
            name: 'gray',
            color: '#aaaaaa'
          },
          {
            title: '墨黑',
            name: 'black',
            color: '#333333'
          },
          {
            title: '雅白',
            name: 'white',
            color: '#ffffff'
          },
          {
            title: '粉红',
            name: 'gradual-red',
            color: '#ffffff'
          },
          {
            title: '橙红',
            name: 'gradual-orange',
            color: '#ffffff'
          },
          {
            title: '绿青',
            name: 'gradual-green',
            color: '#ffffff'
          },
          {
            title: '紫红',
            name: 'gradual-purple',
            color: '#ffffff'
          },
          {
            title: '粉紫',
            name: 'gradual-pink',
            color: '#ffffff'
          },
          {
            title: '蓝绿',
            name: 'gradual-blue',
            color: '#ffffff'
          },
          {
            title: '黑灰',
            name: 'gradual-gray',
            color: '#ffffff'
          },
          {
            title: '淡蓝',
            name: 'gradual-darkblue',
            color: '#ffffff'
          },

          {
            title: '默认',
            name: 'scarlet',
            color: '#ffffff'
          },
        ],
      };
    },
    computed: {
    },
    created() {
    },
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    //如果页面有keep-alive缓存功能，这个函数会触发
    activated() {},
  }
</script>
<style lang='less' scoped>
  .tm-select-bg {
    text-align: center;
    cursor: pointer;
    padding: 10px 0;
  }

  .tm-select-bg:hover {
    background: #efefef;
  }

</style>
