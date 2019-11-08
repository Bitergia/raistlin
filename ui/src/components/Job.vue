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
      <pre class="logger">
        <code class="log-content">
          <p v-if="!job.log">There are not logs for this job yet.</p>
          <p v-bind:key="log"
          v-for="log of job.log">{{log.created | prettyDate}} - ({{log.module}}) - {{log.msg}}</p>
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Job',
  data: () => ({
    errors: [],
    job: {},
  }),
  created() {
    this.getJobData(this.$route.params.job_id);
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
