<template>
  <div class="my-profile-view">
    <el-form label-width="100px"
             label-position="left">
      <el-form-item class="profile-info-item" label="用户姓名">
        {{session.userName?session.userName: '未设置用户姓名'}}
      </el-form-item>
      <el-form-item class="profile-info-item" label="用户昵称">
        {{session.nickname}}
        <!--<el-input size="small" type="password" v-model="password" style="width: 200px;"></el-input>-->
      </el-form-item>
      <el-form-item class="profile-info-item" label="邮箱">
        {{session.email}}
      </el-form-item>
      <el-form-item class="profile-info-item" label="手机号">
        {{session.mobile?session.mobile: '未设置手机号'}}
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'my-profile',

    data() {
      return {
      }
    },

    components: {},

    computed: {
      ...mapGetters({
        session: 'session'
      })
    },

    mounted() {

    },
    methods: {

    }
  }
</script>

<style lang="less" scoped type="text/less">
  .my-profile-view {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .profile-info-item {
      border-bottom: 1px solid #ededed;
      width: 400px;
      color: #999;
      margin-bottom: 5px;
      padding: 0 20px;
    }
  }
</style>