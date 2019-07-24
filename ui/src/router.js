import Vue from 'vue';
import Router from 'vue-router';
import Tasks from '@/components/Tasks.vue';
import Task from '@/components/Task.vue';
import Job from '@/components/Job.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', redirect: '/tasks',
    },
    {
      path: '/tasks',
      name: 'Tasks list',
      component: Tasks,
    },
    {
      path: '/tasks/:task_id',
      name: 'Task',
      component: Task,
      children: [
        {
          path: 'job/:job_id',
          name: 'Job',
          component: Job,
        },
      ],
    },

  ],
});
