<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<!-- 选择小程序页面的组件 -->
<!-- 待重构 V1.0.3 -->
<template>
    <div>
      <div>
        <el-select size="small" style="float:left;width: 32%!important;" filterable v-model="form.page" placeholder="请选择跳转页面"  @change="onChangePage">
          <el-option v-for="(item, index) in pageUrls.pages" :key="index" :label="item.name" :value="item.url">
            <div style="padding: 10px;">
              <div style="line-height: 1;">{{ item.name }}</div>
              <div style="line-height: 1.4;color: #909399; font-size: 12px">{{ item.url }}</div>
            </div>
          </el-option>
        </el-select>
        <el-select v-if="!isArticleInfo" size="small" style="float:left;width: 32%!important;margin-left: 5px;" :disabled="shopDisabled||!!shopId" filterable
                   v-model="form.shopId" placeholder="请选择店铺" @change="onChangeShop($event, true)">
          <el-option v-for="(item, index) in shopList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-if="!isArticleInfo" size="small" style="float:left;width: 33%!important;;margin-left: 5px;" :disabled="spuDisabled" filterable v-model="form.spuId" placeholder="请选择商品" @change="onChangeSpu">
          <el-option v-for="(item, index) in spuList" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-if="isArticleInfo" size="small" style="float:left;width: 66%!important;;margin-left: 5px;" filterable v-model="form.articleInfoId" placeholder="请选择文章" @change="onChangeArticle">
          <el-option v-for="(item, index) in articleInfoList" :key="index" :label="item.articleTitle" :value="item.id"></el-option>
        </el-select>
      </div>
      <el-input style="margin-top: 5px;" size="small" disabled placeholder="页面URL" v-model="pageTemp"></el-input>
    </div>
</template>

<script>


    import request from '@/router/axios'

    import { pageUrls } from '@/components/app-page-select//pageUrls'

    import * as shopinfo from '@/api/mall/shopinfo'
    import * as goodsspu from '@/api/mall/goodsspu'
    import * as bargaininfo from '@/api/mall/bargaininfo'
    import * as grouponinfo from '@/api/mall/grouponinfo'
    import * as seckillinfo from '@/api/mall/seckillinfo'
    import * as articleinfo from '@/api/mall/articleinfo'

    export default {
      props:{
        page:   [String],
        shopId: [String],
      },
      watch:{
        shopId(val, oldVal){
          if(val!=oldVal){

          }
        },
        page(val,oldVal){
          if(val!=oldVal){
            this.initPage();
          }
        }
      },
      mounted() {},
      data(){
        return {
          pageUrls: JSON.parse(JSON.stringify(pageUrls)), //app 页面地址
          curType: '',
          pageTemp: '',//临时展示的url
          shopDisabled: true,
          spuDisabled: true,
          isArticleInfo: false,// 文章 pages/article/article-info/index'
          articleInfoList: [], // 文章列表
          shopList: [], // 店铺列表
          spuList: [], // 店铺的商品列表
          form: {
            page: '',
            pageType: '',
            shopId: '',
            spuId: '',
            articleInfoId: '',
          },
        }
      },
      created() {
        this.initPage();
        this.getShopList(); // 加载所有店铺数据
        if(this.shopId){ // 特殊处理，如果是店铺的页面就去掉非店铺的页面
          let temp= [];
          this.pageUrls.pages.map((item)=>{
            if(item.shopShow){
              if(item.shopList&&item.url.indexOf('shopId')==-1){//如果是店铺装修且是列表
                item.url = item.url+'?shopId='
              }
              temp.push(item);
            }
          });
          this.pageUrls.pages = temp;
          this.form.shopId = this.shopId;
        }
      },
      methods:{
        initPage(){
          if(this.page){
            let pageTemp = JSON.parse(JSON.stringify(this.page));
            this.pageTemp = pageTemp;
            if(this.page.indexOf('http')!=-1){
              pageTemp = pageTemp.substring(this.page.indexOf('/pages/'),this.page.length);
            }
            let appIdIndex = pageTemp.indexOf('app_id');
            if(appIdIndex!=-1){
              pageTemp =  pageTemp.substring(0, appIdIndex-1);
            }
            if(pageTemp.indexOf('id')!=-1){//表示是详情页
              let urlTemp = pageTemp.substring(0, pageTemp.indexOf('id=')+3);
              let idTemp =  pageTemp.substring(pageTemp.indexOf('id=')+3, pageTemp.length);
              this.form.page = urlTemp;
              if(this.page.indexOf('/pages/shop/shop-detail/index?id=')!=-1) {//如果是店铺详情页，那么就把选择商品禁用
                this.form.shopId = idTemp;
                this.shopDisabled= false;
                this.spuDisabled= true;
                this.curType = this.pageUrls.types.shopDetailPage;
              } else {
                this.form.spuId = idTemp;
                this.pageUrls.pages.forEach((item,index)=>{
                  if(item.url == urlTemp){//判断url类型
                    this.curType = item.type;
                    return;//跳出循环
                  }
                });
                if(idTemp){
                  if(this.curType==this.pageUrls.types.bargainDetailPage){//如果是 砍价详情页面 取砍价的商品列表
                    this.getBargaininfoDetail(idTemp);
                  }else if(this.curType==this.pageUrls.types.grouponDetailPage){//如果是 拼团活动详情
                    this.getGrouponinfoDetail(idTemp);
                  }else if(this.curType==this.pageUrls.types.goodsDetailPage){//如果是 商品详情
                    this.getGoodsSpuDetail(idTemp);
                  }else if(this.curType==this.pageUrls.types.seckillDetailPage){//如果是 秒杀 详情
                    this.getSeckillDetail(idTemp);
                  }
                }
                this.shopDisabled= false;
                this.spuDisabled= false;
              }
            }else {
              this.shopDisabled= true;
              this.spuDisabled= true;
              if(this.shopId){
                // this.form.page = pageTemp.substring(0, pageTemp.indexOf('shopId=') + 7);
              }else{
                this.form.page = pageTemp;
              }
            }
          }
        },
        setPagePath(url){
          this.pageTemp = url;
        },
        handleSubmit(){},
        onChangePage(value){
          let shopUrl = '';
          if(value){
            this.form.shopId = '';
            this.form.spuId = '';
            this.form.articleInfoId = '';
            if(value == '/pages/article/article-info/index?id=') {//文章单独判断
              this.isArticleInfo = true;
              if(this.articleInfoList.length==0) {
                articleinfo.getPage({}).then(response => {
                  this.articleInfoList = response.data.data.records
                }).catch(() => {

                })
              }
            } else {
              this.isArticleInfo = false;
              this.pageUrls.pages.forEach((item, index)=>{
                if(item.url == value){//判断url类型
                  this.curType = item.type;
                  if(item.type!= this.pageUrls.types.singlePage){//如果不是单页面，就表示可以选店铺
                    this.shopDisabled = false;
                    if(item.type!=this.pageUrls.types.shopDetailPage){//如果不是店铺详情就可以选商品
                      this.spuDisabled = false;
                    }else {
                      this.spuDisabled = true;
                    }
                  }else {
                    this.shopDisabled = true;
                    this.spuDisabled = true;
                  }
                  if(item.shopList){
                    shopUrl = value + this.shopId
                  }
                  return;
                }
              });
            }
            if(this.shopId){
              if(shopUrl){
                this.pageTemp = shopUrl;
              } else {
                this.pageTemp = value;
              }
              this.form.shopId = this.shopId;
              this.onChangeShop(this.shopId,false);
            } else {
              this.pageTemp = value;
              this.$emit('change', this.pageTemp);
            }
          }
        },
        onChangeShop(value, changeShopPage){//更改店铺页面
          if(value){
            this.form.spuId = '';
            if(changeShopPage){
              this.pageTemp = this.form.page + this.form.spuId;
            }
            if(this.curType!=this.pageUrls.types.shopDetailPage){
              if(this.curType==this.pageUrls.types.bargainDetailPage){//如果是 砍价详情页面 取砍价的商品列表
                this.getBargaininfo();
              }else if(this.curType==this.pageUrls.types.grouponDetailPage){//如果是 拼团活动详情
                this.getGrouponinfo();
              }else if(this.curType==this.pageUrls.types.seckillDetailPage){//如果是 秒杀 详情
                this.getSeckillinfo();
              }else if(this.curType==this.pageUrls.types.goodsDetailPage){//如果是 商品详情
                this.getGoodsSpu();
              }
            }else {//如果是店铺
              this.pageTemp = this.form.page+this.form.shopId;
            }
            this.$emit('change', this.pageTemp);
          }
        },
        onChangeSpu(value){//更改店铺商品
          if(value){
            this.pageTemp = this.form.page + this.form.spuId;
            this.$emit('change', this.pageTemp);
          }
        },
        onChangeArticle(value){//文章
          if(value){
            this.pageTemp = this.form.page + this.form.articleInfoId;
            this.$emit('change', this.pageTemp);
          }
        },
        getBargaininfo() {//获取店铺所有 砍价的商品
          bargaininfo.getPage({ shopId : this.form.shopId }).then(response => {
            this.spuList = response.data.data.records
          }).catch(() => {
          })
        },
        getGrouponinfo() {//获取店铺所有 拼团的商品
          grouponinfo.getPage({shopId:this.form.shopId}).then(response => {
            this.spuList = response.data.data.records
          }).catch(() => {
          })
        },
        getSeckillinfo() {//获取店铺所有 秒杀 的商品
          seckillinfo.getPage({shopId: this.form.shopId}).then(response => {
            this.spuList = response.data.data.records
          }).catch(() => {
          })
        },
        getGoodsSku() {//获取店铺所有商品的规格
          // goodsSku.getPage({shopId:this.form.spuId}).then(response => {
          //   this.skuList = response.data.data.records
          // }).catch(() => {
          // })
        },
        getBargaininfoDetail(id) {//获取 砍价的商品详情,用于回显
          bargaininfo.getObj(id).then(response => {
            if(response.data){
              this.form.shopId = response.data.data.shopId;
              this.getBargaininfo();
            }
          }).catch(() => {
          })
        },
        getGrouponinfoDetail(id) {//获取店铺所有 拼团的商品详情，用于回显
          grouponinfo.getObj(id).then(response => {
            if(response.data){
              this.form.shopId = response.data.data.shopId;
              this.getGrouponinfo();
            }
          }).catch(() => {
          })
        },
        getGoodsSpuDetail(id) {//获取商品详情，用于回显
          goodsspu.getObj(id).then(response => {
            if(response.data){
              this.form.shopId = response.data.data.shopId;
              this.getGoodsSpu();
            }
          }).catch(() => {
          })
        },
        getSeckillDetail(id) {//获取 秒杀 详情，用于回显
          seckillinfo.getObj(id).then(response => {
            if(response.data){
              this.form.shopId = response.data.data.shopId;
              this.getSeckillinfo();
            }
          }).catch(() => {
          })
        },
        getGoodsSpu() {//获取店铺所有商品
          request({
            url: '/mall/goodsspu/list?shopId=' + this.form.shopId,
            method: 'get',
            params: {}
          }).then(response => {
            this.spuList = response.data;
          }).catch(() => {
          })
        },
        getShopList() {//获取所有店铺
          shopinfo.getList({}).then(response => {
            this.shopList = response.data.data
          }).catch(() => {
          })
        },
      }
    }
</script>

<style scoped>

</style>
