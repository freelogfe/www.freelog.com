export default function handleInvalidResponse (inValidResponse, callback){
    var eventName = getEventName(inValidResponse)
    EC.trigger(eventName, inValidResponse, callback)
}

function getEventName (inValidResponse){
    const event = EC.exceptionCode[inValidResponse.errcode]
    return (event && event.eventName) || EC.eventName.HANDLE_INVALID_AUTH
}