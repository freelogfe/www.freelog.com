<template>
    <section class="login-section">
        <header class="login-header">
            <!--<h1 class="brand">-->
            <!--<router-link to="/" tabindex="-1">freelog.com</router-link>-->
            <!--</h1>-->
            <el-alert
                v-if="error"
                :title="error.title"
                type="warning"
                :description="error.message"
                show-icon
            />
        </header>
        <el-form
            class="login-form"
            auto-complete="off"
            :model="model"
            :rules="rules"
            ref="loginForm"
            label-width="0"
        >
            <h2 class="heading">{{$t('login.title')}}</h2>
            <el-form-item prop="loginName">
                <el-input
                    type="text"
                    v-model="model.loginName"
                    name="username"
                    :placeholder="$t('login.usernamePlaceholder')"
                >
                    <template slot="prepend">
                        <i
                            class="fa fa-user"
                            aria-hidden="true"
                        ></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    type="password"
                    v-model="model.password"
                    name="password"
                    :placeholder="$t('login.passwordPlaceholder')"
                    @keyup.native.enter="submit('loginForm')"
                >
                    <template slot="prepend">
                        <i
                            class="fa fa-unlock-alt"
                            aria-hidden="true"
                        ></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="rememberUser">{{$t('login.rememberUser')}}</el-checkbox>
                <span class="user-ops">
<!--                    <router-link-->
<!--                        to="/reset_pw"-->
<!--                        class="user-op">-->
<!--                        {{$t('login.resetPW')}}-->
<!--                    </router-link>-->
                    <a class="user-op" @click="switchPanel('reset')">
                        {{$t('login.resetPW')}}
                    </a>
                    &nbsp;|&nbsp;
                    <!--                    <router-link-->
                    <!--                        class="user-op"-->
                    <!--                        :to="signUpLink">-->
                    <!--                        {{$t('login.signup')}}-->
                    <!--                     </router-link>-->
                    <a class="user-op" @click="switchPanel('signup')">
                        {{$t('login.signup')}}
                    </a>

                </span>
            </el-form-item>
            <el-form-item class="login-btns">
                <el-button
                    type="primary"
                    style="width: 100%;"
                    :loading="loading"
                    class="js-login-btn"
                    @click="submit('loginForm')">{{ loading ? $t('login.loginStatus[0]') : $t('login.loginStatus[1]') }}
                </el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import LoginPanel from './index';

    export default LoginPanel;
    // export {default} from './index';
</script>

<style lang="less" scoped>
    @import "index.less";
</style>
