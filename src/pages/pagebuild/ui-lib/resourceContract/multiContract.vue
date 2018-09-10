<template>
    <div v-if="visible">
        <div class="cutoff-line"></div>
        <div class="sc-content">
            <div class="sc-left-box sc-resource-list">
                <ul>
                    <li
                        class="sc-resource-item"
                        :class="{'active': index == selectedIndex}"
                        v-for="(item, index) in presentableList"
                        :key="'sc-item-' + (index + 1)"
                        @click="selectedResource(index)"
                    >
                        {{item.presentableName}}
                        <div class="sc-tag-box">
                            <span class="sc-tag sc-tag-active">可用</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sc-cutoff-line-2"></div>
            <div class="sc-right-box">
                <resource-contract :presentableId="selectedPresentableId"></resource-contract>
            </div>
        </div>
    </div>
</template>

<script>
import resourceContract from './index.vue'
export default {
    name: 'multi-contract',
    props: {
        presentableList:{
            type: Array,
            required: true
        },
        selectedPresentableId: {
            type: String,
            required: true
        },
        visible: {
            type: Boolean,
            default: false
        },
    },
    data (){
        return {
            selectedIndex: 1,
            // presentableList: [
            //     { presentableName: '中华文明史 第一章 文明的起源', resourceId: '', status: 1 },
            //     { presentableName: '中华文明史 第二章 母系社会的发展历程', resourceId: '', status: 1 },
            //     { presentableName: '中华文明史 第三章 部落文化与冲突', resourceId: '', status: 1 },
            //     { presentableName: '中华文明史 第四章 中华文明的根基与发展', resourceId: '', status: 1 },
            //     { presentableName: '中华文明史 第五章 我国现代社会主义的发..', resourceId: '', status: 1 },
            // ],
        }
    },
    methods :{
        selectedResource (index){
            this.selectedIndex = index
        }
    },
    computed: {
        title (){
            return '资源签约&nbsp;&nbsp;&nbsp;&nbsp;' + window.location.host
        }
    },
    components: {
        resourceContract,
    },
    mounted (){
        try{
            this.presentableList.forEach((item, index) => {
                if(item.presentableId == this.selectedPresentableId){
                    this.selectedIndex = index
                    // 抛错误，提前退出遍历
                    throw new Error()
                }
            })
        }catch(e){

        }
        
    }
}
</script>

<style lang='less' scoped>

.cutoff-line{ position: relative; top: -20px; height: 1px; margin: 0 -20px; background: #ddd; }
.sc-content{
    position: relative;
    display: flex; margin: 0 -20px;
}
.sc-left-box{
    width: 300px; 
}
.sc-cutoff-line-2{ position: absolute; left: 300px; top: -20px; bottom: -20px; width: 1px; background-color: #ddd; }
.sc-right-box{
    position: relative; top: -20px;
    flex: 1; padding: 0 20px;
}

.sc-resource-list{ position: relative; }
.sc-resource-list ul{ 
    overflow-y: scroll;
    position: absolute; left: 0; top: -20px; bottom: -20px; right: 0; 
}

.sc-resource-item{
    white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
    padding: 10px 20px; border-bottom: 1px solid #eee;
    font-size: 14px; color: #222;

    &.active{
        padding-left: 17px; border-left: 3px solid #3C99FC; background-color: #f4f4f4;
    }

    .sc-tag{
        font-size: 10px; border: 1px solid; padding: 0 8px; border-radius: 20px;

        &.sc-tag-active{ color: #45BC7B; border-color: #45BC7B; }
        &.sc-tag-inactive{ color: #E36161; border-color: #E36161; }
        &.sc-tag-nosign{ color: #fff; border-color: #999; background: #999; }
        &.sc-tag-terminate{ color: #fff; border-color: #DA6666; background: #DA6666; }
    }
}

</style>

