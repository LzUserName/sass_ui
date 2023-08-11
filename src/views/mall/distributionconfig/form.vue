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
          <span>分销设置</span>
        </div>
        <avue-form ref="form" v-model="form" :option="tableOption" @submit="handleUpdate" :permission="permissionList">
          <template slot="picUrls" slot-scope="scope">
            <div>
              <MaterialList v-model="form.picUrls" type="image" shopId="-1" :num=3></MaterialList>
            </div>
          </template>
        </avue-form>
      </el-card>
    </basic-container>
  </div>
</template>

<script>
  import {getPage, getObj, addObj, putObj, delObj, getObj2} from '@/api/mall/distributionconfig'
  import {tableOption} from '@/const/crud/mall/distributionconfig'
  import {mapGetters} from 'vuex'
  import MaterialList from '@/components/material/list.vue'

  export default {
    name: 'distributionconfigform',
    components: {
      MaterialList
    },
    data() {
      return {
        form: {},
        tableOption: tableOption
      }
    },
    watch: {
      'form.enable'(val, oldVal) {
        let column1 = this.tableOption.column[1]
        let column2 = this.tableOption.column[2]
        let column3 = this.tableOption.column[3]
        let column4 = this.tableOption.column[4]
        let column5 = this.tableOption.column[5]
        let column6 = this.tableOption.column[6]
        let column7 = this.tableOption.column[7]
        let column8 = this.tableOption.column[8]
        let column9 = this.tableOption.column[9]
        if(this.form.enable == '0'){
          column1.display = false
          column2.display = false
          column3.display = false
          column4.display = false
          column5.display = false
          column6.display = false
          column7.display = false
          column8.display = false
          column9.display = false
        }
        if(this.form.enable == '1'){
          column1.display = true
          column2.display = true
          column3.display = true
          column4.display = true
          column5.display = true
          column6.display = true
          column7.display = true
          column8.display = true
          column9.display = true
        }
      },
      'form.distributionModel'(val, oldVal) {
        let column3 = this.tableOption.column[3]
        if(this.form.distributionModel == '3'){
          column3.display = true
        }else{
          column3.display = false
        }
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
          addBtn: this.permissions['mall:distributionconfig:add'] ? true : false,
          delBtn: this.permissions['mall:distributionconfig:del'] ? true : false,
          editBtn: this.permissions['mall:distributionconfig:edit'] ? true : false,
          viewBtn: this.permissions['mall:distributionconfig:get'] ? true : false
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
