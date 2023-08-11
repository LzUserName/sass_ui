/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */

export const tableOption = {
  column: [
    // {
    //   label: '版本',
    //   prop: "privacy_ver",
    //   type: 'select',
    //   rules: [{
    //     required: true,
    //     message: "请选择版本",
    //     trigger: "blur"
    //   }],
    //   dicData: [{
    //     label: '现网版本',
    //     value: 1
    //   },{
    //     label: '开发版',
    //     value: 2
    //   }],
    //   tip: '说明：\n' +
    //     '\n' +
    //     '1、开发版指的是通过setprivacysetting接口已经配置的用户隐私保护指引内容，但是还没发布到现网，还没正式生效的版本。\n' +
    //     '\n' +
    //     '2、现网版本指的是已经在小程序现网版本已经生效的用户隐私保护指引内容。\n' +
    //     '\n' +
    //     '3、如果小程序已有一个现网版，可以通过该接口（privacy_ver=1）直接修改owner_setting里除了ext_file_media_id之外的信息，修改后即可生效。\n' +
    //     '\n' +
    //     '4、如果需要修改其他信息，则只能修改开发版（privacy_ver=2），然后提交代码审核，审核通过之后发布生效。\n' +
    //     '\n' +
    //     '5、当该小程序还没有现网版的隐私保护指引时却传了privacy_ver=1，则会出现 86074 报错'
    // },
    {
      label: '通知方式',
      prop: 'notice_method',
      bind: 'owner_setting.notice_method',
      tip: '指的是当开发者收集信息有变动时，通过该方式通知用户。这里服务商需要按照实际情况填写，例如通过弹窗或者公告或者其他方式。',
      rules: [{
        required: true,
        message: "请输入通知方式",
        trigger: "blur"
      }]
    },
    {
      label: '邮箱地址',
      prop: 'contact_email',
      bind: 'owner_setting.contact_email',
      tip: '信息收集方（开发者）的邮箱地址',
      rules: [{
        required: true,
        message: "请输入邮箱地址",
        trigger: "blur"
      }]
    },
    {
      label: '用户信息配置',
      prop: 'setting_list',
      type: 'dynamic',
      span: 24,
      // display: false,
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [{
          label: '信息',
          prop: "privacy_key",
          rules: [{
            required: true,
            message: "请选择信息",
            trigger: "blur"
          }],
          formslot: true
        },{
          label: '信息的用途',
          prop: "privacy_text",
          rules: [{
            required: true,
            message: "请输入用途",
            trigger: "blur"
          }],
          tip: '请填写收集该信息的用途。例如privacy_key=Location（位置信息），那么privacy_text则填写收集位置信息的用途。无需再带上“为了”或者“用于”这些字眼，小程序端的显示格式是为了xxx，因此开发者只需要直接填写用途即可。'
        }]
      }
    }
  ]
}
