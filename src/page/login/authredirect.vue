<template>
  <div></div>
</template>

<script>
  import request from '@/router/axios'
  import {mapGetters} from 'vuex'

  export default {
    name: 'authredirect',
    computed: {
      ...mapGetters(['tagWel'])
    },
    created() {
      const params = this.$route.query
      let url = window.location.href
      let redirectUri = encodeURIComponent(window.location.origin + '/#/authredirect')
      // 登录请求
      if (url.indexOf('LOGIN') > 0) {
        if (url.indexOf('WX') > 0 || url.indexOf('QQ') > 0) {
          let type = params.state.split("_")[0]
          let code = params.code
          window.opener.location.href = `${window.location.origin}/#/login?type=${type}&code=${code}&redirectUri=${redirectUri}&time=` + new Date().getTime()
        }
        window.close()
      } else if (url.indexOf('BIND') > 0) {
        if (url.indexOf('WX') > 0 || url.indexOf('QQ') > 0) {
          let type = params.state.split("_")[0]
          let code = params.code
          request({
            url: '/upms/user/thridparty/bind',
            method: 'put',
            params: {type, code, redirectUri}
          }).then(() => {
            window.close()
          })
        }
      }
    },
    methods: {

    }
  }
</script>


<style>
</style>
