export default function middlewareAuth (ctx, next){
  return next().then(resp => transform_response(resp))
}

function transform_response (resp){
  return resp
}
