webpackJsonp([3],{"1nuA":function(t,e,n){"use strict";e.decode=e.parse=n("kMPS"),e.encode=e.stringify=n("xaZU")},"6N2J":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("6UCX"),r=n("1nuA"),i=n.n(r),s=n("kIFb"),o={data:function(){return{detail:null}},mounted:function(){var t=this,e=i.a.parse(location.search.slice(1));if(!e.contractId)return this.$message.error("参数有误"),void setTimeout(function(){location.href="/pages/user/index.html"},1e3);this.loadContract(e.contractId).then(function(e){return t.loadResourcesDetail(e.resourceId).then(function(t){return{contract:e,resource:t}})}).then(this.format.bind(this)).then(function(e){t.detail=e})},methods:{format:function(t){return t._statusInfo=s.b[t.contract.status],t},loadResourcesDetail:function(t){var e=this;return new Promise(function(n){e.$axios.get("/v1/resources/"+t).then(function(t){n(0===t.data.errcode?t.data.data:null)}).catch(function(){n(null)})})},loadContract:function(t){return this.$axios.get("/v1/contracts/"+t).then(function(t){if(0===t.data.errcode)return t.data.data;throw new Error(t.data.msg)}).catch(function(t){console.log(t)})}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"main-app"}},[n("h3",{staticStyle:{"margin-bottom":"15px"}},[t._v("合同详情")]),t._v(" "),t.detail?n("el-form",{staticClass:"small-el-form",attrs:{"label-width":"100px"}},[n("el-form-item",{staticClass:"form-label",attrs:{label:"合同ID"}},[t._v("\n      "+t._s(t.detail.contract.contractId)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"甲方"}},[t._v("\n      "+t._s(t.detail.contract.partyOne)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"乙方"}},[t._v("\n      "+t._s(t.detail.contract.partyTwo)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"资源名称"}},[t._v("\n      "+t._s(t.detail.resource.resourceName)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"资源类型"}},[t._v("\n      "+t._s(t.detail.resource.resourceType)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"合同创建时间"}},[t._v("\n      "+t._s(t._f("fmtDate")(t.detail.contract.createDate))+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"状态"}},[t._v("\n      "+t._s(t.detail._statusInfo.desc)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"状态"}},[n("pre",[t._v(t._s(t.detail.contract.policySegment.segmentText))])])],1):t._e()],1)},staticRenderFns:[]},l=n("VU/8")(o,c,!1,function(t){n("Q/IK")},"data-v-398ae30c",null).exports;new a.a({el:"#main-app",render:function(t){return t(l)}})},"6UCX":function(t,e,n){"use strict";var a=n("G3VR"),r=n("HkHh"),i=n("NYxO"),s={data:function(){return{}},mounted:function(){this.user&&this.user.userId||this.$vuex.dispatch("getCurrentUserInfo").then(function(t){})},computed:Object(i.b)({user:"session"}),components:{NavTopBar:r.a},methods:{}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("nav-top-bar"),t._v(" "),n("el-container",{staticClass:"app-container is-vertical"},[t.user?n("el-header",{staticClass:"header"},[n("div",{staticClass:"banner-portrait inline"},[n("a",{attrs:{href:"/pages/user/index.html"}},[n("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),t._v(" "),n("div",{staticClass:"banner-main  inline"},[n("div",{staticClass:"banner-main-hello"},[n("p",{staticClass:"user-name"},[t._v(t._s(t.user.nickname))])]),t._v(" "),n("div",{staticClass:"banner-main-detail"},[n("div",{staticClass:"user-account inline"},[n("label",[t._v("账户： ")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(" "),n("el-main",{staticStyle:{background:"white"}},[n("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},c=n("VU/8")(s,o,!1,function(t){n("ICYG")},"data-v-4fc94ec2",null).exports,l=n("IcnI");new a.a({el:"#app",store:l.a,render:function(t){return t(c)}});e.a=a.a},H4bk:function(t,e,n){},HkHh:function(t,e,n){"use strict";var a=n("NYxO"),r={name:"nav-top-bar",data:function(){return{}},computed:Object(a.b)({userInfo:"session"}),mounted:function(){this.syncUserSession(),this.listenWindowVisibility()},methods:{listenWindowVisibility:function(){function t(t){var n="visible",r="hidden",i={focus:n,focusin:n,pageshow:n,blur:r,focusout:r,pagehide:r};"visible"===((t=t||window.event).type in i?i[t.type]:this[e]?"hidden":"visible")&&a.syncUserSession()}var e="hidden",n=document,a=this;e in n?n.addEventListener("visibilitychange",t):(e="mozHidden")in n?n.addEventListener("mozvisibilitychange",t):(e="webkitHidden")in n?n.addEventListener("webkitvisibilitychange",t):(e="msHidden")in n?n.addEventListener("msvisibilitychange",t):window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t},syncUserSession:function(){var t=this;this.$store.dispatch("checkUserSession").then(function(e){e||t.$store.dispatch("loadCurrentUserInfo").then(function(){location.reload()})})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("userLogout").then(function(){setTimeout(function(){location.replace("/pages/user/login.html")},20)})})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-top-wrapper"},[t.userInfo?n("div",{staticClass:"nav-top-container"},[n("ul",{staticClass:"nav-top-right"},[n("li",{staticClass:"nav-top-item"},[n("el-dropdown",{on:{command:t.handleNavTopCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),n("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-top-item"},[e("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},s=n("VU/8")(r,i,!1,function(t){n("H4bk")},"data-v-3c0b87cc",null);e.a=s.exports},ICYG:function(t,e,n){},"Q/IK":function(t,e,n){},kIFb:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r});var a={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6,invalid:0},r={"-1":{type:"danger",desc:"未创建合同"},1:{type:"warning",desc:"未开始执行"},2:{type:"warning",desc:"执行中"},3:{type:"success",desc:"生效中"},4:{type:"info",desc:"用户终止"},5:{type:"info",desc:"系统终止"},6:{type:"info",desc:"合同已终止"}}},kMPS:function(t,e,n){"use strict";function a(t,e){return Object.prototype.hasOwnProperty.call(t,e)}t.exports=function(t,e,n,i){e=e||"&",n=n||"=";var s={};if("string"!=typeof t||0===t.length)return s;var o=/\+/g;t=t.split(e);var c=1e3;i&&"number"==typeof i.maxKeys&&(c=i.maxKeys);var l=t.length;c>0&&l>c&&(l=c);for(var u=0;u<l;++u){var d,f,m,p,v=t[u].replace(o,"%20"),h=v.indexOf(n);h>=0?(d=v.substr(0,h),f=v.substr(h+1)):(d=v,f=""),m=decodeURIComponent(d),p=decodeURIComponent(f),a(s,m)?r(s[m])?s[m].push(p):s[m]=[s[m],p]:s[m]=p}return s};var r=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},xaZU:function(t,e,n){"use strict";function a(t,e){if(t.map)return t.map(e);for(var n=[],a=0;a<t.length;a++)n.push(e(t[a],a));return n}var r=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,n,o){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?a(s(t),function(s){var o=encodeURIComponent(r(s))+n;return i(t[s])?a(t[s],function(t){return o+encodeURIComponent(r(t))}).join(e):o+encodeURIComponent(r(t[s]))}).join(e):o?encodeURIComponent(r(o))+n+encodeURIComponent(r(t)):""};var i=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}}},["6N2J"]);