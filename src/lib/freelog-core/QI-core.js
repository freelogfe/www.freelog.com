export default class QICore {
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
      const host = location.origin.replace(/\/\/[^.]+/, '//qi')
      url = `${host}${url}`
    }
    return this.middlewares[0].fetch(url, req)
  }
}

