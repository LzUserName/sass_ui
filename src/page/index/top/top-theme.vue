<template>
  <div>
    <el-dialog title="选择"
               :visible.sync="box"
               width="50%">
      <el-radio-group v-model="text"
                      class="list">
        <el-row :span="24">

          <el-col v-for="(item,index) in list"
                  :key="index"
                  :md="4"
                  :xs="12"
                  :sm="4">
            <el-radio :label="item.value">{{item.name}}</el-radio>
          </el-col>
        </el-row>
      </el-radio-group>
    </el-dialog>

    <span>
      <i class="el-icon-soccer"  style="font-size: 18px;!important;"
         @click="open"></i>
    </span>
  </div>
</template>

<script>
  import { setTheme } from "@/util/util";
  import { mapGetters } from "vuex";

  export default {
    data() {
      return {
        box: false,
        text: "",
        list: [
          {
            name: '默认主题',
            value: '',
          }, {
            name: '炫彩主题',
            value: 'theme-star'
          }, {
            name: '黑色主题',
            value: 'theme-black'
          }, {
            name: '渐变主题',
            value: 'theme-gradual'
          }
        ]
      }
    },
    watch: {
      text: function (val) {
        this.$store.commit("SET_THEME_NAME", val);
        setTheme(val);
      }
    },
    computed: {
      ...mapGetters(["themeName"])
    },
    mounted() {
      this.text = this.themeName;
      if (!this.text) {
        this.text = "";
      }
    },
    methods: {
      open() {
        this.box = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    width: 100%;
  }
</style>

