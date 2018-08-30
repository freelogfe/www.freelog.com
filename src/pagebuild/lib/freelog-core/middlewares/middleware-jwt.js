export default function middlewareJWT (ctx, next){
    transform_request(ctx)
    return next().then(resp => transform_response(resp))
}

function transform_request(ctx) {
    ctx.req = ctx.req || {};
    if (!ctx.req.credentials) {
        ctx.req.credentials= 'same-origin'
    }
}

function transform_response (resp){
    return resp
}


