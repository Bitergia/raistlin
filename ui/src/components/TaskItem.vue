<template>
  <div
    class="container"
    style="align-items: center"
  >
    <!-- Errors -->
    <div v-if="errors && errors.length">
      <article
        v-for="error of errors"
        :key="error"
        class="message is-danger"
        align="center"
      >
        <div class="message-header">
          <p>Error {{ error.status }}</p>
          <button
            class="delete"
            aria-label="delete"
          />
        </div>
        <div class="message-body">
          {{ error.data.message }}
        </div>
      </article>
    </div>

    <!-- Details content -->
    <div v-if="task">
      <h3
        style="margin-top: 2%"
        class="title is-2"
      >
        Task "{{ $route.params.task_id }}"
      </h3>
      <div align="center">
        <div class="columns">
          <div
            class="column is-11"
            style="width: 95%"
          >
            <div
              class="card"
              align="left"
              :style="{ 'background': taskColorByStatus(task.status) }"
            >
              <div class="card-content">
                <div class="columns">
                  <div
                    class="column"
                    style="margin-left: 10px; border-right: 1px solid #c2c2c2;"
                  >
                    <p class="title is-5">
                      {{ task.status }}
                    </p>
                    <p>
                      <i
                        style="margin-right: 8px"
                        class="fas text-muted"
                        :class="iconByCategory(task.category)"
                      />
                      {{ task.backend }}
                    </p>
                    <p>
                      <i
                        style="margin-right: 8px"
                        class="fas fa-list-ol"
                      />
                      <b>{{ task.jobs.length }}</b> jobs
                    </p>
                    <p>
                      <i
                        style="margin-right: 8px"
                        class="fas fa-calendar-alt text-muted"
                      />
                      {{ $filters.prettyDate(task.created_on) }}
                    </p>
                  </div>
                  <div
                    class="column"
                    style="margin-left: 10px;"
                  >
                    <p>
                      Age: <b>{{ task.age }}</b>
                    </p>
                    <p>
                      Scheduling:
                      <ul>
                        <li>Delay: <b>{{ task.scheduling_cfg.delay }}</b></li>
                      </ul>
                      <ul>
                        <li>Max retries: <b>{{ task.scheduling_cfg.max_retries }}</b></li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-1 stacked-card">
            <p>
              <a
                class="fas text-muted fa-trash"
                style="font-size: 20px"
                @click="activeModal = true"
              />
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div
      v-if="task"
      style="margin-top: 20px"
      class="tabs"
    >
      <ul>
        <li
          class="static"
          :class="{ 'is-active': (selected === 'jobs') }"
        >
          <router-link
            :to="{path: '/tasks/' + $route.params.task_id }"
            @click="selected = 'jobs'"
          >
            Jobs
          </router-link>
        </li>
        <li
          v-if="selected === 'job_details'"
          class="static"
        >
          <span class="icon"><i
            class="fas fa-angle-right fa-lg"
            aria-hidden="true"
          /></span>
        </li>
        <li
          v-if="selected === 'job_details'"
          class="static"
          :class="{ 'is-active': (selected === 'job_details') }"
        >
          <a>#{{ jobSelected }}</a>
        </li>
      </ul>
    </div>

    <!-- Jobs content -->
    <router-view @change-job-title="handleJobTitle" />
    <div v-if="task && selected === 'jobs'">
      <ul>
        <li
          v-for="job of task.jobs"
          :key="job.job_id"
          style="width: 100%"
        >
          <div
            class="card job-card"
            align="left"
            :style="{ 'background': jobCardColorByStatus(job.job_status) }"
          >
            <div class="card-content">
              <router-link
                :to="{path: '/tasks/' + $route.params.task_id + '/job/' + job.job_id }"
              >
                <div class="columns">
                  <div
                    class="column"
                    style="border-right: 1px solid #c2c2c2;"
                  >
                    #{{ job.job_number }}
                  </div>
                  <div
                    class="column"
                    style="margin-left: 10px;"
                  >
                    {{ job.job_status }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="modal"
      :class="{ 'is-active': activeModal }"
    >
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">
            Warning!
          </p>
        </header>
        <section class="modal-card-body">
          Do you want to delete the task <b>{{ task.task_id }}</b>?
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="activeModal = false; deleteTaskById(task.task_id)"
          >
            Delete
          </button>
          <button
            class="button is-danger"
            @click="activeModal = false"
          >
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cssTask from './mixins/cssTask';
import deleteTask from './mixins/deleteTask';

export default {
  name: 'TaskItem',
  mixins: [cssTask, deleteTask],
  data: () => ({
    task: {
      jobs: [],
      scheduling_cfg: ""
    },
    errors: [],
    selected: 'jobs',
    isActive: true,
    modalOpened: false,
    jobSelected: '',
    activeModal: false,
    autorefeshTask: undefined,
  }),
  watch: {
    // eslint-disable-next-line
    '$route.params': function (newParams, oldParams) {
      if (newParams.task_id !== oldParams.task_id) {
        this.getTaskData(newParams.task_id);
      }

      // If the url (job_id) changes means that we are going back/forward to a job details
      if (!newParams.job_id && oldParams.job_id) {
        // Show the list of jobs
        this.selected = 'jobs';
      } else if (newParams.job_id && !oldParams.job_id) {
        // Show the job details
        this.selected = 'job_details';
      }
    },
  },
  created() {
    this.getTaskData(this.$route.params.task_id);

    if (this.task.status !== 'COMPLETED' && this.task.status !== 'FAILED') {
      const self = this;
      self.getTaskData(self.$route.params.task_id);
    }

    if (this.$route.params.job_id) {
      this.selected = 'job_details';
    }
  },
  beforeUnmount() {
    if (this.autorefresh) {
      clearInterval(this.autorefresh);
    }
  },
  methods: {
    getTaskData(taskId) {
      axios
        .get(`/tasks/id/${taskId}`)
        .then((response) => {
          this.task = response.data;
          this.task.jobs = this.task.jobs.reverse();
        })
        .catch((e) => {
          this.errors.push(e.response);
        });
    },
    handleJobTitle(jobNumber) {
      this.jobSelected = jobNumber;
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
  margin: 0 10px;
}
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.card {
  width: 100%;
  box-shadow: 5px 0 7px -2px #888;
}
.job-card {
  margin-bottom: 10px;
}
.job-card a {
 color: #4a4a4a !important;
}
.stacked-card {
  padding: 0px;
  margin: 0.75rem 0.75rem 0.75rem -12px;
  box-shadow: rgb(136, 136, 136) 0px 0px 5px -2px;
  width: 5%;

  /* Centering items */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
