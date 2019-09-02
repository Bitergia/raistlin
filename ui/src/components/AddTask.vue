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

    <div v-if="!errors.length">
      <h2 style="margin-top: 2%" class="title is-2">Add new task</h2>
      <div class="form-horizontal add-form" style="margin: 0 auto">
        <div class="field">
          <label class="label">Task ID</label>
          <div class="control">
            <input v-model="taskData.task_id" class="input" type="text" placeholder="ID" />
          </div>
        </div>
        <div class="field">
          <label class="label" for="selectbackend">Backend</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="taskData.backendSelected">
                <option
                  v-bind:key="backend"
                  v-for="backend in backendOptions"
                  :value="backend"
                >{{backend}}</option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="taskData.backendSelected === 'git'">
          <div class="field">
            <label class="label">Git path</label>
            <div class="control">
              <input
                v-model="taskData.gitBackendArgs.gitPath"
                class="input"
                type="text"
                placeholder="path"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">URI</label>
            <div class="control">
              <input
                v-model="taskData.gitBackendArgs.uri"
                class="input"
                type="text"
                placeholder="uri"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">From date</label>
            <div class="control">
              <input
                v-model="taskData.gitBackendArgs.fromDate"
                class="input"
                type="text"
                placeholder="from_date"
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="selectGitCategory">Category</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="taskData.category">
                  <option>commit</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="taskData.backendSelected === 'bugzillarest'">
          <div class="field">
            <label class="label">Url</label>
            <div class="control">
              <input
                v-model="taskData.bugzillarestBackendArgs.url"
                class="input"
                type="text"
                placeholder="url"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">From date</label>
            <div class="control">
              <input
                v-model="taskData.bugzillarestBackendArgs.fromDate"
                class="input"
                type="text"
                placeholder="from_date"
              />
            </div>
          </div>
          <div class="field">
            <label class="label" for="selectBugzillarestCategory">Category</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="taskData.category">
                  <option>bug</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field" style="margin-top: 10px">
          <label class="label">Delay</label>
          <div class="control">
            <input
              v-model="taskData.schedulerArgs.delay"
              class="input"
              type="text"
              placeholder="delay (ms)"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Max retries</label>
          <div class="control">
            <input
              v-model="taskData.schedulerArgs.maxRetries"
              class="input"
              type="text"
              placeholder="max retries (number)"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button v-on:click="addTask" class="button is-link">Add</button>
          </div>
          <div class="control">
            <router-link to="/tasks" class="button is-text">Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddTask',
  data: () => ({
    backendOptions: ['git', 'bugzillarest'],
    taskData: {
      backendSelected: 'git',
      bugzillarestBackendArgs: {},
      gitBackendArgs: {},
      schedulerArgs: {},
    },
    errors: [],
  }),
  methods: {
    addTask() {
      axios
        .post('/tasks/add_task', {
          taskData: this.taskData,
        })
        .then(() => {
          this.$router.push(`/tasks/${this.taskData.task_id}`);
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
.add-form {
  width: 60%;
}
</style>
