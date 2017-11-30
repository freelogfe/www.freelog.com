<template>
  <div id="app">

    <h4>收款方： philYoung</h4>
    <h4>收款以太钱包： 012345665479</h4>
    <h4>合同号： 0755123456</h4>
    <h4>商品标的：余亮的markdown</h4>

    转出账户：
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <br>
    <el-button type="primary" round @click="transferDialog()">确认转出</el-button>



    <el-dialog
    @close="close"
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input type="password" v-model="pwd" placeholder="请输入密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirmTransfer()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
    export default {
      data() {
        return {
          pwd: "",
          value: "",
          dialogVisible : false,
          options: [{
            value: '选项1',
            label: 'account1(100.00FC)'
          }, {
            value: '选项2',
            label: 'account2(1020.00FC)'
          }, {
            value: '选项3',
            label: 'account3(1200.00FC)'
          }, {
            value: '选项4',
            label: 'account4(1400.00FC)'
          }, {
            value: '选项5',
            label: 'account5(1500.00FC)'
          }],
          value: ''
        }
      },
      methods: {
        transferDialog () {
          this.dialogVisible = true;
        },
        close () {
          this.dialogVisible = false;
          this.pwd  = "";
        },
        confirmTransfer () {
          //send password
          console.log(this.value);
          this.dialogVisible = false;

        }
      }
    }
</script>

<style lang="postcss" scoped>

</style>
