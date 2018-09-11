<template>
  <div class="account-withdraw-view">
    <account-layout title="提现" :showFooter="false">
      待开发
    </account-layout>
  </div>
</template>


<script>
  import AccountLayout from '../layout'

  export default {
    name: 'account-withdraw-view',

    data() {

      return {}
    },

    props: {
      renderData: Object
    },

    components: {AccountLayout},

    mounted() {
      console.log(this.renderData)
    },

    computed: {},

    methods: {
      cancelHandler() {
        this.goBack()
      },
      goBack() {
        this.$store.dispatch('changePanel', 'my-accounts')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>