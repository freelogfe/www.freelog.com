export default function handleInvalidResponse(vmOptions, options, callback) {
  const response = options.response
  const eventName = getEventName(response)
  console.log(eventName, response.errcode)
  window.FreelogApp.trigger(eventName, options, callback)
}

function getEventName(response) {
  const event = window.FreelogApp.exceptionCodes[response.errcode]
  return (event && event.eventName) || window.FreelogApp.eventNames.HANDLE_INVALID_AUTH
}
