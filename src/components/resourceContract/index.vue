<template>
    <div class="resource-contract-box">
        <div class="rcb-id-box">
            <label class="rcb-name">资源ID</label>
            <div class="rcb-value">{{resourceId}}</div>
        </div>
        <div class="rcb-type-box">
            <label class="rcb-name">资源类型</label>
            <div class="rcb-value">{{resourceType}}</div>
        </div>
        <div class="rcb-intro-box">
            <label class="rcb-name">资源描述</label>
            <div class="rcb-value">{{resourceIntro}}</div>
        </div>
        <div class="rcb-tab-box">
            <ul>
                <li 
                    class="rcb-tab-item"
                    :class="{'active': index == actContractIndex}" 
                    v-for="(item, index) in constractList" 
                    :key="'rc-tab-'+(index+1)"
                    @click="exchangeContract(index)"
                >{{item.name}}</li>
            </ul>
        </div>
        <div class="rcb-tab-pane">
            <div class="rcb-tp-status-bar">
                {{signStatus}}
            </div>
        </div>
        <div class="rcb-footer">
            <button class="btn-normal btn-cancel">取消</button>
            <button type="button" class="btn-normal btn-sign">签约</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        presentableId: {
            type: String
        }
    },
    data (){
        return {
            resourceId: '5b5aeafa84e4de002b540156',
            resourceType: 'markdown',
            resourceIntro: '音乐播放器是一种用于播放各种音乐文件的多媒体播放软件。它涵盖了各种音乐格式的播放工具，比如：MP3播放器，WMA播放器，MP4播放器等。它们不仅界面美观，而且操作简单，带你进入一个完美的音乐空间。',
            constractList: [
                { name: '授权策略1', contractId: '5b6d54b084e4de002b54031e', status: 1 },
                { name: '授权策略2', contractId: '5b6d335184e4de002b540318', status: 3 }
            ],
            actContractIndex: 0
        }
    },
    methods: {
        exchangeContract (index){
            this.actContractIndex = index
        },
    },
    computed: {
        actContract (){
            return this.constractList[this.actContractIndex]
        },
        signStatus (){  
            
            switch(this.actContract.status){
                case 1: return '未签约'
                case 2: return '不可用'
                case 3: return `合同ID ${actContract.contractId}`
                case 4: {}
                case 5: {}
                case 6: return '合同终止'
            }
        }
    }
}
</script>

<style lang="less" scoped>
.rcb-name{ display: inline-block; width: 80px; color: #666; }
.rcb-value{ display: inline-block; font-size: 14px; font-weight: bold; color: #222; }
.rcb-id-box, .rcb-type-box, .rcb-intro-box{
    display: inline-block; margin-top: 20px;
}
.rcb-id-box{ width: 425px;}
.rcb-intro-box{ 
    display: flex; width: 100%;
    .rcb-value{ flex: 1; }
}
.rcb-tab-box{
    margin-top: 20px;

    .rcb-tab-item{
        display: inline-block;
        margin: 0 12px; line-height: 32px; color: #999; cursor: pointer;
        font-size: 14px; font-weight: bold;

        &.active{ border-bottom: 3px solid #4396F0; color: #222; }
    }
}
.rcb-tab-pane{
    position: relative; overflow-y: scroll;
    height: 282px; padding-bottom: 46px; border: 1px solid #CECECE; border-radius: 4px;

    .rcb-tp-status-bar{
        position: absolute; left: 0; right: 0; bottom: 0; 
        height: 46px; padding: 0 10px; border-top: 1px solid #CECECE;
        background: #F3F5F5; color: #333; font-size: 12px; line-height: 46px;
    }
}
.rcb-footer{
    padding-top: 20px; text-align: right;

    .btn-normal{
        padding: 10px 26px; font-size: 14px; border: none; outline: 0;

        &.btn-cancel{ color: #666; }
        &.btn-sign{ border: 1px solid #CECECE; border-radius: 4px; color: #333; }
    }
}
</style>


