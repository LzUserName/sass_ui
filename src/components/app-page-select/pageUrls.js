/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const pageUrls = {
  types: {//类型
    'singlePage': '单页面',
    'bargainDetailPage': '砍价详情页面',
    'grouponDetailPage': '拼团详情页面',
    'goodsDetailPage': '商品详情页面',
    'shopDetailPage': '店铺详情页面',
  },
  pages : [
    {
      name:'首页',
      url:'/pages/home/index',
      type: '单页面',
    },

    {
      name:'商品详情页面',
      url:'/pages/goods/goods-detail/index?id=',
      type: '商品详情页面',
      shopShow: true,
    },
    {
      name:'店铺列表页面',
      url:'/pages/shop/shop-list/index',
      type: '单页面',
    },
    {
      name:'店铺详情页面',
      url:'/pages/shop/shop-detail/index?id=',
      type: '店铺详情页面',
    },
    {
      name:'秒杀列表页面',
      url:'/pages/seckill/seckill-list/index',
      type: '单页面',
      shopShow: true,
      shopList: true,
    },
    {
      name:'砍价活动列表页面',
      url:'/pages/bargain/bargain-list/index',
      type: '单页面',
      shopShow: true,
      shopList: true,
    },
    {
      name:'砍价活动商品详情',
      url:'/pages/bargain/bargain-detail/index?id=',
      type: '砍价详情页面',
      shopShow: true,
    },
    {
      name:'拼团活动列表页面',
      url:'/pages/groupon/groupon-list/index',
      type: '单页面',
      shopShow: true,
      shopList: true,
    },
    {
      name:'拼团活动商品详情',
      url:'/pages/groupon/groupon-detail/index?id=',
      type: '拼团详情页面',
      shopShow: true,
    },
    {
      name:'领取优惠券页面',
      url:'/pages/coupon/coupon-list/index',
      type: '单页面',
      shopShow: true,
      shopList: true,
    },
    {
      name:'我的积分',
      url:'/pages/user/user-points-record/index',
      type: '单页面'
    },
    {
      name:'商品分类',
      url:'/pages/goods/goods-category/index',
      type: '单页面',
    },
    {
      name:'我的收藏',
      url:'/pages/user/user-collect/index',
      type: '单页面'
    },
    {
      name:'我的订单',
      url:'/pages/order/order-list/index',
      type: '单页面',
    },
    {
      name:'文章列表',
      url:'/pages/article/article-list/index',
      type: '单页面',
    },
    {
      name:'文章详情',
      url:'/pages/article/article-info/index?id=',
      type: '单页面',
      shopShow: true,
    },
    {
      name:'积分签到',
      url:'/pages/signrecord/signrecord-info/index',
      type: '单页面'
    },
    {
      name:'分销中心',
      url:'/pages/distribution/distribution-center/index',
      type: '单页面'
    }
  ]
};
