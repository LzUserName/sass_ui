<template>
  <div class="avue-contail"
       :class="{'avue--collapse':isCollapse}">
    <div class="avue-header" v-if="!$route.meta.hideInMenu">
      <!-- 顶部导航栏 -->
      <top/>
    </div>
    <!-- 隐藏菜单 -->
    <div v-if="$route.meta&&$route.meta.hideInMenu">
      <router-view ></router-view>
    </div>
    <div v-else class="avue-layout" >
      <div class="avue-left" >
        <!-- 左侧导航栏 -->
        <sidebar/>
      </div>
      <div class="avue-main">
        <!-- 顶部标签卡 -->
        <tags />
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <!-- 主体视图层 -->
            <keep-alive>
              <router-view class="avue-view"
                           :key="key"
                           v-if="$route.meta.$keepAlive" />
            </keep-alive>
          <router-view class="avue-view" v-if="!$route.meta.$keepAlive"/>
        </el-scrollbar>

      </div>
    </div>

    <div class="avue-shade"
         @click="showCollapse"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import tags from './tags'
  import top from './top/'
  import sidebar from './sidebar/'
  import admin from '@/util/admin';
  import {validatenull} from '@/util/validate';
  import {getStore} from '@/util/store.js';

  export default {
    components: {
      top,
      tags,
      sidebar
    },
    name: 'index',
    data() {
      return {
        //刷新token锁
        refreshLock: false,
        //刷新token的时间
        refreshTime: '',
        // 计时器
        timer: '',
      }
    },
    created() {
      //实时检测刷新token
      this.refreshToken()
    },
    destroyed() {
      clearInterval(this.refreshTime)
      clearInterval(this.timer)
      this.disconnect()
    },
    mounted() {
      this.init()
    },
    computed: {
      ...mapGetters(['userInfo', 'isLock', 'isCollapse', 'website', 'expires_in']),
      key () {
        return this.$route.path
      },
    },
    props: [],
    methods: {
      showCollapse() {
        this.$store.commit("SET_COLLAPSE")
      },
      // 屏幕检测
      init() {
        this.$store.commit('SET_SCREEN', admin.getScreen())
        window.onresize = () => {
          setTimeout(() => {
            this.$store.commit('SET_SCREEN', admin.getScreen())
          }, 0);
        }
      },
      // 实时检测刷新token
      refreshToken() {
        this.refreshTime = setInterval(() => {
          // 获取token
          const token = getStore({
            name: 'access_token',
            debug: true,
          });
          // 判断是否有token
          if (validatenull(token)) {
            return;
          }
          // 过期时间 <= 1000 秒 并且 刷新token锁值为false
          if (this.expires_in <= 1000 && !this.refreshLock) {
            this.refreshLock = true
            this.$store
              .dispatch('RefreshToken')
              .catch(() => {
                clearInterval(this.refreshTime)
              });
            this.refreshLock = false
          }
          this.$store.commit("SET_EXPIRES_IN", this.expires_in - 10);
        }, 10000);
      },
      disconnect() {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
          console.log("Disconnected");
        }
      }
    }
  }
</script>
