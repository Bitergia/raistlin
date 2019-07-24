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
          Logs...
        </code>
      </pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Job',
  data: () => ({
    errors: [],
  }),
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
