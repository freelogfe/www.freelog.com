import MiddlewareAuth from  './middlewares/auth.js'
import MiddlewareFetch from  './middlewares/resolveReq.js'
import MiddlewareJWT from  './middlewares/jwt.js'

import QICore from './QI-core.js'
import createApi from './api.js'

const _QI = new QICore()
                .use(new MiddlewareAuth())
                .use(new MiddlewareFetch())
                .use(new MiddlewareJWT())
const fetch = _QI.fetch.bind(_QI)

window.FreelogApp = window.FreelogApp || {}
Object.defineProperty(window.FreelogApp, 'QI', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: Object.freeze({
        fetch, 
        ...createApi(fetch),
    })
})


