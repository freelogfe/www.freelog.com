webpackJsonp([6],{"1nuA":function(t,n,e){"use strict";n.decode=n.parse=e("kMPS"),n.encode=n.stringify=e("xaZU")},"6UCX":function(t,n,e){"use strict";var a=e("G3VR"),i=e("HkHh"),o=e("NYxO"),s={data:function(){return{}},mounted:function(){!this.user||this.user.userId},computed:Object(o.b)({user:"session"}),components:{NavTopBar:i.a},methods:{}},r={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("nav-top-bar"),t._v(" "),e("el-container",{staticClass:"app-container is-vertical"},[t.user?e("el-header",{staticClass:"header"},[e("div",{staticClass:"banner-portrait inline"},[e("a",{attrs:{href:"/pages/user/index.html"}},[e("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),t._v(" "),e("div",{staticClass:"banner-main  inline"},[e("div",{staticClass:"banner-main-hello"},[e("p",{staticClass:"user-name"},[t._v(t._s(t.user.nickname))])]),t._v(" "),e("div",{staticClass:"banner-main-detail"},[e("div",{staticClass:"user-account inline"},[e("label",[t._v("账户： ")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(" "),e("el-main",{staticStyle:{background:"white"}},[e("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},c=e("VU/8")(s,r,!1,function(t){e("o6xx")},"data-v-5f204498",null).exports,u=e("IcnI");new a.a({el:"#app",store:u.a,render:function(t){return t(c)}});n.a=a.a},H4bk:function(t,n,e){},HkHh:function(t,n,e){"use strict";var a=e("NYxO"),i={name:"nav-top-bar",data:function(){return{}},computed:Object(a.b)({userInfo:"session"}),mounted:function(){this.syncUserSession(),this.listenWindowVisibility()},methods:{listenWindowVisibility:function(){function t(t){var e="visible",i="hidden",o={focus:e,focusin:e,pageshow:e,blur:i,focusout:i,pagehide:i};"visible"===((t=t||window.event).type in o?o[t.type]:this[n]?"hidden":"visible")&&a.syncUserSession()}var n="hidden",e=document,a=this;n in e?e.addEventListener("visibilitychange",t):(n="mozHidden")in e?e.addEventListener("mozvisibilitychange",t):(n="webkitHidden")in e?e.addEventListener("webkitvisibilitychange",t):(n="msHidden")in e?e.addEventListener("msvisibilitychange",t):window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t},syncUserSession:function(){var t=this;this.$store.dispatch("checkUserSession").then(function(n){n||t.$store.dispatch("getCurrentUser").then(function(){location.reload()})})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("userLogout").then(function(){setTimeout(function(){location.replace("/pages/user/login.html")},20)})})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},o={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav-top-wrapper"},[t.userInfo?e("div",{staticClass:"nav-top-container"},[e("ul",{staticClass:"nav-top-right"},[e("li",{staticClass:"nav-top-item"},[e("el-dropdown",{on:{command:t.handleNavTopCommand}},[e("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),e("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),e("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("li",{staticClass:"nav-top-item"},[n("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},s=e("VU/8")(i,o,!1,function(t){e("H4bk")},"data-v-3c0b87cc",null);n.a=s.exports},YnZJ:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("6UCX"),i=e("1nuA"),o=e.n(i),s=e("aIHY"),r={data:function(){return{accountDetail:null}},mounted:function(){var t=this,n=o.a.parse(location.search.slice(1));this.loadAccountDetail(n.accountId).then(this.format.bind(this)).then(function(n){return t.accountDetail=n,n.accountId}).then(this.loadBalance.bind(this))},methods:{initAccountAmount:function(){var t=this,n=this.accountDetail.accountId;return this.$axios.get("/v1/pay/accounts/officaialTap?accountId="+n).then(function(n){var e=n.data;0===e.errcode?(t.accountDetail.balance=e.balance,t.$message.success("执行成功")):t.$message.error(e.msg)})},format:function(t){return t._accountTypeInfo=s.a[t.accountType],t},loadBalance:function(t){var n=this;return this.$axios.get("/v1/pay/accounts/balance/"+t).then(function(t){var e=t.data;0===e.errcode?n.accountDetail.balance=e.data.balance:n.$message.error(e.msg)})},loadAccountDetail:function(t){var n=this;return this.$axios.get("/v1/pay/accounts/"+t).then(function(t){var e=t.data;if(0===e.errcode)return e.data;n.$message.error(e.msg)})}}},c={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"main-app"}},[e("div",{staticStyle:{"margin-bottom":"10px"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.initAccountAmount}},[t._v("初始化账户金额")])],1),t._v(" "),t.accountDetail?e("ul",{staticClass:"account-detail"},[e("li",[e("label",[t._v("accountId")]),t._v(" "),e("span",[t._v(t._s(t.accountDetail.accountId))])]),t._v(" "),e("li",[e("label",[t._v("accountType")]),t._v(" "),e("span",[t._v(t._s(t.accountDetail._accountTypeInfo.name))])]),t._v(" "),e("li",[e("label",[t._v("balance")]),t._v(" "),e("span",[t._v(t._s(t._f("humanizeCurrency")(t.accountDetail.balance))+" "+t._s(t.accountDetail._accountTypeInfo.abbr))])]),t._v(" "),e("li",[e("label",[t._v("cardNo")]),t._v(" "),e("span",[t._v(t._s(t.accountDetail.cardNo))])]),t._v(" "),e("li",[e("label",[t._v("status")]),t._v(" "),e("span",[t._v(t._s(t.accountDetail.status))])]),t._v(" "),e("li",[e("label",[t._v("createDate")]),t._v(" "),e("span",[t._v(t._s(t._f("fmtDate")(t.accountDetail.createDate)))])]),t._v(" "),e("li",[e("label",[t._v("updateDate")]),t._v(" "),e("span",[t._v(t._s(t._f("fmtDate")(t.accountDetail.updateDate)))])])]):t._e()])},staticRenderFns:[]},u=e("VU/8")(r,c,!1,function(t){e("dgb0")},null,null).exports;new a.a({el:"#main-app",render:function(t){return t(u)}})},dgb0:function(t,n,e){},kMPS:function(t,n,e){"use strict";t.exports=function(t,n,e,i){n=n||"&",e=e||"=";var o={};if("string"!=typeof t||0===t.length)return o;var s=/\+/g;t=t.split(n);var r=1e3;i&&"number"==typeof i.maxKeys&&(r=i.maxKeys);var c=t.length;r>0&&c>r&&(c=r);for(var u=0;u<c;++u){var l,d,v,p,f=t[u].replace(s,"%20"),h=f.indexOf(e);h>=0?(l=f.substr(0,h),d=f.substr(h+1)):(l=f,d=""),v=decodeURIComponent(l),p=decodeURIComponent(d),!function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}(o,v)?o[v]=p:a(o[v])?o[v].push(p):o[v]=[o[v],p]}return o};var a=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},o6xx:function(t,n,e){},xaZU:function(t,n,e){"use strict";function a(t,n){if(t.map)return t.map(n);for(var e=[],a=0;a<t.length;a++)e.push(n(t[a],a));return e}var i=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,n,e,r){return n=n||"&",e=e||"=",null===t&&(t=void 0),"object"==typeof t?a(s(t),function(s){var r=encodeURIComponent(i(s))+e;return o(t[s])?a(t[s],function(t){return r+encodeURIComponent(i(t))}).join(n):r+encodeURIComponent(i(t[s]))}).join(n):r?encodeURIComponent(i(r))+e+encodeURIComponent(i(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var n=[];for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.push(e);return n}}},["YnZJ"]);