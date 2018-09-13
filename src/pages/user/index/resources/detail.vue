<template>
  <div class="resource-contract-detail-view">
    <account-layout title="资源详情" :showFooter="false" return-name="my-resources">
      待开发
    </account-layout>
  </div>
</template>

<script>
  import AccountLayout from '../layout'

  export default {
    name: 'resource-contract-detail-view',

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

    methods: {}
  }
</script>

<style lang="less" scoped type="text/less">

</style>