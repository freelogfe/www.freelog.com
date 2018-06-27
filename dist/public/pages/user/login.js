webpackJsonp([10],{"1nuA":function(e,t,r){"use strict";t.decode=t.parse=r("kMPS"),t.encode=t.stringify=r("xaZU")},JtuV:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("fnIZ"),o=(r("kEHT"),r("1nuA")),s=r.n(o),a={name:"login",data:function(){return{model:{loginName:"",password:"",isRememer:!1},rules:{loginName:[{required:!0,message:"请输入账号",trigger:"blur"},{validator:function(e,t,r){t?/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(t)||/^1[34578]\d{9}$/.test(t)?r():r(new Error("账号格式有误，输入正确的手机号或邮箱")):r(new Error("账号不能为空"))},trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,message:"长度至少6个字符",trigger:"blur"}]},error:null,loading:!1}},mounted:function(){},methods:{isSafe:function(e){var t=new URL(e);return!(!/^.+\.freelog\.com$/.test(t.hostname)&&!/^\/[^\/]+/.test(e))},submit:function(e){var t=this,r=this;this.$refs[e].validate(function(e){if(!e)return!1;t.error=null,t.loading=!0;var n=Object.assign({},r.model);n.isRememer=n.isRememer?1:0,t.$store.dispatch("userLogin",n).then(function(){t.loading=!1;var e=s.a.parse(location.search.slice(1)).redirect||"/pages/user/index.html";isSafe(e)?location.href=e:location.href="/pages/user/index.html"}).catch(function(e){t.loading=!1,t.error={message:e}})})}}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-wrapper"},[r("div",{staticClass:"login-section"},[r("header",{staticClass:"login-header"},[e.error?r("el-alert",{attrs:{title:e.error.title,type:"warning",description:e.error.message,"show-icon":""}}):e._e()],1),e._v(" "),r("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{"auto-complete":"off",model:e.model,rules:e.rules,"label-width":"0"}},[r("h2",{staticClass:"heading"},[e._v("用户登录")]),e._v(" "),r("el-form-item",{attrs:{prop:"loginName"}},[r("el-input",{attrs:{type:"text",placeholder:"请输入用户名"},model:{value:e.model.loginName,callback:function(t){e.$set(e.model,"loginName",t)},expression:"model.loginName"}},[r("template",{slot:"prepend"},[r("i",{staticClass:"fa fa-user",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{type:"password",placeholder:"请输入密码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.submit("loginForm")}},model:{value:e.model.password,callback:function(t){e.$set(e.model,"password",t)},expression:"model.password"}},[r("template",{slot:"prepend"},[r("i",{staticClass:"fa fa-unlock-alt",attrs:{"aria-hidden":"true"}})])],2)],1),e._v(" "),r("el-form-item",[r("el-checkbox",{model:{value:e.model.isRememer,callback:function(t){e.$set(e.model,"isRememer",t)},expression:"model.isRememer"}},[e._v("记住我")]),e._v(" "),r("span",{staticClass:"user-ops"},[r("a",{staticClass:"user-op",attrs:{href:"//console.freelog.com/user/reset_pw"}},[e._v("忘记密码")]),e._v(" | "),r("a",{staticClass:"user-op",attrs:{href:"//console.freelog.com/user/signup?redirect=%2F%2Fwww.freelog.com%2Fpages%2Fuser%2Findex.html"}},[e._v("注册新用户")])])],1),e._v(" "),r("el-form-item",{staticClass:"login-btns"},[r("el-button",{staticStyle:{width:"100%"},attrs:{type:"primary",loading:e.loading},on:{click:function(t){e.submit("loginForm")}}},[e._v(e._s(e.loading?"登陆中...":"登录")+"\n        ")])],1)],1)],1)])},staticRenderFns:[]},l=r("VU/8")(a,i,!1,function(e){r("sbei")},"data-v-1ba0ea42",null).exports;Object(n.a)({render:function(e){return e(l)}})},fnIZ:function(e,t,r){"use strict";var n=r("G3VR"),o=r("IcnI");t.a=function(e){new n.a(Object.assign({el:"#app",store:o.a},e))}},kMPS:function(e,t,r){"use strict";function n(e,t){return Object.prototype.hasOwnProperty.call(e,t)}e.exports=function(e,t,r,s){t=t||"&",r=r||"=";var a={};if("string"!=typeof e||0===e.length)return a;var i=/\+/g;e=e.split(t);var l=1e3;s&&"number"==typeof s.maxKeys&&(l=s.maxKeys);var c=e.length;l>0&&c>l&&(c=l);for(var u=0;u<c;++u){var d,m,p,f,g=e[u].replace(i,"%20"),v=g.indexOf(r);v>=0?(d=g.substr(0,v),m=g.substr(v+1)):(d=g,m=""),p=decodeURIComponent(d),f=decodeURIComponent(m),n(a,p)?o(a[p])?a[p].push(f):a[p]=[a[p],f]:a[p]=f}return a};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},sbei:function(e,t,r){},xaZU:function(e,t,r){"use strict";function n(e,t){if(e.map)return e.map(t);for(var r=[],n=0;n<e.length;n++)r.push(t(e[n],n));return r}var o=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};e.exports=function(e,t,r,i){return t=t||"&",r=r||"=",null===e&&(e=void 0),"object"==typeof e?n(a(e),function(a){var i=encodeURIComponent(o(a))+r;return s(e[a])?n(e[a],function(e){return i+encodeURIComponent(o(e))}).join(t):i+encodeURIComponent(o(e[a]))}).join(t):i?encodeURIComponent(o(i))+r+encodeURIComponent(o(e)):""};var s=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},a=Object.keys||function(e){var t=[];for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.push(r);return t}}},["JtuV"]);