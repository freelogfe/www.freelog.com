<template>
  <div class="account-withdraw-view">
    <account-layout title="提现" :showFooter="false">
      待开发
    </account-layout>
  </div>
</template>


<script>
import AccountLayout from '../layout.vue'

export default {
  name: 'account-withdraw-view',

  data() {
    return {}
  },

  props: {
  },

  components: { AccountLayout },

  mounted() {
  },

  computed: {
    renderData() {
      return this.$route.query
    }
  },

  methods: {
    cancelHandler() {
      this.goBack()
    },
    goBack() {
      this.$router.push('/accounts')
      // this.$store.dispatch('changePanel', 'my-accounts')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
