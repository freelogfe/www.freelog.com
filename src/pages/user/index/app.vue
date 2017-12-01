<template>
    <div id="app">
        <header>
            userName:{{user.nickname}}
        </header>

        <section class="links">
            <a href="/node/home/philyoung">node Page</a>
        </section>

        <section class="actions">
            <el-button type="primary" plain @click="logoutHandler">log out</el-button>
        </section>
    </div>
</template>

<script>
    import store from '@/lib/storage';

    export default {
        data() {
            return {
                user: store.get('userInfo') || {}
            }
        },
        mounted() {
            this.loadUserInfo()
        },
        methods: {
            loadUserInfo() {
                var self = this;
                window.fetch('//api.freelog.com/v1/userinfos/10024', {
                    credentials: 'same-origin'
                }).then(function (res) {
                    return res.json()
                }).then(function (data) {
                    self.user = data.data;
                })
            },
            logoutHandler() {
                window.fetch('//api.freelog.com/v1/passport/logout', {
                    credentials: 'same-origin'
                }).then(function (res) {
                    location.assign('../user/login.html')
                })
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
