<template>
  <div class="container" style="align-items: center">
    <!-- Errors -->
    <div v-if="errors && errors.length">
      <article class="message is-danger" align="center" v-bind:key="error" v-for="error of errors">
        <div class="message-header">
          <p>Error {{error.status}}</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">{{error.data.message}}</div>
      </article>
    </div>

    <h3 style="margin-top: 5%" class="title is-3" align="center">KingArthur tasks list</h3>
    <table class="table" align="center" v-if="tasks && tasks.length && !errors.length">
      <thead>
        <tr>
          <th scope="col" class="text-muted">Status</th>
          <th scope="col">Task ID</th>
          <th scope="col">Backend</th>
          <th scope="col">Category</th>
          <th scope="col">Created on</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="repo-entry"
          id="task-0"
          data-backend="rw"
          data-status
          v-bind:key="task.task_id"
          v-for="task of tasks"
        >
          <td class="task-id">{{ task.status }}</td>
          <td class="task-id">{{ task.task_id }}</td>
          <td class="task-id">{{ task.backend }}</td>
          <td class="task-id">{{ task.category }}</td>
          <td>
            <i class="fas fa-calendar-alt text-muted"></i>
            {{task.created_on | prettyDate}}
          </td>
          <td class="task-id">
            <router-link :to="{path: '/tasks/' + task.task_id }">
              Details
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <article class="message is-warning" align="center" v-if="!tasks.length && !errors.length">
      <div class="message-header">
        <p>Warning</p>
        <button class="delete" aria-label="delete"></button>
      </div>
      <div class="message-body">There aren't tasks in the KingArthur server</div>
    </article>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Tasks',
  data: () => ({
    tasks: [],
    errors: [],
  }),
  // When component created
  created() {
    axios
      .get('/tasks/list')
      .then((response) => {
        this.tasks = response.data;
      })
      .catch((e) => {
        this.errors.push(e.response);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
