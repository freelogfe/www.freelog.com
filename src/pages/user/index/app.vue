<template>
    <div id="app">

      <el-row >
        <el-col :span="12" :offset="6" >
          <div class="mainContent">
            <user-nav-bar></user-nav-bar>
            <h1>
                userName:{{user.nickname}}
            </h1>

            <section class="links">
                <a href="/node/home/philyoung">node Page</a>
            </section>

            <section class="actions">
                <el-button type="primary" plain @click="logoutHandler">log out</el-button>
            </section>
          </div>
      </el-col>
      </el-row>
    </div>
</template>

<script>
    import store from '@/lib/storage';
    import UserNavBar from '@/pages/userCenterNavBar/index.vue';
    export default {
        data() {
            return {
                user: store.get('userInfo') || {nickname:'pending'}
            }
        },
        mounted() {
            this.loadUserInfo()
        },
        components: {UserNavBar},
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
    }

    .index-card {
        width: 800px;
        margin: 100px auto;
    }

    .mainContent {

      background-color: white;
              min-height: 800px;
    }
</style>
