webpackJsonp([6],{"8Qhf":function(t,s,e){"use strict";var o=e("fnIZ"),r=e("dW81"),n=function(){return function(t,s){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,s){var e=[],o=!0,r=!1,n=void 0;try{for(var a,i=t[Symbol.iterator]();!(o=(a=i.next()).done)&&(e.push(a.value),!s||e.length!==s);o=!0);}catch(t){r=!0,n=t}finally{try{!o&&i.return&&i.return()}finally{if(r)throw n}}return e}(t,s);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a={data:function(){return{activeIndex:"0",routerMap:{0:"/pages/account/index.html",1:"/pages/account/security.html"}}},mounted:function(){this.initDefaultAcitve()},components:{NavTopBar:r.a},methods:{initDefaultAcitve:function(){var t=location.pathname,s=!0,e=!1,o=void 0;try{for(var r,a=Object.entries(this.routerMap)[Symbol.iterator]();!(s=(r=a.next()).done);s=!0){var i=r.value,d=n(i,2),l=d[0];if(d[1]===t){this.activeIndex=l.toString();break}}}catch(t){e=!0,o=t}finally{try{!s&&a.return&&a.return()}finally{if(e)throw o}}},routeHandler:function(t){location.href=this.routerMap[t]||"/"}}},i={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("nav-top-bar"),t._v(" "),e("el-container",{staticClass:"app-container"},[e("el-header"),t._v(" "),e("el-container",[e("el-aside",[e("el-menu",{attrs:{"default-active":t.activeIndex}},[e("el-menu-item",{attrs:{index:"0"},on:{click:function(s){t.routeHandler(0)}}},[e("i",{staticClass:"el-icon-fa-user-circle-o"}),t._v("基本信息\n          ")]),t._v(" "),e("el-menu-item",{attrs:{index:"1"},on:{click:function(s){t.routeHandler(1)}}},[e("i",{staticClass:"el-icon-fa-lock"}),t._v("安全设置\n          ")])],1)],1),t._v(" "),e("el-main",{staticStyle:{background:"white"}},[e("div",{attrs:{id:"main-app"}})])],1)],1)],1)},staticRenderFns:[]},d=e("VU/8")(a,i,!1,function(t){e("kZvS")},null,null).exports,l=e("IcnI");new o.a({el:"#app",store:l.a,render:function(t){return t(d)}});s.a=o.a},LWGt:function(t,s,e){},"MaR/":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var o=e("8Qhf"),r=e("NYxO"),n={data:function(){var t=this;return{resetPayPasswordDialog:!1,shouldShowPasswordDialog:!1,passwordRules:{newPassword:[{validator:function(s,e,o){""===e?o(new Error("请输入密码")):(""!==t.passwordForm.checkNewPassword&&t.$refs.passwordForm.validateField("checkNewPassword"),o())},trigger:"change"}],checkNewPassword:[{validator:function(s,e,o){""===e?o(new Error("请再次输入密码")):e!==t.passwordForm.newPassword?o(new Error("两次输入密码不一致!")):o()},trigger:"change"}]},passwordForm:{title:"",type:"",oldPassword:"",newPassword:"",checkNewPassword:""}}},mounted:function(){},computed:Object(r.b)({user:"session"}),methods:{resetPayPasswordHandler:function(){this.shouldShowPasswordDialog=!0,this.passwordForm.title="重置支付密码",this.passwordForm.type="resetPayPassword"},resetLoginPasswordHandler:function(){this.shouldShowPasswordDialog=!0,this.passwordForm.title="重置登录密码",this.passwordForm.type="resetLoginPassword"},createPayPasswordHandler:function(){this.shouldShowPasswordDialog=!0,this.passwordForm.title="创建支付密码",this.passwordForm.type="createPayPassword"},handleClose:function(t){this.$refs.passwordForm.resetFields(),t()},routeToPathHandler:function(t){location.href=t},confirmHandler:function(){var t=this;this.$refs.passwordForm.validate(function(s){if(s){var e=t.passwordForm.type;t[e]().then(function(){t.shouldShowPasswordDialog=!1}).catch(function(s){var e=s&&s.message||s||"出错啦！";t.$message.error(e)})}else t.$message.error("输入校验有误")})},resetLoginPassword:function(){var t=this,s=this.user;if(!s||!s.userId)return this.$message.error("not login");var e={loginName:s.loginName,password:this.passwordForm.newPassword};return this.$axios.post("/v1/userinfos/resetPassword",e).then(function(s){var e=s.data;if(0!==e.ret||0!==e.errcode)throw new Error(e.msg);t.$message.success("设置成功")})},createPayPassword:function(){var t=this,s={password:this.passwordForm.newPassword};return this.$axios.post("/v1/pay/password",s).then(function(s){var e=s.data;if(0!==e.ret||0!==e.errcode)throw new Error(e.msg);t.$message.success("设置成功")})},resetPayPassword:function(){var t=this,s=this.user;if(!s||!s.userId)return this.$message.error("not login");var e={oldPassword:this.passwordForm.oldPassword,newPassword:this.passwordForm.newPassword};return this.$axios.put("/v1/pay/password/"+s.userId,e).then(function(s){var e=s.data;if(0!==e.ret||0!==e.errcode)throw new Error(e.msg);t.$message.success("重置成功")})}}},a={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"app"}},[e("ul",{staticClass:"setting-items"},[e("li",[t._m(0),t._v(" "),e("span",{staticClass:"setting-desc"}),t._v(" "),e("div",{staticClass:"setting-action"},[e("el-button",{attrs:{type:"text"},on:{click:t.resetPayPasswordHandler}},[t._v("重置")]),t._v(" "),e("el-button",{attrs:{type:"text"},on:{click:t.createPayPasswordHandler}},[t._v("创建")])],1)]),t._v(" "),e("li",[t._m(1),t._v(" "),e("el-button",{staticClass:"setting-action",attrs:{type:"text"},on:{click:t.resetLoginPasswordHandler}},[t._v("重置")])],1)]),t._v(" "),e("el-dialog",{attrs:{title:t.passwordForm.title,visible:t.shouldShowPasswordDialog,width:"30%","before-close":t.handleClose,center:""},on:{"update:visible":function(s){t.shouldShowPasswordDialog=s}}},[e("el-form",{ref:"passwordForm",attrs:{"label-width":"100px","status-icon":"",model:t.passwordForm,rules:t.passwordRules}},[e("el-form-item",{directives:[{name:"show",rawName:"v-show",value:/^reset/.test(t.passwordForm.type),expression:"/^reset/.test(passwordForm.type)"}],attrs:{label:"旧密码",prop:"oldPassword"}},[e("el-input",{attrs:{type:"password"},model:{value:t.passwordForm.oldPassword,callback:function(s){t.$set(t.passwordForm,"oldPassword",s)},expression:"passwordForm.oldPassword"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"新密码",prop:"newPassword"}},[e("el-input",{attrs:{type:"password"},model:{value:t.passwordForm.newPassword,callback:function(s){t.$set(t.passwordForm,"newPassword",s)},expression:"passwordForm.newPassword"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"确认新密码",prop:"checkNewPassword"}},[e("el-input",{attrs:{type:"password"},model:{value:t.passwordForm.checkNewPassword,callback:function(s){t.$set(t.passwordForm,"checkNewPassword",s)},expression:"passwordForm.checkNewPassword"}})],1)],1),t._v(" "),e("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(s){t.shouldShowPasswordDialog=!1}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:t.confirmHandler}},[t._v("确 定")])],1)],1)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"setting-title"},[s("label",[this._v("支付密码")]),s("i",{staticClass:"el-icon-fa-lock"})])},function(){var t=this.$createElement,s=this._self._c||t;return s("span",{staticClass:"setting-title"},[s("label",[this._v("登录密码")]),s("i",{staticClass:"el-icon-fa-lock"})])}]},i=e("VU/8")(n,a,!1,function(t){e("LWGt")},null,null).exports;new o.a({el:"#main-app",render:function(t){return t(i)}})},dW81:function(t,s,e){"use strict";var o=e("NYxO"),r={name:"nav-top-bar",data:function(){return{}},computed:Object(o.b)({userInfo:"session"}),mounted:function(){this.syncUserSession(),this.listenWindowVisibility()},methods:{listenWindowVisibility:function(){function t(t){var e="visible",r="hidden",n={focus:e,focusin:e,pageshow:e,blur:r,focusout:r,pagehide:r};"visible"===((t=t||window.event).type in n?n[t.type]:this[s]?"hidden":"visible")&&o.syncUserSession()}var s="hidden",e=document,o=this;s in e?e.addEventListener("visibilitychange",t):(s="mozHidden")in e?e.addEventListener("mozvisibilitychange",t):(s="webkitHidden")in e?e.addEventListener("webkitvisibilitychange",t):(s="msHidden")in e?e.addEventListener("msvisibilitychange",t):window.onpageshow=window.onpagehide=window.onfocus=window.onblur=t},syncUserSession:function(){var t=this;this.$store.dispatch("checkUserSession").then(function(s){s||t.$store.dispatch("loadCurrentUserInfo").then(function(){location.reload()})})},logoutHandler:function(){var t=this;this.$axios.get("/v1/passport/logout").then(function(){t.$vuex.dispatch("userLogout").then(function(){setTimeout(function(){location.replace("/pages/user/login.html")},20)})})},handleNavTopCommand:function(t){switch(t){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},n={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"nav-top-wrapper"},[t.userInfo?e("div",{staticClass:"nav-top-container"},[e("ul",{staticClass:"nav-top-right"},[e("li",{staticClass:"nav-top-item"},[e("el-dropdown",{on:{command:t.handleNavTopCommand}},[e("span",{staticClass:"el-dropdown-link"},[t._v("\n                      "+t._s(t.userInfo.nickname)),e("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[t._v("账户设置")])],1)],1)],1),t._v(" "),e("li",{staticClass:"nav-top-item",on:{click:t.logoutHandler}},[t._v("退出")]),t._v(" "),t._m(0)])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("li",{staticClass:"nav-top-item"},[s("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},a=e("VU/8")(r,n,!1,function(t){e("wUdz")},"data-v-02bebf23",null);s.a=a.exports},fnIZ:function(t,s,e){"use strict";var o=e("G3VR"),r=e("IcnI");s.a=function(t){new o.a(Object.assign({el:"#app",store:r.a},t))}},kZvS:function(t,s,e){},wUdz:function(t,s,e){}},["MaR/"]);