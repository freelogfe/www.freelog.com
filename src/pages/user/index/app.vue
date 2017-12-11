<template>
    <div id="app">

      <el-row >
        <el-col :span="12" :offset="6" >
          <div class="mainContent">
            <user-nav-bar index="1"></user-nav-bar>
            <div class="contentBody">
              <p>Username: {{user.nickname}}</p>
              <div>账户余额：100FC  <a href="#">去充值</a></div>
              <p>最近浏览节点：</p>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="地址">
                  <template slot-scope="scope">
                    <a>{{ scope.row.address }}</a>
                    <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">查看</el-button>
             <el-button
          size="mini"
          @click="handleContract(scope.$index, scope.row)">管理合同</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <section class="actions">
                  <el-button type="primary" plain @click="logoutHandler">log out</el-button>
              </section>
            </div>

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
                user: store.get('userInfo') || {nickname:'pending'},
                tableData: [{
                  date: '2016-05-02',
                  name: 'philyoung',
                  address: 'http://api.freelog.com/node/home/philyoung'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: 'http://api.freelog.com/node/home/philyoung'
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  address: 'http://api.freelog.com/node/home/philyoung'
                }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: 'http://api.freelog.com/node/home/philyoung'
                }]
            }
        },
        mounted() {
            //this.loadUserInfo()
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
            },
            handleEdit (index, row) {
              window.location.assign(row.address)
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
      color:#878d99;
      background-color: white;
      min-height: 800px;
    }

    .contentBody {
      padding: 20px;
    }
</style>
