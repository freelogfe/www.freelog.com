<template>
    <div id="app">
        <header>
            userName:{{user.nickname}}
        </header>

        <section class="links">
            <a href="/node/home/philyoung">node Page</a>
        </section>

        <section class="actions">
            <el-button type="primary" plain @click="gotoLogin">To User Login Page</el-button>
        </section>
    </div>
</template>

<script>
    import modal from 'components/modal.vue'
    import store from '@/lib/storage';

    export default {
        components: {
            modal
        },
        data() {
            return {
                user: store.get('userInfo') || {}
            }
        },
        mounted(){
          console.log(this.user)
        },
        methods: {
            gotoLogin() {
                location.assign('../user/login.html')
            }
        }
    }
</script>

<style lang="postcss" scoped>
    #app {
        margin: 15px auto;
        width: 50%;
    }
    .index-card {
        width: 800px;
        margin: 100px auto;
    }
</style>
