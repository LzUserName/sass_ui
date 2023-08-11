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
          <span>基础信息设置</span>
          <div class="jl-tips-class">平台登陆后左上角的Logo等信息设置</div>
        </div>
        <avue-form ref="form" v-model="form" :option="tableOption" @submit="handleUpdate" :permission="permissionList">
          <template slot="logo" slot-scope="scope">
            <div>
              <MaterialList v-model="form.logo" type="image" shopId="-1" :num=1 :width="150" :height=150></MaterialList>
              <div class="jl-tips-class">推荐尺寸：150*150</div>
            </div>
          </template>
        </avue-form>
      </el-card>
    </basic-container>
  </div>
</template>

<script>
  import {getSysTenant as getObj, putObj} from '@/api/upms/organ'
  import {tableOption2} from '@/const/crud/upms/organ'
  import {mapGetters} from 'vuex'
  import MaterialList from '@/components/material/list.vue'

  export default {
    components: {
      MaterialList
    },
    name: 'pointsconfigform',
    data() {
      return {
        form:{
          logo: []
        },
        tableOption: tableOption2
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
          editBtn: this.permissions['sys:organ:edit'] ? true : false
        };
      }
    },
    methods: {
      handleGet: function () {
        getObj().then(response => {
          let data = response.data.data
          if(data.logo){
            data.logo = [data.logo]
          }else{
            data.logo = []
          }
          this.form = data
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
        form.logo = form.logo.length > 0 ? form.logo[0] : ''
        putObj(form).then(response => {
          done()
          this.handleGet()
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
