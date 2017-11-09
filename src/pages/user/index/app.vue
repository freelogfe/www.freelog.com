<template>
  <div id="app">
    <el-card class="index-card">
      index page
      <el-button type="primary" plain @click="gotoLogin">To User Login Page</el-button>
    </el-card>
  </div>
</template>

<script>
  import modal from 'components/modal.vue'
  export default {
    components: {
      modal
    },
    data () {
      return {}
    },
    methods: {
        gotoLogin () {
        location.assign('../user/login.html')
      }
    }
  }
</script>

<style lang="postcss">
  .index-card {
    width: 800px;
    margin: 100px auto;
  }
</style>
