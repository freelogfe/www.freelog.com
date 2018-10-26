/**
 * 使用中间件模式封装window.fetch
 */

import MiddlewareAuth from './middlewares/auth'
import MiddlewareFetch from './middlewares/resolveReq'
import MiddlewareJWT from './middlewares/jwt'

class QICore {
  constructor() {
    this.middlewares = []
  }

  use(instance) {
    const leng = this.middlewares.length
    if (leng) {
      this.middlewares[leng - 1].setNext(instance)
    }
    this.middlewares.push(instance)

    return this
  }

  fetch(url, req) {
    if (!/^(https?:)?\/\//.test(url)) {
      url = `${window.FreelogApp.Env.qiOrigin}${url}`
    }
    return this.middlewares[0].fetch(url, req)
  }
}

const QIIns = new QICore()
  .use(new MiddlewareAuth())
  .use(new MiddlewareFetch())
  .use(new MiddlewareJWT())

export default function load(...args) {
  QIIns.fetch(...args)
}