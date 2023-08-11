<template>
  <div class="avue-logo">
    <transition name="fade">
      <span v-if="keyCollapse" key="0">
        <img class="avue-logo-image-1" :src="tenantInfo.logo" style="">
      </span>
    </transition>
    <transition-group name="fade">
      <template v-if="!keyCollapse">
        <div key="1" class="avue-logo-title logo-flex">
          <img class="avue-logo-image-2 " :src="shopInfo ? shopInfo.imgUrl:tenantInfo.logo">
          <div class="logo-flex-sub">
            <span class="logo-title" @click="goHomeUrl">{{ tenantInfo.name }}</span>
            <div class="logo-remark" v-if="tenantInfo.id != '-1' && (shopInfo&&shopInfo.name||tenantInfo.homeUrl)">
              <span>{{ shopInfo ? shopInfo.name : tenantInfo.homeUrl }}</span>
            </div>
          </div>
        </div>
      </template>
    </transition-group>
    <div v-if="userInfo.type == '-1'&&!keyCollapse" class="tenant-select">
      <el-tooltip
                  effect="light"
                  content="切换商城"
                  placement="bottom">
        <div class="tenant-select-name " @click="onSwitchTenant">
          <!--        <i class="el-icon-s-platform tenant-select-icon"></i>-->
          <div class="logo-remark">
            <span>{{ switchTenantName }}</span>
            <i class="el-icon-sort tenant-select-icon-switch"></i>
          </div>
        </div>
      </el-tooltip>
    </div>
    <el-dialog
      title="切换商城(租户)"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      width="360px">
      <div style="display:flex;justify-content: center;">
        <el-row>
          <el-col span="24">
            <el-select v-model="switchTenantIdValue" placeholder="请选择" size="small">
              <el-option class=""
                         v-for="item in tenantListMy"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button size="small" type="success" icon="el-icon-check" @click="onChangeTenant(switchTenantIdValue)">切换
        </el-button>
        <el-button size="small" icon="el-icon-close" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {getObj as getTenant, getListMy as getTenantListMy} from '@/api/upms/tenant'
import {getObj as getShopInfo} from '@/api/mall/shopinfo'
import {getStore, setStore} from '@/util/store'

export default {
  name: "logo",
  data() {
    return {
      tenantInfo: '',
      shopInfo: '',
      tenantListMy: [],
      switchTenantId: getStore({name: 'switchTenantId'}),
      dialogVisible: false,
      switchTenantIdValue: getStore({name: 'switchTenantId'}),
    };
  },
  created() {
    this.getTenant()
    if (this.userInfo.type == '-1') {
      this.getTenantListMy()
    }
  },
  computed: {
    ...mapGetters(["keyCollapse", "tagWel"]),
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    switchTenantName: function () {
      let value = '';
      this.tenantListMy.map((item) => {
        if (item.id == this.switchTenantId) {
          value = item.name
        }
      })
      return value
    }
  },
  methods: {
    onSwitchTenant() {
      this.dialogVisible = true
    },
    goHomeUrl() {
      window.open(this.tenantInfo.homeUrl, '_blank')
    },
    getTenant() {
      getTenant(this.userInfo.tenantId).then(response => {
        this.tenantInfo = response.data.data
        if (this.userInfo.type == '2') {
          getShopInfo(this.userInfo.shopId).then(response => {
            this.shopInfo = response.data.data
          })
        }
      })
    },
    getTenantListMy() {
      getTenantListMy().then(response => {
        let tenantListMy = response.data.data
        this.tenantListMy = tenantListMy
        let storeSwitchTenantId = getStore({name: 'switchTenantId'})
        if (tenantListMy.length > 0
          && (!storeSwitchTenantId || tenantListMy.findIndex(item => item.id === storeSwitchTenantId) == -1)) {
          //没有切换租户或没有绑定该切换租户，则默认切换到第一个租户
          setStore({
            name: 'switchTenantId',
            content: tenantListMy[0].id
          })
          this.switchTenantId = tenantListMy[0].id
          setTimeout(() => {
            this.$router.go(0)
          }, 500);
        }
      })
    },
    onChangeTenant(tenantId) {
      if (tenantId) {
        if (tenantId == this.switchTenantId) {
          this.$message({
            showClose: true,
            message: '已经在该商城下',
            type: 'info'
          })
          return
        }
        this.$loading({
          lock: true,
          text: "切换中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.3)",
        });
        setStore({
          name: 'switchTenantId',
          content: tenantId
        })
        this.$store.commit("DEL_ALL_TAG")
        this.$router.push({
          path: this.$router.$avueRouter.getPath({
            src: this.tagWel.value
          }),
          query: this.tagWel.query
        });
        this.$message({
          showClose: true,
          message: '切换成功，正在读取数据...',
          type: 'success'
        })
        // 保证数据切换成功，刷新一下页面
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    },
  }
};
</script>

<style scoped lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-active {
  transition: opacity 2.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.avue-logo {
  width: 220px;
  line-height: 60px;
  background-color: #20222a;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.8);
  z-index: 1024;
  line-height: unset;
  margin-bottom: 10px;
}

.avue-logo-image-1 {
  width: 35px;
  height: 35px;
  display: flex;
  margin: 0 auto;
  border-radius: 2px;
}

.logo-flex {
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-flex-sub {
  flex: 1;
  cursor: pointer;
}

.avue-logo-image-2 {
  width: 35px;
  height: 35px;
  border-radius: 2px;
}

.logo-title {
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  margin-left: 5px;
  //letter-spacing: .9px;
  //text-shadow: 0 1px 3px #1f66e0; /*设置文字阴影*/
  //font-weight: bolder; /*设置文字宽度*/
}

.logo-title-1 {
  font-size: 14px;
  margin-left: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.logo-remark {
  font-size: 12px;
  color: #272c30;
  font-weight: bolder;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin: 0 5px;
  margin-top: 6px;
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  span {
    border-radius: 2px;
    padding: 2px 10px;
    background-image: -webkit-linear-gradient(left, #a1896d, #f3dfc5 25%, #a1896d 50%, #f3dfc5 75%, #a1896d);
    -webkit-background-size: 200% 100%;
    font-weight: 400;
  }
}

.tenant-select {
  justify-content: center;
}

.tenant-select-name {
  justify-content: center;
  display: flex;
  height: 30px;
  padding: 0 10px;
  line-height: 30px;
  font-size: 14px;
  color: rgba(224, 238, 255, 1);
  cursor: pointer;
  font-weight: bold;
}

.tenant-select-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  font-size: 16px !important;
}

.tenant-select-icon-switch {
  color: #FFFFFF;
  margin-left: 5px;
  font-weight: bold;
  font-size: 14px;
}

.el-select .el-input--suffix .el-input__inner {
  border-radius: 2px !important;;
  width: 300px;
}
</style>
