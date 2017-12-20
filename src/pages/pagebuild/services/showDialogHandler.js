export default {
    name: 'showDialogHandler',
    handle(data, appUI, callback) {
        appUI.showAuthDialog()
        callback && callback()
    }
}