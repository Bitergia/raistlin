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

    <h3 style="margin-top: 2%" class="title is-1" align="left">
      KingArthur tasks list
      <router-link
        :to="{path: '/add_task' }"
        class="button is-link is-outlined"
        style="margin-top: 5px; float: right"
      >
        <i style="margin-right: 8px" class="fas fa-plus"></i>New
      </router-link>
    </h3>
    <div v-if="tasks && tasks.length && !errors.length">
      <ul>
        <li v-bind:key="task.task_id" v-for="task of tasks" style="width: 100%">
          <div
            class="card"
            align="left"
            v-bind:style="{ 'background': taskColorByStatus(task.status) }"
          >
            <div class="card-content task-card">
              <router-link :to="{path: '/tasks/' + task.task_id }">
                <div class="columns">
                  <div class="column" style="margin-left: 10px; border-right: 1px solid #c2c2c2;">
                    <div class="title is-6">
                      <p style="display: inline-block; float: left">
                        {{task.task_id}}</p>
                      <div class="job-square tooltip is-tooltip-bottom is-tooltip-multiline"
                      align="center"
                      v-bind:data-tooltip="'#' + job.job_number + ' - ' + job.job_status"
                      v-bind:key="job.job_number"
                      v-for="job of task.jobs.slice(0,10)"
                      v-bind:style="{ 'background-color': jobColorByStatus(job.job_status),
                                      'float': 'right' }">
                      </div>
                    </div>
                    <p>{{task.status}}</p>
                  </div>
                  <div class="column" style="margin-left: 10px;">
                    <p>
                      <i
                        style="margin-right: 8px"
                        class="fas text-muted"
                        v-bind:class="iconByCategory(task.category)"
                      ></i>
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
              </router-link>
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
        this.getTasksJobs();
      })
      .catch((e) => {
        this.errors.push(e.response);
      });
  },
  methods: {
    getTasksJobs() {
      this.tasks.forEach((task) => {
        this.getTaskJobs(task);
      });
    },
    getTaskJobs(task) {
      axios
        .get(`/tasks/id/${task.task_id}`)
        .then((response) => {
          task.jobs = response.data.jobs.reverse(); // eslint-disable-line no-param-reassign
        })
        .catch((e) => {
          this.errors.push(e.response);
        });
    },
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
  margin-bottom: 15px;
}
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.job-square {
  width: 20px;
  height: 20px;
  margin-left: 3px;
  display: inline-block;
}
.task-card a {
  color: #4a4a4a !important;
}
</style>
