<template>
  <div class="assets-wrap">
    <el-row>
      <el-col :span="6" v-for="(account, index) in accounts" :key="index">
        <el-card class="account-card" :body-style="cardStyle">
          <p class="account-card-info">
            <label>币种</label>
            {{account.showDetail.name}}</p>
          <p class="account-card-info">
            <label>账户地址</label>
            <el-tooltip class="item" effect="dark" :content="account.accountId" placement="top"
                        v-if="account.accountId">
              <clip-board v-model="account.accountId"
                          @copyDone="copyDoneHandler">
                <a href="javascript:;">
                  <i class="el-icon-fa-clipboard"></i>
                </a>
              </clip-board>
            </el-tooltip>
            <span v-else>账户不存在</span>
          </p>
          <p class="account-card-info">
            <label>账户余额</label><span>{{account.balance|humanizeCurrency}} {{account.showDetail.abbr}}</span>
          </p>
          <p class="account-card-info" v-if="account.status===1">
            <el-dropdown @command="handleCommand">
                                          <span class="el-dropdown-link">
                                            账户操作<i class="el-icon-arrow-down el-icon--right"></i>
                                          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{type: 'detail',data:account}">
                  详情
                </el-dropdown-item>
                <el-dropdown-item :command="{type: 'pay',data:account}">
                  去转账
                </el-dropdown-item>
                <el-dropdown-item :command="{type: 'download',data:account}">下载keystore
                </el-dropdown-item>
                <el-dropdown-item :command="{type: 'clear',data:account}">清除下载keystore
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="account-card" :body-style="cardStyle">
          <a href="/pages/account/create.html" class="add-account-btn">
            <p><i class="el-icon-plus"></i></p>
            <p>添加账户</p>
          </a>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AccountTypes from '@/config/account-types'
  import ClipBoard from '@/components/Clipboard/index.vue'

  export default {
    name: 'account-list',

    data() {
      return {
        cardStyle: {
          padding: '5px',
          'min-height': '150px',
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'flex-wrap': 'wrap',
        },
        accounts: [],
      }
    },
    components: {
      ClipBoard
    },
    mounted() {
      this.loadAssets()
        .then(this.formatAssets.bind(this))
        .then((accounts) => {
          this.accounts = accounts;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    methods: {
      handleCommand(command) {
        switch (command.type) {
          case 'detail':
            this.viewAccountDetail(command.data)
            break;
          case 'download':
            this.downloadKeyStore(command.data.cardNo)
            break;
          case 'clear':
            this.clearKeyStore(command.data.cardNo)
            break;
          case 'pay':
            this.gotoPayHandler(command.data)
            break;
        }
      },
      viewAccountDetail(account) {
        location.href = `/pages/account/detail.html?accountId=${account.accountId}`
      },
      gotoPayHandler(account) {
        location.href = `/pages/transfer.html?fromAccountId=${account.accountId}`
      },
      downloadFile(filename, content) {
        var $a = document.createElement('a')
        var blob = new Blob([content])
        $a.download = filename
        $a.href = URL.createObjectURL(blob)
        document.body.appendChild($a)
        $a.click()
        $a.remove()
      },
      downloadKeyStore(address) {
        return this.$axios.get('/v1/pay/accounts/downLoadKeyStore', {
          params: {
            address: address
          }
        }).then((res) => {
          try {
            var content = new Blob([JSON.stringify(res.data, null, 2)], {type: 'application/json'})
            this.downloadFile(address, content)
          } catch (err) {
            this.$message.error(err)
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      clearKeyStore(address) {
        this.$confirm('确定清除服务器上的keystore文件？')
          .then((_) => {
            return this.$axios.get('/v1/pay/accounts/clearKeyStore', {
              params: {
                address: address
              }
            }).then((res) => {
              var result = res.data
              if (result.ret === 0 && result.errcode === 0) {
                this.$message.success('成功清除')
              } else {
                this.$message.error(result.msg)
              }
            }).catch((err) => {
              console.log(err);
            })
          }).catch((_) => {
        })
      },
      formatAssets(accounts) {
        accounts.forEach((account) => {
          account.showDetail = AccountTypes[account.accountType]
        })

        return accounts
      },
      copyDoneHandler(ret) {
        ret ? this.$message.success('复制成功') : this.$message.error('复制失败')
      },
      loadAssets() {
        return this.$axios.get('/v1/pay/accounts').then((res) => {
          return res.data.data || [];
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "index.less";
</style>