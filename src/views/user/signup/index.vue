<template>
  <section class="login-section"
           v-loading="logining"
           :element-loading-text="$t('signup.loadingText')">
    <header class="login-header">
      <!--<h1 class="brand">-->
      <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
      <!--</h1>-->
      <el-alert v-if="error" :title="error.title" type="error" :description="error.message" show-icon/>
    </header>
    <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="signupForm" label-width="80px">
      <h2 class="heading">{{$t('signup.head')}}</h2>
      <el-form-item prop="loginName" :label="$t('signup.loginName')" required>
        <el-input type="text" v-model="model.loginName" :placeholder="$t('signup.loginNamePlaceholder')">
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname" :label="$t('signup.nickname')" required>
        <el-input type="text" v-model="model.nickname" :placeholder="$t('signup.nicknamePlaceholder')">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :label="$t('signup.password')" required>
        <el-input type="password" v-model="model.password" :placeholder="$t('signup.passwordPlaceholder')"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword" :label="$t('signup.checkPassword')" required>
        <el-input type="password" v-model="model.checkPassword" :placeholder="$t('signup.checkPasswordPlaceholder')"></el-input>
      </el-form-item>
      <el-form-item prop="verifyCode" :label="$t('signup.verifyCode')" v-show="false">
        <el-input v-model="model.verifyCode" :placeholder="$t('signup.verifyCodePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item>
        <router-link to="/login" class="user-op">{{$t('signup.loginText')}}<i class="el-icon-d-arrow-right"></i></router-link>
      </el-form-item>
      <el-form-item class="login-btns">
        <el-button type="primary"
                   style="width: 100%;"
                   :loading="loading"
                   @click="submit('signupForm')">{{ loading ? $t('signup.signupingText') : $t('signup.signupedText') }}
        </el-button>
      </el-form-item>
    </el-form>
    <!--<footer class="login-footer">-->
    <!--<a href="/">返回到 freelog.com</a>-->
    <!--</footer>-->
  </section>
</template>

<script>
import SignupView from './index'

export default SignupView
</script>

<style lang="less" scoped>
  @import "index.less";
</style>
