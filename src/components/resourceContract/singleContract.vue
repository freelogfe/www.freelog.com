<template>
    <div>
        <fe-modal
            :title="title"
            width="750px"
            :visible.sync="visible"
        >
            <div class="cutoff-line"></div>
            <div class="sc-content">
                <div class="sc-cont-header">
                    {{resourceName}}
                    <span class="sc-tag sc-tag-nosign">未签约</span>    
                </div>
                <resource-contract></resource-contract>
            </div>
        </fe-modal>
    </div>
</template>

<script>
import feModal from '@/components/modal/modal.vue'
import resourceContract from './index.vue'
export default {
    name: 'single-contract',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        presentableId: {
            tyep: Boolean,
            required: true
        }
    },
    data (){
        return {
            resourceName: '暗黑风格音乐播放器插件'
        }
    },
    methods :{
        
    },
    computed: {
        title (){
            return '资源签约&nbsp;&nbsp;&nbsp;&nbsp;' + window.location.host
        }
    },
    components: {
        feModal,
        resourceContract,
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

        .sc-tag-nosign{
            position: relative; top: -2px;
            padding: 2px 10px; border-radius: 12px;
            background: #989898; color: #fff; font-size: 10px;
        }
    }
}


</style>

