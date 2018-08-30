export default class MiddlewareBase {
    constructor(){
        this.next = window
    }

    transform_request (url, req) {
        return [url, req]   
    }

    transform_response (resp) {
        return resp
    }

    setNext(mw){
        this.next = mw
    }

    fetch (url, req){
        [ url, req ] = this.transform_request(url, req)
        return this.next.fetch.apply(this.next, [url, req])
                    .then(resp => this.transform_response(resp, { url, req }))
    }
}


