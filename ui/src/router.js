import Tasks from './components/Tasks.vue';
import Task from './components/Task.vue';
import Job from './components/Job.vue';
import AddTask from './components/AddTask.vue';

import { createRouter as _createRouter, createWebHashHistory } from 'vue-router';

export function createRouter () {
    return _createRouter({
      history: createWebHashHistory(),
      base: import.meta.env.BASE_URL,
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
        {
          path: '/add_task',
          name: 'Add task',
          component: AddTask,
        },
      ],
    });
  };
