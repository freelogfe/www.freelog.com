export default {
    name: 'tool-bar',
    data() {
        return {}
    },
    mounted() {

    },
    methods: {
        showAuthDialog() {
            window.FreeLogApp.trigger(window.FreeLogApp.EventCode.showSystemDialog, {
                callback: function () {
                    console.log('close dialog@toolbar')
                }
            })
        }
    }
}