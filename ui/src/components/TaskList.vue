<template>
  <div
    class="container"
    style="align-items: center"
  >
    <!-- Errors -->
    <div v-if="errors && errors.length">
      <v-alert
        v-for="error in errors"
        :key="error"
        :title="`Error ${error.status}`"
        density="comfortable"
        type="error"
        variant="tonal"
      >
        {{ error.data.message }}
      </v-alert>
    </div>

    <h3 class="d-flex text-h3 mt-8 mb-8 justify-space-between align-end">
      KingArthur tasks list
      <v-btn
        :to="{path: '/add_task' }"
        variant="tonal"
        color="amber-darken-4"
      >
        <i
          style="margin-right: 8px"
          class="fas fa-plus"
        />New
      </v-btn>
    </h3>
    <div v-if="tasks && tasks.length">
      <task-card
        v-for="task in tasks"
        :key="task.task_id"
        :to="{path: '/tasks/' + task.task_id }"
        :task="task"
        @open-modal="openDeleteModal(task.task_id)"
      />
    </div>
    <article
      v-if="!tasks.length && !errors.length"
      class="message is-warning"
      align="center"
    >
      <div class="message-header">
        <p>Warning</p>
        <button
          class="delete"
          aria-label="delete"
        />
      </div>
      <div class="message-body">
        There aren't tasks in the KingArthur server
      </div>
    </article>

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
          Do you want to delete the task <b>{{ taskToDelete }}</b>?
        </section>
        <footer class="modal-card-foot">
          <button
            class="button is-success"
            @click="deleteTaskById(taskToDelete); closeDeleteModal()"
          >
            Delete
          </button>
          <button
            class="button is-danger"
            @click="closeDeleteModal()"
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
import TaskCard from './TaskCard.vue';

export default {
  name: 'TaskList',
  components: {TaskCard},
  mixins: [cssTask, deleteTask],
  data: () => ({
    tasks: [],
    errors: [],
    taskToDelete: '',
    activeModal: false,
    autorefresh: undefined,
  }),
  // When component created
  created() {
    this.getTaskList();

    const self = this;
    self.getTaskList();
  },
  beforeUnmount() {
    // clearInterval(this.autorefresh);
  },
  methods: {
    getTaskList() {
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
    openDeleteModal(taskId) {
      this.taskToDelete = taskId;
      this.activeModal = true;
    },
    closeDeleteModal() {
      this.taskToDelete = '';
      this.activeModal = false;
    },
    rescheduleFailedTask(task) {
      axios.post('/tasks/reschedule_task', {
        taskId: task.task_id,
      })
        .then(() => {
          this.$router.go();
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
.card {
  box-shadow: 5px 0 7px -2px #888;
}
.task-card a {
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
