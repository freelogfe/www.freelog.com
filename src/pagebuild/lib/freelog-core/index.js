import middlewareAuth from  './middlewares/middleware-auth.js'
import middlewareFetch from  './middlewares/middleware-fetch.js'
import middlewareJWT from  './middlewares/middleware-jwt.js'

import QICore from './QI-core.js'
import createApi from './utils/api.js'

const _QI = new QICore()
                .use(middlewareAuth)
                .use(middlewareFetch)
                .use(middlewareJWT)
const fetch = _QI.fetch.bind(_QI)
const load = _QI.load.bind(_QI)

window.QI = {
    fetch, 
    load,
    ...createApi(fetch),
}

QI.load('/demo.js', { type: 'js', isInject: true })
    .then(() => {
        console.log('load demo.js')
    })

QI.load('http://local.testfreelog.com/api/v1/auths/presentable/5b6d32fce321dc002caf2f3a?nodeId=10023')
    .then(resp =>  resp.json())
    .then(res => {
        console.log('res - ', res)
    })