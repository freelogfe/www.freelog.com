


export default {
    name: 'tool-bar',
    data(){
        return {

        }
    },
    mounted(){

    },
    methods: {
        showAuthDialog(){
            var event = new CustomEvent('freelogService', {detail: {
                action: 'showAuthDialog'
            }});
            window.dispatchEvent(event)
        }
    }
}