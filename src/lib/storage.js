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

import store from 'store'
import engine from 'store/src/store-engine'
import cookieStorage from 'store/storages/cookieStorage'
import defaultPlugins from 'store/plugins/defaults'
import expire from 'store/plugins/expire'

var storages = [
  cookieStorage
]
var plugins = [
  defaultPlugins,
  expire
];

export const cookieStore = engine.createStore(storages, plugins)

export default store
