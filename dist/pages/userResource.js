webpackJsonp([5],{

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

/***/ "YQ/8":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1513760804497
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "l98r":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/layout.js + 2 modules
var layout = __webpack_require__("rA12");

// EXTERNAL MODULE: ./src/pages/userCenterNavBar/index.vue + 3 modules
var userCenterNavBar = __webpack_require__("nEJd");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/userResource/app.vue
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
//
//
//
//
//



/* harmony default export */ var app = ({
  name: 'user-resource',
  data: function data() {
    return {
      tableData: [],
      shouldShowAuthDialog: true
    };
  },

  components: { UserNavBar: userCenterNavBar["a" /* default */] },
  mounted: function mounted() {
    console.log('123');
    this.loadPolicyDetail();
  },

  methods: {
    loadPolicyDetail: function loadPolicyDetail(authData) {
      var self = this;
      var url = 'http://api.freelog.com/v1/contracts?contractType=3';
      // window.QI.fetch(url).then(function (res) {
      //     return res.json();
      // }).then(function (data) {
      //     console.log(data);
      // })
      this.tableData = [{ "contractId": "5a0ea031d8eb01001f683b1e", "targetId": "5a0d5b414a9fea0020d9ca41", "resourceId": "8d91deb053f95a2e354213f97428f6847bab8d99", "partyOne": 10013, "partyTwo": 10022, "segmentId": "b4a047741683c7e9c57c563afa8e4364", "contractType": 3, "createDate": "2017-11-17T08:39:13.128Z", "status": 2 }, { "contractId": "5a128bd5f8031c002ad68d8d", "targetId": "5a0d5b414a9fea0020d9ca41", "resourceId": "8d91deb053f95a2e354213f97428f6847bab8d99", "partyOne": 10013, "partyTwo": 10024, "segmentId": "b4a047741683c7e9c57c563afa8e4364", "contractType": 3, "createDate": "2017-11-20T08:01:25.843Z", "status": 3 }, { "contractId": "5a13ed0b386cad001fe6a6f1", "targetId": "5a0d5b524a9fea0020d9ca45", "resourceId": "224787e17fb58795e771d90c5a7c5d3fff5d8427", "partyOne": 10013, "partyTwo": 10024, "segmentId": "42ac7ee3da36551cda1a502adf1590b1", "contractType": 3, "createDate": "2017-11-21T09:08:27.955Z", "status": 2 }, { "contractId": "5a15263ca4ec47001f87aabc", "targetId": "5a0d5b594a9fea0020d9ca47", "resourceId": "e4c5f834c5cc283fffd536ac2a0685217e6356f9", "partyOne": 10013, "partyTwo": 10024, "segmentId": "3501abf30c8160b2c5eba11bc823d0f7", "contractType": 3, "createDate": "2017-11-22T07:24:44.117Z", "status": 3 }, { "contractId": "5a154645291767001f9631ba", "targetId": "5a0e44ba96b30b001f5670f1", "resourceId": "06956e1cb63a5585878c149ddcf37e4286833dcc", "partyOne": 10013, "partyTwo": 10024, "segmentId": "53ff30cc65789c3895923545b6b1b287", "contractType": 3, "createDate": "2017-11-22T09:41:25.226Z", "status": 2 }, { "contractId": "5a163008e173e3001fe24307", "targetId": "5a151dc6c91a1200207cee58", "resourceId": "0c0fe9a61e0b9e51475fea21daf36ae1277afa8f", "partyOne": 10013, "partyTwo": 10024, "segmentId": "951c14911ec246f98e45f21612848e56", "contractType": 3, "createDate": "2017-11-23T02:18:48.318Z", "status": 3 }, { "contractId": "5a168b0530cb17001ffcd920", "targetId": "5a0d4e124a9fea0020d9ca3f", "resourceId": "d26c5064ab7278d20fa559680eebd87b5b00e66b", "partyOne": 10013, "partyTwo": 10024, "segmentId": "0aba1df10df44021495ce8e088d1225e", "contractType": 3, "createDate": "2017-11-23T08:47:01.593Z", "status": 2 }];
    },
    handleSelect: function handleSelect() {},
    handleEdit: function handleEdit(index, row) {
      console.log(index);
      console.log(row.address);
    },
    handleContract: function handleContract() {
      console.log('管理合同');
    }
  }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-58c57a58","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/userResource/app.vue
var app_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-row',[_c('el-col',{attrs:{"span":12,"offset":6}},[_c('div',{staticClass:"mainContent"},[_c('user-nav-bar',{attrs:{"index":"4"}}),_vm._v(" "),_c('div',{staticClass:"contentBody"},[_c('el-dialog',{attrs:{"close-on-click-modal":false,"title":"管理合同","visible":_vm.shouldShowAuthDialog,"fullscreen":false,"custom-class":"auth-dialog","width":"50%","center":""},on:{"update:visible":function($event){_vm.shouldShowAuthDialog=$event}}}),_vm._v(" "),_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData}},[_c('el-table-column',{attrs:{"prop":"createDate","label":"日期","width":"180"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"resourceId","label":"资源号","width":"180"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"地址"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',[_vm._v(_vm._s(scope.row.address))]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("查看")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleContract(scope.$index, scope.row)}}},[_vm._v("管理合同")])]}}])})],1)],1)],1)])],1)}
var staticRenderFns = []
var esExports = { render: app_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var userResource_app = (esExports);
// CONCATENATED MODULE: ./src/pages/userResource/app.vue
function injectStyle (ssrContext) {
  __webpack_require__("YQ/8")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-58c57a58"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  app,
  userResource_app,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var pages_userResource_app = (Component.exports);

// CONCATENATED MODULE: ./src/pages/userResource/app.js



window.QI = document.querySelector('.js-lib-qi');

new layout["a" /* default */]({
    el: '#app',
    render: function render(h) {
        return h(pages_userResource_app);
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

},["l98r"]);
//# sourceMappingURL=userResource.js.map