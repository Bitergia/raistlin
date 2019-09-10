const cssTask = {
  methods: {
    taskColorByStatus(status) {
      if (status === 'COMPLETED') {
        return 'linear-gradient(to right,#39aa56 0,#39aa56 10px,#fff 10px,#fff 100%) no-repeat';
      } if (status === 'FAILED') {
        return 'linear-gradient(to right,red 0,red 10px,#fff 10px,#fff 100%) no-repeat';
      } if (status === 'ENQUEUED') {
        return 'linear-gradient(to right,gray 0,gray 10px,#fff 10px,#fff 100%) no-repeat';
      } if (status === 'RUNNING') {
        return 'linear-gradient(to right,#ffd21f 0,#ffd21f 10px,#fff 10px,#fff 100%) no-repeat';
      } if (status === 'SCHEDULED') {
        return 'linear-gradient(to right,#45b6f7 0,#45b6f7 10px,#fff 10px,#fff 100%) no-repeat';
      }
      return '';
    },
    iconByCategory(category) {
      if (category === 'bug') {
        return 'fa-bug';
      } if (category === 'commit') {
        return 'fa-code-branch';
      }
      return '';
    },
    jobColorByStatus(status) {
      if (status === 'finished') {
        return '#39aa56';
      } if (status === 'failed') {
        return 'red';
      } if (status === 'queued') {
        return 'gray';
      } if (status === 'started') {
        return '#ffd21f';
      }
      return '';
    },
  },
};

export default cssTask;
