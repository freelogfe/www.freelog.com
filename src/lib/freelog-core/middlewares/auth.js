
import MiddlewareBase from './base.js'
export default class MiddlewareAuth extends MiddlewareBase {
  constructor (){
    super()
  }
  
  transform_response (resp){
    return resp
  }
}

// export default function middlewareAuth (ctx, next){
//   return next().then(resp => transform_response(resp))
// }

// function transform_response (resp){
//   return resp
// }