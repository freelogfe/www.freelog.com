webpackJsonp([8],{"8Qhf":function(t,e,c){"use strict";var n=c("fnIZ"),o=c("HkHh"),a=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var c=[],n=!0,o=!1,a=void 0;try{for(var r,i=t[Symbol.iterator]();!(n=(r=i.next()).done)&&(c.push(r.value),!e||c.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{!n&&i.return&&i.return()}finally{if(o)throw a}}return c}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),r={data:function(){return{activeIndex:"0",routerMap:{0:"/pages/account/index.html",1:"/pages/account/security.html"}}},mounted:function(){this.initDefaultAcitve()},components:{NavTopBar:o.a},methods:{initDefaultAcitve:function(){var t=location.pathname,e=!0,c=!1,n=void 0;try{for(var o,r=Object.entries(this.routerMap)[Symbol.iterator]();!(e=(o=r.next()).done);e=!0){var i=o.value,l=a(i,2),s=l[0];if(l[1]===t){this.activeIndex=s.toString();break}}}catch(t){c=!0,n=t}finally{try{!e&&r.return&&r.return()}finally{if(c)throw n}}},routeHandler:function(t){location.href=this.routerMap[t]||"/"}}},i={render:function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",[c("nav-top-bar"),t._v(" "),c("el-container",{staticClass:"app-container"},[c("el-header"),t._v(" "),c("el-container",[c("el-aside",[c("el-menu",{attrs:{"default-active":t.activeIndex}},[c("el-menu-item",{attrs:{index:"0"},on:{click:function(e){t.routeHandler(0)}}},[c("i",{staticClass:"el-icon-fa-user-circle-o"}),t._v("基本信息\n          ")]),t._v(" "),c("el-menu-item",{attrs:{index:"1"},on:{click:function(e){t.routeHandler(1)}}},[c("i",{staticClass:"el-icon-fa-lock"}),t._v("安全设置\n          ")])],1)],1),t._v(" "),c("el-main",{staticStyle:{background:"white"}},[c("div",{attrs:{id:"main-app"}})])],1)],1)],1)},staticRenderFns:[]},l=c("VU/8")(r,i,!1,function(t){c("NTE6")},null,null).exports,s=c("IcnI");new n.a({el:"#app",store:s.a,render:function(t){return t(l)}});e.a=n.a},BffO:function(t,e,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=c("8Qhf"),o={data:function(){var t=this;return{accounts:[],ruleForm2:{accountType:"1",accountNumber:""},rules2:{accountNumber:[{validator:function(e,c,n){1===t.ruleForm2.accountType&&""===c?n(new Error("请输入")):""!==c&&"42"!==c.length&&"0x"!==c.substr(0,2)&&(console.log(c.substr(0,2)),n(new Error("16进制长度为42位的外部账号")))},trigger:"blur"}]},accountInput:"",options:[{value:"1",label:"飞致币 (feth)"},{value:"2",label:"人民币 (fcny)"},{value:"3",label:"美元 (fusd)"},{value:"4",label:"欧元 (feur)"}],value:"",SvgIconMap:{2:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 471.208 471.207" style="enable-background:new 0 0 471.208 471.207;" xml:space="preserve"><path d="M407.4,299.198c0,9.906-8.027,17.927-17.934,17.927H267.61v125.917c0,15.551-12.613,28.165-28.171,28.165   c-15.554,0-28.167-12.614-28.167-28.165V317.125H81.728c-9.897,0-17.921-8.021-17.921-17.927c0-9.901,8.023-17.928,17.921-17.928   h129.538v-49.834l-1.017-1.383H81.728c-9.897,0-17.921-8.027-17.921-17.928c0-9.903,8.023-17.921,17.921-17.921h101.938   L72.98,44.952c-9.265-12.498-6.656-30.136,5.843-39.413c12.492-9.256,30.142-6.646,39.413,5.852l120.52,162.52L352.589,12.771   c8.967-12.706,26.562-15.738,39.253-6.756c12.714,8.976,15.74,26.561,6.762,39.266L293.393,194.205h96.073   c9.906,0,17.934,8.018,17.934,17.921c0,9.901-8.027,17.928-17.934,17.928H268.071l-0.461,0.65v50.561h121.856   C399.373,281.271,407.4,289.297,407.4,299.198z" style="fill: rgb(255, 255, 255);"></path></svg>',1:'<img style="height:25px;width:25px" src="http://3.bp.blogspot.com/_5JAv5qbGmfY/TCphojFkJQI/AAAAAAAABco/IKG7N-SibfU/s320/Panda+Bear.png" alt="" />',3:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 506.464 506.464" style="enable-background:new 0 0 506.464 506.464;" xml:space="preserve"><path d="M366.79,328.981c-0.283-3.216-0.886-6.378-1.613-9.528c-0.538-3.191-1.779-6.206-2.63-9.327   c-1.229-2.979-2.294-6.053-3.771-8.919c-1.478-2.873-2.891-5.787-4.723-8.482c-1.673-2.837-3.576-5.402-5.509-7.914   c-3.942-5.172-8.523-9.747-13.293-14.086c-4.865-4.22-9.906-8.216-15.173-11.881c-5.231-3.699-10.628-7.188-16.131-10.461   c-5.474-3.325-11.065-6.455-16.722-9.452c-5.213-2.884-10.598-5.435-15.918-8.133l0.923-137.691l6.472,0.461   c3.174,0.254,6.312,0.798,9.463,1.18c3.175,0.34,6.23,1.19,9.352,1.755c3.145,0.521,6.135,1.593,9.186,2.391   c3.085,0.739,5.958,2.051,8.937,3.08c3.003,0.976,5.722,2.58,8.595,3.833c2.86,1.307,5.438,3.098,8.18,4.61   c1.372,0.763,2.56,1.788,3.854,2.663l3.794,2.736l0.095,0.074c0.579,0.411,1.283,0.653,2.046,0.659   c1.938,0.012,3.528-1.549,3.534-3.493l0.308-45.771v-0.198c0.006-1.188-0.604-2.338-1.69-2.973l-4.386-2.554   c-1.442-0.919-2.979-1.513-4.498-2.187c-3.021-1.434-6.106-2.486-9.227-3.455c-3.086-1.132-6.254-1.705-9.387-2.536   c-3.133-0.848-6.301-1.235-9.457-1.87c-3.156-0.653-6.324-0.914-9.493-1.38c-3.156-0.47-6.324-0.739-9.492-1.011   c-4.936-0.514-9.859-0.756-14.795-1.011l0.29-43.288c0.018-2.542-2.033-4.619-4.575-4.637h-0.06L241.272,0   c-2.645-0.018-4.8,2.11-4.823,4.755v0.068l-0.29,44.118l-5.388,0.913c-3.239,0.715-6.446,1.593-9.679,2.391   c-3.189,0.925-6.319,2.113-9.478,3.166c-3.124,1.179-6.145,2.651-9.206,3.972c-3.003,1.457-5.89,3.188-8.836,4.778   c-2.858,1.744-5.58,3.706-8.378,5.56c-2.71,2.033-5.338,4.282-7.995,6.434c-2.432,2.202-4.625,4.424-6.948,6.638   c-2.577,2.731-4.51,5.11-6.798,7.693c-2.074,2.639-3.969,5.429-5.967,8.153c-1.791,2.858-3.446,5.816-5.169,8.722   c-1.437,3.067-2.893,6.138-4.238,9.247c-1.082,3.21-2.305,6.387-3.239,9.644c-0.748,3.31-1.693,6.537-2.255,9.939   c-0.432,3.381-1.103,6.996-1.28,10.199l-0.239,4.773l-0.127,2.391c-0.009,0.523-0.057,0.512-0.044,1.478l0.036,1.253   c0.127,6.694,0.496,13.45,1.853,20.1c1.138,6.685,3.142,13.246,5.654,19.588c2.488,6.088,6.204,12.971,9.667,17.892   c1.998,3.098,4.338,5.544,6.511,8.328c2.403,2.415,4.793,4.859,7.258,7.185l7.669,6.47l7.965,5.884   c5.429,3.68,10.858,7.397,16.488,10.637c5.556,3.423,11.239,6.514,16.929,9.599c4.333,2.389,8.745,4.575,13.146,6.798   l-0.842,124.847c-1.215-0.07-2.438-0.124-3.656-0.219c-3.89-0.608-7.814-1.117-11.68-1.779l-11.337-2.63l-11.966-3.741   c-1.478-0.402-3.609-1.371-5.382-2.021l-5.568-2.188c-3.753-1.389-7.111-3.369-10.695-5.018c-3.606-1.638-6.638-3.961-9.998-5.882   c-1.72-0.922-3.056-2.245-4.575-3.362l-4.457-3.471l-0.36-0.295c-1.483-1.146-3.336-1.838-5.352-1.85   c-4.865-0.036-8.825,3.883-8.854,8.729l-0.316,46.849l-0.006,0.284c-0.012,2.908,1.472,5.751,4.158,7.353l5.63,3.34   c1.895,1.059,3.703,2.329,5.683,3.209c3.939,1.797,7.761,3.967,11.822,5.427c4.055,1.466,8.023,3.28,12.182,4.351   c4.135,1.17,8.216,2.589,12.41,3.369c4.176,0.856,8.334,1.962,12.54,2.471c4.203,0.543,8.402,1.436,12.608,1.684   c4.203,0.326,8.42,0.846,12.62,1.006l2.799,0.088l-0.316,46.85c-0.029,5.55,4.436,10.077,9.975,10.119h0.133l27.996,0.183   c5.657,0.036,10.262-4.51,10.309-10.16v-0.136l0.378-58.416l0.019-2.034c1.306-0.283,2.553-0.638,3.836-0.951   c1.395-0.267,2.789-0.562,4.167-0.94c3.12-0.674,6.105-1.797,9.155-2.754c3.062-0.898,6.012-2.122,8.949-3.352   c2.991-1.129,5.869-2.518,8.694-4.014l4.256-2.187l4.079-2.524c1.354-0.851,2.736-1.66,4.055-2.553l3.848-2.891   c2.643-1.844,5.012-3.973,7.341-6.147c2.43-2.051,4.587-4.492,6.721-6.851c2.275-2.275,4.061-4.947,6.018-7.5   c3.782-5.179,6.803-10.883,9.403-16.764c1.165-2.99,2.182-6.047,3.216-9.085c0.709-3.138,1.596-6.229,2.151-9.403   c0.396-3.187,1.041-6.402,1.218-9.576c0.101-3.209,0.455-6.301,0.343-9.61C367.287,335.406,367.287,332.174,366.79,328.981z    M286.912,290.502l4.221,3.251l3.901,3.636c2.577,2.429,5.248,4.758,7.389,7.571c2.233,2.719,4.669,5.272,6.336,8.341l2.771,4.415   c0.94,1.454,1.419,3.145,2.146,4.687c0.649,1.59,1.395,3.15,1.974,4.729l1.129,4.836c1.028,3.014,0.904,6.803,1.153,10.338   l0.064,1.348l0.035,0.668c-0.035-0.35-0.035,0.271-0.053,0.36l-0.201,2.554c-0.07,1.714-0.354,3.381-0.626,5.053   c-0.521,3.34-1.401,6.573-2.554,9.67c-1.123,3.115-2.684,6-4.403,8.748c-1.886,2.648-3.907,5.172-6.295,7.365   c-2.376,2.205-4.93,4.215-7.755,5.893c-1.372,0.881-2.796,1.697-4.304,2.4c-1.442,0.774-2.943,1.466-4.516,2.062   c-3.038,1.318-6.254,2.347-9.493,3.251c-0.661,0.195-1.354,0.337-2.033,0.509l3.907-107.003   C282.195,286.838,284.53,288.705,286.912,290.502z M223.576,204.977c-2.852-2.125-5.689-4.268-8.136-6.765   c-2.536-2.424-5.187-4.619-7.3-7.578l-3.357-4.179c-0.877-1.209-1.658-2.952-2.494-4.392c-0.763-1.54-1.773-2.943-2.344-4.572   l-1.62-4.896c-1.338-3.184-1.501-6.626-2.143-9.918c-0.795-3.186-0.425-7.01-0.641-10.509l-0.074-2.675   c-0.035-0.502,0.104-1.604,0.145-2.379c0.127-1.699,0.219-3.402,0.538-5.06c0.479-3.34,1.224-6.632,2.35-9.756   c0.497-1.593,1.12-3.13,1.835-4.619c0.629-1.531,1.445-2.958,2.276-4.38c1.64-2.858,3.381-5.178,5.846-8.051   c2.101-2.199,4.788-4.389,7.093-6.593c2.707-1.815,5.503-3.484,8.24-5.193c3.056-1.191,6.038-2.506,9.079-3.638l1.942-0.452   l-3.996,110.785C228.334,208.544,225.931,206.782,223.576,204.977z" style="fill: rgb(255, 255, 255);"></path></svg>',4:'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 432.763 432.762" style="enable-background:new 0 0 432.763 432.762;" xml:space="preserve"><path d="M374.363,342.635c-25.563,26.889-58.292,41.7-92.16,41.7c-55.509,0-103.572-38.981-126.192-95.329h154.186   c13.37,0,24.21-10.84,24.21-24.21s-10.84-24.21-24.21-24.21H143.708c-0.952-7.915-1.472-15.989-1.472-24.211   c0-9.274,0.653-18.365,1.871-27.237h166.09c13.37,0,24.21-10.84,24.21-24.21s-10.84-24.211-24.21-24.211H157.299   c23.105-54.698,70.4-92.302,124.904-92.302c33.868,0,66.597,14.812,92.16,41.698c9.203,9.685,24.518,10.083,34.224,0.872   c9.693-9.215,10.077-24.539,0.875-34.229C374.671,20.156,329.478,0,282.209,0c-80.712,0-149.705,58.62-176.478,140.724H40.854   c-13.37,0-24.21,10.84-24.21,24.21s10.84,24.21,24.21,24.21h54.503c-0.981,8.934-1.542,18.007-1.542,27.237   c0,8.192,0.428,16.255,1.211,24.211H40.854c-13.37,0-24.21,10.84-24.21,24.21s10.84,24.21,24.21,24.21h63.916   c26.043,83.691,95.733,143.75,177.433,143.75c47.274,0,92.456-20.161,127.247-56.755c9.208-9.693,8.83-25.015-0.869-34.229   C398.894,332.563,383.566,332.948,374.363,342.635z" style="fill: rgb(255, 255, 255);"></path></svg>'}}},mounted:function(){this.renderAccounts()},methods:{createAccount:function(t){var e=this;this.$refs[t].validate(function(t){if(!t)return console.log("error submit!!"),!1;console.log(t),alert("submit!");var c;c=""!=e.ruleForm2.accountNumber?{accountType:e.ruleForm2.accountType,address:e.ruleForm2.accountNumber}:{accountType:e.ruleForm2.accountType},e.$axios.post("/v1/pay/accounts",c).then(function(){console.log("in rendering"),e.renderAccounts()})})},renderAccounts:function(){var t=this;this.$axios.get("/v1/pay/accounts").then(function(e){var c=e.data.data;t.accounts=c}).catch(function(t){console.log(t)})},displayCreateAccount:function(){"block"==this.$el.querySelector(".create-account-contrainer").style.display?this.$el.querySelector(".create-account-contrainer").style.display="none":this.$el.querySelector(".create-account-contrainer").style.display="block"}}},a={render:function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("el-row",[c("el-col",{attrs:{span:12,offset:6}},[c("div",{staticClass:"mainContent"},[c("div",{staticClass:"contentBody"},[c("div",{staticClass:"account-container"},t._l(t.accounts,function(e){return c("div",{staticClass:"account-wrap"},[c("div",{staticStyle:{height:"25px"},domProps:{innerHTML:t._s(t.SvgIconMap[e.accountType])}}),t._v(" "),c("p",{staticClass:"card-number"},[t._v(t._s(e.accountId))]),t._v(" "),c("p",[t._v("balance: "+t._s(e.balance))]),t._v(" "),c("p",{staticClass:"card-number"},[t._v("cardNO: "+t._s(e.cardNo))])])})),t._v(" "),c("br"),c("br"),c("br"),c("br"),t._v(" "),c("el-button",{attrs:{type:"primary"},on:{click:function(e){t.displayCreateAccount()}}},[t._v("创建账号")]),t._v(" "),c("el-button",{attrs:{type:"primary"},on:{click:function(e){t.displayCreateAccount()}}},[t._v("设置支付密码")]),t._v(" "),c("div",{staticClass:"create-account-contrainer"},[c("el-form",{ref:"ruleForm2",attrs:{model:t.ruleForm2,"status-icon":"",rules:t.rules2,"label-width":"100px"}},[c("el-form-item",{attrs:{label:"外部账户",prop:"accountNumber"}},[c("el-input",{model:{value:t.ruleForm2.accountNumber,callback:function(e){t.$set(t.ruleForm2,"accountNumber",e)},expression:"ruleForm2.accountNumber"}})],1),t._v(" "),c("el-form-item",{attrs:{label:"账户类型"}},[c("el-select",{attrs:{placeholder:"请选择账户类型"},model:{value:t.ruleForm2.accountType,callback:function(e){t.$set(t.ruleForm2,"accountType",e)},expression:"ruleForm2.accountType"}},t._l(t.options,function(t){return c("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})}))],1),t._v(" "),c("el-form-item",[c("el-button",{attrs:{type:"primary"},on:{click:function(e){t.createAccount("ruleForm2")}}},[t._v("提交")]),t._v(" "),c("el-button",{on:{click:function(e){t.resetForm("ruleForm2")}}},[t._v("重置")])],1)],1)],1)],1)])])],1)},staticRenderFns:[]},r=c("VU/8")(o,a,!1,function(t){c("vM/O")},null,null).exports;new n.a({el:"#main-app",render:function(t){return t(r)}})},HkHh:function(t,e,c){"use strict";var n=c("NYxO"),o={name:"nav-top-bar",data:function(){return{}},computed:Object(n.b)({userInfo:"session"}),mounted:function(){this.syncUserSession(),this.listenWindowVisibility()},methods:{listenWindowVisibility:function(){function t(t){var c="visible",o="hidden",a={focus:c,focusin:c,pageshow:c,blur:o,focusout:o,pagehide:o};"visible"===((t=t||window.event).type in a?a[t.type]:this[e]?"hidden":"visible")&&n.syncUserSession()}var e="hidden",c=document,n=this;e in c?c.addEventListener("visibilitychange",t):(e="mozHidden")in c?c.addEventListener("mozvisibilitychange",t):(e="webkitHidden")in c?c.addEventListener("webkitvisibilitychange",t):(e="msHidden")in c?c.addEventListener("msvisibilitychange",t):window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t},syncUserSession:function(){var t=this;this.$store.dispatch("checkUserSession").then(function(e){e||t.$store.dispatch("loadCurrentUserInfo").then(function(){location.reload()})})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("userLogout").then(function(){setTimeout(function(){location.replace("/pages/user/login.html")},20)})})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},a={render:function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"nav-top-wrapper"},[t.userInfo?c("div",{staticClass:"nav-top-container"},[c("ul",{staticClass:"nav-top-right"},[c("li",{staticClass:"nav-top-item"},[c("el-dropdown",{on:{command:t.handleNavTopCommand}},[c("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),c("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),c("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[c("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),c("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"nav-top-item"},[e("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},r=c("VU/8")(o,a,!1,function(t){c("nSCy")},"data-v-4baea5a0",null);e.a=r.exports},NTE6:function(t,e,c){},fnIZ:function(t,e,c){"use strict";var n=c("G3VR"),o=c("IcnI");e.a=function(t){new n.a(Object.assign({el:"#app",store:o.a},t))}},nSCy:function(t,e,c){},"vM/O":function(t,e,c){}},["BffO"]);