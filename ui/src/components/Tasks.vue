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

    <h3 style="margin-top: 5%" class="title is-2" align="center">KingArthur tasks list</h3>
    <div v-if="tasks && tasks.length && !errors.length">
      <ul>
        <li v-bind:key="task.task_id"
            v-for="task of tasks"
            style="width: 100%">
          <div class="card" align="left"
          v-bind:style="{ 'background': taskColorByStatus(task.status) }">
            <div class="card-content">
              <div class="columns">
                <div class="column" style="margin-left: 10px; border-right: 1px solid #c2c2c2;">
                  <p class="title is-6">
                    {{task.status}}
                  </p>
                  <p class="title is-6">
                    <router-link :to="{path: '/tasks/' + task.task_id }">
                      {{task.task_id}}
                    </router-link>
                  </p>
                </div>
                <div class="column" style="margin-left: 10px;">
                  <p>
                    <i style="margin-right: 8px"
                    class="fas text-muted" v-bind:class="iconByCategory(task.category)">
                    </i>
                    {{task.backend}}
                  </p>
                  <p>
                    <i style="margin-right: 8px" class="fas fa-list-ol"></i>
                    <b>{{task.jobs.length}}</b> jobs
                  </p>
                  <p>
                    <i style="margin-right: 8px" class="fas fa-calendar-alt text-muted"></i>
                    {{task.created_on | prettyDate}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
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
import cssTask from './mixins/cssTask';

export default {
  name: 'Tasks',
  mixins: [cssTask],
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
  margin-bottom: 15px
}
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
</style>
