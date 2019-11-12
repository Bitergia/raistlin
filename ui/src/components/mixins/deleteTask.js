import axios from 'axios';

const deteleTask = {
  methods: {
    deleteTaskById(taskId) {
      axios
        .post('/tasks/remove_task', {
          taskId,
        })
        .then(() => {
          if ('task_id' in this.$route.params) {
            this.$router.push('/tasks');
          } else {
            this.$router.go();
          }
        })
        .catch((e) => {
          this.errors.push(e.response);
        });
    },
  },
};

export default deteleTask;
