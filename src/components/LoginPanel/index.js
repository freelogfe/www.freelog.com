export default {
    name: 'login-panel',

    data() {
        const $i18n = this.$i18n;

        const validateLoginName = function (rule, value, callback) {
            if (value) {
                const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                const PHONE_REG = /^1[34578]\d{9}$/;
                if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
                    callback(new Error($i18n.t('login.validateErrors[0]')))
                } else {
                    callback()
                }
            } else {
                callback(new Error($i18n.t('login.validateErrors[1]')))
            }
        };

        const rules = {
            loginName: [
                {required: true, message: $i18n.t('login.ruleMessages[0]'), trigger: 'blur'},
                {validator: validateLoginName, trigger: 'blur'}
            ],
            password: [
                {required: true, message: $i18n.t('login.ruleMessages[1]'), trigger: 'blur'},
                {min: 6, message: $i18n.t('login.ruleMessages[2]'), trigger: 'blur'}
            ]
        };

        const loginName = window.localStorage.getItem('loginName') || '';

        return {
            // 输入框
            model: {
                loginName,
                password: '',
            },
            // 用户注册链接
            signUpLink: '/signup',
            // 表单验证规则
            rules,
            // 错误信息
            error: null,
            // 是否是加载中
            loading: false,
            // 是否勾选『记住我』
            rememberUser: false
        }
    },
    // mounted() {
    //     const redirect = this.$route.query.redirect
    //     if (isSafeUrl(redirect)) {
    //         this.signUpLink += `?redirect=${redirect}`
    //     }
    // },

    methods: {
        // redirect() {
        //     const redirect = this.$route.query.redirect
        //     if (isSafeUrl(redirect)) {
        //         window.location.replace(redirect)
        //     } else {
        //         this.$router.replace('/')
        //     }
        // },
        submit(ref) {
            const self = this;
            this.$refs[ref].validate((valid) => {
                if (!valid) {
                    return;
                }

                this.error = null;
                this.loading = true;

                const data = Object.assign(this.model, {
                    isRememer: this.rememberUser ? 1 : 0
                });

                this.$store.dispatch('userLogin', data)
                    .then(() => {
                        window.localStorage.setItem('loginName', data.loginName);
                        // const redirect = this.$route.query.redirect
                        // if (isSafeUrl(redirect)) {
                        //     window.location.replace(redirect)
                        // } else {
                        //     self.$router.replace('/')
                        // }
                        self.loading = false;
                        self.$emit('success');
                    })
                    .catch((err) => {
                        // console.log(err)
                        const $i18n = self.$i18n
                        if (typeof err === 'string') {
                            self.error = {title: '', message: err}
                        } else {
                            self.error = {
                                title: $i18n.t('login.errorTitle'),
                                message: err.response.errorMsg || $i18n.t('login.errors[0]')
                            }
                            switch (err.response && err.response.status) {
                                case 401:
                                    self.error.message = $i18n.t('login.errors[1]')
                                    break
                                case 500:
                                    self.error.message = $i18n.t('login.errors[2]')
                                    break
                                default:
                                    self.error.message = $i18n.t('login.errors[3]')
                            }
                        }
                        self.loading = false
                    })
            })
        }
    }
}

/**
 * 检查 URL 是否合法
 * @param {string} url
 * @return {boolean}
 */
function isSafeUrl(url) {
    const reg = /^.+\.(test)?freelog\.com$/;

    try {
        const obj = new URL(url); // 正确的链接检测
        if (reg.test(obj.hostname)) {
            return true;
        }
    } catch (e) {
        // path型链接检测
        if ((/^\/[^/]+/.test(url))) {
            return true;
        }
    }

    return false;
}
