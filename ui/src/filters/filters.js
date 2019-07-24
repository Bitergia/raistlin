import Vue from 'vue';

Vue.filter('prettyDate', (tsdate) => {
  if (!tsdate) return '';
  const date = new Date(tsdate * 1000);
  const dateString = `${date.getUTCFullYear()}/${date.getUTCMonth()
        + 1}/${date.getUTCDate()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
  return dateString;
});
