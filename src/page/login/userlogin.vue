<template>
  <div >
    <el-form class="login-form "
             status-icon
             :rules="loginRules"
             ref="loginForm"
             :model="loginForm"
             label-width="0">
      <el-form-item prop="username">
        <el-input size="small"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.username"
                  placeholder="请输入账号">
          <i slot="prefix"
             class="el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input size="small"
                  @keyup.enter.native="handleLogin"
                  :type="passwordType"
                  v-model="loginForm.password"
                  placeholder="请输入密码">
          <i class="el-icon-view el-icon-lock"
             slot="suffix"
             @click="showPassword"></i>
          <i slot="prefix"
             class="icon-mima"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row :span="24">
          <el-col :span="16">
            <el-input size="small"
                      @keyup.enter.native="handleLogin"
                      :maxlength="code.len"
                      v-model="loginForm.code"
                      placeholder="请输入验证码">
              <i slot="prefix"
                 class="icon-yanzhengma"></i>
            </el-input>
          </el-col>
          <el-col :span="8">
            <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
              <img :src="code.src"
                   class="login-code-img"
                   @click="refreshCode"
                   v-else/>
              <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
            </div>
          </el-col>
        </el-row>

      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe">记住账号</el-checkbox>
      <div class="login-button–primary" @click="handleLogin">登录</div>

      <el-form-item>
        <!--        <el-button type="primary"-->
        <!--                   size="small"-->
        <!--                   @click.native.prevent="handleLogin"-->
        <!--                   class="login-submit">登录</el-button>-->
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {randomLenNum} from "@/util/util"
import {mapGetters} from "vuex"
import Cookies from "js-cookie";

import { encrypt, decrypt } from '@/util/jsencrypt'

export default {
  name: "userlogin",
  data() {
    return {
      thirdPartyForm: {
        code: '',
        state: ''
      },
      loginForm: {
        username: "",
        password: "",
        code: "",
        redomStr: "",
        rememberMe: false
      },
      code: {
        src: "/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        username: [
          {required: true, message: "请输入账号", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, message: "密码长度最少为6位", trigger: "blur"}
        ],
        code: [
          {required: true, message: "请输入验证码", trigger: "blur"},
          {min: 4, max: 4, message: "验证码长度为4位", trigger: "blur"}
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    this.getCookie();
    this.refreshCode();
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: "",
        redomStr: "",
      };
    },
    refreshCode() {
      this.loginForm.code = ''
      this.loginForm.randomStr = randomLenNum(this.code.len, true)
      this.code.type === 'text'
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${window.location.origin}/code?randomStr=${this.loginForm.randomStr}`)
    },
    showPassword() {
      this.passwordType == ''
        ? (this.passwordType = 'password')
        : (this.passwordType = '')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            this.$store.commit("SET_TOP_MENU_INDEX", 0)
            // this.$router.go(0)
            this.$router.push({path: this.tagWel.value}).catch(() => {})
          }).catch(() => {
            this.refreshCode()
          })
        }
      });
    }
  }
};
</script>

<style>
.login-button–primary{
  margin-top: 20px;
  color: #fff;
  cursor: pointer;
  height: 70px;
  text-align: center;
  font-size: 18px;
  line-height: 60px;
  background: url('/img/bg/joolun_login_determine_n.png') no-repeat;
  background-size: 100% 100%;
}
.login-button–primary:hover{
  background-image: url('/img/bg/joolun_login_determine_h.png');
}
.login-button–primary:focus{
  background-image: url('/img/bg/joolun_login_determine_h.png');
}

</style>
