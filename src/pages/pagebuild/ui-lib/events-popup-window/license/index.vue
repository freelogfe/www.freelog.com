<template>
  <div class="">
    <el-dialog
      title="执行事件"
      :visible.sync="dialogVisible"
      width="30%">
      <p>您将同意签署协议，协议编号为： </p>

      <span slot="footer" class="dialog-footer">


        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pay()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import LicenseEvent from './index.js'
  export default LicenseEvent
</script>
