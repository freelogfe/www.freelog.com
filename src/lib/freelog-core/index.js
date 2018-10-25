import createApi from './create-api'

window.FreelogApp = window.FreelogApp || {}

Object.defineProperty(window.FreelogApp, 'QI', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: Object.freeze({
    ...createApi(),
  })
})

