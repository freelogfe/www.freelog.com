<template>
  <div class="account-recharge-view">
    <account-layout :title="navTitle">
      <div class="account-info-wrap">
        <h5>账户信息</h5>
        <el-form label-width="60px"
                 inline
                 class="account-info-content"
                 label-position="left">
          <el-form-item label="账户ID" class="account-info-item">
            <label class="account-show-content">{{renderData.accountId}}</label>
          </el-form-item>
          <el-form-item label="账户名" class="account-info-item">
            <label class="account-show-content">{{renderData.accountName}}</label>
          </el-form-item>
          <el-form-item label="余额" label-width="40px" class="account-info-item">
            <label class="account-show-content">
              {{renderData.balance | humanizeCurrency(currencyInfo.abbr)}} {{currencyInfo.abbr}}
            </label>
          </el-form-item>
        </el-form>
      </div>

      <div class="account-info-wrap">
        <h5>充值方式（{{rechargeMethod}}）</h5>
        <el-form label-width="80px"
                 label-position="left">
          <el-form-item label="充值金额">
            <el-input size="small" v-model="amount" style="width: 180px;"></el-input>
            <label class="input-tip">{{currencyInfo.abbr}}</label>
          </el-form-item>
          <el-form-item label="Address">
            <el-select v-model="cardNo" size="small" placeholder="请选择充值账户" style="width: 440px;">
              <el-option :label="addr.label" :key="addr.value" :value="addr.value" v-for="addr in cardClips"></el-option>
            </el-select>
            <el-button type="text" @click="showAddCardDialogHandler"><i class="el-icon-plus"></i></el-button>
            <div class="form-item-tip" v-if="currencyInfo.abbr === 'feth'">还没有以太坊账户？
              <el-button type="text" @click="showCreateEthDialog">去创建</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <template slot="footer">
        <el-button class="ft-btn" type="primary" @click="rechargeHandler">充值</el-button>
        <el-button class="ft-btn" type="primary" @click="officialTapHandler" v-if="cardNo">赠送feth</el-button>
      </template>
    </account-layout>

    <el-dialog
            title="添加卡号"
            :visible.sync="shouldShowAddDialog"
            width="500px">
      <el-form label-width="50px">
        <el-form-item label="卡号" prop="addCardNo">
          <el-input size="small" v-model="addCardNo" style="width:400px" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button @click="shouldShowAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addCardNoHandler">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
            title="创建以太坊地址"
            :visible.sync="shouldShowCreateDialog"
            width="40%"
            :before-close="handleClose">
      <h3 style="margin-bottom: 20px;text-align: center">请设置以太坊密钥加密密码</h3>
      <el-form :model="createEthForm" status-icon
               :rules="createEthRules"
               ref="createEthForm"
               label-width="120px">
        <el-form-item label="加密密码" prop="pass">
          <el-input size="small" type="password" v-model="createEthForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认加密密码" prop="checkPass">
          <el-input size="small" type="password" v-model="createEthForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="shouldShowCreateDialog = false">取消</el-button>
          <el-button type="primary" @click="createEthAccount">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import AccountTypes from '@/config/account-types'
import AccountLayout from '../layout.vue'

export default {
  name: 'account-recharge-view',

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.createEthForm.checkPass !== '') {
          this.$refs.createEthForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.createEthForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      createEthForm: {
        pass: '',
        checkPass: ''
      },
      createEthRules: {
        pass: [
          { required: true, message: '请输入加密密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请输入确认加密密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'change' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ]
      },
      shouldShowAddDialog: false,
      addCardNo: '',
      shouldShowCreateDialog: false,
      amount: '',
      cardNo: '',
      cardClips: []
    }
  },

  props: {
  },

  components: { AccountLayout },

  mounted() {
    this.loadCardclips()
      .then((list) => {
        this.cardClips = list.map(this.resolveCard)
      })
  },

  computed: {
    navTitle() {
      return `${this.currencyInfo.name}账户充值`
    },
    currencyInfo() {
      return AccountTypes[this.renderData.currencyType]
    },
    rechargeMethod() {
      let method
      switch (this.renderData.currencyType) {
        case 1:
          method = '以太坊'
          break
        case 2:
        case 3:
        case 4:
        default:
          method = '银行'
      }

      return method
    },
    renderData() {
      debugger
      return this.$route.query
    }
  },

  methods: {
    // for test
    officialTapHandler() {
      this.$axios.post('/v1/pay/officialTap', {
        cardNo: this.cardNo,
        currencyType: this.renderData.currencyType
      }).then((res) => {
        this.$message.info(res.data.msg)
      })
    },
    showAddCardDialogHandler() {
      this.shouldShowAddDialog = true
      this.addCardNo = ''
    },
    addCardNoHandler() {
      this.addCardToCardclips(this.addCardNo)
        .then(() => {
          this.$message.success('添加成功')
        }).catch(this.$error.showErrorMessage)
    },
    resolveCard(card) {
      card.label = `${card.bankName} | ${card.cardNo}`
      card.value = card.cardNo
      return card
    },
    loadCardclips() {
      return this.$axios.get(`/v1/pay/cardclips?currencyType=${this.renderData.currencyType}`)
        .then((res) => {
          const { data } = res
          if (this.isSuccess(data)) {
            return data.data
          }
          return Promise.reject(data.msg)
        })
    },
    isSuccess(data) {
      return (data.ret === 0 && data.errcode === 0)
    },
    rechargeHandler() {
      this.$axios.post('/v1/pay/recharge', {
        accountId: this.renderData.accountId,
        cardNo: this.cardNo,
        amount: this.currencyInfo.unit * this.amount
      }).then((res) => {
        const { data } = res
        if (data.ret === 0 && data.errcode === 0) {
          let msg
          switch (data.data.tradeStatus) {
            case 1:
              msg = '充值成功'
              break
            case 2:
              msg = '充值失败'
              break
            case 3:
              msg = '发起中'
              break
            case 4:
              msg = '超时失败'
              break
            default:
              msg = data.msg
          }

          if ([1, 3].includes(data.data.tradeStatus)) {
            this.$message.success(msg)
            this.$router.push('/accounts')
            // this.$store.dispatch('changePanel', 'my-accounts')
          } else {
            this.$message.error(msg)
          }
        } else {
          throw new Error(data.msg)
        }
      }).catch(this.$error.showErrorMessage)
    },
    handleClose(done) {
      this.$refs.createEthForm.resetFields()
      done()
    },
    showCreateEthDialog() {
      this.shouldShowCreateDialog = true
    },
    createEthAccount() {
      this.$confirm('此加密密码用于加密以太坊keystore，一旦创建后不可更改，系统不予以保存，需用户自行保存妥善！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$refs.createEthForm.validate((valid) => {
          if (valid) {
            this.$axios.post('/v1/pay/helper/feather/createEthAccount', {
              password: this.createEthForm.pass
            }).then((res) => {
              const { data } = res
              if (this.isSuccess(data)) {
                this.addCardToCardclips(data.data.address)
                  .then(() => {
                    this.$message.success('创建成功')
                  })
                  .catch(this.$message.error)
              } else {
                this.$message.error(data.msg || '创建失败')
              }
              this.shouldShowCreateDialog = false
            })
          } else {
            console.log('error submit!!')
          }
        })
      }).catch(() => {
      })
    },
    addCardToCardclips(cardNo) {
      return this.$axios.post('/v1/pay/cardclips', {
        cardNo,
        currencyType: this.renderData.currencyType
      }).then((res) => {
        const { data } = res
        if (!this.isSuccess(data)) {
          return Promise.reject(data.msg)
        }
        this.cardClips.push(this.resolveCard(data.data))
        return data.data
      })
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
  .account-recharge-view {
    .account-info-content {
      display: flex;
      justify-content: center;
      .account-info-item {
        margin-right: 50px;
      }
    }

    .account-info-wrap {
      width: 740px;
      .input-tip {
        color: #999999;
        font-size: 14px;
        margin-left: 10px;
      }
      i {
        color: #666666;
        font-size: 20px;
        font-weight: bold;
        vertical-align: middle;
        margin-left: 20px;
      }

      .form-item-tip {
        color: #999999;
        font-size: 14px;
      }
    }

    h5 {
      color: #999999;
      font-size: 12px;
      padding-left: 10px;
      padding-bottom: 5px;
      margin-bottom: 30px;
      border-bottom: 1px solid #EEEEEE;
    }
  }
</style>
