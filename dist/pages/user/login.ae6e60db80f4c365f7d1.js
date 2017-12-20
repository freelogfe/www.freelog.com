webpackJsonp([1],{"65I7":function(e,t){function n(){function e(e,t){n=t}function t(e,t){var r=e();return void 0!==r?r:n[t]}var n={};return{defaults:e,get:t}}e.exports=n},JtuV:function(e,t,n){"use strict";function r(e){n("k5iO")}Object.defineProperty(t,"__esModule",{value:!0});var i=n("rA12"),o=n("kEHT"),a={name:"login",data:function(){return{model:{loginName:"",password:"",isRememer:!1},rules:{loginName:[{required:!0,message:"请输入账号",trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"长度在 6 到 16 个字符",trigger:"blur"}]},error:null,loading:!1}},mounted:function(){},methods:{submit:function(e){var t=this,n=this;this.$refs[e].validate(function(e){if(!e)return!1;t.error=null,t.loading=!0;var r=Object.assign({},n.model);r.isRememer=r.isRememer?1:0,window.fetch("//api.freelog.com/v1/passport/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}).then(function(e){return t.loading=!1,e.json()}).then(function(e){0===e.ret&&0===e.errcode?(o.a.set("userInfo",e.data),location.href="/pages/user/index.html"):t.error=e.msg})})}}},s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"login-section"},[n("header",{staticClass:"login-header"},[e.error?n("el-alert",{attrs:{title:e.error.title,type:"warning",description:e.error.message,"show-icon":""}}):e._e()],1),e._v(" "),n("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{"auto-complete":"off",model:e.model,rules:e.rules,"label-width":"0"}},[n("h2",{staticClass:"heading"},[e._v("用户登录")]),e._v(" "),n("el-form-item",{attrs:{prop:"loginName"}},[n("el-input",{attrs:{type:"text",placeholder:"请输入用户名"},model:{value:e.model.loginName,callback:function(t){e.$set(e.model,"loginName",t)},expression:"model.loginName"}},[n("template",{slot:"prepend"},[n("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.submit("loginForm")}},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}},[n("template",{slot:"prepend"},[n("i",{staticClass:"fa fa-unlock-alt",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),n("el-form-item",[n("el-checkbox",{model:{value:e.model.isRememer,callback:function(t){e.$set(e.model,"isRememer",t)},expression:"model.isRememer"}},[e._v("记住我")]),e._v(" "),n("span",{staticClass:"user-ops"},[n("a",{staticClass:"user-op",attrs:{href:"/user/reset_pw"}},[e._v("忘记密码")]),e._v(" | "),n("a",{staticClass:"user-op",attrs:{href:"/user/signup"}},[e._v("注册新用户")])])],1),e._v(" "),n("el-form-item",{staticClass:"login-btns"},[n("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submit("loginForm")}}},[e._v(e._s(e.loading?"登陆中...":"登录")+"\n            ")])],1)],1)],1)},u=[],c={render:s,staticRenderFns:u},l=c,f=n("VU/8"),p=r,m=f(a,l,!1,p,"data-v-7a945580",null),d=m.exports;new i.a({el:"#app",render:function(e){return e(d)}})},LpDn:function(e,t,n){(function(t){function n(e,t){return function(){return t.apply(e,Array.prototype.slice.call(arguments,0))}}function r(e,t){return Array.prototype.slice.call(e,t||0)}function i(e,t){a(e,function(e,n){return t(e,n),!1})}function o(e,t){var n=s(e)?[]:{};return a(e,function(e,r){return n[r]=t(e,r),!1}),n}function a(e,t){if(s(e)){for(var n=0;n<e.length;n++)if(t(e[n],n))return e[n]}else for(var r in e)if(e.hasOwnProperty(r)&&t(e[r],r))return e[r]}function s(e){return null!=e&&"function"!=typeof e&&"number"==typeof e.length}function u(e){return e&&"[object Function]"==={}.toString.call(e)}function c(e){return e&&"[object Object]"==={}.toString.call(e)}var l=function(){return Object.assign?Object.assign:function(e,t,n,r){for(var o=1;o<arguments.length;o++)i(Object(arguments[o]),function(t,n){e[n]=t});return e}}(),f=function(){function e(){}return Object.create?function(e,t,n,i){var o=r(arguments,1);return l.apply(this,[Object.create(e)].concat(o))}:function(t,n,i,o){var a=r(arguments,1);return e.prototype=t,l.apply(this,[new e].concat(a))}}(),p=function(){return String.prototype.trim?function(e){return String.prototype.trim.call(e)}:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}}(),m="undefined"!=typeof window?window:t;e.exports={assign:l,create:f,trim:p,bind:n,slice:r,each:i,map:o,pluck:a,isList:s,isFunction:u,isObject:c,Global:m}}).call(t,n("DuR2"))},RuI5:function(e,t,n){function r(){return l.localStorage}function i(e){return r().getItem(e)}function o(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(i(n),n)}}function s(e){return r().removeItem(e)}function u(){return r().clear()}var c=n("LpDn"),l=c.Global;e.exports={name:"localStorage",read:i,write:o,each:a,remove:s,clearAll:u}},SGDr:function(e,t,n){function r(){var e="undefined"==typeof console?null:console;if(e){(e.warn?e.warn:e.log).apply(e,arguments)}}function i(e,t,n){n||(n=""),e&&!f(e)&&(e=[e]),t&&!f(t)&&(t=[t]);var i=n?"__storejs_"+n+"_":"",o=n?new RegExp("^"+i):null;if(!/^[a-zA-Z0-9_\-]*$/.test(n))throw new Error("store.js namespaces can only have alphanumerics + underscores and dashes");var g={_namespacePrefix:i,_namespaceRegexp:o,_testStorage:function(e){try{var t="__storejs__test__";e.write(t,t);var n=e.read(t)===t;return e.remove(t),n}catch(e){return!1}},_assignPluginFnProp:function(e,t){var n=this[t];this[t]=function(){function t(){if(n)return u(arguments,function(e,t){r[t]=e}),n.apply(i,r)}var r=a(arguments,0),i=this,o=[t].concat(r);return e.apply(i,o)}},_serialize:function(e){return JSON.stringify(e)},_deserialize:function(e,t){if(!e)return t;var n="";try{n=JSON.parse(e)}catch(t){n=e}return void 0!==n?n:t},_addStorage:function(e){this.enabled||this._testStorage(e)&&(this.storage=e,this.enabled=!0)},_addPlugin:function(e){var t=this;if(f(e))return void u(e,function(e){t._addPlugin(e)});if(!s(this.plugins,function(t){return e===t})){if(this.plugins.push(e),!p(e))throw new Error("Plugins must be function values that return objects");var n=e.call(this);if(!m(n))throw new Error("Plugins must return an object of function properties");u(n,function(n,r){if(!p(n))throw new Error("Bad plugin property: "+r+" from plugin "+e.name+". Plugins should only return functions.");t._assignPluginFnProp(n,r)})}},addStorage:function(e){r("store.addStorage(storage) is deprecated. Use createStore([storages])"),this._addStorage(e)}},h=l(g,d,{plugins:[]});return h.raw={},u(h,function(e,t){p(e)&&(h.raw[t]=c(h,e))}),u(e,function(e){h._addStorage(e)}),u(t,function(e){h._addPlugin(e)}),h}var o=n("LpDn"),a=o.slice,s=o.pluck,u=o.each,c=o.bind,l=o.create,f=o.isList,p=o.isFunction,m=o.isObject;e.exports={createStore:i};var d={version:"2.0.12",enabled:!1,get:function(e,t){var n=this.storage.read(this._namespacePrefix+e);return this._deserialize(n,t)},set:function(e,t){return void 0===t?this.remove(e):(this.storage.write(this._namespacePrefix+e,this._serialize(t)),t)},remove:function(e){this.storage.remove(this._namespacePrefix+e)},each:function(e){var t=this;this.storage.each(function(n,r){e.call(t,t._deserialize(n),(r||"").replace(t._namespaceRegexp,""))})},clearAll:function(){this.storage.clearAll()},hasNamespace:function(e){return this._namespacePrefix=="__storejs_"+e+"_"},createStore:function(){return i.apply(this,arguments)},addPlugin:function(e){this._addPlugin(e)},namespace:function(e){return i(this.storage,this.plugins,e)}}},k5iO:function(e,t,n){},kEHT:function(e,t,n){"use strict";var r=n("SGDr"),i=n.n(r),o=n("RuI5"),a=n.n(o),s=n("uY+Y"),u=n.n(s),c=n("65I7"),l=n.n(c),f=n("wwqQ"),p=n.n(f),m=[u.a,a.a],d=[l.a,p.a],g=i.a.createStore(m,d);t.a=g},"uY+Y":function(e,t,n){function r(){return l.sessionStorage}function i(e){return r().getItem(e)}function o(e,t){return r().setItem(e,t)}function a(e){for(var t=r().length-1;t>=0;t--){var n=r().key(t);e(i(n),n)}}function s(e){return r().removeItem(e)}function u(){return r().clear()}var c=n("LpDn"),l=c.Global;e.exports={name:"sessionStorage",read:i,write:o,each:a,remove:s,clearAll:u}},wwqQ:function(e,t){function n(){function e(e,t,n,i){return this.hasNamespace(r)||s.set(t,i),e()}function t(e,t){return this.hasNamespace(r)||a.call(this,t),e()}function n(e,t){return this.hasNamespace(r)||s.remove(t),e()}function i(e,t){return s.get(t)}function o(e){var t=[];this.each(function(e,n){t.push(n)});for(var n=0;n<t.length;n++)a.call(this,t[n])}function a(e){s.get(e,Number.MAX_VALUE)<=(new Date).getTime()&&(this.raw.remove(e),s.remove(e))}var s=this.createStore(this.storage,null,this._namespacePrefix+r);return{set:e,get:t,remove:n,getExpiration:i,removeExpiredKeys:o}}var r="expire_mixin";e.exports=n}},["JtuV"]);
//# sourceMappingURL=login.ae6e60db80f4c365f7d1.js.map