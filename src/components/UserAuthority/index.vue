<template>
    <div style="padding: 180px 0; display: flex; justify-content: center;">
        <LoginPanel
            v-if="panel === 'login'"
            @switch="switchPanel"
        />
        <ResetPanel
            v-if="panel === 'reset'"
            @switch="switchPanel"
        />
        <SignupPanel
            v-if="panel === 'signup'"
            @switch="switchPanel"
        />
    </div>
</template>

<script>
    import LoginPanel from './LoginPanel/index.vue';
    import ResetPanel from './ResetPanel/index.vue';
    import SignupPanel from './SignupPanel/index.vue';

    export default {
        name: "user-authority",

        components: {
            LoginPanel,
            ResetPanel,
            SignupPanel,
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
            }
        }
    }
</script>

<style scoped>

</style>
