export default class QICore {
    constructor (){
        this.middlewares = []
    }

    use (instance){
        var leng = this.middlewares.length
        if(leng){
            this.middlewares[leng - 1].setNext(instance)
        }
        this.middlewares.push(instance)
        
        return this
    }

    fetch (url, req){
        if (!/^(https?:)?\/\//.test(url) && !/^\/api/.test(url)) {
          url = '/api' + url
        }
        return this.middlewares[0].fetch(url, req)
    }
}

