webpackJsonp([7],{"6UCX":function(e,t,a){"use strict";var r=a("G3VR"),o=a("HkHh"),s=a("kEHT"),n={data:function(){return{user:s.a.get("userInfo")||{}}},mounted:function(){},components:{NavTopBar:o.a},methods:{}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("nav-top-bar"),e._v(" "),a("el-container",{staticClass:"app-container"},[e.user?a("el-header",{staticClass:"header"},[a("div",{staticClass:"banner-portrait inline"},[a("a",{attrs:{href:"/pages/user/index.html"}},[a("img",{staticClass:"portrait-img",attrs:{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_dez7L9rZGrxliWIWRzbH6H0u0BMePCrTB6wVbLtcfrAMKII",alt:""}})])]),e._v(" "),a("div",{staticClass:"banner-main  inline"},[a("div",{staticClass:"banner-main-hello"},[a("p",{staticClass:"user-name"},[e._v(e._s(e.user.nickname))])]),e._v(" "),a("div",{staticClass:"banner-main-detail"},[a("div",{staticClass:"user-account inline"},[a("label",[e._v("账户： ")]),e._v(e._s(e.user.mobile||e.user.email))])])])]):e._e(),e._v(" "),a("el-main",{staticStyle:{background:"white"}},[a("div",{attrs:{id:"main-app"}})])],1)],1)},staticRenderFns:[]},i=a("VU/8")(n,c,!1,function(e){a("T3LL")},"data-v-7f0ce4cb",null).exports;new r.a({el:"#app",render:function(e){return e(i)}});t.a=r.a},GndR:function(e,t,a){},H6LP:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("6UCX"),o=a("aIHY"),s={data:function(){var e=this;return{createEthForm:{pass:"",checkPass:""},createEthRules:{pass:[{validator:function(t,a,r){""===a?r(new Error("请输入密码")):(""!==e.createEthForm.checkPass&&e.$refs.createEthForm.validateField("checkPass"),r())},trigger:"blur"},{min:6,message:"最少6个字符",trigger:"blur"}],checkPass:[{validator:function(t,a,r){""===a?r(new Error("请再次输入密码")):a!==e.createEthForm.pass?r(new Error("两次输入密码不一致!")):r()},trigger:"change"},{min:6,message:"最少6个字符",trigger:"blur"}]},shouldShowCreateDialog:!1,accountTypes:Object.values(o.a).map(function(e){return e.label=e.name,e}),accountForm:{address:"",accountType:""},accountRule:{}}},computed:{addrPlaceholder:function(){var e;switch(this.accountForm.accountType){case 1:e="请输入以太坊地址";break;default:e="请输入外部账户地址"}return e}},mounted:function(){},methods:{handleClose:function(e){this.$refs.createEthForm.resetFields(),e()},showCreateEthDialog:function(){this.shouldShowCreateDialog=!0},setAccountAddr:function(e){this.accountForm.address=e},createEthAccount:function(){var e=this;this.$refs.createEthForm.validate(function(t){t?e.$axios.post("/v1/pay/accounts/createEthAccount",{password:e.createEthForm.pass}).then(function(t){var a=t.data;0===a.ret&&0===a.errcode?(e.setAccountAddr(a.data.address),e.$message.success("创建成功")):e.$message.error(a.msg||"创建失败"),e.shouldShowCreateDialog=!1}):console.log("error submit!!")})},createAccount:function(e){var t=this;this.$refs[e].validate(function(e){e?(console.log(e),t.$axios.post("/v1/pay/accounts",t.accountForm).then(function(e){var a=e.data;0===a.ret&&0===a.errcode?(t.$message.success("创建成功"),setTimeout(function(){location.href="/pages/account/detail.html?accountId="+a.data.accountId},500)):t.$message.error(a.msg||"操作失败")})):console.log("error submit!!")})}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"main-app"}},[a("div",{staticClass:"create-account-container"},[a("div",[a("el-breadcrumb",{attrs:{"separator-class":"el-icon-arrow-right"}},[a("el-breadcrumb-item",[e._v("账户管理")]),e._v(" "),a("el-breadcrumb-item",[e._v("创建飞致币绑定地址")])],1)],1),e._v(" "),a("el-main",[a("el-form",{ref:"accountForm",attrs:{model:e.accountForm,"status-icon":"",rules:e.accountRule,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"账户类型",prop:"accountType",required:""}},[a("el-select",{attrs:{placeholder:"请选择账户类型"},model:{value:e.accountForm.accountType,callback:function(t){e.$set(e.accountForm,"accountType",t)},expression:"accountForm.accountType"}},e._l(e.accountTypes,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"外部账户地址",prop:"address",required:1==e.accountForm.accountType}},[a("el-input",{attrs:{placeholder:e.addrPlaceholder},model:{value:e.accountForm.address,callback:function(t){e.$set(e.accountForm,"address",t)},expression:"accountForm.address"}}),e._v(" "),a("el-popover",{ref:"popover",attrs:{placement:"top",trigger:"hover",width:"160"}},[a("div",{staticStyle:{"text-align":"center"}},[a("a",{attrs:{href:"javascript:;"},on:{click:e.showCreateEthDialog}},[e._v("去创建一个")])])]),e._v(" "),a("span",{directives:[{name:"popover",rawName:"v-popover:popover",arg:"popover"}]},[e._v("没有以太坊地址"),a("i",{staticClass:"el-icon-question"})])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.createAccount("accountForm")}}},[e._v("提交")])],1)],1)],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"创建以太坊地址",visible:e.shouldShowCreateDialog,width:"40%","before-close":e.handleClose},on:{"update:visible":function(t){e.shouldShowCreateDialog=t}}},[a("h3",{staticStyle:{"margin-bottom":"20px","text-align":"center"}},[e._v("请设置以太坊支付密码")]),e._v(" "),a("el-form",{ref:"createEthForm",staticClass:"demo-ruleForm",attrs:{model:e.createEthForm,"status-icon":"",rules:e.createEthRules,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"支付密码",prop:"pass",required:""}},[a("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.createEthForm.pass,callback:function(t){e.$set(e.createEthForm,"pass",t)},expression:"createEthForm.pass"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"确认支付密码",prop:"checkPass",required:""}},[a("el-input",{attrs:{type:"password","auto-complete":"off"},model:{value:e.createEthForm.checkPass,callback:function(t){e.$set(e.createEthForm,"checkPass",t)},expression:"createEthForm.checkPass"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.createEthAccount}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.shouldShowCreateDialog=!1}}},[e._v("取消")])],1)],1)],1)],1)},staticRenderFns:[]},c=a("VU/8")(s,n,!1,function(e){a("GndR")},null,null).exports;new r.a({el:"#main-app",render:function(e){return e(c)}})},HkHh:function(e,t,a){"use strict";var r=a("kEHT"),o={name:"nav-top-bar",data:function(){return{user:r.a.get("userInfo")||{}}},mounted:function(){this.checkLoginStatus()},methods:{checkLoginStatus:function(){var e=this;this.user&&this.user.userId||this.loadUserInfo().then(function(t){var a=t.data;if(0===t.errcode)return r.a.set("userInfo",a),a;e.$message.error(t.msg)})},loadUserInfo:function(){return this.$axios.get("/v1/userinfos/current").then(function(e){return e.data})},logoutHandler:function(){this.$axios.get("/v1/passport/logout").then(function(e){r.a.remove("userInfo"),location.replace("/pages/user/login.html")})},handleNavTopCommand:function(e){switch(e){case"gotoAccountSetting":location.href="/pages/account/security.html"}}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"nav-top-wrapper"},[e.user?a("div",{staticClass:"nav-top-container"},[a("ul",{staticClass:"nav-top-right"},[a("li",{staticClass:"nav-top-item"},[a("el-dropdown",{on:{command:e.handleNavTopCommand}},[a("span",{staticClass:"el-dropdown-link"},[e._v("\n                      "+e._s(e.user.nickname)),a("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),e._v(" "),a("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[a("el-dropdown-item",{attrs:{command:"gotoAccountSetting"}},[e._v("账户设置")])],1)],1)],1),e._v(" "),a("li",{staticClass:"nav-top-item",on:{click:e.logoutHandler}},[e._v("退出")]),e._v(" "),e._m(0)])]):e._e()])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("li",{staticClass:"nav-top-item"},[t("a",{attrs:{href:"/pages/user/index.html"}},[this._v("我的feth")])])}]},n=a("VU/8")(o,s,!1,function(e){a("edu7")},"data-v-0f5da88c",null);t.a=n.exports},T3LL:function(e,t,a){},edu7:function(e,t,a){}},["H6LP"]);