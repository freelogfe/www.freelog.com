<template>
  <div class="add-pay-account-view">
    <AccountLayout title="添加卡号" :showFooter="false" :goBackFn="goBackHandler">
      <el-form label-position="left" label-width="120px">
        <el-form-item label="账号名" :rules="createRules" required>
          <el-input size="small"
                    v-model="form.cardAlias"
                    placeholder="输入自定义账号名称"
                    style="width:300px" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :label="addrName" required>
          <el-input size="small" v-model="form.cardNo"
                    :placeholder="`输入${addrName}`"
                    style="width:600px"
                    auto-complete="off"></el-input>
          <div class="form-item-tip" v-if="currencyInfo.abbr === 'feth'">还没有以太坊地址?
            <el-button type="text" @click="showCreateEthDialog">创建一个以太坊地址</el-button>
          </div>
        </el-form-item>
        <el-form-item style="text-align: center;margin-top: 60px">
          <el-button @click="goBackHandler" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="addCardNoHandler" class="add-btn">添加</el-button>
        </el-form-item>
      </el-form>
    </AccountLayout>

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
import { isSafeUrl } from '@/lib/security'

import AccountLayout from '../layout.vue'

export default {
  name: 'create-pay-account',

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

      form: {
        cardAlias: '',
        cardNo: ''
      },
      createRules: {
        cardAlias: [
          { required: true, message: '账号名', trigger: 'blur' },
          // {min: 6, message: '最少1个字符', trigger: 'blur'}
        ],
        cardNo: [
          { required: true, message: '请输入账号地址', trigger: 'blur' }
        ]
      },
      shouldShowCreateDialog: false,
    }
  },

  components: { AccountLayout },

  computed: {
    currencyInfo() {
      return AccountTypes[this.$route.query.currencyType]
    },
    addrName() {
      let name
      switch (this.currencyInfo.type) {
        case 1:
          name = '以太坊地址'
          break
        case 2:
        case 3:
        case 4:
        default:
          name = '银行账号'
      }

      return name
    }
  },

  methods: {
    addCardNoHandler() {
      this.addCardToCardclips(this.form)
        .then(() => {
          this.$message.success('添加成功')
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
              const {
                data, ret, errcode, msg
              } = res.data
              if (ret === 0 && errcode === 0) {
                this.form.cardNo = data.address
                this.$message.success('以太坊账号创建成功')
              } else {
                this.$message.error(msg || '创建失败')
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
    addCardToCardclips(form) {
      return this.$axios.post('/v1/pay/cardclips', Object.assign({
        currencyType: this.currencyInfo.type
      }, form)).then((res) => {
        const {
          ret, errcode, msg
        } = res.data
        if (ret === 0 && errcode === 0) {
          this.$message.success('添加成功')
          this.goBackHandler()
          return null
        }
        return Promise.reject(msg)
      })
    },
    goBackHandler() {
      if (this.$route.query.backPath && isSafeUrl(this.$route.query.backPath)) {
        this.$router.push(this.$route.query.backPath)
      } else {
        this.$router.push('/user/accounts')
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .add-pay-account-view {
    .form-item-tip {
      font-size: 12px;
      color: #999999;
      margin-top: -11px;
      > button {
        font-size: 12px;
      }
    }

    .add-btn,
    .cancel-btn{
      padding: 10px 40px;
    }

    .cancel-btn {
      margin-right: 15px;
    }
  }
</style>
