webpackJsonp([5],{"1nuA":function(t,e,n){"use strict";e.decode=e.parse=n("kMPS"),e.encode=e.stringify=n("xaZU")},"6UCX":function(t,e,n){"use strict";var r=n("G3VR"),a=n("HkHh"),o=n("NYxO"),s={data:function(){return{}},mounted:function(){!this.user||this.user.userId},computed:Object(o.b)({user:"session"}),components:{NavTopBar:a.a},methods:{}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("nav-top-bar"),t._v(" "),n("el-container",{staticClass:"app-container is-vertical"},[t.user?n("el-header",{staticClass:"header"},[n("div",{staticClass:"banner-portrait inline"},[n("a",{attrs:{href:"/pages/user/index.html"}},[n("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),t._v(" "),n("div",{staticClass:"banner-main  inline"},[n("div",{staticClass:"banner-main-hello"},[n("p",{staticClass:"user-name"},[t._v(t._s(t.user.nickname))])]),t._v(" "),n("div",{staticClass:"banner-main-detail"},[n("div",{staticClass:"user-account inline"},[n("label",[t._v("账户： ")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(" "),n("el-main",{staticStyle:{background:"white"}},[n("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},c=n("VU/8")(s,i,!1,function(t){n("o6xx")},"data-v-5f204498",null).exports,l=n("IcnI");new r.a({el:"#app",store:l.a,render:function(t){return t(c)}});e.a=r.a},H4bk:function(t,e,n){},HkHh:function(t,e,n){"use strict";var r=n("NYxO"),a={name:"nav-top-bar",data:function(){return{}},computed:Object(r.b)({userInfo:"session"}),mounted:function(){this.syncUserSession(),this.listenWindowVisibility()},methods:{listenWindowVisibility:function(){function t(t){var n="visible",a="hidden",o={focus:n,focusin:n,pageshow:n,blur:a,focusout:a,pagehide:a};"visible"===((t=t||window.event).type in o?o[t.type]:this[e]?"hidden":"visible")&&r.syncUserSession()}var e="hidden",n=document,r=this;e in n?n.addEventListener("visibilitychange",t):(e="mozHidden")in n?n.addEventListener("mozvisibilitychange",t):(e="webkitHidden")in n?n.addEventListener("webkitvisibilitychange",t):(e="msHidden")in n?n.addEventListener("msvisibilitychange",t):window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t},syncUserSession:function(){var t=this;this.$store.dispatch("checkUserSession").then(function(e){e||t.$store.dispatch("getCurrentUser").then(function(){location.reload()})})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("userLogout").then(function(){setTimeout(function(){location.replace("/pages/user/login.html")},20)})})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav-top-wrapper"},[t.userInfo?n("div",{staticClass:"nav-top-container"},[n("ul",{staticClass:"nav-top-right"},[n("li",{staticClass:"nav-top-item"},[n("el-dropdown",{on:{command:t.handleNavTopCommand}},[n("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),n("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),n("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-top-item"},[e("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},s=n("VU/8")(a,o,!1,function(t){n("H4bk")},"data-v-3c0b87cc",null);e.a=s.exports},PWJh:function(t,e,n){},kMPS:function(t,e,n){"use strict";t.exports=function(t,e,n,a){e=e||"&",n=n||"=";var o={};if("string"!=typeof t||0===t.length)return o;var s=/\+/g;t=t.split(e);var i=1e3;a&&"number"==typeof a.maxKeys&&(i=a.maxKeys);var c=t.length;i>0&&c>i&&(c=i);for(var l=0;l<c;++l){var u,d,f,m,p=t[l].replace(s,"%20"),v=p.indexOf(n);v>=0?(u=p.substr(0,v),d=p.substr(v+1)):(u=p,d=""),f=decodeURIComponent(u),m=decodeURIComponent(d),!function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(o,f)?o[f]=m:r(o[f])?o[f].push(m):o[f]=[o[f],m]}return o};var r=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},o6xx:function(t,e,n){},shkE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("6UCX"),a=n("1nuA"),o=n.n(a),s=n("aIHY"),i={data:function(){return{showPayDialog:!1,rules:{targetId:[{required:!0,message:"请输入合同ID",trigger:"blur"}],fromAccountId:[{required:!0,message:"请输入发起账户",trigger:"blur"}],toAccountId:[{required:!0,message:"请输入接收账户",trigger:"blur"}],amount:[{required:!0,message:"请输入转账金额",trigger:"blur"},{validator:function(t,e,n){var r=!isNaN(parseFloat(e));""===e?n(new Error("请输入转账金额")):r?e<=0?n(new Error("转账金额不能为0")):n():n(new Error("转账金额输入不合法"))},trigger:"blur"}]},loading:!1,accounts:[],transferForm:{targetId:"",fromAccountId:"",toAccountId:"",amount:"",password:"",orderType:1}}},computed:{selectedAccount:function(){for(var t=this.accounts,e=0,n=t.length;e<n;e++)if(t[e].accountId===this.transferForm.fromAccountId)return t[e];return{_info:{}}}},mounted:function(){var t=this;this.queryAccounts().then(this.formatAccounts.bind(this)).then(function(e){t.accounts=e}),this.autoFillForm()},methods:{autoFillForm:function(){var t=this,e=o.a.parse(location.search.slice(1));Object.keys(this.transferForm).forEach(function(n){e[n]&&(t.transferForm[n]=e[n])})},formatAccounts:function(t){return t.forEach(function(t){t._info=s.a[t.accountType]}),t},showPayDialogHandler:function(){var t=this;this.$refs.transferForm.validate(function(e,n){e?t.showPayDialog=!0:console.log(n)})},hidePayDialogHandler:function(){this.showPayDialog=!1},queryAccounts:function(){var t=this;return this.$axios.get("/v1/pay/accounts").then(function(e){if(0===e.data.errcode)return e.data.data;t.$message.error(e.data.msg)})},confirmTransfer:function(){var t=this;if(!this.loading){this.loading=!0;var e=Object.assign({},this.transferForm);e.amount=1e3*e.amount,this.$axios.post("/v1/pay",{data:e}).then(function(e){var n=e.data;t.showPayDialog=!1,t.loading=!1,0===n.ret&&0===n.errcode?t.renderPayResult(n):t.$message.error(n.msg)}).catch(function(){t.loading=!1,t.showPayDialog=!1})}},renderPayResult:function(){}}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("h3",[t._v("转账")]),t._v(" "),n("el-form",{ref:"transferForm",staticClass:"transfer-form",attrs:{model:t.transferForm,rules:t.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"合同号",prop:"targetId"}},[n("el-input",{attrs:{clearable:""},model:{value:t.transferForm.targetId,callback:function(e){t.$set(t.transferForm,"targetId",e)},expression:"transferForm.targetId"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"发起账户",prop:"fromAccountId"}},[n("el-select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择账户"},model:{value:t.transferForm.fromAccountId,callback:function(e){t.$set(t.transferForm,"fromAccountId",e)},expression:"transferForm.fromAccountId"}},t._l(t.accounts,function(t){return n("el-option",{key:t.accountId,attrs:{label:t.cardNo,value:t.accountId}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"接收账户",prop:"toAccountId"}},[n("el-input",{attrs:{clearable:""},model:{value:t.transferForm.toAccountId,callback:function(e){t.$set(t.transferForm,"toAccountId",e)},expression:"transferForm.toAccountId"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"转账金额",prop:"amount"}},[n("el-input",{staticStyle:{width:"250px"},model:{value:t.transferForm.amount,callback:function(e){t.$set(t.transferForm,"amount",e)},expression:"transferForm.amount"}},[n("template",{slot:"append"},[t._v(t._s(t.selectedAccount._info.abbr))])],2)],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:t.showPayDialogHandler}},[t._v("下一步")])],1)],1),t._v(" "),n("el-dialog",{attrs:{title:"转账确认",visible:t.showPayDialog,width:"30%"},on:{"update:visible":function(e){t.showPayDialog=e}}},[n("el-form",{attrs:{"label-width":"100px"}},[n("el-form-item",{staticClass:"form-label",attrs:{label:"发起账户"}},[t._v("\n        "+t._s(t.transferForm.fromAccountId)+"\n      ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"接收账户"}},[t._v("\n        "+t._s(t.transferForm.toAccountId)+"\n      ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"转账金额"}},[t._v("\n        "+t._s(t.transferForm.amount)+" feth\n      ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"合同ID"}},[t._v("\n        "+t._s(t.transferForm.targetId)+"\n      ")]),t._v(" "),n("el-form-item",{staticClass:"form-label",attrs:{label:"订单类型"}},[t._v("\n        支付合同\n      ")]),t._v(" "),n("el-form-item",{attrs:{label:"支付密码"}},[n("el-input",{staticStyle:{width:"90%"},attrs:{type:"password",placeholder:"请输入密码",clearable:""},model:{value:t.transferForm.password,callback:function(e){t.$set(t.transferForm,"password",e)},expression:"transferForm.password"}}),t._v(" "),n("el-tooltip",{attrs:{placement:"left"}},[n("div",{staticClass:"pay-pw-tips",attrs:{slot:"content"},slot:"content"},[n("p",[n("a",{attrs:{href:"/pages/account/security.html"}},[t._v("忘记支付密码？去重置 >")])]),t._v(" "),n("p",[n("a",{attrs:{href:"/pages/account/security.html"}},[t._v("没有创建支付密码？去创建 >")])])]),t._v(" "),n("i",{staticClass:"el-icon-question"})])],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.hidePayDialogHandler}},[t._v("取消支付")]),t._v(" "),n("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.confirmTransfer}},[t._v("确定支付")])],1)],1)],1)},staticRenderFns:[]},l=n("VU/8")(i,c,!1,function(t){n("PWJh")},"data-v-37918e6b",null).exports;new r.a({el:"#main-app",render:function(t){return t(l)}})},xaZU:function(t,e,n){"use strict";function r(t,e){if(t.map)return t.map(e);for(var n=[],r=0;r<t.length;r++)n.push(e(t[r],r));return n}var a=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,n,i){return e=e||"&",n=n||"=",null===t&&(t=void 0),"object"==typeof t?r(s(t),function(s){var i=encodeURIComponent(a(s))+n;return o(t[s])?r(t[s],function(t){return i+encodeURIComponent(a(t))}).join(e):i+encodeURIComponent(a(t[s]))}).join(e):i?encodeURIComponent(a(i))+n+encodeURIComponent(a(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.push(n);return e}}},["shkE"]);