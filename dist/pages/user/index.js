webpackJsonp([2],{

/***/ "65I7":
/***/ (function(module, exports) {

module.exports = defaultsPlugin

function defaultsPlugin() {
	var defaultValues = {}
	
	return {
		defaults: defaults,
		get: get
	}
	
	function defaults(_, values) {
		defaultValues = values
	}
	
	function get(super_fn, key) {
		var val = super_fn()
		return (val !== undefined ? val : defaultValues[key])
	}
}


/***/ }),

/***/ "7HGV":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1514363257804
      var cssReload = require("../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "7xrK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./src/layout.js + 2 modules
var layout = __webpack_require__("rA12");

// EXTERNAL MODULE: ./src/lib/storage.js
var storage = __webpack_require__("kEHT");

// EXTERNAL MODULE: ./src/pages/userCenterNavBar/index.vue + 3 modules
var userCenterNavBar = __webpack_require__("nEJd");

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/pages/user/index/app.vue
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
    data: function data() {
        return {
            user: storage["a" /* default */].get('userInfo') || { nickname: 'pending' },
            tableData: [{
                date: '2016-05-02',
                name: 'philyoung',
                address: 'http://api.freelog.com/node/home/philyoung'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: 'http://api.freelog.com/node/home/philyoung'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: 'http://api.freelog.com/node/home/philyoung'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: 'http://api.freelog.com/node/home/philyoung'
            }]
        };
    },
    mounted: function mounted() {
        //this.loadUserInfo()
    },

    components: { UserNavBar: userCenterNavBar["a" /* default */] },
    methods: {
        loadUserInfo: function loadUserInfo() {
            var self = this;
            window.fetch('//api.freelog.com/v1/userinfos/10024', {
                credentials: 'same-origin'
            }).then(function (res) {
                return res.json();
            }).then(function (data) {
                self.user = data.data;
            });
        },
        logoutHandler: function logoutHandler() {
            window.fetch('//api.freelog.com/v1/passport/logout', {
                credentials: 'same-origin'
            }).then(function (res) {
                location.assign('../user/login.html');
            });
        },
        handleEdit: function handleEdit(index, row) {
            window.location.assign(row.address);
        }
    }
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5f7a5c53","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/pages/user/index/app.vue
var app_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('el-row',[_c('el-col',{attrs:{"span":12,"offset":6}},[_c('div',{staticClass:"mainContent"},[_c('user-nav-bar',{attrs:{"index":"1"}}),_vm._v(" "),_c('div',{staticClass:"contentBody"},[_c('p',[_vm._v("Username: "+_vm._s(_vm.user.nickname))]),_vm._v(" "),_c('div',[_vm._v("账户余额：100FC  "),_c('a',{attrs:{"href":"#"}},[_vm._v("去充值")])]),_vm._v(" "),_c('p',[_vm._v("最近浏览节点：")]),_vm._v(" "),_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData}},[_c('el-table-column',{attrs:{"prop":"date","label":"日期","width":"180"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名","width":"180"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"address","label":"地址"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('a',[_vm._v(_vm._s(scope.row.address))]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("查看")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleContract(scope.$index, scope.row)}}},[_vm._v("管理合同")])]}}])})],1),_vm._v(" "),_c('section',{staticClass:"actions"},[_c('el-button',{attrs:{"type":"primary","plain":""},on:{"click":_vm.logoutHandler}},[_vm._v("log out")])],1)],1)],1)])],1)],1)}
var staticRenderFns = []
var esExports = { render: app_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var index_app = (esExports);
// CONCATENATED MODULE: ./src/pages/user/index/app.vue
function injectStyle (ssrContext) {
  __webpack_require__("siCW")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5f7a5c53"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  app,
  index_app,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ var user_index_app = (Component.exports);

// CONCATENATED MODULE: ./src/pages/user/index/app.js



new layout["a" /* default */]({
    el: '#app',
    render: function render(h) {
        return h(user_index_app);
    }
});

/***/ }),

/***/ "LpDn":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var assign = make_assign()
var create = make_create()
var trim = make_trim()
var Global = (typeof window !== 'undefined' ? window : global)

module.exports = {
	assign: assign,
	create: create,
	trim: trim,
	bind: bind,
	slice: slice,
	each: each,
	map: map,
	pluck: pluck,
	isList: isList,
	isFunction: isFunction,
	isObject: isObject,
	Global: Global
}

function make_assign() {
	if (Object.assign) {
		return Object.assign
	} else {
		return function shimAssign(obj, props1, props2, etc) {
			for (var i = 1; i < arguments.length; i++) {
				each(Object(arguments[i]), function(val, key) {
					obj[key] = val
				})
			}			
			return obj
		}
	}
}

function make_create() {
	if (Object.create) {
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			return assign.apply(this, [Object.create(obj)].concat(assignArgsList))
		}
	} else {
		function F() {} // eslint-disable-line no-inner-declarations
		return function create(obj, assignProps1, assignProps2, etc) {
			var assignArgsList = slice(arguments, 1)
			F.prototype = obj
			return assign.apply(this, [new F()].concat(assignArgsList))
		}
	}
}

function make_trim() {
	if (String.prototype.trim) {
		return function trim(str) {
			return String.prototype.trim.call(str)
		}
	} else {
		return function trim(str) {
			return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
		}
	}
}

function bind(obj, fn) {
	return function() {
		return fn.apply(obj, Array.prototype.slice.call(arguments, 0))
	}
}

function slice(arr, index) {
	return Array.prototype.slice.call(arr, index || 0)
}

function each(obj, fn) {
	pluck(obj, function(val, key) {
		fn(val, key)
		return false
	})
}

function map(obj, fn) {
	var res = (isList(obj) ? [] : {})
	pluck(obj, function(v, k) {
		res[k] = fn(v, k)
		return false
	})
	return res
}

function pluck(obj, fn) {
	if (isList(obj)) {
		for (var i=0; i<obj.length; i++) {
			if (fn(obj[i], i)) {
				return obj[i]
			}
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (fn(obj[key], key)) {
					return obj[key]
				}
			}
		}
	}
}

function isList(val) {
	return (val != null && typeof val != 'function' && typeof val.length == 'number')
}

function isFunction(val) {
	return val && {}.toString.call(val) === '[object Function]'
}

function isObject(val) {
	return val && {}.toString.call(val) === '[object Object]'
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2")))

/***/ }),

/***/ "RuI5":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("LpDn")
var Global = util.Global

module.exports = {
	name: 'localStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll,
}

function localStorage() {
	return Global.localStorage
}

function read(key) {
	return localStorage().getItem(key)
}

function write(key, data) {
	return localStorage().setItem(key, data)
}

function each(fn) {
	for (var i = localStorage().length - 1; i >= 0; i--) {
		var key = localStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return localStorage().removeItem(key)
}

function clearAll() {
	return localStorage().clear()
}


/***/ }),

/***/ "SGDr":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("LpDn")
var slice = util.slice
var pluck = util.pluck
var each = util.each
var bind = util.bind
var create = util.create
var isList = util.isList
var isFunction = util.isFunction
var isObject = util.isObject

module.exports = {
	createStore: createStore
}

var storeAPI = {
	version: '2.0.12',
	enabled: false,
	
	// get returns the value of the given key. If that value
	// is undefined, it returns optionalDefaultValue instead.
	get: function(key, optionalDefaultValue) {
		var data = this.storage.read(this._namespacePrefix + key)
		return this._deserialize(data, optionalDefaultValue)
	},

	// set will store the given value at key and returns value.
	// Calling set with value === undefined is equivalent to calling remove.
	set: function(key, value) {
		if (value === undefined) {
			return this.remove(key)
		}
		this.storage.write(this._namespacePrefix + key, this._serialize(value))
		return value
	},

	// remove deletes the key and value stored at the given key.
	remove: function(key) {
		this.storage.remove(this._namespacePrefix + key)
	},

	// each will call the given callback once for each key-value pair
	// in this store.
	each: function(callback) {
		var self = this
		this.storage.each(function(val, namespacedKey) {
			callback.call(self, self._deserialize(val), (namespacedKey || '').replace(self._namespaceRegexp, ''))
		})
	},

	// clearAll will remove all the stored key-value pairs in this store.
	clearAll: function() {
		this.storage.clearAll()
	},

	// additional functionality that can't live in plugins
	// ---------------------------------------------------

	// hasNamespace returns true if this store instance has the given namespace.
	hasNamespace: function(namespace) {
		return (this._namespacePrefix == '__storejs_'+namespace+'_')
	},

	// createStore creates a store.js instance with the first
	// functioning storage in the list of storage candidates,
	// and applies the the given mixins to the instance.
	createStore: function() {
		return createStore.apply(this, arguments)
	},
	
	addPlugin: function(plugin) {
		this._addPlugin(plugin)
	},
	
	namespace: function(namespace) {
		return createStore(this.storage, this.plugins, namespace)
	}
}

function _warn() {
	var _console = (typeof console == 'undefined' ? null : console)
	if (!_console) { return }
	var fn = (_console.warn ? _console.warn : _console.log)
	fn.apply(_console, arguments)
}

function createStore(storages, plugins, namespace) {
	if (!namespace) {
		namespace = ''
	}
	if (storages && !isList(storages)) {
		storages = [storages]
	}
	if (plugins && !isList(plugins)) {
		plugins = [plugins]
	}

	var namespacePrefix = (namespace ? '__storejs_'+namespace+'_' : '')
	var namespaceRegexp = (namespace ? new RegExp('^'+namespacePrefix) : null)
	var legalNamespaces = /^[a-zA-Z0-9_\-]*$/ // alpha-numeric + underscore and dash
	if (!legalNamespaces.test(namespace)) {
		throw new Error('store.js namespaces can only have alphanumerics + underscores and dashes')
	}
	
	var _privateStoreProps = {
		_namespacePrefix: namespacePrefix,
		_namespaceRegexp: namespaceRegexp,

		_testStorage: function(storage) {
			try {
				var testStr = '__storejs__test__'
				storage.write(testStr, testStr)
				var ok = (storage.read(testStr) === testStr)
				storage.remove(testStr)
				return ok
			} catch(e) {
				return false
			}
		},

		_assignPluginFnProp: function(pluginFnProp, propName) {
			var oldFn = this[propName]
			this[propName] = function pluginFn() {
				var args = slice(arguments, 0)
				var self = this

				// super_fn calls the old function which was overwritten by
				// this mixin.
				function super_fn() {
					if (!oldFn) { return }
					each(arguments, function(arg, i) {
						args[i] = arg
					})
					return oldFn.apply(self, args)
				}

				// Give mixing function access to super_fn by prefixing all mixin function
				// arguments with super_fn.
				var newFnArgs = [super_fn].concat(args)

				return pluginFnProp.apply(self, newFnArgs)
			}
		},

		_serialize: function(obj) {
			return JSON.stringify(obj)
		},

		_deserialize: function(strVal, defaultVal) {
			if (!strVal) { return defaultVal }
			// It is possible that a raw string value has been previously stored
			// in a storage without using store.js, meaning it will be a raw
			// string value instead of a JSON serialized string. By defaulting
			// to the raw string value in case of a JSON parse error, we allow
			// for past stored values to be forwards-compatible with store.js
			var val = ''
			try { val = JSON.parse(strVal) }
			catch(e) { val = strVal }

			return (val !== undefined ? val : defaultVal)
		},
		
		_addStorage: function(storage) {
			if (this.enabled) { return }
			if (this._testStorage(storage)) {
				this.storage = storage
				this.enabled = true
			}
		},

		_addPlugin: function(plugin) {
			var self = this

			// If the plugin is an array, then add all plugins in the array.
			// This allows for a plugin to depend on other plugins.
			if (isList(plugin)) {
				each(plugin, function(plugin) {
					self._addPlugin(plugin)
				})
				return
			}

			// Keep track of all plugins we've seen so far, so that we
			// don't add any of them twice.
			var seenPlugin = pluck(this.plugins, function(seenPlugin) {
				return (plugin === seenPlugin)
			})
			if (seenPlugin) {
				return
			}
			this.plugins.push(plugin)

			// Check that the plugin is properly formed
			if (!isFunction(plugin)) {
				throw new Error('Plugins must be function values that return objects')
			}

			var pluginProperties = plugin.call(this)
			if (!isObject(pluginProperties)) {
				throw new Error('Plugins must return an object of function properties')
			}

			// Add the plugin function properties to this store instance.
			each(pluginProperties, function(pluginFnProp, propName) {
				if (!isFunction(pluginFnProp)) {
					throw new Error('Bad plugin property: '+propName+' from plugin '+plugin.name+'. Plugins should only return functions.')
				}
				self._assignPluginFnProp(pluginFnProp, propName)
			})
		},
		
		// Put deprecated properties in the private API, so as to not expose it to accidential
		// discovery through inspection of the store object.
		
		// Deprecated: addStorage
		addStorage: function(storage) {
			_warn('store.addStorage(storage) is deprecated. Use createStore([storages])')
			this._addStorage(storage)
		}
	}

	var store = create(_privateStoreProps, storeAPI, {
		plugins: []
	})
	store.raw = {}
	each(store, function(prop, propName) {
		if (isFunction(prop)) {
			store.raw[propName] = bind(store, prop)			
		}
	})
	each(storages, function(storage) {
		store._addStorage(storage)
	})
	each(plugins, function(plugin) {
		store._addPlugin(plugin)
	})
	return store
}


/***/ }),

/***/ "kEHT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store_src_store_engine__ = __webpack_require__("SGDr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_store_src_store_engine___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_store_src_store_engine__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store_storages_localStorage__ = __webpack_require__("RuI5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_store_storages_localStorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_store_storages_localStorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_store_storages_sessionStorage__ = __webpack_require__("uY+Y");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_store_storages_sessionStorage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_store_storages_sessionStorage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_store_plugins_defaults__ = __webpack_require__("65I7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_store_plugins_defaults___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_store_plugins_defaults__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_store_plugins_expire__ = __webpack_require__("wwqQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_store_plugins_expire___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_store_plugins_expire__);
/**
 * Storage
 * > - https://github.com/marcuswestin/store.js
 * > - https://github.com/marcuswestin/store.js#make-your-own-build
 // Example custom storage
 var storage = {
	name: 'myStorage',
	read: function(key) { ... },
	write: function(key, value) { ... },
	each: function(fn) { ... },
	remove: function(key) { ... },
	clearAll: function() { ... }
}
 var store = require('store').createStore(storage)
 */







var storages = [__WEBPACK_IMPORTED_MODULE_2_store_storages_sessionStorage___default.a, __WEBPACK_IMPORTED_MODULE_1_store_storages_localStorage___default.a];

var plugins = [__WEBPACK_IMPORTED_MODULE_3_store_plugins_defaults___default.a, __WEBPACK_IMPORTED_MODULE_4_store_plugins_expire___default.a];
var store = __WEBPACK_IMPORTED_MODULE_0_store_src_store_engine___default.a.createStore(storages, plugins);

/* harmony default export */ __webpack_exports__["a"] = (store);

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


/***/ }),

/***/ "siCW":
/***/ (function(module, exports, __webpack_require__) {

// removed by extract-text-webpack-plugin
    if(false) {
      // 1514363257808
      var cssReload = require("../../../../node_modules/css-hot-loader/hotModuleReplacement.js")(module.id, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "uY+Y":
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__("LpDn")
var Global = util.Global

module.exports = {
	name: 'sessionStorage',
	read: read,
	write: write,
	each: each,
	remove: remove,
	clearAll: clearAll
}

function sessionStorage() {
	return Global.sessionStorage
}

function read(key) {
	return sessionStorage().getItem(key)
}

function write(key, data) {
	return sessionStorage().setItem(key, data)
}

function each(fn) {
	for (var i = sessionStorage().length - 1; i >= 0; i--) {
		var key = sessionStorage().key(i)
		fn(read(key), key)
	}
}

function remove(key) {
	return sessionStorage().removeItem(key)
}

function clearAll() {
	return sessionStorage().clear()
}


/***/ }),

/***/ "wwqQ":
/***/ (function(module, exports) {

var namespace = 'expire_mixin'

module.exports = expirePlugin

function expirePlugin() {
	var expirations = this.createStore(this.storage, null, this._namespacePrefix+namespace)
	
	return {
		set: expire_set,
		get: expire_get,
		remove: expire_remove,
		getExpiration: getExpiration,
		removeExpiredKeys: removeExpiredKeys
	}
	
	function expire_set(super_fn, key, val, expiration) {
		if (!this.hasNamespace(namespace)) {
			expirations.set(key, expiration)
		}
		return super_fn()
	}
	
	function expire_get(super_fn, key) {
		if (!this.hasNamespace(namespace)) {
			_checkExpiration.call(this, key)
		}
		return super_fn()
	}
	
	function expire_remove(super_fn, key) {
		if (!this.hasNamespace(namespace)) {
			expirations.remove(key)
		}
		return super_fn()
	}
	
	function getExpiration(_, key) {
		return expirations.get(key)
	}
	
	function removeExpiredKeys(_) {
		var keys = []
		this.each(function(val, key) {
			keys.push(key)
		})
		for (var i=0; i<keys.length; i++) {
			_checkExpiration.call(this, keys[i])
		}
	}
	
	function _checkExpiration(key) {
		var expiration = expirations.get(key, Number.MAX_VALUE)
		if (expiration <= new Date().getTime()) {
			this.raw.remove(key)
			expirations.remove(key)
		}
	}
	
}


/***/ })

},["7xrK"]);
//# sourceMappingURL=index.js.map