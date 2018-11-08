export default function showResourceSignDialog({ appUiVm }, options, callback) {
  const { presentableList = [], activePresentableId } = options
  if (presentableList.length === 0) return

  appUiVm.showAuthDialog(presentableList, activePresentableId)
  appUiVm.$once('close', callback)
}
