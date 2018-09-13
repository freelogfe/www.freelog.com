export default function handleInvalidResponse ({ appUiVm }, options, callback){
    var response = options.response
    var eventName = getEventName(response)
    eventCenter.trigger(eventName, options, callback)
}

function getEventName (response){
    const event = eventCenter.exceptionCode[response.errcode]
    return (event && event.eventName) || eventCenter.eventName.HANDLE_INVALID_AUTH
}