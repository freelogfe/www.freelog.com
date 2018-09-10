<template>
    <div v-if="visible">
        <div class="cutoff-line"></div>
        <div class="sc-content">
            <div class="sc-cont-header">
                {{presentableName}}
                <span 
                    :class="['sc-tag', `sc-tag-${resourceState.type}`]" 
                    v-if="resourceState.type != 'active'"
                >{{resourceState.tagName}}</span>    
            </div>
            <resource-contract :presentable="presentable" :contractsPolicyMap="contractsPolicyMap" @cancel-sign="cancelSgin"></resource-contract>
        </div>
    </div>
</template>

<script>
import resourceContract from './index.vue'
export default {
    name: 'single-contract',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        presentable: {
            tyep: Object,
            required: true
        },
        contracts: {
            type: Array,
        }
    },
    data (){
        return {
            resourceName: '暗黑风格音乐播放器插件',
            defaultContract: null,
        }
    },
    methods :{
        // 根据合同获取 资源标签状态
        getReourceState (contract){
            if(contract == null){
                return { type: 'nosign', tagName: '未签约', info: '未签约' }
            }else{
                switch(contract.status){
                    case 1:
                    case 2: return { type: 'inactive', tagName: '不可用', info: `合同ID ${contract.contractId}` }
                    case 3: return { type: 'active', tagName: '可用', info: `合同ID ${contract.contractId}` }
                    case 4:
                    case 5: 
                    case 6: return { type: 'terminate', tagName: '合同终止', info: '合同终止' }
                }
            }
        },
        // 处理策略与合同的关系
        resolvePolicyContractMap (){
            this.policyList.forEach(policy => {
                var contract = this.contractsPolicyMap.get(policy.segmentId) || null
                policy.resourceState = this.getReourceState(contract)
            })
        },
        // 重新部分参数
        reInitialData (){
            this.defaultContract = this.contracts.length ? this.contracts[0] : null
            this.resolvePolicyContractMap()
        },
        // 点击取消
        cancelSgin ( ){
            this.$emit('close-modal')
        }
    },
    computed: {
        // modal biaoti
        title (){
            return '资源签约&nbsp;&nbsp;&nbsp;&nbsp;' + window.location.host
        },
        // 节点资源名称
        presentableName (){
            return this.presentable.presentableName
        },
        // 策略集合
        policyList (){
            return this.presentable.policy
        },
        // 资源标签状态
        resourceState (){
            return this.getReourceState(this.defaultContract)
        },
        // 合同与策略的关系
        contractsPolicyMap(){
            var map = new Map()
            this.contracts.forEach(contract => map.set(contract.segmentId, contract))
            return map
        }
    },
    components: {
        resourceContract,
    },
    beforeMount (){
        this.reInitialData()
    },
    beforeUpdate (){
        this.reInitialData()
    }
}
</script>

<style lang='less' scoped>
.sc-fe-modal-footer{
    padding: 0 45px; text-align: right;

    .btn-normal{
        padding: 10px 26px; font-size: 14px; border: none; outline: 0;

        &.btn-cancel{ color: #666; }
        &.btn-sign{ border: 1px solid #CECECE; border-radius: 4px; color: #333; }
    }
}

.cutoff-line{ position: relative; top: -20px; height: 1px; margin: 0 -20px; background: #ddd; }
.sc-content{
    padding: 0 45px;


    .sc-cont-header{
        padding: 5px 0 10px; border-bottom: 1px solid #eee;
        font-size: 16px; color: #222; font-weight: bold;

        .sc-tag{
            position: relative; top: -2px;
            margin-left: 10px; border: 1px solid; padding: 0 8px; border-radius: 20px;font-size: 10px; 

            &.sc-tag-active{ color: #45BC7B; border-color: #45BC7B; }
            &.sc-tag-inactive{ color: #E36161; border-color: #E36161; }
            &.sc-tag-nosign{ color: #fff; border-color: #999; background: #999; }
            &.sc-tag-terminate{ color: #fff; border-color: #DA6666; background: #DA6666; }
        }
    }
}


</style>

