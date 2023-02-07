<template>
  <v-app id="raistlinUI">
    <v-app-bar
      role="navigation"
      density="compact"
      border="b"
      flat
    >
      <v-app-bar-title>
        <router-link
          to="/"
          class="text-subtitle-2 text-amber-darken-4"
        >
          Raistlin
        </router-link>
      </v-app-bar-title>
      <template #append>
        <v-btn
          to="/tasks"
          variant="text"
          text="Tasks"
          class="text-body-2 text-decoration-underline text-capitalize px-4"
        />
        <v-btn
          variant="flat"
          color="amber-darken-4"
          class="text-body-2 text-capitalize"
        >
          Log in
        </v-btn>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'RaistlinUI',
};
</script>

<style lang="scss">
@import 'sass/style.scss';
</style>
