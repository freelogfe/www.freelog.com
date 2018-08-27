export default class MiddlewareBase {
    constructor(){}

    transform_request (url, req) {
        return [url, req]
    }

    transform_response (resp) {
        return resp
    }

    fetch (url, req){
        return this.next.fetch.apply(this.next, this.transform_request(url, req))
                    .then(resp => this.transform_response(resp))
    }
}


