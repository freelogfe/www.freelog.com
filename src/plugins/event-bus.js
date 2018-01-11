//事件总线中心
import Vue from 'vue'

export default Vue => {
  var eventBus = new Vue()

  Object.defineProperties(Vue, {
    eventBus: { get: () => eventBus }
  })

  Object.defineProperties(Vue.prototype, {
    $eventBus: { get: () => eventBus }
  })
}

