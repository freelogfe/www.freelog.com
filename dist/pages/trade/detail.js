webpackJsonp([4],{"1nuA":function(t,e,n){"use strict";e.decode=e.parse=n("kMPS"),e.encode=e.stringify=n("xaZU")},"6N2J":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("6UCX"),r=n("1nuA"),s=n.n(r),o=n("kIFb"),i={data:function(){return{detail:null}},mounted:function(){var t=this,e=s.a.parse(location.search.slice(1));if(!e.contractId)return this.$message.error("参数有误"),void setTimeout(function(){location.href="/pages/user/index.html"},1e3);this.loadContract(e.contractId).then(function(e){return t.loadResourcesDetail(e.resourceId).then(function(t){return{contract:e,resource:t}})}).then(this.format.bind(this)).then(function(e){t.detail=e})},methods:{format:function(t){return t._statusInfo=o.b[t.contract.status],t},loadResourcesDetail:function(t){var e=this;return new Promise(function(n){e.$axios.get("/v1/resources/"+t).then(function(t){n(0===t.data.errcode?t.data.data:null)}).catch(function(){n(null)})})},loadContract:function(t){return this.$axios.get("/v1/contracts/"+t).then(function(t){if(0===t.data.errcode)return t.data.data;throw new Error(t.data.msg)}).catch(function(t){console.log(t)})}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"main-app"}},[n("h3",{staticStyle:{"margin-bottom":"15px"}},[t._v("合同详情")]),t._v(" "),t.detail?n("el-form",{staticClass:"small-el-form",attrs:{"label-width":"100px"}},[n("el-form-item",{staticClass:"form-label",attrs:{label:"合同ID"}},[t._v("\n      "+t._s(t.detail.contract.contractId)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"甲方"}},[t._v("\n      "+t._s(t.detail.contract.partyOne)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"乙方"}},[t._v("\n      "+t._s(t.detail.contract.partyTwo)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"资源名称"}},[t._v("\n      "+t._s(t.detail.resource.resourceName)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"资源类型"}},[t._v("\n      "+t._s(t.detail.resource.resourceType)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"合同创建时间"}},[t._v("\n      "+t._s(t._f("fmtDate")(t.detail.contract.createDate))+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"状态"}},[t._v("\n      "+t._s(t.detail._statusInfo.desc)+"\n    ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"状态"}},[n("pre",[t._v(t._s(t.detail.contract.policySegment.segmentText))])])],1):t._e()],1)},staticRenderFns:[]},l=n("VU/8")(i,c,!1,function(t){n("Q/IK")},"data-v-398ae30c",null).exports;new a.a({el:"#main-app",render:function(t){return t(l)}})},"6UCX":function(t,e,n){"use strict";var a=n("G3VR"),r=n("HkHh"),s=n("NYxO"),o={data:function(){return{}},mounted:function(){var t=this;this.user&&this.user.userId||this.$vuex.dispatch("checkUserSession").then(function(e){t.user=e})},computed:Object(s.b)({user:"session"}),components:{NavTopBar:r.a},methods:{}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("nav-top-bar"),t._v(" "),n("el-container",{staticClass:"app-container"},[t.user?n("el-header",{staticClass:"header"},[n("div",{staticClass:"banner-portrait inline"},[n("a",{attrs:{href:"/pages/user/index.html"}},[n("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),t._v(" "),n("div",{staticClass:"banner-main  inline"},[n("div",{staticClass:"banner-main-hello"},[n("p",{staticClass:"user-name"},[t._v(t._s(t.user.nickname))])]),t._v(" "),n("div",{staticClass:"banner-main-detail"},[n("div",{staticClass:"user-account inline"},[n("label",[t._v("账户： ")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(" "),n("el-main",{staticStyle:{background:"white"}},[n("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},c=n("VU/8")(o,i,!1,function(t){n("LZZm")},"data-v-79685ecc",null).exports,l=n("IcnI");new a.a({el:"#app",store:l.a,render:function(t){return t(c)}});e.a=a.a},HkHh:function(t,e,n){"use strict";var a=n("NYxO"),r={name:"nav-top-bar",data:function(){return{}},computed:Object(a.b)({user:"session"}),mounted:function(){this.checkLoginStatus()},methods:{checkLoginStatus:function(){var t=this;this.user&&this.user.userId||this.$vuex.dispatch("checkUserSession").then(function(e){t.user=e})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("logout")})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-top-wrapper"},[t.user?n("div",{staticClass:"nav-top-container"},[n("ul",{staticClass:"nav-top-right"},[n("li",{staticClass:"nav-top-item"},[n("el-dropdown",{on:{command:t.handleNavTopCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.user.nickname)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),n("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-top-item"},[e("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},o=n("VU/8")(r,s,!1,function(t){n("edu7")},"data-v-0f5da88c",null);e.a=o.exports},LZZm:function(t,e,n){},"Q/IK":function(t,e,n){},edu7:function(t,e,n){},kIFb:function(t,e,n){"use strict";n.d(e,"a",function(){return a}),n.d(e,"b",function(){return r});var a={uncreated:-1,initial:1,running:2,activated:3,userTerminated:4,sysTerminated:5,terminated:6,invalid:0},r={"-1":{type:"danger",desc:"未创建合同"},1:{type:"warning",desc:"未开始执行"},2:{type:"warning",desc:"执行中"},3:{type:"success",desc:"生效中"},4:{type:"info",desc:"用户终止"},5:{type:"info",desc:"系统终止"},6:{type:"info",desc:"合同已终止"}}},kMPS:function(t,e,n){"use strict";t.exports=function(t,e,n,r){e=e||"&",n=n||"=";var s={};if("string"!=typeof t||0===t.length)return s;var o=/\+/g;t=t.split(e);var i=1e3;r&&"number"==typeof r.maxKeys&&(i=r.maxKeys);var c=t.length;i>0&&c>i&&(c=i);for(var l=0;l<c;++l){var u,d,f,m,p=t[l].replace(o,"%20"),v=p.indexOf(n);v>=0?(u=p.substr(0,v),d=p.substr(v+1)):(u=p,d=""),f=decodeURIComponent(u),m=decodeURIComponent(d),!function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(s,f)?s[f]=m:a(s[f])?s[f].push(m):s[f]=[s[f],m]}return s};var a=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},xaZU:function(t,e,n){"use strict";function a(t,e){if(t.map)return t.map(e);for(var n=[],a=0;a<t.length;a++)n.push(e(t[a],a));return n}var r=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,n,i){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?a(o(t),function(o){var i=encodeURIComponent(r(o))+n;return s(t[o])?a(t[o],function(t){return i+encodeURIComponent(r(t))}).join(e):i+encodeURIComponent(r(t[o]))}).join(e):i?encodeURIComponent(r(i))+n+encodeURIComponent(r(t)):""};var s=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}}},["6N2J"]);