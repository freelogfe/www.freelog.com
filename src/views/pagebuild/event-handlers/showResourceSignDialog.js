export default function showResourceSignDialog({ appUiVm }, options, callback) {
  const { presentableList = [] } = options
  if (presentableList.length === 0) return

  appUiVm.showAuthDialog(presentableList)
  appUiVm.$once('close', callback)
}
