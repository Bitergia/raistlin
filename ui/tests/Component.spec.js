import { mount } from '@vue/test-utils'
import TaskCard from './../src/components/TaskCard.vue'
import vuetify from './../src/plugins/vuetify'

describe("Vue + Vuetify component testing", () => {
  const mountFunction = (options) => {
    return mount(TaskCard, {
      global: {
        plugins: [vuetify],
        stubs: ["router-link"]
      },
      props: {
        task: {
          task_id: "arthur.git",
          status: "scheduled",
          backend: "git",
          created_on: 1675682110.769566,
          jobs: [
            {
              job_number: 1,
              job_status: "finished"
            }
          ]
        }
      },
      ...options,
    });
  };
  test('mount component', async () => {
    const wrapper = mountFunction()

    expect(wrapper.text()).toContain('arthur.git')
  })


  test('trigger event on Vuetify component', async () => {
    const wrapper = await mountFunction()
    wrapper.find('button').trigger('click')

    expect(wrapper.emitted().openModal).toBeTruthy()
  })

  test('check snapshots', async () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
