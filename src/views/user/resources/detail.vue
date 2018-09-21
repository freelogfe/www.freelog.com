<template>
  <div class="resource-contract-detail-view">
    <account-layout ref="layout" title="资源详情" :showFooter="false" return-name="/resources">

      <single-contract
              style="width: 100%"
              v-if="presentable && contractIDs.length"
              :presentable="presentable"
              :contractIDs="contractIDs"
              @close-dialog="goBack"
      ></single-contract>
    </account-layout>

  </div>
</template>

<script>
  import singleContract from '@/views/pagebuild/views/resource-contract/single-contract.vue'
  import { mapGetters } from 'vuex'
  import AccountLayout from '../layout.vue'

export default {
  name: 'resource-contract-detail-view',

  data() {
    return {
      presentable: null,
      contractIDs: []
    }
  },

  props: {
  },

  components: { AccountLayout, singleContract },

  mounted() {
    const { presentableId, contractId } = this.$route.query
    this.$axios.get(`/v1/presentables/${presentableId}`)
      .then(res => {
        console.log('res- ', res)
        if(res.data.errcode === 0 && res.data.data){
          console.log('in')
          this.presentable = res.data.data
          this.contractIDs = [ contractId ]
        }
      })
  },

  computed: {
    ...mapGetters({
      user: 'session'
    })
  },


  methods: {
    goBack (){
      this.$refs.layout.goBack()
    }

  },

  destroyed (){
    clearTimeout(this.timer)
  }
}
</script>

<style lang="less" scoped type="text/less">

</style>
