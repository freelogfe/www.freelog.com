export default {
    name: 'showDialogHandler',
    handle(data, app, callback) {
        app.ui.showToolBar()
        callback && callback()
    }
}