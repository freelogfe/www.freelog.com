import APIGenerator from './api-core'

export default function createApi() {
  const apiGen = new APIGenerator()

  return {
    fetchPresentablesList(...args) {
      return apiGen.fetchPresentablesList(...args)
    },
    fetchPresentableInfo(...args) {
      return apiGen.fetchPresentableInfo(...args)
    },
    fetchPresentableResourceData(...args) {
      return apiGen.fetchPresentableResourceData(...args)
    },
    fetchPresentableResourceInfo(...args) {
      return apiGen.fetchPresentableResourceInfo(...args)
    },
    fetchSubResource(...args) {
      return apiGen.fetchSubResource(...args)
    },
    requireSubResource(...args) {
      return apiGen.requireSubResource(...args)
    },
    resolveResourceUrl(...args) {
      return apiGen.resolveResourceUrl(...args)
    },
    fetch(...args){
      apiGen.fetch(...args)
    }
  }
}

