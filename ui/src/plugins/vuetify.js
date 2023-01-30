import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
  theme: {
    themes: {
      light: {
        colors: {
          completed: '#4CAF50',
          failed: '#B71C1C',
          enqueued: '#9E9E9E',
          running: '#ffd21f',
          scheduled: '#45b6f7',
          started: '#ffd21f',
          queued: '#9E9E9E',
          finished: '#4CAF50'
        }
      }
    }
  }
});
