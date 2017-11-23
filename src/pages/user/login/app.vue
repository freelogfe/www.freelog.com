<template>
    <section class="login-section">
        <header class="login-header">
            <el-alert v-if="error" :title="error.title" type="warning" :description="error.message" show-icon/>
        </header>

        <el-form class="login-form" auto-complete="off" :model="model" :rules="rules" ref="loginForm" label-width="0">
            <h2 class="heading">用户登录</h2>
            <el-form-item prop="loginName">
                <el-input type="text" v-model="model.loginName" placeholder="请输入用户名">
                    <template slot="prepend">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="model.password" placeholder="请输入密码"
                          @keyup.native.enter="submit('loginForm')">
                    <template slot="prepend">
                        <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="model.isRememer">记住我</el-checkbox>
                <span class="user-ops">
          <a class="user-op" href="/user/reset_pw">忘记密码</a> | <a class="user-op" href="/user/signup">注册新用户</a>
        </span>
            </el-form-item>
            <el-form-item class="login-btns">
                <el-button type="primary"
                           style="width: 100%;"
                           :loading="loading"
                           @click="submit('loginForm')">{{ loading ? '登陆中...' : '登录' }}
                </el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    import store from '@/lib/storage';

    export default {
        name: 'login',

        data() {
            const rules = {
                loginName: [
                    {required: true, message: '请输入账号', trigger: 'blur'},
                    {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
                ]
            };

            return {
                model: {
                    loginName: '13480125810',
                    password: '',
                    isRememer: false,
                },
                rules: rules,
                error: null,
                loading: false
            }
        },
        mounted() {
        },

        methods: {
            submit(ref) {
                var self = this;
                this.$refs[ref].validate(valid => {
                    if (!valid) {
                        return false
                    }

                    this.error = null
                    this.loading = true;


                    var data = Object.assign({},self.model)
                    data.isRememer = data.isRememer ? 1: 0
                    window.fetch('//api.freelog.com/v1/passport/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then((res) => {
                        this.loading = false
                        return res.json()
                    }).then((data) => {
                        if (data.ret === 0 && data.errcode === 0) {
                            store.set('userInfo', data.data);
                            location.href = '/pages/user/index.html'
                        } else {
                            this.error = data.msg
                        }
                    })
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "./index.less";
</style>
