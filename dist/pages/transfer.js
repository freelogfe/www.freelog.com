webpackJsonp([5],{"1nuA":function(t,e,r){"use strict";e.decode=e.parse=r("kMPS"),e.encode=e.stringify=r("xaZU")},"6UCX":function(t,e,r){"use strict";var n=r("G3VR"),a=r("HkHh"),o=r("NYxO"),s={data:function(){return{}},mounted:function(){this.user&&this.user.userId||this.$vuex.dispatch("checkUserSession").then(function(t){})},computed:Object(o.b)({user:"session"}),components:{NavTopBar:a.a},methods:{}},i={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("nav-top-bar"),t._v(" "),r("el-container",{staticClass:"app-container is-vertical"},[t.user?r("el-header",{staticClass:"header"},[r("div",{staticClass:"banner-portrait inline"},[r("a",{attrs:{href:"/pages/user/index.html"}},[r("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),t._v(" "),r("div",{staticClass:"banner-main  inline"},[r("div",{staticClass:"banner-main-hello"},[r("p",{staticClass:"user-name"},[t._v(t._s(t.user.nickname))])]),t._v(" "),r("div",{staticClass:"banner-main-detail"},[r("div",{staticClass:"user-account inline"},[r("label",[t._v("账户： ")]),t._v(t._s(t.user.mobile||t.user.email))])])])]):t._e(),t._v(" "),r("el-main",{staticStyle:{background:"white"}},[r("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},c=r("VU/8")(s,i,!1,function(t){r("V3kp")},"data-v-596552b8",null).exports,l=r("IcnI");new n.a({el:"#app",store:l.a,render:function(t){return t(c)}});e.a=n.a},H4bk:function(t,e,r){},HkHh:function(t,e,r){"use strict";var n=r("NYxO"),a={name:"nav-top-bar",data:function(){return{}},computed:Object(n.b)({userInfo:"session"}),mounted:function(){this.checkLoginStatus()},methods:{checkLoginStatus:function(){this.user&&this.user.userId||this.$vuex.dispatch("checkUserSession").then(function(t){})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("logout")})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"nav-top-wrapper"},[t.userInfo?r("div",{staticClass:"nav-top-container"},[r("ul",{staticClass:"nav-top-right"},[r("li",{staticClass:"nav-top-item"},[r("el-dropdown",{on:{command:t.handleNavTopCommand}},[r("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),r("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),r("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-top-item"},[e("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},s=r("VU/8")(a,o,!1,function(t){r("H4bk")},"data-v-3c0b87cc",null);e.a=s.exports},PWJh:function(t,e,r){},V3kp:function(t,e,r){},kMPS:function(t,e,r){"use strict";t.exports=function(t,e,r,a){e=e||"&",r=r||"=";var o={};if("string"!=typeof t||0===t.length)return o;var s=/\+/g;t=t.split(e);var i=1e3;a&&"number"==typeof a.maxKeys&&(i=a.maxKeys);var c=t.length;i>0&&c>i&&(c=i);for(var l=0;l<c;++l){var u,d,f,m,p=t[l].replace(s,"%20"),v=p.indexOf(r);v>=0?(u=p.substr(0,v),d=p.substr(v+1)):(u=p,d=""),f=decodeURIComponent(u),m=decodeURIComponent(d),!function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}(o,f)?o[f]=m:n(o[f])?o[f].push(m):o[f]=[o[f],m]}return o};var n=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)}},shkE:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("6UCX"),a=r("1nuA"),o=r.n(a),s=r("aIHY"),i={data:function(){return{showPayDialog:!1,rules:{targetId:[{required:!0,message:"请输入合同ID",trigger:"blur"}],fromAccountId:[{required:!0,message:"请输入发起账户",trigger:"blur"}],toAccountId:[{required:!0,message:"请输入接收账户",trigger:"blur"}],amount:[{required:!0,message:"请输入转账金额",trigger:"blur"},{validator:function(t,e,r){var n=!isNaN(parseFloat(e));""===e?r(new Error("请输入转账金额")):n?e<=0?r(new Error("转账金额不能为0")):r():r(new Error("转账金额输入不合法"))},trigger:"blur"}]},loading:!1,accounts:[],transferForm:{targetId:"",fromAccountId:"",toAccountId:"",amount:"",password:"",orderType:1}}},computed:{selectedAccount:function(){for(var t=this.accounts,e=0,r=t.length;e<r;e++)if(t[e].accountId===this.transferForm.fromAccountId)return t[e];return{_info:{}}}},mounted:function(){var t=this;this.queryAccounts().then(this.formatAccounts.bind(this)).then(function(e){t.accounts=e}),this.autoFillForm()},methods:{autoFillForm:function(){var t=this,e=o.a.parse(location.search.slice(1));Object.keys(this.transferForm).forEach(function(r){e[r]&&(t.transferForm[r]=e[r])})},formatAccounts:function(t){return t.forEach(function(t){t._info=s.a[t.accountType]}),t},showPayDialogHandler:function(){var t=this;this.$refs.transferForm.validate(function(e,r){e?t.showPayDialog=!0:console.log(r)})},hidePayDialogHandler:function(){this.showPayDialog=!1},queryAccounts:function(){var t=this;return this.$axios.get("/v1/pay/accounts").then(function(e){if(0===e.data.errcode)return e.data.data;t.$message.error(e.data.msg)})},confirmTransfer:function(){var t=this;if(!this.loading){this.loading=!0;var e=Object.assign({},this.transferForm);e.amount=1e3*e.amount,this.$axios.post("/v1/pay",{data:e}).then(function(e){var r=e.data;t.showPayDialog=!1,t.loading=!1,0===r.ret&&0===r.errcode?t.renderPayResult(r):t.$message.error(r.msg)}).catch(function(){t.loading=!1,t.showPayDialog=!1})}},renderPayResult:function(){}}},c={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("h3",[t._v("转账")]),t._v(" "),r("el-form",{ref:"transferForm",staticClass:"transfer-form",attrs:{model:t.transferForm,rules:t.rules,"label-width":"100px"}},[r("el-form-item",{attrs:{label:"合同号",prop:"targetId"}},[r("el-input",{attrs:{clearable:""},model:{value:t.transferForm.targetId,callback:function(e){t.$set(t.transferForm,"targetId",e)},expression:"transferForm.targetId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"发起账户",prop:"fromAccountId"}},[r("el-select",{staticStyle:{width:"400px"},attrs:{placeholder:"请选择账户"},model:{value:t.transferForm.fromAccountId,callback:function(e){t.$set(t.transferForm,"fromAccountId",e)},expression:"transferForm.fromAccountId"}},t._l(t.accounts,function(t){return r("el-option",{key:t.accountId,attrs:{label:t.cardNo,value:t.accountId}})}))],1),t._v(" "),r("el-form-item",{attrs:{label:"接收账户",prop:"toAccountId"}},[r("el-input",{attrs:{clearable:""},model:{value:t.transferForm.toAccountId,callback:function(e){t.$set(t.transferForm,"toAccountId",e)},expression:"transferForm.toAccountId"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"转账金额",prop:"amount"}},[r("el-input",{staticStyle:{width:"250px"},model:{value:t.transferForm.amount,callback:function(e){t.$set(t.transferForm,"amount",e)},expression:"transferForm.amount"}},[r("template",{slot:"append"},[t._v(t._s(t.selectedAccount._info.abbr))])],2)],1),t._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:t.showPayDialogHandler}},[t._v("下一步")])],1)],1),t._v(" "),r("el-dialog",{attrs:{title:"转账确认",visible:t.showPayDialog,width:"30%"},on:{"update:visible":function(e){t.showPayDialog=e}}},[r("el-form",{attrs:{"label-width":"100px"}},[r("el-form-item",{staticClass:"form-label",attrs:{label:"发起账户"}},[t._v("\n        "+t._s(t.transferForm.fromAccountId)+"\n      ")]),t._v(" "),r("el-form-item",{staticClass:"form-label",attrs:{label:"接收账户"}},[t._v("\n        "+t._s(t.transferForm.toAccountId)+"\n      ")]),t._v(" "),r("el-form-item",{staticClass:"form-label",attrs:{label:"转账金额"}},[t._v("\n        "+t._s(t.transferForm.amount)+" feth\n      ")]),t._v(" "),r("el-form-item",{staticClass:"form-label",attrs:{label:"合同ID"}},[t._v("\n        "+t._s(t.transferForm.targetId)+"\n      ")]),t._v(" "),r("el-form-item",{staticClass:"form-label",attrs:{label:"订单类型"}},[t._v("\n        支付合同\n      ")]),t._v(" "),r("el-form-item",{attrs:{label:"支付密码"}},[r("el-input",{staticStyle:{width:"90%"},attrs:{type:"password",placeholder:"请输入密码",clearable:""},model:{value:t.transferForm.password,callback:function(e){t.$set(t.transferForm,"password",e)},expression:"transferForm.password"}}),t._v(" "),r("el-tooltip",{attrs:{placement:"left"}},[r("div",{staticClass:"pay-pw-tips",attrs:{slot:"content"},slot:"content"},[r("p",[r("a",{attrs:{href:"/pages/account/security.html"}},[t._v("忘记支付密码？去重置 >")])]),t._v(" "),r("p",[r("a",{attrs:{href:"/pages/account/security.html"}},[t._v("没有创建支付密码？去创建 >")])])]),t._v(" "),r("i",{staticClass:"el-icon-question"})])],1)],1),t._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:t.hidePayDialogHandler}},[t._v("取消支付")]),t._v(" "),r("el-button",{attrs:{type:"primary",loading:t.loading},on:{click:t.confirmTransfer}},[t._v("确定支付")])],1)],1)],1)},staticRenderFns:[]},l=r("VU/8")(i,c,!1,function(t){r("PWJh")},"data-v-37918e6b",null).exports;new n.a({el:"#main-app",render:function(t){return t(l)}})},xaZU:function(t,e,r){"use strict";function n(t,e){if(t.map)return t.map(e);for(var r=[],n=0;n<t.length;n++)r.push(e(t[n],n));return r}var a=function(t){switch(typeof t){case"string":return t;case"boolean":return t?"true":"false";case"number":return isFinite(t)?t:"";default:return""}};t.exports=function(t,e,r,i){return e=e||"&",r=r||"=",null===t&&(t=void 0),"object"==typeof t?n(s(t),function(s){var i=encodeURIComponent(a(s))+r;return o(t[s])?n(t[s],function(t){return i+encodeURIComponent(a(t))}).join(e):i+encodeURIComponent(a(t[s]))}).join(e):i?encodeURIComponent(a(i))+r+encodeURIComponent(a(t)):""};var o=Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=Object.keys||function(t){var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.push(r);return e}}},["shkE"]);