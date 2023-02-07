import vuetify from './../src/plugins/vuetify'
import { composeStories, setGlobalConfig } from '@storybook/testing-vue3'
import { mount } from '@vue/test-utils'
import * as globalStorybookConfig from './.storybook/preview'

setGlobalConfig(globalStorybookConfig)

describe('Storybook stories test', async () => {
  // Get all story files
  const modules = await Promise.all(
    Object.values(
      import.meta.glob(
        '../**/*.stories.js'
      )
    ).map((fn) => fn())
  )

  // Generate a snapshot test for each Storybook entry
  describe.each(modules.map(module => ({name: module.default.title, module })))('$name', ({ name, module }) => {
    const stories = composeStories(module)

    test.each(Object.entries(stories).map(([name, story]) => ({ name, story })))('$name', ({ story }) => {
      const mounted = mount(story(), {
        global: {
          plugins: [vuetify],
          stubs: ['router-link']
        },
      })

      expect(mounted.html()).toMatchSnapshot()
    });
  });
});
