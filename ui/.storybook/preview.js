import '@mdi/font/css/materialdesignicons.css'
import { app } from '@storybook/vue3'
import vuetify from '../src/plugins/vuetify'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [story => ({
  components: { story },
  template: '<story />',
})]

app.use(vuetify)
