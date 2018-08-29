export function getQueryString(params) {
    var esc = encodeURIComponent
    return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&')
}

export function getDataType(val) {
    return Object.prototype.toString.call(val)
}


export function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData)
}

export function isArrayBuffer(val) {
    return this.getDataType(val) === '[object ArrayBuffer]'
}

export function isArrayBufferView(val) {
    var result
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
        result = ArrayBuffer.isView(val)
    } else {
        result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer)
    }
    return result
}

export function isFile(val) {
    return this.getDataType(val) === '[object File]'
}

export function isBlob(val) {
    return this.getDataType(val) === '[object Blob]'
}

export function isStream(val) {
    return this.isObject(val) && this.isFunction(val.pipe)
}

export function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
}

export function isObject(val) {
    return val !== null && typeof val === 'object'
}

export function isFunction(val) {
    return this.getDataType(val) === '[object Function]'
}