export default function handleInvalidResponse(vmOptions, options, callback) {
  const response = options.response
  const eventName = getEventName(response)
  window.FreelogApp.trigger.trigger(eventName, options, callback)
}

function getEventName(response) {
  const event = window.FreelogApp.exceptionCode[response.errcode]
  return (event && event.eventName) || window.FreelogApp.eventName.HANDLE_INVALID_AUTH
}
