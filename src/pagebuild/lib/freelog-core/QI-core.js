export default class QICore {
    constructor (){
        this.middlewares = []
    }

    use (instance){
        var leng = this.middlewares.length
        if(leng){
            this.middlewares[leng - 1].next = instance
            instance.next = window
        }
        this.middlewares.push(instance)
        
        return this
    }

    fetch (url, req){
        return this.middlewares[0].fetch(url, req)
    }
}

// export default class QICore{
//     constructor(){
//         this.middleware = []
//     }
//     /**
//      * use to load resource
//      *
//      * @param {String} url
//      * @param {Object} options
//      * @return {Promise} 
//      * @api public
//      */
//     load (url, options){
//         if(typeof options === 'object'){
//             const { type, isInject, $targetDom = document.getElementsByTagName('head')[0] } = options
//             if(isInject && type){
//                 switch(type){
//                     case 'js': {
//                         return new Promise((resolve, reject) => {
//                             const script = document.createElement("script")
//                             script.type = "text/javascript"
//                             script.src = url
//                             script.onload = script.onreadystatechange = function (){
//                                 if (!script.readyState || script.readyState == "loaded" || script.readyState == 'complete') {
//                                     console.log('script onLoaded !')
//                                     resolve()
//                                 }
//                             }
//                             script.onerror = reject
//                             $targetDom.appendChild(script)
//                         })
                        
//                     }
//                     case 'css': {
//                         return new Promise((resolve, reject) => {
//                             const link = document.createElement("link")
//                             link.ref = 'stylesheet'
//                             link.type = 'test/css'
//                             link.href = url
//                             link.onload = resolve
//                             link.onerror = reject
//                             $targetDom.appendChild(link)
//                         })
//                     }
//                 }
//             }
//         }

//         return this.fetch(url)
//     }
// }