<template>
  <div class="my-profile-view" v-if="session">
    <el-form label-width="0"
             label-position="left">
      <el-form-item class="profile-info-item" :class="[avatarCls]" label="用户头像">
        <el-button type="text" class="user-avatar-btn" @click="showImageCropUploader=true">
          <img v-show="session.avatarUrl" class="user-avatar" :src="session.avatarUrl" @error="imgErrorHandler"
               alt="用户头像">
          <span v-if="!session.avatarUrl">编辑头像</span>
        </el-button>
        <crop-image v-model="showImageCropUploader"
                    :avatarUrl="session.avatarUrl"
                    :upload-success="uploadSuccessHandler"></crop-image>
      </el-form-item>
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
import { mapGetters } from 'vuex'
import CropImage from '@/components/CropImage/index.vue'

export default {
  name: 'my-profile',

  data() {
    return {
      showImageCropUploader: false,
      avatarCls: ''
    }
  },

  components: { CropImage },

  computed: {
    ...mapGetters({
      session: 'session'
    })
  },

  mounted() {
  },

  watch: {
    'session.avatarUrl': function avatarUrl() {
      if (this.session.avatarUrl) {
        this.avatarCls = ''
      }
    }
  },
  methods: {
    imgErrorHandler() {
      this.avatarCls = 'not-found-img'
      this.$store.dispatch('changeAvatar', '')
    },
    uploadSuccessHandler() {
      this.$store.dispatch('changeAvatar')
      this.showImageCropUploader = false
    }
  }
}
</script>

<style lang="less" scoped type="text/less">
  .my-profile-view {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    .not-found-img {
      .user-avatar-btn span {
        width: 82px;
        height: 82px;
        line-height: 82px;
        display: inline-block;
        border: 1px solid #EEEEEE;
        border-radius: 50%;
      }
    }
    .user-avatar-btn {
      position: relative;
      &:before {
        content: '编辑头像';
        background-color: #333333;
        opacity: 0;
        width: 83px;
        height: 83px;
        display: block;
        position: absolute;
        top: 13px;
        left: 0;
        border-radius: 50%;
        line-height: 83px;
        color: white;
        transition: all .3s;
        transform: scale(0);
      }
      &:hover {
        &:before {
          opacity: .8;
          transform: scale(1);
        }
      }
    }
    .user-avatar {
      border-radius: 50%;
      width: 83px;
      height: 83px;
      margin-right: 20px;
      border: 1px solid #EEEEEE;
    }
    .profile-info-item {
      border-bottom: 1px solid #ededed;
      width: 400px;
      color: #999;
      margin-bottom: 5px;
      padding: 0 20px;
      display: flex;
      align-items: center;
    }
  }
</style>


<style lang="less" type="text/less">
  .my-profile-view {
    .profile-info-item .el-form-item__label {
      width: 100px !important;
    }
  }
</style>
