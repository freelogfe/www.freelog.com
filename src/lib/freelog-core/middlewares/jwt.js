// export default function middlewareJWT (ctx, next){
//     transform_request(ctx)
//     return next().then(resp => transform_response(resp))
// }

// function transform_request(ctx) {
//     ctx.req = ctx.req || {};
//     if (!ctx.req.credentials) {
//         ctx.req.credentials= 'same-origin'
//     }
// }

// function transform_response (resp){
//     return resp
// }
  
import MiddlewareBase from './base.js'
export default class MiddlewareJWT extends MiddlewareBase {
    constructor (){
        super()
    }

    transform_request(url, req) {
        req = req || {}
        if (!req.credentials) {
            req.credentials= 'same-origin'
        }
        return [url, req]
    }
    
}