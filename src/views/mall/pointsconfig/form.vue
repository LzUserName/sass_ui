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
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>积分设置</span>
                </div>
                <avue-form ref="form" v-model="form" :option="tableOption" @submit="handleUpdate" :permission="permissionList">
                </avue-form>
            </el-card>
        </basic-container>
    </div>
</template>

<script>
    import {getPage, getObj, addObj, putObj, delObj, getObj2} from '@/api/mall/pointsconfig'
    import {tableOption} from '@/const/crud/mall/pointsconfig'
    import {mapGetters} from 'vuex'

    export default {
        name: 'pointsconfigform',
        data() {
            return {
                form:{},
                tableOption: tableOption
            }
        },
        created() {
            this.handleGet()
        },
        mounted: function () {
        },
        computed: {
            ...mapGetters(['permissions']),
          permissionList() {
            return {
              addBtn: this.permissions['mall:pointsconfig:add'] ? true : false,
              delBtn: this.permissions['mall:pointsconfig:del'] ? true : false,
              editBtn: this.permissions['mall:pointsconfig:edit'] ? true : false,
              viewBtn: this.permissions['mall:pointsconfig:get'] ? true : false
            };
          }
        },
        methods: {
            handleGet: function () {
                getObj2().then(response => {
                    this.form = response.data.data ? response.data.data : {}
                })
            },
            /**
             * @title 数据更新
             * @param row 为当前的数据
             * @param index 为当前更新数据的行数
             * @param done 为表单关闭函数
             *
             **/
            handleUpdate(form, done) {
                putObj(this.form).then(response => {
                    done()
                    this.form = response.data.data
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    })
                }).catch(() => {
                    done()
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
</style>
