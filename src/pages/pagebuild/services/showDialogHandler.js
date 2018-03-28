export default {
    name: 'showDialogHandler',
    handle(data, app, callback) {
        app.ui.showAuthDialog()
        callback && callback()
    }
}