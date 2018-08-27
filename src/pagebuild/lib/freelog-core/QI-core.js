import compose from './utils/compose.js'
import * as api from './utils/api.js'

export default class QICore{
    constructor(){
        this.middleware = []
    }

    /**
     * Use the given middleware `fn`.
     *
     * @param {Function} fn
     * @return {Application} self
     * @api public
     */
    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
        this.middleware.push(fn)
        return this
    }

    /**
     *
     * @param {String} url
     * @param {Object} req
     * @return {Promise} 
     * @api public
     */
    fetch(url, req) {
        if (!/^(https?:)?\/\//.test(url) && !/^\/api/.test(url)) {
            url = '/api' + url
        }
        var fn = compose([...this.middleware, ({url, req}) => {
            return window.fetch(url, req)
        }])
        return fn({ url, req})
    } 

    /**
     * use to load resource
     *
     * @param {String} url
     * @param {Object} options
     * @return {Promise} 
     * @api public
     */
    load (url, options){
        if(typeof options === 'object'){
            const { type, isInject, $targetDom = document.getElementsByTagName('head')[0] } = options
            if(isInject && type){
                switch(type){
                    case 'js': {
                        return new Promise((resolve, reject) => {
                            const script = document.createElement("script")
                            script.type = "text/javascript"
                            script.src = url
                            script.onload = script.onreadystatechange = function (){
                                if (!script.readyState || script.readyState == "loaded" || script.readyState == 'complete') {
                                    console.log('script onLoaded !')
                                    resolve()
                                }
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
                            link.onload = resolve
                            link.onerror = reject
                            $targetDom.appendChild(link)
                        })
                    }
                }
            }
        }

        return this.fetch(url)
    }
}