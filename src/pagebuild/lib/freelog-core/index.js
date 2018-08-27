import MiddlewareAuth from  './middlewares/auth.js'
import MiddlewareFetch from  './middlewares/formatReq.js'
import MiddlewareJWT from  './middlewares/jwt.js'

import QICore from './QI-core.js'
import createApi from './utils/api.js'

const _QI = new QICore()
                .use(new MiddlewareAuth())
                .use(new MiddlewareFetch())
                .use(new MiddlewareJWT())
const fetch = _QI.fetch.bind(_QI)
// const load = _QI.load.bind(_QI)

window.QI = {
    fetch, 
    // load,
    ...createApi(fetch),
}
