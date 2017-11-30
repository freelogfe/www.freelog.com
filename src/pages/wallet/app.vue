<template>
  <div id="app">
    <el-row class="topRow">
      <el-col :span="12" :offset="6">
        我的账户：  <span style="float:right;color:lightblue"><div style="float:right">余额</div><div>{{FC}} FC</div></span>
        <ul>
          <li v-for="account in accounts">
            <div class="wallet">
              <p>{{ account.name}}</p>
              <p style="color:red">{{ account.balance}}FC</p>
            </div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <br>
    <el-row >
      <el-col :offset="6" ><el-button type="primary" @click="dialogVisible = true">新增账户<i class="el-icon-circle-plus"></i></el-button></el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="6" :offset="6">
          <el-input v-model="publicKey" placeholder="请输入账号"></el-input>
      </el-col>
    </el-row>
    <el-row >
      <el-col :offset="6" ><el-button type="primary" @click="importPublicKey">导入账户<i class="el-icon-circle-plus"></i></el-button></el-col>
    </el-row>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input type="password" v-model="input" placeholder="请设置密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirmPwd()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
      data() {
        return {
          FC: "1000.00",
          dialogVisible: false,//对话框是否可视
          input: '', //对话框的密码
          publicKey: "",
          accounts: [
            {name: 'account1',balance:"100.00"},
            {name: 'account2',balance:"900.00"},
          ]
        };
      },
      methods: {
        createAccount() {
          //create account
        },
        confirmPwd() {
          this.fetchAccounts()


          this.input = "";
          this.dialogVisible = false;
          this.updateAccountList();
        },
        cancel() {
          this.input = "";
          this.dialogVisible = false
        },
        importPublicKey () {
          this.dialogVisible = true
          console.log(this.publicKey);

          this.fetchAccounts()
        },
        fetchAccounts () {

        },

      }
    }
</script>

<style lang="postcss" scoped>
    .wallet {
      background-color: lightgrey;
      border-radius: 8px;
    }
    ul{
        width:800px;
        padding:0;
        margin:0;
        border:0;
    }
    li{
        margin-right: 15px;
        display:inline-block;
        list-style:none;
        height:25px;
        line-height:25px;
        text-align:center;
        width:23%;
    }
  .topRow {
    margin-top: 10%;
  }
</style>
