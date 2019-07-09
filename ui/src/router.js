import Vue from 'vue';
import Router from 'vue-router';
import Tasks from '@/components/Tasks.vue';

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
      name: 'Tasks',
      component: Tasks,
    },
  ],
});
