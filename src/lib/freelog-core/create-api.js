import APIGenerator from './api-core'

export default function createApi() {
  const apiGen = new APIGenerator()
  const api = {}
  const apiList = [
    'fetchPresentablesList', 'fetchPresentableInfo', 'fetchPresentableResourceData', 'fetchPresentableResourceInfo', 'fetchSubResource', 'requireSubResource', 'resolveResourceUrl', 'resolveSubResourceUrl', 'fetch'
  ]
  apiList.forEach((name) => {
    api[name] = function (...args) {
      return apiGen[name](...args)
    }
  })
  return api
  // return {
  //   fetchPresentablesList(...args) {
  //     return apiGen.fetchPresentablesList(...args)
  //   },
  //   fetchPresentableInfo(...args) {
  //     return apiGen.fetchPresentableInfo(...args)
  //   },
  //   fetchPresentableResourceData(...args) {
  //     return apiGen.fetchPresentableResourceData(...args)
  //   },
  //   fetchPresentableResourceInfo(...args) {
  //     return apiGen.fetchPresentableResourceInfo(...args)
  //   },
  //   fetchSubResource(...args) {
  //     return apiGen.fetchSubResource(...args)
  //   },
  //   requireSubResource(...args) {
  //     return apiGen.requireSubResource(...args)
  //   },
  //   resolveResourceUrl(...args) {
  //     return apiGen.resolveResourceUrl(...args)
  //   },
  //   resolveSubResourceUrl(...args) {
  //     return apiGen.getSubResourceUrl(...args)
  //   },
  //   fetch(...args){
  //     return apiGen.fetch(...args)
  //   }
  // }
}
