webpackJsonp([9],{IsMv:function(t,i,e){},"RW3/":function(t,i,e){},bKTp:function(t,i,e){"use strict";function n(t){e("IsMv")}var o={name:"tool-bar",data:function(){return{hidden:!0}},mounted:function(){this.initHotKeyEvent()},methods:{initHotKeyEvent:function(){var t={ctrl:17,T:84},i={},e=this,n=function(i){return t.ctrl===i||t.T===i};window.addEventListener("keydown",function(o){n(o.keyCode)&&(i[o.keyCode]=!0,i[t.ctrl]&&i[t.T]&&(e.toggleToolBar(),i={}))}),window.addEventListener("keyup",function(t){n(t.keyCode)&&(i[t.keyCode]=!1)})},showAuthDialog:function(){window.FreeLogApp.trigger(window.FreeLogApp.EventCode.showSystemDialog,{callback:function(){console.log("close dialog@toolbar")}})},toggleToolBar:function(){this.hidden=!this.hidden},show:function(){this.hidden=!1},hide:function(){this.hidden=!0}}},a=o,c=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("ul",{directives:[{name:"show",rawName:"v-show",value:!t.hidden,expression:"!hidden"}],staticClass:"tool-bar-wrap",on:{keyup:function(i){return("button"in i||84===i.keyCode)&&i.ctrlKey?void t.toggleToolBar(i):null}}},[t._m(0),t._v(" "),e("li",{staticClass:"contract-tab",attrs:{title:"合同管理"},on:{click:t.showAuthDialog}},[e("i",{staticClass:"el-icon-document"})])])},l=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("li",{staticClass:"user-tab",attrs:{title:"个人中心"}},[e("a",{attrs:{href:"/pages/user/index.html",target:"_blank"}},[e("i",{staticClass:"el-icon-fa-user",attrs:{"aria-hidden":"true"}})])])}],s={render:c,staticRenderFns:l},r=s,u=e("VU/8"),d=n,p=u(a,r,!1,d,"data-v-7e155641",null);i.a=p.exports},zzSB:function(t,i,e){"use strict";function n(t){e("RW3/")}Object.defineProperty(i,"__esModule",{value:!0});var o=e("G3VR"),a=e("bKTp"),c={data:function(){return{FC:"1000.00",dialogVisible:!1,input:"",publicKey:"",accounts:[{name:"account1",balance:"100.00",accountNumber:"0x3213454352435223"},{name:"account2",balance:"900.00",accountNumber:"00x30x345654l123n44"}]}},components:{ToolBar:a.a},methods:{createAccount:function(){},confirmPwd:function(){this.fetchAccounts(),this.input="",this.dialogVisible=!1},cancel:function(){this.input="",this.dialogVisible=!1},importPublicKey:function(){this.dialogVisible=!0,console.log(this.publicKey),this.fetchAccounts()},fetchAccounts:function(){}}},l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("tool-bar"),t._v(" "),e("el-row",{staticClass:"topRow"},[e("el-col",{staticClass:"midColumn",attrs:{span:12,offset:6}},[e("div",{staticClass:"accountName"},[e("span",{staticStyle:{float:"right",color:"lightblue"}},[e("div",{staticStyle:{float:"right"}},[t._v("余额")]),e("div",[t._v(t._s(t.FC)+" FC")])])]),t._v(" "),e("div",{staticStyle:{width:"90%",margin:"auto auto"}},[e("ul",{staticClass:"accountList"},t._l(t.accounts,function(i){return e("li",[e("div",{staticClass:"wallet"},[e("p",[t._v(t._s(i.name))]),t._v(" "),e("p",{staticStyle:{color:"red"}},[t._v(t._s(i.balance)+"FC")]),t._v(" "),e("p",{staticStyle:{"font-size":"8px"}},[t._v(t._s(i.accountNumber))])])])})),t._v(" "),e("div",{staticStyle:{"margin-bottom":"40px"}},[e("p",[t._v("我们基于以太坊创建您的账户")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(i){t.dialogVisible=!0}}},[t._v("新增账户"),e("i",{staticClass:"el-icon-circle-plus"})])],1),t._v(" "),e("div",{staticStyle:{"margin-bottom":"12px"}},[e("p",[t._v("亦可导入已有账户")]),t._v(" "),e("el-input",{attrs:{placeholder:"请输入账号"},model:{value:t.publicKey,callback:function(i){t.publicKey=i},expression:"publicKey"}})],1),t._v(" "),e("div",{staticStyle:{"margin-bottom":"12px"}},[e("el-button",{attrs:{type:"primary"},on:{click:t.importPublicKey}},[t._v("导入账户"),e("i",{staticClass:"el-icon-circle-plus"})])],1)])])],1),t._v(" "),e("el-dialog",{attrs:{title:"提示",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(i){t.dialogVisible=i}}},[e("el-input",{attrs:{type:"password",placeholder:"请设置密码"},model:{value:t.input,callback:function(i){t.input=i},expression:"input"}}),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(i){t.cancel()}}},[t._v("取 消")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(i){t.confirmPwd()}}},[t._v("确 定")])],1)],1)],1)},s=[],r={render:l,staticRenderFns:s},u=r,d=e("VU/8"),p=n,v=d(c,u,!1,p,"data-v-da504b06",null),f=v.exports;new o.a({el:"#app",render:function(t){return t(f)}})}},["zzSB"]);
//# sourceMappingURL=wallet.js.map