webpackJsonp([6],{

/***/ "23lm":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1513760804495
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "7HGV":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1513760804499
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "O7HT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/layout.js + 2 modules
var layout = __webpack_require__("rA12");

// EXTERNAL MODULE: ./src/pages/userCenterNavBar/index.vue + 3 modules
var userCenterNavBar = __webpack_require__("nEJd");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/favorites/app.vue
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
    name: 'user-resource',
    data: function data() {
        return {};
    },

    components: { UserNavBar: userCenterNavBar["a" /* default */] },
    mounted: function mounted() {},

    methods: {}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f9079956","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/favorites/app.vue
var app_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-row',[_c('el-col',{attrs:{"span":12,"offset":6}},[_c('div',{staticClass:"mainContent"},[_c('user-nav-bar',{attrs:{"index":"3"}}),_vm._v(" "),_c('div',{staticClass:"contentBody"})],1)])],1)}
var staticRenderFns = []
var esExports = { render: app_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var favorites_app = (esExports);
// CONCATENATED MODULE: ./src/pages/favorites/app.vue
function injectStyle (ssrContext) {
  __webpack_require__("23lm")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f9079956"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  app,
  favorites_app,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_favorites_app = (Component.exports);

// CONCATENATED MODULE: ./src/pages/favorites/app.js



new layout["a" /* default */]({
    el: '#app',
    render: function render(h) {
        return h(pages_favorites_app);
    }
});

/***/ }),

/***/ "nEJd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./src/pages/userCenterNavBar/index.js
var routeMap = {
  "1": "/pages/user/index.html",
  "3": "/pages/favorites.html",
  "4": "/pages/userResource.html",
  "5": "/pages/accountManagement.html"
};
/* harmony default export */ var userCenterNavBar = ({
  name: 'user-nav-bar',
  data: function data() {
    return {};
  },

  props: ['index'],
  computed: {
    activeIndex: function activeIndex() {
      if (this.index) {
        return this.index;
      }
      return '1';
    }
  },
  mounted: function mounted() {},

  methods: {
    handleSelect: function handleSelect(index) {
      window.location.assign(routeMap[index]);
    }
  }
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/userCenterNavBar/index.vue
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


/* harmony default export */ var pages_userCenterNavBar = (userCenterNavBar);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a2582168","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/userCenterNavBar/index.vue
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-menu',{staticClass:"el-menu-demo",attrs:{"default-active":_vm.index,"mode":"horizontal"},on:{"select":_vm.handleSelect}},[_c('el-menu-item',{attrs:{"index":"1"}},[_vm._v("首页")]),_vm._v(" "),_c('el-submenu',{attrs:{"index":"2"}},[_c('template',{slot:"title"},[_vm._v("我的工作台")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2-1"}},[_vm._v("选项1")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2-2"}},[_vm._v("选项2")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"2-3"}},[_vm._v("选项3")])],2),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"3"}},[_vm._v("收藏夹")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"4"}},[_vm._v("已购买资源")]),_vm._v(" "),_c('el-menu-item',{attrs:{"index":"5"}},[_vm._v("账户管理")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var selectortype_template_index_0_src_pages_userCenterNavBar = (esExports);
// CONCATENATED MODULE: ./src/pages/userCenterNavBar/index.vue
function injectStyle (ssrContext) {
  __webpack_require__("7HGV")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a2582168"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  pages_userCenterNavBar,
  selectortype_template_index_0_src_pages_userCenterNavBar,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var src_pages_userCenterNavBar = __webpack_exports__["a"] = (Component.exports);


/***/ })

},["O7HT"]);
//# sourceMappingURL=favorites.js.map