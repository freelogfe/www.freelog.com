/**
 * 概念说明：
 * 1. 资源：即一个数据文件，可以是一个文本、图片、音频、视频和软件等；
 * 2. 资源详情：指一个资源的名称、描述、依赖、授权策略等信息的集合；
 * 3. presentable：即一个节点资源的别称，其映射一个资源，节点须与该资源签订合同后方可使用；节点可根据自身需求对presentable指定授权策略；
 * 4. presentable详情：指一个presentable的名称、描述、资源ID、合同状态、授权策略和标签等信息的集合；
 * 5. 节点资源详情：presentable映射资源的资源详情
 */

export default function createApi(fetch, options){
    var resourceLoadedState = new Map()
    var resourceIDsMap = new Map()

    return {
        // 获取节点的presentables列表
        fetchPresentablesList (params = {}){
            params = Object.assign({
                nodeId: window.__auth_info__.__auth_node_id__
            }, params)
            return fetch(`v1/presentables`, { data: params })
        },
        // 获取单个presentable的详情
        fetchPresentableInfo (presentableId, params = {}){
            return fetch(`v1/presentables/${presentableId}`)
        },
        _fetchPresentableResource(target, params = {}) {
            var url = `/v1/auths/presentable/${target}`

            params = Object.assign({
                nodeId: window.__auth_info__.__auth_node_id__
            }, params)
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
        },
        //获取节点资源的数据内容
        fetchPresentableResourceData(presentableId, params) {
            return this._fetchPresentableResource(`${presentableId}`, params)
        },
        //获取节点资源的详情信息
        fetchPresentableResourceInfo(presentableId, params) {
            return this._fetchPresentableResource(`${presentableId}.info`, params)
                    .then(resp => resp.json())
        },
        requireSubResource (resourceId, { type,  $targetDom = document.getElementsByTagName("head").item(0) }){   
            // 已经加载的资源不再加载
            if(resourceLoadedState.get(resourceId)) return 

            var resourceUrl = resolveResourceUrl(resourceId)
            if(resourceUrl == '')  return Promise.reject('error: no token!')

            return fetch(resourceUrl)
                        .then(resp => resp.text())
                        .then(res => {
                            if(typeof res.errcode !== 'undefined'){
                                return loadResource(res, type)
                            }else{
                                return Promise.reject(res)
                            }
                        })
        
            

            function loadResource (res, type){
                var file = new File([res], '${resourceId}.js', {
                    type: 'text/javascript'
                })
                var url = window.URL.createObjectURL(file)
                switch(type){
                    case 'js': {
                        return new Promise((resolve, reject) => {
                            const script = document.createElement("script")
                            script.type = "text/javascript"
                            script.src = url
                            script.onload = function (){
                                resourceLoadedState.set(resourceId, true)
                                resolve()
                            }
                            script.onerror = reject
                            $targetDom.appendChild(script)
                        })
                        
                    }
                    case 'css': {
                        return new Promise((resolve, reject) => {
                            const link = document.createElement("link")
                            link.ref = 'stylesheet'
                            link.type = 'test/css'
                            link.href = url
                            link.onload = function (){
                                resourceLoadedState.set(resourceId, true)
                                resolve()
                            }
                            link.onerror = reject
                            $targetDom.appendChild(link)
                        })
                    }
                    default: return Promise.reject('wrong type!')
                }
            }

            function resolveResourceUrl (resourceId){
                var token = resourceIDsMap.get(resourceId)
                if(token){
                    return `/v1/auths/presentable/subResource/${resourceId}?token=${token}`
                }else{
                    return ''
                }
            }

        }
    }
        
}

