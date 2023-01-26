import { createApp } from 'vue';
import RaistlinUI from './RaistlinUI.vue';
import { createRouter } from './router';
import { prettyDate } from './utils/filters';

const router = createRouter();
const app = createApp(RaistlinUI);

app.use(router);
app.mount('#raistlinUI')
app.config.globalProperties.$filters = { prettyDate }
