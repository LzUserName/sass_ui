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
          <avue-crud ref="crud"
                     :page.sync="page"
                     :data="tableData"
                     :permission="permissionList"
                     :table-loading="tableLoading"
                     :option="tableOption"
                     :before-open="beforeOpen"
                     v-model="form"
                     @on-load="getPage"
                     @refresh-change="refreshChange"
                     @row-update="handleUpdate"
                     @row-save="handleSave"
                     @row-del="handleDel"
                     @sort-change="sortChange"
                     @search-change="searchChange">
            <template slot-scope="scope" slot="menu">
              <el-button icon="el-icon-bank-card"
                         size="small"
                         type="text"
                         v-if="permissions['payapi:payapplyform:submit']"
                         @click="payApplyFormSub(scope.row,scope.index)">提交申请
              </el-button>
              <el-button icon="el-icon-bank-card"
                         size="small"
                         type="text"
                         v-if="permissions['payapi:payapplyform:submit']&&scope.row.applymentState"
                         @click="payApplyStatus(scope.row,scope.index)">更新申请状态
              </el-button>
            </template>
            <template slot-scope="scope" slot="contactInfo">
              {{scope.row.contactInfo.contact_name}}
            </template>
            <template slot-scope="scope" slot="auditDetail">
              {{scope.row.auditDetail.rejectReason}}
            </template>
            <template slot-scope="scope" slot="signUrl">
              <img v-if="scope.row.signUrl" :src="scope.row.signUrl" style="width: 160px">
            </template>
            <template slot-scope="scope" slot="contactInfoForm">
              <el-form ref="contactInfoForm" :model="contactInfo" label-width="180px">
                <el-form-item label="类型">
                  <el-select size="mini" v-model="contactInfo.contact_type" placeholder="请选择">
                    <el-option
                      key="LEGAL"
                      label="法人"
                      value="LEGAL">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input size="mini" v-model="contactInfo.contact_name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input size="mini" v-model="contactInfo.contact_id_number"></el-input>
                </el-form-item>
                <el-form-item label="联系手机">
                  <el-input size="mini" v-model="contactInfo.mobile_phone"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱">
                  <el-input size="mini" v-model="contactInfo.contact_email"></el-input>
                </el-form-item>
              </el-form>
            </template>
            <template slot-scope="scope" slot="subjectInfoForm">
              <el-form ref="subjectInfoForm" :model="subjectInfo" label-width="180px">
                <el-form-item label="主体类型">
                  <el-select size="mini" v-model="subjectInfo.subject_type" placeholder="请选择">
                    <el-option
                      key="SUBJECT_TYPE_INDIVIDUAL"
                      label="个体户"
                      value="SUBJECT_TYPE_INDIVIDUAL">
                    </el-option>
                    <el-option
                      key="SUBJECT_TYPE_ENTERPRISE"
                      label="企业"
                      value="SUBJECT_TYPE_ENTERPRISE">
                    </el-option>
                  </el-select>
                </el-form-item>
                <div>
                  <div class="pay_bar">营业执照</div>
                  <el-form-item label="营业执照">
                    <div class="el-upload__tip">{{subjectInfo.business_license_info.license_copy ? subjectInfo.business_license_info.license_copy : license_copy}}</div>
                    <el-upload
                      :action="actionUrl"
                      :headers="headers"
                      multiple
                      :limit="1"
                      :show-file-list="false"
                      :on-success="uploadSuccessLicenseCopy"
                      :on-error="uploadError">
                      <el-button type="primary">上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">
                        请上传JPG、BMP、PNG文件
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="社会信用代码">
                    <el-input size="mini" v-model="subjectInfo.business_license_info.license_number"></el-input>
                  </el-form-item>
                  <el-form-item label="商户名称">
                    <el-input size="mini" v-model="subjectInfo.business_license_info.merchant_name"></el-input>
                  </el-form-item>
                  <el-form-item label="法人姓名">
                    <el-input size="mini" v-model="subjectInfo.business_license_info.legal_person"></el-input>
                  </el-form-item>
                </div>
                <div>
                  <div class="pay_bar">身份证</div>
                  <el-form-item label="证件持有人类型">
                    <el-select size="mini" v-model="subjectInfo.identity_info.id_holder_type" placeholder="请选择">
                      <el-option
                        key="LEGAL"
                        label="法人"
                        value="LEGAL">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件类型">
                    <el-select size="mini" v-model="subjectInfo.identity_info.id_doc_type" placeholder="请选择">
                      <el-option
                        key="IDENTIFICATION_TYPE_IDCARD"
                        label="中国大陆居民-身份证"
                        value="IDENTIFICATION_TYPE_IDCARD">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="身份证人像面">
                    <div class="el-upload__tip">{{subjectInfo.identity_info.id_card_info.id_card_copy ? subjectInfo.identity_info.id_card_info.id_card_copy : id_card_copy}}</div>
                    <el-upload
                      :action="actionUrl"
                      :headers="headers"
                      multiple
                      :limit="1"
                      :show-file-list="false"
                      :on-success="uploadSuccessIdCardCopy"
                      :on-error="uploadError">
                      <el-button type="primary">上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">
                        请上传JPG、BMP、PNG文件
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="身份证国徽面">
                    <div class="el-upload__tip">{{subjectInfo.identity_info.id_card_info.id_card_national ? subjectInfo.identity_info.id_card_info.id_card_national : id_card_national}}</div>
                    <el-upload
                      :action="actionUrl"
                      :headers="headers"
                      multiple
                      :limit="1"
                      :show-file-list="false"
                      :on-success="uploadSuccessIdCardNational"
                      :on-error="uploadError">
                      <el-button type="primary">上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">
                        请上传JPG、BMP、PNG文件
                      </div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="身份证姓名">
                    <el-input size="mini" v-model="subjectInfo.identity_info.id_card_info.id_card_name"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证号码">
                    <el-input size="mini" v-model="subjectInfo.identity_info.id_card_info.id_card_number"></el-input>
                  </el-form-item>
                  <el-form-item label="身份证居住地址">
                    <el-input size="mini" v-model="subjectInfo.identity_info.id_card_info.id_card_address"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期开始时间">
                    <el-date-picker
                      v-model="subjectInfo.identity_info.id_card_info.card_period_begin"
                      type="date"
                      format="yyyy-MM-dd"
                      valueFormat="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="有效期结束时间">
                    <el-date-picker
                      v-model="subjectInfo.identity_info.id_card_info.card_period_end"
                      type="date"
                      format="yyyy-MM-dd"
                      valueFormat="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </el-form>
            </template>
            <template slot-scope="scope" slot="businessInfoForm">
              <el-form ref="businessInfoForm" :model="businessInfo" label-width="180px">
                <el-form-item label="商户简称">
                  <el-input size="mini" v-model="businessInfo.merchant_shortname"></el-input>
                </el-form-item>
                <el-form-item label="客服电话">
                  <el-input size="mini" v-model="businessInfo.service_phone"></el-input>
                </el-form-item>
                <el-form-item label="经营场景类型">
                  <el-checkbox-group v-model="businessInfo.sales_info.sales_scenes_type">
                    <el-checkbox label="SALES_SCENES_MP" value="SALES_SCENES_MP">公众号</el-checkbox>
                    <el-checkbox label="SALES_SCENES_MINI_PROGRAM" value="SALES_SCENES_MINI_PROGRAM">小程序</el-checkbox>
                    <el-checkbox label="SALES_SCENES_WEB" value="SALES_SCENES_WEB">互联网</el-checkbox>
                    <el-checkbox label="SALES_SCENES_APP" value="SALES_SCENES_APP">APP</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <div v-if="businessInfo.sales_info.sales_scenes_type.indexOf('SALES_SCENES_MP') > -1">
                  <div class="pay_bar">公众号场景</div>
                  <el-form-item label="公众号类型">
                    <el-radio-group v-model="businessInfo.sales_info.mp_info.mp_type" @change="mpTypeChange">
                      <el-radio label="1">服务商公众号</el-radio>
                      <el-radio label="2">商家公众号</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="服务商公众号" v-if="businessInfo.sales_info.mp_info.mp_type == '1'">
                    <el-tooltip class="item" effect="dark" content="可填写当前服务商商户号已绑定的公众号APPID" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-select v-model="businessInfo.sales_info.mp_info.mp_appid" placeholder="请选择">
                      <el-option
                        v-for="item in appDataMp"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="商家公众号" v-if="businessInfo.sales_info.mp_info.mp_type == '2'">
                    <el-tooltip class="item" effect="dark" content="1、可填写与商家主体一致且已认证的公众号APPID，需是已认证的服务号、政府或媒体类型的订阅号。
2、审核通过后，系统将发起特约商家商户号与该AppID的绑定（即配置为sub_appid），服务商随后可在发起支付时选择传入该appid，以完成支付，并获取sub_openid用于数据统计，营销等业务场景 。" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-select v-model="businessInfo.sales_info.mp_info.mp_sub_appid" placeholder="请选择">
                      <el-option
                        v-for="item in appDataMp"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="businessInfo.sales_info.sales_scenes_type.indexOf('SALES_SCENES_MINI_PROGRAM') > -1">
                  <div class="pay_bar">小程序场景</div>
                  <el-form-item label="小程序类型">
                    <el-radio-group v-model="businessInfo.sales_info.mini_program_info.mini_program_type" @change="miniProgramTypeChange">
                      <el-radio label="1">服务商小程序</el-radio>
                      <el-radio label="2">商家小程序</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="服务商小程序" v-if="businessInfo.sales_info.mini_program_info.mini_program_type == '1'">
                    <el-tooltip class="item" effect="dark" content="可填写当前服务商商户号已绑定的小程序APPID" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-select v-model="businessInfo.sales_info.mini_program_info.mini_program_appid" placeholder="请选择">
                      <el-option
                        v-for="item in appDataMa"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="商家小程序" v-if="businessInfo.sales_info.mini_program_info.mini_program_type == '2'">
                    <el-tooltip class="item" effect="dark" content="1、请填写已认证的小程序APPID；2、完成进件后，系统发起特约商户号与该AppID的绑定（即配置为sub_appid可在发起支付时传入）
                                    （1）若APPID主体与商家主体/服务商主体一致，则直接完成绑定；
                                    （2）若APPID主体与商家主体/服务商主体不一致，则商户签约时显示《联合营运承诺 函》，并且AppID的管理员需登录公众平台确认绑定意愿" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-select v-model="businessInfo.sales_info.mini_program_info.mini_program_sub_appid" placeholder="请选择">
                      <el-option
                        v-for="item in appDataMa"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="businessInfo.sales_info.sales_scenes_type.indexOf('SALES_SCENES_WEB') > -1">
                  <div class="pay_bar">互联网网站场景</div>
                  <el-form-item label="互联网网站域名">
                    <el-tooltip class="item" effect="dark" content="1、如为PC端商城、智能终端等场景，可上传官网链接。
2、网站域名需ICP备案，若备案主体与申请主体要相同。
3、示例值：http://www.qq.com" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-input size="mini" v-model="businessInfo.sales_info.web_info.domain"></el-input>
                  </el-form-item>
                </div>
                <div v-if="businessInfo.sales_info.sales_scenes_type.indexOf('SALES_SCENES_APP') > -1">
                  <div class="pay_bar">APP场景</div>
                  <el-form-item label="应用类型">
                    <el-radio-group v-model="businessInfo.sales_info.app_info.app_type" @change="appTypeChange">
                      <el-radio label="1">服务商应用</el-radio>
                      <el-radio label="2">商家应用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="服务商应用" v-if="businessInfo.sales_info.app_info.app_type == '1'">
                    <el-tooltip class="item" effect="dark" :content="appAppId ? '可填写当前服务商商户号已绑定的应用APPID，服务商已配置，请直接填：' + appAppId : '可填写当前服务商商户号已绑定的应用APPID'" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-input size="mini" v-model="businessInfo.sales_info.app_info.app_appid"></el-input>
                  </el-form-item>
                  <el-form-item label="商家应用" v-if="businessInfo.sales_info.app_info.app_type == '2'">
                    <el-tooltip class="item" effect="dark" content="1、可填写与商家主体一致且已认证的应用APPID，需是已认证的APP。
2、审核通过后，系统将发起特约商家商户号与该AppID的绑定（即配置为sub_appid），服务商随后可在发起支付时选择传入该appid，以完成支付，并获取sub_openid用于数据统计，营销等业务场景" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-input size="mini" v-model="businessInfo.sales_info.app_info.app_sub_appid"></el-input>
                  </el-form-item>
                  <el-form-item label="APP截图" v-if="businessInfo.sales_info.app_info.app_type">
                    <el-tooltip class="item" effect="dark" content="请提供APP首页截图、尾页截图、应用内截图、支付页截图各1张" placement="top-start">
                      <i class="el-icon-info"></i>
                    </el-tooltip>
                    <div class="el-upload__tip" v-for="(item,index) in businessInfo.sales_info.app_info.app_pics" :key="index">
                      {{item}}<el-link type="danger" @click="appPicsDel(index)" style="margin-left: 5px">删除</el-link>
                    </div>
                    <el-upload
                      :action="actionUrl"
                      :headers="headers"
                      multiple
                      :limit="5"
                      :show-file-list="false"
                      :on-success="uploadSuccessAppPics"
                      :on-error="uploadError">
                      <el-button type="primary">上传图片</el-button>
                      <div slot="tip" class="el-upload__tip">
                        请上传JPG、BMP、PNG文件
                      </div>
                    </el-upload>
                  </el-form-item>
                </div>
              </el-form>
            </template>
            <template slot-scope="scope" slot="settlementInfoForm">
              <el-form ref="settlementInfoForm" :model="settlementInfo" label-width="180px">
                <el-form-item label="入驻结算规则">
                  <el-tooltip class="item" effect="dark" content="请参考https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/ecommerce/applyments/chapter4_1.shtml" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-select v-model="settlementInfo.settlement_id" placeholder="请选择" filterable>
                    <el-option
                      v-for="item in settlementData"
                      v-if="subjectInfo.subject_type == item.subjectType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属行业">
                  <el-tooltip class="item" effect="dark" content="请参考https://pay.weixin.qq.com/wiki/doc/apiv3/wxpay/ecommerce/applyments/chapter4_1.shtml" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-select v-model="settlementInfo.qualification_type" placeholder="请选择" filterable>
                    <el-option
                      v-for="item in qualificationTypes"
                      v-if="subjectInfo.subject_type == item.subjectType && settlementInfo.settlement_id == item.settlementId"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </template>
            <template slot-scope="scope" slot="bankAccountInfoForm">
              <el-form ref="bankAccountInfoForm" :model="bankAccountInfo" label-width="180px">
                <el-form-item label="账户类型">
                  <el-tooltip class="item" effect="dark" content="1、若主体为企业/党政、机关及事业单位/其他组织，可填写：对公银行账户。
2、若主体为个体户，可选择填写：对公银行账户或经营者个人银行卡。" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-radio v-model="bankAccountInfo.bank_account_type" label="BANK_ACCOUNT_TYPE_CORPORATE">对公银行账户</el-radio>
                  <el-radio v-model="bankAccountInfo.bank_account_type" label="BANK_ACCOUNT_TYPE_PERSONAL">经营者个人银行卡</el-radio>
                </el-form-item>
                <el-form-item label="开户名称">
                  <el-tooltip class="item" effect="dark" content="1、选择“经营者个人银行卡”时，开户名称必须与“经营者证件姓名”一致。
2、选择“对公银行账户”时，开户名称必须与营业执照/登记证书的“商户名称”一致" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-input size="mini" v-model="bankAccountInfo.account_name"></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-tooltip class="item" effect="dark" content="开户银行，详细参见开户银行对照表。
示例值：工商银行（https://pay.weixin.qq.com/wiki/doc/apiv3_partner/terms_definition/chapter1_1_3.shtml#part-6）" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-select v-model="bankAccountInfo.account_bank" placeholder="请选择" filterable>
                    <el-option
                      v-for="item in accountBankData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户银行省市编码">
                  <el-tooltip class="item" effect="dark" content="至少精确到市，详细参见省市区编号对照表。
示例值：110000（https://pay.weixin.qq.com/wiki/doc/apiv3_partner/terms_definition/chapter1_1_3.shtml#part-5）" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-select v-model="bankAccountInfo.bank_address_code" placeholder="请选择" filterable>
                    <el-option
                      v-for="item in bankAddressData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开户银行全称（含支行）">
                  <el-tooltip class="item" effect="dark" content="1、17家直连银行无需填写，如为其他银行，则开户银行全称（含支行）和 开户银行联行号二选一。
2、需填写银行全称，如“深圳农村商业银行XXX支行”，详细参见开户银行全称（含支行）对照表。（https://pay.weixin.qq.com/wiki/doc/apiv3_partner/terms_definition/chapter1_1_3.shtml#part-6）" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-input size="mini" v-model="bankAccountInfo.bank_name"></el-input>
                </el-form-item>
                <el-form-item label="银行账号">
                  <el-tooltip class="item" effect="dark" content="1、数字，长度遵循系统支持的卡号长度要求表。
                （https://pay.weixin.qq.com/wiki/doc/apiv3_partner/terms_definition/chapter1_1_3.shtml#part-4）" placement="top-start">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <el-input size="mini" v-model="bankAccountInfo.account_number"></el-input>
                </el-form-item>
              </el-form>
            </template>
          </avue-crud>
        </basic-container>
    </div>
</template>

<script>
    import {tableOptionWx as tableOption , settlementData , qualificationTypes, accountBankData, bankAddressData} from '@/const/crud/payapi/payapplyform'
    import {getPage, getObj, addObj, putObj, delObj, subObj, statusObj} from '@/api/payapi/payapplyform'
    import { getList as getWxAppList } from '@/api/wxmp/wxapp'
    import {getByType as getPayConfig} from '@/api/payapi/payconfig'
    import {mapGetters} from 'vuex'
    import store from "@/store"
    import { getStore } from '@/util/store'

    export default {
        name: 'payapplyformwx',
        props: {
          shopIdSelect : null
        },
        data() {
            return {
              form: {},
              tableData: [],
              page: {
                total: 0, // 总页数
                currentPage: 1, // 当前页数
                pageSize: 20, // 每页显示多少条
                ascs: [],//升序字段
                descs: []//降序字段
              },
              paramsSearch: {},
              tableLoading: false,
              tableOption: tableOption,
              contactInfo: {},
              subjectInfo: {
                business_license_info: {},
                identity_info: {
                  id_card_info: {}
                }
              },
              businessInfo: {
                sales_info: {
                  sales_scenes_type: [],
                  mp_info: {},
                  mini_program_info: {

                  },
                  app_info: {
                    app_pics: []
                  },
                  web_info: {}
                }
              },
              settlementInfo: {},
              bankAccountInfo: {},
              actionUrl: '/payapi/payapplyform/imageUploadV3',
              headers: {
                Authorization: 'Bearer ' + store.getters.access_token
              },
              settlementData: settlementData,
              qualificationTypes: qualificationTypes,
              accountBankData: accountBankData,
              bankAddressData: bankAddressData,
              license_copy: '',
              organization_copy: '',
              id_card_copy: '',
              id_card_national: '',
              appDataMp: [],
              appDataMa: [],
              appAppId: null
            }
        },
        created() {
          if(this.userInfo.type == '-1'){
            let switchTenantId = getStore({ name: 'switchTenantId' })
            if(switchTenantId){
              this.headers['switch-tenant-id'] = switchTenantId
            }
          }
        },
        mounted: function () {
          this.getAppDataMp()
          this.getAppDataMa()
          this.getPayConfig()
        },
        computed: {
            ...mapGetters(['permissions', 'userInfo']),
            permissionList() {
              return {
                addBtn: this.permissions['payapi:payapplyform:add'] ? true : false,
                delBtn: this.permissions['payapi:payapplyform:del'] ? true : false,
                editBtn: this.permissions['payapi:payapplyform:edit'] ? true : false,
                viewBtn: this.permissions['payapi:payapplyform:get'] ? true : false
              };
            }
        },
        methods: {
          appTypeChange(value){
            if(value == '1'){
              this.$delete(this.businessInfo.sales_info.app_info,'app_sub_appid')
            }
            if(value == '2'){
              this.$delete(this.businessInfo.sales_info.app_info,'app_appid')
            }
          },
          mpTypeChange(value){
            if(value == '1'){
              this.$delete(this.businessInfo.sales_info.mp_info,'mp_sub_appid')
            }
            if(value == '2'){
              this.$delete(this.businessInfo.sales_info.mp_info,'mp_appid')
            }
          },
          miniProgramTypeChange(value){
            if(value == '1'){
              this.$delete(this.businessInfo.sales_info.mini_program_info,'mini_program_sub_appid')
            }
            if(value == '2'){
              this.$delete(this.businessInfo.sales_info.mini_program_info,'mini_program_appid')
            }
          },
          getPayConfig(){
            getPayConfig("1").then(response => {
              this.tableLoading = false
              let payConfig = response.data.data
              if(payConfig != null){
                this.appAppId = payConfig.subAppId
              }
            })
          },
          //公众号列表
          getAppDataMp(){
            getWxAppList({
              appType: '2'
            }).then(response => {
              let data = response.data
              this.appDataMp = data
            }).catch(() => {

            })
          },
          //公众号列表
          getAppDataMa(){
            getWxAppList({
              appType: '1'
            }).then(response => {
              let data = response.data
              this.appDataMa = data
            }).catch(() => {

            })
          },
          appPicsDel(index){
            this.businessInfo.sales_info.app_info.app_pics.splice(index, 1)
          },
          uploadError(err, file, fileList){
            this.$message.error('上传出错：' + err)
          },
          uploadSuccessLicenseCopy(response){
            console.log('营业执照')
            this.subjectInfo.business_license_info.license_copy = response.data.mediaId
            this.license_copy = response.data.mediaId
          },
          uploadSuccessIdCardCopy(response){
            console.log('身份证人像面')
            this.subjectInfo.identity_info.id_card_info.id_card_copy = response.data.mediaId
            this.id_card_copy = response.data.mediaId
          },
          uploadSuccessIdCardNational(response){
            console.log('身份证国徽面')
            this.subjectInfo.identity_info.id_card_info.id_card_national = response.data.mediaId
            this.id_card_national = response.data.mediaId
          },
          uploadSuccessAppPics(response){
            console.log('APP截图')
            this.businessInfo.sales_info.app_info.app_pics.push(response.data.mediaId)
          },
          beforeOpen(done,type){
            if(type == 'edit' || type == 'view'){
              this.contactInfo =  this.form.contactInfo
              this.subjectInfo = this.form.subjectInfo
              this.businessInfo = this.form.businessInfo
              this.settlementInfo = this.form.settlementInfo
              this.bankAccountInfo = this.form.bankAccountInfo
            }else if(type == 'add'){
              this.contactInfo =  {}
              this.subjectInfo = {
                business_license_info: {},
                identity_info: {
                  id_card_info: {}
                }
              }
              this.businessInfo = {
                sales_info: {
                  sales_scenes_type: [],
                  mp_info: {},
                  mini_program_info: {

                  },
                  app_info: {
                    app_pics: []
                  },
                  web_info: {}
                }
              }
              this.settlementInfo = {}
              this.bankAccountInfo = {}
            }
            done()
          },
          searchChange(params, done) {
            params = this.filterForm(params)
            this.paramsSearch = params
            this.page.currentPage = 1
            this.getPage(this.page, params)
            done()
          },
          sortChange(val) {
            let prop = val.prop ? val.prop.replace(/([A-Z])/g, "_$1").toLowerCase() : ''
            if (val.order == 'ascending') {
              this.page.descs = []
              this.page.ascs = prop
            } else if (val.order == 'descending') {
              this.page.ascs = []
              this.page.descs = prop
            } else {
              this.page.ascs = []
              this.page.descs = []
            }
            this.getPage(this.page)
          },
          getPage(page, params) {
            if(this.shopIdSelect){
              this.tableLoading = true
              getPage(Object.assign({
                current: page.currentPage,
                size: page.pageSize,
                descs: this.page.descs,
                ascs: this.page.ascs,
                shopId: this.shopIdSelect,
                payType: '1'
              }, params, this.paramsSearch)).then(response => {
                this.tableData = response.data.data.records
                this.page.total = response.data.data.total
                this.page.currentPage = page.currentPage
                this.page.pageSize = page.pageSize
                this.tableLoading = false
              }).catch(() => {
                this.tableLoading = false
              })
            }
          },
          /**
           * @title 数据删除
           * @param row 为当前的数据
           * @param index 为当前删除数据的行数
           *
           **/
          handleDel: function (row, index) {
            let _this = this
            this.$confirm('是否确认删除此数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(function () {
              return delObj(row.id)
            }).then(data => {
              _this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.getPage(this.page)
            }).catch(function (err) {
            })
          },
          /**
           * @title 数据更新
           * @param row 为当前的数据
           * @param index 为当前更新数据的行数
           * @param done 为表单关闭函数
           *
           **/
          handleUpdate: function (row, index, done, loading) {
            row.shopId = this.shopIdSelect
            row.contactInfo = this.contactInfo
            row.subjectInfo = this.subjectInfo
            row.businessInfo = this.businessInfo
            row.settlementInfo = this.settlementInfo
            row.bankAccountInfo = this.bankAccountInfo
            putObj(row).then(response => {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              done()
              this.getPage(this.page)
            }).catch(() => {
              loading()
            })
          },
          /**
           * @title 数据添加
           * @param row 为当前的数据
           * @param done 为表单关闭函数
           *
           **/
          handleSave: function (row, done, loading) {
            row.shopId = this.shopIdSelect
            row.contactInfo = this.contactInfo
            row.subjectInfo = this.subjectInfo
            row.businessInfo = this.businessInfo
            row.settlementInfo = this.settlementInfo
            row.bankAccountInfo = this.bankAccountInfo
            row.auditDetail = {}
            row.payType =  '1'
            addObj(row).then(response => {
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              done()
              this.getPage(this.page)
            }).catch(() => {
              loading()
            })
          },
          /**
           * 刷新回调
           */
          refreshChange(page) {
            this.getPage(this.page)
          },
          payApplyFormSub(row, index, done){
            this.tableLoading = true
            subObj(row).then(response => {
              this.tableLoading = false
              this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
              })
              this.getPage(this.page)
            }).catch(() => {
              this.tableLoading = false
            })
          },
          payApplyStatus(row, index, done){
            this.tableLoading = true
            statusObj(row).then(response => {
              this.tableLoading = false
              this.$message({
                showClose: true,
                message: '更新成功',
                type: 'success'
              })
              this.getPage(this.page)
            }).catch(() => {
            })
          },
        }
    }
</script>

<style lang="scss" scoped>
  .pay_bar{
    text-align: center;
    font-size: large;
    font-weight: bold;
  }
</style>
