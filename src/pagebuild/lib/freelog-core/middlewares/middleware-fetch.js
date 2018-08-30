import * as util from '../utils/util.js'

export default function middlewareFetch(ctx, next) {
  transform_request(ctx)

  return next().then(resp => transform_response(resp))
}

function setContentTypeIfUnset(headers, value) {
  if (!headers['content-type'] && !headers['Content-Type']) {
    headers['Content-Type'] = value
  }
}

function transform_request(ctx) {
  ctx.req = ctx.req || {}
  var req = ctx.req
  var method = (req.method || 'get').toLowerCase()
  if (req.data) {
    if (method === 'get') {
      var qs = util.getQueryString(req.data)
      ctx.url += (ctx.url.indexOf('?') > -1 ? '&' : '?') + qs
    } else {
      var headers = req.headers || {}
      var data = req.data
      var body
      if (util.isFormData(data) ||
        util.isArrayBuffer(data) ||
        util.isBuffer(data) ||
        util.isStream(data) ||
        util.isFile(data) ||
        util.isBlob(data)) {
        body = data
      }
      if (util.isArrayBufferView(data)) {
        body = data.buffer
      }
      if (util.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8')
        body = data.toString()
      }
      if (util.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
        body = JSON.stringify(data)
      }
      req.headers = headers
      req.body = body
    }
    delete req.data
  }
}

function transform_response(resp) {
  var headers = resp.headers
  var rids = headers.get('freelog-sub-resourceids')
  return resp
}