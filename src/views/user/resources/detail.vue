<template>
  <div class="resource-contract-detail-view">
    <account-layout title="资源详情" :showFooter="false" return-name="/resources">
      待开发
    </account-layout>
  </div>
</template>

<script>
import AccountLayout from '../layout.vue'

export default {
  name: 'resource-contract-detail-view',

  data() {
    return {}
  },

  props: {
  },

  components: { AccountLayout },

  mounted() {
    console.log(this.$route.params.resourceId)
  },

  computed: {},

  methods: {}
}
</script>

<style lang="less" scoped type="text/less">

</style>
