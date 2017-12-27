export default {
    name: 'showDialogHandler',
    handle(data, appUI, callback) {
        appUI.showToolBar()
        callback && callback()
    }
}