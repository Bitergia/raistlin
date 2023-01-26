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

    <div align="left">
      <ul>
        <li style="width: 100%">
            <div class="card job-card" align="left"
            v-bind:style="{ 'background': jobCardColorByStatus(job.job_status) }">
              <div class="card-content">
                <div class="columns">
                  <div class="column" style="border-right: 1px solid #c2c2c2;">
                    <p class="title is-6">
                      {{job.job_status}}
                    </p>
                    <p>
                      Job: <b>#{{job.job_number}}</b>
                    </p>
                    <p>
                      ID: <b>{{job.job_id}}</b>
                    </p>
                  </div>
                  <div class="column" style="margin-left: 10px;"
                  v-if="job.job_status === 'finished'">
                    <p>
                      <b>{{job.result.fetched}}</b> fetched
                    </p>
                    <p>
                      <b>{{job.result.skipped}}</b> skipped
                    </p>
                    <p>
                      <i style="margin-right: 8px" class="fas fa-calendar-alt text-muted"></i>
                      <!-- <b>{{ prettyDate(job.result.min_updated_on) }}</b> Min -->
                    </p>
                    <p>
                      <i style="margin-right: 8px" class="fas fa-calendar-alt text-muted"></i>
                      <!-- <b>{{ prettyDate(job.result.max_updated_on) }}</b> Max -->
                    </p>
                  </div>
                </div>
              </div>
            </div>
        </li>
      </ul>
      <pre class="logger">
        <code class="log-content">
          <p v-if="!job.log">There are not logs for this job yet.</p>
          <p v-bind:key="log"
          v-for="log of job.log">{{ $filters.prettyDate(log.created) }} - ({{log.module}}) - {{log.msg}}</p>
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import cssTask from './mixins/cssTask';

export default {
  name: 'Job',
  mixins: [cssTask],
  data: () => ({
    errors: [],
    job: {},
    autorefresh: undefined,
  }),
  created() {
    this.getJobData(this.$route.params.job_id);

    if (this.job.job_status !== 'finished' && this.job.job_status !== 'failed') {
      const self = this;
      this.autorefresh = setInterval(() => {
        self.getJobData(self.$route.params.job_id);
      }, 5000);
    }
  },
  methods: {
    getJobData(jobId) {
      axios
        .get(`/tasks/job_id/${jobId}`)
        .then((response) => {
          this.job = response.data;
          this.$emit('changeJobTitle', this.job.job_number);
        })
        .catch((e) => {
          this.errors.push(e.response);
        });
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params': function (newParams, oldParams) {
      if (newParams.job_id !== oldParams.job_id) {
        this.getJobData(newParams.job_id);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
article {
  width: 60%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}
.logger {
  background-color: #555555;
  padding: 15px;
  overflow: scroll;
  width: 100%;
  margin: 10px;
}
.log-content {
  color: white;
}
</style>
