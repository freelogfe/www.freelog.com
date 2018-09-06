/**
 * 概念说明：
 * 1. 资源：即一个数据文件，可以是一个文本、图片、音频、视频和软件等；
 * 2. 资源详情：指一个资源的名称、描述、依赖、授权策略等信息的集合；
 * 3. presentable：即一个节点资源的别称，其映射一个资源，节点须与该资源签订合同后方可使用；节点可根据自身需求对presentable指定授权策略；
 * 4. presentable详情：指一个presentable的名称、描述、资源ID、合同状态、授权策略和标签等信息的集合；
 * 5. 节点资源详情：presentable映射资源的资源详情
 */
import * as helpers from './utils/helpers.js'

export default function createApi(fetch, options){
    var resourceLoadedState = new Map()
    var resourceIDsMap = new Map()
    var nodeId = window.__auth_info__.__auth_node_id__

    return {
        // 获取节点的presentables列表
        fetchPresentablesList (params = {}){
            params = Object.assign({  nodeId }, params)
            return fetch(`/v1/presentables`, { data: params })
                    .then(resp => resp.json())
        },
        // 获取单个presentable的详情
        fetchPresentableInfo (presentableId){
            return fetch(`/v1/presentables/${presentableId}`)
                    .then(resp => resp.json())
        },
        //获取节点资源的数据内容
        fetchPresentableResourceData(presentableId, params) {
            return _fetchPresentableResource(`${presentableId}`, params)
        },
        //获取节点资源的详情信息
        fetchPresentableResourceInfo(presentableId, params) {
            return _fetchPresentableResource(`${presentableId}.info`, params)
                    .then(resp => resp.json())
        },
        fetchSubResource (resourceId){
            return this.resolveResourceUrl({ resourceId })
                        .then(resourceUrl => fetch(resourceUrl))
        },
        requireSubResource (resourceId, token){   
            // 已经加载的资源不再加载
            if(resourceLoadedState.get(resourceId)) return Promise.resolve()
            var type = '', promise = null

            if(token){
                const resourceUrl = `/api/v1/auths/presentable/subResource/${resourceId}?token=${token}`
                promise = fetch(resourceUrl)
                resourceIDsMap.set(resourceId, token)
            }else{
                promise = this.fetchSubResource(resourceId)
            }

            return promise
                        .then(resp => {
                            var contentType = resp.headers.get('content-type')
                            if(/css/.test(contentType)){
                                type = 'text/css'
                                return resp.text()
                            }else if(/javascript/.test(contentType)){
                                type = 'text/javascript'
                                return resp.text()
                            } else{
                                return resp.json()
                            }
                        })
                        .then(res => {
                            if(typeof res.errcode === 'undefined'){
                                return loadResource.call(this, res, type)
                            }else{
                                return Promise.reject(res)
                            }
                        })

            function loadResource (res, type){
                var file = new File([res], '${resourceId}', { type })
                var url = window.URL.createObjectURL(file)
                switch(type){
                    case 'text/javascript': {
                        return helpers.createScript(url)
                                .then(() => resourceLoadedState.set(resourceId, true))
                    }
                    case 'text/css': {
                        return helpers.createCssLink(url)
                                .then(() => resourceLoadedState.set(resourceId, true))
                    }
                    default: return Promise.reject('wrong type!')
                }
            }
        },
        resolveResourceUrl ({ presentableId, resourceId }){
            if(resourceId){
                var token = resourceIDsMap.get(resourceId)
                if(token){
                    return Promise.resolve(`/api/v1/auths/presentable/subResource/${resourceId}?token=${token}`)
                }

                if(presentableId){
                    return _fetchPresentableResource(`${presentableId}`)
                                .then(resp => resp.json())
                                .then(res => {
                                    let token = resourceIDsMap.get(resourceId)
                                    if(token){
                                        return Promise.resolve(`/api/v1/auths/presentable/subResource/${resourceId}?token=${token}`)
                                    }
                                })
                                .catch(e => {
                                    return Promise.reject(`no found token! error: ${e}`)
                                })
                }
            }else{
                if(presentableId){
                    return Promise.resolve(`/api/v1/auths/presentable/${presentableId}?nodeId=${nodeId}`)
                }
            }
            return Promise.reject('no found token!')
        }
    }


    function _fetchPresentableResource(target, params = {}) {
        var url = `/v1/auths/presentable/${target}`

        params = Object.assign({ nodeId }, params)
        return fetch(url, { data: params })
                .then(resp => {
                    var headers = resp.headers
                    var rids = headers.get('freelog-sub-resourceids')
                    var token = headers.get('freelog-sub-resource-auth-token')

                    if(rids && token){
                        rids.split(',').forEach(id => {
                            resourceIDsMap.set(id, token)
                        })
                    }

                    return resp
                })
    }
}

