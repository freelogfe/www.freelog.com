<template>
  <div id="app">
    <tool-bar></tool-bar>
    <el-row class="topRow">
      <el-col :span="12" :offset="6" class="midColumn">
        <div class="accountName">
            <span style="float:right;color:lightblue"><div style="float:right">余额</div><div>{{FC}} FC</div></span>
        </div>
        <div class="" style="width:90%;margin:auto auto">
          <ul class="accountList">
            <li v-for="account in accounts">
              <div class="wallet">
                <p>{{ account.name}}</p>
                <p style="color:red">{{ account.balance}}FC</p>
                <p style="font-size:8px">{{account.accountNumber}}</p>
              </div>
            </li>
          </ul>
          <div class="" style="margin-bottom:40px;">
            <p>我们基于以太坊创建您的账户</p>
            <el-button type="primary" @click="dialogVisible = true">新增账户<i class="el-icon-circle-plus"></i></el-button>
          </div>
          <div class="" style="margin-bottom:12px;">
            <p>亦可导入已有账户</p>
              <el-input v-model="publicKey" placeholder="请输入账号"></el-input>
          </div>
          <div class="" style="margin-bottom:12px;">
              <el-button type="primary" @click="importPublicKey">导入账户<i class="el-icon-circle-plus"></i></el-button>
          </div>

        </div>

      </el-col>
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

import ToolBar from '../pagebuild/toolbar/index.vue'

    export default {
      data() {
        return {
          FC: "1000.00",
          dialogVisible: false,//对话框是否可视
          input: '', //对话框的密码
          publicKey: "",
          accounts: [
            {name: 'account1',balance:"100.00",accountNumber: '0x3213454352435223'},
            {name: 'account2',balance:"900.00",accountNumber: '00x30x345654l123n44'},
          ]
        };
      },
      components: {ToolBar},
      methods: {
        createAccount() {
          //create account
        },
        confirmPwd() {
          this.fetchAccounts()


          this.input = "";
          this.dialogVisible = false;
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
    #app {
      font-family:"Helvetica","Heiti SC Thin",Georgia,Serif;
    }
    .accountList {
      margin-bottom: 40px;
    }
    .wallet {
      text-align:left;
      background-color: #7ddbffbf;
      border-radius: 8px;
    }
    .accountName {
      height: 50px;
      margin: auto;
      width: 90%;
      border-bottom: solid 1px lightblue;
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
        width:19%;
    }
  .topRow {
    margin-top: 10%;
  }
  .midColumn {
    background-color: white
  }
</style>
