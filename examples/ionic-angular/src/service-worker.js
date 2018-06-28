/* eslint-env serviceworker */
'use strict'
importScripts('./build/sw-toolbox.js')

self.toolbox.options.cache = {
  name: 'ionic-cache',
}

// pre-cache our key assets
self.toolbox.precache([
  './build/main.js',
  './build/vendor.js',
  './build/main.css',
  './build/polyfills.js',
  'index.html',
  'manifest.json',
])

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest)

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst
