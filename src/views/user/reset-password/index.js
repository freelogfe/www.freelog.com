// import {isSafeUrl} from '@/lib/security'
import {EMAIL_REG, PHONE_REG, validateLoginName} from '../login/validator';
import ResetPanel from '@/components/UserAuthority/ResetPanel/index.vue';

export default {
    name: 'reset-password',
    components: {
        ResetPanel,
    },

    // data() {
    //     // form validate rules
    //     const rules = {
    //         loginName: [
    //             {required: true, message: this.$t('resetPassword.loginNamePlaceholder'), trigger: 'blur'},
    //             {validator: validateLoginName, trigger: 'blur'}
    //         ],
    //         verifyCode: [
    //             {required: true, message: this.$t('resetPassword.verifyCodeInputTip'), trigger: 'blur'}
    //         ]
    //     };
    //
    //     return {
    //         model: {
    //             loginName: '',
    //             authCode: '',
    //             password: ''
    //         },
    //         rules,
    //         error: null,
    //         loading: false,
    //         sending: false,
    //         waitingTimer: 0,
    //         readonly: true,
    //         resetSuccess: false
    //     };
    // },
    //
    // computed: {
    //     disabledCheckCodeBtn() {
    //         return this.waitingTimer > 0 || !(EMAIL_REG.test(this.model.loginName) || PHONE_REG.test(this.model.loginName));
    //     },
    //     vcodeBtnText() {
    //         if (this.sending) {
    //             return this.$t('resetPassword.sendingText');
    //         } else if (this.waitingTimer) {
    //             setTimeout(() => {
    //                 this.waitingTimer--
    //             }, 1e3);
    //             return this.$t('resetPassword.timerText', {time: this.waitingTimer});
    //         }
    //
    //         return this.$t('resetPassword.checkcodeBtnText');
    //     },
    //     submitBtnText() {
    //         var index;
    //
    //         if (this.loading) {
    //             index = 0;
    //         } else if (this.resetSuccess) {
    //             index = 2;
    //         } else {
    //             index = 1;
    //         }
    //         return this.$t(`resetPassword.verifyCodeStatus[${index}]`);
    //     }
    // },
    //
    // mounted() {
    //     //阻止浏览器自动填充
    //     setTimeout(() => {
    //         this.readonly = false
    //     }, 1e3);
    // },
    //
    // methods: {
    //     submit(ref) {
    //         if (this.resetSuccess) {
    //             return this.$router.push('/login');
    //         }
    //
    //         this.$refs[ref].validate((valid) => {
    //             if (!valid) {
    //                 return;
    //             }
    //
    //             this.error = null;
    //             this.loading = true;
    //             this.resetSuccess = false;
    //             this.$axios.post('/v1/userinfos/resetPassword', this.model)
    //                 .then((res) => {
    //                     const {msg, ret, errcode} = res.data;
    //                     if (errcode === 0 && ret === 0) {
    //                         this.resetSuccess = true;
    //                         // this.$message.success(this.$t('resetPassword.resetSuccess'))
    //                     } else {
    //                         this.error = {title: '', message: msg};
    //                     }
    //                     this.loading = false;
    //                 })
    //                 .catch((err) => {
    //                     this.loading = false;
    //                     this.error = {
    //                         title: this.$t('resetPassword.errorTitle'),
    //                         message: this.$t('resetPassword.defaultErrorMsg'),
    //                     };
    //
    //                     switch (err.response && err.response.status) {
    //                         case 401:
    //                             this.error.message = this.$t('resetPassword.identifyError');
    //                             break;
    //                         case 500:
    //                             this.error.message = this.$t('resetPassword.serverError');
    //                             break;
    //                         default:
    //                             this.error.message = this.$t('resetPassword.appError');
    //                     }
    //                 });
    //         });
    //     },
    //     sendCheckCodeNotifyHandler() {
    //         if (this.sending || !this.model.loginName) return;
    //
    //         this.sending = true;
    //         this.$axios.post(`/v1/message/send`, {
    //             loginName: this.model.loginName,
    //             authCodeType: 'resetPassword'
    //         }).then(res => {
    //             const {ret, errcode, data, msg} = res.data;
    //
    //             this.sending = false;
    //             if (ret === 0 && errcode === 0) {
    //                 this.waitingTimer = 60;
    //             } else {
    //                 this.$message.error(msg);
    //             }
    //         })
    //     },
    // }
}
