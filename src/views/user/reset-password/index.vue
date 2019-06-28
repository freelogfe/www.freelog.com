<template>
    <div style="padding: 180px 0; display: flex; justify-content: center;">
        <reset-panel></reset-panel>
    </div>
    <!--    <section class="login-section">-->
    <!--        <header class="login-header">-->
    <!--            &lt;!&ndash;<h1 class="brand">&ndash;&gt;-->
    <!--            &lt;!&ndash;<router-link to="/" tabindex="-1">freelog.com</router-link>&ndash;&gt;-->
    <!--            &lt;!&ndash;</h1>&ndash;&gt;-->
    <!--            <el-alert-->
    <!--                v-if="error"-->
    <!--                :title="error.title"-->
    <!--                type="warning"-->
    <!--                :description="error.message"-->
    <!--                show-icon-->
    <!--            />-->
    <!--        </header>-->
    <!--        <el-form-->
    <!--            class="login-form"-->
    <!--            auto-complete="off"-->
    <!--            :model="model"-->
    <!--            :rules="rules"-->
    <!--            ref="formRef"-->
    <!--            label-width="60px"-->
    <!--        >-->
    <!--            <h2 class="heading">{{$t('resetPassword.title')}}</h2>-->
    <!--            <el-form-item-->
    <!--                prop="loginName"-->
    <!--                :label="$t('resetPassword.loginName')">-->
    <!--                <el-input-->
    <!--                    type="text"-->
    <!--                    v-model="model.loginName"-->
    <!--                    :placeholder="$t('resetPassword.loginNamePlaceholder')"-->
    <!--                ></el-input>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item-->
    <!--                prop="authCode"-->
    <!--                :label="$t('resetPassword.verifyCode')"-->
    <!--            >-->
    <!--                <el-input-->
    <!--                    type="text"-->
    <!--                    v-model="model.authCode"-->
    <!--                    style="width: 60%"-->
    <!--                    :placeholder="$t('resetPassword.verifyCodeInputTip')"-->
    <!--                ></el-input>-->
    <!--                <el-button-->
    <!--                    class="vcode-btn"-->
    <!--                    @click="sendCheckCodeNotifyHandler"-->
    <!--                    :disabled="disabledCheckCodeBtn"-->
    <!--                >-->
    <!--                    {{vcodeBtnText}}-->
    <!--                </el-button>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item-->
    <!--                prop="password"-->
    <!--                :label="$t('resetPassword.password')"-->
    <!--            >-->
    <!--                <el-input-->
    <!--                    type="password"-->
    <!--                    v-model="model.password"-->
    <!--                    autocomplete="new-password"-->
    <!--                    :readonly="readonly"-->
    <!--                    :placeholder="$t('resetPassword.inputPasswordTip')"-->
    <!--                ></el-input>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item>-->
    <!--                <router-link-->
    <!--                    to="/login"-->
    <!--                    class="user-op"-->
    <!--                >-->
    <!--                    {{$t('resetPassword.backToLogin')}}<i class="el-icon-d-arrow-right"></i>-->
    <!--                </router-link>-->
    <!--            </el-form-item>-->
    <!--            <el-form-item class="login-btns">-->
    <!--                <el-button-->
    <!--                    :type="resetSuccess? 'success': 'primary'"-->
    <!--                    style="width: 100%;"-->
    <!--                    :loading="loading"-->
    <!--                    @click="submit('formRef')">-->
    <!--                    {{submitBtnText}}-->
    <!--                </el-button>-->
    <!--            </el-form-item>-->

    <!--        </el-form>-->
    <!--        &lt;!&ndash;<footer class="login-footer">&ndash;&gt;-->
    <!--        &lt;!&ndash;<a href="/">返回到 freelog.com</a>&ndash;&gt;-->
    <!--        &lt;!&ndash;</footer>&ndash;&gt;-->
    <!--    </section>-->
</template>

<script>
    export {default} from './index';
</script>

<style lang="less" scoped>
    /*@import "index.less";*/
</style>
