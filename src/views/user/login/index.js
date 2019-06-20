import {isSafeUrl} from '../../../lib/security';
import LoginPanel from '@/components/LoginPanel/index.vue';

export default {
    name: 'freelog-ui-login',
    components: {
        LoginPanel,
    },

    data() {
        // const $i18n = this.$i18n
        // const validateLoginName = function (rule, value, callback) {
        //     if (value) {
        //         const EMAIL_REG = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
        //         const PHONE_REG = /^1[34578]\d{9}$/
        //         if (!EMAIL_REG.test(value) && !PHONE_REG.test(value)) {
        //             callback(new Error($i18n.t('login.validateErrors[0]')))
        //         } else {
        //             callback()
        //         }
        //     } else {
        //         callback(new Error($i18n.t('login.validateErrors[1]')))
        //     }
        // }
        //
        // const rules = {
        //     loginName: [
        //         {required: true, message: $i18n.t('login.ruleMessages[0]'), trigger: 'blur'},
        //         {validator: validateLoginName, trigger: 'blur'}
        //     ],
        //     password: [
        //         {required: true, message: $i18n.t('login.ruleMessages[1]'), trigger: 'blur'},
        //         {min: 6, message: $i18n.t('login.ruleMessages[2]'), trigger: 'blur'}
        //     ]
        // }
        // const loginName = window.localStorage.getItem('loginName') || ''
        //
        // return {
        //     model: {
        //         loginName,
        //         password: '',
        //     },
        //     signUpLink: '/signup',
        //     rules,
        //     error: null,
        //     loading: false,
        //     rememberUser: false
        // }
        return {};
    },
    mounted() {
        // const redirect = this.$route.query.redirect
        // if (isSafeUrl(redirect)) {
        //     this.signUpLink += `?redirect=${redirect}`
        // }
    },

    methods: {
        // redirect() {
        //     const redirect = this.$route.query.redirect
        //     if (isSafeUrl(redirect)) {
        //         window.location.replace(redirect)
        //     } else {
        //         this.$router.replace('/')
        //     }
        // },
        /**
         * 登录成功
         */
        success() {
            const redirect = this.$route.query.redirect
            if (isSafeUrl(redirect)) {
                window.location.replace(redirect)
            } else {
                this.$router.replace('/')
            }
        },
        // submit(ref) {
        //     const self = this
        //     this.$refs[ref].validate((valid) => {
        //         if (!valid) {
        //             return
        //         }
        //
        //         this.error = null
        //         this.loading = true
        //
        //         const data = Object.assign(this.model, {
        //             isRememer: this.rememberUser ? 1 : 0
        //         })
        //
        //         this.$store.dispatch('userLogin', data)
        //             .then(() => {
        //                 window.localStorage.setItem('loginName', data.loginName)
        //                 const redirect = this.$route.query.redirect
        //                 if (isSafeUrl(redirect)) {
        //                     window.location.replace(redirect)
        //                 } else {
        //                     self.$router.replace('/')
        //                 }
        //                 self.loading = false
        //             })
        //             .catch((err) => {
        //                 console.log(err)
        //                 const $i18n = self.$i18n
        //                 if (typeof err === 'string') {
        //                     self.error = {title: '', message: err}
        //                 } else {
        //                     self.error = {
        //                         title: $i18n.t('login.errorTitle'),
        //                         message: err.response.errorMsg || $i18n.t('login.errors[0]')
        //                     }
        //                     switch (err.response && err.response.status) {
        //                         case 401:
        //                             self.error.message = $i18n.t('login.errors[1]')
        //                             break
        //                         case 500:
        //                             self.error.message = $i18n.t('login.errors[2]')
        //                             break
        //                         default:
        //                             self.error.message = $i18n.t('login.errors[3]')
        //                     }
        //                 }
        //                 self.loading = false
        //             })
        //     })
        // }
    }
}
