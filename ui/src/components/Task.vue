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

    <h3 style="margin-top: 5%" class="title is-3" align="center">
        Task "{{ $route.params.task_id }}"
    </h3>
    <table class="table" align="center" v-if="task && !errors.length">
      <thead>
        <tr>
          <th scope="col" class="text-muted">Job status</th>
          <th scope="col">Job ID</th>
        </tr>
      </thead>

      <tbody>
        <tr
          class="repo-entry"
          id="job-0"
          data-backend="rw"
          data-status
          v-bind:key="job.job_id"
          v-for="job of task.jobs"
        >
          <td class="job-id">{{ job.job_status }}</td>
          <td class="job-id">{{ job.job_id }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Task',
  data: () => ({
    task: {},
    errors: [],
  }),
  created() {
    axios
      .get(`/tasks/id/${this.$route.params.task_id}`)
      .then((response) => {
        this.task = response.data;
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
a {
  color: #42b983;
}
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
