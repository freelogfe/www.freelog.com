<template id="accountManagement">
  <div id="app">
    <ul class="setting-items">
      <li>
        <span class="setting-title"><label>loginName</label></span>
        <span class="setting-desc">{{user.email||user.mobile}}</span>
        <div class="setting-action">
          <el-button type="text">查看</el-button>
        </div>
      </li>
      <li>
        <span class="setting-title"><label>用户名</label></span>
        <span class="setting-desc">{{user.nickname}}</span>
      </li>
      <li>
        <span class="setting-title"><label>用户角色</label></span>
        <span class="setting-desc">{{user.userRole}}</span>
      </li>
    </ul>
  </div>
</template>


<script>
  import store from '@/lib/storage'

  export default {
    data() {

      return {
        user: store.get('userInfo') || {}
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="less">
  @import "app.less";
</style>
