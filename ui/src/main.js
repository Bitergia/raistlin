import Vue from 'vue';
import RaistlinUI from './RaistlinUI.vue';
import router from './router';
import './filters/filters';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(RaistlinUI),
}).$mount('#raistlinUI');
