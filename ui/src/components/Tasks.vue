<template>
  <div class="container" style="align-items: center">
    <h3 style="margin-top: 5%" class="title is-3" align="center">KingArthur tasks list</h3>
    <table class="table" align="center" v-if="tasks && tasks.length">
      <thead>
        <tr>
          <th scope="col" class="text-muted">Status</th>
          <th scope="col">Task ID</th>
          <th scope="col">Backend</th>
          <th scope="col">Category</th>
          <th scope="col">Created on</th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="repo-entry"
          id="task-0"
          data-backend="rw"
          data-status
          v-bind:key="task"
          v-for="task of tasks"
        >
          <td class="task-id">{{ task.status }}</td>
          <td class="task-id">{{ task.task_id }}</td>
          <td class="task-id">{{ task.backend }}</td>
          <td class="task-id">{{ task.category }}</td>
          <td>
            <i class="fas fa-calendar-alt text-muted"></i>
            {{task.created_on}}
          </td>
        </tr>
      </tbody>
    </table>
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
        this.errors.push(e);
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
a {
  color: #42b983;
}
</style>
