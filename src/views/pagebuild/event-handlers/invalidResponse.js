export default function handleInvalidResponse(vmOptions, options, callback) {
  const response = options.response
  const eventName = getEventName(response)
  window.FreelogApp.trigger(eventName, options, callback)
}

function getEventName(response) {
  const event = window.FreelogApp.exceptionCode[response.errcode]
  return (event && event.eventName) || window.FreelogApp.eventNames.HANDLE_INVALID_AUTH
}
