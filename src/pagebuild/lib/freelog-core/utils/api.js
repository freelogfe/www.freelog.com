/**
 * 概念说明：
 * 1. 资源：即一个数据文件，可以是一个文本、图片、音频、视频和软件等；
 * 2. 资源详情：指一个资源的名称、描述、依赖、授权策略等信息的集合；
 * 3. presentable：即一个节点资源的别称，其映射一个资源，节点须与该资源签订合同后方可使用；节点可根据自身需求对presentable指定授权策略；
 * 4. presentable详情：指一个presentable的名称、描述、资源ID、合同状态、授权策略和标签等信息的集合；
 * 5. 节点资源详情：presentable映射资源的资源详情
 */

export default function createApi(fetch) {
  return {
    // 获取节点的presentables列表
    fetchPresentablesList(params = {}) {
      params = Object.assign({
        nodeId: window.__auth_info__.__auth_node_id__
      }, params)
      return fetch(`v1/presentables`, {data: params})
    },
    // 获取单个presentable的详情
    fetchPresentableInfo(presentableId) {
      return fetch(`v1/presentables/${presentableId}`)
    },
    _fetchPresentableResource(target, params = {}) {
      var url = `/v1/auths/presentable/${target}`

      params = Object.assign({
        nodeId: window.__auth_info__.__auth_node_id__
      }, params)
      return fetch(url, {data: params})
    },
    //获取节点资源的数据内容
    fetchPresentableResourceData(presentableId, params) {
      return this._fetchPresentableResource(`${presentableId}.data`, params)
    },
    //获取节点资源的详情信息
    fetchPresentableResourceInfo(presentableId, params) {
      return this._fetchPresentableResource(`${presentableId}.info`, params)
    },
  }

}