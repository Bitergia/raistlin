import TaskList from './components/TaskList.vue';
import TaskItem from './components/TaskItem.vue';
import JobItem from './components/JobItem.vue';
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
          component: TaskList,
        },
        {
          path: '/tasks/:task_id',
          name: 'Task',
          component: TaskItem,
          children: [
            {
              path: 'job/:job_id',
              name: 'Job',
              component: JobItem,
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
  }
