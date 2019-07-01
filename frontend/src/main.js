// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import RaistlinFront from './RaistlinFront'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#raistlinFront',
  router,
  components: { RaistlinFront },
  template: '<RaistlinFront/>'
})
