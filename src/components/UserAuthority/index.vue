<template>
    <div style="padding: 180px 0; display: flex; justify-content: center;">
        <LoginPanel
            v-if="panel === 'login'"
            @switch="switchPanel"
            @success="success"
        />
        <ResetPanel
            v-if="panel === 'reset'"
            @switch="switchPanel"
        />
        <SignupPanel
            v-if="panel === 'signup'"
            @switch="switchPanel"
            @success="success"
        />
    </div>
</template>

<script>
    import LoginPanel from './LoginPanel/index.vue';
    import ResetPanel from './ResetPanel/index.vue';
    import SignupPanel from './SignupPanel/index.vue';
    import {isSafeUrl} from '@/lib/security';

    export default {
        name: "user-authority",

        components: {
            LoginPanel,
            ResetPanel,
            SignupPanel,
        },

        props: {
            loginSuccess: Function,
        },

        data() {
            return {
                // 当前显示的面板
                panel: 'login', // 'login' || 'reset' || 'signup'
            };
        },
        methods: {
            switchPanel(panel) {
                // console.log(panel, 'panelpanel');
                this.panel = panel;
            },
            /**
             * 登录成功
             */
            success() {
                // console.log(this.loginSuccess, 'this.loginSuccessthis.loginSuccess');
                if (this.loginSuccess) {
                    this.loginSuccess();
                    return;
                }

                const redirect = this.$route.query.redirect;
                if (isSafeUrl(redirect)) {
                    window.location.replace(redirect)
                } else {
                    this.$router.replace('/')
                }
            },
        }
    }

    export {default as tools} from './tools';
</script>

<style scoped>

</style>
