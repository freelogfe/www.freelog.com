<template>
  <div class="license-wrap">
    <el-form label-position="left" label-width="80px" :model="data" v-if="data">
      <el-form-item label="协议编号">
        {{data.event.params.join(',')}}
      </el-form-item>
      <el-form-item label="接受协议">
        <el-checkbox v-model="accepted"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button @click="doneHandler">取 消</el-button>
        <el-button @click="signHandler" :disabled="!accepted">sign</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
  import LicenseEvent from './index.js'

  export default LicenseEvent
</script>
