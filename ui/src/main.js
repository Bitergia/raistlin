import { createApp } from 'vue';
import RaistlinUI from './RaistlinUI.vue';
import { createRouter } from './router';
import { prettyDate } from './utils/filters';
import vuetify from './plugins/vuetify';

const router = createRouter();
const app = createApp(RaistlinUI);

app.use(router)
  .use(vuetify)
  .mount('#raistlinUI');

app.config.globalProperties.$filters = { prettyDate }
