/**
 * Copyright (C) 2018-2019
 * All rights reserved, Designed By www.joolun.com
 * 注意：
 * 本软件为www.joolun.com开发研制，未经购买不得使用
 * 购买后可获得全部源代码（禁止转卖、分享、上传到码云、github等开源平台）
 * 一经发现盗用、分享等行为，将追究法律责任，后果自负
 */
export const tableOption = {
    dialogDrag: false,
    border: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    menuType: 'text',
    searchShow: false,
    excelBtn: true,
    printBtn: true,
    viewBtn: true,
    searchMenuSpan: 6,
    column: [
            {
            label: 'PK',
            prop: 'id',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入PK',
                        trigger: 'blur'
                    },
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '所属租户',
            prop: 'tenantId',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入所属租户',
                        trigger: 'blur'
                    },
                                    {
                        max: 32,
                        message: '长度在不能超过32个字符'
                    },
                ]
        },
            {
            label: '逻辑删除标记（0：显示；1：隐藏）',
            prop: 'delFlag',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入逻辑删除标记（0：显示；1：隐藏）',
                        trigger: 'blur'
                    },
                                    {
                        max: 2,
                        message: '长度在不能超过2个字符'
                    },
                ]
        },
            {
            label: '创建时间',
            prop: 'createTime',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入创建时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '最后更新时间',
            prop: 'updateTime',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入最后更新时间',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '商城用户ID',
            prop: 'userId',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入商城用户ID',
                        trigger: 'blur'
                    },
                                    {
                        max: 31,
                        message: '长度在不能超过31个字符'
                    },
                ]
        },
            {
            label: '总计订单数',
            prop: 'totalOrder',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入总计订单数',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '总计消费金额',
            prop: 'totalAmount',
            sortable: true,
            rules: [
                    {
                        required: true,
                        message: '请输入总计消费金额',
                        trigger: 'blur'
                    },
                                ]
        },
            {
            label: '备注',
            prop: 'remarks',
            sortable: true,
            rules: [
                                    {
                        max: 500,
                        message: '长度在不能超过500个字符'
                    },
                ]
        },
            ]
}
