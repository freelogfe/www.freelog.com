webpackJsonp([4],{

/***/ "6NG4":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1513760804501
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "8qlJ":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1513760804489
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "bKTp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/components/toolbar/index.js
/* harmony default export */ var toolbar = ({
    name: 'tool-bar',
    data: function data() {
        return {};
    },
    mounted: function mounted() {},

    methods: {
        showAuthDialog: function showAuthDialog() {
            window.FreeLogApp.trigger(window.FreeLogApp.EventCode.showSystemDialog, {
                callback: function callback() {
                    console.log('close dialog@toolbar');
                }
            });
        }
    }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/components/toolbar/index.vue
//
//
//
//
//
//
//


/* harmony default export */ var components_toolbar = (toolbar);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-e3ced89c","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/toolbar/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"tool-bar-wrap"},[_vm._m(0,false,false),_vm._v(" "),_c('li',{staticClass:"contract-tab",attrs:{"title":"合同管理"},on:{"click":_vm.showAuthDialog}},[_c('i',{staticClass:"el-icon-document"})])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"user-tab",attrs:{"title":"个人中心"}},[_c('a',{attrs:{"href":"/pages/user/index.html","target":"_blank"}},[_c('i',{staticClass:"el-icon-fa-user",attrs:{"aria-hidden":"true"}})])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_components_toolbar = (esExports);
// CONCATENATED MODULE: ./src/components/toolbar/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("6NG4")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e3ced89c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  components_toolbar,
  selectortype_template_index_0_src_components_toolbar,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_components_toolbar = __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "zzSB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/layout.js + 2 modules
var layout = __webpack_require__("rA12");

// EXTERNAL MODULE: ./src/components/toolbar/index.vue + 3 modules
var toolbar = __webpack_require__("bKTp");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/wallet/app.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var app = ({
  data: function data() {
    return {
      FC: "1000.00",
      dialogVisible: false, //对话框是否可视
      input: '', //对话框的密码
      publicKey: "",
      accounts: [{ name: 'account1', balance: "100.00", accountNumber: '0x3213454352435223' }, { name: 'account2', balance: "900.00", accountNumber: '00x30x345654l123n44' }]
    };
  },

  components: { ToolBar: toolbar["a" /* default */] },
  methods: {
    createAccount: function createAccount() {
      //create account
    },
    confirmPwd: function confirmPwd() {
      this.fetchAccounts();

      this.input = "";
      this.dialogVisible = false;
    },
    cancel: function cancel() {
      this.input = "";
      this.dialogVisible = false;
    },
    importPublicKey: function importPublicKey() {
      this.dialogVisible = true;
      console.log(this.publicKey);

      this.fetchAccounts();
    },
    fetchAccounts: function fetchAccounts() {}
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4423db02","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/wallet/app.vue
var app_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('tool-bar'),_vm._v(" "),_c('el-row',{staticClass:"topRow"},[_c('el-col',{staticClass:"midColumn",attrs:{"span":12,"offset":6}},[_c('div',{staticClass:"accountName"},[_c('span',{staticStyle:{"float":"right","color":"lightblue"}},[_c('div',{staticStyle:{"float":"right"}},[_vm._v("余额")]),_c('div',[_vm._v(_vm._s(_vm.FC)+" FC")])])]),_vm._v(" "),_c('div',{staticStyle:{"width":"90%","margin":"auto auto"}},[_c('ul',{staticClass:"accountList"},_vm._l((_vm.accounts),function(account){return _c('li',[_c('div',{staticClass:"wallet"},[_c('p',[_vm._v(_vm._s(account.name))]),_vm._v(" "),_c('p',{staticStyle:{"color":"red"}},[_vm._v(_vm._s(account.balance)+"FC")]),_vm._v(" "),_c('p',{staticStyle:{"font-size":"8px"}},[_vm._v(_vm._s(account.accountNumber))])])])})),_vm._v(" "),_c('div',{staticStyle:{"margin-bottom":"40px"}},[_c('p',[_vm._v("我们基于以太坊创建您的账户")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.dialogVisible = true}}},[_vm._v("新增账户"),_c('i',{staticClass:"el-icon-circle-plus"})])],1),_vm._v(" "),_c('div',{staticStyle:{"margin-bottom":"12px"}},[_c('p',[_vm._v("亦可导入已有账户")]),_vm._v(" "),_c('el-input',{attrs:{"placeholder":"请输入账号"},model:{value:(_vm.publicKey),callback:function ($$v) {_vm.publicKey=$$v},expression:"publicKey"}})],1),_vm._v(" "),_c('div',{staticStyle:{"margin-bottom":"12px"}},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.importPublicKey}},[_vm._v("导入账户"),_c('i',{staticClass:"el-icon-circle-plus"})])],1)])])],1),_vm._v(" "),_c('el-dialog',{attrs:{"title":"提示","visible":_vm.dialogVisible,"width":"30%"},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('el-input',{attrs:{"type":"password","placeholder":"请设置密码"},model:{value:(_vm.input),callback:function ($$v) {_vm.input=$$v},expression:"input"}}),_vm._v(" "),_c('span',{staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{on:{"click":function($event){_vm.cancel()}}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.confirmPwd()}}},[_vm._v("确 定")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: app_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var wallet_app = (esExports);
// CONCATENATED MODULE: ./src/pages/wallet/app.vue
function injectStyle (ssrContext) {
  __webpack_require__("8qlJ")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4423db02"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  app,
  wallet_app,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_wallet_app = (Component.exports);

// CONCATENATED MODULE: ./src/pages/wallet/app.js



new layout["a" /* default */]({
    el: '#app',
    render: function render(h) {
        return h(pages_wallet_app);
    }
});

/***/ })

},["zzSB"]);
//# sourceMappingURL=wallet.js.map