export default function showResourceSignDialog({ appUiVm }, options, callback) {
  const { presentableList = [] } = options
  if (presentableList.length === 0) return

  if (presentableList.length > 1) {
    appUiVm.showMultiAuthDialog(presentableList)
  } else {
    appUiVm.showSingleAuthDialog(presentableList[0])
  }

  appUiVm.$once('close', callback)
}
