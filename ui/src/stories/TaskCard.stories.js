import TaskCard from './../components/TaskCard.vue';

export default {
  title: 'Example/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
  },
  task: 'Object'
};

const Template = (args) => ({
  components: { TaskCard },
  setup() {
    return { args };
  },
  template: '<task-card v-bind="args" />',
});

export const TestComponent = Template.bind({});
TestComponent.args = {
  task: {
    task_id: "arthur.git",
    status: "SCHEDULED",
    jobs: [
      {
        job_id: "6aa9d71e-1698-493f-9841-568b6cade426",
        job_number: 1,
        job_status:  "finished"
      }],
    created_on: 1675682110.769566,
    backend: "git"
  }
};
