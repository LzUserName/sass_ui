<!--
  - Copyright (C) 2018-2019
  - All rights reserved, Designed By www.joolun.com
  - 注意：
  - 本软件为www.joolun.com开发研制，未经购买不得使用
  - 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
  - 一经发现盗用、分享等行为，将追究法律责任，后果自负
-->
<template>
  <div class="execution">
    <basic-container>
      <div>
        <el-row :gutter="20" style="height: 840px;">
          <el-col :span="16">
            <el-tabs v-model="activeName" @tab-click="activeName==$event.name">
              <el-tab-pane label="主题设置" name="name1"></el-tab-pane>
              <el-tab-pane label="首页底部TabBar设置" name="name5"></el-tab-pane>
              <el-tab-pane label="浏览器标签设置" name="name6"></el-tab-pane>
            </el-tabs>
            <!-- 商城图片设置-->
            <div v-show="activeName=='name6'">
              <el-form ref="form1" label-width="0px" :rules="rules">
                <el-row>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">商城名称</div>
                    <el-popover
                      placement="bottom"
                      width="325"
                      trigger="hover">
                      <img width="300" src="../../../../public/img/thememobile/tab-title-tips.png"/>
                      <div slot="reference" style="font-size: 12px;color: #909399;">浏览器标签名称和顶部商城名称设置
                        <i class="el-icon-warning" ></i>
                      </div>
                    </el-popover>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px;margin-left: -100px;">
                    <el-form-item label="" prop="portalName">
                      <el-tooltip effect="dark" content="为空显示默认名称" placement="top">
                        <el-input v-model="form.portalName" size="small"></el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">浏览器favicon</div>
                    <el-popover
                      placement="bottom"
                      width="325"
                      trigger="hover">
                      <img width="300" src="../../../../public/img/thememobile/tab-icon-tips.png"/>
                      <div slot="reference" style="font-size: 12px;color: #909399;">浏览器标签显示的图标
                        <i class="el-icon-warning" ></i>
                      </div>
                    </el-popover>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px;margin-left: -100px;">
                    <el-form-item label="" prop="h5Icon">
                      <MaterialList :value="form.h5Icon?[form.h5Icon]:[]"
                                    @sureSuccess="form.h5Icon = $event?$event[0]:''"
                                    @deleteMaterial="form.h5Icon = ''"
                                    type="image" shopId="-1"
                                    :num=1 width="60" :height="60"></MaterialList>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <!-- 主题设置 -->
            <div v-show="activeName=='name1'">
              <el-form ref="form" :model="form" label-width="0px" :rules="rules">
                <el-row>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">商城展示模式</div>
                    <div style="font-size: 12px;color: #909399;">单店铺模式下会隐藏前端页面店铺的相关显示</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="themeColor">
                      <el-form-item label="">
                        <el-tooltip effect="dark" content="修改生效需要重启前端应用" placement="top">
                          <!--                          <el-radio-group v-model="form.showType" @change="showTypeChange">-->
                          <el-radio-group v-model="form.showType">
                            <el-radio label="1">多店铺</el-radio>
                            <el-radio label="2">单店铺</el-radio>
                          </el-radio-group>
                        </el-tooltip>
                      </el-form-item>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 50px;">
                    <div style="font-size: 16px;color: #303133;">背景颜色</div>
                    <div style="font-size: 12px;color: #909399;">（导航栏、模块背景色值，可支持渐变色）</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 50px; margin-left: -100px;">
                    <el-form-item label="" prop="backgroundColor">
                      <el-tooltip effect="dark" content="colorUI中的类名" placement="top">
                        <el-input v-model="form.backgroundColor" size="small"
                                  @focus="appTheme.bgType='background',appTheme.showBgDialog=true">
                          <template slot="append">
                            <div style="background:#fff;width: 24px;padding-left: 5px;">
                              <div :class="'bg-' + form.backgroundColor"
                                   style="height: 20px;width: 20px;float: left;"></div>
                            </div>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">主题颜色</div>
                    <div style="font-size: 12px;color: #909399;">（页面中图标、按钮、元素色值，暂不支持渐变色）</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="themeColor">
                      <el-tooltip effect="dark" content="colorUI中的类名" placement="top">
                        <el-input v-model="form.themeColor" size="small"
                                  @focus="appTheme.bgType='theme',appTheme.showBgDialog=true">
                          <template slot="append">
                            <div style="background:#fff;width: 24px;padding-left: 5px;">
                              <div :class="'bg-' + form.themeColor" style="height: 20px;width: 20px;float: left;"></div>
                            </div>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">tabBar文字颜色</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="tabbarColor">
                      <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                        <el-input v-model="form.tabbarColor" size="small">
                          <template slot="append">
                            <el-color-picker size="mini" v-model="form.tabbarColor"></el-color-picker>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">tabBar文字选中颜色</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="tabbarSelectedColor">
                      <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                        <el-input v-model="form.tabbarSelectedColor" size="small">
                          <template slot="append">
                            <el-color-picker size="mini" v-model="form.tabbarSelectedColor"></el-color-picker>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">tabBar背景色</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="tabbarBackgroundColor">
                      <el-tooltip effect="dark" content="色值代码，如#ffffff" placement="top">
                        <el-input v-model="form.tabbarBackgroundColor" size="small">
                          <template slot="append">
                            <el-color-picker size="mini" v-model="form.tabbarBackgroundColor"></el-color-picker>
                          </template>
                        </el-input>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12" style="padding-left: 20px; margin-top: 20px;">
                    <div style="font-size: 16px;color: #303133;">tabBar上边框颜色</div>
                  </el-col>
                  <el-col :span="12" style="margin-top: 20px; margin-left: -100px;">
                    <el-form-item label="" prop="tabbarBorderStyle">
                      <el-tooltip effect="dark" content="请选择tabBar上边框颜色" placement="top">
                        <el-select size="small" style="width: 100%;" v-model="form.tabbarBorderStyle"
                                   placeholder="请选择tabBar上边框颜色">
                          <el-option label="黑色" value="black"></el-option>
                          <el-option label="白色" value="white"></el-option>
                        </el-select>
                      </el-tooltip>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
            <!-- 底部tabBar -->
            <div v-show="activeName=='name5'">
              <div style="font-size: 13px;color: #8c939d;height: 20px;">提示：目前已经提供4套图标可以选择配置。</div>
              <!--  注意：图标路径请按已有方式进行统一存放  -->
              <!--  web图标路径示例：'public/img/thememobile/icon-1/1-001.png' 'public/img/thememobile/icon-1/1-002.png' -->
              <!--  app图标路径示例：'/static/public/img/icon-1/1-001.png' '/static/public/img/icon-1/1-002.png' -->
              <el-form :model="form" label-width="60px" v-if="form.tabbarItem&&form.tabbarItem.info">
                <el-form-item :label="'图标' + (index + 1)" v-for="(item,index) in 4" :key="index" class="tabbar-item"
                              :style="index==curTabBarIndex?'background:#efefef':'background:#fff'"
                              style="margin-top: 40px;">
                  <div @click="tabbarChange(index)">
                    <el-row>
                      <el-col :span="4" v-for="(item2, index2) in 5" :key="index2"
                              style="text-align: center;margin-left: 20px;">
                        <div>
                          <img :src="'/img/thememobile/icon-'+(index+1)+'/' + (index2+1) + '-001.png'"
                               style="width: 40px;height: 40px;"/>
                          <img :src="'/img/thememobile/icon-'+(index+1)+'/' + (index2+1) + '-002.png'"
                               style="width: 40px;height: 40px;margin-left: 10px;"/>
                        </div>
                        <div>
                          <el-input size="mini" v-model="form.tabbarItem.info[index2].text"
                                    style="width: 86px;text-align: center;"></el-input>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <!-- 底部tabBar（可以使用网络图片的tabbar暂时保留，因为UniApp的原生App暂不支持网络图片所以先隐藏保留） -->
            <!--            <div v-show="activeName=='name5'">-->
            <!--              <el-form :model="form" label-width="100px" v-if="form.tabbarItem&&form.tabbarItem.info">-->
            <!--                <el-row style="margin-top: 30px;">-->
            <!--                  <el-col :span="12" v-for="(item,index) in tabBarData" :key="index">-->
            <!--                    <div>-->
            <!--                      <el-form-item :label="'TabBar'+(index+1)">-->
            <!--                        <el-input size="mini" v-model="form.tabbarItem.info[index].text"></el-input>-->
            <!--                      </el-form-item>-->
            <!--                      <el-row :gutter="20" v-if="form.tabbarItem&&form.tabbarItem.info">-->
            <!--                        <el-col :span="12">-->
            <!--                          <el-form-item :label="''" label-width="100px">-->
            <!--                            <MaterialList :value="[form.tabbarItem.info[index].selectedIconPath]" @sureSuccess="form.tabbarItem.info[index].selectedIconPath=$event?$event[0]:''"-->
            <!--                                          @deleteMaterial="form.tabbarItem.info[index].selectedIconPath=tabBarData[index].selectedIconPath"-->
            <!--                                          type="image" shopId="-1" :num=1 :width=60 :height=60></MaterialList>-->
            <!--                            <div style="margin-top: -20px;">选中时图片</div>-->
            <!--                          </el-form-item>-->
            <!--                        </el-col>-->
            <!--                        <el-col :span="12">-->
            <!--                          <el-form-item :label="''" label-width="50px">-->
            <!--                            <MaterialList :value="[form.tabbarItem.info[index].iconPath]" @sureSuccess="form.tabbarItem.info[index].iconPath=$event?$event[0]:''"-->
            <!--                                          @deleteMaterial="form.tabbarItem.info[index].iconPath=tabBarData[index].iconPath" type="image"-->
            <!--                                          shopId="-1" :num=1 :width=60 :height=60></MaterialList>-->
            <!--                            <div style="margin-top: -20px;">未选中时图片</div>-->
            <!--                          </el-form-item>-->
            <!--                        </el-col>-->
            <!--                      </el-row>-->
            <!--                    </div>-->
            <!--                  </el-col>-->
            <!--                </el-row>-->
            <!--                <div style="font-size: 12px; color: #666666; margin: 0 0 0 40px; color: #ff0000;">*图片/icon建议尺寸（66x66）px</div>-->
            <!--              </el-form>-->
            <!--            </div>-->

            <div style="margin-top: 20px; text-align: center">
              <el-button type="primary" @click="submitForm('form')" style="width: 168px;">提交</el-button>
              <el-button @click="resetForm('form')" style="width: 168px; margin-left: 24px;">清空</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="背景颜色" :visible.sync="appTheme.showBgDialog" width="40%">
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item,index) in colorList" :key="index" class="tm-select-bg"
                  v-show="!(appTheme.bgType=='theme'&&item.name.indexOf('-')!=-1)">
            <div @click="onBgColor(item)">
              <div :class="'bg-' + item.name" style="width: 30px;height: 30px;margin: 0 auto;"></div>
              <div style="margin-top: 5px;">{{ item.title }}&nbsp;{{ item.name }}</div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <!-- 首页轮播组件及通知组件，不显示，仅用作调用方法 -->
    </basic-container>
    <div class="preview">
      <div class="screen">
        <div class="notch"></div>
        <div class="backgroundColor padding-lr-xs " :class="'bg-'+form.backgroundColor">
          <div>
            <div class="cu-list menu-avatar ">
              <div class="padding-top-xs">
                <div class="flex ">
                  <div class="flex padding-left-xs">
                    <div class="cu-avatar round head bg-white head-portrait "></div>
                    <div class="content margin-left margin-top-sm padding-top">
                      <div class="flex align-center">
                        <div class="text-white text-bold ">JooLun</div>
                        <div class="margin-left">
                          <img class="update-image"
                               src="/img/thememobile/img/update-image.png"/>
                        </div>
                      </div>
                      <div class="text-white margin-top-xs">188****8888</div>
                    </div>
                  </div>
                  <div class="flex-sub flex justify-end align-center padding-top margin-right" style="z-index: 9999;">
                    <div>
                      <img class="signrecord" src="/img/thememobile/img/signrecord.png"/>
                    </div>
                  </div>
                </div>
                <div class="account cu-list menu card-menu margin-top-sm margin-bottom-xl">
                  <div class="flex text-center text-white align-center margin-bottom">
                    <div class="flex flex-sub flex-direction">
                      <div class="text-xl text-bold">88</div>
                      <div class="margin-top-xs flex align-center justify-center">
                        <span class="cuIcon-vip"></span>
                        <span class="margin-left-xs text-sm">会员编号</span>
                      </div>
                    </div>
                    <div class="flex flex-sub flex-direction">
                      <div class="text-xl text-bold">888</div>
                      <div class="margin-top-xs flex align-center justify-center">
                        <span class="cuIcon-medal"></span>
                        <span class="margin-left-xs text-sm">当前积分</span>
                      </div>
                    </div>
                    <div class="flex flex-sub flex-direction">
                      <div class="text-xl text-bold">8</div>
                      <div class="margin-top-xs flex align-center justify-center">
                        <span class="cuIcon-ticket"></span>
                        <span class="margin-left-xs text-sm">优惠券</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cu-list " style="margin-top: -30px;">
            <div>
              <div
                class="card-menu menu  padding-tb-xs  flex justify-between align-center distribution-bg padding-right-xs">
                <div class="flex align-center">
                  <img class="distribution-image "
                       src="https://joolun-plus-1313274050.cos.ap-nanjing.myqcloud.com/joolun-plus-ui/red-packet.png"/>
                  <div class="text-yellow text-sm" style="color: #faead0;">微分销招募令,期待你的加入！</div>
                </div>
                <span class="text-sm distribution-center">分销中心</span>
              </div>
            </div>
            <div class="cu-list grid col-5 no-border padding-tb-sm" style="margin-top: -5px; border-radius: 5px;">
              <div class="text-black">
                <div class="flex flex-sub flex-direction align-center">
                  <span class="cuIcon-pay " style="font-size: 20px;" :class="'text-'+form.themeColor"></span>
                  <span class="text-sm margin-top-xs">待付款</span>
                </div>
              </div>
              <div class="text-black">
                <div class="flex flex-sub flex-direction align-center">
                  <div class="cuIcon-deliver" style="font-size: 20px;" :class="'text-'+form.themeColor">
                  </div>
                  <span class="text-sm margin-top-xs">待发货</span>
                </div>
              </div>
              <div class="text-black">
                <div class="flex flex-sub flex-direction align-center">
                  <div class="cuIcon-send" style="font-size: 20px;" :class="'text-'+form.themeColor"></div>
                  <span class="text-sm margin-top-xs">待收货</span>
                </div>
              </div>
              <div class="text-black">
                <div class="flex flex-sub flex-direction align-center">
                  <div class="cuIcon-evaluate" style="font-size: 20px;" :class="'text-'+form.themeColor">
                  </div>
                  <span class="text-sm margin-top-xs">待评价</span>
                </div>
              </div>
              <div class="text-black">
                <div class="flex flex-sub flex-direction align-center solid-left">
                  <div class="cuIcon-goods" style="font-size: 20px;" :class="'text-'+form.themeColor"></div>
                  <span class="text-sm margin-top-xs">全部订单</span>
                </div>
              </div>
            </div>
          </div>
          <div class=" margin-top-xs">
            <div class="activity-image"></div>
          </div>
          <div class="cu-list margin-top-xs ">
            <div class="cu-bar bg-white" style="border-radius: 10px 10px 0px 0px;">
              <div class="action text-bold text-sm">我的工具</div>
            </div>
            <div class="cu-list grid col-4 no-border" style="border-radius: 0px 0px 10px 10px;">
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-footprint.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的足迹</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-coupon.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的卡券</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-groupon.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的团购</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-bargain.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的砍价</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-seckill.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的秒杀</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-distribution.png" class="item-img"/>
                  <div class="text-grey text-sm" style="font-size: 12px">分销中心</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-collect.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的收藏</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-article.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">新闻资讯</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/daipinglun.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的评价</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-address.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">收货地址</div>
                </div>
              </div>
              <div class="cu-item">
                <div>
                  <img src="/img/thememobile/img/user-signrecord.png" class="item-img"/>
                  <div class="text-grey text-xs" style="font-size: 12px">我的签到</div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="tabbar">
          <div class="tabbar-top-solid"
               :style="'background: '+(form.tabbarBorderStyle?form.tabbarBorderStyle:'white')"></div>
          <div class="cu-bar tabbar bg-white shadow foot" :style="{backgroundColor: form.tabbarBackgroundColor}">
            <div class="action btm-bar-item">
              <div class='cuIcon-cu-image'>
                <img :src="'/img/thememobile/icon-'+(curTabBarIndex+1)+'/1-001.png'"/>
              </div>
              <div class="text-unselected" :style="{color: form.tabbarColor}">{{ form.tabbarItem.info[0].text }}</div>
            </div>
            <div class="action btm-bar-item">
              <div class='cuIcon-cu-image'>
                <img :src="'/img/thememobile/icon-'+(curTabBarIndex+1)+'/2-001.png'"/>
              </div>
              <div class="text-unselected" :style="{color: form.tabbarColor}">{{ form.tabbarItem.info[1].text }}</div>
            </div>
            <div class="action btm-bar-item">
              <div class='cuIcon-cu-image'>
                <img :src="'/img/thememobile/icon-'+(curTabBarIndex+1)+'/3-001.png'"/>
              </div>
              <div class="text-unselected" :style="{color: form.tabbarColor}">{{ form.tabbarItem.info[2].text }}</div>
            </div>
            <div class="action btm-bar-item">
              <div class='cuIcon-cu-image'>
                <img :src="'/img/thememobile/icon-'+(curTabBarIndex+1)+'/4-001.png'"/>
              </div>
              <div class="text-unselected" :style="{color: form.tabbarColor}">{{ form.tabbarItem.info[3].text }}</div>
            </div>
            <div class="action btm-bar-item">
              <div class='cuIcon-cu-image'>
                <img :src="'/img/thememobile/icon-'+(curTabBarIndex+1)+'/5-002.png'"/>
              </div>
              <div class="text-selected" :style="{color: form.tabbarSelectedColor}">{{ form.tabbarItem.info[4].text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPage,
  getObj,
  addObj,
  putObj,
  delObj,
  getObj2
} from '@/api/mall/thememobile'
import {
  tableOption
} from '@/const/crud/mall/thememobile'
import {
  mapGetters
} from 'vuex'

import MaterialList from '@/components/material/list.vue'
import AppPageSelect from '@/components/app-page-select/Index.vue'

export default {
  name: 'thememobileform',
  components: {
    MaterialList,
    AppPageSelect,
  },
  data() {
    return {
      noticeTextCurIndex: -1, //通知编 辑时索引
      noticeItemCurIndex: -1, //轮播图 编辑时索引
      navButtonCurIndex: -1, //首页中间导航按钮 编辑时索引
      noticeTextList: [], //通知DATA数据
      noticeItemList: [], //轮播图数据
      appTheme: { //主题设置显示
        bgType: 'theme', //类型 theme background
        showForm: false, //显示
        showBgDialog: false,
      },

      activeName: "name1", //页面tabs设置显示
      tabBarItemActive: 0, //激活的tab
      tabBar: [{}, {}, {}, {},],
      rules: {
        themeColor: [{
          required: true,
          message: '请选择主题颜色',
          trigger: 'blur'
        },
          {
            max: 50,
            message: '长度在不能超过10个字符'
          },
        ],
        backgroundColor: [{
          required: true,
          message: '请选择背景颜色',
          trigger: 'blur'
        },
          {
            max: 50,
            message: '长度在不能超过10个字符'
          },
        ],
        tabbarColor: [{
          required: true,
          message: '请选择tabBar文字颜色',
          trigger: 'blur'
        },
          {
            max: 50,
            message: '长度在不能超过10个字符'
          },
        ],
        tabbarSelectedColor: [{
          required: true,
          message: '请选择tabBar文字选中颜色',
          trigger: 'blur'
        },
          {
            max: 50,
            message: '长度在不能超过10个字符'
          },
        ],
        tabbarBackgroundColor: [{
          required: true,
          message: '请选择tabBar背景色',
          trigger: 'blur'
        },
          {
            max: 50,
            message: '长度在不能超过10个字符'
          },
        ],
        tabbarBorderStyle: [{
          required: true,
          message: '请选择tabBar上边框颜色',
          trigger: 'blur'
        }],
      },
      navButtonModal: false,
      navButtonForm: {
        name: '',
        url: '',
        img: null,
      },
      form: {
        "portalName": "",
        "h5Icon": "",
        "themeColor": "scarlet",
        "backgroundColor": "gradual-scarlet",
        "tabbarColor": "#666666",
        "tabbarSelectedColor": "#f42121",
        "tabbarBackgroundColor": "#ffffff",
        "tabbarBorderStyle": "white",
        "showType": "1",// 1 多店铺 2 单店铺
        tabbarItem: {
          info: [
            {
              text: '首页',
              index: 0,
              iconPath: '/img/thememobile/icon-1/1-001.png',
              selectedIconPath: '/img/thememobile/icon-1/1-002.png'
            },
            {
              text: '类别',
              index: 1,
              iconPath: '/img/thememobile/icon-1/2-001.png',
              selectedIconPath: '/img/thememobile/icon-1/2-002.png'
            },
            {
              text: '消息',
              index: 2,
              iconPath: '/img/thememobile/icon-1/3-001.png',
              selectedIconPath: '/img/thememobile/icon-1/3-002.png'
            },
            {
              text: '购物车',
              index: 3,
              iconPath: '/img/thememobile/icon-1/4-001.png',
              selectedIconPath: '/img/thememobile/icon-1/4-002.png'
            },
            {
              text: '我的',
              index: 4,
              iconPath: '/img/thememobile/icon-1/5-001.png',
              selectedIconPath: '/img/thememobile/icon-1/5-002.png'
            },
          ]
        },
        navButton: {
          info: []
        }
      },

      colorList: [
        {
          title: '默认',
          name: 'gradual-scarlet',
          color: '#ffffff'
        }, {
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
      tableOption: tableOption,

      previewHei: 667, //预览窗口高度
      previewWid: 375, //预览窗口宽度
      pageTopHei: 0, //页面顶部title高度
      navButtonData: [],
      curTabBarIndex: 0,
      tabBarData: [
        {
          text: '首页',
          iconPath: '/img/thememobile/icon-1/1-001.png',//web的地址
          selectedIconPath: '/img/thememobile/icon-1/1-002.png',
        },
        {
          text: '类别',
          iconPath: '/img/thememobile/icon-1/2-001.png',
          iconPathApp: '/static/public/img/2-001.png',//app中的地址
          selectedIconPath: '/img/thememobile/icon-1/2-002.png',
          selectedIconPathApp: '/static/public/img/2-002.png',//app中的地址
        },
        {
          text: '消息',
          iconPath: '/img/thememobile/icon-1/2-001.png',
          selectedIconPath: '/img/thememobile/icon-1/2-002.png'
        },
        {
          text: '购物车',
          iconPath: '/img/thememobile/icon-1/3-001.png',
          selectedIconPath: '/img/thememobile/icon-1/3-002.png'
        },
        {
          text: '我的',
          iconPath: '/img/thememobile/icon-1/4-001.png',
          selectedIconPath: '/img/thememobile/icon-1/4-002.png'
        }
      ]
    }
  },
  created() {
    this.handleGet()
  },
  mounted: function () {
  },
  watch: {},
  computed: {
    ...mapGetters(['permissions']),

  },
  methods: {
    onEditView(type, index) {
      if (type == 'appTheme') { //主题
        this.activeName = 'name1';
      } else if (type == 'noticeItem') { //轮播
        this.activeName = 'name2';
        this.noticeItemCurIndex = index;
      } else if (type == 'noticeText') { //公告
        this.activeName = 'name3';
        this.noticeTextCurIndex = index;
      } else if (type == 'navButton') { //中间导航
        this.activeName = 'name4';
        this.navButtonCurIndex = index;
      } else if (type == 'tabBar') { //tabBar
        this.activeName = 'name5';
      }
    },
    onSortBottom(dataTemp, index, type) { //往下移动一格 0 + 1
      if (index != dataTemp.length - 1) {
        dataTemp[index] = dataTemp.splice(index + 1, 1, dataTemp[index])[0];
      } else {
        dataTemp.unshift(dataTemp.splice(index, 1)[0]);
      }
      dataTemp[index].sort = index;
      dataTemp[index + 1].sort = index + 1;
      if (type == 'noticeItem') { //轮播
        this.$refs.noticeItemRef.changeSort(dataTemp[index]);
        this.$refs.noticeItemRef.changeSort(dataTemp[index + 1]);
      } else if (type == 'noticeText') { //公告
        this.$refs.noticeTextRef.changeSort(dataTemp[index]);
        this.$refs.noticeTextRef.changeSort(dataTemp[index + 1]);
      }
    },
    onSortTop(dataTemp, index, type) { //往上移动一格
      if (index != 0) {
        dataTemp[index] = dataTemp.splice(index - 1, 1, dataTemp[index])[0];
      } else {
        dataTemp.push(dataTemp.shift());
      }
      dataTemp[index].sort = index;
      dataTemp[index - 1].sort = index - 1;
      if (type == 'noticeItem') { //轮播
        this.$refs.noticeItemRef.changeSort(dataTemp[index]);
        this.$refs.noticeItemRef.changeSort(dataTemp[index - 1]);
      } else if (type == 'noticeText') { //公告
        this.$refs.noticeTextRef.changeSort(dataTemp[index]);
        this.$refs.noticeTextRef.changeSort(dataTemp[index - 1]);
      }
    },
    onAddNoticeItemButton(startIndex) { //新增 轮播图
      this.$refs.noticeItemRef.openAddForm();
    },
    onEditNoticeItemButton(row, index) { //编辑 轮播图
      this.$refs.noticeItemRef.openEditForm(row, index);
    },
    onChangeNoticeItemButton(item) { //启用 轮播图
      this.$refs.noticeItemRef.changeEnable(item);
    },
    onDelNoticeItemButton(item, startIndex) { //删除 轮播图
      this.$refs.noticeItemRef.handleDel(item);
    },

    onAddNoticeTextButton(startIndex) { //新增 通知
      this.$refs.noticeTextRef.openAddForm();
    },
    onEditNoticeTextButton(row, index) { //编辑 通知
      this.$refs.noticeTextRef.openEditForm(row, index);
    },
    onChangeNoticeTextButton(item) { //启用 通知
      this.$refs.noticeTextRef.changeEnable(item);
    },
    onDelNoticeTextButton(item, startIndex) { //删除 通知
      this.$refs.noticeTextRef.handleDel(item);
    },
    onAddNavButton(startIndex) { //新增 NavBtn
      this.$refs['navButtonForm'].validate((valid) => {
        if (valid) {
          this.form.navButton.info.push(this.navButtonForm);
          this.navButtonModal = false;
          this.navButtonForm = {
            name: '',
            url: '',
            img: null,
          };
        } else {
          return false;
        }
      });

    },
    onDeleteButton(dataTemp, index) { //删除
      dataTemp.splice(index, 1);
    },
    onBgColor(item) {
      if (this.appTheme.bgType === 'theme') {
        this.form.themeColor = item.name;
      } else {
        this.form.backgroundColor = item.name;
      }
      this.appTheme.showBgDialog = false;
    },
    tabbarChange(index) { // 选择tabBar
      this.curTabBarIndex = index
      this.form.tabbarItem.info.map((item, index2) => {
        item.iconPath = '/static/public/img/icon-' + (index + 1) + '/' + (index2 + 1) + '-001.png'
        item.selectedIconPath = '/static/public/img/icon-' + (index + 1) + '/' + (index2 + 1) + '-002.png'
      })
    },
    initResponseData(response) {
      response.data.data = response.data.data ? response.data.data : null;
      //初始化数据 tabBar数据 curTabBarIndex
      if (response.data.data.tabbarItem && response.data.data.tabbarItem.info) {
        let info = response.data.data.tabbarItem.info;
        let iconPathTemp = info[0].iconPath
        for (let i = 0; i < 4; i++) {// 确认第几套图标
          // /static/public/img/icon-2/1-001.png
          if (iconPathTemp.indexOf('icon-' + (i + 1)) != -1) {
            this.curTabBarIndex = i

          }
        }
      }
      //初始化数据 tabBar数据
      // if (response.data.data.tabbarItem && response.data.data.tabbarItem.info) {
      //   let info = response.data.data.tabbarItem.info;
      //   let infoIndex = [];
      //   let infoTemp = [];
      //   info.map(item => {
      //     infoIndex.push(item.index)
      //   });
      //   // 默认tabBar图片
      //   for (let i = 0; i < 5; i++) {
      //     let indexTemp = infoIndex.indexOf(i);
      //     if (indexTemp == -1) {
      //       infoTemp.push({
      //         "selectedIconPath": this.tabBarData[i].selectedIconPath,
      //         "iconPath": this.tabBarData[i].iconPath,
      //         "index": i,
      //         "text": this.tabBarData[i].text,
      //       })
      //     } else {
      //       infoTemp.push({
      //         "selectedIconPath": info[indexTemp].selectedIconPath ? info[indexTemp].selectedIconPath : this.tabBarData[
      //           i].selectedIconPath,
      //         "iconPath": info[indexTemp].iconPath ? info[indexTemp].iconPath : this.tabBarData[i].iconPath,
      //         "index": i,
      //         "text": info[indexTemp].text ? info[indexTemp].text : this.tabBarData[i].text,
      //       })
      //     }
      //   }
      //   response.data.data.tabbarItem.info = infoTemp;
      // }
      if (response.data.data) {
        response.data.data.showType = response.data.data.showType || '1'
        this.form = response.data.data;
      }
    },
    handleGet: function () {
      getObj2().then(response => {
        this.initResponseData(response)
      })
    },
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.handleUpdate(this.form);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @title 数据更新
     * @param row 为当前的数据
     * @param index 为当前更新数据的行数
     * @param done 为表单关闭函数
     *
     **/
    handleUpdate(form) {
      // 过滤数据
      // this.form.tabbarItem.info.map(item => {
      //   if (item.iconPath.indexOf("http") == -1) {
      //     item.iconPath = ''
      //   }
      //   if (item.selectedIconPath.indexOf("http") == -1) {
      //     item.selectedIconPath = ''
      //   }
      // });
      putObj(this.form).then(response => {
        // done()
        this.initResponseData(response)
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        })
      }).catch(() => {
        // done()
      })
    },
  }
}
</script>
<style lang='less' scoped>

@import '../pagedevise/component-library/colorui/main.css';
@import '../pagedevise/component-library/colorui/icon.css';

.preview {
  width: 428px;
  height: 780px;
  background-image: url(/img/preview/preview-phone.png);
  background-repeat: no-repeat;
  position: absolute;
  top: 60px;
  left: 1100px;
  font-weight: 300;

  .user-bg {
    position: absolute;
    top: 90px;
    right: 15px;
    width: 124px;
    height: 124px;
    opacity: 0.2;
  }

  .item-img {
    width: 30px;
    height: 30px;
  }

  .update-image {
    width: 15px;
    height: 15px;
  }

  .signrecord {
    width: 70px;
    height: 26px;
  }

  .distribution-bg {
    border-radius: 10px 10px 0 0;
    background-color: #3b363a;
  }

  .distribution-image {
    width: 40px;
    height: 40px;
  }

  .distribution-center {
    border-radius: 10px;
    padding: 3px 8px;
    background-image: linear-gradient(to right, #faead0, #e9b59a);
    color: #42494d;
  }

  .activity-image {
    width: 100%;
    height: 60px;
    background-image: url(https://joolun-plus-1313274050.cos.ap-nanjing.myqcloud.com/joolun-plus-ui/discounts-image.png);
    background-size: 100% 60px;
  }
}

.screen {
  width: 298px;
  height: 626px;
  background-color: #f0f0f0;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 40px;
}

.top-title {
  border-radius: 40px 40px 0px 0px;
  text-align: center;
  padding-top: 30px;
}

.head-portrait {
  background-image: url(/img/preview/joolun-logo.png);
}

.order-text {
  font-size: 12px !important;
}

.notch {
  width: 268px;
  height: 21px;
  background-image: url(/img/preview/preview-notch.png);
  background-size: 268px 21px;
  background-repeat: no-repeat;
  position: absolute;
  top: 10px;
  left: 26px;
  z-index: 1;
}

.backgroundColor {
  width: 298px;
  height: 190px;
  background-color: #d34e41;
  border-radius: 40px 40px 0px 0px;
}

.tabbar-top-solid {
  position: absolute;
  height: 1px;
  width: 100%;
  bottom: 120px;
}

.tabbar {
  width: 298px;
  height: 60px;
  border-radius: 0px 0px 40px 40px;
  position: absolute;
  bottom: 72px;
  padding-bottom: 20px;
}

.btm-bar-item {
  width: 45px !important;
  border-radius: 0px 0px 40px 40px;

  .cuIcon-cu-image {
    width: 40px !important;

    img {
      width: 23px !important;
    }
  }
}

.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: 1px solid #eaeefb;
  border-radius: 4px;

  li {

    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    line-height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;

    span {
      line-height: normal;
      color: #99a9bf;
      transition: color .15s linear;

    }

  }
}

.el-col-5 {
  width: 20%;

}

.icon-name {
  display: inline-block;
  padding: 0 3px;
  height: 1em;
}


/*color ui*/
.grid {
  display: flex;
  flex-wrap: wrap;
}

.grid.grid-square {
  overflow: hidden;
}

.grid.grid-square .cu-tag {
  position: absolute;
  right: 0;
  top: 0;
  border-bottom-left-radius: 6px;
  padding: 6px 12px;
  height: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.grid.grid-square > div > span[class*="cuIcon-"] {
  font-size: 52px;
  position: absolute;
  color: #8799a3;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.grid.grid-square > div {
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.grid.grid-square > div.bg-img img {
  width: 100%;
  height: 100%;
  position: absolute;
}

.grid.col-1.grid-square > div {
  padding-bottom: 100%;
  height: 0;
  margin-right: 0;
}

.grid.col-2.grid-square > div {
  padding-bottom: calc((100% - 20px) / 2);
  height: 0;
  width: calc((100% - 20px) / 2);
}

.grid.col-3.grid-square > div {
  padding-bottom: calc((100% - 40px) / 3);
  height: 0;
  width: calc((100% - 40px) / 3);
}


.bg-red {
  background-color: #e54d42;
  color: #ffffff;
}

.bg-orange {
  background-color: #f37b1d;
  color: #ffffff;
}

.bg-yellow {
  background-color: #fbbd08;
  color: #333333;
}

.bg-olive {
  background-color: #8dc63f;
  color: #ffffff;
}

.bg-green {
  background-color: #39b54a;
  color: #ffffff;
}

.bg-cyan {
  background-color: #1cbbb4;
  color: #ffffff;
}

.bg-darkblue {
  background-color: #0055ff;
  color: #ffffff;
}

.bg-blue {
  background-color: #0081ff;
  color: #ffffff;
}

.bg-purple {
  background-color: #6739b6;
  color: #ffffff;
}

.bg-mauve {
  background-color: #9c26b0;
  color: #ffffff;
}

.bg-pink {
  background-color: #e03997;
  color: #ffffff;
}

.bg-brown {
  background-color: #a5673f;
  color: #ffffff;
}

.bg-grey {
  background-color: #8799a3;
  color: #ffffff;
}

.bg-gray {
  background-color: #f0f0f0;
  color: #333333;
}

.bg-black {
  background-color: #333333;
  color: #ffffff;
}

.bg-white {
  background-color: #ffffff;
  color: #666666;
}

.bg-shadeTop {
  background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.01));
  color: #ffffff;
}

.bg-shadeBottom {
  background-image: linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 1));
  color: #ffffff;
}

.bg-red.light {
  color: #e54d42;
  background-color: #fadbd9;
}

.bg-orange.light {
  color: #f37b1d;
  background-color: #fde6d2;
}

.bg-yellow.light {
  color: #fbbd08;
  background-color: #fef2ced2;
}

.bg-olive.light {
  color: #8dc63f;
  background-color: #e8f4d9;
}

.bg-green.light {
  color: #39b54a;
  background-color: #d7f0dbff;
}

.bg-cyan.light {
  color: #1cbbb4;
  background-color: #d2f1f0;
}

.bg-blue.light {
  color: #0081ff;
  background-color: #cce6ff;
}

.bg-purple.light {
  color: #6739b6;
  background-color: #e1d7f0;
}

.bg-mauve.light {
  color: #9c26b0;
  background-color: #ebd4ef;
}

.bg-pink.light {
  color: #e03997;
  background-color: #f9d7ea;
}

.bg-brown.light {
  color: #a5673f;
  background-color: #ede1d9;
}

.bg-grey.light {
  color: #8799a3;
  background-color: #e7ebed;
}

.bg-scarlet {
  background-color: #f42121;
  color: #ffffff;
}

.bg-gradual-scarlet {
  background-image: linear-gradient(45deg, #e5432e, #f42121);
  color: #ffffff;
}

.bg-gradual-red {
  background-image: linear-gradient(45deg, #f43f3b, #ec008c);
  color: #ffffff;
}

.bg-gradual-orange {
  background-image: linear-gradient(45deg, #ff9700, #ed1c24);
  color: #ffffff;
}

.bg-gradual-green {
  background-image: linear-gradient(45deg, #39b54a, #8dc63f);
  color: #ffffff;
}

.bg-gradual-purple {
  background-image: linear-gradient(45deg, #9000ff, #5e00ff);
  color: #ffffff;
}

.bg-gradual-pink {
  background-image: linear-gradient(45deg, #ec008c, #6739b6);
  color: #ffffff;
}

.bg-gradual-blue {
  background-image: linear-gradient(45deg, #0081ff, #1cbbb4);
  color: #ffffff;
}


.bg-gradual-gray {
  background-image: linear-gradient(45deg, #99a6c3, #444c5e);
  color: #ffffff;
}

.bg-gradual-darkblue {
  background-image: linear-gradient(45deg, #339eec, #1b7bde);
  color: #ffffff;
}

.bg-gradual-scarlet {
  background-image: linear-gradient(90deg, #fb2d1a, #ff553f);
  color: #ffffff;
}

.bg-scarlet {
  background-color: #f42121;
  color: #ffffff;
}


.tm-select-bg {
  text-align: center;
  cursor: pointer;
  padding: 10px 0;
}

.tm-select-bg:hover {
  background: #efefef;
}

.tabbar-item {
  padding-top: 10px;
  cursor: pointer;
  background: #efefef;
}

.tabbar-item:hover {
  background: rgba(189, 238, 255, 0.91);
}


</style>

<style>
.personal-information {
  margin-top: -30px;
}

.cu-avatar.xs {
  width: 30px;
  height: 30px;
  font-size: 1em;
}

.head {
  margin: auto;
  border: #FFFFFF 1px solid;
  margin-top: 35px;
}

.all-orders {
  width: 94% !important;
  margin: auto !important;
  margin-top: 10px !important;
  border-radius: 5px !important;
}

.mine {
  width: 94% !important;
  margin: auto !important;
  margin-top: 10px !important;
  border-radius: 5px !important;
}

</style>
