import * as util from '../utils/util.js'
import MiddlewareBase from './base.js'

export default class MiddlewareFetch extends MiddlewareBase {
    constructor (){
        super()
    }
  
    transform_request(url, req) {
        req = req || {}
        var method = (req.method || 'get').toLowerCase()
        if (req.data) {
            if (method === 'get') {
                var qs = util.getQueryString(req.data)
                url += (url.indexOf('?') > -1 ? '&' : '?') + qs
            } else {
                var headers = req.headers || {}
                var data = req.data
                var body
                if (util.isFormData(data) ||
                    util.isArrayBuffer(data) ||
                    util.isStream(data) ||
                    util.isFile(data) ||
                    util.isBlob(data)) {
                    body = data
                }else if (util.isArrayBufferView(data)) {
                    body = data.buffer
                }else if (util.isURLSearchParams(data)) {
                    this.setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
                    body = data.toString()
                }else if (util.isObject(data)) {
                    this.setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
                    body = JSON.stringify(data)
                }
                req.headers = headers
                req.body = body
            }
            delete req.data
        }
        return [ url, req ]
    }

    transform_response (resp){
        var headers = resp.headers
        var rids = headers.get('freelog-sub-resourceids')
        return resp
    }

    setContentTypeIfUnset(headers, value) {
        if (!headers['content-type'] && !headers['Content-Type']) {
            headers['Content-Type'] = value
        }
    }
      
}

// export default function middlewareFetch (ctx, next){
//     transform_request(ctx)
//     return next().then(resp => transform_response(resp))
// }

// function setContentTypeIfUnset(headers, value) {
//     if (!headers['content-type'] && !headers['Content-Type']) {
//         headers['Content-Type'] = value
//     }
// }



// function transform_response (resp){
//     var headers = resp.headers
//     var rids = headers.get('freelog-sub-resourceids')
//     return resp
//   }