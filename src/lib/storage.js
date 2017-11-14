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

import engine from 'store/src/store-engine'
import localStorage from 'store/storages/localStorage'
import sessionStorage from 'store/storages/sessionStorage'
import defaultPlugins from 'store/plugins/defaults'
import expire from 'store/plugins/expire'

var storages = [
    sessionStorage,
    localStorage
]

var plugins = [
    defaultPlugins,
    expire
]
var store = engine.createStore(storages, plugins)

export default store
